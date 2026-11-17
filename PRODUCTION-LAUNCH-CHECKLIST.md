# Axclusive production launch checklist

Status: **Outstanding — keep preview noindex.**

Last readiness update: **17 November 2026 (Singapore time)**. Current baseline: 127 configured page routes and 126 sitemap entries. No production cutover or indexing changes were made.

This is the working checklist for issues identified in the production-readiness review. Update the checkboxes only after implementation and verification. Continue site improvements on the Vercel preview; do not switch the main domain or remove indexing protections until launch is authorised.

## Launch blockers

### Enquiry forms

- [ ] Confirm recipient inbox and email provider/backend or CRM destination.
- [ ] Restore independent form submission for Contact Us and relevant service pages. Current forms only prepare a WhatsApp message or copy enquiry text.
- [ ] Preserve useful production fields: name, email, company, phone, message and consent.
- [ ] Add appropriate spam protection, validation, success and failure messages.
- [ ] Verify actual receipt and enquiry routing with an authorised test.
- [ ] Keep WhatsApp available as an additional contact option.

### Partner application

- [ ] Migrate `/sg/become-a-partner/` or preserve its backend at a reachable destination.
- [ ] Preserve application fields and email delivery; verify receipt.
- [ ] Replace the temporary preview-host redirect after the independent application works.

**Current dependency:** the preview redirects to the existing production application. That does not preserve the application when the main production site is replaced.

### Existing production URLs missing from preview

| URL | Decision required |
| --- | --- |
| `/sg/application-development-singapore/` | Restored as a separately scoped development offering following the service-overview confirmation. Published route verified HTTP 200 with noindex. |
| `/sg/promotion/` | Restore current offers, or decide how to handle the old URL. |
| `/sg/client-brochure/` | Restore a current brochure if useful, or decide how to handle the old URL. |

- [ ] Record retain/retire/redirect decisions for these URLs.
- [ ] Implement and verify appropriate handling. Use permanent redirects only where the destination is relevant; avoid redirecting unrelated content to the homepage.

## Before launch

### WhatsApp

- [ ] Confirm that **+65 6011 1719** is the monitored WhatsApp Business account.
- [ ] Test mobile and desktop handoff and actual receipt with the team.

The number currently matches production. No messages were sent during the audit.

### Preview references and tracking

- [x] Replaced preview-host social-image URLs on non-legal pages with production-domain asset URLs.
- [ ] At cutover, verify those new production image URLs return 200 and social previews render. Until the files reach axclusive.com, preview sharing can lack its image. Legal/privacy metadata remains unchanged by instruction.
- [ ] Remove “This preview” wording from the Contact Us FAQ and describe the final enquiry flow accurately.
- [ ] Confirm the intended analytics platform. No Google Analytics/Tag Manager installation was found in the inspected preview HTML/JS.
- [ ] Configure relevant events: successful enquiries, WhatsApp clicks, telephone clicks, partner applications and calculator conversions. Distinguish clicks from delivered leads.

### Hosting and assets

- [x] Copied 427 referenced media assets into the preview project, including responsive variants and the ISO badge; replaced non-legal HTML/CSS/JS dependencies.
- [ ] Retain the old CDN until the old production site and any other consumers have been checked. Do not remove DNS merely because the preview no longer needs it.
- [ ] Confirm main-domain DNS, TLS, form backend and rollback arrangements.
- [ ] Preserve email-related DNS records.
- [ ] Verify redirects and unknown-URL/404 behaviour on the final domain.

### Sitemap completeness — newly identified

- [x] Added the seven routes below on 16 November 2026. The current sitemap contains 126 intended URLs; all 127 configured page routes retain noindex. The blue-homepage experiment is excluded.

- `/sg/it-products-licensing-singapore/`
- `/sg/fortinet-solutions-singapore/`
- `/sg/palo-alto-networks-singapore/`
- `/sg/microsoft-365-singapore/`
- `/sg/carriers-isps/`
- `/sg/hosting-cloud-providers/`
- `/sg/businesses-enterprises/`

### SEO switch — launch only

