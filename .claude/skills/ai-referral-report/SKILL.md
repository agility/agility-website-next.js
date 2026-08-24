---
name: ai-referral-report
description: Report on traffic referred from AI assistants (ChatGPT, Claude, Perplexity, Gemini, Copilot) to agilitycms.com — how much, which content, which companies, and which leads. Use when the user asks about AI referrals, AI search traffic, GEO/LLM visibility, "who's coming from ChatGPT", AI attribution, or wants the AI traffic report re-run. Covers GA4 (Data API + BigQuery) and HubSpot lead-level attribution.
user-invocable: true
---

# AI Referral Reporting

Measure and attribute traffic that AI assistants send to agilitycms.com.

## Configuration

| Thing | Value |
|---|---|
| GA4 property | `354952039` ("Agility Website - GA4") |
| GA4 account | `43303502` |
| Quota project (required header) | `clear-aurora-382115` |
| BigQuery dataset | `agility-cms-ga-data.ga4_agility_website` |
| DTS transfer config | `projects/1018154073150/locations/us/transferConfigs/6ac225ba-0000-252f-a2c5-089e082282e8` |
| HubSpot portal | `23239214` |

**Data streams on the property — this matters, see Trap 1:**

| Stream ID | Host | What it is |
|---|---|---|
| `4648522359` | `agilitycms.com` | marketing site |
| `6528700654` | `app.agilitycms.com` | the CMS app (logged-in users) |

**AI source values to filter on:**
`chatgpt.com`, `claude.ai`, `perplexity.ai`, `perplexity`, `gemini.google.com`, `copilot.com`, `copilot.microsoft.com`

## Auth check

Run this first. It must print a token and include `analytics.readonly`:

```bash
gcloud auth application-default print-access-token >/dev/null && \
  curl -s "https://oauth2.googleapis.com/tokeninfo?access_token=$(gcloud auth application-default print-access-token)" \
  | python3 -c "import sys,json;print(json.load(sys.stdin).get('scope'))"
```

If the scope is missing `analytics.readonly`, re-auth:

```bash
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform
```

Do **not** try to add `analytics.edit` — Google blocks that scope for gcloud's shared OAuth client ("This app is blocked"). See Limits.

## Source 1 — GA4 Data API (use this for history)

The Data API reaches back over the property's full history. This is the **primary** source for any window longer than the BigQuery backfill.

Use the helper:

```bash
.claude/skills/ai-referral-report/scripts/ga4.sh landing-pages 2025-08-01 today
.claude/skills/ai-referral-report/scripts/ga4.sh sources      2025-08-01 today
.claude/skills/ai-referral-report/scripts/ga4.sh monthly      2025-08-01 today
.claude/skills/ai-referral-report/scripts/ga4.sh events       2025-08-01 today
.claude/skills/ai-referral-report/scripts/ga4.sh companies    2025-08-01 today
```

Every preset already filters to `hostName = agilitycms.com`. Pass `--all-hosts` as a 4th arg to include the app.

## Source 2 — BigQuery (use this going forward)

DTS writes GA4 *reporting* rollups here daily. Day-partitioned, accumulates indefinitely, and queryable in SQL without Data API cardinality limits.

Tables (all suffixed `_354952039`): `p_ga4_TrafficAcquisition`, `p_ga4_LandingPage`, `p_ga4_PagesAndScreens`, `p_ga4_Events`, `p_ga4_UserAcquisition`, `p_ga4_TechDetails`, `p_ga4_DemographicDetails`, `p_ga4_Audiences`, `p_ga4_EcommercePurchases`, `p_ga4_Promotions`.

```bash
bq query --project_id=agility-cms-ga-data --use_legacy_sql=false --format=pretty '
SELECT sessionSource, sessionMedium,
       SUM(sessions) AS sessions,
       SUM(engagedSessions) AS engaged,
       SUM(keyEvents) AS key_events
FROM `agility-cms-ga-data.ga4_agility_website.p_ga4_TrafficAcquisition_354952039`
WHERE sessionMedium = "ai-assistant"
GROUP BY 1,2 ORDER BY sessions DESC'
```

`sessionMedium = "ai-assistant"` is the clean filter **in BigQuery only**, and only for dates from June 2026 onward (Trap 2).

**There is no date column.** The schema is dimensions + metrics only — the sole time dimension is the ingestion-time partition, so date filtering and grouping must go through `_PARTITIONTIME`:

```bash
bq query --project_id=agility-cms-ga-data --use_legacy_sql=false --format=pretty '
SELECT DATE(_PARTITIONTIME) AS day, sessionSource, SUM(sessions) AS sessions
FROM `agility-cms-ga-data.ga4_agility_website.p_ga4_TrafficAcquisition_354952039`
WHERE sessionMedium = "ai-assistant"
  AND _PARTITIONTIME >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
GROUP BY 1,2 ORDER BY 1 DESC, sessions DESC'
```

