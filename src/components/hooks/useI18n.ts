import { type LocaleKey, localeKeyMap } from "@/lib/i18n/localize";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const getLang = (locale: string | undefined): LocaleKey => {
  switch (locale) {
    case "ja":
      return "ja";
    default:
      return "en";
  }
};

interface I18nState {
  lang: LocaleKey;
  t: Record<string, string>;
  onChange: (lang: LocaleKey) => void;
}

export const useI18n = (): I18nState => {
  const router = useRouter();
  const lang = getLang(router.locale);

  const [currentLang, setCurrentLang] = useState<LocaleKey>(lang);

  const handleOnChange = useCallback<I18nState["onChange"]>((lang) => {
    setCurrentLang(lang);
  }, []);

  return { lang: currentLang, t: localeKeyMap[lang], onChange: handleOnChange };
};
