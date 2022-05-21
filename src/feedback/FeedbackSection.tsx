import { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import BaseSection from "../components/BaseSection";
import Feedback from "./Feedback";
import feedbackJson from "./feedback.json";

function FeedbackSection({ ...attrs }: HTMLAttributes<HTMLElement>) {
  const { t } = useTranslation("feedback");
  return (
    <BaseSection
      title="Feedback"
      {...attrs}
    >
      <div className="grid print:block grid-cols-1 md:grid-cols-2 xl:grid-cols-3 print:grid-cols-2 gap-x-32 gap-y-16 mt-8 print:mt-0 print:text-center">
        {feedbackJson.items
          .filter((it) => t(it.quote.i18nKey))
          .map((f, i) => (
            <Feedback
              key={i}
              quote={t(f.quote.i18nKey)}
              authors={f.authors.map((it) => ({
                name: t(it.name.i18nKey),
                url: it.url,
              }))}
            />
          ))}
      </div>
    </BaseSection>
  );
}

export default FeedbackSection;
