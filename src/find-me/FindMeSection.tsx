import { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import BaseSection from "../components/BaseSection";
import { TechImage } from "../technology/TechImage";

function FindMeSection({ ...attrs }: HTMLAttributes<HTMLElement>) {
  const { t } = useTranslation("find-me");
  return (
    <BaseSection
      title={t("Find Me")}
      {...attrs}
    >
      <div className="relative w-full grid grid-cols-[repeat(auto-fit,minmax(80px,max-content))] md:justify-start justify-center gap-4">
        <TechImage
          className="dark:bg-white dark:rounded-full dark:p-1"
          size="medium"
          href="https://github.com/FelixZY"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          value="GitHub"
        />
        <TechImage
          className="dark:bg-white dark:rounded-full dark:p-1"
          size="medium"
          href="https://dribbble.com/FelixZY"
          src="dribbble-logo.svg"
          value="Dribbble"
        />
        <TechImage
          className="rounded-full"
          size="medium"
          href="https://dansdata.se"
          src="dansdata_maskable.webp"
          value="Dansdata"
        />
      </div>
    </BaseSection>
  );
}

export default FindMeSection;
