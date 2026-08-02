/**
 * Harvard-style sober PDF renderer for the CV.
 *
 * Design constraints (per task spec):
 *   - Times New Roman 11pt body
 *   - Header: name centred bold 14pt, then contact lines centred
 *   - Sections rendered in UPPERCASE with a horizontal rule line
 *   - Bullets for content, dates right-aligned on their own line
 *   - Black & white only, no photo, no icons
 *   - 1-inch margins on all sides
 *
 * The renderer is a thin wrapper around PDFKit that delegates parsing
 * to {@link loadCV} and produces a `Buffer` ready to ship as
 * `application/pdf`.
 */
import PDFDocument from "pdfkit";

import { loadCV } from "./cv-loader";
import type { Language } from "../utils/i18n";

/* -------------------------------------------------------------------------- */
/*  Layout constants                                                          */
/* -------------------------------------------------------------------------- */

const FONT_FAMILY = "Times-Roman";
const FONT_BOLD = "Times-Bold";
const FONT_ITALIC = "Times-Italic";

const BODY_SIZE = 11;
const NAME_SIZE = 14;
const SECTION_SIZE = 11;
const DATE_SIZE = 10;

const MARGIN = 72; // 1 inch = 72 pt

const BLACK = "#000000";

const SECTION_RULE_THICKNESS = 0.75;
const BULLET_RADIUS = 1.2;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

interface RenderContext {
  doc: PDFKit.PDFDocument;
  data: ReturnType<typeof loadCV>;
  /** Y cursor for the next element to draw. */
  cursorY: number;
  /** Cached page width (excluding margins). */
  contentWidth: number;
}

function pageBottom(doc: PDFKit.PDFDocument): number {
  return doc.page.height - MARGIN;
}

function ensureSpace(
  ctx: RenderContext,
  needed: number
): void {
  if (ctx.cursorY + needed > pageBottom(ctx.doc)) {
    ctx.doc.addPage();
    ctx.cursorY = MARGIN;
  }
}

/**
 * Draw a section heading in UPPERCASE followed by a thin rule line.
 */
function drawSectionHeading(
  ctx: RenderContext,
  label: string
): void {
  const { doc, contentWidth, cursorY } = ctx;
  const upper = label.toUpperCase();

  ensureSpace(ctx, SECTION_SIZE + 10);

  doc
    .font(FONT_BOLD)
    .fontSize(SECTION_SIZE)
    .fillColor(BLACK)
    .text(upper, MARGIN, cursorY, {
      width: contentWidth,
      lineGap: 2,
    });

  const headingHeight = doc.heightOfString(upper, {
    width: contentWidth,
    font: FONT_BOLD,
    fontSize: SECTION_SIZE,
  });

  const ruleY = cursorY + headingHeight + 3;
  doc
    .lineWidth(SECTION_RULE_THICKNESS)
    .strokeColor(BLACK)
    .moveTo(MARGIN, ruleY)
    .lineTo(MARGIN + contentWidth, ruleY)
    .stroke();

  ctx.cursorY = ruleY + 8;
}

/**
 * Write a paragraph of body text, advancing the cursor with lineGap.
 */
function drawParagraph(
  ctx: RenderContext,
  text: string,
  options: { gapAfter?: number; font?: string; size?: number } = {}
): void {
  if (!text) return;
  const { doc, contentWidth, cursorY } = ctx;
  const font = options.font ?? FONT_FAMILY;
  const size = options.size ?? BODY_SIZE;
  const gapAfter = options.gapAfter ?? 4;

  ensureSpace(ctx, size + 2);
  doc
    .font(font)
    .fontSize(size)
    .fillColor(BLACK)
    .text(text, MARGIN, cursorY, {
      width: contentWidth,
      lineGap: 2,
      align: "left",
    });

  const height = doc.heightOfString(text, {
    width: contentWidth,
    font,
    fontSize: size,
  });
  ctx.cursorY = cursorY + height + gapAfter;
}

