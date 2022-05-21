import { fireEvent, render, screen } from "@testing-library/react";
import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import React from "react";
import { act } from "react-dom/test-utils";
import { initReactI18next } from "react-i18next";
import translation from "../../public/locales/en/translation.json";
import SiteSettingsStore from "../storage/SiteSettingsStore";
import DarkModeToggle from "./DarkModeToggle";

beforeAll(() => {
  i18next
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      supportedLngs: ["en"],
      resources: {
        en: {
          translation,
        },
      },
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });
});

beforeEach(() => {
  localStorage.clear();
});

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

async function testToggleCycle(cycle: (keyof typeof translation)[]) {
  for (let i = 0; i < cycle.length; i++) {
    const i18nKey = cycle[i];
    const toggleButton = screen.getByRole("button");

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent(translation[i18nKey]);

    if (i + 1 < cycle.length) {
      const writePromise = act(async () =>
        SiteSettingsStore.writePromise.then()
      );
      fireEvent.click(toggleButton);
      await writePromise;
    }
  }
}

test("(prefers-color-scheme: light): auto -> dark -> light x3", async () => {
  // mock prefers-color-scheme: light/none
  mockMatchMedia(false);

  render(<DarkModeToggle />);

  await testToggleCycle(
    Array(3)
      .fill(["dark mode: auto", "dark mode: dark", "dark mode: light"])
      .flat()
  );
});

test("(prefers-color-scheme: dark): auto -> light -> dark x3", async () => {
  // mock prefers-color-scheme: dark
  mockMatchMedia(true);

  render(<DarkModeToggle />);

  await testToggleCycle(
    Array(3)
      .fill(["dark mode: auto", "dark mode: light", "dark mode: dark"])
      .flat()
  );
});
