# Akan Reports Design System

**Version:** 1.0
**Status:** Adopted MVP foundations and core editorial components

## Purpose

The Akan Reports design system turns the approved homepage direction into reusable rules for the complete publication. It is designed for a reader-facing Ghanaian news product, independent of how stories are produced or published.

The system should make Akan Reports recognizable through typography, proportion, color, data clarity, and editorial pacing—not through decoration or generic news-site conventions.

## Design principles

### Typography carries the hierarchy

Headlines are the primary visual material. Size, weight, line breaks, and whitespace establish importance before color or imagery is added.

### Ghanaian without cliché

Earth, forest, gold, and signal red create a distinctly Ghanaian palette. Flag colors are functional accents, not decorative stripes applied everywhere.

### Structured, not mechanically uniform

The grid keeps the publication coherent, while story modules vary in scale and density. Not every story should look equally urgent.

### Quiet where reading begins

Index pages may be energetic; article bodies become calmer. Long-form text uses a comfortable measure, ordinary casing, and generous line height.

### Accountability should be visible

Updates, corrections, data labels, and future tracker statuses are first-class interface elements rather than footnotes hidden from readers. Public source lists and methodology notes are optional components used when the reporting or data treatment benefits from them; they are not required on every article.

### Mobile is a full editorial surface

Mobile layouts preserve hierarchy and relationships instead of reducing everything to an identical vertical card list.

## Color system

| Token | Value | Primary role |
|---|---:|---|
| Ink | `#15130F` | Primary text, rules, inverse surfaces |
| Earth | `#E5D2AE` | Brand canvas and warm editorial background |
| Paper | `#F4EBDD` | Reading and story-card surface |
| Forest | `#173D2D` | Brand depth, features, inverse cards |
| Signal | `#BC382A` | Alerts, emphasis, active and focus states |
| Gold | `#E8B946` | Highlights, data emphasis, live information |
| Quiet | `#615A51` | Secondary text and metadata |
| White | `#FFFDF8` | High-contrast text on signal surfaces |

The Signal and Quiet values are slightly darker than the initial concept. This retains the palette while allowing normal-sized text to meet WCAG AA contrast on Paper and Earth.

### Color rules

- Use Ink on Earth, Paper, or Gold for default content.
- Use Paper on Forest or Ink for inverse content.
- Use White on Signal for small labels and buttons.
- Use Signal sparingly for genuine emphasis, not every category.
- Use Gold for highlights, live information, and selected data—not warning text.
- Never communicate status by color alone; pair color with text or an icon.
- Do not place Quiet text on Earth unless the token passes the required contrast at the rendered size.

## Typography

### Families

- **Inter:** masthead, headlines, deck text, body text, controls.
- **DM Mono:** categories, times, sources, data labels, statuses, and technical metadata.
- **System fallbacks:** Helvetica Neue and Arial for sans; platform monospace for metadata.

### Roles

| Role | Weight | Case | Guidance |
|---|---:|---|---|
| Masthead | 900 | Lowercase | Brand only; tightly tracked |
| Display headline | 900 | Uppercase | Lead stories and major section statements |
| Story headline | 800–900 | Uppercase | Cards and listings |
| Article headline | 800–900 | Sentence or title case | Prefer readability on full articles |
| Deck | 500–600 | Sentence case | Maximum 65–70 characters per line |
| Body | 400–500 | Sentence case | 17–20px, approximately 68ch |
| Metadata | 500 mono | Uppercase | 12px minimum in production |

Uppercase is reserved for short labels and display headlines. Summaries, captions, source notes, and article bodies remain in sentence case.

## Spacing and layout

- Use a 4px base unit.
- Core spacing values: 4, 8, 12, 16, 24, 32, 48, 64, 96, and 128px.
- Maximum editorial canvas: 1600px.
- Page gutter: 16px on small screens, scaling to 32px.
- Article reading measure: approximately 68 characters.
- Desktop editorial grid: 12 columns.
- Tablet: 6 columns.
- Mobile: 4 conceptual columns, usually rendered as one or two visible tracks.
- Strong section boundaries use 2px Ink rules; internal divisions use 1px rules.
- Corners remain square. Avoid decorative rounding.
- Shadows are exceptional. Use the offset Gold shadow only for elevated reading layers or similarly important overlays.

