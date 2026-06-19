# Learners Academy — website

Static **Astro** site for [learnersacademy.com.pk](https://learnersacademy.com.pk) — online IGCSE /
O & A Level tuition (Cambridge CAIE, Edexcel, AQA). Built for **reliability** (no server runtime to
fail) and **SEO**. See [`docs/PRD.md`](docs/PRD.md) for the full product brief.

## Stack

- **Astro 5** (static output) · **MDX** content collections · **@astrojs/sitemap**
- **Self-hosted fonts** (Fontsource: Hanken Grotesk + Newsreader)
- **Cloudflare Pages** hosting · **Pages Function** for the contact form (Turnstile + Resend)
- Near-zero client JS (mobile menu, pricing toggle, contact form only)

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/  (static)
npm run preview    # serve the build
npm run check      # astro check (types + content schema)
```

> This repo uses **npm** (pnpm/corepack weren't available in the build env). Switch to pnpm by
> deleting `package-lock.json` and running `pnpm import && pnpm install`.

## Project layout

```
src/
  pages/            routes (index, about, pricing, contact, subjects/, subjects/[slug], legal, 404)
  layouts/          BaseLayout · HomeLayout (Org JSON-LD) · SubjectLayout (Course+Breadcrumb JSON-LD)
  components/
    sections/       one component per homepage/section block
    layout/         TopBar · Header · Footer · Logo
    ui/             Button · Pill · Section · Icon
    seo/            SEO · JsonLd · schemas.ts
  content/subjects/ MDX, one file per subject (frontmatter = data, body = teaching narrative)
  data/             site.ts (single source of truth) + boards/team/features/pricing/nav
  scripts/          header-menu · pricing-toggle · contact-form (vanilla TS)
  styles/           tokens.css · global.css
functions/api/      contact.ts (Cloudflare Pages Function)
public/             _redirects · _headers · robots.txt · favicon/OG · webmanifest
scripts/            seed-subjects.mjs · gen-images.mjs · check-redirects.sh  (build-time tooling)
```

## Editing content

- **Subjects:** add/edit `src/content/subjects/<slug>.mdx`. Frontmatter holds the structured data
  (eyebrow, levels, boards, price, quick facts, topics, SEO); the MDX body is the "How we teach X"
  narrative. New files appear automatically on the homepage grid, the `/subjects/` hub, and as
  `/subjects/<slug>/`.
- **Contact details, team, boards, pricing, nav:** edit the typed files in `src/data/`.
- Re-seed the 22 scaffold subjects: `node scripts/seed-subjects.mjs` (never overwrites Chemistry).
- Regenerate favicon/OG rasters: `node scripts/gen-images.mjs`.

## Deploy (Cloudflare Pages)

- Build command `npm run build`, output dir `dist/`. The `functions/` directory deploys as Pages
  Functions automatically.
- **Environment variables** (Pages dashboard):
  - `PUBLIC_TURNSTILE_SITEKEY` — Turnstile site key (build-time; falls back to the test key)
  - `TURNSTILE_SECRET` — Turnstile secret (Function)
  - `RESEND_API_KEY` — Resend API key (Function)
  - `CONTACT_TO` — destination inbox, e.g. `nouman.ahmed@learnersacademy.pk`
  - `CONTACT_FROM` — verified Resend sender, e.g. `Learners Academy <web@learnersacademy.com.pk>`
- Test the Function locally with `npx wrangler pages dev dist`.

## Before launch

1. Replace `public/_redirects` with the **real** WP URL inventory (GSC + crawl), then run
   `BASE=<preview-url> ./scripts/check-redirects.sh`.
2. Set the env vars above; verify the Resend sender domain.
3. Add brand assets (logo SVG, designed OG image).
4. Add uptime monitoring. Resubmit `sitemap-index.xml` in GSC after DNS cutover.
