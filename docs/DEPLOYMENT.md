# Deployment & Migration Runbook — Learners Academy

End-to-end steps to deploy this Astro site to **Cloudflare Pages** and migrate
**learnersacademy.com.pk** off WordPress without losing SEO.

**Current state (probed 2026-06-18):** WordPress on **Hostinger** — DNS nameservers
`ns1–4.hostinger.com`, origin IP `185.232.14.86`, live WP sitemap at
`/sitemap_index.xml`. The real old-URL inventory is mapped in
[`public/_redirects`](../public/_redirects); the blog was imported into `src/content/blog/`.

> ⚠️ **Email runs on Microsoft 365 — including `@learnersacademy.com.pk`.** Both
> `learnersacademy.com.pk` and `learnersacademy.pk` have MX →
> `learnersacademy-pk.mail.protection.outlook.com`. Moving `.com.pk` DNS to Cloudflare
> therefore **must preserve the Microsoft 365 records** (MX, SPF, DKIM, autodiscover) or
> mail to `@learnersacademy.com.pk` breaks. See Phase 6a. (`learnersacademy.pk` is a
> separate zone — leave it untouched.)

> Do the steps **in order**. Phases 1–5 are safe (nothing public changes). The
> **cutover** is Phase 6 — that's the moment traffic moves from WordPress to the new site.

---

## Phase 0 — Accounts & prerequisites (one-time)

- [ ] **GitHub** account + an empty repo (e.g. `learners-academy`).
- [ ] **Cloudflare** account (free).
- [ ] **Resend** account (free) — for contact-form email.
- [ ] Access to the **domain registrar / DNS** for `learnersacademy.com.pk` (Hostinger panel; `.pk`/`.com.pk` are ultimately under PKNIC).
- [ ] **Google Search Console** access to the existing property (for the sitemap resubmit + monitoring).
- [ ] A monitored inbox to receive leads.

---

## Phase 1 — Push the code to GitHub

From the project root:

```bash
git add .
git commit -m "Initial Astro site"
git branch -M main
git remote add origin git@github.com:<you>/learners-academy.git
git push -u origin main
```

