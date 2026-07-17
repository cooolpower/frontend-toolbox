"use client";

import { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/language";
import styles from "./Layout.module.css";

export function LanguageToggle(): ReactNode {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.languageToggleContainer}>
      <button
        onClick={() => setLanguage("en")}
        className={`${styles.langBtn} ${language === "en" ? styles.activeLang : ""}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className={styles.divider}>/</span>
      <button
        onClick={() => setLanguage("ko")}
        className={`${styles.langBtn} ${language === "ko" ? styles.activeLang : ""}`}
        aria-label="한국어로 변경"
      >
        KO
      </button>
    </div>
  );
}
