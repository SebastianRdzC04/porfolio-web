declare global {
  namespace App {
    interface Locals {
      lang: import("./utils/i18n").Language;
    }
  }
}

export {};
