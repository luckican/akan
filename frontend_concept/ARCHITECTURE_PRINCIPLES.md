# Akan Reports Architecture Principles

**Status:** Approved  
**Adopted:** 31 August 2026

## Open-source by default

Akan Reports will use free, open-source, and self-hostable software by default.

The publication must retain practical ownership of its content, source code, design system, publishing workflow, and operational data. Core publishing capabilities must not depend on a proprietary platform that creates unnecessary subscription costs or makes migration difficult.

Open source is not only a cost-saving measure. It is an architectural principle intended to preserve independence, portability, transparency, and long-term control.

## Selection rules

When choosing software or services, prefer solutions that:

1. Use a recognized open-source license.
2. Can be self-hosted or migrated without vendor permission.
3. Store content in portable, documented formats.
4. Integrate with Git-based version control and review.
5. Avoid proprietary lock-in and unnecessary recurring fees.
6. Are actively maintained and sufficiently secure for production use.
7. Keep the operating burden proportionate to the publication's needs.

Free proprietary services may be used as replaceable infrastructure when they provide clear operational value, but they must not become the sole owner of critical content or workflow data.

## Acceptable paid services

Payment is appropriate when the service represents infrastructure that would be unreliable, unsafe, or disproportionately expensive to operate internally. Expected examples include:

- Domain registration and DNS
- Production hosting and content delivery
- Off-site backups
- Transactional or bulk email delivery
- Large-scale media storage and delivery
- Reliable financial, market, weather, or other licensed data feeds
- Security, monitoring, or compliance services when operationally necessary

Paid services must expose reasonable export or migration paths whenever possible.

## Current architectural direction

The initial Akan Reports stack is:

- **Publishing engine:** Hugo
- **Editorial interface:** Decap CMS
- **Content storage:** Markdown, YAML, JSON, and article media files
- **Version control:** Git
- **Repository service:** GitHub Free initially, with Forgejo as an open-source migration option
- **Styling:** Custom CSS with shared design tokens; Tailwind is not a current dependency
- **Search:** Pagefind
- **Deployment:** Vercel (Git-connected Hugo builds to a CDN); Cloudflare remains the DNS registrar
- **Analytics:** Google Analytics 4 and Google Search Console for the starter stack; Umami, GoatCounter, or an equivalent open-source platform remain options if privacy or self-hosting becomes the priority later
- **Newsletter management:** listmonk or an equivalent open-source system
- **Media storage:** Git-managed article media initially; object storage when scale requires it

The public website should remain static by default. Dynamic services will be introduced only for capabilities that genuinely require them, such as subscriptions, authenticated accounts, real-time data, comments, or personalized experiences.

Analytics is treated as replaceable operational infrastructure rather than a core publishing dependency. Established proprietary services are acceptable when they provide useful audience, discovery, advertising, or search-performance insights. Their implementation must respect applicable consent and privacy requirements, avoid collecting unnecessary personal data, and remain removable without affecting the publication or its archive.

## Data ownership and portability

Editorial content must remain accessible outside the CMS. Removing or replacing the CMS must not prevent the newsroom from reading, editing, building, or migrating its archive.

Content schemas, media conventions, taxonomies, URL rules, and build instructions must be documented in the repository. Backups must include both the Git repository and any external media or operational data stores.

## Exceptions

An exception to the open-source default is acceptable only when:

1. No viable open-source option meets the requirement.
2. The proprietary option materially reduces security or operational risk.
3. The cost is justified by a necessary capability.
4. Data remains exportable in a usable format.
5. The dependency and an exit path are documented.

Exceptions should be explicit architectural decisions, not accidental dependencies introduced during implementation.

## Guiding statement

> Akan Reports will pay for necessary infrastructure, not unnecessary dependence. The publication's technology should protect its editorial independence rather than compromise it.
