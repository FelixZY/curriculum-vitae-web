import i18next from "i18next";
import { useEffect, useState } from "react";

export function useExpiringEffect(
  effect: (getExpired: () => boolean) => void | (() => void)
) {
  useEffect(() => {
    let isExpired = false;
    const destructor = effect(() => isExpired);
    return () => {
      isExpired = false;
      if (destructor) {
        destructor();
      }
    };
  }, [effect]);
}

export function useLanguage(): string {
  // i18next.language can be null during early loading sometimes.
  // Seems like a bug. Use a simple "en" fallback as that is our default
  // fallback language.
  const [lng, setLng] = useState(i18next.language ?? "en");

  useEffect(() => {
    const setLanguage = setLng;
    i18next.on("languageChanged", setLanguage);
    return () => {
      i18next.off("languageChanged", setLanguage);
    };
  }, [setLng]);

  return lng;
}
