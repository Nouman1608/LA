/**
 * /llms.txt -- a plain-text summary for AI answer engines (llmstxt.org).
 * Built from the same data files the site renders, so nothing here can say
 * more than, or drift from, the pages themselves. Deliberately carries no
 * results, review or experience figures: those live on /results/ and
 * /teachers/, where they are shown with their evidence.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export const GET: APIRoute = async () => {
  const subjects = await getCollection('subjects', ({ data }) => !data.draft);
  const boardPages = await getCollection('subjectBoards', ({ data }) => !data.draft);
  const boards = [...new Set(boardPages.map((b) => b.data.boardName))].sort();
  const boardList = boards.length > 1 ? `${boards.slice(0, -1).join(', ')} and ${boards[boards.length - 1]}` : boards.join('');
  const u = (p: string) => new URL(p, site.domain).href;

  const body = `# ${site.name}

> ${site.tagline}. Live online IGCSE, O Level and A Level classes (exam boards: ${boardList}), taught from ${site.location} since ${site.founded}. First class free. WhatsApp ${site.contact.phone}.

## Key pages
- [Subjects](${u('/subjects/')}): ${subjects.length} subjects, each with its board and level class pages (${boardPages.length} in total)
- [Pricing](${u('/pricing/')}): group and 1-to-1 fees
- [Teachers](${u('/teachers/')}): named teachers, with their schools and teaching experience
- [Results](${u('/results/')}): students' grades and Google reviews
- [Past papers](${u('/past-papers/')}): links to each exam board's official past papers, mark schemes and examiner reports
- [Pakistani expats](${u('/pakistani-expats/')}): online classes for families in the Gulf and the UK
- [Blog](${u('/blog/')}): exam, subject-choice and results-day guidance
- [Contact](${u('/contact/')}): book a free demo class

## Related
- [Marlbridge](https://marlbridge.com/): our sister site with free syllabus guides, revision notes and 10-minute diagnostics
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
