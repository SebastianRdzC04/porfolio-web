import { defineMiddleware } from "astro:middleware";
import { LANGUAGES, DEFAULT_LANGUAGE, getLanguageFromURL } from "./utils/i18n";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url } = context;
  const pathname = url.pathname;

  // Obtener idioma de la URL
  const lang = getLanguageFromURL(pathname);

  // Añadir el idioma al contexto local para uso en componentes
  context.locals.lang = lang;

  // Verificar si la ruta existe para el idioma
  if (lang !== DEFAULT_LANGUAGE) {
    const langCode = pathname.split("/")[1];
    if (!Object.keys(LANGUAGES).includes(langCode)) {
      // Si el idioma no es válido, redirigir a la página principal en el idioma por defecto
      return context.redirect("/");
    }
  }

  return next();
});
