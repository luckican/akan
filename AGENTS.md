# Akan Reports Agent Guide

This is the first repository file every agent must read. It routes work to the authoritative project documents and records the rules that apply across roles.

## Project

Akan Reports is a Hugo-based news publication focused broadly on signals from Ghana's news cycle and the wider world that shapes it. The reader-facing design direction and Hugo template system are approved foundations. The content strategy is still being defined; agents must not invent one or treat the placeholder stories as editorial policy.

## Required reading by task

### Reporting or drafting a story

Read, in order:

1. `editorial/prompts/REPORTING_AGENT.md`
2. `editorial/AGENT_SUBMISSION_CONTRACT.md`
3. `editorial/REPORTING_AND_QUALITY_RULES.md`
4. `editorial/WRITING_STYLE.md`
5. `frontend_concept/CONTENT_MODEL.md`

`editorial/CONTENT_STRATEGY.md` will become required after it is created and approved. Until then, follow the user's assignment note and the limited editorial purpose in the reporting rules; do not claim that Akan Reports has a more specific selection policy.

### Reviewing or revising editorial content

Read:

1. `editorial/AGENT_SUBMISSION_CONTRACT.md`
2. `editorial/REPORTING_AND_QUALITY_RULES.md`
3. `editorial/WRITING_STYLE.md`
4. `frontend_concept/CONTENT_MODEL.md`

Keep internal source and verification records in front matter. They are not public citations by default.

### Frontend, templates, components, or visual changes

Read:

1. `DESIGN.md`
2. `frontend_concept/design_system/tokens.css`
3. `frontend_concept/design_system/specimen.html`
4. The relevant approved concept file under `frontend_concept/`
5. The production implementation in `layouts/` and `assets/`

The concept files are visual references. Hugo layouts and `assets/css/site.css` are the production implementation.

### Information architecture, product, or platform decisions

Read the relevant documents:

- `frontend_concept/ARCHITECTURE_PRINCIPLES.md`
- `frontend_concept/INFORMATION_ARCHITECTURE.md`
- `frontend_concept/CONTENT_MODEL.md`
- `DESIGN.md`

Do not treat deferred tracker, newsletter, or monitoring ideas as MVP requirements unless the user explicitly promotes them into scope.

## Repository map

```text
archetypes/                  Hugo templates for creating content files
assets/css/site.css          Production design tokens and styles
assets/js/site.js            Minimal client-side interactions
content/                     Hugo pages and story bundles
data/                        Structured site data
editorial/                   Editorial contracts, rules, and prompts
frontend_concept/            Approved concepts and product documentation
layouts/                     Production Hugo templates
hugo.yaml                    Hugo configuration
```

## Cross-project rules

- The stack is Hugo templates, Markdown, CSS, and minimal JavaScript. Tailwind and a JavaScript application framework are not current dependencies.
- Do not introduce a paid or proprietary core dependency without explicit approval. Follow `frontend_concept/ARCHITECTURE_PRINCIPLES.md`.
- Do not add personal editorial bylines. Published work appears as reporting from Akan Reports.
- Public source lists and citations are optional, not the default. Internal source records are mandatory for agent-produced reporting.
- Public editorial copy must pass the house-style check in `editorial/WRITING_STYLE.md` after factual verification.
- Every agent-created article remains `draft: true` and `workflow.status: review` until a human approves it.
- Agents may recommend placement but must not approve, merge, publish, deploy, or set a story live unless the user explicitly authorizes that action.
- Every story visual must use the documented `image`, `typographic`, or `none` decision. Never invent or reuse an image without documented provenance and rights.
- Preserve accessible semantics, keyboard behavior, mobile layouts, and the approved visual hierarchy.
- Do not use Unicode arrows as interface icons; mobile platforms may render them as emoji. Use the established SVG treatment.
- Placeholder stories under `content/stories/` are design and template fixtures, not verified reporting and not examples of an approved content strategy.
- Keep secrets, credentials, private source data, and paid-service access details out of the repository.
- Preserve unrelated user changes. Do not commit unless the user asks for a commit.

## Verification

For code, template, design, or content-structure changes, run:

```sh
git diff --check
hugo --buildDrafts --noBuildLock --destination /tmp/akan-reports-build
```

Inspect the relevant page at mobile and desktop widths when a visual change is involved. A successful build does not replace visual review.
