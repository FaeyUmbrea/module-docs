import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

export const collections = {
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
  docs: defineCollection({
    loader: docsLoader({ generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '') }),
    schema: docsSchema({ extend: z.object({
      moduleId: z.string().optional(),
      channel: z.string().optional(),
      version: z.string().optional(),
      audience: z.enum(['user', 'dev']).optional(),
      legacy: z.boolean().default(false),
      order: z.number().default(50),
    }) }),
  }),
};
