# Akan Reports Editorial System

These documents define what an editorial agent must deliver before a draft can be reviewed.

1. [Reporting-agent prompt](prompts/REPORTING_AGENT.md) — the operational prompt used for autonomous news discovery or a directed story lead.
2. [Agent submission contract](AGENT_SUBMISSION_CONTRACT.md) — the files and fields required in every submission.
3. [Reporting and quality rules](REPORTING_AND_QUALITY_RULES.md) — the evidence, writing, image, safety, and review standards every draft must meet.
4. [Writing style](WRITING_STYLE.md) — the Akan Reports voice and the required anti-slop editing pass for public copy.

The submission contract, reporting rules, and writing style are normative for the MVP. If an example story conflicts with them, the normative documents take precedence.

The human reviewer remains the publisher. An agent may research, propose, and draft, but it cannot approve its own work or set `draft: false`.

## Running the reporting agent

Send the agent the contents of `prompts/REPORTING_AGENT.md`. Autonomous discovery is the default, so a scheduled run does not require a source link. Set `MODE` to `directed` and include `SOURCE_LINKS` only when a person or another process has supplied a lead. `ASSIGNMENT_NOTE` and `SEARCH_WINDOW` may narrow either kind of run.

The prompt tells the agent to load the contract, reporting rules, writing style, and content model from the repository; their full text does not need to be pasted into every assignment.

The normal output is one `content/stories/<story-slug>/index.md` file plus an optional legally usable hero image. If the lead cannot support a worthwhile, verified story, the correct output is a `NO DRAFT` review note and no content files.
