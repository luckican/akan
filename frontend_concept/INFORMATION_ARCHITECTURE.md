# Akan Reports Information Architecture

**Version:** 0.1  
**Status:** MVP working direction  
**Adopted:** 31 August 2026

## Purpose

This document defines how readers will find, browse, and move through Akan Reports during the first release.

The MVP is optimized for publishing useful content quickly. It should provide a clear homepage, familiar subject-based navigation, a complete chronological feed, readable article pages, and effective search without creating empty sections or complex features before the publication has enough content to support them.

The method used to produce stories—including AI-assisted editorial workflows—is an internal concern and does not determine the reader-facing information architecture.

## Reader goals

The site should help readers:

1. Understand what matters now.
2. See the newest reporting without relying on homepage placement.
3. Browse stories by familiar subject.
4. Understand why a development matters, not only what happened.
5. Find previously published reporting.
6. Identify when an article was published, updated, or corrected.

## MVP navigation

The primary navigation contains:

1. **Home**
2. **Latest**
3. **Ghana**
4. **Business**
5. **World**
6. **Search**

Permanent supporting links appear in the footer or utility navigation:

- About
- Methodology
- Corrections
- Contact
- Privacy
- Terms

## Navigation definitions

### Home

The homepage is a curated overview of the reporting that matters most at the current moment. It establishes editorial priority rather than displaying every story in strict chronological order.

### Latest

Latest is the complete chronological feed of published content, newest first. It ensures that every published story remains discoverable even when it does not receive a curated homepage position.

### Ghana

Ghana contains domestic reporting across public life. Topics may include:

- Politics and policy
- Society
- Justice
- Education
- Health
- Environment
- Technology
- Culture

These topics begin as filters and metadata. They should not become separate primary navigation items until the archive contains enough regular reporting to justify them.

### Business

Business covers the economy and its practical consequences. Topics may include:

- Economy and public finance
- Companies
- Markets
- Employment and household costs
- Technology and industry
- Trade and commodities
- Data-led reporting

### World

World contains international developments with a meaningful connection to Ghana. It is not intended to become a generic international-news wire.

Relevant subjects may include:

- Regional politics and security
- Trade and shipping
- Cocoa, gold, oil, and other commodities
- Debt, interest rates, and currency movements
- Migration and the diaspora
- Climate and technology

Every World story should make the Ghanaian relevance clear.

### Search

Search covers:

- Headlines
- Article summaries and body text
- Topics and tags
- People and organizations
- Authors
- Future tracker records when that capability is introduced

The initial search experience should favor clarity over complex filtering.

## Content formats

Content formats describe how a story is presented. They are labels and template variations rather than primary navigation destinations.

Initial formats may include:

- **Signal:** A concise, timely report or development.
- **Report:** A standard reported article.
- **Analysis:** Interpretation supported by evidence and context.
- **Explainer:** A structured answer to an important question.
- **Feature:** A longer narrative or thematic report.

Format names remain open to refinement as the publication develops. Readers should primarily navigate by subject, while format labels set expectations about the treatment and depth of a story.

## MVP page inventory

### 1. Homepage

Proposed module order:

1. Utility bar and masthead
2. Primary navigation
3. Breaking strip, only when information is genuinely breaking
4. One dominant lead story
5. Two important secondary stories
6. Latest reports or signals
7. In Focus: a group of connected stories about one issue
8. World developments shaping Ghana
9. Ghana in Numbers, when useful data is available
10. Additional reporting
11. Footer and trust links

The homepage should not contain every available module merely to fill space. Modules appear when the available reporting justifies them.

### 2. Latest page

Required elements:

- Page heading and short description
- Chronological story list
- Publication or update time
- Subject and format labels
- Pagination or a clear method for loading earlier stories
- Optional subject filters once the volume of content requires them

### 3. Section page

Ghana, Business, and World share a flexible section template containing:

- Current section lead
- Latest section reporting
- Topic filters
- A highlighted explainer or analysis when available
- Pagination or archive access

