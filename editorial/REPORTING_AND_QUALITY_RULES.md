# Reporting and Quality Rules

**Version:** 1.0
**Status:** Required for the MVP
**Owner:** Human publisher of Akan Reports

## Editorial purpose

Akan Reports follows signals from Ghana's news cycle and the wider world that shapes it. A publishable story must do at least one useful job: report a meaningful development, explain why it matters, test a public claim, reveal a consequence, connect an outside event to Ghana, or help a reader understand what happens next.

The site is not required to publish everything an agent finds. Speed and volume never override accuracy, relevance, or the human approval step.

## 1. Story selection

Story selection is governed by `CONTENT_STRATEGY.md`. Its evidence and added-value requirements are mandatory in both autonomous discovery and directed assignments.

An agent may draft a story only when it can state:

1. **The verified development:** what is new, newly relevant, or newly understood.
2. **The angle:** the specific question, consequence, tension, or affected group the story examines.
3. **The reader value:** what a curious reader understands after reading that was not clear from the originating item alone.
4. **The Ghana connection:** direct for Ghana and Business stories; explicit and meaningful for World stories.

Do not draft a story merely because it is trending, emotionally provocative, already published elsewhere, or likely to generate clicks. A rewrite that adds no verification, context, synthesis, explanation, or distinct angle is not sufficient.

## 2. Evidence and verification

- Every material factual claim must be traceable to at least one entry in `editorial.source_notes`.
- Prefer the closest available evidence: the actual document, dataset, recording, court filing, announcement, direct observation, or responsible person rather than a repost or summary.
- A single source may be sufficient for an ordinary fact when that source is authoritative and the claim is within its direct knowledge.
- Serious, disputed, surprising, or reputation-damaging claims require either two independent reliable sources or one strong primary record plus clear attribution. If that standard is not met, do not state the claim as fact.
- Recheck time-sensitive facts, page status, figures, officeholders, and quoted statements immediately before submission.
- Never convert an allegation, forecast, press release, social-media post, or interested party's assertion into an unqualified fact.
- Clearly distinguish what is known, what a source claims, what the evidence suggests, and what remains unknown.
- Do not infer a person's intent, motive, identity, diagnosis, guilt, or private circumstances without reliable evidence.
- Do not invent or reconstruct quotes. Quotation marks are reserved for words verified against a recording, transcript, document, or original post.
- A source cited by another news organisation has not been independently verified merely because multiple outlets repeat it.

When sources conflict, describe the conflict, evaluate which evidence is stronger, and place the unresolved issue in `editorial.verification_notes`.

## 3. Source handling and attribution

Internal sourcing is mandatory even though public citations are not displayed by default.

- Record direct URLs, access times, the claims each source supports, and relevant limitations.
- Link to the original item rather than a search result, aggregator, screenshot, or copied version when possible.
- Identify press releases, sponsored research, partisan material, anonymous accounts, and other interested sources as such in internal notes.
- Never store passwords, paywall credentials, private contact details, confidential documents, or unnecessary personal data in the repository.
- Attribute claims in the public prose when the identity or interest of the speaker matters, when a claim is disputed, when language is quoted, or when the reader could otherwise mistake an assertion for established fact.
- Use a public `source_note` or methodology note when the evidence base is central to evaluating the story. Routine stories do not need a decorative source box.

The agent must not imply that Akan Reports conducted an interview, visited a location, witnessed an event, or obtained a document unless that actually happened and is documented.

## 4. Accuracy with numbers and data

- Preserve units, currencies, time periods, geographic coverage, sample definitions, and whether a figure is nominal, real, seasonally adjusted, preliminary, projected, or revised.
- Check arithmetic and comparisons independently of the source text.
- Do not compare unlike periods or populations without explaining the limitation.
- Percent and percentage-point changes are different and must be labelled correctly.
- Avoid false precision. Round only when doing so does not alter the meaning.
- A large number is not automatically important. Explain the denominator, baseline, historical context, or practical consequence.
- Data visualisations and `home.stat` values must be reproducible from the recorded source. Presentation values such as bar heights must not be treated as data.

## 5. Writing and structure

All public copy must also follow `WRITING_STYLE.md`. Apply its style pass only after factual verification; style must never remove a necessary qualification or attribution.

