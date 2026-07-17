"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/lib/i18n/language";
import { translations } from "@/lib/i18n/translations";
import styles from "./Layout.module.css";

export function Header(): ReactNode {
  const { language } = useLanguage();
  const t = translations[language].common;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <span>Frontend Toolbox</span>
      </Link>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          {t.allTools}
        </Link>
        <Link href="/about" className={styles.navLink}>
          {t.about}
        </Link>
        <LanguageToggle />
        <ThemeToggle />
      </nav>
    </header>
  );
}