The template should support sections with different publishing volumes without creating visibly empty regions.

### 4. Article page

Required elements:

- Section and content-format label
- Headline
- Summary or deck
- Author
- Publication and update times
- Reading time when useful
- Hero image, document, chart, or other relevant media when available
- Article body
- Image captions and credits
- Source or methodology information when editorially necessary
- Correction or update history
- Related reporting
- Sharing controls

The full article page replaces the reading modal used in the original homepage prototype.

### 5. Search page

Required elements:

- Prominent search field
- Result count when available
- Result title, summary, section, and publication date
- Clear no-results state
- Optional subject or date filters only when the archive becomes large enough to require them

### 6. Author page

Required elements:

- Author name
- Short biography
- Role or area of interest
- Disclosure when appropriate
- Chronological list of published work

The author model must be able to represent a person, a desk, or another disclosed editorial identity.

### 7. Trust and organizational pages

The MVP includes:

- About
- Methodology
- Corrections
- Contact
- Privacy
- Terms
- 404 error page

## Homepage behavior

The homepage is curated while Latest is comprehensive.

A story may appear in more than one homepage module, but unnecessary repetition should be avoided. The lead story should remain visibly dominant on mobile and desktop. When there is no genuine breaking news, the breaking strip should be absent rather than filled with ordinary headlines.

The existing market module should evolve into **Ghana in Numbers**, a flexible data component used only when current figures materially improve the reader's understanding.

## Topic and taxonomy rules

- Begin with a small number of broad sections.
- Add topics as metadata before promoting them into navigation.
- Do not create a public topic page until it contains enough useful reporting.
- Avoid near-duplicate tags and inconsistent spelling.
- People, organizations, locations, and recurring issues should use controlled names.
- Changing a story's section must not unnecessarily break its public URL.

## Proposed URL structure

The exact implementation may change during the Hugo build, but the preferred public pattern is:

```text
/
/latest/
/ghana/
/business/
/world/
/stories/<story-slug>/
/authors/<author-slug>/
/search/
/about/
/methodology/
/corrections/
/contact/
/privacy/
/terms/
```

Story URLs should remain stable even if a story's section, format, or homepage placement changes.

## MVP exclusions

The following are not required for the first release:

- Policy and project trackers
- Tracker index and detail pages
- Newsletter sending
- User accounts
- Paywalls
- Comments
- Personalized recommendations
- Push notifications
- Large-scale media storage
- Live market-data integrations
- A separate page for every possible topic

These exclusions reduce the time required to begin publishing and gathering evidence about what readers actually use.

## Tracker roadmap

Policy, project, promise, court-case, and issue tracking remains an important future possibility. It is not part of the immediate MVP because credible trackers require sustained analysis, structured evidence, status rules, and ongoing verification.

Trackers should not appear in primary navigation until:

1. At least a small set of useful tracker records exists.
2. The evidence and update workflow has been tested.
3. Tracker statuses and terminology are defined.
4. The publication can maintain the records over time.

The design system may preserve tracker component concepts for future use, but implementation should prioritize getting ordinary reporting online first.

## Responsive priorities

- Preserve lead-story dominance on mobile.
- Order stacked modules by editorial priority.
- Keep navigation understandable without shrinking labels excessively.
- Avoid turning every mobile story into an identical card.
- Keep metadata, sources, and corrections readable at small widths.
- Ensure all interactive controls work with touch and keyboard.

## Success criteria

The MVP information architecture succeeds when readers can:

1. Identify the most important current story from the homepage.
2. Find all recent reporting through Latest.
3. Browse by Ghana, Business, or World.
4. Open and comfortably read a full article.
5. Find older reporting through search.
6. Understand when content was published, updated, or corrected.

## Future review

This structure is intentionally small. Navigation, sections, formats, and future tracker functionality should be reviewed after Akan Reports has enough published content and usage data to show how readers actually browse the site.
