import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Order in the sidebar's "Guides" section. */
    order: z.number().default(0),
  }),
})

export const collections = { guides }
