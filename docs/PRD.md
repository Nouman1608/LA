# PRD — Learners Academy Website Revamp

**Product:** learnersacademy.com.pk — public marketing & lead-generation website
**Owner:** Nouman Ahmed (Principal)
**Status:** v1 implemented (this repo)
**Last updated:** 2026-06-18

---

## 1. Overview & goals

Rebuild the Learners Academy website as a **static Astro site** that implements the new
Claude-Design visual direction, is **reliable by construction**, and **preserves the site's existing
SEO**.

Learners Academy is an online tutoring academy (IGCSE / O & A Level / SAT — Cambridge CAIE, Edexcel,
AQA) based in Bahria Town, Lahore, teaching students in Pakistan and internationally since 2016.

**Primary goals**

1. **Reliability** — eliminate the runtime that can silently fail (see §2).
2. **SEO preservation** — no ranking regression through the migration.
3. **Modern design** — implement the approved Claude-Design look and feel.
4. **Dev-maintainable** — content edited as Markdown/MDX in git (no CMS, dev-only).

## 2. Problem / motivation

The previous site ran on WordPress with a heavy theme and many plugins. It **silently went down for
roughly a month** before anyone noticed — a failure of both a fragile runtime (PHP/MySQL/plugins)
and the absence of monitoring. "Too many moving parts" is the explicit motivation for the rebuild.

A static site removes the runtime entirely: the deploy is just HTML/CSS/JS on a CDN. There is no
database or plugin update path to break, and a bad change **fails the build** instead of silently
breaking a live page.

## 3. Success metrics

| Metric | Target |
| --- | --- |
| Uptime | No silent downtime; uptime monitor alerts within minutes of any non-200 |
| Core Web Vitals (mobile) | LCP, CLS, INP all "Good"; Lighthouse Perf ≥ 95, SEO/Best-Practices 100 |
| SEO continuity | GSC Coverage stable; **every** old URL resolves 301 → 200; no spike in 404s |
| JS footprint | Near-zero — only the menu, pricing toggle and contact form ship JS |
| Lead capture | Contact form delivers email reliably; WhatsApp/phone/email CTAs on every page |

## 4. Scope

**In scope (v1, delivered):**
- Homepage (all design sections), `/about/`, `/pricing/`, `/contact/`, `/subjects/` hub.
- 23 subject pages — Chemistry fully written; 22 scaffolded (valid facts + topics + intro copy).
- Contact form via Cloudflare Pages Function (Turnstile + Resend) with progressive enhancement.
- SEO: per-page meta/canonical/OG, JSON-LD (Organization, Course, Breadcrumb, FAQ), sitemap, robots.
- Redirect map + verification tooling; legal stub pages; 404.

**Out of scope (future):**
- Student portal / the VLE itself as a web app; online payments/enrolment.
- Blog/content migration (add an Astro content collection later).
- Per-subject hero imagery and teacher photos (placeholders/initials for now).

## 5. Personas

- **Parents** of IGCSE / O & A Level students (Pakistan + Gulf + Europe) comparing academies — care
  about results, teacher quality, price, and ease of contact (WhatsApp first).
- **Students** researching a specific subject ("online A Level chemistry tuition").

## 6. Information architecture

```
/                      Home — hero, boards, about/why-us, boards grid, subjects, team, pricing, trial
/about/                About + team + CTA
/pricing/              Region-toggle pricing + FAQ (FAQ rich-result schema)
/contact/              Lead form (also the no-JS success target, /contact/?sent=1)
/subjects/             Directory hub linking all 23 subjects (internal-link surface)
/subjects/{slug}/      Subject page template (23 pages)
/privacy/  /terms/     Legal stubs (replace with reviewed copy)
/404                   Not-found
```
Header nav points About → `/about/`, Pricing → `/pricing/`, Subjects → `/subjects/`, with Boards/Team
as homepage anchors. The contact form lives on `/contact/` and in the homepage trial section.

## 7. Page requirements (from the design)

- **Hero** (editorial variant): eyebrow, serif headline with italic accents, sub-copy, two CTAs,
  stats row (9+ years, 23 subjects, 3 boards, 4 countries).
