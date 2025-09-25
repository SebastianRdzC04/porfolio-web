export const LANGUAGES = {
  es: "Español",
  en: "English",
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: Language = "es";

// Función para obtener el idioma de la URL o usar el predeterminado
export function getLanguageFromURL(pathname: string): Language {
  const langCode = pathname.split("/")[1];
  if (langCode && langCode in LANGUAGES) {
    return langCode as Language;
  }
  return DEFAULT_LANGUAGE;
}

// Función para obtener rutas traducidas
export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === DEFAULT_LANGUAGE) {
    return path;
  }
  return `/${lang}${path}`;
}

// Función para obtener contenido por idioma
export function getContentByLanguage<T extends { data: { lang?: Language } }>(
  items: T[],
  lang: Language
): T[] {
  return items.filter((item) => (item.data.lang || DEFAULT_LANGUAGE) === lang);
}

// Función para obtener el slug sin el idioma
export function getSlugWithoutLang(slug: string): string {
  const parts = slug.split("/");
  if (parts.length > 1 && parts[parts.length - 1].match(/-(es|en)$/)) {
    const lastPart = parts[parts.length - 1];
    const withoutLang = lastPart.replace(/-(es|en)$/, "");
    return [...parts.slice(0, -1), withoutLang].join("/");
  }
  return slug;
}

// Función para obtener traducciones de contenido
export function getContentTranslations<
  T extends { slug: string; data: { lang?: Language } }
>(allContent: T[], currentSlug: string): Record<Language, T | undefined> {
  const baseSlug = getSlugWithoutLang(currentSlug);

  const translations: Record<Language, T | undefined> = {
    es: undefined,
    en: undefined,
  };

  for (const content of allContent) {
    const contentBaseSlug = getSlugWithoutLang(content.slug);
    if (contentBaseSlug === baseSlug) {
      const lang = content.data.lang || DEFAULT_LANGUAGE;
      translations[lang] = content;
    }
  }

  return translations;
}
