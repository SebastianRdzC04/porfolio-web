import { defineMiddleware } from "astro:middleware";
import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  getLanguageFromURL,
  type Language,
} from "./utils/i18n";

const VALID_LANGUAGES = Object.keys(LANGUAGES) as Language[];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url } = context;
  const pathname = url.pathname;

  // Obtener idioma de la URL
  const lang = getLanguageFromURL(pathname);

  // Añadir el idioma al contexto local para uso en componentes
  context.locals.lang = lang;

  // Verificar si la ruta tiene un prefijo de idioma inválido
  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  // Si el primer segmento parece ser un código de idioma pero no es válido
  if (
    firstSegment &&
    firstSegment.length === 2 &&
    !VALID_LANGUAGES.includes(firstSegment as Language)
  ) {
    // Redirigir a la página principal si el idioma no es válido
    return context.redirect("/");
  }

  // Establecer headers para indicar el idioma de la respuesta
  const response = await next();
  response.headers.set("Content-Language", lang);

  return response;
});
