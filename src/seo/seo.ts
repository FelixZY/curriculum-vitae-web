import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../util/hooks";

export function useLocalizedMetaTags() {
  const { t } = useTranslation("seo");
  const language = useLanguage();
  useEffect(() => {
    document.documentElement.lang = language;
    (
      document.head.querySelector(
        'meta[name="og:description"]'
      ) as HTMLMetaElement
    ).content = t("description");
    (
      document.head.querySelector('meta[name="description"]') as HTMLMetaElement
    ).content = t("description");
    (
      document.head.querySelector('meta[name="og:url"]') as HTMLMetaElement
    ).content = `https://fzy.se/${language}/`;
  }, [language, t]);
}
