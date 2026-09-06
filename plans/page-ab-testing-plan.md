# Page-Level A/B Testing Plan

> Goal: Run A/B/n tests at the **page** level. A parent page (e.g. the home page `/`)
> has one or more **variant pages stored underneath it in the Agility sitemap**
> (e.g. `/home/variant-b`). A visitor is bucketed into a variant once, the choice is
> stored in a cookie, and the page is rendered + CDN-cached **per variant** so the URL
> stays the same (`/`). Experiments are defined in **PostHog**, synced to **Netlify
> Blobs** by a cron job, and analyzed in PostHog using **HubSpot form submissions +
> engagement** as goals.

---

## 1. Why this fits the current architecture

| Capability | Where it lives today | How we reuse it |
|---|---|---|
| Edge request handling | `middleware.ts` (preview, dynamic-redirect, search-param→path rewrites) | Add a *lazy* A/B assignment block (runs only when no assignment cookie yet) |
| Static/ISR page builds | `app/[...slug]/page.tsx` + `generateStaticParams()` from the flat sitemap | Variant pages are normal sitemap nodes → **already built & cached** |
| Scheduled jobs | `netlify/functions/cron-reindex.ts` (`@netlify/functions` cron) | Clone for the experiment-sync cron |
| Edge KV store | `@netlify/blobs` (`.netlify/blobs-serve` already present → **works in `netlify dev`**) | Stores the experiment manifest; read only at assignment time |
| Analytics | `lib/analytics/posthog.ts` lazy loader + `capture`/`identify` | Add `register` + `$feature_flag_called` |
| Conversion hook | `SubmissionForm.client.tsx` etc. already `capture("website-form-submission")` | Standardize across all 6 form components |
| Preview UI | `components/common/PreviewBar.tsx` | Add an **Experiments** panel to view/force variants |

---

## 2. Architecture — cookie-vary (primary design)

The key decision (see §11 for the alternative we rejected): **don't read Blobs on every
request, and don't rewrite.** Instead:

1. **Assignment is lazy and rare.** Middleware only does experiment work when the visitor has
   **no assignment cookie** for the requested parent page. That's the *only* time Blobs is read.
   Returning visitors carry the cookie → middleware does nothing extra.
2. **The cookie stores the resolved variant *path*** (e.g. `ab_home-hero-test=/home/variant-b`),
   so the render path never needs the manifest.
3. **The page renders the variant named by the cookie** and tells the CDN to cache **per
   variant** with Netlify's fine-grained cache key.

```
┌─────────────┐  marketer creates Experiment + multivariate Feature Flag
│  PostHog    │  (each variant payload carries its rewrite path)
└──────┬──────┘
       │  cron pulls running experiments every ~5 min
       ▼
┌──────────────────────────────┐   writes manifest
│ netlify/functions/            │────────────┐
│   cron-sync-experiments.ts    │            ▼
└──────────────────────────────┘   ┌───────────────────────┐
                                    │ Netlify Blobs          │
                                    │ store "experiments"    │
                                    │ key   "active"         │
                                    └───────────┬───────────┘
                                                │ read ONLY when assignment cookie absent
                                                ▼
   GET /  ──────────────────────────▶ middleware.ts
            cookie present?  ── yes ──▶ do nothing, pass through (hot path, no Blobs)
                 │ no
                 ▼
            read manifest → match parentPath → hash(uid+key) → variant
            set cookie ab_<key>=/home/variant-b (90d), redirect to clean URL
                 │
                 ▼
   GET / (now with cookie) ─────────▶ app/[...slug]/page.tsx
            reads ab_* cookie → fetches that variant's content
            sets Netlify-Vary: cookie=ab_<key>  (CDN caches per variant)
                 │
                 ▼
            Browser: ABTestingTracker registers $feature/<key>=variant,
                     fires $feature_flag_called; conversions/engagement
                     auto-carry $feature/<key>
```

