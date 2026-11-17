# Hosting on Cloudflare Workers (static assets)

The site is served as static files by a Cloudflare Worker. No build step.

## Files

- `wrangler.jsonc`: Worker config. Serves the repo root as static assets.
- `_redirects`: all 197 redirects, 127 clean-URL mappings and trailing-slash redirects. Generated from `vercel.json` by `cloudflare/build-redirects.py`.
- `_headers`: preview `X-Robots-Tag: noindex, nofollow` on every response.
- `cloudflare/worker.js`: runs only when no file or rule matches. Handles the host-conditional partner redirect and serves `404.html` with a 404 status.
- `.assetsignore`: keeps `.md` files, `vercel.json` and config out of the public site.

## Connect the GitHub repo (recommended)

1. Cloudflare dashboard > Workers & Pages > Create > Import a repository.
2. Pick `apmarketingsg/axwebsite` and the production branch.
3. Build command: leave empty. Deploy command: `npx wrangler deploy`.
4. Every push to the branch then deploys automatically; other branches get preview URLs.

## Deploy by hand

    npx wrangler login
    npx wrangler deploy

## Changing routes

Edit `vercel.json` (still the source of truth), then run `python3 cloudflare/build-redirects.py` and commit both files. Once Vercel is switched off, `_redirects` can become the source of truth instead.

## At production launch

Remove the noindex blocks together: `_headers`, the `ROBOTS` header in `cloudflare/worker.js`, the HTML meta tags and `robots.txt`. Then add the custom domain under the Worker's Settings > Domains & Routes.
