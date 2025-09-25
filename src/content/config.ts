import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    imageUrl: z.string().optional(),
    path: z.string().optional(),
  }),
});

export const collections = { projects };