Check current coverage before trusting any trend — the backfill window is whatever has been requested so far, not the property's full history:

```bash
bq query --project_id=agility-cms-ga-data --use_legacy_sql=false --format=pretty '
SELECT COUNT(DISTINCT DATE(_PARTITIONTIME)) AS days,
       MIN(DATE(_PARTITIONTIME)) AS earliest,
       MAX(DATE(_PARTITIONTIME)) AS latest
FROM `agility-cms-ga-data.ga4_agility_website.p_ga4_TrafficAcquisition_354952039`'
```

### Extending the backfill

The DTS connector only backfills what you ask for. To pull more history:

```bash
CFG="projects/1018154073150/locations/us/transferConfigs/6ac225ba-0000-252f-a2c5-089e082282e8"
curl -s -X POST \
  -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -H "x-goog-user-project: agility-cms-ga-data" -H "Content-Type: application/json" \
  -d '{"requestedTimeRange":{"startTime":"2026-05-27T00:00:00Z","endTime":"2026-08-24T00:00:00Z"}}' \
  "https://bigquerydatatransfer.googleapis.com/v1/$CFG:startManualRuns"
```

One run per day in the range, so a year is ~365 runs.

**DTS serializes manual runs roughly 10 minutes apart** — it does not parallelize them. So a 90-day backfill takes ~15 hours of wall clock, and a full year would take ~2.5 days. Queue it and walk away; don't sit waiting on it, and don't re-issue the same range thinking it stalled. Until it drains, BigQuery coverage is partial and **the Data API remains the source of truth for any trend**.

Check state:

```bash
curl -s -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -H "x-goog-user-project: agility-cms-ga-data" \
  "https://bigquerydatatransfer.googleapis.com/v1/$CFG/runs?pageSize=20" \
  | python3 -c "
import sys,json,collections
r=json.load(sys.stdin).get('transferRuns',[])
print(dict(collections.Counter(x.get('state') for x in r)))
for x in r:
    if x.get('errorStatus'): print(' ',x['runTime'],x['errorStatus'].get('message','')[:120])"
```

## Source 3 — HubSpot (lead-level content attribution)

The only way to tie an AI referral to a *named person and company*. **Use the script, not the MCP** (see Trap 6):

```bash
.claude/skills/ai-referral-report/scripts/hubspot.py providers   # leads per AI provider
.claude/skills/ai-referral-report/scripts/hubspot.py content     # landing page -> lead count
.claude/skills/ai-referral-report/scripts/hubspot.py leads       # company, provider, page, stage
.claude/skills/ai-referral-report/scripts/hubspot.py stages      # funnel position
.claude/skills/ai-referral-report/scripts/hubspot.py raw         # NDJSON
```

Optional: `--since 2026-01-01`, `--limit N`.

**Auth:** a Private App token in `$HUBSPOT_TOKEN`, or a `HUBSPOT_TOKEN=` line in `.env.local` at the repo root (already gitignored via `.env*.local`). Create it at HubSpot **Settings → Integrations → Private Apps → Create** with scope `crm.objects.contacts.read`. The script never prints or logs the token, and never takes it as an argument.

Properties it reads:

| Property | Meaning |
|---|---|
| `hs_analytics_source` | `AI_REFERRALS` is a native bucket, but recent — under-counts history |
| `hs_analytics_source_data_1` | the AI domain, e.g. `chatgpt.com` |
| `hs_analytics_first_referrer` | searched as well, to catch pre-`AI_REFERRALS` contacts |
| `hs_analytics_first_url` | landing page → **this is the content attribution** |
| `lifecyclestage`, `company`, `hs_analytics_num_page_views` | funnel + firmographics |

The script searches both referrer fields across all providers and de-dupes by contact id, because the `AI_REFERRALS` bucket is new and older contacts sit under `REFERRALS` with the AI domain surviving only in `first_referrer`.

**Expect small numbers, and don't treat that as a bug.** HubSpot holds ~9 AI-attributed contacts against ~1,467 marketing-site AI sessions — roughly a 0.6% session→known-contact rate. That is a plausible conversion rate for cold discovery traffic, not a tracking failure. Verified two independent ways: the `AI_REFERRALS` bucket returns 8, and the domain search across both fields returns 9.

## Source 4 — PostHog (the two bot populations)

**This is the only source that sees AI bots at all.** GA4 fires from JavaScript;
crawlers don't run it, so Sources 1–3 cover *referred humans only*. Middleware
records the other two populations server-side as `ai_bot_request`.

