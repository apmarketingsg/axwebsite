# Axclusive production launch checklist

Reviewed: **17 November 2026 (Singapore time)**  
Status: **Ready for developer handover. Not yet approved for production cutover.**

- Repository: https://github.com/ai-webuser/ax-website-preview
- Preview: https://ax-website-preview.vercel.app/sg/
- Migration instructions: [Developer Handover — Vercel to Own Hosting](DEVELOPER-HANDOVER-OWN-HOSTING.md)
- Preserve all current URLs, preview noindex and robots restrictions. Legal/privacy pages remain untouched.
- The repository is a static HTML/CSS/JavaScript frontend, not a copy of the current CMS or its backend. Do not replace the live hosting files blindly.

This checklist supersedes earlier accumulated checklist entries. Completed work is summarized below; outstanding work has an owner and an acceptance condition. Earlier working audit evidence is held in the Axclusive Website workspace, not assumed to exist in the GitHub repository.

## 1. What is verified on the current preview

| Check | Result |
| --- | --- |
| Page routes | All 127 configured routes return HTTP 200, match current source, and retain HTTP noindex. HTML noindex is present. |
| Sitemap | 126 intended URLs, with no unintended omissions. The blue-homepage experiment is deliberately excluded and canonicalizes to the main homepage. |
| Redirects | All 197 unconditional permanent rules return the intended HTTP 308 destination. The separate preview-only partner redirect remains temporary. Slash variants and query preservation for the 33 newest aliases were also checked in the preceding release. |
| Internal links | No missing internal page, asset or section-anchor targets found in the static route scan. |
| Assets | 486 unique local asset paths returned HTTP 200, including the migrated media library. Nine key shared/configuration assets matched source. |
| Error handling | Unknown URLs return a branded HTTP 404 with noindex, not a homepage or HTTP 200. |
| Mobile | All 127 routes checked at an actual 390px viewport: no document-width overflow or failed loaded images. |
| Desktop | Homepage, contact, SD-WAN, blog, phone-system comparison and coverage checked at 1280px: no document-width overflow or failed loaded images. |
| Interactions | Mobile menu/Services expansion and Escape dismissal work; WhatsApp hides while the menu is open. Singapore map popup opens and closes. |
| Calculator smoke test | Default 5 channels / 1 DDI / zero usage: SGD55 monthly under displayed 12-month settings; changing to 6 channels gives SGD64; restoring 5 gives SGD55. This is a smoke test, not full pricing regression or commercial approval. |
| Schema | All 83 article schemas parse and contain author, publisher, image, publication/modification date and page reference. Modification dates match existing visible dates. Coverage and SIP calculator now have page/breadcrumb/organization/site markup. |
| Blog usability | All 80 blog links remain in the HTML. Initially 22 articles are displayed by topic; Show more and full-archive search work. Three Insights articles remain available. |
| llms.txt | Published directory is available with current service names and 35 links. Production-domain links must be rechecked after cutover. |
| Legal/privacy | Both published files match the preserved source bytes; no legal copy or metadata edits. |

**Limits:** viewport checks do not substitute for physical-device testing; loaded-image checks do not mean every lazy image was scrolled into view. Asset HTTP status does not establish every responsive crop is visually correct. No enquiry, partner application or WhatsApp message was submitted. No measured Core Web Vitals or search-ranking guarantee is implied.

## 2. Required before replacing production

### A. Enquiry delivery — Axclusive sales owner + developer

- [ ] Agree whether the final contact flow is intentionally WhatsApp-only or requires email/CRM delivery. The present 28 forms prepare WhatsApp messages/copy text; they do not send email or store leads.
- [ ] If email/CRM is required, confirm the receiving inbox/provider and implement an independent server-side endpoint. The Contact page currently has enquiry type, name, company, location, capacity and requirements, but no work-email or phone input.
- [ ] Agree required contact/consent fields; implement server-side validation, spam/rate controls, clear error states and delivery-failure recovery. Keep credentials out of public files and GitHub.
- [ ] Verify actual receipt and correct routing of reseller/SI versus direct carrier/ISP/telco enquiries with approved test submissions.
- [ ] Confirm +65 6011 1719 is a monitored WhatsApp Business account. Test handoff and actual receipt on desktop and phone.
- [ ] Update any preview-only Contact FAQ/form explanations only once the chosen delivery flow is working. Opening WhatsApp is not proof of message delivery.

