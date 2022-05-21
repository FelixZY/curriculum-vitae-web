import { useTranslation } from "react-i18next";
import { useLanguage } from "./hooks";
import { LocalizedString, Timeframe } from "./jsonSchema";

function isLocalizedString(timeframe: Timeframe): timeframe is LocalizedString {
  return "i18nKey" in timeframe;
}

export function useTimeframeToJsxConverter(): (
  timeframe: Timeframe
) => JSX.Element {
  const { t } = useTranslation();
  const language = useLanguage();
  return (timeframe: Timeframe) => (
    <>
      {isLocalizedString(timeframe) ? (
        t(timeframe.i18nKey)
      ) : (
        <>
          <time dateTime={timeframe.from.toISOString().substring(0, 7)}>
            {timeframe.from.toLocaleDateString(language, {
              year: "numeric",
              month: "long",
            })}
          </time>
          {" - "}
          {(timeframe.to && (
            <time dateTime={timeframe.to.toISOString().substring(0, 7)}>
              {timeframe.to?.toLocaleDateString(language, {
                year: "numeric",
                month: "long",
              })}
            </time>
          )) ||
            t("present")}
        </>
      )}
    </>
  );
}
