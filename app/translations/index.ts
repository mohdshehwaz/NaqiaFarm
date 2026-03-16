import en from "../localization/en";
import hi from "../localization/hi";
import ur from "../localization/ur";

export const translations = {
  en,
  hi,
  ur
};

export type Language = keyof typeof translations;