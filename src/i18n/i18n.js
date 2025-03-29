import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import constants
import { LANGUAGE_EN } from "@constants";

// import locales
//import enCommon from './locales/en/common.json';
import enDialogs from "@locales/en/dialogs.json";
//import ukCommon from './locales/uk/common.json';
import ukDialogs from "@locales/uk/dialogs.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      //        common: enCommon,
      dialogs: enDialogs,
    },
    uk: {
      //        common: ukCommon,
      dialogs: ukDialogs,
    },
  },
  lng: LANGUAGE_EN,
  fallbackLng: LANGUAGE_EN,
  interpolation: {
    escapeValue: false,
  },
  //ns: ['common', 'dialogs'],
  ns: ["dialogs"],
  defaultNS: "dialogs",
});

export default i18n;
