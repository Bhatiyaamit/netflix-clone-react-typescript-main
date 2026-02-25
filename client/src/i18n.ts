import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json";

const STORAGE_KEY = "i18nextLng";

// Read persisted language or default to English
const savedLanguage = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY) || "en";
  } catch {
    return "en";
  }
})();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already handles XSS
  },
});

// Persist language to localStorage and update <html lang=""> on change
i18n.on("languageChanged", (lng: string) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // ignore storage errors
  }
});

// Set initial <html lang="">
document.documentElement.lang = savedLanguage;

export default i18n;
