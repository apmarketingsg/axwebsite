# Axclusive preview — launch handoff

Updated 15 November 2026. The preview contains 99 HTML pages, including all 75 Blog and Insights articles; legal pages, the calculator and some legacy pages still need preservation.

## Preview behaviour
All pages intentionally retain noindex/nofollow metadata, the Vercel X-Robots-Tag header and robots.txt Disallow: /. Canonical URLs point to their intended axclusive.com destinations. The sitemap lists the 99 intended production URLs; merge these into the complete production sitemap at launch. Social previews use the published preview logo asset; update og:image to the production asset URL when migrating.

The top navigation and footer expose Managed SD-WAN and Global SD-WAN Coverage. Both SD-WAN hero sections have direct map links. Map popups describe availability as subject to confirmation.

## Required before main-site migration
- Preserve remaining legal, SIP calculator, promotion, application-development, client brochure and /sg/become-a-partner/ pages and all existing assets. The Blog and Insights articles are now included. Do not replace the entire existing site with this folder.
- Retain existing URLs wherever possible. Prepare permanent redirects only for URLs that change; verify legacy traffic and backlinks against the full production sitemap/Search Console export.
- Remove all three indexing restrictions only on production. Keep the preview blocked.
- Enquiry forms prepare WhatsApp messages; they do not store submissions, send email or integrate with a CRM. Verify receipt using an approved test and agree the lead-handling process.
- Configure the chosen analytics property and conversion events; no analytics account identifier is currently supplied.
- Add approved customer proof and public certification/licence references when supplied; do not invent endorsements or licence numbers.
- Compress the lazy-loaded 1.23 MB IP-transit network diagram while preserving readable labels.

## Checks completed
17 pages checked at 390px, plus homepage, both SD-WAN pages, Singapore directory, DIA and SIP pages at 320px. No persistent page overflow found. Mobile menu and map popup tested. Internal link/anchor/asset references checked. Production canonical URLs corrected across all pages.
Network spot checks confirmed gzip HTML, 200 responses, and retained noindex response headers. This is not a throttled Lighthouse audit or real-user Core Web Vitals measurement.

## Article migration and navigation
All 72 Blog and 3 Insights articles are included at their original paths. Normalized body text was compared to production and matched for all 75; original headings, publication dates and media were retained. Article images still use the existing public Axclusive CDN, which must remain available during migration. Existing claims were preserved, not revalidated as current promises. Navigation now separates Connectivity, Managed IT, Security, Business Voice, Resources and Company.
