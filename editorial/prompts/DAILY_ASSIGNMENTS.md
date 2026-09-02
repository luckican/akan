# Akan Reports Daily Assignment Library

These are short, ready-to-send assignments for starting editorial work. Each assignment invokes `editorial/prompts/REPORTING_AGENT.md`, which remains the authoritative operational prompt.

Use the **Daily desk** assignment as the normal starting point. The focused assignments are alternatives for a deliberate desk or story need; they are not a quota and should not all be run merely to fill the site. A valid run may return `NO DRAFT`.

## Daily desk: recommended default

> Read `AGENTS.md`, then execute `editorial/prompts/REPORTING_AGENT.md` with `MODE: discovery` and `SEARCH_WINDOW: previous 24 hours`. Scan broadly, compare qualifying developments using the approved content strategy, and prepare no more than the strongest defensible Akan Reports story for human review. Do not manufacture a draft if nothing passes the gate.

## Ghana desk

> Read `AGENTS.md`, then execute `editorial/prompts/REPORTING_AGENT.md` with `MODE: discovery` and `SEARCH_WINDOW: previous 24 hours`. Concentrate on consequential developments within Ghana across public life, policy, education, health, justice, environment, culture, technology and communities. Select no more than the strongest qualifying story and prepare it for human review.

## Business desk

> Read `AGENTS.md`, then execute `editorial/prompts/REPORTING_AGENT.md` with `MODE: discovery` and `SEARCH_WINDOW: previous 48 hours`. Look for a development involving money, work, prices, companies, trade, markets or the economy that has a clear consequence for an intelligent non-specialist reader. Select no more than one defensible story and prepare it for human review.

## World desk

> Read `AGENTS.md`, then execute `editorial/prompts/REPORTING_AGENT.md` with `MODE: discovery` and `SEARCH_WINDOW: previous 48 hours`. Find an international development with a specific, evidence-supported mechanism connecting it to Ghana. Reject generic world news and forced Ghana angles. Prepare no more than the strongest qualifying story for human review.

## Context opportunity

> Read `AGENTS.md`, then execute `editorial/prompts/REPORTING_AGENT.md` with `MODE: discovery` and `SEARCH_WINDOW: previous 7 days`. Find a current development that reveals a genuine reader need for an explainer about a process, system, term or recurring issue. Prepare one Context candidate only if the explanation is timely, verifiable and useful beyond a glossary-style summary.

## Follow-through check

> Read `AGENTS.md`, then execute `editorial/prompts/REPORTING_AGENT.md` with `MODE: discovery`. Review existing stories and recent public promises, policies, projects, deadlines and developing issues for an outcome that can now be checked. Prepare one Follow-through candidate only when new evidence supports a meaningful update; do not create tracker work or force a follow-up.

## Develop a supplied link

Replace the placeholder before sending:

> Read `AGENTS.md`, then execute `editorial/prompts/REPORTING_AGENT.md` with `MODE: directed` and `SOURCE_LINKS: [PASTE LINK OR LINKS]`. Treat the supplied material as a lead rather than a finished story. Verify it independently, apply the Akan Reports selection gate, and prepare one draft for human review only if the evidence and reader value support it.

## Update an existing story

Replace both placeholders before sending:

> Read `AGENTS.md`, then execute `editorial/prompts/REPORTING_AGENT.md` with `MODE: directed`, `SOURCE_LINKS: [PASTE NEW SOURCE LINKS]`, and `ASSIGNMENT_NOTE: Assess whether the new development materially updates [STORY PATH OR URL]`. Preserve the existing story's publication history, distinguish an update from a correction, and edit the bundle only when the new evidence changes what readers should understand.

## Optional assignment controls

Any assignment may add:

- `SEARCH_WINDOW` to widen or narrow discovery;
- `SOURCE_LINKS` to provide leads;
- `ASSIGNMENT_NOTE` to name a reader question, urgency, geographic scope or issue worth checking.

These controls may focus a run but may not bypass the story-selection, evidence or publication rules.

## Operating note

Run assignments sequentially when agents share one working tree. Parallel runs can discover the same story before either sees the other's draft. If parallel discovery is introduced later, isolate each run in its own branch or worktree and deduplicate candidates before reporting begins.
