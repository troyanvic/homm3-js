import i18n from "./i18n";

// import constants
import { LANGUAGE_EN, LANGUAGE_UK } from "@constants";

export const setLanguage = (language) => {
  return i18n.changeLanguage(language);
};

export const getCurrentLanguage = () => {
  return i18n.language;
};

export const getAvailableLanguages = () => {
  return [LANGUAGE_EN, LANGUAGE_UK];
};
