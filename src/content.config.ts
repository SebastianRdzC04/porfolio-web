import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    imageUrl: z.string().optional(),
    path: z.string().optional(),
    lang: z.enum(["es", "en"]).optional(),
  }),
});

const personalProjects = defineCollection({
  loader: glob({ base: "./src/content/personal-projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    imageUrl: z.string().optional(),
    path: z.string().optional(),
    lang: z.enum(["es", "en"]).optional(),
  }),
});

const about = defineCollection({
  loader: glob({ base: "./src/content/about", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    sectionTitle: z.string(),
    lang: z.enum(["es", "en"]).optional(),
  }),
});

export const collections = { projects, personalProjects, about };
