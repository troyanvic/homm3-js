import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import constants
import { LANGUAGE_EN } from "@constants";

// import locales en locales
import enDialogs from "@locales/en/dialogs.json";
import enCredits from "@locales/en/credits.json";

// import locales uk locales
import ukDialogs from "@locales/uk/dialogs.json";
import ukCredits from "@locales/uk/credits.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      dialogs: enDialogs,
      credits: enCredits,
    },
    uk: {
      dialogs: ukDialogs,
      credits: ukCredits,
    },
  },
  lng: LANGUAGE_EN,
  //lng: "uk",
  fallbackLng: LANGUAGE_EN,
  interpolation: {
    escapeValue: false,
  },
  ns: ["dialogs", "credits"],
  defaultNS: "dialogs",
});

export default i18n;