- [ ] Keep preview noindex throughout development.
- [ ] At approved launch, remove HTML and HTTP-header noindex from the production host only.
- [ ] Allow crawling in production `robots.txt`; keep preview blocked.
- [ ] Verify production canonical URLs, sitemap and redirects.
- [ ] Verify Search Console access and submit the final sitemap.

## Final verification still needed

- [ ] Refresh the full production inventory when sitemap/crawl access is available.
- [ ] Check the nine external references below manually or when automated access is available. HTTP 403 does not establish that a link is broken.
- [ ] Run real-device iOS Safari and Android Chrome checks on key customer journeys.
- [ ] Run a measured performance audit after final domain/backend changes.

External references awaiting verification:

- https://developers.cloudflare.com/reference-architecture/architectures/magic-transit/
- https://www.cloudflare.com/learning/ddos/glossary/ddos-blackhole-routing/
- https://kr.chinaunicomglobal.com/products-dia.php
- https://www.ctamericas.com/company/global-network/cn2/
- https://www.ctamericas.com/company/global-network/
- https://www.servicenow.com/products/hr-service-delivery.html
- https://www.servicenow.com/products/itsm.html
- https://www.servicenow.com/products/strategic-portfolio-management.html
- https://www.tenable.com/products

## Optional improvements

- [x] Restore a prominent WhatsApp shortcut across the shared site layout using +65 6011 1719. Published to Vercel with mobile spacing and hiding during menu use/form editing. Message delivery testing remains outstanding.
- [ ] Provide a current downloadable company/service brochure.
- [ ] Add verified certificate details or a certificate download if available.

## Verified baseline — 16 November 2026 recheck

- All **118** configured preview page routes returned HTTP 200, with both HTML and HTTP-header noindex. `robots.txt` still disallows all crawling.
- **44** additional internal link/asset targets returned HTTP 200; no missing HTML section anchors were found.
- All **75** article routes from the saved production inventory remain represented. This is URL coverage, not a fresh word-for-word article comparison.
- Production canonicals matched intended paths, and embedded JSON-LD parsed successfully on all 118 pages.
- **99** unique externally hosted image URLs returned HTTP 200, including the retained ISO badge. Keep the existing media host available after cutover.
- **34** external reference links checked: 25 returned HTTP 200; nine returned HTTP 403 and remain unverified, rather than confirmed broken.
- All **118** pages were checked in the browser at **390px** width: no horizontal document overflow. Eight key pages also passed at **320px**: homepage, Contact Us, backup, Odoo, enterprise workflows, application development, Managed SD-WAN and SIP calculator.
- At 320px, mobile Services groups expanded correctly, the Odoo link navigated successfully, and WhatsApp was hidden while the menu was open.
- The two unresolved legacy routes, Promotion and Client Brochure, return 404 on preview. An intentionally nonexistent URL also returned 404, rather than a misleading homepage response.
- The SIP calculator remains a native preview page. Pricing and full calculation regression were not rerun in this audit; retain the previously verified calculation behaviour.

**Mobile limits:** the complete route sweep checks horizontal overflow and loaded-image status. It is not a visual review of every scrolled section, a full interaction test of every form/map/calculator, or a substitute for physical iOS/Android testing. Lazy images were independently checked by URL, rather than all scrolled into view.

**Production comparison limit:** the fresh production sitemap request still returned HTTP 403. Missing-production-URL comparison therefore uses the saved production inventory; newly added production pages outside that inventory cannot be ruled out. No email, partner application or WhatsApp enquiry was submitted.

### Article images — follow-up production comparison

A fresh comparison of all 75 production articles succeeded after the full-site audit. Every production article uses the same lead banner (`banner_blog_default_9e99600c3c.jpg`), outside the article body. That banner was omitted from the preview article template.

- [x] Restored production lead banners across all 75 article pages using the shared article template. Published and checked on Vercel on 16 November 2026; all 75 rendered banners with no mobile horizontal overflow and noindex retained.
- [x] Published restored Blog/Insights and related-reading thumbnails through shared templates (72 Blog cards and 3 Insights cards). Uses original production related-card images or article social images. Six cards use the shared original banner: one source has no thumbnail, and five original S3 thumbnail URLs return HTTP 403.
- [ ] Replace the five inaccessible legacy thumbnail images with supplied originals or approved article-specific artwork. See `seo/2026-11-16/article-image-fallbacks.json`. The current production hub thumbnail inventory remains inaccessible to automated fetching (HTTP 403).
- All non-empty article-body image `src` URLs and image counts matched current production across all 75 articles. This confirms source preservation, not a complete rendered-image comparison of every section or responsive `srcset` variant.
- The nine empty image elements noted below also exist in current production; they were not introduced by migration.
- Evidence: [Fresh article image comparison](seo/2026-11-16/production-article-image-comparison.json).