(`node_modules/` and `dist/` are gitignored — that's expected.)

---

## Phase 2 — Resend (contact-form email)

1. Create a Resend account → **Domains → Add Domain** → add `learnersacademy.com.pk`.
2. Add the **SPF + DKIM** DNS records Resend shows you. Resend uses a **dedicated send
   subdomain** (e.g. `send.learnersacademy.com.pk`), so its SPF/DKIM **do not conflict** with
   the root domain's Microsoft 365 SPF — both coexist. Easiest to add these *after* Phase 6,
   once DNS is on Cloudflare. (`CONTACT_FROM` sends from `.com.pk`; `CONTACT_TO` is the M365
   inbox `nouman.ahmed@learnersacademy.pk` — both fine.)
3. Wait for the domain to show **Verified**.
4. **API Keys → Create API Key** → copy it (used as `RESEND_API_KEY`).
5. Decide the sender address on the verified domain, e.g. `Learners Academy <web@learnersacademy.com.pk>` (`CONTACT_FROM`).

> Free tier = 3,000 emails/mo, 100/day, 1 verified domain — ample for trial requests.

---

## Phase 3 — Turnstile (form spam protection)

1. Cloudflare dashboard → **Turnstile → Add site**.
2. Hostname: `learnersacademy.com.pk` (add `*.pages.dev` too so it works on the preview URL).
3. Copy the **Site Key** (`PUBLIC_TURNSTILE_SITEKEY`) and **Secret Key** (`TURNSTILE_SECRET`).

---

## Phase 4 — Create the Cloudflare Pages project

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
2. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. **Environment variables** (Settings → Environment variables → Production *and* Preview):

   | Variable | Value |
   | --- | --- |
   | `NODE_VERSION` | `22` |
   | `PUBLIC_TURNSTILE_SITEKEY` | Turnstile site key |
   | `TURNSTILE_SECRET` | Turnstile secret key |
   | `RESEND_API_KEY` | Resend API key |
   | `CONTACT_TO` | `nouman.ahmed@learnersacademy.pk` |
   | `CONTACT_FROM` | `Learners Academy <web@learnersacademy.com.pk>` |

4. **Save and Deploy.** You get a preview URL like `https://learners-academy.pages.dev`.
   The `functions/api/contact.ts` Pages Function deploys automatically.

> Every later `git push` to `main` triggers a production build; pushes to other branches
> get their own preview URL.

---

## Phase 5 — Verify on the preview URL (before cutover)

Do all of this against `https://<project>.pages.dev` — the live domain is untouched.

1. **Pages load:** `/`, `/subjects/`, `/subjects/chemistry/`, `/about/`, `/pricing/`, `/contact/`, a 404.
2. **Contact form, full path:**
   - Submit a real test → confirm the email arrives at `CONTACT_TO`.
   - With JS: success panel shows in place. With JS off: lands on `/contact/?sent=1`.
   - Turnstile challenge appears; submitting without it is rejected.
3. **Redirects** resolve on the new infra:
   ```bash
   BASE=https://<project>.pages.dev ./scripts/check-redirects.sh
   ```
   Every mapped old URL should report `301 → 200`.
4. **SEO/schema:** run the homepage and `/subjects/chemistry/` through Google's
   **Rich Results Test**; confirm Organization / Course / Breadcrumb / FAQ parse.
5. **Performance:** Lighthouse (mobile) on `/` and a subject page — expect Perf ≥ 95,
   SEO/Best-Practices 100.

Fix anything here before touching DNS.

---

## Phase 6 — DNS cutover (the migration moment)

**Recommended: move DNS to Cloudflare**, then attach the domain to Pages. This gives apex
support, automatic SSL, and the redirects/headers all work.

### 6a. Snapshot the current DNS first  ⚠️ (Microsoft 365 mail lives here)
`@learnersacademy.com.pk` is Microsoft 365 — **these records MUST be re-created in
Cloudflare** or company email breaks. Capture everything before changing nameservers:
```bash
dig +short A   learnersacademy.com.pk                       # 185.232.14.86 (old web origin — will change)
dig +short MX  learnersacademy.com.pk                       # → ...mail.protection.outlook.com (KEEP)
dig +short TXT learnersacademy.com.pk                       # SPF: v=spf1 include:spf.protection.outlook.com ... (KEEP)
dig +short CNAME autodiscover.learnersacademy.com.pk        # → autodiscover.outlook.com (KEEP)
dig +short TXT  _dmarc.learnersacademy.com.pk               # DMARC (KEEP if present)
for s in selector1 selector2; do dig +short CNAME $s._domainkey.learnersacademy.com.pk; done  # DKIM (KEEP)
dig +short CNAME enterpriseregistration.learnersacademy.com.pk
dig +short CNAME enterpriseenrollment.learnersacademy.com.pk
```
Also open the **Microsoft 365 admin → Settings → Domains → learnersacademy.com.pk** and use
its "DNS records" list as the source of truth. Re-create **every** mail/Office record in
Cloudflare in step 6b. The only records that *change* are the website ones (apex/`www` A/CNAME
→ Pages). Note anything else in the Hostinger DNS panel (subdomains, verification TXT).

### 6b. Add the site to Cloudflare
1. Cloudflare → **Add a site** → `learnersacademy.com.pk` → Free plan.
2. Cloudflare imports existing records — **verify MX/TXT and every subdomain carried over.**
   Add any that are missing. (Getting this wrong is how email/subdomains break.)
3. Cloudflare gives you two **nameservers** (e.g. `x.ns.cloudflare.com`).

### 6c. Change nameservers at the registrar
- In the **Hostinger** domain panel (or PKNIC, if the domain is managed there), replace the
  Hostinger nameservers with the two Cloudflare nameservers.
- `.pk` nameserver changes can take a few hours to ~24h. Cloudflare emails you when active.

### 6d. Attach the domain to Pages
1. Pages project → **Custom domains → Set up a custom domain** → `learnersacademy.com.pk`.
2. Add `www.learnersacademy.com.pk` too. Cloudflare creates the records automatically.
3. Pick a canonical: redirect `www` → apex (or apex → `www`). Apex is fine here; add a
   **Redirect Rule**: `www.learnersacademy.com.pk/*` → `https://learnersacademy.com.pk/$1` (301).

### 6e. Enforce HTTPS
- Cloudflare → SSL/TLS → **Always Use HTTPS: On**, mode **Full**.
- Confirm the Pages-issued certificate covers apex + `www`.

> **Hostinger is web hosting only** (email is on Microsoft 365, unaffected). You don't need to
> keep it long-term — but leave it running ~1–2 weeks as a website rollback target (the old WP
> site stays reachable at `185.232.14.86`), then cancel once the new site is verified stable.

---

## Phase 7 — Post-cutover verification & Search Console

Once DNS is live on the new site:

1. **Redirects on the real domain:**
   ```bash
   BASE=https://learnersacademy.com.pk ./scripts/check-redirects.sh
   ```
   Spot-check a few by hand, e.g.:
   ```bash
   curl -sI https://learnersacademy.com.pk/chemistry-online-classes-for-o-level-a-level/ | grep -i location
   ```
2. **Canonicalization:** `http://` → `https://`, and `www` → apex both 301 correctly.
3. **Reachable:** `https://learnersacademy.com.pk/robots.txt` and `/sitemap-index.xml` return 200.
4. **Google Search Console:**
   - Confirm the property (re-verify via Cloudflare DNS TXT if prompted).
   - **Sitemaps → submit** `https://learnersacademy.com.pk/sitemap-index.xml`.
   - **Remove the old WP sitemaps** (`sitemap_index.xml`, `a_level-sitemap.xml`, …) from the
     Sitemaps list so Google stops recrawling dead URLs.
   - **URL Inspection → Request indexing** on the homepage + a few key subject pages.
5. **Crawl staging vs old inventory:** run Screaming Frog on the new site, diff against the old
   URL list (from the sitemaps) to confirm nothing important 404s.

---

## Phase 8 — Monitoring & aftercare

- [ ] **Uptime monitor** (UptimeRobot free, or Cloudflare Health Checks) on `/` and a couple
      of key pages — this is the safeguard against the original "silent month of downtime."
- [ ] Watch **GSC → Pages / Coverage** for 2–4 weeks: 404 spikes, redirect errors, indexing.
- [ ] Watch **GSC → Performance**: clicks/impressions should hold steady, then recover.
- [ ] Protect `main` (require PRs) so every content change is reviewed → no surprise breakage.
- [ ] After ~30 days of stability, decommission Hostinger.

---

## Phase 9 — Rollback plan

If something is seriously wrong after cutover:
- **Fast revert:** in Cloudflare DNS, point the apex/`www` records back to `185.232.14.86`
  (old Hostinger origin) — the WordPress site is still there. Propagation is minutes on
  Cloudflare DNS.
- **Or** revert nameservers at the registrar back to Hostinger (slower).
- Pages keeps every build — you can also **instant-rollback** to a previous deployment from
  the Pages dashboard.

---

## Appendix A — Blog migration (done)

All **35 WordPress posts** were imported via the WP REST API into `src/content/blog/*.md`
(see `scripts/import-blog.mjs`) — clean Markdown, inline images pulled into `public/blog/`,
internal links rewritten relative. They render at `/blog/<slug>/` with `BlogPosting` +
breadcrumb schema, and `public/_redirects` 301s each old root URL (`/<slug>/`) to its new
`/blog/<slug>/` home, preserving long-tail rankings.

- Re-run the import any time (overwrites): `node scripts/import-blog.mjs`.
- Dates come from WordPress; edit frontmatter (`pubDate`) if any look wrong.
- The blog is linked from the footer and listed at `/blog/`.

## Appendix B — Environment variable reference

| Variable | Where | Purpose |
| --- | --- | --- |
| `NODE_VERSION` | Pages build | Pin Node 22 for the build |
| `PUBLIC_TURNSTILE_SITEKEY` | Pages build + client | Turnstile widget (public) |
| `TURNSTILE_SECRET` | Function | Server-side Turnstile verify |
| `RESEND_API_KEY` | Function | Send lead emails |
| `CONTACT_TO` | Function | Destination inbox |
| `CONTACT_FROM` | Function | Verified Resend sender |

## Appendix C — Useful commands

```bash
npm run build                       # local production build → dist/
npm run preview                     # serve dist/ locally
npx wrangler pages dev dist         # test the Pages Function (form) locally
BASE=<url> ./scripts/check-redirects.sh   # assert every 301 → 200
```
