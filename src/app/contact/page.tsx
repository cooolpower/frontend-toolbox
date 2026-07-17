"use client";

import { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { useLanguage } from "@/lib/i18n/language";

export default function ContactPage(): ReactNode {
  const { language } = useLanguage();

  return (
    <div style={{ maxWidth: "800px", margin: "3rem auto", padding: "0 1.5rem" }}>
      <Card>
        <CardHeader>
          <h1 style={{ fontSize: "1.75rem" }}>
            {language === "ko" ? "문의하기" : "Contact Us"}
          </h1>
        </CardHeader>
        <CardBody style={{ lineHeight: "1.7", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {language === "ko" ? (
            <>
              <p>
                도구 제안이 있거나 버그를 발견하셨나요? 언제든지 편하게 문의해 주세요! 저희 엔지니어링 팀은 개발자 생산성을 향상시키기 위해 소중한 피드백을 적극적으로 검토하고 반영하고 있습니다.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>이메일 지원</h3>
                <p>
                  이메일로 문의주세요: <a href="mailto:support@frontend-toolbox.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>support@frontend-toolbox.com</a>
                </p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>GitHub 기여</h3>
                <p>
                  저희의 코드 가이드라인은 빠른 도구 레지스트리 확장에 최적화되어 있습니다. 레포지토리 페이지에 직접 템플릿을 제공하여 새로운 플러그인 기여에 동참해 보세요.
                </p>
              </div>
            </>
          ) : (
            <>
              <p>
                Have a tool suggestion or found a bug? We would love to hear from you! Our engineering team actively reviews feedback to improve developer productivity.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Email Support</h3>
                <p>
                  Please reach out directly at: <a href="mailto:support@frontend-toolbox.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>support@frontend-toolbox.com</a>
                </p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>GitHub Contributions</h3>
                <p>
                  Our code guidelines are optimized for quick tool registry expansions. You can contribute new plugins by submitting templates directly to our repository page.
                </p>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
