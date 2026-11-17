# Axclusive developer handover: Vercel to own hosting

Prepared: **17 November 2026 (Singapore time)**  
Status: **Migration instructions only; production cutover not authorised by this document.**

## 1. Source and baseline

- Repository: https://github.com/ai-webuser/ax-website-preview
- Release selection: use the current reviewed `main` commit containing the final 17 November launch checklist; record its exact hash before migration. Earlier pinned hashes predate the redirect, mobile and schema updates.
- Preview: https://ax-website-preview.vercel.app/sg/
- Intended production: https://axclusive.com/sg/
- Local source: `sites/dia-optimization/` in the Axclusive Website workspace. These files are at the **repository root** in GitHub.
- Working launch checklist: `PRODUCTION-LAUNCH-CHECKLIST.md` in the repository.
- Baseline: 127 configured page routes, 126 sitemap entries, 197 permanent redirects and one preview-host-specific temporary partner redirect.

The site is static HTML, CSS and JavaScript. It is not a Next.js application and has no required Node runtime, package build or content database. Vercel currently supplies hosting, URL mapping, redirects and response headers. Apache, Nginx or another static-capable web server can replace it.

The existing production CMS/backend has **not** been identified or exported. Do not overwrite the live document root before its forms, applications, databases, scheduled jobs and other dependencies have been inventoried and backed up. This repository does not contain those systems. If the business wants a CMS editing dashboard, integrating one is separate work.

## 2. Inputs required from Axclusive / current host

| Input | Required action |
|---|---|
| Hosting platform and server administrator | Confirm Apache/Nginx/other, document root, deployment access, TLS and logs |
| Current production backup | Export site files, database if any, configuration, form handlers and relevant scheduled jobs |
| Domain/DNS owner | Confirm control of axclusive.com and any old domains; export current DNS |
| Sales delivery destination | Confirm inbox, SMTP/email provider or CRM, and authorised test recipient |
| Partner application backend | Obtain original code/configuration and destination; preserve all fields and delivery |
| Analytics | Confirm account/property, consent requirements and conversion definitions |
| Business approval | Confirm credentials, final content and launch window |

Keep credentials out of GitHub, public files and this handover. Provision them through the hosting environment's secret storage.

## 3. Stage the release on your hosting

1. Pin the reviewed GitHub commit or agree a newer reviewed commit. Record its hash.
2. Deploy to a **new release directory**, not over the live site. Keep a previous release and production backup for rollback.
3. Publish only the web assets and required runtime files. Keep `.git`, audit reports, this handover, README, checklist, backups and server configuration outside the public document root. `vercel.json` is configuration input, not a file Apache/Nginx will execute.
4. Preserve file names, case and root-relative paths. Host the project at the domain root; `/sg/` is a public route, not the asset directory. CSS, scripts and images are referenced at `/...`.
5. Serve staging on a separate hostname with TLS. Retain existing noindex settings. Restrict staging access if required; robots rules are not access control.
6. Translate routing and redirect rules below. Configure the forms before final acceptance.

## 4. Routing: preserve URLs without Vercel

`vercel.json` is the authoritative mapping for this release. Appendix A lists every page mapping; Appendix B lists permanent redirects. Re-extract from the chosen commit if the source changes.

A rewrite is internal: `/sg/ip-transit-singapore/` serves `ip-transit-singapore.html` with HTTP 200 and the browser keeps the original URL. A redirect tells the browser to move to another URL with HTTP 301/308. Do not turn page rewrites into redirects to `.html` files.

### Recommended method: explicit server mappings

Translate every `rewrites` entry into an exact internal route and every unconditional `redirects` entry into an exact permanent redirect. Use canonical trailing slashes on page URLs. Keep assets, APIs, ACME challenges and sitemap/robots routes out of blanket slash rules. Preserve query parameters where appropriate, including campaign attribution. Test redirect order and case explicitly.

Illustrative **Nginx** server-block fragment; replace paths and generate all entries from the manifest. This is not a complete TLS/server configuration:

```nginx
root /srv/axclusive/current/public;
index index.html;

location = / { return 308 /sg/$is_args$args; }
location = /sg/ { try_files /index.html =404; }
location = /sg/ip-transit-singapore/ {
    try_files /ip-transit-singapore.html =404;
}
location = /pbx-vs-voip/ {
    return 308 /sg/resources/blog/pbx-vs-voip/$is_args$args;
}
# Generate remaining exact page mappings and redirects here.

error_page 404 /404.html;
location = /404.html { }
location / { try_files $uri $uri/ =404; }

# Staging host ONLY:
add_header X-Robots-Tag "noindex, nofollow" always;
```

Illustrative **Apache 2.4** `.htaccess` rules at the document root (requires mod_rewrite and appropriate AllowOverride). Do not combine blindly with existing CMS/front-controller rules:

```apache
RewriteEngine On
RewriteRule ^$ /sg/ [R=308,L]
RewriteRule ^pbx-vs-voip/$ /sg/resources/blog/pbx-vs-voip/ [R=308,L]
# Generate remaining explicit permanent redirects before internal rewrites.
RewriteRule ^sg/$ index.html [END]
RewriteRule ^sg/ip-transit-singapore/$ ip-transit-singapore.html [END]
# Generate remaining internal page mappings here.
ErrorDocument 404 /404.html

# Staging host ONLY, requires mod_headers:
Header always set X-Robots-Tag "noindex, nofollow"
```

Add and test slash-normalisation for the known page/alias set, so a request without the final slash reaches the canonical URL. Do not force a trailing slash onto files such as `/favicon.svg`. Configure unknown URLs to return **HTTP 404 with the branded page**, not 200 and not a homepage redirect. Syntax-check server configuration before reloading.

Alternative: generate physical `sg/<slug>/index.html` directories from the rewrite manifest, keeping root-level assets intact. This avoids most internal rewrite rules but still requires redirects, 404 handling, headers and careful asset-path validation. Choose one approach and document it.

### Special route: partner application

The current conditional redirect applies only on `ax-website-preview.vercel.app`:

`/sg/become-a-partner/` → `https://axclusive.com/sg/become-a-partner/` (temporary).

**Do not copy this as an unconditional production redirect: it would redirect to itself.** There is no independently migrated application backend in this release. Restore its original handler at this path, or implement a replacement before switching. Preserve any required submission endpoints and file-upload behavior after inspecting the original implementation.

## 5. Images and other assets

