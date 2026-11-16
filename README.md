# Axclusive preview — production handoff

Updated 17 November 2026. This is a static HTML/CSS/JavaScript website deployed to Vercel from GitHub, with 127 configured page routes and 126 sitemap entries. Existing service and article URLs are preserved. It is not a Next.js application.

## Developer handover — start here

Read the [Developer Handover: Vercel to Own Hosting](DEVELOPER-HANDOVER-OWN-HOSTING.md) before moving this site. It includes the full page-routing and redirect manifests, Apache/Nginx examples, image migration, form and partner-application dependencies, production-only indexing changes, testing and rollback steps.

Use it alongside the [Production Launch Checklist](PRODUCTION-LAUNCH-CHECKLIST.md). The handover describes required migration work; it does not mean the unresolved launch dependencies are complete.

## Preview safety

Keep all three indexing blocks: HTML noindex/nofollow, Vercel X-Robots-Tag, and robots.txt Disallow: /. Remove them only for an approved production deployment. Canonicals and social-image metadata use the intended axclusive.com URLs. New social assets must be deployed to that domain before sharing/indexing checks at launch. Legal and privacy pages were intentionally left unchanged, including their metadata.

## Latest readiness changes

- 427 legacy CDN image assets copied locally, including responsive variants and the ISO badge. Non-legal pages and shared scripts use local asset paths.
- Explicit legacy article alias redirects; permanent homepage redirect; known Resources and mixed-case About aliases.
- Branded 404.html with navigation, and an AX monogram SVG favicon.
- Consistent organization references and public contact details. Article bylines link to About; real publication dates and existing editorial modification dates retained.
- Three backup/recovery guides and the refreshed SD-WAN comparison included. ERP selection and Odoo cost guides remain on hold.

## Production dependencies

Read [PRODUCTION-LAUNCH-CHECKLIST.md](PRODUCTION-LAUNCH-CHECKLIST.md) before cutover. Enquiry forms currently prepare WhatsApp messages; they do not store leads or send email. The partner application still redirects to the current production backend. Confirm sales delivery, application handling, analytics, domain redirects, DNS/mail preservation and rollback before replacing the main website.

Promotion and client-brochure URLs need a restore/retire decision. Do not redirect unrelated pages to the homepage. Do not remove the old CDN until any other consumers are checked. Review inherited article claims separately from this technical migration.

## Verification scope

Local desktop and mobile layout/asset checks, internal route checks, legal-file hash checks, JSON-LD parsing and post-deployment HTTP checks are recorded in the working audit folder. These are not real-user Core Web Vitals or real-device Safari/Android measurements. Form delivery and analytics require the final account configuration and authorised test submissions.
