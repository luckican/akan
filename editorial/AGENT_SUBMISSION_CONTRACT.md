# Agent Submission Contract

**Version:** 1.0
**Status:** Required for the MVP
**Applies to:** Every article submitted by an agent for human review

## The required output

One submission is a content bundle:

```text
content/stories/<story-slug>/
├── index.md              # required: metadata and article body
└── hero.<extension>      # required only when visual treatment is `image`
```

The slug must be short, descriptive, lowercase, and hyphenated. It should describe the story rather than copy a date or a workflow state. A story keeps the same slug when it is updated.

The agent must submit a complete draft, not notes, a research dump, HTML, or a link to prose stored elsewhere.

## Required Markdown front matter

Every `index.md` must begin with this structure. Fields marked `null` are intentionally awaiting a human decision and must not be omitted.

```yaml
---
title: "The complete public headline"
description: "One or two sentences stating what happened and why it matters."
date: 2026-09-01T12:00:00Z
lastmod: 2026-09-01T12:00:00Z
draft: true

primary_section: ghana
topics:
  - education
format: report

home:
  position: none
  weight: 100
  expires: null

breaking:
  active: false
  expires: null

workflow:
  status: review
  agent: agent-or-workflow-identifier
  created_at: 2026-09-01T11:35:00Z
  reviewed_at: null
  decision_note: null

editorial:
  strategy_stream: stakes
  angle_lens: distribution
  angle: "The precise question or consequence this story answers."
  visual:
    treatment: none
    rationale: "Why this treatment is appropriate."
    rights_status: not_applicable
    source_url: null
  verification_notes: []
  source_notes:
    - id: source-1
      type: official
      name: "Publisher or source name"
      url: "https://source.example/item"
      accessed_at: 2026-09-01T11:10:00Z
      supports:
        - "The exact claim or part of the story this source supports."
      notes: "Reliability, limitations, conflicts, or follow-up checks."
---
```

The article body begins after the closing `---`.

## Exact meaning of the required fields

### Headline and standfirst

- `title` is the canonical, complete public headline. It must make sense without design treatment and must be supported by the article.
- `description` is the required standfirst used on cards, lists, search results, and metadata. It should normally be one or two sentences.
- `dek` is optional. Use it only when the article page needs a longer standfirst than cards and lists should display.
- `headline_lead` and `headline_emphasis` are optional display fields. If used together, their combined wording must equal `title`; they must not create a second headline.

### Classification

- `primary_section` must be exactly one of: `ghana`, `business`, or `world`.
- `topics` must contain at least one lowercase, hyphenated descriptive label. Topics describe the subject; they are not extra sections.
- `editorial.strategy_stream` must be exactly one of `signal`, `stakes`, `context`, `world`, or `follow-through`. It records the editorial job defined in `CONTENT_STRATEGY.md`; it is not a public section or story format.
- `editorial.angle_lens` must be exactly one of `development`, `consequence`, `distribution`, `mechanism`, `evidence`, `delivery`, `uncertainty`, `ghana-connection`, or `next-step`. It records the primary lens from the approved angle framework.
- `editorial.angle` must state the exact story-specific angle in one sentence. It cannot merely repeat the lens name or broad topic.
- `format` must be exactly one of:
  - `signal` — a concise, verified development with limited analysis;
  - `report` — a reported account that explains the development and its consequences;
  - `analysis` — evidence-based interpretation that clearly separates inference from fact;
  - `explainer` — an answer to a defined question or process;
  - `feature` — a substantially reported narrative or thematic story.

### Article body

The Markdown body is required and must be publication-ready. It must:

- open with the most important verified development, observation, or question;
- contain enough context for a reader who has not followed the story;
- use `##` headings when they genuinely help navigation;
- contain no source list, agent commentary, prompts, TODO markers, or verification notes intended only for the reviewer;
- contain no HTML unless the template system explicitly supports it.

There is no universal word count. The story should be as long as the reporting supports and no longer.

### Images and other visual treatments

Every submission must make one visual decision in `editorial.visual.treatment`:

- `image` — include a locally stored hero image and the public `hero` fields below;
- `typographic` — use `typographic_hero` when the story merits the designed type treatment;
- `none` — the standard article header is sufficient.

For `image`, all of the following are required:

```yaml
hero:
  src: hero.webp
  alt: "A factual description of the meaningful visual content"
  caption: "What the image shows, including place and date when relevant."
  credit: "Creator or supplying organisation"

editorial:
  visual:
    treatment: image
    rationale: "Why this image helps the reader understand the story."
    rights_status: original
    source_url: "https://source.example/original-image-page"
```

