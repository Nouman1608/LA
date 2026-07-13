/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Deployed automatically from the `functions/` directory (independent of the
 * Astro static build). Flow:
 *   1. parse the form submission
 *   2. drop bots via the honeypot field
 *   3. verify the Cloudflare Turnstile token
 *   4. email the lead via Resend
 *   5. respond with JSON (fetch) or a 303 redirect (no-JS fallback)
 *
 * Required environment variables (set in the Pages dashboard):
 *   TURNSTILE_SECRET  - Turnstile secret key
 *   RESEND_API_KEY    - Resend API key
 *   CONTACT_TO        - destination inbox, e.g. nouman.ahmed@learnersacademy.pk
 *   CONTACT_FROM      - verified sender, e.g. "Learners Academy <web@learnersacademy.com.pk>"
 */

interface Env {
  TURNSTILE_SECRET: string;
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM: string;
}

type PagesFn = (ctx: { request: Request; env: Env }) => Promise<Response>;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
  );
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  if (!secret) return true; // not configured yet → don't block (dev/preview)
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

export const onRequestPost: PagesFn = async ({ request, env }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const form = await request.formData();

  const get = (k: string) => String(form.get(k) ?? '').trim();
  const honeypot = get('company');
  const name = get('name');
  const email = get('email');
  const phone = get('phone');
  const klass = get('class');
  const details = get('details');
  const source = get('source') || 'website';
  const redirectTo = get('redirect') || '/contact/?sent=1';
  const token = get('cf-turnstile-response');

  const redirect = () =>
    new Response(null, { status: 303, headers: { location: redirectTo } });
  const redirectFail = () =>
    new Response(null, { status: 303, headers: { location: '/contact/' } });

  // 1) Honeypot — pretend success, send nothing.
  if (honeypot) return wantsJson ? json({ ok: true }) : redirect();

  // 2) Basic validation.
  if (!name || !email || !phone || !klass || !details) {
    return wantsJson
      ? json({ ok: false, error: 'Missing required fields.' }, 400)
      : redirectFail();
  }

  // 3) Turnstile.
  const ok = await verifyTurnstile(token, env.TURNSTILE_SECRET, request.headers.get('cf-connecting-ip'));
  if (!ok) {
    return wantsJson
      ? json({ ok: false, error: 'Verification failed. Please try again.' }, 400)
      : redirectFail();
  }

  // 4) Email via Resend.
  if (env.RESEND_API_KEY && env.CONTACT_TO && env.CONTACT_FROM) {
    const html = `
      <h2>New trial request (${escapeHtml(source)})</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Class/grade:</strong> ${escapeHtml(klass) || '—'}</p>
      <p><strong>Details:</strong><br>${escapeHtml(details).replace(/\n/g, '<br>') || '—'}</p>
    `;
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: [env.CONTACT_TO],
        reply_to: email,
        subject: `Trial request — ${name}`,
        html,
      }),
    });
    if (!resp.ok) {
      const msg = await resp.text();
      return wantsJson
        ? json({ ok: false, error: 'Could not send. Please WhatsApp or call us.' }, 502)
        : new Response(`Email failed: ${msg}`, { status: 502 });
    }
  }

  // 5) Success.
  return wantsJson ? json({ ok: true }) : redirect();
};