### Minor article cleanup

- [ ] Remove or restore **nine empty image elements across five articles**. They have no image URL; the inspected Cloudflare placeholders render at zero size. These are not nine failed image requests, but should be cleaned up and checked against the original article content.

| Article slug under `/sg/resources/blog/` | Empty elements |
| --- | ---: |
| `beyond-singapores-borders-how-axclusives-international-network-delivers-true-end-to-end-connectivity/` | 1 |
| `cloudflare-axclusive/` | 4 |
| `cisco-duo-axclusive/` | 2 |
| `cisco-equipment-axclusive/` | 1 |
| `what-is-internet-protocol/` | 1 |

## Service coverage review

No missing service category was found against the currently agreed offering. Do not treat deliberately deferred services as migration gaps.

| Offering | Current coverage |
| --- | --- |
| Internet and protection | IP Transit, DIA and DDoS Protection pages |
| Private and international connectivity | Leased Lines, DCI, IPLC/IEPL, MOFN, Cloud Connectivity and MSSC pages |
| Managed services | Managed Infrastructure & IT and Managed SD-WAN pages; existing AWS/Azure environment management mentioned briefly |
| Hosting and delivery | Colocation and Managed CDN pages |
| Voice | SIP Trunking, managed cloud PBX, Teams Calling, Webex Calling and native SIP calculator |
| Backup | Dedicated Backup & Recovery page with Druva including AWS-hosted storage, and NAKIVO with Axclusive-managed S3-compatible storage |
| Business applications | Odoo ERP & CRM, Enterprise Workflow Solutions and Application Development pages |
| Equipment and security products | Catalogue plus Cisco, Fortinet, Palo Alto, Microsoft 365, Huawei and Tenable pages; Dell servers/storage covered in the catalogue; Cisco Duo secure-access page |
| Customer discovery | Homepage cards and customer pages link relevant offerings; enterprise/reseller sections feature all four backup/application offerings, hosting/carrier sections prioritise backup and portals/integrations |

The menu and footer use grouped services. Vendor pages remain reachable through the catalogue without increasing top-level menu clutter. No new menu category is required for current coverage.

### Supporting evidence

- [Live route/link recheck](seo/2026-11-16/final-audit.json)
- [Metadata, external references and image recheck](seo/2026-11-16/extended-recheck.json)
- [All-page mobile measurements](seo/2026-11-16/full-mobile-recheck.json)
- [Narrow-screen measurements](seo/2026-11-16/narrow-mobile-recheck.json)
- [Live sitemap omissions](seo/2026-11-16/sitemap-recheck.json)

The earlier `production-readiness-review.txt` is historical and contains superseded counts and the previously missing Application Development route. Use this checklist and the linked recheck evidence for the current status.

## Service roadmap decisions

- [ ] Future follow-up: assess a standalone Wavelength Services offering, capacity options, routes, protection and handoff requirements. Keep it off the website for now.
- No standalone AWS/Azure cloud-services page. Mention management of agreed existing AWS/Azure environments briefly within Managed Infrastructure & IT.
- Broadband only within Managed SD-WAN; no standalone broadband offering.
- Backup options: Druva with included AWS-hosted backup storage; NAKIVO with Axclusive-managed S3-compatible storage. Confirm retention, capacity, location, responsibilities and recovery terms per proposal.
- Huawei and Tenable: product supply and applicable renewals. Tenable resale does not imply managed scanning, penetration testing or remediation.
- Application development and business-application projects have explicit scope; equipment purchases still do not imply implementation or ongoing support.

Image restoration release: GitHub commit `32023b29702b7e98bd765cbbef179147b0057f25`. Evidence: `seo/2026-11-16/restored-article-browser-checks.json`. Shared image restoration currently requires JavaScript; consider rendering these images directly into HTML in the production build for non-JavaScript clients.