**Acceptance:** the business signs off the intended contact flow and receives authorized test leads through every enabled channel.

### B. Partner application — existing web maintainer + developer

- [ ] Obtain the current `/sg/become-a-partner/` form/backend, fields, destination and configuration, or implement an approved replacement.
- [ ] Preserve the application URL and verify receipt independently of the old site.
- [ ] Remove/replace the Vercel-preview-only redirect during migration. Do not make its redirect to `https://axclusive.com/sg/become-a-partner/` unconditional on production: that would redirect to itself.

**Acceptance:** partner applications still work after the old frontend/backend is taken out of service, or the required backend is explicitly preserved.

### C. Hosting migration, routing and rollback — developer + hosting administrator

- [ ] Record the exact reviewed GitHub commit. Inventory and back up current production files, CMS/database, form handlers, scheduled jobs and configurations.
- [ ] Deploy into a separate release directory/staging hostname. Confirm the hosting stack and deployment access. A CMS editing interface, if needed, is separate integration work.
- [ ] Translate all 127 rewrites and 197 permanent redirects from `vercel.json` into the destination server configuration; `vercel.json` is not executed by Apache/Nginx.
- [ ] Copy the media, fonts, SVGs, scripts and styles with their existing root-relative paths. Configure correct MIME types, text compression and suitable cache/revalidation policies.
- [ ] Exclude `.git`, backup files, internal audit artifacts, README, handover and checklist documents from the public production document root. Preview documentation is currently downloadable; retain handover documents in GitHub instead.
- [ ] Repeat all route/redirect/asset/404 tests on the new host, including mixed case, missing trailing slashes, query strings and the partner route.
- [ ] Confirm backups, monitoring, deployment ownership and a tested rollback procedure before cutover.

**Acceptance:** the same URLs and journeys work on destination staging and the previous production release can be restored safely.

### D. Domains and DNS — domain owner + developer

- [ ] Confirm canonical HTTPS `axclusive.com`, www/non-www handling and certificates for every redirected hostname.
- [ ] Verify ownership/control of `axclusive.com.sg`, `alphanetworks.com.sg`, `alphanetworks.global` and their relevant www hosts before configuring legacy redirects. Map equivalent pages; do not redirect every unknown path to the homepage.
- [ ] Preserve MX, SPF, DKIM, DMARC, verification and unrelated records. Website migration must not break mail or other subdomains.
- [ ] Keep the old CDN/hosting until dependent sites, legal-page assets and external consumers are checked.

### E. Production indexing — Axclusive approval + developer

- [ ] Keep preview/staging HTML noindex, X-Robots-Tag noindex and robots blocking unchanged.
- [ ] Only after launch approval, remove indexing blocks from intended public pages on the production host, including proxy/CDN headers; allow intended crawling and publish the sitemap.
- [ ] Keep the blue-homepage experiment out of the production public release or retain route-specific noindex. Preserve appropriate exclusions for error/non-public pages.
- [ ] Legal/privacy text is not to be edited. Any production-only robots-metadata change to those files requires explicit inclusion in launch approval; do not silently apply a blanket rewrite.
- [ ] Verify production canonical URLs, schema IDs/images, social cards, sitemap and `/llms.txt`. Confirm Search Console access and submit the final sitemap.

## 3. Final decisions and acceptance checks