427 existing media files, including responsive variants and the ISO badge, are stored in GitHub as `media-<hash>.<extension>` files. They total approximately 102 MB across the entire library, not per page. Copy them with the other assets; there is no Vercel image transformation or Vercel storage dependency for these files.

- Copy all referenced SVG, PNG, JPEG, WebP, GIF, font, CSS and JS files, not just HTML.
- Keep `src`, `srcset` and CSS URLs intact; verify responsive images at several screen widths.
- Preserve MIME types, especially SVG, fonts, JavaScript and CSS.
- Enable compression for text assets. Cache hash-named media for a long period; use revalidation/shorter caching for HTML and mutable scripts/styles unless filename versioning is introduced.
- Confirm production-domain `og:image` and Article image URLs return actual images after deployment. Those URLs already point to axclusive.com for non-legal pages.
- Keep the old `cdn.axclusive.com.sg` DNS/service until all old-site and external consumers are checked. Legal/privacy pages were excluded from refactoring; inspect any remaining dependencies without rewriting their content.
- One shared thumbnail mapping in `resources.js` and `articles.js` still uses an external S3 image for the load-balancing article; it returned 200 in the final audit. Localize it or explicitly preserve it before retiring old asset hosting. Legal-page CDN references remain untouched.
- A new CDN is optional. The server can serve these files directly. If introducing one, test CORS, caching and asset URL changes separately.

## 6. Forms, WhatsApp and calculator

Current enquiry scripts prepare WhatsApp messages or copied text; they are not an email/CRM lead-capture backend. Review `contact-app.js`, `dia-app.js` and other service-specific `*-app.js` files rather than assuming all forms use one handler.

Before launch:

1. Confirm the recipient and sending provider/CRM. Implement a server-side endpoint over HTTPS.
2. Retain name, company, work email, optional phone, requirements and any service-specific fields; record source page and consent as agreed.
3. Validate on the server, limit request size/rate, reject spam and prevent email-header injection. Apply CSRF/origin protections appropriate to the endpoint. If using Turnstile, validate its token server-side; never embed the secret in browser code.
4. Provide accessible field errors, loading state, success confirmation and delivery-failure recovery. Do not report success merely because a WhatsApp window opened.
5. Keep WhatsApp as a separate contact option using **+65 6011 1719**. Confirm this is monitored and test actual receipt with the team.
6. Test reseller/SI applications separately from direct telco/carrier/ISP enquiries. Ensure they reach the agreed inbox/workflow.
7. Verify successful and failed submissions, spam handling and actual receipt on desktop/mobile. Avoid logging unnecessary personal information; agree retention and access.
8. Remove preview-only explanations from Contact Us and other affected pages once the real flow exists. Do not alter legal/privacy wording without separate approval.

The SIP calculator is browser-side (`sip-calculator.js` and its page). Preserve current pricing, term/discount calculations and URL. Compare representative inputs/results with the approved preview; do not change prices during infrastructure migration. Confirm its enquiry action works with the final contact flow.

The external audit reported possible exposure of an old production Turnstile secret. This was not independently confirmed. The owner should verify privately and rotate if confirmed, updating the old/new backend safely.

## 7. Production-only indexing and SEO changes

The checked-in site intentionally has three preview controls: HTML `noindex,nofollow`, `X-Robots-Tag: noindex, nofollow`, and `robots.txt` with `Disallow: /`. None is an automatic environment switch today.

Create a separate production release transformation/configuration. **Do not remove protection from the preview branch/host globally.**

| Surface | Preview/staging | Approved production |
|---|---|---|
| Intended public HTML pages | Retain noindex | Remove noindex/nofollow or use index,follow |
| HTTP headers | Retain noindex | Remove blanket noindex header |
| robots.txt | Preserve current policy pending owner decision | Allow intended public content; list sitemap |
| Canonicals | Keep intended axclusive.com canonical | Verify correct axclusive.com URL |
| Experimental blue homepage | Not in sitemap | Exclude from public release or retain route-specific noindex |
| Error pages / non-public pages | Noindex | Keep excluded as appropriate |

Production robots example:

```text
User-agent: *
Allow: /
Sitemap: https://axclusive.com/sitemap.xml
```

Legal/privacy **text must remain unchanged**. Their preview metadata was also deliberately left untouched. A production-only robots-metadata change to these files must be explicitly included in the launch approval; do not silently rewrite them as part of a blanket optimisation. Compare legal text/hashes before and after, accounting separately for any approved metadata-only change.

Noindex is not a security mechanism. Google cannot read a page's noindex if robots.txt prevents crawling; do not describe the current dual-block policy as a guarantee that a URL can never appear in search. Keep the existing preview policy for this migration and obtain approval before changing it.

Verify sitemap URLs, canonical tags, structured-data IDs, social images and internal links. Keep the 126 intended sitemap entries unless a reviewed content decision changes them. Do not invent last-modified dates. The partner route's sitemap inclusion is pending the final application implementation; the blue experiment should remain excluded.

## 8. Domains, DNS and operational configuration

- Confirm canonical `https://axclusive.com`; implement www→non-www and HTTP→HTTPS with permanent redirects, preserving relevant paths and queries.
- Obtain approval/control before configuring former domains (`axclusive.com.sg`, `alphanetworks.com.sg`, `alphanetworks.global`). Verify ownership and map relevant legacy URLs; do not apply wildcard redirects to mail/CDN subdomains.
- Preserve MX, SPF, DKIM, DMARC, verification records and any unrelated DNS records. Do not replace a whole zone with website-only records.
- Provision certificates for all redirected HTTPS hostnames as well as the main host.
- Configure monitoring, log rotation, backups, least-privilege deployment access and a repeatable deployment process. Review existing headers and introduce security-header changes with testing rather than a blanket policy that could break embeds or forms.
- Configure analytics only with approved account IDs and consent behavior. Track delivered form submissions separately from WhatsApp/telephone clicks.
- Decide `/sg/promotion/` and `/sg/client-brochure/`: restore useful content, redirect to a genuinely equivalent replacement, or intentionally retire. They currently remain 404; do not send them to an unrelated homepage.

## 9. Acceptance checks before launch

