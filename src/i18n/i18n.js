import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import constants
import { LANGUAGE_EN } from "@constants";

// import locales en locales
import enDialogs from "@enLocales/dialogs.json";
import enCredits from "@enLocales/credits.json";
import enScores from "@enLocales/scores.json";

// import locales uk locales
import ukDialogs from "@ukLocales/dialogs.json";
import ukCredits from "@ukLocales/credits.json";
import ukScores from "@ukLocales/scores.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      dialogs: enDialogs,
      credits: enCredits,
      scores: enScores,
    },
    uk: {
      dialogs: ukDialogs,
      credits: ukCredits,
      scores: ukScores,
    },
  },
  lng: LANGUAGE_EN,
  //lng: "uk",
  fallbackLng: LANGUAGE_EN,
  interpolation: {
    escapeValue: false,
  },
  ns: ["dialogs", "credits", "scores"],
  defaultNS: "dialogs",
});

export default i18n;
