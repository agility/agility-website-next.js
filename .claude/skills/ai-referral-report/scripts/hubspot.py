#!/usr/bin/env python3
"""
AI-referred contacts from HubSpot, via the CRM Search API and a Private App token.

    ./hubspot.py [mode] [--since YYYY-MM-DD] [--limit N]

Modes:
    providers  contacts grouped by AI provider (default)
    content    landing page -> lead count, the content attribution view
    leads      one row per contact: company, provider, landing page, stage
    stages     funnel position of AI-referred contacts
    raw        newline-delimited JSON of every matched contact

Why this exists instead of the HubSpot MCP: the MCP's CRM Search tool rate-limits
after ~4 calls and stays limited for a long time, and its SQL tool lacks the
crm.hubsql.execute scope so it cannot aggregate. A Private App token has far
higher limits and no such restriction.

Token: read from $HUBSPOT_TOKEN, else the HUBSPOT_TOKEN line in .env.local at the
repo root. Never printed, never logged, never passed as a CLI argument.

Create one at: HubSpot Settings -> Integrations -> Private Apps -> Create,
with scope `crm.objects.contacts.read`.
"""
import datetime
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from collections import Counter, defaultdict

API = "https://api.hubapi.com/crm/v3/objects/contacts/search"

# hs_analytics_source_data_1 holds the bare referring domain for referral traffic.
PROVIDERS = ["chatgpt", "claude", "perplexity", "gemini", "copilot", "openai"]

PROPS = [
    "email", "company", "createdate", "lifecyclestage",
    "hs_analytics_source", "hs_analytics_source_data_1",
    "hs_analytics_first_referrer", "hs_analytics_first_url",
    "hs_analytics_num_page_views",
]


