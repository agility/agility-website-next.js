#!/usr/bin/env bash
# AI referral queries against the GA4 Data API.
#
#   ./ga4.sh <preset> [start] [end] [--all-hosts]
#
# Presets: sources | landing-pages | monthly | events | companies | params | referrers
# Dates:   GA4-style (2025-08-01, 90daysAgo, today). Default: 365daysAgo -> today.
#
# By default every preset filters to hostName = agilitycms.com, which excludes
# app.agilitycms.com (the CMS app, ~37% of raw AI session counts and not content
# discovery). Pass --all-hosts to include it.
set -euo pipefail

PROPERTY=354952039
QUOTA_PROJECT=clear-aurora-382115

PRESET="sources"
# Relative default so the window stays a rolling 12 months. A hardcoded date
# silently widens forever and stops matching the baselines in SKILL.md.
START="365daysAgo"
END="today"
ALL_HOSTS=""

# Scan every arg for the flag rather than pinning it to $4, so `ga4.sh sources
# --all-hosts` cannot land the flag in the start-date slot.
POSITIONAL=()
for arg in "$@"; do
  case "$arg" in
    --all-hosts) ALL_HOSTS="--all-hosts" ;;
    --*) echo "Unknown flag: $arg" >&2; exit 1 ;;
    *) POSITIONAL+=("$arg") ;;
  esac
done
[ "${#POSITIONAL[@]}" -ge 1 ] && PRESET="${POSITIONAL[0]}"
[ "${#POSITIONAL[@]}" -ge 2 ] && START="${POSITIONAL[1]}"
[ "${#POSITIONAL[@]}" -ge 3 ] && END="${POSITIONAL[2]}"

TOKEN=$(gcloud auth application-default print-access-token 2>/dev/null) || {
  echo "No ADC token. Run: gcloud auth application-default login --scopes=https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform" >&2
  exit 1
}

AI_SOURCES='["chatgpt.com","claude.ai","perplexity.ai","perplexity","gemini.google.com","copilot.com","copilot.microsoft.com"]'
AI_FILTER="{\"filter\":{\"fieldName\":\"sessionSource\",\"inListFilter\":{\"values\":$AI_SOURCES}}}"
HOST_FILTER='{"filter":{"fieldName":"hostName","stringFilter":{"value":"agilitycms.com"}}}'

# The scope as a bare expression LIST, so presets that add their own conditions
# can append to it. Building a finished andGroup here is what previously let the
# events/params presets drop the host scope and silently ignore --all-hosts.
if [ "$ALL_HOSTS" = "--all-hosts" ]; then
  SCOPE_EXPRS="$AI_FILTER"
else
  SCOPE_EXPRS="$AI_FILTER,$HOST_FILTER"
fi
SCOPED="{\"andGroup\":{\"expressions\":[$SCOPE_EXPRS]}}"

