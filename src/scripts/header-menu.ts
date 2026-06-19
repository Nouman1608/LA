/** Mobile nav toggle. Tiny, framework-free, progressive. */
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.hasAttribute('data-open');
    if (open) {
      menu.removeAttribute('data-open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      menu.setAttribute('data-open', '');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close the menu after following an in-page link.
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      menu.removeAttribute('data-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
