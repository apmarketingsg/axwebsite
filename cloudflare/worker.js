// Runs only when no static file or _redirects rule matches the request.
const PRODUCTION_HOSTS = new Set(["axclusive.com", "www.axclusive.com"]);
const ROBOTS = "noindex, nofollow"; // preview safety; remove at approved launch

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Partner application still lives on the current production backend.
    // Redirect only off-production, otherwise it would loop on axclusive.com.
    if (url.pathname === "/sg/become-a-partner/" && !PRODUCTION_HOSTS.has(url.hostname)) {
      return new Response(null, {
        status: 307,
        headers: { Location: "https://axclusive.com/sg/become-a-partner/", "X-Robots-Tag": ROBOTS },
      });
    }

    const page = await env.ASSETS.fetch(new URL("/404.html", url));
    const headers = new Headers(page.headers);
    headers.set("X-Robots-Tag", ROBOTS);
    return new Response(page.body, { status: 404, headers });
  },
};
