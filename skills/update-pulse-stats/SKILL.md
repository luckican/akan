---
name: update-pulse-stats
description: >-
  Research and update Akan Reports homepage Pulse figures in data/pulse.yaml
  (USD/GHS, inflation, cocoa, GSE Composite). Use when the user asks to refresh
  Pulse, update pulse.yaml, update Ghana market/macro stats on the homepage, or
  run a periodic Pulse update for that file.
---

# Update Pulse stats

Keep `data/pulse.yaml` accurate. The homepage reads it via `hugo.Data.pulse` in `layouts/home.html`.

## Do

1. Read the current `data/pulse.yaml`.
2. Research fresh figures for each of the four items (see sources below). Prefer primary sources; use reputable secondary sources only to corroborate or when the primary page is unavailable.
3. Update only `value`, `change`, and `direction` for items you can verify. Keep `kicker`, `title`, `description`, item order, and `label` strings unchanged.
4. Do **not** invent numbers. If a metric cannot be verified, leave that item unchanged and say so in the report.
5. Do **not** commit unless the user explicitly asks.
6. Optionally run `hugo --buildDrafts --noBuildLock --destination /tmp/akan-reports-build` to confirm the site still builds.

## Schema

```yaml
kicker: Akan data desk
title: The pulse
description: A fast read on the numbers shaping business and household decisions today.
items:
  - label: USD / GHS
    value: "11.27"      # string
    change: "▲ 0.20%"   # starts with ▲ or ▼
    direction: up       # up | down
  - label: Inflation
    value: "4.6%"
    change: "▼ 0.7 pts"
    direction: down
  - label: Cocoa / tonne
    value: "$6,457"
    change: "▼ 0.8%"
    direction: down
  - label: GSE Composite
    value: "14,951"
    change: "▼ 0.83%"
    direction: down
```

`direction` must match the arrow: `▲` → `up`, `▼` → `down`.

## Metrics and preferred sources

| Label | Prefer | Value format | Change comparison |
|-------|--------|--------------|-------------------|
| `USD / GHS` | Bank of Ghana daily interbank FX (mid / weighted median) | e.g. `11.27` | vs prior verified BoG session when available |
| `Inflation` | Ghana Statistical Service headline CPI YoY | e.g. `4.6%` | vs prior month in percentage points (`▼ 0.7 pts`) |
| `Cocoa / tonne` | ICE US cocoa continuous, USD per metric tonne | e.g. `$6,457` | vs prior session % |
| `GSE Composite` | Ghana Stock Exchange Composite Index close | whole number, e.g. `14,951` | vs previous close % |

Starting URLs and notes: [sources.md](sources.md).

## Formatting rules

- Quote all `value` and `change` strings.
- FX: two decimal places unless the source is conventionally shown otherwise.
- Inflation: one decimal place with `%`.
- Cocoa: dollar sign, thousands separator, no decimals unless the source quote needs them.
- GSE: round to nearest whole index point.
- Percent changes: one or two decimals as clarity needs (`0.20%`, `0.8%`, `0.83%`).
- Inflation monthly move: `pts` (percentage points), not `%`.

## Verification

For each updated metric, confirm before writing the file:

- The figure matches the cited source page or release.
- The as-of date is clear (trading day, CPI reference month, etc.).
- The change delta is computed from a stated prior value, not guessed.
- Rate type is known (e.g. BoG interbank mid, not an unverified parallel-market print).

Editorial rule: Pulse figures must be reproducible from recorded sources (`editorial/REPORTING_AND_QUALITY_RULES.md`). Treat presentation as data, not decoration.

## Report back

After updating (or skipping) items, return:

1. Table or list: label, new value, change, comparison basis, as-of date, source URL.
2. Which items were left unchanged and why.
3. Confirmation that `data/pulse.yaml` was written (or that no write was needed).

## Periodic runs

When invoked on a schedule or recurring agent loop:

- Run the full research + update workflow each tick.
- Prefer market days for FX, cocoa, and GSE; inflation only changes when GSS publishes.
- Keep the report short on quiet days (“no change” is a valid outcome if figures are unchanged).
- Still do not commit unless the user asked for commits on each run.
