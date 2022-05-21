import { ReactComponent as BrightnessAuto } from "@material-design-icons/svg/outlined/brightness_auto.svg";
import { ReactComponent as DarkMode } from "@material-design-icons/svg/outlined/dark_mode.svg";
import { ReactComponent as LightMode } from "@material-design-icons/svg/outlined/light_mode.svg";
import classNames from "classnames";
import React, { useLayoutEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import { useDataStore } from "../storage/DataStore";
import SiteSettingsStore from "../storage/SiteSettingsStore";

function useDarkMode(): {
  toggleSetting: "light" | "dark" | "auto";
  prefersDarkMode: boolean;
  isDarkMode: boolean;
  setDarkMode: (darkmode: "light" | "dark" | "auto") => void;
} {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const siteSettings = useDataStore(SiteSettingsStore)[0];
  const isDarkMode = useMemo(
    () =>
      ({
        auto: () => prefersDarkMode,
        light: () => false,
        dark: () => true,
      }[siteSettings.darkmode]()),
    [siteSettings.darkmode, prefersDarkMode]
  );
  // useLayoutEffect to prevent flicker
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  return {
    toggleSetting: siteSettings.darkmode,
    prefersDarkMode,
    isDarkMode,
    setDarkMode: (darkmode: "light" | "dark" | "auto") => {
      SiteSettingsStore.mutate((siteSettings) => {
        siteSettings.darkmode = darkmode;
      });
    },
  };
}

function DarkModeToggle({ ...attrs }: React.ComponentProps<"button">) {
  const { t } = useTranslation();
  const { toggleSetting, prefersDarkMode, isDarkMode, setDarkMode } =
    useDarkMode();
  return (
    <button
      {...attrs}
      className={classNames([
        ...(attrs.className?.split(" ") ?? []),
        "relative",
        "w-14",
        "h-8",
        "focus:outline-none",
        "group",
      ])}
      onClick={() => {
        if (toggleSetting === "auto") {
          setDarkMode(prefersDarkMode ? "light" : "dark");
        } else if (prefersDarkMode === isDarkMode) {
          setDarkMode("auto");
        } else {
          setDarkMode(isDarkMode ? "light" : "dark");
        }
      }}
    >
      <div
        className={classNames([
          "absolute",
          "top-0",
          "left-0",
          "rounded-full",
          "box-border",
          "h-full",
          "w-full",

          // Track color
          "bg-light-surface-variant",
          "dark:bg-dark-primary",

          // Border
          "border-2",
          "border-light-outline",
          "dark:border-dark-primary",
        ])}
      >
        <span
          className={classNames([
            "absolute",
            "transition-all",
            "rounded-full",
            "top-1/2",
            "left-0",
            "-translate-y-1/2",
            "group-focus:shadow-[0px_0px_0px_0.5rem_rgb(0,0,0,0.15)]",
            "dark:group-focus:shadow-[0px_0px_0px_0.5rem_rgb(255,255,255,0.15)]",

            // Size & location of thumb
            "h-6",
            "w-6",
            "ml-[2px]",
            {
              "translate-x-0": toggleSetting === "light",
              "translate-x-1/2": toggleSetting === "auto",
              "translate-x-full": toggleSetting === "dark",
            },

            // Thumb color
            "bg-light-outline",
            "dark:bg-dark-on-primary",

            // Icon color
            "fill-light-surface-variant",
            "dark:fill-dark-on-primary-container",
          ])}
        >
          {toggleSetting === "auto" && (
            <BrightnessAuto className="mx-auto w-4" />
          )}
          {toggleSetting === "light" && <LightMode className="mx-auto w-4" />}
          {toggleSetting === "dark" && <DarkMode className="mx-auto w-4" />}
        </span>
      </div>
      <span className="sr-only">{t(`dark mode: ${toggleSetting}`)}</span>
    </button>
  );
}

export default DarkModeToggle;
