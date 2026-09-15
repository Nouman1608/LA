/**
 * Progressive enhancement for the lead form.
 * Without JS the form natively POSTs to /api/contact, which redirects to
 * /contact/?sent=1. With JS we submit via fetch and swap in the success panel.
 */
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

/**
 * Analytics: report a genuine, completed lead submission.
 *
 * Safe by construction -- never throws if gtag is missing (script blocked,
 * ad blocker, offline). Submitting the form must never depend on analytics
 * succeeding, so every failure here is swallowed.
 *
 * Only categorical data is ever sent. The lead's name, email, phone, class
 * and message stay out of the payload entirely.
 */
const trackLeadSubmit = (source: string) => {
  try {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== 'function') return;
    gtag('event', 'lead_form_submit', { source: source || 'unspecified' });
  } catch {
    /* analytics must never break the form */
  }
};

if (form) {
  const submit = form.querySelector<HTMLButtonElement>('[data-form-submit]');
  const errorEl = form.querySelector<HTMLElement>('[data-form-error]');
  const successEl = document.querySelector<HTMLElement>('[data-form-success]');

  // No-JS redirect fallback lands on …?sent=1 — show the thank-you on load.
  // Deliberately fires no analytics event: this URL survives reload, back
  // and bookmarking, so counting it would inflate the conversion number the
  // same way the GA4 page-view rule already does. See this file's commit
  // message for the evidence.
  if (new URLSearchParams(window.location.search).get('sent') === '1' && successEl) {
    form.hidden = true;
    successEl.hidden = false;
  }

  const showError = (msg: string) => {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.hidden = false;
  };

  form.addEventListener('submit', async (e) => {
    // Honeypot tripped → silently accept without sending.
    if ((form.elements.namedItem('company') as HTMLInputElement)?.value) {
      e.preventDefault();
      return;
    }

    if (!form.checkValidity()) {
      return; // let the browser show native validation
    }

    e.preventDefault();
    if (errorEl) errorEl.hidden = true;
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Sending…';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Only reached on a real 2xx from /api/contact — i.e. Turnstile
      // passed, validation passed, and the lead email was actually sent.
      trackLeadSubmit((form.elements.namedItem('source') as HTMLInputElement)?.value ?? '');

      if (successEl) {
        form.hidden = true;
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch {
      showError('Sorry — something went wrong. Please WhatsApp or call us instead.');
      if (submit) {
        submit.disabled = false;
        submit.textContent = 'Request free trial class';
      }
    }
  });
}