| Item | Owner | Required next step |
| --- | --- | --- |
| Old content | Axclusive + developer | Decide restore, relevant replacement or intentional retirement for promotions, client brochure, careers/jobs, legacy tag archives and `/sg/services/`. No blanket About/Home redirects were added. |
| Complete production inventory | Existing maintainer | Export CMS URLs or provide sitemap/crawl access. Both production sitemap requests still returned HTTP 403 in this audit; newly created production pages cannot be ruled out. Reconcile with the saved production inventory before switching. |
| External thumbnail dependency | Developer | `resources.js` and `articles.js` still reference one S3 image for “What Is Load Balancing”. It returned 200 today. Localize it or explicitly preserve it before decommissioning old asset hosting. |
| Legal-page image dependency | Existing maintainer | Legal/privacy markup retains an old CDN ISO badge URL. Leave those pages untouched; preserve the asset host unless separately authorized to change the dependency. |
| Tracking | Axclusive marketing + developer | Agree analytics account and consent behavior. Implement approved tracking and distinguish actual delivered leads from telephone/WhatsApp clicks. No analytics integration was found in the reviewed source. |
| Real devices | Developer + Axclusive | Test iOS Safari and Android Chrome: form focus, touch targets, menus, map popups, footer, calculator, article tables, portrait/landscape and floating controls. |
| Performance | Developer | Measure on destination staging/production, including mobile network conditions, large imagery, fonts and caching. Current layout checks are not a Lighthouse/Core Web Vitals pass. |
| Calculator | Axclusive sales + developer | Run representative term, discount, DDI, usage and rounding cases against approved pricing; do not alter calculator pricing during migration. |
| Structured data | Developer | Use Google Rich Results Test / Schema.org validator and check final image URLs; local JSON/property checks are complete but rich-result eligibility is not guaranteed. |
| Business facts | Axclusive | Approve public licensing, Cisco partner wording, ISO certificate scope/validity, support terms, availability claims and any additional corporate identifiers. Do not invent credentials or SLA commitments. |
| External technical references | Content owner | Resolve the remaining access-restricted references from prior audits and refresh time-sensitive figures/vendor editions where needed. HTTP 403 alone does not prove a dead link. |

## 4. Closed findings — do not reopen as launch blockers

- [x] Legacy service and renamed-article redirect gaps addressed, including the mixed-case Ethernet-switch alias.
- [x] llms.txt created and reviewed; this is optional AI discovery assistance, not a ranking mechanism or substitute for SEO.
- [x] Missing non-legal page schema and article image/date fields addressed. Organization authorship is retained legitimately until real authors are confirmed.
- [x] Mobile form text, key tap targets and small diagram notes improved; blog scrolling reduced through progressive disclosure.
- [x] Earlier empty image placeholders are no longer present in the current HTML inventory.
- [x] The article-banner restoration and migrated media are present. No failed local asset responses were found in this audit.
- [x] The sitemap is current. Earlier 118/119/123-page counts and earlier schema-gap lists are historical, not the present baseline.
- [x] The earlier blanket statement that there are no verified keyword volumes is superseded by the Semrush/Ahrefs research. Missing or stale query/SERP data still requires targeted refresh; do not claim every keyword has verified demand or easy competition.
- [x] Technical-accuracy edits, including VXLAN and optical/private-network explanations, have been published. Business/engineering approval remains advisable; no new technical content rewrite was performed in this review.

## 5. Optional work after handover

- Real named author/reviewer profiles after names, consent, roles and current credentials are confirmed. Until then, keep Organization authorship.
- Current downloadable company brochure, certificate evidence and approved customer case studies.
- Server-render article banners/thumbnails if non-JavaScript availability is required; these shared enhancements currently rely on JavaScript.
- Refresh missing/stale Singapore keyword and SERP evidence and use GSC query-by-page data before consolidating overlapping articles.
- Keep the `llms.txt` reviewed date and service summaries current as offerings change.

## 6. Agreed service boundaries to preserve

- No standalone broadband; broadband only within Managed SD-WAN.
- No standalone AWS/Azure cloud-management landing pages; mention agreed environment management within managed services. Private cloud connectivity is a separate offering.
- Wavelength Services remain deferred for a future product review.
- Equipment/software supply and renewals do not automatically include implementation or ongoing support; these belong to agreed managed-service/voice scopes. Separately scoped application-development and business-application work remains available.
- Backup options: Druva with included AWS-hosted storage, or NAKIVO with Axclusive-managed S3-compatible storage; confirm capacity, retention and recovery terms per proposal.
- Tenable resale does not imply managed vulnerability scanning, penetration testing or remediation.
- SIP trunks with Singapore 6xxx numbers are restricted to Singapore-registered companies. Porting is charged separately; support response targets are not resolution guarantees.

## 7. Handover and approval

The developer can begin now using the repository and linked migration guide. Axclusive must provide hosting/DNS access, current production/backend backup, the enquiry destination/decision, partner-form details and a launch owner. Keep credentials in approved private channels, not in this document.

Launch only after the required acceptance conditions above are met, the production-only indexing change is authorized, and rollback is ready. This review does not authorize a main-domain switch.

Evidence retained in the working workspace: `seo/2026-11-17/final-prelaunch/` (page/redirect/source checks, static inventory, asset HTTP checks, mobile and desktop results). This document contains the actionable summary and does not require those local evidence files to be present in GitHub.
