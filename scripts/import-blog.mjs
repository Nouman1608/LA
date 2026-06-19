/**
 * One-off blog migration: import all posts from the live WordPress REST API
 * into src/content/blog/<slug>.md, download inline images, rewrite internal
 * links to relative. Re-runnable (overwrites). Run: node scripts/import-blog.mjs
 */
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'src', 'content', 'blog');
const IMG_DIR = join(root, 'public', 'blog');
mkdirSync(OUT, { recursive: true });
mkdirSync(IMG_DIR, { recursive: true });

const ORIGIN = 'https://learnersacademy.com.pk';
const API = `${ORIGIN}/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,date,title,excerpt,content`;

const nhm = new NodeHtmlMarkdown();

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#0?38;/g, '&')
    .replace(/&#8217;|&#8216;|&rsquo;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#8230;|&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

const stripTags = (s) => decodeEntities(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

function yaml(v) {
  return JSON.stringify(decodeEntities(String(v)));
}

async function downloadImage(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    let name = basename(new URL(url).pathname).split('?')[0] || 'image';
    name = name.replace(/[^a-zA-Z0-9._-]/g, '-');
    writeFileSync(join(IMG_DIR, name), buf);
    return `/blog/${name}`;
  } catch {
    return null;
  }
}

const posts = await (await fetch(API)).json();
console.log(`Fetched ${posts.length} posts.`);

let count = 0;
for (const post of posts) {
  let html = post.content.rendered;

  // Download inline images and rewrite their src to /blog/<file>.
  const imgUrls = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  for (const src of imgUrls) {
    const abs = src.startsWith('http') ? src : `${ORIGIN}${src}`;
    const local = await downloadImage(abs);
    if (local) html = html.split(src).join(local);
  }

  // Rewrite internal absolute links to relative.
  html = html.split(`${ORIGIN}/`).join('/');

  let body = nhm.translate(html).trim();
  // Tidy excess blank lines.
  body = body.replace(/\n{3,}/g, '\n\n');

  const title = stripTags(post.title.rendered);
  let description = stripTags(post.excerpt.rendered).replace(/\s*\[?…\]?\s*$/, '').slice(0, 158);
  if (!description) description = body.replace(/[#*_>[\]()`]/g, '').slice(0, 158).trim();

  const fm = [
    '---',
    `title: ${yaml(title)}`,
    `description: ${yaml(description)}`,
    `pubDate: ${post.date.slice(0, 10)}`,
    'draft: false',
    '---',
    '',
    body,
    '',
  ].join('\n');

  writeFileSync(join(OUT, `${post.slug}.md`), fm, 'utf8');
  count++;
}
console.log(`Wrote ${count} blog posts to src/content/blog/`);