/**
 * Draw a single bullet line.
 */
function drawBullet(
  ctx: RenderContext,
  text: string
): void {
  const { doc, contentWidth, cursorY } = ctx;
  const textX = MARGIN + 14;
  const textWidth = contentWidth - 14;

  ensureSpace(ctx, BODY_SIZE + 2);

  // Bullet glyph
  doc
    .fillColor(BLACK)
    .circle(MARGIN + 3, cursorY + BODY_SIZE / 2 + 0.5, BULLET_RADIUS)
    .fill();

  doc
    .font(FONT_FAMILY)
    .fontSize(BODY_SIZE)
    .fillColor(BLACK)
    .text(text, textX, cursorY, {
      width: textWidth,
      lineGap: 2,
      align: "left",
    });

  const height = doc.heightOfString(text, {
    width: textWidth,
    font: FONT_FAMILY,
    fontSize: BODY_SIZE,
  });
  ctx.cursorY = cursorY + height + 2;
}

/**
 * Draw a header block: bold centred name, then bold contact lines.
 */
function drawHeader(ctx: RenderContext): void {
  const { doc, data, contentWidth, cursorY } = ctx;

  // Name
  doc
    .font(FONT_BOLD)
    .fontSize(NAME_SIZE)
    .fillColor(BLACK)
    .text(data.name, MARGIN, cursorY, {
      width: contentWidth,
      align: "center",
      lineGap: 2,
    });

  const nameHeight = doc.heightOfString(data.name, {
    width: contentWidth,
    font: FONT_BOLD,
    fontSize: NAME_SIZE,
  });
  let y = cursorY + nameHeight + 4;

  // Contact lines (also bold, body size). We append the URL of each link
  // after the visible text so reviewers can copy-paste them. This keeps
  // the layout simple (no inline link splitting in pdfkit) while keeping
  // the contact info complete and usable.
  const linkMap = new Map(
    data.contact.links.map((l) => [l.text.toLowerCase(), l.url] as const)
  );
  const decoratedLines = data.contact.lines.map((line) => {
    return line
      .split(/\s+·\s+/)
      .map((seg) => {
        const url = linkMap.get(seg.toLowerCase());
        return url ? `${seg} (${url})` : seg;
      })
      .join(" · ");
  });

  doc.font(FONT_BOLD).fontSize(BODY_SIZE);
  for (const line of decoratedLines) {
    const h = doc.heightOfString(line, {
      width: contentWidth,
      font: FONT_BOLD,
      fontSize: BODY_SIZE,
    });
    ensureSpace(ctx, h);
    doc.text(line, MARGIN, y, {
      width: contentWidth,
      align: "center",
      lineGap: 1,
    });
    y += h + 1;
  }

  ctx.cursorY = y + 4;
}

/**
 * Draw an experience entry: bold title + right-aligned italic date,
 * then bullets.
 */
function drawExperience(
  ctx: RenderContext,
  title: string,
  date: string,
  bullets: string[]
): void {
  const { doc, contentWidth, cursorY } = ctx;

  doc.font(FONT_BOLD).fontSize(BODY_SIZE);
  const titleHeight = doc.heightOfString(title, {
    width: contentWidth,
    font: FONT_BOLD,
    fontSize: BODY_SIZE,
  });

  let dateHeight = 0;
  if (date) {
    doc.font(FONT_ITALIC).fontSize(DATE_SIZE);
    dateHeight = doc.heightOfString(date, {
      width: contentWidth,
      font: FONT_ITALIC,
      fontSize: DATE_SIZE,
    });
  }

  const lineHeight = Math.max(titleHeight, dateHeight);
  ensureSpace(ctx, lineHeight + 4);

  doc
    .font(FONT_BOLD)
    .fontSize(BODY_SIZE)
    .fillColor(BLACK)
    .text(title, MARGIN, cursorY, {
      width: contentWidth,
      lineGap: 2,
    });
  if (date) {
    doc
      .font(FONT_ITALIC)
      .fontSize(DATE_SIZE)
      .fillColor(BLACK)
      .text(date, MARGIN, cursorY, {
        width: contentWidth,
        align: "right",
        lineGap: 0,
      });
  }
  ctx.cursorY = cursorY + lineHeight + 2;

  for (const bullet of bullets) {
    drawBullet(ctx, bullet);
  }

  // Spacing between entries.
  ctx.cursorY += 4;
}

