/**
 * Progressive enhancement for the lead form.
 * Without JS the form natively POSTs to /api/contact, which redirects to
 * /contact/?sent=1. With JS we submit via fetch and swap in the success panel.
 */
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
  const submit = form.querySelector<HTMLButtonElement>('[data-form-submit]');
  const errorEl = form.querySelector<HTMLElement>('[data-form-error]');
  const successEl = document.querySelector<HTMLElement>('[data-form-success]');

  // No-JS redirect fallback lands on …?sent=1 — show the thank-you on load.
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