| Property | Values |
|---|---|
| `ai_category` | `training` (bulk corpus) · `retrieval` (fetched while answering, or AI-search indexing) |
| `ai_bot` | `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `Claude-User`, `PerplexityBot`, … |
| `ai_vendor` | OpenAI, Anthropic, Perplexity, Google, Meta, … |
| `path`, `host` | what was fetched |
| `deploy_context` | `production` for real traffic — preview/dev are suppressed at source |

**`retrieval` is the number that matters.** It happens whether or not anyone
clicks, so it separates "we are not being cited" from "we are cited and the
assistant answered in place". Referral decline means opposite things in those two
worlds, so never report a referral trend without it.

Query via the PostHog MCP (`mcp__posthog__exec`) — HogQL, e.g.:

```sql
SELECT properties.ai_category, properties.ai_bot, count() AS hits
FROM events
WHERE event = 'ai_bot_request' AND timestamp > now() - INTERVAL 30 DAY
GROUP BY 1, 2 ORDER BY hits DESC
```

PostHog also holds **referred humans** independently, via `$referring_domain` on
pageviews. Cross-check it against GA4 Source 1: agreement validates the `(not
set)` exclusion in Trap 3, and disagreement is itself informative. PostHog
additionally has per-event data, session recordings and funnels — which is how
you answer "what did AI-referred visitors actually *do*", something GA4's
pre-aggregated API structurally cannot.

**Two caveats before trusting the bot totals:**

1. **Probably complete, but confirm once.** Netlify's [request
   chain](https://docs.netlify.com/resources/troubleshooting/request-chain/) runs
   *Edge Functions (before cache)* at step 5 and the *Edge Cache* at step 6, and
   Next.js middleware compiles to a Netlify edge function — so middleware should
   see every request, including cache hits. Only an edge function explicitly
   configured for caching moves to step 7 and gets skipped on hits, which this one
   is not. Still verify empirically for the Next runtime: hit one path twice with a
   bot UA, confirm the second reports a `cache-status` hit, and check whether one
   or two events landed. **If only one landed, every bot total here is a lower
   bound**, since crawlers overwhelmingly request cacheable pages.
2. **No sampling or rate limit.** One event per bot request, uncapped. A large
   GPTBot or Bytespider sweep — or a spoofed UA — can burst thousands of events.
   Watch volume for the first week and add sampling if it's material.

## Standard report recipe

1. Auth check.
2. `sources` + `monthly` over the last 12 months via the Data API → volume and trend.
3. `landing-pages` → which content AI actually surfaces.
4. `events` → conversions (`free_trial`, `request_a_demo`, `new_demo_request`, `file_download`).
5. `hubspot.py content` + `leads` → named leads with landing pages.
6. **PostHog `ai_bot_request` grouped by `ai_category`** → the crawl-vs-retrieval split.
   Do this before writing any conclusion about the referral trend, for the reason
   in Source 4.
7. Cross-check any company names against `customUser:Snitcher*` dims (Trap 5).

Always report AI traffic as a **share of total sessions** — it's small (~0.5% of
the marketing site), and an absolute number without that context overstates it.

Report the three populations separately and never sum them. A crawl hit, a
retrieval fetch and a human visit are different events with different meanings;
a combined "AI traffic" figure is the single easiest way to mislead a reader here.

## Traps

These cost real time to find. Do not skip.

**1. The app pollutes everything.** The property has two streams, and `app.agilitycms.com` is ~37% of raw AI session counts — logged-in CMS work sessions with 40+ pages/session and ~50min durations, not content discovery. **Always filter `hostName = agilitycms.com`** unless you specifically want app traffic. Unfiltered AI numbers are roughly 1.5× the real content-discovery figure.

**2. Never trend on `sessionDefaultChannelGroup = "AI Assistant"`.** GA4 only started applying `medium=ai-assistant` in **June 2026** and did not backfill. That channel group shows ~238 sessions where `sessionSource` finds ~2,155 for the same window; everything earlier sits under "Referral". **Trend on `sessionSource`, always.**

**3. `(not set)` rows are bot/link-preview noise.** ~12% of AI sessions have `(not set)` landing page and medium, ~4% engagement, 0 pages/session. Exclude them from engagement analysis or they'll drag every average down.

**4. Only ChatGPT tags its links.** ChatGPT appends `?utm_source=chatgpt.com`, so it's traceable in server logs, GA, and HubSpot alike. Claude, Perplexity, and Gemini are **referrer-only** — no UTM. So ChatGPT attribution is structurally more durable, and cross-source comparisons are not apples-to-apples.

**5. Snitcher is mostly empty.** `customUser:SnitcherCompanyName` / `...Industry` / `...Size` / `...Domain` exist on the property but are ~97% `(not set)`. Useful for the handful that resolve (it has correctly named real companies that HubSpot independently confirmed) — useless for aggregate analysis.

**6. Do not use the HubSpot MCP for this — use `hubspot.py`.** The MCP's `search_crm_objects` starts refusing after ~4 queries and stayed rate-limited for over an hour in practice, and its `query_crm_data` (SQL) tool is unusable because the connector lacks the `crm.hubsql.execute` scope, so it can't `GROUP BY` at all. The Private App token the script uses has far higher limits and no scope gap. The MCP is fine for one-off spot checks of a single contact; it is not viable for reporting.

**7. `claude.ai` numbers are inflated by internal use.** A large share of claude.ai sessions land on `app.agilitycms.com`, and Snitcher names "Agility CMS" itself as the top claude.ai company — the team using Claude and clicking into the CMS. Filter by host (Trap 1) and treat claude.ai growth claims skeptically.

## Limits — don't chase these

**The prompt is unrecoverable.** `pageReferrer` on AI sessions is the bare origin only: `https://chatgpt.com/`, `https://claude.ai/`, `https://www.perplexity.ai/`. No conversation ID, no query, no citation context. All providers strip it by design. Landing-page inference is the only available signal for *why* someone arrived.