- [ ] Every Appendix A route returns intended HTML, correct title/H1 and self-canonical; all sitemap URLs work.
- [ ] Every Appendix B alias returns 301/308 to the correct destination, then 200. Test slash variants, query strings and known mixed case.
- [ ] Unknown URLs return branded HTTP 404; root redirects to `/sg/`; favicon works.
- [ ] Images, responsive sources, fonts and diagrams load without old CDN/Vercel dependency where migrated. Confirm ISO badge.
- [ ] Desktop and mobile navigation, footer, maps/popups, comparison tables, forms and floating WhatsApp work without overflow or overlap.
- [ ] Test iOS Safari and Android Chrome on real devices. Measure performance on final hosting; prior layout checks are not Core Web Vitals certification.
- [ ] Calculator prices/results unchanged; partner and enquiry submissions arrive at the intended destination.
- [ ] Preview remains noindex. Production has the approved indexing configuration, without inherited noindex headers at proxy/CDN level.
- [ ] Legal/privacy copy unchanged; requested metadata exceptions explicitly approved.
- [ ] Verify company/certification claims and obtain engineering acceptance of technical content. Previously flagged MPLS/optical/VXLAN corrections are published; do not restore older wording.
- [ ] No secrets, backups, source-control directories or internal reports are publicly accessible.
- [ ] Rollback tested and owners sign off.

Representative checks (replace staging host as needed):

```sh
curl -I https://axclusive.com/sg/
curl -I https://axclusive.com/pbx-vs-voip/
curl -I https://axclusive.com/launch-check-not-found/
curl -s https://axclusive.com/robots.txt
curl -s https://axclusive.com/sg/ | rg 'robots|canonical|og:image'
```

Test the actual responses and final redirect chains, not just whether the browser displays a page. No email/backend tests have been completed by the earlier static-site verification.

## 10. Cutover and rollback

1. Agree launch window, freeze or reconcile content updates, take final backup and record current DNS/configuration.
2. Complete staging acceptance and obtain business approval for production indexing and cutover.
3. Deploy the approved production artifact, forms and server configuration as one coordinated release. Prefer an atomic document-root/symlink switch where supported.
4. Switch only the required web DNS records if hosting changes. Preserve email/CDN records. Keep old hosting available through propagation and rollback window.
5. Verify TLS, main routes, assets, forms, redirects, 404, indexing and analytics immediately from the public domain.
6. Submit the sitemap in Search Console. Because the canonical domain remains axclusive.com, this hosting-only move does not itself require Change of Address; separately evaluate any approved old-domain migration.
7. Monitor 404s, server errors, delivery failures, traffic and Search Console for at least two weeks. Add relevant missing redirects after investigation.
8. If critical journeys fail, restore the previous web root/configuration or DNS target. Account for DNS caches; preserve any newly received leads/data. Keep old backend available until the new one is confirmed stable.

## 11. Prior verification and remaining work

The final 17 November review passed source comparisons for all 127 deployed routes, 197 permanent redirect checks, 486 local asset HTTP checks and branded HTTP 404/noindex checks. All 127 routes passed a 390px browser sweep; six representative routes also passed at 1280px. Checks covered document overflow and failed loaded images, not every scrolled section or real-device behavior. All 83 article schemas passed syntax and key-property consistency checks. Legal/privacy files remain byte-for-byte unchanged. See the current launch checklist for test limits and remaining dependencies.

These results apply to Vercel. Repeat acceptance on the destination hosting. Forms/backend delivery, production analytics, final DNS, public credentials, real-device testing and measured Core Web Vitals remain launch dependencies. Refer to `PRODUCTION-LAUNCH-CHECKLIST.md` for the full working list.

## Technical references

