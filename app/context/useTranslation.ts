import { useLanguage } from "../context/LanguageContext";
import i18n from "../localization";

export const useTranslation = () => {
  const { language } = useLanguage();

  i18n.locale = language;

  return {
    t: (key: string, options?: any) => i18n.t(key, options),
  };
};