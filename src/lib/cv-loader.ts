/**
 * Loader & parser for the CV markdown files.
 *
 * Reads `src/content/cv/cv.<locale>.md`, parses the YAML frontmatter
 * (name + contact lines) and the markdown body into a typed
 * {@link CVData} structure covering profile, education, professional
 * experience, technical stack (categorized) and languages.
 *
 * The format is intentionally simple and stable; we use a custom parser
 * (no remark/remark-parse dependency) because the MD schema is fixed and
 * we want zero runtime overhead in the SSR endpoint.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

import type { Language } from "../utils/i18n";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface CVContact {
  /** Comma-separated contact lines (e.g. "Torreon, Coahuila · (52) …"). */
  lines: string[];
  /** Inline links extracted from the contact block, keyed by the visible text. */
  links: { text: string; url: string }[];
}

export interface CVEducation {
  /** School / institution name (e.g. "Universidad Tecnológica de Torreon"). */
  institution: string;
  /** Each bullet represents a degree / program with the date range. */
  degrees: string[];
}

export interface CVExperienceItem {
  /** Title + company line, e.g. "IT Intern — Players of Life". */
  title: string;
  /** Date range line, e.g. "Sep 2025 - Dec 2025". */
  date: string;
  /** Bullet points describing responsibilities / achievements. */
  bullets: string[];
}

export interface CVStackCategory {
  /** Category label, e.g. "Languages", "Web & APIs", "Mobile", "Databases". */
  label: string;
  /** Comma-separated list of items in the category. */
  items: string;
}

export interface CVLanguage {
  /** Language name (e.g. "Spanish", "English"). */
  name: string;
  /** Proficiency descriptor (e.g. "Native", "B1"). */
  level: string;
}

export interface CVData {
  locale: Language;
  name: string;
  contact: CVContact;
  /** Profile paragraph. */
  profile: string;
  education: CVEducation;
  experience: CVExperienceItem[];
  stack: CVStackCategory[];
  languages: CVLanguage[];
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Resolve the on-disk path of the CV markdown file for a given locale.
 *
 * The CV lives in two distinct places depending on context:
 *
 * - **Dev (`astro dev`)**: `src/content/cv/cv.<locale>.md` relative to the
 *   project root. We compute the root from the current source file
 *   (`src/lib/cv-loader.ts`) by going up two levels.
 *
 * - **Production (standalone `@astrojs/node` build)**: the source files are
 *   copied next to the running server at `/app/src/content/cv/` (see
 *   Dockerfile `COPY` in the runtime stage). From the compiled chunk
 *   (`/app/dist/server/chunks/cv-pdf_*.mjs`) the project root is reached
 *   by going up three levels (`chunks -> server -> dist -> /app`).
 *
 * We try the dev path first; if it doesn't exist we fall back to the
 * production layout.
 */
function cvMarkdownPath(locale: Language): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  // Dev path: from src/lib/cv-loader.ts to project root is 2 levels up.
  const devPath = path.resolve(here, "..", "..", "src", "content", "cv", `cv.${locale}.md`);
  if (fs.existsSync(devPath)) return devPath;
  // Production path: from dist/server/chunks/ the project root is 3 levels up.
  return path.resolve(here, "..", "..", "..", "src", "content", "cv", `cv.${locale}.md`);
}

/**
 * Strip basic markdown emphasis (`**bold**`, `` `code` ``, `[text](url)` -> text)
 * from a single inline string. We keep things conservative so the PDF
 * renderer doesn't have to handle full markdown.
 */
function cleanInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/\*([^*]+)\*/g, "$1") // italic
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1") // links -> visible text
    .trim();
}

/**
 * Split a markdown heading/body into sections keyed by the `## ` heading.
 * Returns a map from heading text (cleaned) to the array of raw lines
 * that follow it (until the next `## ` heading or end of file).
 */
function splitSections(body: string): Map<string, string[]> {
  const sections = new Map<string, string[]>();
  const lines = body.split(/\r?\n/);
  let current: string | null = null;

  for (const line of lines) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      current = cleanInline(heading[1]);
      sections.set(current, []);
      continue;
    }
    if (current !== null) {
      sections.get(current)!.push(line);
    }
  }

  return sections;
}

/**
 * Pull a section out of the section map and trim surrounding blank lines.
 * Returns an empty array if the section is missing.
 */
function getSection(
  sections: Map<string, string[]>,
  name: string
): string[] {
  const lines = sections.get(name);
  if (!lines) return [];
  // Trim leading/trailing blank lines.
  let start = 0;
  let end = lines.length;
  while (start < end && lines[start].trim() === "") start++;
  while (end > start && lines[end - 1].trim() === "") end--;
  return lines.slice(start, end);
}

/**
 * Group the lines belonging to a section into blocks, where each block is
 * separated by a single blank line. Used for profile (single block), stack
 * categories (label + line per block), etc.
 */
function groupBlocks(lines: string[]): string[][] {
  const blocks: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (line.trim() === "") {
      if (current.length > 0) {
        blocks.push(current);
        current = [];
      }
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) blocks.push(current);
  return blocks;
}

/* -------------------------------------------------------------------------- */
/*  Public API                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Load and parse the CV markdown for a given locale.
 *
 * The expected schema is documented in the project README; the parser is
 * intentionally tolerant of small whitespace variations but strict about
 * the section names (es/en) defined below.
 */
