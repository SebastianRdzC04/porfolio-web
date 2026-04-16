import type { Language } from "./i18n";

export const ui = {
  es: {
    "nav.home": "Inicio",
    "nav.about": "Acerca de",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "projects.title": "Mis Proyectos",
    "projects.personalTitle": "Proyectos Personales",
    "projects.viewProject": "Ver Proyecto",
    "projects.technologies": "Tecnologías",
    "about.title": "Acerca de Mí",
    "about.techSection": "Lenguajes y Tecnologías",
    "about.languages": "Lenguajes",
    "about.frameworks": "Frameworks",
    "about.tools": "Herramientas",
    "contact.title": "Contáctame",
    "contact.intro":
      "¿Tienes un proyecto interesante o una oportunidad de trabajo? ¡No dudes en contactarme!",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappDesc": "Respuesta rápida por mensaje directo",
    "contact.email": "Correo Electrónico",
    "contact.emailDesc": "Para propuestas formales y documentación",
    "contact.response": "Respuesta garantizada en menos de 24 horas",
    "lang.switchTo": "Switch to English",
    "projects.github": "Ver en GitHub",
    "projects.demo": "Ver Demo",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "projects.title": "My Projects",
    "projects.personalTitle": "Personal Projects",
    "projects.viewProject": "View Project",
    "projects.technologies": "Technologies",
    "about.title": "About Me",
    "about.techSection": "Languages and Technologies",
    "about.languages": "Languages",
    "about.frameworks": "Frameworks",
    "about.tools": "Tools",
    "contact.title": "Contact Me",
    "contact.intro":
      "Do you have an interesting project or job opportunity? Don't hesitate to contact me!",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappDesc": "Quick response via direct message",
    "contact.email": "Email",
    "contact.emailDesc": "For formal proposals and documentation",
    "contact.response": "Guaranteed response within 24 hours",
    "lang.switchTo": "Cambiar a Español",
    "projects.github": "View on GitHub",
    "projects.demo": "View Demo",
  },
} as const;

// Tipo para las claves de traducción
export type TranslationKey = keyof typeof ui.es;

// Hook de traducciones con tipado fuerte
export function useTranslations(lang: Language) {
  return function t(key: TranslationKey): string {
    return ui[lang]?.[key] ?? ui.es[key] ?? key;
  };
}

// Función alternativa para obtener una traducción específica
export function getTranslation(lang: Language, key: TranslationKey): string {
  return ui[lang]?.[key] ?? ui.es[key] ?? key;
}
