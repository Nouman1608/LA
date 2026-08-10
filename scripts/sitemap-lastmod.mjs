// Build a pathname -> ISO-8601 date map for <lastmod> in the sitemap.
//
// Dates come from the real git history of the file that produces each page, so
// they are trustworthy. Google ignores (or distrusts) lastmod when every URL
// carries the same value, so if git is unavailable — or the checkout is shallow
// and every file collapses to one commit — we return an empty map and the
// sitemap is emitted exactly as before, with no lastmod at all.
//
// Partial coverage is fine: <lastmod> is optional per URL in the sitemap spec.

import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const MIN_DISTINCT_DATES = 3;

/**
 * CI providers (Cloudflare Pages included) clone with --depth 1, which collapses
 * every file onto a single commit date. Deepen the history first so the dates are
 * real; if the fetch is not possible the guard below drops lastmod entirely.
 */
function unshallow() {
  try {
    const shallow = execSync('git rev-parse --is-shallow-repository', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (shallow === 'true') {
      execSync('git fetch --unshallow --quiet', {
        stdio: ['ignore', 'ignore', 'ignore'],
        timeout: 120000,
      });
    }
  } catch {
    /* no git, no network, or already complete — handled by the guard */
  }
}

/** file path (repo-relative) -> ISO date of the commit that last touched it */
function gitDates() {
  try {
    unshallow();
    const out = execSync('git log --no-merges --pretty=format:%cI --name-only', {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const map = new Map();
    let current = null;
    for (const raw of out.split('\n')) {
      const line = raw.trim();
      if (!line) continue;
      if (/^\d{4}-\d{2}-\d{2}T/.test(line)) {
        current = line;
        continue;
      }
      // git log walks newest -> oldest, so the first hit is the latest commit.
      if (current && !map.has(line)) map.set(line, current);
    }
    return map;
  } catch {
    return null;
  }
}

const fm = (src, key) => {
  const m = src.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?\\s*$`, 'm'));
  return m ? m[1].trim() : null;
};

const listDir = (dir, ext) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(ext)) : [];

const newest = (dates) =>
  dates.filter(Boolean).sort().at(-1) ?? null;

export function buildLastmodMap() {
  const git = gitDates();
  if (!git) return new Map();

  const at = (p) => git.get(p) ?? null;
  const out = new Map();
  const set = (pathname, date) => { if (date) out.set(pathname, date); };

  // Board subject pages — /:levelSlug/:board/:subject/
  const boardsDir = 'src/content/subject-boards';
  const routeSubject = at('src/pages/[levelSlug]/[board]/[subject].astro');
  for (const f of listDir(boardsDir, '.mdx')) {
    const src = readFileSync(path.join(boardsDir, f), 'utf8');
    const level = fm(src, 'levelSlug');
    const board = fm(src, 'board');
    const subject = fm(src, 'subject');
    if (level && board && subject) {
      set(`/${level}/${board}/${subject}/`, newest([at(`${boardsDir}/${f}`), routeSubject]));
    }
  }

  // Board index pages — /:levelSlug/:board/
  const routeBoard = newest([
    at('src/pages/[levelSlug]/[board]/index.astro'),
    at('src/data/board-intros.ts'),
  ]);
  const combos = new Set();
  for (const f of listDir(boardsDir, '.mdx')) {
    const src = readFileSync(path.join(boardsDir, f), 'utf8');
    const level = fm(src, 'levelSlug');
    const board = fm(src, 'board');
    if (level && board) combos.add(`/${level}/${board}/`);
  }
  for (const c of combos) set(c, routeBoard);

  // Blog posts — /blog/:slug/
  const blogDir = 'src/content/blog';
  const routeBlog = at('src/pages/blog/[slug].astro');
  for (const f of listDir(blogDir, '.md')) {
    set(`/blog/${f.replace(/\.md$/, '')}/`, newest([at(`${blogDir}/${f}`), routeBlog]));
  }

  // Subject hubs — /subjects/:slug/
  const subjDir = 'src/content/subjects';
  const routeSubjHub = at('src/pages/subjects/[slug].astro');
  for (const f of listDir(subjDir, '.mdx')) {
    set(`/subjects/${f.replace(/\.mdx$/, '')}/`, newest([at(`${subjDir}/${f}`), routeSubjHub]));
  }

  // Level index pages — /a-levels/, /igcse/, /o-levels/
  const routeLevel = at('src/pages/[levelSlug]/index.astro');
  const levels = new Set();
  for (const f of listDir(boardsDir, '.mdx')) {
    const level = fm(readFileSync(path.join(boardsDir, f), 'utf8'), 'levelSlug');
    if (level) levels.add(level);
  }
  for (const l of levels) set(`/${l}/`, routeLevel);

  // Static routes — src/pages/**/*.astro, skipping dynamic [param] segments.
  const pagesDir = 'src/pages';
  const walk = (dir, segs = []) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('[')) continue; // handled above
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, [...segs, entry.name]);
      } else if (entry.name.endsWith('.astro') && entry.name !== '404.astro') {
        const slug = entry.name.replace(/\.astro$/, '');
        const parts = slug === 'index' ? segs : [...segs, slug];
        set(parts.length ? `/${parts.join('/')}/` : '/', at(full));
      }
    }
  };
  walk(pagesDir);

  // Guard: uniform dates are a worse signal than none at all.
  if (new Set(out.values()).size < MIN_DISTINCT_DATES) return new Map();
  return out;
}