**Assignment is decoupled from PostHog's hashing.** We compute the variant at the edge and
*report* it via the `$feature/<key>` super property, so PostHog experiment analysis reads our
bucketing off every event. The PostHog flag is a **config record** (variants, rollout %, and the
path in each variant's payload).

---

## 3. PostHog configuration (source of truth)

For each page experiment:

1. **Multivariate Feature Flag**, key = experiment key (e.g. `home-hero-test`).
   - Variants `control`, `variant-b`, … with rollout % summing to 100.
   - Per-variant **payload** JSON: `{ "path": "/home/variant-b" }`. `control` payload path = the
     parent page path (e.g. `/`); we treat that as the experiment's `parentPath`.
2. **Experiment** linked to that flag. Primary metric `website-form-submission`; secondary =
   engagement events. Start/stop dates control the active window; launch to go live.

Env vars (Netlify, server-side only): `POSTHOG_PERSONAL_API_KEY`, `POSTHOG_PROJECT_ID` (33311),
reuse `NEXT_PUBLIC_POSTHOG_HOST`. Plus the kill-switch `AB_TESTING_ENABLED`.

---

## 4. Components to build

### 4.1 Cron sync — `netlify/functions/cron-sync-experiments.ts`

Mirrors `cron-reindex.ts`. Every 5 min, pulls running experiments + their flags and writes a
compact manifest to Blobs. **Local-friendly:** if `POSTHOG_PERSONAL_API_KEY` is absent, it loads
a fixture (`node/fixtures/experiments.local.json`) instead — so `netlify dev` works with no creds.

```ts
import type { Config } from "@netlify/functions"
import { getStore } from "@netlify/blobs"
import localFixture from "../../node/fixtures/experiments.local.json"

interface ABVariant { key: string; path: string; rollout: number }
interface ABExperiment { key: string; parentPath: string; variants: ABVariant[] }
interface ABManifest { version: number; generatedAt: string; experiments: ABExperiment[] }

async function buildFromPostHog(): Promise<ABExperiment[]> {
  const base = `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/api/projects/${process.env.POSTHOG_PROJECT_ID}`
  const headers = { Authorization: `Bearer ${process.env.POSTHOG_PERSONAL_API_KEY}` }
  const exps = await fetch(`${base}/experiments/?limit=200`, { headers }).then(r => r.json())
  const running = exps.results.filter((e: any) => e.start_date && !e.end_date && !e.archived)
  const out: ABExperiment[] = []
  for (const e of running) {
    const flag = e.feature_flag
    const multivariate = flag?.filters?.multivariate?.variants ?? []
    const payloads = flag?.filters?.payloads ?? {}
    const variants: ABVariant[] = multivariate
      .map((v: any) => ({ key: v.key, rollout: v.rollout_percentage, path: JSON.parse(payloads[v.key] ?? "{}").path }))
      .filter((v: ABVariant) => v.path)
    const control = variants.find(v => v.key === "control")
    if (control && variants.length >= 2) out.push({ key: flag.key, parentPath: control.path, variants })
  }
  return out
}

export default async () => {
  const experiments = process.env.POSTHOG_PERSONAL_API_KEY
    ? await buildFromPostHog()
    : (localFixture as ABManifest).experiments
  const manifest: ABManifest = { version: 1, generatedAt: new Date().toISOString(), experiments }
  await getStore("experiments").setJSON("active", manifest)
}

export const config: Config = { schedule: "*/5 * * * *" }
```

> Phase-1 verification: confirm the PostHog experiments API shape (the embedded `feature_flag`
> object + the per-variant payload JSON-string format) against project 33311.

### 4.2 Edge assignment — additions to `middleware.ts`

Runs **only when the visitor has no assignment cookie** for the requested parent. On a match it
sets the cookie (storing the path) and 302-redirects to the same clean URL so the cookie takes
effect and the URL stays shareable.

```ts
import { getStore } from "@netlify/blobs"

let manifestCache: { at: number; data: ABManifest | null } | null = null
async function getManifest() {
  const now = Date.now()
  if (manifestCache && now - manifestCache.at < 60_000) return manifestCache.data
  let data: ABManifest | null = null
  try { data = await getStore("experiments").get("active", { type: "json" }) } catch {}
  manifestCache = { at: now, data }
  return data
}

function pickVariant(seed: string, variants: ABVariant[]): ABVariant {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) }
  const r = ((h >>> 0) % 10000) / 100
  let acc = 0
  for (const v of variants) { acc += v.rollout; if (r < acc) return v }
  return variants[0]
}
```

In `middleware()` (after preview/dynamic, before redirect check):

```ts
const isCleanPath = !ext && !previewQ && !contentIDStr
if (isCleanPath && process.env.AB_TESTING_ENABLED === "true") {
  const path = request.nextUrl.pathname.replace(/\/$/, "") || "/"

  // ── QA override (see §4.6): ?ab=key:variant | ?ab=clear ──
  const abParam = request.nextUrl.searchParams.get("ab")
  if (abParam) return handleAbOverride(request, abParam) // sets/clears cookie, redirects clean

  // ── lazy assignment: only when no cookie for an experiment on THIS path ──
  const manifest = await getManifest()
  const exp = manifest?.experiments.find(e => (e.parentPath.replace(/\/$/, "") || "/") === path)
  if (exp && !request.cookies.get(`ab_${exp.key}`)) {
    const ua = request.headers.get("user-agent") || ""
    const isBot = /bot|crawl|spider|slurp|bingpreview|lighthouse/i.test(ua)
    let uid = request.cookies.get("ab_uid")?.value || crypto.randomUUID()
    const chosen = isBot
      ? exp.variants.find(v => v.key === "control")!
      : pickVariant(`${exp.key}:${uid}`, exp.variants)

    const res = NextResponse.redirect(request.url) // re-request same URL, now cookie-stamped
    res.cookies.set("ab_uid", uid, { maxAge: 31536000, sameSite: "lax" })
    res.cookies.set(`ab_${exp.key}`, chosen.path, { maxAge: 7776000, sameSite: "lax" })
    return res
  }
}
```

> The assignment response sets a cookie and is a redirect → it is **not** cached (correct; cookie
> values must not leak across users). Steady-state requests carry the cookie and hit the cached,
> varied render. Bots get `control` and (being cookie-less crawlers) generally skip the redirect
> loop; we also force control for them and add `noindex` on variants (§4.5).

### 4.3 Render path — `app/[...slug]/page.tsx` (+ `getAgilityPage`)

Read the assignment cookie; if present and valid, fetch that variant path's content instead of
the requested path, and emit the Netlify cache-vary header.

```ts
// in the page (or a helper): resolve the variant path from the cookie
import { cookies, headers } from "next/headers"

const abCookies = cookies().getAll().filter(c => c.name.startsWith("ab_") && c.name !== "ab_uid")
const variantPath = abCookies.find(c => isParentOf(c.name, params.slug))?.value
// SECURITY: only honor variantPath if it resolves to a real sitemap node (getAgilityPage already
// returns null for unknown paths → fall back to the requested path / notFound). Never fetch an
// arbitrary cookie-supplied path without that check.
```

Cache headers — set on the response for experiment parent pages only:

```
Netlify-CDN-Cache-Control: public, durable, s-maxage=600, stale-while-revalidate=86400
Netlify-Vary: cookie=ab_home-hero-test
```

> **Linchpin to verify in staging (§9.4):** reading `cookies()` makes the route dynamic (drops
> Next's static cache), so we re-introduce caching at Netlify's CDN via `Netlify-Vary`. Confirm
> the Next-on-Netlify runtime honors `Netlify-Vary` and actually caches the SSR output per cookie
> value (MISS→HIT). If it doesn't, fall back to the rewrite design in §11.

### 4.4 Client reporting — `components/common/ABTestingTracker.tsx`

Mounted in `app/layout.tsx`. Reads `ab_<key>` cookies, registers each variant as a PostHog super
property, fires one `$feature_flag_called` exposure. (The cookie stores the *path*; map it back to
the variant key via the manifest exposed at `/api/experiments`, or store `key|variant|path` in the
cookie value — decide in Phase 3.)

```ts
// additions to lib/analytics/posthog.ts (queue-aware like capture)
export function register(props: Record<string, unknown>) {
  if (instance) instance.register(props); else { queue.push(ph => ph.register(props)); load() }
}
export function captureFeatureFlagCalled(key: string, variant: string) {
  capture("$feature_flag_called", { $feature_flag: key, $feature_flag_response: variant })
}
```

### 4.5 SEO / correctness hardening

- **Bots → control** in middleware (above).
- **Variant child pages:** `noindex` + `<link rel="canonical">` → parent, and **exclude from the
  sitemap** (`app/sitemap.tsx`). Variant metadata via `resolveAgilityMetaData`.
- **Preview bypasses A/B** (preview checks run first; `isCleanPath` excludes preview).

### 4.6 Experiment override (no manual cookies)

A single query-string contract, handled by `handleAbOverride()` in middleware:

| URL | Effect |
|---|---|
| `/?ab=home-hero-test:variant-b` | Force that variant: validate against manifest, set `ab_home-hero-test=<resolved path>` cookie, 302 to clean `/`. Sticky until cleared. |
| `/?ab=home-hero-test:control` | Force control. |
| `/?ab=clear` | Delete all `ab_*` cookies, 302 to clean URL → re-bucketed fresh. |

Because the CDN cache key varies by the cookie value, a forced variant only affects **your own**
cache entry — no risk of poisoning other users. Works without dev tools or manual cookie editing;
links are shareable with the team.

### 4.7 PreviewBar experiments panel — `components/common/PreviewBar.tsx`

Add an **Experiments** section to the existing expandable panel (`isSelecting` view). It shows
what's happening and lets you jump between variants:

- New lightweight route **`/api/experiments`** returns the active manifest (reads Blobs) — used by
  the panel and by `ABTestingTracker` for key↔path mapping.
- Panel behavior (new `ExperimentsPanel.client.tsx` rendered inside PreviewBar):
  - Fetch `/api/experiments`; for each experiment whose `parentPath` matches the current page,
    list its variants.
  - Read `document.cookie` to show the **current assignment** ("You are in: `variant-b`") and
    whether it was bucketed vs. forced.
  - A button per variant → navigates to `?ab=<key>:<variant>` (reuses §4.6, no manual cookies).
  - A **Reset** button → `?ab=clear`.
  - Show the live exposure status (did `$feature_flag_called` fire) for quick QA.
- Gate visibility to dev/preview (the bar is already preview-only per its header comment), so the
  panel isn't shown to anonymous production visitors.

---

## 5. Caching behavior (verify in staging — see §9.4)

- Middleware runs per request but does **no Blobs read** once the cookie exists (hot path).
- The parent page render is dynamic (reads cookie) but **CDN-cached per variant** via
  `Netlify-Vary: cookie=ab_<key>` — fragments only N-ways (one per variant).
- Assignment redirects (cookie-setting) are uncached by design.

---

## 6. Phased delivery

| Phase | Deliverable | Exit criteria |
|---|---|---|
| **0. Foundations** | Env vars, PostHog personal API key, `AB_TESTING_ENABLED=false`, confirm `@netlify/blobs` dep, local fixture file | Keys set; fixture loads in `netlify dev` |
| **1. Cron sync** | `cron-sync-experiments.ts` (+ local fixture path) | `netlify functions:invoke` writes a manifest to local Blobs; PostHog API shape confirmed |
| **2. Edge assignment** | `middleware.ts` lazy-assign + `?ab=` override, behind kill-switch | Cookie set once; returning visitor = no Blobs; bot→control; `?ab=` + `?ab=clear` work locally |
| **3. Render + reporting** | Cookie-driven render, `Netlify-Vary`, `ABTestingTracker`, posthog `register`/exposure | Variant content renders by cookie locally; PostHog shows exposures + `$feature/<key>` |
| **4. Conversions + engagement** | Standardize form events; engagement hook; wire PostHog metrics | Conversions attributed per variant in PostHog |
| **5. PreviewBar + SEO** | Experiments panel + `/api/experiments`; noindex/canonical; sitemap exclusion | Panel lists/forces variants; variants not indexed |
| **6. Launch** | Turn on `AB_TESTING_ENABLED`; first real home-page test | Live experiment collecting attributed data |

---

## 7. Testing strategy (local-first)

### 7.1 Local end-to-end with `netlify dev`
`netlify dev` runs **middleware, the cron function, and Netlify Blobs locally** (the existing
`.netlify/blobs-serve` directory confirms local Blobs are wired). This means the entire flow is
testable on your machine with no PostHog creds:

1. Add a fixture `node/fixtures/experiments.local.json` with a sample experiment pointing `/` →
   `/home/variant-b` (create that variant page in Agility, or point at any existing child page).
2. `netlify dev`, then seed the local manifest:
   `netlify functions:invoke cron-sync-experiments` (uses the fixture when no PostHog key).
3. Hit `http://localhost:8888/`:
   - First load → assignment redirect → cookie set → variant (or control) renders.
   - Reload → sticky (same variant), and **no** Blobs read (add a `log` to confirm).
4. `http://localhost:8888/?ab=home-hero-test:variant-b` → forces variant; `?ab=clear` → resets.
5. Open the PreviewBar → Experiments panel → click each variant, confirm content + assignment text.

> Note: pure `next dev` does **not** run Netlify middleware/Blobs/edge behavior — always test the
> A/B flow through `netlify dev` (port 8888), not `dev:next` (3000).

### 7.2 Unit test the bucketing
`pickVariant` is pure and dependency-free. Add a test that:
- Is **deterministic**: same seed → same variant across runs.
- Has correct **distribution**: 100k random uids land within ±1% of each variant's rollout.
- Is **stable under reorder**: variant order in the array doesn't change a given uid's bucket
  (lock the order by sorting variants by key in both cron output and `pickVariant`).

### 7.3 Cron / manifest tests
- Invoke locally (`netlify functions:invoke cron-sync-experiments`) and assert the Blobs manifest
  matches the fixture / PostHog response shape.
- Add a parser unit test feeding a recorded PostHog experiments JSON payload → expected manifest
  (guards against PostHog API shape drift).
- Failure mode: with Blobs unavailable, `getManifest()` returns `null` → middleware serves control
  (assert no throw, no redirect).

### 7.4 Cache-vary verification (staging — the linchpin)
On a Netlify deploy preview with `AB_TESTING_ENABLED=true`:
```bash
# variant A
curl -sI https://<deploy>/ -H 'Cookie: ab_home-hero-test=/' | grep -i 'cache\|netlify'
# variant B — different content, separate cache entry
curl -sI https://<deploy>/ -H 'Cookie: ab_home-hero-test=/home/variant-b'
```
- Confirm two requests with **different** cookie values return **different** content.
- Confirm the same cookie value returns `Cache-Status`/`Netlify-Cache` **MISS then HIT**.
- Confirm a cookie-less request (bot UA) gets control and is `noindex`.
- If `Netlify-Vary` is ignored / not cached → **switch to the rewrite design (§11)**; decide here.

### 7.5 PostHog attribution verification
- In PostHog Live Events, confirm `$feature_flag_called` fires once per experiment per session and
  that `$feature/<key>` appears on `website-form-submission` and engagement events.
- Smoke-test the experiment results view shows both variants accruing exposures.

### 7.6 QA checklist before launch
- [ ] Preview mode unaffected (editors still preview specific pages).
- [ ] Redirects (`checkRedirect`) still win where expected.
- [ ] Sticky assignment survives reloads and navigation.
- [ ] `?ab=` override + PreviewBar work for non-technical marketers.
- [ ] Kill-switch (`AB_TESTING_ENABLED=false`) fully disables with zero overhead.
- [ ] Variants excluded from sitemap + `noindex` + canonical → parent.

---

## 8. File-change summary

| File | Change |
|---|---|
| `netlify/functions/cron-sync-experiments.ts` | **new** — PostHog → Blobs (+ local fixture fallback) |
| `node/fixtures/experiments.local.json` | **new** — local test manifest |
| `middleware.ts` | **edit** — lazy assignment + `?ab=` override + `handleAbOverride` + helpers |
| `app/[...slug]/page.tsx` / `lib/cms/getAgilityPage.ts` | **edit** — cookie→variant content + `Netlify-Vary` |
| `lib/analytics/posthog.ts` | **edit** — `register`, `captureFeatureFlagCalled` |
| `components/common/ABTestingTracker.tsx` | **new** — register super prop + exposure |
| `app/layout.tsx` | **edit** — mount `ABTestingTracker` |
| `app/api/experiments/route.ts` | **new** — expose active manifest to client/PreviewBar |
| `components/common/PreviewBar.tsx` + `ExperimentsPanel.client.tsx` | **edit/new** — experiments panel |
| `components/.../<form>.client.tsx` (×6) | **edit** — standardize `website-form-submission` |
| `components/common/useEngagementTracking.ts` | **new** — scroll/time/CTA events |
| `app/sitemap.tsx` | **edit** — exclude variant child paths |
| `resolveAgilityMetaData.ts` | **edit** — noindex + canonical for variants |
| tests | **new** — `pickVariant` distribution + manifest parser |
| Netlify env | `POSTHOG_PERSONAL_API_KEY`, `POSTHOG_PROJECT_ID`, `AB_TESTING_ENABLED` |

---

## 9. Risks & open questions

1. **`Netlify-Vary` on Next SSR responses** — the central assumption (§7.4). Prove before Phase 4.
2. **PostHog experiments API shape** — verify in Phase 1 (cron parsing depends on it).
3. **Assignment redirect on first visit** — one extra 302 for brand-new visitors only; cookie-less
   clients (some bots) must not loop. Bots are forced to control and variants are `noindex`.
4. **Variant content drift** — variants are independent Agility pages; document a "duplicate from
   parent" workflow for marketers.
5. **Stat validity** — sticky cookie keeps assignment stable; exposure registered before first
   conversion via the queue in `lib/analytics/posthog.ts`.
6. **Localization** — multi-locale variant mapping is out of scope for v1.

---

## 10. Marketer docs (Phase 5 deliverable)
Short runbook: how to create an experiment in PostHog (flag + variants + payload paths), how to
create variant pages under a parent in Agility, how to use the PreviewBar to QA each variant, and
how to read results. Keep alongside this plan.

---

## 11. Rejected/fallback design — middleware rewrite

Original approach: middleware reads the manifest **every request** (module-cached ~60s) and
`NextResponse.rewrite()`s `/` → `/home/variant-b`; each variant path is its own native ISR cache
entry. **Pros:** no dynamic render, caching is the existing ISR model, no `Netlify-Vary`
dependency. **Cons:** Blobs on the hot path (mitigated by module cache, but cold starts/many
instances still read it). **Use this if §7.4 shows `Netlify-Vary` doesn't cache reliably on
Netlify's Next runtime** — the cron, manifest, bucketing, reporting, override, PreviewBar, and
testing all carry over unchanged; only the middleware action (rewrite vs. cookie+redirect) and the
render-path cookie read differ.
```
