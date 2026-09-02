# Akan Reports operating manual

How to run and tweak the live site. For editorial *what to publish*, start with `editorial/CONTENT_STRATEGY.md`. For agent behaviour, start with `AGENTS.md`.

**Stack:** Hugo templates + Markdown + CSS + minimal JS. Deploy: GitHub → Vercel. DNS: Cloudflare → Vercel (DNS only / grey cloud).

---

## Quick map

| I want to… | Go here |
|---|---|
| Publish / unpublish a story | Story `index.md` → `draft` + `workflow.status` |
| Put a story on the homepage | Story `index.md` → `home.position` + `home.weight` |
| Change which section it belongs to | Story `index.md` → `primary_section` |
| Change headline / deck / body | Story `index.md` |
| Update Pulse numbers | `data/pulse.yaml` |
| Change site tagline / GA ID / base URL | `hugo.yaml` |
| Change colours, type, layout look | `assets/css/site.css` (+ `DESIGN.md`) |
| Change page structure / modules | `layouts/` |
| Change nav labels / links | `layouts/partials/site-header.html` |
| Favicon / share image / fonts | `static/` |
| About, Privacy, Contact copy | `content/<page>/_index.md` |
| Deploy settings | `vercel.json`, `build.sh` |
| Reporting rules for agents | `editorial/` |

---

## Daily publishing loop

1. Agent or human creates `content/stories/<slug>/index.md` with `draft: true` and `workflow.status: review`.
2. Human reviews (rules in `editorial/`).
3. To publish: set `draft: false`, `workflow.status: approved`, fill `reviewed_at` and `decision_note`, set `home.position` if it should appear on the homepage.
4. Commit and push to `main`. Vercel builds production (drafts excluded).
5. Live URL: `https://akanreports.com/stories/<slug>/`.

Local preview including drafts:

```sh
hugo server --buildDrafts
```

Production-like check:

```sh
hugo --gc --minify --environment production
```

---

## Story file knobs (`content/stories/<slug>/index.md`)

Every story is a folder with `index.md`. Optional hero image lives beside it when `editorial.visual.treatment` is `image`.

### Must set for readers

| Field | What it does |
|---|---|
| `title` | Public headline |
| `description` | Standfirst / card summary / SEO description |
| `date` | Publication time (listings, “Latest”) |
| `lastmod` | Update time (change only for meaningful public updates) |
| `draft` | `true` = hidden from production; `false` = live |
| `primary_section` | `ghana` \| `business` \| `world` → section pages + nav highlight |
| `topics` | Labels for filters/cards (e.g. `inflation`, `education`) |
| `format` | `signal` \| `report` \| `analysis` \| `explainer` \| `feature` (editorial; not shown as a public badge by default) |

### Homepage placement

```yaml
home:
  position: briefing   # see table below
  weight: 6            # lower number = higher in that slot
  expires: null        # optional ISO time; after this, drop from home slots
```

| `home.position` | Homepage module | Cap |
|---|---|---|
| `lead` | Top lead story | 1 |
| `secondary` | Beside the lead | 2 |
| `briefing` | “Today, briefly” card grid | 3 |
| `focus` | “In focus” block | 1 |
| `world` | “Beyond Ghana” | 3 |
| `none` | Live site, not featured on home | — |

Optional: `home.stat` — chart/stat block on the lead story only (see `editorial/AGENT_SUBMISSION_CONTRACT.md`).

### Breaking strip

```yaml
breaking:
  active: true
  expires: 2026-09-03T12:00:00Z   # required when active
```

Shows the top “Live” strip on the homepage until `expires`.

### Section page lead

```yaml
section_lead: true
```

Makes this story the lead on its `primary_section` page (`/ghana/`, `/business/`, `/world/`). Prefer one clear lead per section.

### Optional article presentation

| Field | Effect |
|---|---|
| `dek` | Longer deck on the article page if `description` is too short |
| `headline_lead` + `headline_emphasis` | Split headline styling; together must equal `title` |
| `hero` | Image hero (`src`, `alt`, `caption`, `credit`) + file in the story folder |
| `typographic_hero` | Type-only hero (`lead`, `emphasis`) |
| `highlights` | Side list of short supported points |
| `methodology_note` | Public methods note |
| `source_note` | Rare public source disclosure |
| `corrections` | Dated public corrections |
| `related` | Explicit related story slugs |
| `canonical_url` | Only if canonical home is elsewhere |
| `section_dek` | Deck used on the section lead card |

### Workflow (not shown to readers)

```yaml
workflow:
  status: review          # review | approved | rejected | …
  agent: discovery-…
  created_at: …
  reviewed_at: …
  decision_note: "…"
```

### Editorial internals (not shown to readers)

`editorial.strategy_stream`, `angle_lens`, `angle`, `reader_value`, `visual`, `verification_notes`, `source_notes`.

Full field contract: `editorial/AGENT_SUBMISSION_CONTRACT.md` and `frontend_concept/CONTENT_MODEL.md`.

New story scaffold:

```sh
hugo new stories/my-slug/index.md
```

(Uses `archetypes/default.md`.)

---

## Homepage Pulse (`data/pulse.yaml`)

The four homepage Pulse figures. Edit `value`, `change`, and `direction` (`up` \| `down`). Keep labels unless you intentionally redesign the module.

Agent skill: `skills/update-pulse-stats/` (and `.cursor/skills/update-pulse-stats/`).

---

## Site-wide config (`hugo.yaml`)