## SEO demand and competition validation — 16 November 2026

- [x] Create a provisional keyword map for all 119 configured routes (118 content/utility pages plus the separate homepage design test).
- [ ] Validate candidate keywords with dated Semrush Singapore volume and difficulty exports. Current report contains no verified monthly volumes.
- [ ] Obtain dated Singapore Google top-ten organic results for each primary target; classify major brands/vendors separately from smaller specialists and record actual shares. Public web examples do not establish first-page dominance.
- [ ] Obtain GSC query-by-page data before deciding article consolidation or attributing query metrics to individual URLs.
- [ ] Review technical accuracy of inherited articles, starting with BGP; review overlapping Magic Transit/DDoS topics.
- [ ] Approve final keyword priorities and implement page-specific copy improvements after verification. No claim that every page is fully SEO-optimised or that first-page rankings are achievable has been made.

Reports: [Page keyword audit](seo/2026-11-16/page-keyword-audit.md) and [Detailed CSV](seo/2026-11-16/page-keyword-audit.csv).

## Semrush verification update — 16 November 2026

- Signed-in Singapore research completed partially: four exact page-primary keywords have numeric volume, one broader IP-transit alternative has volume, and two primary keywords have ten ranked competitor URLs each. See `seo/2026-11-16/page-keyword-audit.md`.
- Remaining pages/variants are pending after Semrush hit the account’s ten-request daily limit. Do not treat N/A as zero or mark the full site volume/competition-validated.
- Finish Singapore keyword volumes and dated organic SERP checks after quota reset or with sufficient account access/export. No paid trial activated. Keep preview noindex.

## Ahrefs verification update — 16 November 2026

- Connected Ahrefs and checked 251 unique keyword candidates; all 111 service/homepage/article primary SERPs were requested. See updated `seo/2026-11-16/page-keyword-audit.md`.
- Completed the inventory pass, not a blanket SEO sign-off: many exact phrases were not returned, and some competitor snapshots date to 2016–2024. Refresh priority stale/missing SERPs before approving targets.
- Retain Semrush/Ahrefs values separately; zero, null and missing are distinct. Obtain GSC query-by-page/country data for overlap decisions. Vendor/career-heavy terms must not be sold as easy commercial opportunities.
- No content, URL, noindex or deployment changes in this research pass; no paid trial activated.


## Non-blog readiness and optimisation release — 16 November 2026

- [x] Published the checked 103-page optimisation batch, with final commit `9bb9dc64c646fc3b528a4b477e3268eefc4db735`.
- [x] Verified all 119 configured routes return 200, match source and retain HTTP noindex; static HTML noindex/canonical checks passed. Legal/privacy pages and calculator unchanged.
- [x] Checked 39 non-blog pages live at actual 1280px and 390px widths after load; no document overflow or failed loaded images with source URLs. This is not a measured performance audit or all-device interaction test.
- [x] Updated the content plan and prepared four unpublished buyer-guide drafts.
- [x] Resolved the seven sitemap omissions and added four buying guides; blue-homepage test remains excluded.
- [ ] Add approved public credential references, genuine reviewer bios and customer/operational evidence.
- [x] Reviewed and published four buying guides with distinct planning/purchasing intent and reciprocal links. Partial GSC query/top-URL evidence checked; continue monitoring overlap after production indexing. See seo/2026-11-16/priority-article-release/review.md.

The non-blog readiness score is 76/100, an editorial rubric rather than a ranking or AI-citation score. Intentional preview noindex is preserved and not penalised. Existing forms, partner application, tracking, real-device and performance launch checks remain outstanding. See `seo/2026-11-16/non-blog-seo-geo-review.md` and `content/2026-11-16/Axclusive Content Plan.md`.


## Post-publication review — 16 November 2026

Updated readiness score: **80/100** (previously 76). Full report: [updated SEO/GEO review](seo/2026-11-16/post-publication-review/seo-geo-review.md).

