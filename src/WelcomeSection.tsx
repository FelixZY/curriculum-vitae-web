import { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import BaseSection from "./components/BaseSection";
import "./welcome.css";

function WelcomeSection({ ...attrs }: HTMLAttributes<HTMLElement>) {
  const { t } = useTranslation("welcome");
  return (
    <BaseSection
      {...attrs}
      title={t("Hi!")}
      isArticle
      className={`welcome ${attrs.className ?? ""}`}
    >
      {/*
       * Include classnames used in markdown to avoid loosing them during tree-shaking.
       */}
      {false && <p className="hidden body-large text-right mt-4"></p>}
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {t("welcome-body")}
      </ReactMarkdown>
    </BaseSection>
  );
}

export default WelcomeSection;
