/**
 * Reads the question-and-answer pairs from a blog post's visible
 * "## Frequently asked questions" (or "## ... FAQ ...") section, so FAQPage
 * markup is generated from exactly the text readers see. Two formats are used
 * in the posts:
 *   ### Question?            **Question?** Answer text…
 *   Answer paragraph(s)…
 * Markdown links and emphasis are reduced to plain text.
 */
const plain = (t: string) =>
  t
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export function faqsFromMarkdown(md: string): { q: string; a: string }[] {
  const lines = md.split('\n');
  const start = lines.findIndex((l) => /^##\s+.*(frequently asked|faq)/i.test(l));
  if (start < 0) return [];
  let end = lines.findIndex((l, i) => i > start && /^##\s/.test(l));
  if (end < 0) end = lines.length;
  const section = lines.slice(start + 1, end).join('\n');
  const out: { q: string; a: string }[] = [];

  if (/^###\s/m.test(section)) {
    for (const block of section.split(/^###\s+/m).slice(1)) {
      const [q, ...rest] = block.split('\n');
      const a = plain(rest.join('\n'));
      if (q.trim() && a) out.push({ q: plain(q), a });
    }
    return out;
  }
  for (const para of section.split(/\n\s*\n/)) {
    const m = para.trim().match(/^\*\*(.+?)\*\*\s*([\s\S]+)$/);
    if (m && /\?$/.test(m[1].trim())) out.push({ q: plain(m[1]), a: plain(m[2]) });
  }
  return out;
}