/* -------------------------------------------------------------------------- */
/*  Public API                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Localized section headings for the PDF.
 * The renderer uppercases them via {@link drawSectionHeading}.
 */
function sectionLabels(locale: Language): {
  profile: string;
  education: string;
  experience: string;
  stack: string;
  languages: string;
} {
  if (locale === "es") {
    return {
      profile: "Perfil",
      education: "Educación",
      experience: "Experiencia Laboral",
      stack: "Stack Técnico",
      languages: "Idiomas",
    };
  }
  return {
    profile: "Profile",
    education: "Education",
    experience: "Professional Experience",
    stack: "Technical Stack",
    languages: "Languages",
  };
}

/**
 * Render the CV for the given locale into a PDF buffer.
 *
 * Returns a `Promise<Buffer>` because PDFKit's `on('data')` / `on('end')`
 * pattern is asynchronous.
 */
export function renderCV(locale: Language): Promise<Buffer> {
  const data = loadCV(locale);
  const labels = sectionLabels(locale);

  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: {
        top: MARGIN,
        bottom: MARGIN,
        left: MARGIN,
        right: MARGIN,
      },
      info: {
        Title: `${data.name} – CV`,
        Author: data.name,
        Producer: "Portfolio CV Generator",
      },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const contentWidth = doc.page.width - MARGIN * 2;
    const ctx: RenderContext = {
      doc,
      data,
      cursorY: MARGIN,
      contentWidth,
    };

    // Header
    drawHeader(ctx);

    // Profile
    drawSectionHeading(ctx, labels.profile);
    drawParagraph(ctx, data.profile, { gapAfter: 6 });

    // Education
    drawSectionHeading(ctx, labels.education);
    if (data.education.institution) {
      drawParagraph(ctx, data.education.institution, {
        font: FONT_BOLD,
        gapAfter: 2,
      });
    }
    for (const degree of data.education.degrees) {
      drawBullet(ctx, degree);
    }
    ctx.cursorY += 4;

    // Experience
    drawSectionHeading(ctx, labels.experience);
    for (const item of data.experience) {
      drawExperience(ctx, item.title, item.date, item.bullets);
    }

    // Technical Stack
    drawSectionHeading(ctx, labels.stack);
    for (const cat of data.stack) {
      ensureSpace(ctx, BODY_SIZE + 2);
      doc
        .font(FONT_BOLD)
        .fontSize(BODY_SIZE)
        .fillColor(BLACK)
        .text(`${cat.label}:`, MARGIN, ctx.cursorY, {
          width: contentWidth,
          continued: true,
          lineGap: 2,
        });
      doc
        .font(FONT_FAMILY)
        .fontSize(BODY_SIZE)
        .fillColor(BLACK)
        .text(" " + cat.items, {
          width: contentWidth,
          lineGap: 2,
        });
      const height = doc.heightOfString(`${cat.label}: ${cat.items}`, {
        width: contentWidth,
        font: FONT_FAMILY,
        fontSize: BODY_SIZE,
      });
      ctx.cursorY += height + 2;
    }
    ctx.cursorY += 2;

    // Languages
    drawSectionHeading(ctx, labels.languages);
    for (const lang of data.languages) {
      const text = lang.level ? `${lang.name} — ${lang.level}` : lang.name;
      drawBullet(ctx, text);
    }

    doc.end();
  });
}
