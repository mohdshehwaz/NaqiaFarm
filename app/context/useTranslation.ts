import { useLanguage } from "../context/LanguageContext";
import i18n from "../localization";

export const useTranslation = () => {
  const { language } = useLanguage();

  // 🔥 THIS LINE MAKES IT GLOBAL
  i18n.locale = language;

  return {
    t: (key: string) => i18n.t(key),
  };
};
