import { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import BaseSection from "../components/BaseSection";
import { toTimeframeArray } from "../util/jsonSchema";
import Education from "./Education";
import educationJson from "./education.json";

function EducationSection({ ...attrs }: HTMLAttributes<HTMLElement>) {
  const { t } = useTranslation("education");
  return (
    <BaseSection
      title={t("Education")}
      {...attrs}
    >
      {educationJson.items.map((e, i) => (
        <Education
          key={i}
          title={t(e.title.i18nKey)}
          educator={{
            ...e.educator,
            name: t(e.educator.name.i18nKey),
          }}
          courses={e.courses.map((course) => ({
            ...course,
            title: t(course.title.i18nKey),
            timeframes: toTimeframeArray(course.timeframes),
          }))}
        />
      ))}
    </BaseSection>
  );
}

export default EducationSection;
