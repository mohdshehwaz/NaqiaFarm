import i18n from "i18n-js";
import * as Localization from "expo-localization";

import en from "./en";
import hi from "./hi";
import ur from "./ur";

i18n.translations = {
  en,
  hi,
  ur,
};

i18n.fallbacks = true;

// initial language
i18n.locale =
  Localization.getLocales()[0]?.languageCode ?? "en";

export default i18n;