## Iconography

- Use simple line icons built from SVG or a consistent open-source icon set.
- Default canvas: 24×24px; default stroke: 1.5px.
- Use square line caps and restrained geometry.
- Do not use Unicode arrow characters or symbols as interface icons; mobile systems may render them as emoji.
- Icons supplement labels rather than replacing important words.

## Core components

### Masthead

Includes the large lowercase wordmark, the Accra clock on the same line, and primary navigation. Do not reintroduce the rejected issue/location strip, volume label, or positioning sentence without explicit approval.

### Breaking strip

Gold surface with a Signal status badge and concise updates. Motion may be used only with pause behavior and reduced-motion support. A static list is preferred when the information is not truly live.

### Story cards

Required variants:

- Lead story
- Standard story
- Compact signal
- Inverse feature
- Data-led story
- Tracker update

Cards use scale, surface, borders, and whitespace to communicate rank. Do not add unnecessary shadows or rounded containers.

### Editorial labels

Labels identify section, urgency, status, or content type. They must remain short. Signal-filled labels are reserved for alerts and live information.

### Article metadata

Publication time, update time, reading time, section, and correction status should form a consistent metadata band. Akan Reports does not use personal editorial bylines by default.

### Accountability elements

- Correction notice
- Update history
- Data source and timestamp
- Tracker status and last verified date
- Optional source list
- Optional methodology note

These elements use bordered notes with semantic edge colors and explicit headings.

### Data display

Charts use Ink, Forest, Signal, Gold, and neutral tints. Every graphic requires labels, units, source, timestamp, and an accessible text summary. Avoid decorative charts that do not clarify the reporting.

## Interaction

- Minimum touch target: 44×44px.
- Hover and focus must not rely on color alone.
- Keyboard focus uses a 3px Signal outline with offset.
- Standard transitions last 120–220ms.
- Large movement, parallax, and ornamental looping animation are outside the system.
- Respect `prefers-reduced-motion` everywhere.
- Links inside body copy remain visibly identifiable without hover.

## Imagery

- Prioritize documentary photography, original graphics, official documents, maps, and evidence-bearing imagery.
- Use square, 3:2, or 16:9 editorial crops.
- Preserve natural color unless a deliberate monochrome treatment serves a complete section.
- Captions and credits are mandatory when applicable.
- Do not use unlicensed images, screenshots without purpose, or generic stock photography merely to fill space.
- Provide meaningful alternative text; decorative textures use empty alt text.

## Accessibility baseline

- WCAG 2.2 AA contrast for production text and controls.
- Semantic headings must follow document structure rather than visual size.
- All interactive elements must work with keyboard and touch.
- Do not hide critical information exclusively in hover states.
- Dialogs must manage focus, close with Escape, and return focus to their trigger.
- Data graphics require text equivalents.
- Forms require persistent labels and useful error messages.
- Test at 200% text zoom and widths down to 320px.

## Responsive behavior

- Preserve the lead story's dominance on every screen.
- Allow navigation to scroll or collapse without truncating labels.
- Stack modules in editorial priority order, not desktop source order by accident.
- Avoid repeated cards with identical height on mobile.
- Keep metadata legible; do not solve small screens by shrinking text below the system minimum.
- Data tables may scroll horizontally, but their subject and first column should remain understandable.

## Implementation guidance

`frontend_concept/design_system/tokens.css` preserves the prototype tokens. `assets/css/site.css` is the production source for the current Hugo implementation. Keep their foundational values aligned when the system changes, and make production components consume shared CSS custom properties rather than duplicating raw values. Tailwind is not a current dependency.

The approved concept files under `frontend_concept/` remain visual references for the production Hugo templates. Material changes to hierarchy, brand treatment, or responsive behavior require visual review against those references.

## Governance

- Changes to foundational tokens require visual and accessibility review.
- New components should reuse existing typography, spacing, borders, and interaction patterns.
- A component should enter the system only after appearing in more than one product context or representing an essential editorial pattern.
- Temporary campaign treatments must not silently redefine the core system.
- Record significant changes with a version and short rationale.
