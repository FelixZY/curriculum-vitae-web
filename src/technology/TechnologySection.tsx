import classNames from "classnames";
import { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import BaseSection from "../components/BaseSection";

function TechImage({
  href,
  src,
  value,
  size,
  ...attrs
}: {
  href: string;
  src: string;
  value: string;
  size: "medium" | "large";
} & HTMLAttributes<HTMLImageElement>) {
  return (
    <a
      href={href}
      className={classNames([
        "inline-block",
        "align-top",
        "break-inside-avoid",
        {
          "xl:w-1/12": size === "large",
          "print:xl:w-[5%]": size === "large",
          "lg:w-[10%]": size === "large",
          "print:lg:w-[6.25%]": size === "large",
          "md:w-1/6": size === "large",
          "print:md:w-[10%]": size === "large",
          "sm:w-1/5": size === "large",
          "print:sm:w-[12.5%]": size === "large",
          "xs:w-1/4": size === "large",
          "print:xs:w-1/6": size === "large",
          "w-1/4": size === "large",
          "print:w-1/5": size === "large",
        },
        {
          "xl:w-[6.25%]": size === "medium",
          "print:xl:w-[3.5%]": size === "medium",
          "lg:w-1/12": size === "medium",
          "print:lg:w-[5%]": size === "medium",
          "md:w-[12.5%]": size === "medium",
          "print:md:w-1/12": size === "medium",
          "print:sm:w-[10%]": size === "medium",
          "xs:w-1/6": size === "medium",
          "print:xs:w-[12.5%]": size === "medium",
          "w-1/4": size === "medium",
          "print:w-1/5": size === "medium",
        },
      ])}
    >
      <figure className="text-center transition-transform hover:motion-safe:scale-110 mb-4">
        <div className="px-4 pb-2">
          <img
            {...attrs}
            src={src}
            className={`inline-block aspect-square ${attrs.className ?? ""}`}
            alt={`${value} logo`}
          />
        </div>
        <figcaption className={`label-${size} text-primary`}>
          {value}
        </figcaption>
      </figure>
    </a>
  );
}

function TechnologySection({ ...attrs }: HTMLAttributes<HTMLElement>) {
  const { t } = useTranslation("technology");
  return (
    <BaseSection
      title="Tech"
      {...attrs}
    >
      <div
        className={classNames([
          "md:float-right",
          "print:sm:float-right",
          "w-10/12",
          "print:xs:w-1/2",
          "md:w-1/2",
          "print:md:w-1/3",
          "lg:w-1/3",
          "mx-auto",
          "print:sm:pl-8",
          "print:sm:mx-0",
          "md:pl-8",
          "md:mx-0",
          "mb-8",
        ])}
      >
        <img
          src={process.env.PUBLIC_URL + "/codingame.webp"}
          alt={t("codingame-alt")}
          className={classNames([
            "dark:invert",
            "dark:print:filter-none",
            "w-full",
            "border-2",
            "rounded-lg",
            "shadow-md",
            "print:shadow-none",
          ])}
        />
      </div>
      <div className="relative block mt-8 z-10">
        <TechImage
          size="large"
          href="https://www.android.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg"
          value="Android"
        />
        <TechImage
          size="large"
          href="https://kotlinlang.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"
          value="Kotlin"
        />
        <TechImage
          size="large"
          href="https://www.postgresql.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
          value="SQL"
        />
        <TechImage
          size="large"
          href="https://www.typescriptlang.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
          value={"Type\u00ADscript"}
        />
      </div>
      <hr className="border-dashed border-t-2 my-8 break-before-avoid break-after-avoid" />
      <div className="relative block print:block mt-8">
        <TechImage
          size="medium"
          href="https://azure.microsoft.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg"
          value="Azure"
        />
        <TechImage
          size="medium"
          href="https://bun.sh/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg"
          value="Bun"
        />
        <TechImage
          size="medium"
          href="https://docs.microsoft.com/en-us/dotnet/csharp/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
          value="C#"
        />
        <TechImage
          size="medium"
          href="https://developer.mozilla.org/en-US/docs/Web/CSS"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
          value="CSS"
        />
        <TechImage
          size="medium"
          href="https://dart.dev/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg"
          value="Dart"
        />
        <TechImage
          size="medium"
          href="https://www.docker.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
          value="Docker"
        />
        <TechImage
          size="medium"
          href="https://www.figma.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
          value="Figma"
        />
        <TechImage
          size="medium"
          href="https://firebase.google.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg"
          value="Firebase"
        />
        <TechImage
          size="medium"
          href="https://flutter.dev/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
          value="Flutter"
        />
        <TechImage
          size="medium"
          href="https://git-scm.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
          value="Git"
        />
        <TechImage
          className="dark:bg-white dark:print:bg-none dark:rounded-full dark:print:rounded-none dark:p-1 dark:print:p-0"
          size="medium"
          href="https://github.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          value="GitHub"
        />
        <TechImage
          size="medium"
          href="https://gitlab.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg"
          value="GitLab"
        />
        <TechImage
          className="dark:bg-white dark:print:bg-none dark:rounded-md dark:print:rounded-none dark:p-1 dark:print:p-0"
          size="medium"
          href="https://gradle.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gradle/gradle-original.svg"
          value="Gradle"
        />
        <TechImage
          size="medium"
          href="https://graphql.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg"
          value="GraphQL"
        />
        <TechImage
          size="medium"
          href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
          value="HTML"
        />
        <TechImage
          size="medium"
          href="https://www.java.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
          value="Java"
        />
        <TechImage
          size="medium"
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
          value={"Java\u00ADscript"}
        />
        <TechImage
          className="dark:p-1 dark:bg-white dark:print:bg-none dark:rounded-full dark:print:rounded-none"
          size="medium"
          href="https://www.latex-project.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/latex/latex-original.svg"
          value="LaTeX"
        />
        <TechImage
          size="medium"
          href="https://en.wikipedia.org/wiki/Linux"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
          value="Linux"
        />
        <TechImage
          size="medium"
          href="https://nextjs.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
          value="NextJS"
        />
        <TechImage
          size="medium"
          href="https://nodejs.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
          value="NodeJS"
        />
        <TechImage
          size="medium"
          href="https://www.openapis.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg"
          value={"Open\u00ADAPI"}
        />
        <TechImage
          size="medium"
          href="https://www.php.net/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
          value="PHP"
        />
        <TechImage
          size="medium"
          href="https://www.python.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
          value="Python"
        />
        <TechImage
          size="medium"
          href="https://reactjs.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          value="React"
        />
        <TechImage
          className="dark:p-1 dark:bg-white dark:print:bg-none dark:rounded-full dark:print:rounded-none"
          size="medium"
          href="https://www.rust-lang.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg"
          value="Rust"
        />
        <TechImage
          size="medium"
          href="https://sass-lang.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"
          value="Sass"
        />
        <TechImage
          size="medium"
          href="https://tailwindcss.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
          value={"tailwind\u00ADcss"}
        />
        <TechImage
          className="dark:invert dark:print:filter-none"
          size="medium"
          href="https://vercel.com/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg"
          value={"Vercel"}
        />
        <TechImage
          size="medium"
          href="https://webpack.js.org/"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg"
          value={"Web\u00ADpack"}
        />
      </div>
      <div className="clear-both"></div>
    </BaseSection>
  );
}

export default TechnologySection;
