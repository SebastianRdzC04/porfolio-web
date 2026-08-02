/**
 * SSR endpoint: `/en/cv.pdf` — English CV.
 *
 * Mirrors `/cv.pdf` (Spanish) but renders the English markdown source.
 * Because `astro.config.mjs` declares `prefixDefaultLocale: false`,
 * `/cv.pdf` is the default-locale (Spanish) route and `/en/cv.pdf` is
 * the localized variant — both therefore need explicit files rather
 * than relying on a single `[lang]/cv.pdf.ts` catch-all.
 */
import type { APIRoute } from "astro";

import { renderCV } from "../../lib/cv-pdf";

export const prerender = false;

export const GET: APIRoute = async () => {
  const buffer = await renderCV("en");
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'inline; filename="sebastian-rodriguez-cv-en.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
};