- [x] Rechecked all 123 configured routes: HTTP 200, source match and noindex headers.
- [x] Confirmed complete 122-entry sitemap; experiment intentionally excluded.
- [x] Verified internal page/anchor targets and metadata/schema syntax; no unintended duplicate titles.
- [ ] Decide restore/retire/redirect handling for promotion and client brochure (preview 404 confirmed).
- [ ] Resolve independent enquiry/partner application delivery and verify receipt.
- [ ] Add approved public credentials and original customer evidence.
- [ ] Run measured mobile performance and real-device journey checks; assess large diagram and media dependencies.
- [ ] Review preview protection separately: robots blocking prevents crawlers from seeing noindex. Current noindex and robots settings were left unchanged.

No production switch, website content changes or indexing changes were made in this review.

### Performance and mobile release — 16 November 2026

- [x] Compressed the large IP transit diagram by 80.3% and added full-size access.
- [x] Moved the shared article banner onto the preview domain, reduced its size and added early image discovery.
- [x] Improved mobile comparisons across 29 articles (35 tables), with desktop tables preserved.
- [x] Verified all 123 deployed page routes against source and confirmed preview noindex; sitemap retains 122 entries.
- [ ] Complete throttled performance/Core Web Vitals, physical-device and assistive-technology checks before production. These remain separate from the completed image-size and layout checks.
- Evidence: `seo/2026-11-16/performance-mobile/release-summary.md`.


## Readiness fixes — 16 November 2026

- [x] Added explicit permanent redirects for legacy root and /sg/ blog aliases when they do not conflict with existing service URLs. Added /sg/resources/, the known /SG/About/ variant, and a permanent homepage redirect. No broad catch-all redirect.
- [x] Added a branded static 404 and an AX monogram SVG favicon; /favicon.ico redirects to the SVG.
- [x] Standardised organization references across non-legal structured data. Enriched homepage/About with existing public contact details, logo, social links and AS132337 identifier.
- [x] Standardised article bylines linked to About and semantic publication dates. Retained existing genuine modified dates; did not invent editorial update dates for older articles.
- [x] Added representative article image schema where an existing in-article image is available. New text/HTML-diagram articles still need suitable editorial images if desired; do not substitute an unrelated image in Article schema.
- [x] Cleaned non-legal social-image URLs and enabled larger Twitter cards. The general image is a fallback for pages without a specific existing visual.
- [ ] Confirm legacy /sg/promotion/ and /sg/client-brochure/ retain/retire decisions. They remain 404 until a relevant replacement or restored content is approved.
- [ ] Confirm domain ownership and implement matching-path permanent redirects for www and former domains at the hosting/edge layer. Preserve CDN and mail DNS. Test HTTP→HTTPS and trailing-slash chains on the final host.
- [ ] Verify the audit's reported exposed production Turnstile secret and rotate it if confirmed. No secret was retrieved or published during these fixes.
- [ ] Confirm the legal former company name, Hong Kong relationship, licence scope, ISO issuer/validity and registry identifiers before adding richer claims to schema.
- [ ] Select actual named engineering reviewers if desired; do not invent people or certifications. Organization authorship is retained.
- [ ] Review overlapping Cloudflare articles against traffic, backlinks and content before merging or redirecting either current URL.
- [ ] Review long titles and weak contextual links selectively; no arbitrary word-count expansion or blanket Singapore suffixes.
- [ ] Optional: llms.txt. Not a launch requirement or a substitute for crawlable, useful pages.

### Required handover inputs

Sales inbox + sending provider/CRM; partner application backend; analytics property and consent requirements; DNS/hosting owners; real certificate/licence evidence; final production launch approval. Keep the preview blocked from indexing throughout.

### Content on hold

ERP selection and Odoo total-cost guides remain on hold. Legal and privacy source pages remain byte-for-byte unchanged.

- [ ] Review inherited technical claims in older articles before launch. The existing “What is MPLS?” article still contains absolute latency/security promises and repeated passages; it needs an editorial accuracy pass separately from this asset/metadata migration.
- [x] Removed nine empty image elements with no source from five migrated articles; preserved all actual images.

### Readiness verification — 16 November 2026

