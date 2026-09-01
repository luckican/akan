# Akan Reports MVP Content Model

**Version:** 1.0
**Status:** Adopted for the MVP
**Purpose:** Define the contract between reporting agents, human approval, Hugo, and the reader-facing templates.

The normative agent instructions now live in [`editorial/CONTENT_STRATEGY.md`](../editorial/CONTENT_STRATEGY.md), [`editorial/AGENT_SUBMISSION_CONTRACT.md`](../editorial/AGENT_SUBMISSION_CONTRACT.md), [`editorial/REPORTING_AND_QUALITY_RULES.md`](../editorial/REPORTING_AND_QUALITY_RULES.md), and [`editorial/WRITING_STYLE.md`](../editorial/WRITING_STYLE.md). This document remains the architectural overview; if it is less specific than the agent instructions, the agent instructions control.

## Core principle

An article is a structured content package, not a finished HTML page. Agents produce the package, a human approves or rejects it, and Hugo uses the approved fields to generate the homepage, section pages, Latest, and the article page.

The model must support quick publishing without pretending every story needs the same treatment. A short Signal and a long Feature share the same required core but may use different optional fields.

## Reader-facing article fields

Every publishable article requires:

- `title`: The public headline.
- `description`: The deck or short summary shown below the headline and in listings.
- `date`: Original publication date and time.
- `lastmod`: Most recent meaningful update time.
- `draft`: Hugo's publication switch. It remains `true` until approval.
- `primary_section`: One of `ghana`, `business`, or `world`.
- `topics`: Controlled descriptive labels such as `education`, `justice`, or `culture`.
- `format`: One of `signal`, `report`, `analysis`, `explainer`, or `feature`.

No personal author or byline field is required. Published work appears as reporting from Akan Reports.

## Optional public fields

- `dek`: A longer secondary summary when `description` is too short for the article header.
- `headline_lead` and `headline_emphasis`: Optional display treatment for splitting a headline across normal and emphasized text. `title` remains the canonical complete headline.
- `hero`: Image filename, alternative text, caption, and credit.
- `typographic_hero`: Optional `lead` and `emphasis` lines for a designed type-only hero when no image is used. Most stories need neither hero treatment.
- `in_brief`: A small list of facts or context shown only when it helps the story.
- `corrections`: Dated public correction or clarification entries.
- `methodology_note`: Public explanation for data, calculations, or reporting methods when needed.
- `source_note`: Public source disclosure when editorially necessary. It is not shown by default.
- `related`: Explicitly selected related story slugs. Hugo may otherwise choose related stories automatically.
- `canonical_url`: Used only when a story has a canonical home elsewhere.

Reading time is calculated by Hugo and does not need to be supplied by an agent.

## Homepage and section placement

Placement is editorial metadata rather than part of the article body:

- `home.position`: `lead`, `secondary`, `briefing`, `focus`, or `none`.
- `home.weight`: Ordering within a homepage position.
- `home.expires`: Optional time after which the story should leave that position.
- `breaking.active`: Whether the story qualifies for the breaking strip.
- `breaking.expires`: Required when breaking is active so stale alerts cannot remain indefinitely.

Agents may propose placement. Approval confirms both publication and placement unless the reviewer changes it.

## Editorial workflow fields

These fields are stored with the content but are not rendered to readers:

- `workflow.status`: `draft`, `review`, `approved`, `rejected`, or `published`.
- `workflow.agent`: Identifier for the agent or process that prepared the draft.
- `workflow.created_at`: When the draft entered the pipeline.
- `workflow.reviewed_at`: When the human decision was made.
- `workflow.decision_note`: Optional reason for rejection or requested revision.
- `editorial.strategy_stream`: The internal Signal, Stakes, Context, World, or Follow-through job defined by the content strategy.
- `editorial.angle_lens`: The primary Development, Consequence, Distribution, Mechanism, Evidence, Delivery, Uncertainty, Ghana Connection, or Next Step lens defined by the angle framework.
- `editorial.angle`: The specific reporting angle the draft is meant to deliver.
- `editorial.visual`: Required treatment, rationale, rights status, and provenance for the story's visual decision.
- `editorial.verification_notes`: Claims, uncertainties, and checks for the reviewer.
- `editorial.source_notes`: Structured internal evidence records used during reporting, whether or not they are publicly cited. At least one is required.

Internal fields must never be rendered by the public templates. They are not secrets if the Git repository is public, so credentials, private personal data, and paid-source login details must never be stored here.

## Example article

```yaml
---
title: "While the theatre changes, Accra's artists find new stages"
description: "Renovation has emptied familiar rehearsal rooms. The companies that worked inside are adapting across the city."
date: 2026-08-31T10:20:00Z
lastmod: 2026-08-31T10:20:00Z
draft: true

primary_section: ghana
topics:
  - culture
  - arts
format: report

hero:
  src: hero.webp
  alt: "Actors rehearsing in a temporary room in Accra"
  caption: "A theatre company rehearses away from its usual stage."
  credit: "Akan Reports"

home:
  position: secondary
  weight: 20
  expires: 2026-09-03T00:00:00Z

breaking:
  active: false

workflow:
  status: review
  agent: reporting-agent
  created_at: 2026-08-31T09:40:00Z
  reviewed_at:
  decision_note:

editorial:
  strategy_stream: stakes
  angle_lens: consequence
  angle: "How National Theatre renovation is changing where artists work."
  visual:
    treatment: image
    rationale: "Shows the temporary space at the centre of the report."
    rights_status: original
    source_url:
  verification_notes:
    - "Confirm renovation timetable before approval."
  source_notes:
    - id: source-1
      type: interview
      name: "Interview record"
      url:
      accessed_at: 2026-08-31T09:30:00Z
      supports:
        - "The company is rehearsing in a temporary room."
      notes: "Confirm the renovation timetable separately."
---
```

The Markdown following the front matter contains the article body.

## Proposed repository structure

```text
content/
  stories/
    while-the-theatre-changes/
      index.md
      hero.webp

editorial/
  candidates/
  rejected/

layouts/
  _default/
  home.html
  latest/
  sections/
  stories/

assets/
  css/
  js/
```

All published stories live under `content/stories/` so changing a story's primary section does not change its URL. The preferred public URL remains `/stories/<slug>/`.

## Approval flow

```text
monitored material
      ↓
candidate idea
      ↓
agent draft (`draft: true`, status: review)
      ↓
human decision
   ↙         ↘
reject      approve
  ↓            ↓
editorial/   `draft: false`
rejected/    build and publish
```

Approval is the only action that makes a draft eligible for publication. A successful build must still validate required fields, valid section and format names, image alternative text, and breaking-news expiry.

## What remains deliberately open

- Which sources are monitored.
- Which scraping, feed, or research tools gather candidate material.
- Which model or agent prepares a draft.
- Whether public source links appear on a particular story.
- The future policy and project tracker model.
- Newsletter delivery and Listmonk integration.

Those choices can evolve without changing the reader-facing article contract.
