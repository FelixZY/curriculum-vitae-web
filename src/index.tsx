import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import React from "react";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LanguageDetector from "./util/LanguageDetector";

i18next
  .use(I18NextHttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "sv"],
    debug: process.env.NODE_ENV !== "production",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

// The HTML generated by react snap causes errors when calling
// `hydrateRoot(` as described in docs. Skip this step.
const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<App />}
        />
        <Route
          path="/en"
          element={<App />}
        />
        <Route
          path="/sv"
          element={<App />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();