case "$PRESET" in
  sources)
    DIMS='[{"name":"sessionSource"},{"name":"sessionMedium"}]'
    METS='[{"name":"sessions"},{"name":"totalUsers"},{"name":"engagementRate"},{"name":"averageSessionDuration"},{"name":"keyEvents"}]'
    FILTER="$SCOPED"; LIMIT=50 ;;
  landing-pages)
    DIMS='[{"name":"landingPagePlusQueryString"}]'
    METS='[{"name":"sessions"},{"name":"totalUsers"},{"name":"engagementRate"},{"name":"averageSessionDuration"},{"name":"keyEvents"}]'
    FILTER="$SCOPED"; LIMIT=40 ;;
  monthly)
    DIMS='[{"name":"yearMonth"},{"name":"sessionSource"}]'
    METS='[{"name":"sessions"}]'
    FILTER="$SCOPED"; LIMIT=400 ;;
  events)
    # Strip the automatic events so only meaningful conversions remain.
    NOISE='["page_view","session_start","first_visit","user_engagement","scroll","click","view_search_results","form_start"]'
    DIMS='[{"name":"sessionSource"},{"name":"eventName"}]'
    METS='[{"name":"eventCount"}]'
    FILTER="{\"andGroup\":{\"expressions\":[$SCOPE_EXPRS,{\"notExpression\":{\"filter\":{\"fieldName\":\"eventName\",\"inListFilter\":{\"values\":$NOISE}}}}]}}"
    LIMIT=40 ;;
  companies)
    # Snitcher reverse-IP firmographics. ~97% "(not set)" — see Trap 5.
    DIMS='[{"name":"customUser:SnitcherCompanyName"},{"name":"customUser:SnitcherCompanyIndustry"},{"name":"customUser:SnitcherCompanySize"},{"name":"sessionSource"}]'
    METS='[{"name":"sessions"}]'
    FILTER="$SCOPED"; LIMIT=60 ;;
  params)
    # What query strings arrive. Only ChatGPT tags links (utm_source=chatgpt.com).
    DIMS='[{"name":"pageLocation"}]'
    METS='[{"name":"sessions"}]'
    FILTER="{\"andGroup\":{\"expressions\":[$SCOPE_EXPRS,{\"filter\":{\"fieldName\":\"pageLocation\",\"stringFilter\":{\"matchType\":\"CONTAINS\",\"value\":\"?\"}}}]}}"
    LIMIT=30 ;;
  referrers)
    # Proof the prompt is unrecoverable: bare origins only.
    DIMS='[{"name":"pageReferrer"}]'
    METS='[{"name":"sessions"}]'
    FILTER="$SCOPED"; LIMIT=25 ;;
  *)
    echo "Unknown preset: $PRESET" >&2
    echo "Use: sources | landing-pages | monthly | events | companies | params | referrers" >&2
    exit 1 ;;
esac

ORDER='[{"metric":{"metricName":"sessions"},"desc":true}]'
[ "$PRESET" = "monthly" ] && ORDER='[{"dimension":{"dimensionName":"yearMonth"}}]'
[ "$PRESET" = "events" ]  && ORDER='[{"metric":{"metricName":"eventCount"},"desc":true}]'

BODY=$(cat <<JSON
{"dateRanges":[{"startDate":"$START","endDate":"$END"}],
 "dimensions":$DIMS,"metrics":$METS,
 "dimensionFilter":$FILTER,"orderBys":$ORDER,"limit":$LIMIT}
JSON
)

echo "== $PRESET | $START -> $END | hosts: ${ALL_HOSTS:-agilitycms.com only} =="

curl -s -m 120 -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "x-goog-user-project: $QUOTA_PROJECT" \
  -H "Content-Type: application/json" \
  -d "$BODY" \
  "https://analyticsdata.googleapis.com/v1beta/properties/$PROPERTY:runReport" \
| python3 -c '
import sys, json
d = json.load(sys.stdin)
if "error" in d:
    print("API ERROR:", d["error"].get("message", "")[:400]); sys.exit(1)
rows = d.get("rows", [])
if not rows:
    print("(no rows)"); sys.exit(0)
dh = [h["name"] for h in d.get("dimensionHeaders", [])]
mh = [h["name"] for h in d.get("metricHeaders", [])]

def fmt(name, v):
    try: f = float(v)
    except ValueError: return v
    if "Rate" in name: return "%.0f%%" % (f * 100)
    if "Duration" in name: return "%.0fs" % f
    if f == int(f): return str(int(f))
    return "%.1f" % f

widths = [min(58, max(len(h), *(len(r["dimensionValues"][i]["value"]) for r in rows))) for i, h in enumerate(dh)]
hdr = "  ".join(h[:w].ljust(w) for h, w in zip(dh, widths)) + "  " + "  ".join(h[:13].rjust(13) for h in mh)
print(hdr); print("-" * len(hdr))
for r in rows:
    dv = "  ".join(r["dimensionValues"][i]["value"][:w].ljust(w) for i, w in enumerate(widths))
    mv = "  ".join(fmt(mh[i], m["value"]).rjust(13) for i, m in enumerate(r["metricValues"]))
    print(dv + "  " + mv)
tot = d.get("totals", [])
if tot:
    print("-" * len(hdr))
    print("TOTAL".ljust(sum(widths) + 2 * len(widths)) + "  ".join(fmt(mh[i], m["value"]).rjust(13) for i, m in enumerate(tot[0]["metricValues"])))
print("\nrows: %d   (GA4 rowCount: %s)" % (len(rows), d.get("rowCount")))
'
