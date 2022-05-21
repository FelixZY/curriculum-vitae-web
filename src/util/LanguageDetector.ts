import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

export default class LanguageDetector extends I18nextBrowserLanguageDetector {
  detect(detectionOrder?: string[]): string | string[] | undefined {
    if (window.location.pathname.includes("/sv/")) {
      return "sv";
    } else if (window.location.pathname.includes("/en/")) {
      return "en";
    } else return super.detect(detectionOrder);
  }
}
