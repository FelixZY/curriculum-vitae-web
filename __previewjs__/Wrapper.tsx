import { GB as FlagGB, SE as FlagSE } from "country-flag-icons/react/3x2";
import i18next from "i18next";
import { useEffect } from "react";
import { initReactI18next } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import enTranslation from "../public/locales/en/translation.json";
import svTranslation from "../public/locales/sv/translation.json";
import "../src/index.css";

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: ["en", "sv"],
  resources: {
    en: {
      translation: enTranslation,
    },
    sv: {
      translation: svTranslation,
    },
  },
  debug: process.env.NODE_ENV !== "production",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export const Wrapper: React.FunctionComponent<{}> = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", prefersDarkMode);
  }, [prefersDarkMode]);
  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;1,400;1,500&family=Noto+Sans:ital,wght@0,400;0,500;1,400;1,500&display=swap"
        rel="stylesheet"
      />
      <div
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          padding: "8px 10%",
          height: "45px",
          background: "#ccc",
          boxSizing: "border-box",
          justifyContent: "center",
          gap: "5%",
          zIndex: 99999,
        }}
      >
        <button
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: "#000" }}
          >
            light_mode
          </span>
        </button>
        <button
          style={{
            height: "100%",
          }}
          onClick={() => i18next.changeLanguage("sv")}
        >
          <FlagSE height={"100%"} />
        </button>
        <button
          style={{
            height: "100%",
          }}
          onClick={() => i18next.changeLanguage("en")}
        >
          <FlagGB height={"100%"} />
        </button>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          backgroundImage:
            "linear-gradient(45deg, rgba(0, 0, 0, .1) 25%, transparent 25%), linear-gradient(-45deg, rgba(0, 0, 0, .1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, .1) 75%), linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, .1) 75%)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          boxSizing: "border-box",
          padding: "2rem",
        }}
      >
        {children}
      </div>
    </>
  );
};
