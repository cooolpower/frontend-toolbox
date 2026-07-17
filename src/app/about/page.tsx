"use client";

import { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { useLanguage } from "@/lib/i18n/language";

export default function AboutPage(): ReactNode {
  const { language } = useLanguage();

  return (
    <div style={{ maxWidth: "800px", margin: "3rem auto", padding: "0 1.5rem" }}>
      <Card>
        <CardHeader>
          <h1 style={{ fontSize: "1.75rem" }}>
            {language === "ko" ? "Frontend Toolbox 소개" : "About Frontend Toolbox"}
          </h1>
        </CardHeader>
        <CardBody style={{ lineHeight: "1.7", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {language === "ko" ? (
            <>
              <p>
                <strong>Frontend Toolbox</strong>에 오신 것을 환영합니다. 본 플랫폼은 현대 프론트엔드 개발자, React 아키텍트, 그리고 디자인 시스템 엔지니어를 위해 정교하게 구축된 생산성 도구 모음입니다.
              </p>
              <p>
                우리의 핵심 미션은 명확합니다. 개발자 팀이 매일 마주하는 반복적이고 실수하기 쉬운 작업을 자동화하는 것입니다. 범용적인 코드 유틸리티를 수동으로 작성하는 대신, 우리는 React 렌더링 최적화, TypeScript 인터페이스 제너레이터, API 모델링 및 맞춤형 CSS 디자인 시스템을 위한 고성능 도구를 제공하는 데 주력하고 있습니다.
              </p>
              <p>
                이 서비스는 Next.js를 사용하여 빌드되었으며, 밀리초 단위의 미만 실행 속도와 깔끔한 정적 콘텐츠 제공을 목표로 최적화되어 여러분의 개발 흐름이 중단되지 않도록 돕습니다.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong>Frontend Toolbox</strong>, a productivity platform specifically engineered for modern frontend developers, React architects, and design system engineers.
              </p>
              <p>
                Our core mission is simple: to automate repetitive, error-prone tasks that developer teams encounter every single day. Instead of duplicating generic code utilities, we focus on providing high-performance tools for React rendering optimization, TypeScript interface generators, API modeling, and custom CSS design systems.
              </p>
              <p>
                This service is built using Next.js, optimizing for sub-millisecond execution speeds and clean static content delivery to keep your workflow uninterrupted.
              </p>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
