import { GB as FlagGB, SE as FlagSE } from "country-flag-icons/react/3x2";
import i18next from "i18next";
import { useLayoutEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "./components/DarkModeToggle";
import EducationSection from "./education/EducationSection";
import ExperienceSection from "./experience/ExperienceSection";
import FeedbackSection from "./feedback/FeedbackSection";
import { useLocalizedMetaTags } from "./seo/seo";
import TechnologySection from "./technology/TechnologySection";
import { useLanguage } from "./util/hooks";
import WelcomeSection from "./WelcomeSection";
import FindMeSection from "./find-me/FindMeSection";
import classNames from "classnames";

function deObfuscate(value: string) {
  return decodeURIComponent(atob(value)).split("").reverse().join("");
}

function App() {
  const { t } = useTranslation("technology");

  // This will cause our static html to be generated with
  // meta information in the correct language during the
  // postbuild step with react-snap.
  useLocalizedMetaTags();

  const language = useLanguage();
  const location = useLocation();
  // btoa(encodeURIComponent(<email>.split("").reverse().join("")))
  const obfuscatedEmail = "ZXMueXpmJTQweGlsZWY=";

  // useLayoutEffect to ensure language is correct before rendering
  useLayoutEffect(() => {
    if (language !== "sv" && location.pathname.startsWith("/sv")) {
      i18next.changeLanguage("sv");
    } else if (language !== "en" && location.pathname.startsWith("/en")) {
      i18next.changeLanguage("en");
    }
  }, [location, language]);

  return (
    <>
      <header className="container my-8 print:mt-0 print:mx-0 print:px-0 print:w-full print:max-w-none">
        <div className="flex flex-wrap-reverse justify-between items-stretch">
          <div className="relative flex flex-wrap gap-4 justify-center items-center">
            <img
              className="border-2 rounded-full h-24 w-24"
              src={process.env.PUBLIC_URL + "/fzy.webp?v=20240515204230"}
              alt="Felix Zedén Yverås"
            />
            <h1 className="text-[6rem] text-light-on-background dark:text-dark-on-background dark:print:text-light-on-background">
              Felix
              {/* whitespace-nowrap or Zedén Yverås is split in half when printing in chrome */}
              <span className="block display-small print:whitespace-nowrap">
                Zedén Yverås
              </span>
            </h1>
          </div>
          <div className="flex w-full md:w-auto print:w-auto md:flex-col mb-8 md:mb-0 print:mb-0 print:flex-col justify-between md:justify-around print:justify-center items-center md:items-end print:items-end">
            <div className="flex items-center gap-4 print:hidden">
              <DarkModeToggle />

              <div>
                {language.toLowerCase() !== "sv" && (
                  <Link
                    to={"/sv/"}
                    className="block h-6"
                  >
                    <FlagSE className="inline-block align-baseline h-full" />
                    <span className="sr-only">Byt språk till Svenska</span>
                  </Link>
                )}
                {language.toLowerCase() !== "en" && (
                  <Link
                    to={"/en/"}
                    className="block h-6"
                  >
                    <FlagGB className="inline-block align-baseline h-full" />
                    <span className="sr-only">Change language to English</span>
                  </Link>
                )}
              </div>
            </div>
            {navigator.userAgent !== "ReactSnap" ? (
              <address>
                <a href={`mailto:${deObfuscate(obfuscatedEmail)}`}>
                  {deObfuscate(obfuscatedEmail)}
                </a>
              </address>
            ) : (
              <span>
                {/* Span with only &nbsp; to reduce layout jump when rendering mailto link */}
                &nbsp;
              </span>
            )}
          </div>
        </div>
      </header>
      <main className="container min-h-full mb-16 print:mx-0 print:px-0 print:w-full print:max-w-none">
        <WelcomeSection />
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-x-8 mt-4">
          <ExperienceSection className="my-0" />
          <div className="flex flex-col">
            <FindMeSection className="print:hidden" />
            <EducationSection className="my-0" />
            <img
              src={process.env.PUBLIC_URL + "/codingame.webp"}
              alt={t("codingame-alt")}
              className={classNames([
                "mx-auto",
                "w-full",
                "max-w-sm",
                "dark:invert",
                "dark:print:filter-none",
                "border-2",
                "rounded-lg",
                "shadow-md",
                "print:shadow-none",
              ])}
            />
          </div>
        </div>
        <TechnologySection />
        <FeedbackSection />
      </main>
      <footer className="print:hidden bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary">
        <div className="container py-8">
          <p className="py-2">
            <Trans
              i18nKey={"footer_1"}
              components={[
                <a
                  className="underline"
                  href="https://www.typescriptlang.org/"
                >
                  Typescript
                </a>,
                <a
                  className="underline"
                  href="https://reactjs.org/"
                >
                  React
                </a>,
                <a
                  className="underline"
                  href="https://tailwindcss.com/"
                >
                  tailwindcss
                </a>,
              ]}
            />
          </p>
          <p className="py-2">
            <Trans
              i18nKey="footer_2"
              components={[
                <a
                  className="underline"
                  href="https://m3.material.io/"
                >
                  Material Design (v3)
                </a>,
                <a
                  className="underline"
                  href="https://devicon.dev/"
                >
                  Devicon
                </a>,
              ]}
            />
          </p>
          <p className="py-2">
            <Trans
              i18nKey="footer_3"
              components={[
                <a
                  className="underline"
                  href="https://github.com/FelixZY/curriculum-vitae-web"
                >
                  GitHub
                </a>,
                <a
                  className="underline"
                  href="https://pages.github.com/"
                >
                  GitHub Pages
                </a>,
              ]}
            />
          </p>
          <p className="py-2">
            <Trans
              i18nKey="footer_4"
              components={[
                <button
                  className="underline font-normal"
                  onClick={(e) => {
                    e.preventDefault();
                    window.print();
                    return false;
                  }}
                >
                  print
                </button>,
              ]}
            />
          </p>
          <p className="py-2">&copy; 2025 Felix Zedén Yverås</p>
        </div>
      </footer>
    </>
  );
}

export default App;