- 127 routes checked at 390px and 1280px: no page-width overflow or broken loaded images after cleanup. Mobile navigation opens and closes. These are browser checks, not physical-device or Core Web Vitals certification.
- Static checks: all referenced local assets present, structured data parses, preview noindex retained, legal/privacy file hashes unchanged.
- 164 explicit permanent redirects checked locally; the existing host-specific partner application redirect remains separate.
- Evidence and live deployment verification are recorded in `seo/2026-11-16/launch-fixes/`.

## Redirects and AI-readable directory — 17 November 2026

- [x] Added relevant legacy service, company, blog-index and renamed-article aliases to the existing redirect configuration; preserved all 127 page rewrites and prior redirects. Legal/privacy HTML and metadata are unchanged; their legacy root URL aliases lead to the existing pages.
- [x] Added `/llms.txt` with current service naming, customer pathways, cloud bandwidth distinctions, core versus extended coverage, voice eligibility and equipment-supply scope. Its links use intended production URLs; keep preview noindex and robots protections.
- [x] Updated the own-hosting handover redirect manifest. `vercel.json` remains the authoritative configuration; translate it for the destination host.
- [ ] Verify production-domain `/llms.txt` and every listed destination after cutover. Keep the reviewed date and service summaries accurate as offerings change. This file is optional discovery assistance, not a ranking guarantee.
- [ ] Configure www/non-www, HTTPS and verified legacy-domain redirects on the final hosting/CDN. Preserve mail DNS and test certificates, query strings and redirect chains. Do not redirect all unknown URLs to the homepage.
- [ ] Resolve old careers/job, tag archive, `/sg/services/`, promotion and client-brochure URLs with relevant content or intentional retirement. No blanket redirect to unrelated About, Contact or homepage content was added.
- [ ] Preserve the partner application backend. The root `/become-a-partner/` alias leads to the existing application pathway, not the marketing partner page; the preview-only production-backend redirect remains a launch dependency.

Release validation and live HTTP results are recorded in the working audit folder `seo/2026-11-17/redirects-llms/`. This update does not resolve form delivery, analytics, real-device testing or production indexing approval.

## Mobile usability and structured data — 17 November 2026

- [x] Mobile text fields, selects and textareas use at least 16px text on non-legal pages. Enlarged key navigation, action, breadcrumb and footer-link targets; retained inline prose links without excessive padding.
- [x] Raised small mobile service notes and network-diagram captions to at least 12px. New shared styles explicitly exclude pages containing the legal document template.
- [x] Blog archive initially shows three articles per topic (22 total), with six-at-a-time expansion and search across all 80 articles. All article links remain in the original HTML and all cards are available without JavaScript. Existing article URLs are unchanged.
- [x] Added WebPage, BreadcrumbList, WebSite and existing verified Organization details to the coverage directory and SIP pricing estimator. Calculator prices and calculation logic are unchanged.
- [x] Added 37 missing article dateModified values from existing visible update dates, and corrected one pre-existing mismatch to the visible date. Added 15 missing image values using the banner displayed on those pages. No publication dates or visible update dates were advanced for this metadata work.
- [x] Checked all 83 article schemas for author, publisher, image, publication/modification date and mainEntityOfPage; JSON parsing and date consistency checks pass. Organization authors remain valid; no unverified people or credentials were added.
- [x] Checked representative desktop (1280px), phone (390px) and narrow-phone (320px) layouts, mobile menu open/Escape dismissal, blog expansion and full-archive search. No page-width overflow or undersized form text was found in the tested templates.
- [ ] Verify real iOS Safari / Android form focus, touch interactions and landscape orientation; browser viewport checks are not physical-device certification.
- [ ] Run Google Rich Results Test / Schema.org validation on representative production pages and confirm production image URLs are accessible. Current checks validate syntax, links and visible-data consistency, not eligibility guarantees.
- [ ] If named authors/reviewers are wanted, confirm real names, roles, consent and current credentials before creating profiles or changing authorship. Retain Organization authorship until then.
- [ ] Confirm any additional corporate identifiers, historical company names, licence references and certification evidence before extending Organization markup. Existing verified identity fields were preserved.

Legal/privacy content and metadata remain untouched, including their deliberate schema exclusions. Preview noindex and robots restrictions are retained. Forms, partner backend, analytics and approved production indexing remain separate launch dependencies. Evidence: working audit folder `seo/2026-11-17/mobile-schema/`.