export function loadCV(locale: Language): CVData {
  if (locale !== "es" && locale !== "en") {
    throw new Error(`Unsupported CV locale: ${locale}`);
  }

  const filePath = cvMarkdownPath(locale);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  // ----- Header / contact -----
  // The name lives either in frontmatter (`name: "..."`) or in the first
  // H1 of the body. We accept both so the actual MD files in this repo
  // (which use the H1 form) work without forcing a frontmatter rewrite.
  const name =
    (data.name as string | undefined)?.trim() ||
    (content.match(/^#\s+(.+?)\s*$/m)?.[1] ?? "").trim();
  if (!name) {
    throw new Error(`CV (${locale}): missing H1 name in markdown`);
  }

  // Strip the leading H1 line so it is not duplicated into the contact block.
  // We keep everything that follows up until the first `## ` heading — those
  // lines are the contact block (location, phone, email, links).
  const h1Match = content.match(/^#\s+.+?\r?\n/);
  const afterH1 = h1Match ? content.slice((h1Match.index ?? 0) + h1Match[0].length) : content;
  const preBody = afterH1.split(/^##\s+/m)[0] ?? "";
  const contactLines = preBody
    .split(/\r?\n/)
    .map((l) => cleanInline(l))
    .filter((l) => l.length > 0 && l !== "---" && l !== "***");

  // Extract inline links from the contact block so the PDF can render them
  // as clickable hyperlinks. We collect them in document order.
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: { text: string; url: string }[] = [];
  for (const line of preBody.split(/\r?\n/)) {
    let m: RegExpExecArray | null;
    while ((m = linkRegex.exec(line)) !== null) {
      links.push({ text: cleanInline(m[1]), url: m[2] });
    }
  }

  const contact: CVContact = { lines: contactLines, links };

  // ----- Sections -----
  const sections = splitSections(content);

  // Section heading names are bilingual because we keep them translated
  // in the markdown files; the PDF will render them in uppercase.
  const profileHeading = locale === "es" ? "Perfil" : "Profile";
  const educationHeading = locale === "es" ? "Educación" : "Education";
  const experienceHeading =
    locale === "es" ? "Experiencia Laboral" : "Professional Experience";
  const stackHeading =
    locale === "es" ? "Stack Técnico" : "Technical Stack";
  const languagesHeading = locale === "es" ? "Idiomas" : "Languages";

  // ----- Profile -----
  const profileBlocks = groupBlocks(getSection(sections, profileHeading));
  const profile = profileBlocks
    .map((b) => b.map(cleanInline).join(" "))
    .join("\n\n")
    .trim();

  // ----- Education -----
  // Format:
  //   **Institution**
  //   - Degree — year
  //   - Degree — year
  const eduLines = getSection(sections, educationHeading);
  let eduInstitution = "";
  const eduDegrees: string[] = [];
  for (const line of eduLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("-")) {
      eduDegrees.push(cleanInline(trimmed.replace(/^-\s*/, "")));
    } else {
      eduInstitution = cleanInline(
        trimmed.replace(/^\*\*([^*]+)\*\*/, "$1")
      );
    }
  }
  const education: CVEducation = {
    institution: eduInstitution,
    degrees: eduDegrees,
  };

  // ----- Experience -----
  // Each entry is laid out as:
  //   **Title — Company**
  //   Date range
  //   <blank>
  //   - bullet
  //   - bullet
  //   <blank>
  //   **…**  ← next entry
  //
  // We don't rely on blank-line grouping here because the format places the
  // blank line BETWEEN the date and the first bullet, not between the title
  // and the date. A new entry starts on any line beginning with `**`.
  const expLines = getSection(sections, experienceHeading);
  const experience: CVExperienceItem[] = [];
  let current: CVExperienceItem | null = null;

  for (const rawLine of expLines) {
    const line = rawLine.trim();
    if (!line) {
      // Blank lines don't reset the entry; bullets can span multiple lines.
      continue;
    }
    if (line.startsWith("**")) {
      // Flush previous entry before starting a new one.
      if (current && (current.title || current.bullets.length > 0)) {
        experience.push(current);
      }
      current = {
        title: cleanInline(line.replace(/^\*\*([^*]+)\*\*/, "$1")),
        date: "",
        bullets: [],
      };
    } else if (line.startsWith("-")) {
      if (current) {
        current.bullets.push(cleanInline(line.replace(/^-\s*/, "")));
      }
    } else if (current && !current.date) {
      // First non-bullet, non-title line is the date.
      current.date = cleanInline(line);
    } else if (current) {
      // Treat as an extra bullet (defensive).
      current.bullets.push(cleanInline(line));
    }
  }
  if (current && (current.title || current.bullets.length > 0)) {
    experience.push(current);
  }

  // ----- Technical Stack (categorized) -----
  // Each category is a `**Label**` line followed by a comma-separated list.
  const stackLines = getSection(sections, stackHeading);
  const stackBlocks = groupBlocks(stackLines);
  const stack: CVStackCategory[] = [];
  for (const block of stackBlocks) {
    if (block.length === 0) continue;
    const first = block[0].trim();
    const labelMatch = first.match(/^\*\*([^*]+)\*\*/);
    if (!labelMatch) continue;
    const label = cleanInline(labelMatch[1]);
    const items = block
      .slice(1)
      .map((l) => cleanInline(l))
      .join(", ")
      .trim();
    if (items) stack.push({ label, items });
  }

  // ----- Languages -----
  // Each row: "- Language — Level"
  const langLines = getSection(sections, languagesHeading);
  const languages: CVLanguage[] = [];
  for (const line of langLines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("-")) continue;
    const cleaned = cleanInline(trimmed.replace(/^-\s*/, ""));
    const [namePart, ...rest] = cleaned.split(/\s+[—–-]\s+/);
    if (!namePart) continue;
    languages.push({
      name: namePart.trim(),
      level: rest.join(" — ").trim(),
    });
  }

  return {
    locale,
    name,
    contact,
    profile,
    education,
    experience,
    stack,
    languages,
  };
}