**There is no raw event-level export.** GA4's native BigQuery export (`events_YYYYMMDD` tables) could not be created on this property. "BigQuery links" is entirely absent from Admin → Product links, and all admin routes 404. `bigQueryLinks.create` returns a contentless 403 even with: Administrator on the property, an explicitly-minted `analytics.edit` token, the Admin API enabled, and `roles/owner` on the target Cloud project. Reads (`bigQueryLinks.list`) work fine. Every permission theory was tested and eliminated — this looks like account-level feature unavailability, so it needs Google support, not configuration. **The DTS connector in Source 2 is the substitute; it provides rollups, not per-event rows.**

**Billing is confirmed enabled** on `agility-cms-ga-data` (account `01E5A9-885A55-30D404`), so this is *not* the BigQuery sandbox and **tables do not expire** — verified by both `billingInfo` and the absence of any `defaultTableExpirationMs` / `expirationTime` / partition expiry on the dataset and tables. History accumulates indefinitely. Re-check with:

```bash
bq show --project_id=agility-cms-ga-data --format=prettyjson \
  agility-cms-ga-data:ga4_agility_website | grep -i expiration
```

Any non-null expiration appearing there means something changed and the retention assumption needs revisiting.

## Baselines (Aug 2025 – Aug 2026)

For sanity-checking future runs. Marketing site only unless noted.

- **2,155** AI sessions across all hosts = **0.39%** of 551,721 sessions
- **1,467** on `agilitycms.com`; **787** on `app.agilitycms.com`
- By source: chatgpt.com 1,435 · claude.ai 287 · perplexity 226 · gemini 136 · copilot 10
- Top AI-discovered content: `/` (237) · `/blog/digitization-digitalization-and-digital-transformation-explained` (104) · `/blog/top-10-web-development-trends-technologies-for-2026` (71) · `/blog/how-to-tell-what-cms-a-website-uses` (69)
- Conversions from AI sessions: 7 `free_trial`, 5 `new_demo_request`, 4 `request_a_demo`, 3 `file_download`
- 94% desktop
- Channel baseline for comparison: Referral 80% engagement, Organic Search 70%, Direct 50%
- HubSpot: **9** AI-attributed contacts — 7 chatgpt, 1 claude, 1 gemini; 3 MQL, 3 lead, 2 customer. 5 of 9 landed on `/`.

### Two findings that contradict the usual narrative

**AI referral share peaked a year ago and has roughly halved.** Monthly share of total sessions: 1.55% (2025-08), 1.46% (09), 0.85% (10), 0.66% (11), 0.70% (12), 1.06% (2026-01), 0.18% (02), 0.24% (03), 0.48% (04), 0.34% (05), 0.43% (06), 0.51% (07). ChatGPT absolute volume fell with it — ~115–138/month in late 2025 to ~40–58/month by mid-2026. If a future run shows growth, check it against these numbers before reporting a trend.

**Claude is overtaking ChatGPT.** Aug 2026 was the first month Claude led (24 vs 9). Claude went from 2–5/month in late 2025 to 13–24/month by mid-2026 while ChatGPT declined. Sustained across weeks 202632–202634, so not a single spike — but see the caveat below.

**Read all of this at monthly resolution.** Weekly AI totals run 12–28 sessions; at that scale one Reddit thread moves the chart. Never defend a week-over-week claim, and always check whether the current month is partial before comparing it to a closed one.
