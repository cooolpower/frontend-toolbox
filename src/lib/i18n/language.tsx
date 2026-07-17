"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "en" | "ko";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }): ReactNode {
  const [language, setLanguageState] = useState<Language>("en");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang === "en" || savedLang === "ko") {
      setLanguageState(savedLang);
    } else {
      // Browser language check
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "ko") {
        setLanguageState("ko");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language: isMounted ? language : "en", setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
