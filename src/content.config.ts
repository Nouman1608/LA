import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const subjects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/subjects' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    eyebrow: z.string(),
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

/**
 * Board-specific subject pages — one per (subject × board × level) combo.
 * 71 pages total: Cambridge 37, Edexcel 12, AQA 22.
 */
const subjectBoards = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/subject-boards' }),
  schema: z.object({
    subject: z.string(),
    subjectName: z.string(),
    board: z.string(),
    boardName: z.string(),
    title: z.string(),
    eyebrow: z.string(),
    subcopy: z.string(),
    level: z.string(),
    levelSlug: z.enum(['a-levels', 'igcse', 'o-levels']),
    syllabusCode: z.string(),
    assessment: z.array(
      z.object({ label: z.string(), value: z.string() })
    ),
    priceFrom: z.string(),
    oneToOne: z.string(),
    topics: z.array(z.string()).min(1),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      canonical: z.string(),
    }),
    draft: z.boolean().default(false),
  }),
});

export const collections = { subjects, blog, subjectBoards };
