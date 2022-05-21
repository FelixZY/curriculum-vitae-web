import { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import BaseSection from "../components/BaseSection";
import { toTimeframeArray } from "../util/jsonSchema";
import Experience from "./Experience";
import experienceJson from "./experience.json";

function ExperienceSection({ ...attrs }: HTMLAttributes<HTMLElement>) {
  const { t } = useTranslation("experience");
  return (
    <BaseSection
      title={t("Experience")}
      {...attrs}
    >
      {experienceJson.items.map((e, i) => (
        <Experience
          key={i}
          title={t(e.title.i18nKey)}
          company={{
            name: t(e.company.name.i18nKey),
            url: e.company.url,
          }}
          description={e.description && t(e.description.i18nKey)}
          timeframes={toTimeframeArray(e.timeframes)}
          locations={e.locations}
        />
      ))}
    </BaseSection>
  );
}

export default ExperienceSection;