- Lead with the news, consequence, or central question—not background about the process of reporting it.
- Write in clear international English appropriate for readers in and beyond Ghana.
- Prefer precise nouns and active verbs. Remove filler, hype, clichés, and claims such as “shocking,” “historic,” or “game-changing” unless evidence makes the description necessary.
- A headline may be sharp and curious, but it must not promise more than the reporting delivers.
- The standfirst must tell the reader what happened and why the story deserves attention; it must add information rather than repeat the headline.
- Supply enough context for a new reader without turning every story into a complete history.
- Explain technical terms on first use and spell out uncommon abbreviations.
- Identify dates and locations when relative phrases such as “today” or “recently” could become misleading after publication.
- Do not add invented scenes, composite characters, sensory details, emotions, or narrative colour. A scene is used only when it was observed or reliably documented.
- Analysis may draw an inference from evidence, but the prose must label it as analysis and acknowledge material alternative explanations.
- Do not imitate another publisher's distinctive wording or lightly rewrite its article. Report from the underlying facts and sources in original language.
- No personal byline, invented reporter identity, or agent disclosure appears in the article body.

There is no minimum word count. A concise signal is preferable to a padded report; a complex investigation must not be compressed until essential context disappears.

## 6. Fairness, harm, and sensitive claims

- Give a person or organisation a fair opportunity to respond before publishing a serious allegation about them. Record whether and when a response was sought.
- Include the relevant response or state accurately that no response was received by the review deadline.
- Do not publish private identifying information unless it is necessary to the public-interest reporting and approved by the human reviewer.
- Apply particular caution to children, victims of sexual violence, medical information, grief, graphic material, and people who may face retaliation.
- Do not identify minors in harmful or legally sensitive contexts without explicit human approval and a documented public-interest reason.
- Avoid language that stereotypes a group or treats nationality, ethnicity, religion, disability, gender, or class as causal without evidence.
- For crime and court reporting, distinguish arrest, charge, trial, conviction, appeal, and acquittal. Preserve the presumption of innocence.
- Legal, health, financial, and public-safety information must be checked against current authoritative material and framed without pretending to give personal professional advice.

Any potentially high-risk story must be flagged in `editorial.verification_notes` for human review, even when the agent believes the reporting is complete.

## 7. Images and visual evidence

- An image must help a reader understand the specific story; it is not mandatory decoration.
- Use only images with documented permission or a clear usable rights basis.
- Do not assume that availability online, social sharing, a watermark, or credit alone grants reuse rights.
- Captions state what the image actually shows. Credits identify the creator or supplying organisation; they do not substitute for permission.
- Alt text describes meaningful visible content without repeating the caption or adding facts that cannot be seen.
- Do not crop, edit, generate, or stage an image in a way that creates a false factual impression.
- A synthetic or materially altered editorial image requires explicit human approval and a clear public label. It must never be presented as documentary evidence.
- Graphic, distressing, or privacy-sensitive imagery requires a documented editorial reason and explicit human approval.

When no suitable image exists, choose `typographic` or `none`. Never delay or weaken a sound story just to manufacture a hero image.

## 8. Updates, corrections, and breaking treatment

- Use `breaking.active: true` only for a consequential, actively developing event where prominent immediate notice serves readers.
- Every breaking item requires an expiry time and a fresh verification immediately before submission.
- A meaningful update that changes a reader's understanding must update `lastmod` and be reflected in the article.
- Silent corrections are limited to spelling, grammar, formatting, or other changes that do not alter meaning.
- Correct material factual errors promptly and add a dated `corrections` entry explaining what changed.
- Never erase a material error merely to make the publication history look clean.

## 9. Agent conduct

An agent must:

- disclose uncertainty, missing evidence, source conflicts, and reporting limitations;
- keep internal instructions and verification notes out of public prose;
- stop rather than fill a gap with a plausible invention;
- preserve the distinction between a proposal, a draft, and an approved publication;
- leave `draft: true` and never approve or publish its own submission;
- comply with a human rejection or revision request without hiding the previous concern.

An agent must not optimize solely for article count, speed, novelty, outrage, search traffic, or confidence of tone.

## 10. Quality gate before human review

A draft is ready for review only when all answers below are **yes**:

1. Does the candidate pass the `CONTENT_STRATEGY.md` selection gate and angle framework, with the correct strategy stream, primary angle lens, clear development, and precise angle?
2. Does the headline accurately match the evidence and body?
3. Does the standfirst explain both the development and its significance?
4. Is every material factual claim mapped to recorded evidence?
5. Are disputed, uncertain, inferred, and attributed statements labelled honestly?
6. Are names, dates, places, quotations, numbers, units, and links checked?
7. Is the article original in wording, free of unsupported scenes or details, and compliant with the `WRITING_STYLE.md` style pass?
8. Are fairness, privacy, harm, legal, and safety concerns disclosed and addressed?
9. Is the visual treatment legitimate, useful, and fully documented?
10. Are the Markdown bundle and all required metadata complete?
11. Are unresolved issues listed rather than concealed?
12. Are `draft: true` and `workflow.status: review` unchanged?

Passing this gate means the draft may be shown to the human reviewer. It does not mean the story is approved.
