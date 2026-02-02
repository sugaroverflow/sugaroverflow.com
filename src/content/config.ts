import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    contentType: z.enum(['field-notes', 'tutorial', 'deep-dive', 'research-update', 'talk', 'project']),
    affiliation: z.array(z.enum(['gitlab', 'newspeak', 'personal'])),
    topics: z.array(z.string()),
    heroImage: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts };
