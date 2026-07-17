"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ToolDefinition } from "@/features/tools/types";
import { getRelatedTools } from "@/features/tools/registry";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { useLanguage } from "@/lib/i18n/language";
import { translations } from "@/lib/i18n/translations";
import styles from "./Layout.module.css";

interface ToolLayoutProps {
  tool: ToolDefinition;
  children: ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps): ReactNode {
  const { language } = useLanguage();
  const t = translations[language].common;
  const relatedTools = getRelatedTools(tool);

  const displayTitle = language === "ko" && tool.koTitle ? tool.koTitle : tool.title;
  const displayDesc = language === "ko" && tool.koDescription ? tool.koDescription : tool.description;

  // Schema.org structured data generators
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": displayTitle,
    "description": displayDesc,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://frontend-toolbox.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": displayTitle,
        "item": `https://frontend-toolbox.com/tools/${tool.slug}`
      }
    ]
  };

  const displayFaq = language === "ko" && tool.seo.koFaq ? tool.seo.koFaq : tool.seo.faq;

  const faqSchema = displayFaq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": displayFaq.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className={styles.toolLayout}>
      {/* Dynamic JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Header Info */}
      <section>
        <h1 className={styles.toolTitle}>{displayTitle}</h1>
        <p className={styles.toolDesc}>{displayDesc}</p>
      </section>

      {/* Interactive Tool Area */}
      <section style={{ zIndex: 10 }}>
        {children}
      </section>

      {/* SEO Document Section */}
      <section className={styles.seoSection}>
        <div className={styles.seoGrid}>
          <div className={styles.guideContent}>
            {language === "ko" ? (
              <>
                <h2>사용 방법</h2>
                <p>
                  이 {displayTitle}는 프론트엔드 개발자와 UI 엔지니어가 개발 워크플로우를 최적화할 수 있도록 설계되었습니다. 아래의 단계를 따라해보세요:
                </p>
                <ul>
                  <li>입력 에디터 패널에 원본 데이터를 입력하거나 수정합니다.</li>
                  <li>설정 툴박스 카드에서 환경 설정이나 사용자 정의 매개변수를 전환합니다.</li>
                  <li>반응형 프로세서가 변환을 처리하거나 가상 정의를 생성할 때까지 대기합니다.</li>
                  <li>복사 버튼을 클릭하여 생성된 코드를 로컬 React/TypeScript 파일로 간편하게 가져옵니다.</li>
                </ul>

                <h2>주요 활용 사례</h2>
                <p>
                  대규모 엔터프라이즈 React 애플리케이션 작업이든, 작고 빠른 next.js 랜딩 템플릿 배포든, 이 도구는 다음과 같은 중요한 역할을 수행합니다:
                </p>
                <ul>
                  <li><strong>로컬 모킹:</strong> 번거로운 스키마 수동 작성 없이 MSW 핸들러를 즉시 구축합니다.</li>
                  <li><strong>Props 리팩토링:</strong> 복잡한 렌더링 트리거를 격리하고 React.memo 비교가 실패하는 정확한 원인을 진단합니다.</li>
                  <li><strong>디자인 핸드오프:</strong> 피그마의 픽셀 출력을 크로스 브라우저에 안전한 그림자 규칙 및 깔끔한 Tailwind 컴포넌트로 자동 변환합니다.</li>
                </ul>
              </>
            ) : (
              <>
                <h2>How to Use</h2>
                <p>
                  This {displayTitle} is designed for frontend developers and UI engineers to optimize their dev workflows. Follow these simple steps:
                </p>
                <ul>
                  <li>Enter or modify your raw configurations in the input editor panel.</li>
                  <li>Toggle settings or custom parameters in the config toolbox card.</li>
                  <li>Wait for the reactive processor to translate or build mock definitions.</li>
                  <li>Use the copy buttons to transfer generated codes to your local react/typescript file.</li>
                </ul>

                <h2>Key Use Cases</h2>
                <p>
                  Whether you are working on massive enterprise React applications or launching tiny next.js landing templates, this utility serves critical workflows:
                </p>
                <ul>
                  <li><strong>Local Mocking:</strong> Instantly bootstrap MSW handlers without writing manual schemas.</li>
                  <li><strong>Refactoring Props:</strong> Isolate complex render triggers and identify exactly why React.memo comparison fails.</li>
                  <li><strong>Design Handoffs:</strong> Convert Figma pixel outputs to cross-browser friendly shadow rules and clean tailwind components.</li>
                </ul>
              </>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <h3 style={{ fontSize: "1rem" }}>{t.relatedTools}</h3>
              </CardHeader>
              <CardBody style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {relatedTools.length > 0 ? (
                  relatedTools.map((rel) => {
                    const relTitle = language === "ko" && rel.koTitle ? rel.koTitle : rel.title;
                    return (
                      <Link
                        key={rel.id}
                        href={`/tools/${rel.slug}`}
                        style={{
                          padding: "0.75rem",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          transition: "all 0.2s",
                          display: "block",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--primary)";
                          e.currentTarget.style.backgroundColor = "var(--primary-light)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        {relTitle}
                      </Link>
                    );
                  })
                ) : (
                  <span style={{ fontSize: "0.875rem", color: "var(--fg-tertiary)" }}>
                    {t.noRelatedTools}
                  </span>
                )}
              </CardBody>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        {displayFaq.length > 0 && (
          <div>
            <h2>{t.faq}</h2>
            <div style={{ marginTop: "1.5rem" }}>
              {displayFaq.map((faq, idx) => (
                <div key={idx} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>Q: {faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
