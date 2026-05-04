import type { Language } from "./i18n";

export const ui = {
  es: {
    "nav.home": "Inicio",
    "nav.about": "Acerca de",
    "nav.projects": "Proyectos",
    "nav.clients": "Clientes",
    "nav.contact": "Contacto",
    "projects.title": "Mis Proyectos",
    "projects.personalTitle": "Proyectos Personales",
    "projects.viewProject": "Ver Proyecto",
    "projects.technologies": "Tecnologías",
    "clients.title": "Clientes activos",
    "clients.lead":
      "Aquí centralizo a los clientes con los que estoy trabajando actualmente. Cada expediente reúne la información técnica, visual y operativa del sistema para mantener una comunicación clara y ordenada.",
    "clients.sectionLabel": "Área de clientes",
    "clients.cardLabel": "Expediente abierto",
    "clients.cardButton": "Ver expediente",
    "clients.detailIntro":
      "Este espacio funciona como un punto de trabajo compartido: aquí se publican documentos, avances, mockups y notas para mantener alineado el proyecto.",
    "clients.documentsTitle": "Documentos del cliente",
    "clients.documentsLead": "Selecciona un archivo para revisar cada tema con más detalle.",
    "clients.back": "Volver a clientes",
    "clients.currentTag": "Cliente actual",
    "clients.noDocs": "Aún no hay documentos publicados para este cliente.",
    "clients.pending": "El contenido en inglés de esta sección está pendiente.",
    "clients.placeholder": "Contenido disponible en español por ahora.",
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
    "nav.clients": "Clients",
    "nav.contact": "Contact",
    "projects.title": "My Projects",
    "projects.personalTitle": "Personal Projects",
    "projects.viewProject": "View Project",
    "projects.technologies": "Technologies",
    "clients.title": "Active Clients",
    "clients.lead":
      "This area centralizes the clients I'm currently working with. Each dossier gathers technical, visual and operational information to keep communication clear and organized.",
    "clients.sectionLabel": "Client area",
    "clients.cardLabel": "Open dossier",
    "clients.cardButton": "View dossier",
    "clients.detailIntro":
      "This space works as a shared workspace: documents, progress updates, budgets, mockups and notes are published here to keep the project aligned.",
    "clients.documentsTitle": "Client documents",
    "clients.documentsLead": "Select a file to review each topic in more detail.",
    "clients.back": "Back to clients",
    "clients.currentTag": "Current client",
    "clients.noDocs": "There are no published documents for this client yet.",
    "clients.pending": "The English content for this section is pending.",
    "clients.placeholder": "Content is available in Spanish for now.",
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