`rights_status` must be one of `original`, `licensed`, `permission`, `public_domain`, or `not_applicable`. `not_applicable` is valid only for `typographic` and `none`. The agent must not submit an image merely because it appeared in search results or on another publisher's page.

For `typographic`, both `lead` and `emphasis` are required:

```yaml
typographic_hero:
  lead: "A short first line"
  emphasis: "A short emphasized line."
  caption: "Optional contextual label"
  credit: "Optional explanatory note"
```

### Timestamps

- All timestamps use ISO 8601 and include a timezone. Use UTC with `Z` unless the source supplies a meaningful local time.
- `workflow.created_at` records when the submission entered review.
- On a new draft, `date` is the proposed publication time and `lastmod` equals `date`.
- At approval, the publishing workflow or reviewer sets `date` to the actual first-publication time if necessary.
- Change `lastmod` only for a meaningful public update, not spelling, formatting, or workflow edits.
- A developing story must state the time-sensitive status in the body and be rechecked immediately before approval.

### Internal source record

`editorial.source_notes` is mandatory and must contain at least one source. It is for review and is not displayed by default.

Each source entry requires:

- `id`: a unique label within the story;
- `type`: one of `official`, `document`, `data`, `interview`, `news`, `social`, or `other`;
- `name`: the person, document, dataset, account, or publisher;
- `url`: the direct URL when one exists; use `null` for an offline interview or document;
- `accessed_at`: when the agent last checked it;
- `supports`: one or more specific claims it supports;
- `notes`: limitations, conflicts, provenance, or verification context. Use an empty string only when there is genuinely nothing to add.

Public citations are not the default. Add `source_note` only when readers need source disclosure to understand or evaluate the story, or when the reporting rules require attribution in the prose.

### Verification and unresolved issues

`editorial.verification_notes` must always be present:

- use `[]` when all material checks are complete;
- otherwise list each unresolved item precisely and explain what must be confirmed.

An unresolved note is visible to the reviewer but makes the draft ineligible for approval until it is resolved, removed, or explicitly accepted in the human decision note.

### Placement and publication state

- Agents submit `draft: true` and `workflow.status: review`.
- Agents must never set `draft: false`, `workflow.status: approved`, or `workflow.status: published`.
- Default homepage placement is `home.position: none`. An agent may recommend another position, but the human reviewer owns placement.
- If `breaking.active` is `true`, `breaking.expires` is required and the facts must meet the breaking-news rules.
- No personal byline or author field is submitted. The published work appears as reporting from Akan Reports.

## Optional structured facts

Structured facts are optional. Use them only when they improve comprehension; do not repeat decorative numbers.

### `in_brief`

Use for two to four concise, independently supported facts shown beside the article body:

```yaml
in_brief:
  - label: "What changed"
    text: "The precise fact in one or two sentences."
  - label: "What to watch"
    text: "The next verifiable decision, date, or consequence."
```

Every item must be supported in `editorial.source_notes` and explained in the body.

### `home.stat`

Use only when proposing a data-led homepage treatment and the number is central to the story:

```yaml
home:
  position: lead
  weight: 10
  stat:
    label: "Quarterly GDP growth"
    value: "6.4"
    unit: "%"
    context: "Real GDP · year-on-year"
    source: "Ghana Statistical Service"
    series:
      - { label: "Q4 25", value: "3.8", height: 59 }
      - { label: "Q1 26", value: "6.4", height: 100 }
```

The agent must show the calculation or data extraction in `editorial.verification_notes` or the relevant source entry. Chart heights are presentation values, not evidence.

## Optional public fields

The following fields are permitted when the story requires them:

- `methodology_note`
- `source_note`
- `corrections`
- `related`
- `canonical_url`
- `section_lead`

The field definitions and placement behavior are maintained in `frontend_concept/CONTENT_MODEL.md`.

## Submission checklist

Before handing the bundle to the reviewer, the agent must confirm:

- the bundle and slug are correctly named;
- every required field is present and uses an allowed value;
- the article body is complete and contains no internal notes;
- every material factual claim maps to an internal source record;
- all unresolved verification work is disclosed;
- the visual decision and, if applicable, the image file and rights information are complete;
- the story complies with `REPORTING_AND_QUALITY_RULES.md`;
- the story passes `CONTENT_STRATEGY.md` and records the correct strategy stream, primary angle lens, and precise angle;
- all public copy has passed `WRITING_STYLE.md` without weakening factual qualifications;
- `draft` remains `true` and `workflow.status` is `review`.

A submission that fails any required item is incomplete and should not enter human review.
