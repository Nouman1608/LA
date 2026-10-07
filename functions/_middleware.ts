/**
 * Cloudflare Pages middleware — region-aware analytics consent.
 *
 * WHY
 * The consent bar added on 16 Sep 2026 (PR #10) defaulted Google Analytics to
 * "denied" for every visitor in every country. Most visitors never click, so
 * from 17 Sep ~93% of GA4 events arrived as cookieless pings with no visitor
 * or traffic source, even though real traffic was flat (BigQuery, 21 Sep).
 * Most of our visitors are in Pakistan, where prior opt-in for first-party
 * analytics isn't required.
 *
 * WHAT
 * For HTML pages served to visitors OUTSIDE the opt-in list below, this adds
 * <html data-la-consent-region="optout">. BaseLayout.astro then runs Google
 * Analytics by default; the visitor can switch it off via "Cookie settings"
 * in the footer. Visitors in the list (EEA, UK, Switzerland) and anyone
 * whose country is unknown get the original opt-in bar, and gtag.js is not
 * loaded at all until they click Accept.
 *
 * Absent attribute == strict, so every failure mode falls back to opt-in.
 * Owner decision (22 Sep 2026): the banner is shown only in the UK and Europe;
 * the rest of the world, including the Gulf, gets analytics by default.
 * Not legal advice.
 */

const OPT_IN_COUNTRIES = new Set([
  // EU member states
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // Rest of the EEA, UK, Switzerland
  'IS', 'LI', 'NO', 'GB', 'CH',
  // Crown dependencies and EU territories Cloudflare may report separately
  'GG', 'JE', 'IM', 'GI', 'GF', 'GP', 'MQ', 'RE', 'YT', 'MF', 'AX',
]);

function consentRegionFor(country: unknown): 'optin' | 'optout' {
  if (!country || typeof country !== 'string') return 'optin';
  const cc = country.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc) || cc === 'XX' || cc === 'T1') return 'optin';
  return OPT_IN_COUNTRIES.has(cc) ? 'optin' : 'optout';
}

/**
 * WordPress leftover URLs — 404 fallback (7 Oct 2026).
 *
 * WordPress exposed /feed/, /amp/, /embed/, /page/N/ and similar children under
 * every post and page. Google still requests them and GSC "Not found (404)"
 * validation kept failing: the old `/:slug/feed/ /blog/:slug/` rule only works
 * when <slug> is a blog post (so /igcse/feed/ -> /blog/igcse/ -> 404), and
 * patching each URL in _redirects runs into the Pages rule cap.
 *
 * So when a request 404s and its path is one of these suffixes, strip the
 * suffix and 301 to the parent page if the parent resolves (directly or via
 * its own _redirects rule); otherwise 301 to /blog/ (feeds) or / (the rest).
 * Only ever touches responses that would have been 404s.
 */
const WP_SUFFIX = /^(.*?\/)(?:feed(?:\/(?:rss2?|atom|rdf))?|rss2?|atom|amp|embed|trackback|page\/?\d+|comment-page-\d+)\/?$/i;

async function wpLeftoverRedirect(
  request: Request,
  assets: { fetch: (req: Request) => Promise<Response> } | undefined,
): Promise<Response | null> {
  const url = new URL(request.url);
  const match = url.pathname.match(WP_SUFFIX);
  if (!match) return null;
  const parent = match[1];
  const isFeed = /^(?:feed|rss|atom)/i.test(url.pathname.slice(parent.length));
  let target = isFeed ? '/blog/' : '/';
  if (parent !== '/' && assets) {
    try {
      const res = await assets.fetch(new Request(new URL(parent, url.origin), { redirect: 'manual' }));
      if (res.status === 200) target = parent;
      else if (res.status >= 300 && res.status < 400) target = res.headers.get('location') || target;
    } catch {
      // keep the hub-page fallback
    }
  }
  return new Response(null, { status: 301, headers: { location: target } });
}

interface MiddlewareContext {
  request: Request & { cf?: { country?: string } };
  env: { ASSETS?: { fetch: (req: Request) => Promise<Response> } };
  next: () => Promise<Response>;
}

export const onRequest = async ({ request, env, next }: MiddlewareContext): Promise<Response> => {
  const response = await next();
  if (response.status === 404 && (request.method === 'GET' || request.method === 'HEAD')) {
    const redirect = await wpLeftoverRedirect(request, env?.ASSETS);
    if (redirect) return redirect;
  }
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('text/html')) return response;
  if (consentRegionFor(request.cf?.country) !== 'optout') return response;
  const Rewriter = (globalThis as unknown as { HTMLRewriter?: any }).HTMLRewriter;
  if (typeof Rewriter !== 'function') return response;
  return new Rewriter()
    .on('html', {
      element(el: { setAttribute(name: string, value: string): void }) {
        el.setAttribute('data-la-consent-region', 'optout');
      },
    })
    .transform(response);
};
