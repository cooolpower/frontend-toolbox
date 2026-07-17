"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { getAllTools } from "@/features/tools/registry";
import { CATEGORY_LABELS, CATEGORY_LABELS_KO } from "@/features/tools/types";
import { Card, CardBody } from "@/components/ui/Card";
import { useLanguage } from "@/lib/i18n/language";
import { translations } from "@/lib/i18n/translations";
import styles from "./page.module.css";

export default function Home(): ReactNode {
  const { language } = useLanguage();
  const t = translations[language].home;
  const commonT = translations[language].common;
  const tools = getAllTools();

  // Group tools by categories
  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <div>
      {/* Premium Hero Section */}
      <section className={styles.hero}>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </section>

      {/* Categories & Tool Cards */}
      <section className={styles.content}>
        {categories.map((cat) => {
          const categoryTools = tools.filter((t) => t.category === cat);
          const categoryLabel = language === "ko" ? CATEGORY_LABELS_KO[cat] : CATEGORY_LABELS[cat];

          return (
            <div key={cat} className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>{categoryLabel}</h3>
              <div className={styles.grid}>
                {categoryTools.map((tool) => {
                  const displayTitle = language === "ko" && tool.koTitle ? tool.koTitle : tool.title;
                  const displayDesc = language === "ko" && tool.koDescription ? tool.koDescription : tool.description;

                  return (
                    <Link href={`/tools/${tool.slug}`} key={tool.id} className={styles.toolCard}>
                      <Card hoverable style={{ height: "100%" }}>
                        <CardBody style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                          <div>
                            <h4 className={styles.cardTitle}>{displayTitle}</h4>
                            <p className={styles.cardDesc}>{displayDesc}</p>
                          </div>
                          <div className={styles.cardFooter}>
                            <span className={`${styles.difficulty} ${styles[tool.difficulty]}`}>
                              {tool.difficulty}
                            </span>
                            <span className={styles.learnMore}>
                              {commonT.openTool}
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </span>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
