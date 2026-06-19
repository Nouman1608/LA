import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Subject pages. Structured data lives in frontmatter; the teaching
 * narrative ("How we teach X") is the MDX body.
 * Chemistry is fully written; the other 22 are scaffolds (valid facts +
 * topics + thin prose) — mature the prose over time.
 */
const subjects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/subjects' }),
  schema: z.object({
    /** Short label for pills, breadcrumb, headings — e.g. "Chemistry". */
    name: z.string(),
    /** Page H1 — e.g. "Chemistry online classes". */
    title: z.string(),
    /** Hero eyebrow — e.g. "IGCSE & A Level · Cambridge · Edexcel · AQA". */
    eyebrow: z.string(),
    /** Hero sub-headline. */
    subcopy: z.string(),
    levels: z.array(z.string()).default(['IGCSE', 'A Level']),
    boards: z.array(z.string()).default(['CAIE', 'Edexcel', 'AQA']),
    format: z.string().default('Live online'),
    priceFrom: z
      .object({
        currency: z.string().default('₨'),
        amount: z.string(),
        per: z.string().default('month'),
      })
      .default({ currency: '₨', amount: '19,000', per: 'month' }),
    quickFacts: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .max(4)
      .default([
        { value: '1:1', label: '& small-group live' },
        { value: 'A*', label: 'grade focused' },
        { value: '3', label: 'boards covered' },
        { value: '2016', label: 'teaching since' },
      ]),
    topics: z.array(z.string()).min(1),
    /** Optional SEO overrides; fall back to title/subcopy. */
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

/**
 * Blog posts — migrated 1:1 from the old WordPress blog via the REST API
 * (see scripts/import-blog.mjs). Markdown, rendered at /blog/<slug>/.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { subjects, blog };
