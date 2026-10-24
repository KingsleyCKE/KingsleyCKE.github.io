import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/[^_]*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1).max(60),
      // 1–2 sentences shown on the homepage row and in link previews
      summary: z.string().min(1).max(280),
      // Single pill, e.g. "Backend · Django"
      tag: z.string().min(1).max(32),
      accent: z.enum(['orange', 'blue', 'teal']),
      // e.g. "Solo developer: product, backend, frontend, deployment"
      role: z.string().min(1),
      stack: z.array(z.string().min(1)).min(1),
      status: z.enum(['in-progress', 'live']),
      cover: image(),
      coverAlt: z.string().min(1),
      // Homepage order, ascending. 1 = first
      order: z.number().int().min(1),
      links: z
        .object({
          live: z.url().optional(),
          demo: z.url().optional(),
          repo: z.url().optional(),
        })
        .default({}),
      video: z
        .object({
          youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
          title: z.string().min(1),
        })
        .optional(),
      draft: z.boolean().default(false),
    }),
});

const log = defineCollection({
  loader: glob({ base: './src/content/log', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string().min(1).max(90),
    date: z.coerce.date(),
    project: reference('projects'),
    // One line shown in lists
    summary: z.string().min(1).max(160),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, log };
