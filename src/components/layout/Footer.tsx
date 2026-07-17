"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language";
import { translations } from "@/lib/i18n/translations";
import styles from "./Layout.module.css";

export function Footer(): ReactNode {
  const { language } = useLanguage();
  const t = translations[language].common;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <Link href="/about" className={styles.navLink}>
          {t.aboutUs}
        </Link>
        <Link href="/contact" className={styles.navLink}>
          {t.contact}
        </Link>
        <Link href="/privacy-policy" className={styles.navLink}>
          {t.privacyPolicy}
        </Link>
        <Link href="/terms" className={styles.navLink}>
          {t.termsOfService}
        </Link>
      </div>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Frontend Toolbox. {t.rightsReserved}
      </div>
    </footer>
  );
}