| Setting | Effect |
|---|---|
| `baseURL` | Canonical site URL (production: `https://akanreports.com/`) |
| `title` | Site name |
| `params.description` | Default meta description + footer blurb |
| `params.accraTimezone` | Accra clock context |
| `params.analytics.gaMeasurementId` | GA4 ID; loads **only** on production builds |
| `outputs.home` | `html`, `json` (search index), `rss` |
| `permalinks` | Story URLs under `/stories/<slug>/` |

Empty or remove `gaMeasurementId` to stop loading GA4.

---

## Static trust / utility pages

Markdown under `content/`:

| Path | URL |
|---|---|
| `content/about/_index.md` | `/about/` |
| `content/contact/_index.md` | `/contact/` |
| `content/privacy/_index.md` | `/privacy/` |
| `content/terms/_index.md` | `/terms/` |
| `content/corrections/_index.md` | `/corrections/` |
| `content/methodology/_index.md` | `/methodology/` |
| `content/disclaimer/_index.md` | `/disclaimer/` |
| `content/latest/_index.md` | `/latest/` |
| `content/search/_index.md` | `/search/` |
| `content/ghana/_index.md` | `/ghana/` (section; `topics:` drives filters) |
| `content/business/_index.md` | `/business/` |
| `content/world/_index.md` | `/world/` |

Section `_index.md` `topics:` lists control which filter chips appear on that section page.

---

## Look and feel

| Knob | File |
|---|---|
| Colours, type, spacing, components | `assets/css/site.css` |
| Design intent / tokens reference | `DESIGN.md`, `frontend_concept/design_system/` |
| Client behaviour (clock, search, filters, light analytics events) | `assets/js/site.js` |
| Fonts | `static/fonts/` (preloads in `layouts/_default/baseof.html`) |
| Favicons | `static/favicon.svg`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`, `icon-*.png` |
| Default social share image | `static/images/og-default.png` |

Do not use Unicode arrows as UI icons (emoji risk on mobile). Prefer the existing SVG treatment.

---

## Templates (structure, not copy)

| Area | Path |
|---|---|
| HTML shell, SEO head, font preloads | `layouts/_default/baseof.html` |
| Homepage modules | `layouts/home.html` |
| Story article page | `layouts/stories/single.html` |
| Section pages | `layouts/partials/section-page.html` |
| Header / footer | `layouts/partials/site-header.html`, `site-footer.html` |
| GA4 | `layouts/partials/analytics.html` |
| JSON-LD | `layouts/partials/schema-org.html`, `schema-article.html` |
| Search feed | `layouts/home.json.json` → `/index.json` |
| robots.txt | `layouts/robots.txt` |

Concept HTML under `frontend_concept/` is reference only. Production is `layouts/` + `assets/`.

---

## Deploy and hosting

| Piece | Role |
|---|---|
| `vercel.json` | Build command, output `public`, security headers |
| `build.sh` | Installs Hugo extended, production build (`HUGO_VERSION`, default `0.165.0`) |
| GitHub `main` | What Vercel deploys |
| Cloudflare DNS | Apex + `www` CNAME to Vercel; **DNS only** (grey cloud) recommended |
| Search Console | Verify domain; submit `https://akanreports.com/sitemap.xml` |

Production builds omit `draft: true` pages. Preview URLs (e.g. `*.vercel.app`) still run production Hugo env when built via `build.sh`.

---

## Analytics and discovery

- **GA4:** `hugo.yaml` → `params.analytics.gaMeasurementId`; injected only when `hugo.IsProduction`.
- **Search index:** home JSON output consumed by `assets/js/site.js` on `/search/`.
- **RSS:** `/index.xml` (and story feeds where configured).
- **Sitemap:** Hugo sitemap + `robots.txt` pointer.

---

## What not to commit

- `.env`, secrets, API keys, private source dumps
- Large one-off dumps (e.g. Lighthouse JSON) unless intentionally tracked
- Rejected / dead-end drafts you will never repair (delete them; do not leave a graveyard on `main`)
- Temp downloads (e.g. `.tmp-*.jpeg`)

Drafts you **might** repair can stay untracked or as `draft: true` with a clear `decision_note`. Prefer not to fill `main` with kill-rated secondary-only stories.

---

## Agent / editorial docs (not site knobs)

| Doc | Use |
|---|---|
| `AGENTS.md` | First file for any agent |
| `editorial/CONTENT_STRATEGY.md` | What to cover |
| `editorial/AGENT_SUBMISSION_CONTRACT.md` | Required draft shape |
| `editorial/REPORTING_AND_QUALITY_RULES.md` | Evidence and quality |
| `editorial/WRITING_STYLE.md` | Voice, endings, no process diary, no em dashes |
| `editorial/prompts/REPORTING_AGENT.md` | Discovery/drafting prompt |
| `editorial/prompts/DAILY_ASSIGNMENTS.md` | Ready-made assignment texts |

---

## Common recipes

**Feature a new story on “Today, briefly”**

```yaml
draft: false
workflow:
  status: approved
home:
  position: briefing
  weight: 5    # compete with other briefing weights; only top 3 show
```

**Make it the homepage lead**

```yaml
home:
  position: lead
  weight: 10
```

**World story in “Beyond Ghana”**

```yaml
primary_section: world
home:
  position: world
  weight: 5
```

**Take it off the homepage but keep it live**

```yaml
home:
  position: none
  weight: 100
```

**Unpublish**

```yaml
draft: true
workflow:
  status: review   # or rejected + decision_note
```

**Refresh Pulse**

Edit `data/pulse.yaml` (or run the update-pulse-stats skill), commit, push.

---

## Verification after changes

```sh
git diff --check
hugo --buildDrafts --noBuildLock --destination /tmp/akan-reports-build
```

For visual changes, check mobile and desktop. A green build is not a visual review.