def load_token():
    tok = os.environ.get("HUBSPOT_TOKEN", "").strip()
    if tok:
        return tok
    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
    envfile = os.path.join(root, ".env.local")
    try:
        with open(envfile) as fh:
            for line in fh:
                if line.startswith("HUBSPOT_TOKEN="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    except OSError:
        pass
    sys.exit(
        "No HubSpot token. Set $HUBSPOT_TOKEN or add HUBSPOT_TOKEN=... to .env.local\n"
        "Create one: HubSpot Settings -> Integrations -> Private Apps (scope: crm.objects.contacts.read)"
    )


def post(token, body, attempt=0):
    req = urllib.request.Request(
        API,
        data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")[:300]
        if e.code == 429 and attempt < 5:
            wait = 2 ** attempt
            print("  rate limited, retrying in %ds" % wait, file=sys.stderr)
            time.sleep(wait)
            return post(token, body, attempt + 1)
        if e.code == 401:
            sys.exit("401 Unauthorized — token is invalid or missing the crm.objects.contacts.read scope.")
        sys.exit("HubSpot %s: %s" % (e.code, detail))


# Two properties worth searching. source_data_1 is the clean domain, but HubSpot
# only added the AI_REFERRALS bucket recently — older contacts got filed under
# REFERRALS with the AI domain surviving only in first_referrer. Searching both
# and merging is the difference between ~9 contacts and the real historical set.
SEARCH_FIELDS = ["hs_analytics_source_data_1", "hs_analytics_first_referrer"]


def to_epoch_ms(day):
    """
    HubSpot treats createdate as a datetime, which its search API expects as
    UTC epoch milliseconds. A bare YYYY-MM-DD is rejected.
    """
    dt = datetime.datetime.strptime(day, "%Y-%m-%d").replace(tzinfo=datetime.timezone.utc)
    return str(int(dt.timestamp() * 1000))


def fetch(token, since=None, cap=1000):
    """Search each provider across both referrer fields, merged and de-duplicated by id."""
    since_ms = to_epoch_ms(since) if since else None
    found, seen = [], set()
    for field in SEARCH_FIELDS:
        for prov in PROVIDERS:
            after, pulled = None, 0
            while pulled < cap:
                filters = [{
                    "propertyName": field,
                    "operator": "CONTAINS_TOKEN",
                    "value": "*%s*" % prov,
                }]
                if since_ms:
                    filters.append({"propertyName": "createdate", "operator": "GTE", "value": since_ms})
                body = {
                    "filterGroups": [{"filters": filters}],
                    "properties": PROPS,
                    "limit": 100,
                    "sorts": [{"propertyName": "createdate", "direction": "DESCENDING"}],
                }
                if after:
                    body["after"] = after
                data = post(token, body)
                results = data.get("results", [])
                for r in results:
                    if r["id"] not in seen:
                        seen.add(r["id"])
                        found.append(r)
                pulled += len(results)
                after = (data.get("paging") or {}).get("next", {}).get("after")
                if not after:
                    break
    return found


def referrer_host(url):
    """Host of a referrer URL, or '' — so a provider name in a PATH cannot match."""
    if not url:
        return ""
    m = re.match(r"^https?://([^/?#]+)", url.strip(), re.I)
    return (m.group(1) if m else url.strip()).lower()


def provider_of(p):
    """
    Check BOTH fields rather than `or`-ing them: a contact recovered via
    first_referrer often has a non-AI source_data_1 (IMPORT, a campaign name,
    the pre-AI_REFERRALS bucketing), and short-circuiting on the first
    non-empty value labels exactly those contacts "unknown".
    """
    candidates = [
        (p.get("hs_analytics_source_data_1") or "").lower(),
        referrer_host(p.get("hs_analytics_first_referrer")),
    ]
    for value in candidates:
        for prov in PROVIDERS:
            if prov in value:
                return {"openai": "chatgpt"}.get(prov, prov)
    return "unknown"


def is_ai_referred(p):
    """
    Server-side search matches `*provider*` anywhere in the field, including a
    URL path — so `/blog/claude-vs-chatgpt-for-content` would qualify as an AI
    referral. Re-check host-only here and drop the false positives.
    """
    return provider_of(p) != "unknown"


# Tracking params to drop so the same page groups as one row. utm_source is the
# one ChatGPT appends; the rest are ordinary campaign/ad noise.
_TRACKING = re.compile(
    r"(?:utm_[a-z]+|gclid|fbclid|msclkid|hsa_[a-z]+|_hsenc|_hsmi)=[^&]*", re.I
)


def clean_url(u):
    """Strip origin and tracking params so the same page groups together."""
    if not u:
        return "(none)"
    u = re.sub(r"^https?://[^/]+", "", u)
    # Split query off first, filter it, then reassemble — regex-substituting
    # params in place leaves orphaned separators (`/p?a=1&b=2` -> `/p&b=2`).
    path, sep, query = u.partition("?")
    if sep:
        kept = [kv for kv in query.split("&") if kv and not _TRACKING.fullmatch(kv)]
        u = path + ("?" + "&".join(kept) if kept else "")
    return u or "/"


def main():
    args = sys.argv[1:]
    mode = args[0] if args and not args[0].startswith("--") else "providers"

    def flag_value(name):
        if name not in args:
            return None
        i = args.index(name) + 1
        if i >= len(args) or args[i].startswith("--"):
            sys.exit("%s requires a value" % name)
        return args[i]

    since = flag_value("--since")
    if since and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", since):
        sys.exit("--since must be YYYY-MM-DD, got %r" % since)

    cap_raw = flag_value("--limit")
    try:
        cap = int(cap_raw) if cap_raw else 1000
    except ValueError:
        sys.exit("--limit must be an integer, got %r" % cap_raw)

    token = load_token()
    raw = fetch(token, since, cap)

    # Drop server-side false positives (provider name matched a URL path).
    rows = [r for r in raw if is_ai_referred(r.get("properties", {}))]
    dropped = len(raw) - len(rows)
    props = [r.get("properties", {}) for r in rows]

    print("== hubspot %s | %d AI-referred contacts%s ==" % (
        mode, len(rows), " since " + since if since else ""))
    if dropped:
        print("   (%d matched on a URL path rather than a referrer host — excluded)" % dropped)
    if not rows:
        print("(none)")
        return

    if mode == "providers":
        c = Counter(provider_of(p) for p in props)
        print("%-14s %8s %7s" % ("PROVIDER", "LEADS", "SHARE"))
        for k, v in c.most_common():
            print("%-14s %8d %6.0f%%" % (k, v, 100.0 * v / len(props)))

    elif mode == "content":
        agg = defaultdict(Counter)
        for p in props:
            agg[clean_url(p.get("hs_analytics_first_url"))][provider_of(p)] += 1
        order = sorted(agg.items(), key=lambda kv: -sum(kv[1].values()))
        print("%-58s %6s   %s" % ("LANDING PAGE", "LEADS", "BY PROVIDER"))
        for url, c in order:
            mix = ", ".join("%s:%d" % (k, v) for k, v in c.most_common())
            print("%-58s %6d   %s" % (url[:57], sum(c.values()), mix))

    elif mode == "leads":
        print("%-30s %-26s %-10s %-40s %s" % ("COMPANY", "EMAIL", "PROVIDER", "LANDING PAGE", "STAGE"))
        for p in props:
            print("%-30s %-26s %-10s %-40s %s" % (
                (p.get("company") or "-")[:29],
                (p.get("email") or "-")[:25],
                provider_of(p),
                clean_url(p.get("hs_analytics_first_url"))[:39],
                p.get("lifecyclestage") or "-"))

    elif mode == "stages":
        c = Counter(p.get("lifecyclestage") or "(unset)" for p in props)
        print("%-26s %8s" % ("LIFECYCLE STAGE", "LEADS"))
        for k, v in c.most_common():
            print("%-26s %8d" % (k, v))

    elif mode == "raw":
        for r in rows:
            print(json.dumps(r))

    else:
        sys.exit("Unknown mode: %s (providers|content|leads|stages|raw)" % mode)


if __name__ == "__main__":
    main()