- **Board strip**, **About/Why-us** (principal quote + 3 feature cards), **Boards** (3 cards),
  **Subjects** (23 pills + junior callout, generated from the content collection), **Team** (6
  initial-avatar cards), **Pricing** (interactive region toggle + IGCSE/A-Level cards + discount
  chips), **Trial/Contact** (info column + form), **Footer**.
- **Subject template**: breadcrumb + hero, quick-facts row, two-column body (teaching narrative =
  MDX body + "Topics we cover" grid) with sticky "At a glance" aside, CTA band, slim footer.

## 8. Functional requirements

- **Pricing region toggle** — Pakistan / Saudi / UAE / Europe; all regions server-rendered, CSS
  reveals the active one (works instantly; JS only flips the active state).
- **Contact form** — name, email, phone, class/grade, details. Progressive: native POST without JS
  (server redirect → `/contact/?sent=1`); with JS, `fetch` + in-place success state. Honeypot +
  Cloudflare Turnstile for spam. Email delivered via Resend in a Cloudflare Pages Function.
- **Always-on contact** — WhatsApp deep link, `tel:`, `mailto:` present on every page regardless of
  JS/form state (the dominant channels for this audience).

## 9. Non-functional requirements

- **Reliability:** static output on Cloudflare Pages — no server runtime; instant rollback to any
  prior build; content changes are reviewed git commits.
- **Performance:** self-hosted variable fonts (woff2, `font-display: swap`); `astro:assets` images
  (AVIF/WebP, explicit dimensions, no CLS); critical CSS inlined; scripts inlined and tiny.
- **SEO:** unique title/description/canonical per page; OG + Twitter cards; JSON-LD; auto sitemap;
  robots.txt.
- **Accessibility:** semantic landmarks, skip link, labelled form fields, focus-visible styles,
  `prefers-reduced-motion` honored.

## 10. SEO migration plan

1. **Inventory** old URLs — GSC Pages report (16 mo) + old WP `sitemap_index.xml` (or Wayback) + a
   Screaming Frog / `wget --spider` crawl.
2. **Map** each old path to its new equivalent; extend `public/_redirects` (currently a documented
   **starter** map of educated guesses — must be confirmed against the real inventory).
3. **Verify** with `scripts/check-redirects.sh` against the Pages preview URL (301 → 200, no loops).
4. **Cutover** — deploy to a Pages preview, verify URL parity, switch DNS, resubmit
   `sitemap-index.xml` in GSC, then monitor Coverage + rankings for 2–4 weeks.

## 11. Rollout

Staging (Cloudflare Pages preview) → redirect verification → DNS cutover → resubmit sitemap → add
uptime monitoring (UptimeRobot/Cloudflare) → watch GSC for 2–4 weeks. Set Pages env vars
(`TURNSTILE_SECRET`, `TURNSTILE_SITEKEY`/`PUBLIC_TURNSTILE_SITEKEY`, `RESEND_API_KEY`, `CONTACT_TO`,
`CONTACT_FROM`) and verify the Resend sender domain before launch.

## 12. Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| Botched redirects lose rankings | Full URL inventory + `check-redirects.sh` before cutover |
| Scaffolded subject pages look thin | Each has real facts + topics + tailored intro; mature prose over time; not `noindex` |
| Form spam | Turnstile + honeypot; server-side validation in the Function |
| Form email misconfig at launch | Test submit through `wrangler pages dev`; WhatsApp/phone always available as fallback |
| Missing brand assets | Monogram + generated OG used as placeholders; swap in designer SVG/OG later |

## 13. Open follow-ups

- Replace the **starter `_redirects`** with the real WP URL inventory (needs GSC + crawl access).
- Provide **brand assets**: logo as SVG, a designed 1200×630 OG image, optional subject/teacher art.
- Set Cloudflare **env vars** + verified Resend sender domain.
- Confirm the **email-domain** choice: contact email is `@learnersacademy.pk` while the canonical
  site host is `.com.pk` (kept per decision).
- Have **privacy/terms** reviewed by a professional before launch.
- Mature the **22 scaffold subject pages** with full teaching narratives.
