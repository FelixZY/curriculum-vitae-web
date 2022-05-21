export type LocalizedString = { i18nKey: string };
export type Timeframe = { from: Date; to?: Date } | LocalizedString;
export type Location = { city: string };

function isLocalizedString(
  timeframe: { from: string; to?: string } | LocalizedString
): timeframe is LocalizedString {
  return "i18nKey" in timeframe;
}

export function toTimeframeArray(
  timeframes: ({ from: string; to?: string } | LocalizedString)[]
): Timeframe[] {
  return timeframes.map((it) =>
    isLocalizedString(it)
      ? it
      : {
          from: new Date(it.from),
          to: (it.to && new Date(it.to)) || undefined,
        }
  );
}