- [Nginx try_files and core directives](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)
- [Apache redirecting and remapping](https://httpd.apache.org/docs/2.4/rewrite/remapping.html)
- [Google: noindex and crawl accessibility](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

## Appendix A — exact page route manifest

Internal mappings, not external redirects. Regenerate from the selected release's `vercel.json` if it changes.

| Public path | Repository file |
|---|---|
| `/sg/managed-dark-fibre-dwdm-singapore/` | `managed-dark-fibre-dwdm-singapore.html` |
| `/sg/` | `index.html` |
| `/sg/ip-transit-singapore/` | `ip-transit-singapore.html` |
| `/sg/dedicated-internet-access-singapore/` | `dedicated-internet-access-singapore.html` |
| `/sg/leased-line-singapore/` | `leased-line-singapore.html` |
| `/sg/network-coverage-singapore/` | `network-coverage-singapore.html` |
| `/sg/cisco-network-solutions/` | `cisco-network-solutions.html` |
| `/sg/multiple-services-connectivity-singapore/` | `multiple-services-connectivity-singapore.html` |
| `/sg/cisco-duo-singapore/` | `cisco-duo-singapore.html` |
| `/sg/sip-trunking/` | `sip-trunking.html` |
| `/sg/managed-cloud-pbx-singapore/` | `managed-cloud-pbx-singapore.html` |
| `/sg/teams-calling/` | `teams-calling.html` |
| `/sg/webex-calling/` | `webex-calling.html` |
| `/sg/ddos-protection/` | `ddos-protection.html` |
| `/sg/data-center-interconnect-singapore/` | `data-center-interconnect-singapore.html` |
| `/sg/managed-services-singapore/` | `managed-services-singapore.html` |
| `/sg/managed-sd-wan-singapore/` | `managed-sd-wan-singapore.html` |
| `/sg/global-sd-wan-coverage/` | `global-sd-wan-coverage.html` |
| `/sg/managed-cdn-singapore/` | `managed-cdn-singapore.html` |
| `/sg/colocation/` | `colocation.html` |
| `/sg/about/` | `about.html` |
| `/sg/partners/` | `partners.html` |
| `/sg/contact-us/` | `contact-us.html` |
| `/sg/resources/blog/` | `blog.html` |
| `/sg/resources/insights/` | `insights.html` |
| `/sg/resources/insights/singapore-to-china-high-latency/` | `article-singapore-to-china-high-latency.html` |
| `/sg/resources/insights/singapore-sao-paulo-latency/` | `article-singapore-sao-paulo-latency.html` |
| `/sg/resources/insights/internet-service-provider-singapore/` | `article-internet-service-provider-singapore.html` |
| `/sg/resources/blog/beyond-singapores-borders-how-axclusives-international-network-delivers-true-end-to-end-connectivity/` | `article-beyond-singapores-borders-how-axclusives-international-network-delivers-true-end-to-end-connectivity.html` |
| `/sg/resources/blog/what-is-sip-trunking/` | `article-what-is-sip-trunking.html` |
| `/sg/resources/blog/break-the-speed-barrier-next-gen-high-speed-building-to-building-connectivity-in-singapore/` | `article-break-the-speed-barrier-next-gen-high-speed-building-to-building-connectivity-in-singapore.html` |
| `/sg/resources/blog/what-is-last-mile-connectivity/` | `article-what-is-last-mile-connectivity.html` |
| `/sg/resources/blog/how-internet-works/` | `article-how-internet-works.html` |
| `/sg/resources/blog/choosing-the-best-outgoing-path-for-your-internet-connection/` | `article-choosing-the-best-outgoing-path-for-your-internet-connection.html` |
| `/sg/resources/blog/demystifying-internet-in-singapore-5-myths-every-business-should-know/` | `article-demystifying-internet-in-singapore-5-myths-every-business-should-know.html` |
| `/sg/resources/blog/cloudflare-axclusive/` | `article-cloudflare-axclusive.html` |
| `/sg/resources/blog/cisco-duo-axclusive/` | `article-cisco-duo-axclusive.html` |
| `/sg/resources/blog/are-you-in-equinix-sg-1-and-global-switch-singapore-heres-the-best-way-to-interconnect-your-network/` | `article-are-you-in-equinix-sg-1-and-global-switch-singapore-heres-the-best-way-to-interconnect-your-network.html` |
| `/sg/resources/blog/why-is-your-international-internet-connectivity-slow/` | `article-why-is-your-international-internet-connectivity-slow.html` |
| `/sg/resources/blog/tcp-vs-udp/` | `article-tcp-vs-udp.html` |
| `/sg/resources/blog/voip-vs-landline/` | `article-voip-vs-landline.html` |
| `/sg/resources/blog/pri-and-sip-trunking/` | `article-pri-and-sip-trunking.html` |
| `/sg/resources/blog/what-is-broadband-internet/` | `article-what-is-broadband-internet.html` |
| `/sg/resources/blog/what-is-cold-potato-routing/` | `article-what-is-cold-potato-routing.html` |
| `/sg/resources/blog/what-is-satellite-internet/` | `article-what-is-satellite-internet.html` |
| `/sg/resources/blog/pbx-vs-voip/` | `article-pbx-vs-voip.html` |
| `/sg/resources/blog/cisco-equipment-axclusive/` | `article-cisco-equipment-axclusive.html` |
| `/sg/resources/blog/cloudflare-magic-transit/` | `article-cloudflare-magic-transit.html` |
| `/sg/resources/blog/voip-call-quality/` | `article-voip-call-quality.html` |
| `/sg/resources/blog/what-is-tcp/` | `article-what-is-tcp.html` |
| `/sg/resources/blog/what-is-bandwidth-throttling/` | `article-what-is-bandwidth-throttling.html` |
| `/sg/resources/blog/what-is-network-jitter/` | `article-what-is-network-jitter.html` |
| `/sg/resources/blog/what-is-packet-in-networking/` | `article-what-is-packet-in-networking.html` |
| `/sg/resources/blog/what-is-internet-protocol/` | `article-what-is-internet-protocol.html` |
| `/sg/resources/blog/what-is-an-extranet/` | `article-what-is-an-extranet.html` |
| `/sg/resources/blog/what-is-cable-internet/` | `article-what-is-cable-internet.html` |
| `/sg/resources/blog/what-is-load-balancing/` | `article-what-is-load-balancing.html` |
| `/sg/resources/blog/sip-trunking-vs-voip/` | `article-sip-trunking-vs-voip.html` |
| `/sg/resources/blog/internet-backbone/` | `article-internet-backbone.html` |
| `/sg/resources/blog/what-is-network-layer/` | `article-what-is-network-layer.html` |
| `/sg/resources/blog/how-does-a-router-work/` | `article-how-does-a-router-work.html` |
| `/sg/resources/blog/network-attack/` | `article-network-attack.html` |
| `/sg/resources/blog/what-is-overlay-network/` | `article-what-is-overlay-network.html` |
| `/sg/resources/blog/hub-and-spoke-network/` | `article-hub-and-spoke-network.html` |
| `/sg/resources/blog/cwdm-vs-dwdm/` | `article-cwdm-vs-dwdm.html` |
| `/sg/resources/blog/voip-vs-ucaas/` | `article-voip-vs-ucaas.html` |
| `/sg/resources/blog/sd-wan-vs-mpls/` | `article-sd-wan-vs-mpls.html` |
| `/sg/resources/blog/dark-fiber-vs-lit-fiber/` | `article-dark-fiber-vs-lit-fiber.html` |
| `/sg/resources/blog/local-internet-breakout/` | `article-local-internet-breakout.html` |
| `/sg/resources/blog/400g-dwdm/` | `article-400g-dwdm.html` |
| `/sg/resources/blog/what-is-an-ethernet-switch/` | `article-what-is-an-ethernet-switch.html` |
| `/sg/resources/blog/what-is-a-ddos-attack/` | `article-what-is-a-ddos-attack.html` |
| `/sg/resources/blog/dos-vs-ddos-attacks/` | `article-dos-vs-ddos-attacks.html` |
| `/sg/resources/blog/http-flood-ddos-attack/` | `article-http-flood-ddos-attack.html` |
| `/sg/resources/blog/user-datagram-protocol/` | `article-user-datagram-protocol.html` |
| `/sg/resources/blog/what-is-ddos-protection/` | `article-what-is-ddos-protection.html` |
| `/sg/resources/blog/how-to-prevent-ddos-attack/` | `article-how-to-prevent-ddos-attack.html` |
| `/sg/resources/blog/cloudflare-magic-transit-ddos-protection/` | `article-cloudflare-magic-transit-ddos-protection.html` |
| `/sg/resources/blog/cloudflare-and-fastnetmon-ddos-protection/` | `article-cloudflare-and-fastnetmon-ddos-protection.html` |
| `/sg/resources/blog/what-is-blackhole-routing/` | `article-what-is-blackhole-routing.html` |
| `/sg/resources/blog/what-is-redundant-routing/` | `article-what-is-redundant-routing.html` |
| `/sg/resources/blog/what-is-packet-loss/` | `article-what-is-packet-loss.html` |
| `/sg/resources/blog/internet-exchange-point/` | `article-internet-exchange-point.html` |
| `/sg/resources/blog/how-cdn-providers-are-changing-internet-behavior/` | `article-how-cdn-providers-are-changing-internet-behavior.html` |
| `/sg/resources/blog/how-axclusive-helps-korean-companies-improve-global-connectivity/` | `article-how-axclusive-helps-korean-companies-improve-global-connectivity.html` |
| `/sg/resources/blog/what-is-wdm/` | `article-what-is-wdm.html` |
| `/sg/resources/blog/coherent-dwdm/` | `article-coherent-dwdm.html` |
| `/sg/resources/blog/what-is-vxlan/` | `article-what-is-vxlan.html` |
| `/sg/resources/blog/ai-infrastructure-for-model-training/` | `article-ai-infrastructure-for-model-training.html` |
| `/sg/resources/blog/ai-training-vs-ai-inferencing-network-infrastructure/` | `article-ai-training-vs-ai-inferencing-network-infrastructure.html` |
| `/sg/resources/blog/what-is-hosted-voip/` | `article-what-is-hosted-voip.html` |
| `/sg/resources/blog/voip-bandwidth/` | `article-voip-bandwidth.html` |
| `/sg/resources/blog/what-is-low-latency/` | `article-what-is-low-latency.html` |
| `/sg/resources/blog/what-is-dwdm/` | `article-what-is-dwdm.html` |
| `/sg/resources/blog/what-is-peering/` | `article-what-is-peering.html` |
| `/sg/resources/blog/what-is-bgp/` | `article-what-is-bgp.html` |
| `/sg/resources/blog/what-is-mpls/` | `article-what-is-mpls.html` |
| `/sg/resources/blog/what-is-session-border-controller/` | `article-what-is-session-border-controller.html` |
| `/sg/resources/blog/ddos-mitigation/` | `article-ddos-mitigation.html` |
| `/sg/resources/blog/rtt-in-networking/` | `article-rtt-in-networking.html` |
| `/sg/it-products-licensing-singapore/` | `it-products-licensing-singapore.html` |
| `/sg/fortinet-solutions-singapore/` | `fortinet-solutions-singapore.html` |
| `/sg/palo-alto-networks-singapore/` | `palo-alto-networks-singapore.html` |
| `/sg/microsoft-365-singapore/` | `microsoft-365-singapore.html` |
| `/sg/carriers-isps/` | `carriers-isps.html` |
| `/sg/hosting-cloud-providers/` | `hosting-cloud-providers.html` |
| `/sg/businesses-enterprises/` | `businesses-enterprises.html` |
| `/sg/international-private-line-iplc-iepl/` | `international-private-line-iplc-iepl.html` |
| `/sg/cloud-connectivity-singapore/` | `cloud-connectivity-singapore.html` |
| `/sg/privacy-policy/` | `privacy-policy.html` |
| `/sg/general-terms-of-use/` | `general-terms-of-use.html` |
| `/sg/sip-trunk-pricing-estimator/` | `sip-trunk-pricing-estimator.html` |
| `/sg/backup-recovery-singapore/` | `backup-recovery-singapore.html` |
| `/sg/odoo-erp-crm-singapore/` | `odoo-erp-crm-singapore.html` |
| `/sg/enterprise-workflow-solutions-singapore/` | `enterprise-workflow-solutions-singapore.html` |
| `/sg/application-development-singapore/` | `application-development-singapore.html` |
| `/sg/huawei-networking-singapore/` | `huawei-networking-singapore.html` |
| `/sg/tenable-licensing-singapore/` | `tenable-licensing-singapore.html` |
| `/sg/homepage-blue-preview/` | `homepage-blue-preview.html` |
| `/sg/resources/blog/private-connectivity-comparison/` | `article-private-connectivity-comparison.html` |
| `/sg/resources/blog/office-phone-systems-singapore/` | `article-office-phone-systems-singapore.html` |
| `/sg/resources/blog/data-centre-connectivity-checklist/` | `article-data-centre-connectivity-checklist.html` |
| `/sg/resources/blog/cisco-licensing-renewals-checklist/` | `article-cisco-licensing-renewals-checklist.html` |
| `/sg/resources/blog/3cx-alternative-singapore/` | `article-3cx-alternative-singapore.html` |
| `/sg/resources/blog/rto-vs-rpo/` | `article-rto-vs-rpo.html` |
| `/sg/resources/blog/microsoft-365-backup-singapore/` | `article-microsoft-365-backup-singapore.html` |
| `/sg/resources/blog/immutable-backup/` | `article-immutable-backup.html` |

## Appendix B — permanent redirect manifest

Preserve these explicit destinations; apply the conditional partner rule separately as described above.

| Old path | Destination |
|---|---|
| `/` | `/sg/` |
| `/beyond-singapores-borders-how-axclusives-international-network-delivers-true-end-to-end-connectivity/` | `/sg/resources/blog/beyond-singapores-borders-how-axclusives-international-network-delivers-true-end-to-end-connectivity/` |
| `/sg/beyond-singapores-borders-how-axclusives-international-network-delivers-true-end-to-end-connectivity/` | `/sg/resources/blog/beyond-singapores-borders-how-axclusives-international-network-delivers-true-end-to-end-connectivity/` |
| `/what-is-sip-trunking/` | `/sg/resources/blog/what-is-sip-trunking/` |
| `/sg/what-is-sip-trunking/` | `/sg/resources/blog/what-is-sip-trunking/` |
| `/break-the-speed-barrier-next-gen-high-speed-building-to-building-connectivity-in-singapore/` | `/sg/resources/blog/break-the-speed-barrier-next-gen-high-speed-building-to-building-connectivity-in-singapore/` |
| `/sg/break-the-speed-barrier-next-gen-high-speed-building-to-building-connectivity-in-singapore/` | `/sg/resources/blog/break-the-speed-barrier-next-gen-high-speed-building-to-building-connectivity-in-singapore/` |
| `/what-is-last-mile-connectivity/` | `/sg/resources/blog/what-is-last-mile-connectivity/` |
| `/sg/what-is-last-mile-connectivity/` | `/sg/resources/blog/what-is-last-mile-connectivity/` |
| `/how-internet-works/` | `/sg/resources/blog/how-internet-works/` |
| `/sg/how-internet-works/` | `/sg/resources/blog/how-internet-works/` |
| `/choosing-the-best-outgoing-path-for-your-internet-connection/` | `/sg/resources/blog/choosing-the-best-outgoing-path-for-your-internet-connection/` |
| `/sg/choosing-the-best-outgoing-path-for-your-internet-connection/` | `/sg/resources/blog/choosing-the-best-outgoing-path-for-your-internet-connection/` |
| `/demystifying-internet-in-singapore-5-myths-every-business-should-know/` | `/sg/resources/blog/demystifying-internet-in-singapore-5-myths-every-business-should-know/` |
| `/sg/demystifying-internet-in-singapore-5-myths-every-business-should-know/` | `/sg/resources/blog/demystifying-internet-in-singapore-5-myths-every-business-should-know/` |
| `/cloudflare-axclusive/` | `/sg/resources/blog/cloudflare-axclusive/` |
| `/sg/cloudflare-axclusive/` | `/sg/resources/blog/cloudflare-axclusive/` |
| `/cisco-duo-axclusive/` | `/sg/resources/blog/cisco-duo-axclusive/` |
| `/sg/cisco-duo-axclusive/` | `/sg/resources/blog/cisco-duo-axclusive/` |
| `/are-you-in-equinix-sg-1-and-global-switch-singapore-heres-the-best-way-to-interconnect-your-network/` | `/sg/resources/blog/are-you-in-equinix-sg-1-and-global-switch-singapore-heres-the-best-way-to-interconnect-your-network/` |
| `/sg/are-you-in-equinix-sg-1-and-global-switch-singapore-heres-the-best-way-to-interconnect-your-network/` | `/sg/resources/blog/are-you-in-equinix-sg-1-and-global-switch-singapore-heres-the-best-way-to-interconnect-your-network/` |
| `/why-is-your-international-internet-connectivity-slow/` | `/sg/resources/blog/why-is-your-international-internet-connectivity-slow/` |
| `/sg/why-is-your-international-internet-connectivity-slow/` | `/sg/resources/blog/why-is-your-international-internet-connectivity-slow/` |
| `/tcp-vs-udp/` | `/sg/resources/blog/tcp-vs-udp/` |
| `/sg/tcp-vs-udp/` | `/sg/resources/blog/tcp-vs-udp/` |
| `/voip-vs-landline/` | `/sg/resources/blog/voip-vs-landline/` |
| `/sg/voip-vs-landline/` | `/sg/resources/blog/voip-vs-landline/` |
| `/pri-and-sip-trunking/` | `/sg/resources/blog/pri-and-sip-trunking/` |
| `/sg/pri-and-sip-trunking/` | `/sg/resources/blog/pri-and-sip-trunking/` |
| `/what-is-broadband-internet/` | `/sg/resources/blog/what-is-broadband-internet/` |
| `/sg/what-is-broadband-internet/` | `/sg/resources/blog/what-is-broadband-internet/` |
| `/what-is-cold-potato-routing/` | `/sg/resources/blog/what-is-cold-potato-routing/` |
| `/sg/what-is-cold-potato-routing/` | `/sg/resources/blog/what-is-cold-potato-routing/` |
| `/what-is-satellite-internet/` | `/sg/resources/blog/what-is-satellite-internet/` |
| `/sg/what-is-satellite-internet/` | `/sg/resources/blog/what-is-satellite-internet/` |
| `/pbx-vs-voip/` | `/sg/resources/blog/pbx-vs-voip/` |
| `/sg/pbx-vs-voip/` | `/sg/resources/blog/pbx-vs-voip/` |
| `/cisco-equipment-axclusive/` | `/sg/resources/blog/cisco-equipment-axclusive/` |
| `/sg/cisco-equipment-axclusive/` | `/sg/resources/blog/cisco-equipment-axclusive/` |
| `/cloudflare-magic-transit/` | `/sg/resources/blog/cloudflare-magic-transit/` |
| `/sg/cloudflare-magic-transit/` | `/sg/resources/blog/cloudflare-magic-transit/` |
| `/voip-call-quality/` | `/sg/resources/blog/voip-call-quality/` |
| `/sg/voip-call-quality/` | `/sg/resources/blog/voip-call-quality/` |
| `/what-is-tcp/` | `/sg/resources/blog/what-is-tcp/` |
| `/sg/what-is-tcp/` | `/sg/resources/blog/what-is-tcp/` |
| `/what-is-bandwidth-throttling/` | `/sg/resources/blog/what-is-bandwidth-throttling/` |
| `/sg/what-is-bandwidth-throttling/` | `/sg/resources/blog/what-is-bandwidth-throttling/` |
| `/what-is-network-jitter/` | `/sg/resources/blog/what-is-network-jitter/` |
| `/sg/what-is-network-jitter/` | `/sg/resources/blog/what-is-network-jitter/` |
| `/what-is-packet-in-networking/` | `/sg/resources/blog/what-is-packet-in-networking/` |
| `/sg/what-is-packet-in-networking/` | `/sg/resources/blog/what-is-packet-in-networking/` |
| `/what-is-internet-protocol/` | `/sg/resources/blog/what-is-internet-protocol/` |
| `/sg/what-is-internet-protocol/` | `/sg/resources/blog/what-is-internet-protocol/` |
| `/what-is-an-extranet/` | `/sg/resources/blog/what-is-an-extranet/` |
| `/sg/what-is-an-extranet/` | `/sg/resources/blog/what-is-an-extranet/` |
| `/what-is-cable-internet/` | `/sg/resources/blog/what-is-cable-internet/` |
| `/sg/what-is-cable-internet/` | `/sg/resources/blog/what-is-cable-internet/` |
| `/what-is-load-balancing/` | `/sg/resources/blog/what-is-load-balancing/` |
| `/sg/what-is-load-balancing/` | `/sg/resources/blog/what-is-load-balancing/` |
| `/sip-trunking-vs-voip/` | `/sg/resources/blog/sip-trunking-vs-voip/` |
| `/sg/sip-trunking-vs-voip/` | `/sg/resources/blog/sip-trunking-vs-voip/` |
| `/internet-backbone/` | `/sg/resources/blog/internet-backbone/` |
| `/sg/internet-backbone/` | `/sg/resources/blog/internet-backbone/` |
| `/what-is-network-layer/` | `/sg/resources/blog/what-is-network-layer/` |
| `/sg/what-is-network-layer/` | `/sg/resources/blog/what-is-network-layer/` |
| `/how-does-a-router-work/` | `/sg/resources/blog/how-does-a-router-work/` |
| `/sg/how-does-a-router-work/` | `/sg/resources/blog/how-does-a-router-work/` |
| `/network-attack/` | `/sg/resources/blog/network-attack/` |
| `/sg/network-attack/` | `/sg/resources/blog/network-attack/` |
| `/what-is-overlay-network/` | `/sg/resources/blog/what-is-overlay-network/` |
| `/sg/what-is-overlay-network/` | `/sg/resources/blog/what-is-overlay-network/` |
| `/hub-and-spoke-network/` | `/sg/resources/blog/hub-and-spoke-network/` |
| `/sg/hub-and-spoke-network/` | `/sg/resources/blog/hub-and-spoke-network/` |
| `/cwdm-vs-dwdm/` | `/sg/resources/blog/cwdm-vs-dwdm/` |
| `/sg/cwdm-vs-dwdm/` | `/sg/resources/blog/cwdm-vs-dwdm/` |
| `/voip-vs-ucaas/` | `/sg/resources/blog/voip-vs-ucaas/` |
| `/sg/voip-vs-ucaas/` | `/sg/resources/blog/voip-vs-ucaas/` |
| `/sd-wan-vs-mpls/` | `/sg/resources/blog/sd-wan-vs-mpls/` |
| `/sg/sd-wan-vs-mpls/` | `/sg/resources/blog/sd-wan-vs-mpls/` |
| `/dark-fiber-vs-lit-fiber/` | `/sg/resources/blog/dark-fiber-vs-lit-fiber/` |
| `/sg/dark-fiber-vs-lit-fiber/` | `/sg/resources/blog/dark-fiber-vs-lit-fiber/` |
| `/local-internet-breakout/` | `/sg/resources/blog/local-internet-breakout/` |
| `/sg/local-internet-breakout/` | `/sg/resources/blog/local-internet-breakout/` |
| `/400g-dwdm/` | `/sg/resources/blog/400g-dwdm/` |
| `/sg/400g-dwdm/` | `/sg/resources/blog/400g-dwdm/` |
| `/what-is-an-ethernet-switch/` | `/sg/resources/blog/what-is-an-ethernet-switch/` |
| `/sg/what-is-an-ethernet-switch/` | `/sg/resources/blog/what-is-an-ethernet-switch/` |
| `/what-is-a-ddos-attack/` | `/sg/resources/blog/what-is-a-ddos-attack/` |
| `/sg/what-is-a-ddos-attack/` | `/sg/resources/blog/what-is-a-ddos-attack/` |
| `/dos-vs-ddos-attacks/` | `/sg/resources/blog/dos-vs-ddos-attacks/` |
| `/sg/dos-vs-ddos-attacks/` | `/sg/resources/blog/dos-vs-ddos-attacks/` |
| `/http-flood-ddos-attack/` | `/sg/resources/blog/http-flood-ddos-attack/` |
| `/sg/http-flood-ddos-attack/` | `/sg/resources/blog/http-flood-ddos-attack/` |
| `/user-datagram-protocol/` | `/sg/resources/blog/user-datagram-protocol/` |
| `/sg/user-datagram-protocol/` | `/sg/resources/blog/user-datagram-protocol/` |
| `/what-is-ddos-protection/` | `/sg/resources/blog/what-is-ddos-protection/` |
| `/sg/what-is-ddos-protection/` | `/sg/resources/blog/what-is-ddos-protection/` |
| `/how-to-prevent-ddos-attack/` | `/sg/resources/blog/how-to-prevent-ddos-attack/` |
| `/sg/how-to-prevent-ddos-attack/` | `/sg/resources/blog/how-to-prevent-ddos-attack/` |
| `/cloudflare-magic-transit-ddos-protection/` | `/sg/resources/blog/cloudflare-magic-transit-ddos-protection/` |
| `/sg/cloudflare-magic-transit-ddos-protection/` | `/sg/resources/blog/cloudflare-magic-transit-ddos-protection/` |
| `/cloudflare-and-fastnetmon-ddos-protection/` | `/sg/resources/blog/cloudflare-and-fastnetmon-ddos-protection/` |
| `/sg/cloudflare-and-fastnetmon-ddos-protection/` | `/sg/resources/blog/cloudflare-and-fastnetmon-ddos-protection/` |
| `/what-is-blackhole-routing/` | `/sg/resources/blog/what-is-blackhole-routing/` |
| `/sg/what-is-blackhole-routing/` | `/sg/resources/blog/what-is-blackhole-routing/` |
| `/what-is-redundant-routing/` | `/sg/resources/blog/what-is-redundant-routing/` |
| `/sg/what-is-redundant-routing/` | `/sg/resources/blog/what-is-redundant-routing/` |
| `/what-is-packet-loss/` | `/sg/resources/blog/what-is-packet-loss/` |
| `/sg/what-is-packet-loss/` | `/sg/resources/blog/what-is-packet-loss/` |
| `/internet-exchange-point/` | `/sg/resources/blog/internet-exchange-point/` |
| `/sg/internet-exchange-point/` | `/sg/resources/blog/internet-exchange-point/` |
| `/how-cdn-providers-are-changing-internet-behavior/` | `/sg/resources/blog/how-cdn-providers-are-changing-internet-behavior/` |
| `/sg/how-cdn-providers-are-changing-internet-behavior/` | `/sg/resources/blog/how-cdn-providers-are-changing-internet-behavior/` |
| `/how-axclusive-helps-korean-companies-improve-global-connectivity/` | `/sg/resources/blog/how-axclusive-helps-korean-companies-improve-global-connectivity/` |
| `/sg/how-axclusive-helps-korean-companies-improve-global-connectivity/` | `/sg/resources/blog/how-axclusive-helps-korean-companies-improve-global-connectivity/` |
| `/what-is-wdm/` | `/sg/resources/blog/what-is-wdm/` |
| `/sg/what-is-wdm/` | `/sg/resources/blog/what-is-wdm/` |
| `/coherent-dwdm/` | `/sg/resources/blog/coherent-dwdm/` |
| `/sg/coherent-dwdm/` | `/sg/resources/blog/coherent-dwdm/` |
| `/what-is-vxlan/` | `/sg/resources/blog/what-is-vxlan/` |
| `/sg/what-is-vxlan/` | `/sg/resources/blog/what-is-vxlan/` |
| `/ai-infrastructure-for-model-training/` | `/sg/resources/blog/ai-infrastructure-for-model-training/` |
| `/sg/ai-infrastructure-for-model-training/` | `/sg/resources/blog/ai-infrastructure-for-model-training/` |
| `/ai-training-vs-ai-inferencing-network-infrastructure/` | `/sg/resources/blog/ai-training-vs-ai-inferencing-network-infrastructure/` |
| `/sg/ai-training-vs-ai-inferencing-network-infrastructure/` | `/sg/resources/blog/ai-training-vs-ai-inferencing-network-infrastructure/` |
| `/what-is-hosted-voip/` | `/sg/resources/blog/what-is-hosted-voip/` |
| `/sg/what-is-hosted-voip/` | `/sg/resources/blog/what-is-hosted-voip/` |
| `/voip-bandwidth/` | `/sg/resources/blog/voip-bandwidth/` |
| `/sg/voip-bandwidth/` | `/sg/resources/blog/voip-bandwidth/` |
| `/what-is-low-latency/` | `/sg/resources/blog/what-is-low-latency/` |
| `/sg/what-is-low-latency/` | `/sg/resources/blog/what-is-low-latency/` |
| `/what-is-dwdm/` | `/sg/resources/blog/what-is-dwdm/` |
| `/sg/what-is-dwdm/` | `/sg/resources/blog/what-is-dwdm/` |
| `/what-is-peering/` | `/sg/resources/blog/what-is-peering/` |
| `/sg/what-is-peering/` | `/sg/resources/blog/what-is-peering/` |
| `/what-is-bgp/` | `/sg/resources/blog/what-is-bgp/` |
| `/sg/what-is-bgp/` | `/sg/resources/blog/what-is-bgp/` |
| `/what-is-mpls/` | `/sg/resources/blog/what-is-mpls/` |
| `/sg/what-is-mpls/` | `/sg/resources/blog/what-is-mpls/` |
| `/what-is-session-border-controller/` | `/sg/resources/blog/what-is-session-border-controller/` |
| `/sg/what-is-session-border-controller/` | `/sg/resources/blog/what-is-session-border-controller/` |
| `/ddos-mitigation/` | `/sg/resources/blog/ddos-mitigation/` |
| `/sg/ddos-mitigation/` | `/sg/resources/blog/ddos-mitigation/` |
| `/rtt-in-networking/` | `/sg/resources/blog/rtt-in-networking/` |
| `/sg/rtt-in-networking/` | `/sg/resources/blog/rtt-in-networking/` |
| `/private-connectivity-comparison/` | `/sg/resources/blog/private-connectivity-comparison/` |
| `/sg/private-connectivity-comparison/` | `/sg/resources/blog/private-connectivity-comparison/` |
| `/office-phone-systems-singapore/` | `/sg/resources/blog/office-phone-systems-singapore/` |
| `/sg/office-phone-systems-singapore/` | `/sg/resources/blog/office-phone-systems-singapore/` |
| `/data-centre-connectivity-checklist/` | `/sg/resources/blog/data-centre-connectivity-checklist/` |
| `/sg/data-centre-connectivity-checklist/` | `/sg/resources/blog/data-centre-connectivity-checklist/` |
| `/cisco-licensing-renewals-checklist/` | `/sg/resources/blog/cisco-licensing-renewals-checklist/` |
| `/sg/cisco-licensing-renewals-checklist/` | `/sg/resources/blog/cisco-licensing-renewals-checklist/` |
| `/3cx-alternative-singapore/` | `/sg/resources/blog/3cx-alternative-singapore/` |
| `/sg/3cx-alternative-singapore/` | `/sg/resources/blog/3cx-alternative-singapore/` |
| `/rto-vs-rpo/` | `/sg/resources/blog/rto-vs-rpo/` |
| `/sg/rto-vs-rpo/` | `/sg/resources/blog/rto-vs-rpo/` |
| `/microsoft-365-backup-singapore/` | `/sg/resources/blog/microsoft-365-backup-singapore/` |
| `/sg/microsoft-365-backup-singapore/` | `/sg/resources/blog/microsoft-365-backup-singapore/` |
| `/immutable-backup/` | `/sg/resources/blog/immutable-backup/` |
| `/sg/immutable-backup/` | `/sg/resources/blog/immutable-backup/` |
| `/sg/resources/` | `/sg/resources/blog/` |
| `/SG/About/` | `/sg/about/` |
| `/favicon.ico` | `/favicon.svg` |
| `/about/` | `/sg/about/` |
| `/application-development-singapore/` | `/sg/application-development-singapore/` |
| `/contact-us/` | `/sg/contact-us/` |
| `/data-center-interconnect-singapore/` | `/sg/data-center-interconnect-singapore/` |
| `/dedicated-internet-access-singapore/` | `/sg/dedicated-internet-access-singapore/` |
| `/ip-transit-singapore/` | `/sg/ip-transit-singapore/` |
| `/leased-line-singapore/` | `/sg/leased-line-singapore/` |
| `/managed-cdn-singapore/` | `/sg/managed-cdn-singapore/` |
| `/managed-services-singapore/` | `/sg/managed-services-singapore/` |
| `/multiple-services-connectivity-singapore/` | `/sg/multiple-services-connectivity-singapore/` |
| `/privacy-policy/` | `/sg/privacy-policy/` |
| `/general-terms-of-use/` | `/sg/general-terms-of-use/` |
| `/sip-trunking/` | `/sg/sip-trunking/` |
| `/teams-calling/` | `/sg/teams-calling/` |
| `/webex-calling/` | `/sg/webex-calling/` |
| `/ddos-protection/` | `/sg/ddos-protection/` |
| `/blog/` | `/sg/resources/blog/` |
| `/sg/blog/` | `/sg/resources/blog/` |
| `/partner/` | `/sg/partners/` |
| `/sg/partner/` | `/sg/partners/` |
| `/become-a-partner/` | `/sg/become-a-partner/` |
| `/high-speed-building-connectivity-singapore/` | `/sg/leased-line-singapore/` |
| `/services/dia-dedicated-internet-access/` | `/sg/dedicated-internet-access-singapore/` |
| `/services/ip-transit/` | `/sg/ip-transit-singapore/` |
| `/services/leased-line/` | `/sg/leased-line-singapore/` |
| `/services/dc-interconnect/` | `/sg/data-center-interconnect-singapore/` |
| `/services/managed-services/` | `/sg/managed-services-singapore/` |
| `/services/multiple-services-connectivity/` | `/sg/multiple-services-connectivity-singapore/` |
| `/sg/sg/` | `/sg/` |
| `/seamless-interconnection-between-equinix-sg1-and-global-switch-wavelength-based-reliable-and-scalable/` | `/sg/resources/blog/are-you-in-equinix-sg-1-and-global-switch-singapore-heres-the-best-way-to-interconnect-your-network/` |
| `/are-you-in-equinix-sg-1-and-global-switch-singapore-here-s-the-best-way-to-interconnect-your-network/` | `/sg/resources/blog/are-you-in-equinix-sg-1-and-global-switch-singapore-heres-the-best-way-to-interconnect-your-network/` |
| `/demythifying-singapores-connectivity-landscape/` | `/sg/resources/blog/demystifying-internet-in-singapore-5-myths-every-business-should-know/` |
| `/what-is-an-ethernet-Switch/` | `/sg/resources/blog/what-is-an-ethernet-switch/` |
