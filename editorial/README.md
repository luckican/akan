# Akan Reports Editorial System

These documents define what an editorial agent must deliver before a draft can be reviewed.

1. [Reporting-agent prompt](prompts/REPORTING_AGENT.md) — the operational prompt used for autonomous news discovery or a directed story lead.
2. [Content strategy](CONTENT_STRATEGY.md) — the approved Signal → Stakes → Follow-through model, story-selection gate, and angle framework.
3. [Agent submission contract](AGENT_SUBMISSION_CONTRACT.md) — the files and fields required in every submission.
4. [Reporting and quality rules](REPORTING_AND_QUALITY_RULES.md) — the evidence, writing, image, safety, and review standards every draft must meet.
5. [Writing style](WRITING_STYLE.md) — the Akan Reports voice and the required anti-slop editing pass for public copy.

The content strategy, submission contract, reporting rules, and writing style are normative for the MVP. They define a curious non-specialist audience without imposing one article shape. If an example story conflicts with them, the normative documents take precedence.

The human reviewer remains the publisher. An agent may research, propose, and draft, but it cannot approve its own work or set `draft: false`.

## Running the reporting agent

Send the agent the contents of `prompts/REPORTING_AGENT.md`. Autonomous discovery is the default, so a scheduled run does not require a source link. Set `MODE` to `directed` and include `SOURCE_LINKS` only when a person or another process has supplied a lead. `ASSIGNMENT_NOTE` and `SEARCH_WINDOW` may narrow either kind of run.

The prompt tells the agent to load the strategy, contract, reporting rules, writing style, and content model from the repository; their full text does not need to be pasted into every assignment.

The normal output is one `content/stories/<story-slug>/index.md` file plus an optional legally usable hero image. Return `DRAFT READY` only when no known material reporting blocker remains. Return `DRAFT NEEDS REPORTING` when a coherent bundle exists but disclosed verification work still blocks approval. If the lead cannot support a worthwhile, defensible story, return `NO DRAFT` and create no content files.
