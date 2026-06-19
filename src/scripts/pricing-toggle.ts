/** Region pricing toggle — sets the active region; CSS reveals the prices. */
const pricing = document.querySelector<HTMLElement>('.pricing');

if (pricing) {
  const buttons = pricing.querySelectorAll<HTMLButtonElement>('[data-region-btn]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const region = btn.getAttribute('data-region-btn');
      if (!region) return;
      pricing.setAttribute('data-active-region', region);
      buttons.forEach((b) =>
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false')
      );
    });
  });
}
