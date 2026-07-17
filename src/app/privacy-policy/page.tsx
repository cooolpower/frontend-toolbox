"use client";

import { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { useLanguage } from "@/lib/i18n/language";

export default function PrivacyPolicyPage(): ReactNode {
  const { language } = useLanguage();

  return (
    <div style={{ maxWidth: "800px", margin: "3rem auto", padding: "0 1.5rem" }}>
      <Card>
        <CardHeader>
          <h1 style={{ fontSize: "1.75rem" }}>
            {language === "ko" ? "개인정보 처리방침" : "Privacy Policy"}
          </h1>
        </CardHeader>
        <CardBody style={{ lineHeight: "1.7", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p>{language === "ko" ? "최근 수정일: 2026년 7월 15일" : "Last updated: July 15, 2026"}</p>
          {language === "ko" ? (
            <>
              <p>
                Frontend Toolbox는 사용자의 개인정보를 소중히 여깁니다. 저희의 모든 도구(JSON 제너레이터, Props 분석기, CSS 그림자 생성기 등)는 <strong>전적으로 클라이언트 브라우저 측에서만 실행되므로, 입력하신 설정 데이터, 소스 코드, 모의 데이터 등 어떠한 정보도 서버로 전송되거나 저장되지 않습니다.</strong>
              </p>
              <h3 style={{ fontSize: "1.1rem", marginTop: "1rem" }}>1. 데이터 수집 안내</h3>
              <p>
                저희는 가장 많이 사용되는 도구 유형을 이해하고 서비스를 개선하기 위해 Google Analytics (GA4)를 사용하여 가명화된 사용 통계 행동 데이터를 수집합니다. 해당 데이터는 개별 소스 코드나 고유한 데이터베이스 데이터 모델과 절대 연동되거나 추적될 수 없습니다.
              </p>
              <h3 style={{ fontSize: "1.1rem", marginTop: "1rem" }}>2. 제3자 광고 게재</h3>
              <p>
                본 사이트는 광고 제공을 위해 Google AdSense를 활용합니다. AdSense는 쿠키를 활용하여 귀하의 방문 정보에 따른 맞춤형 광고를 제공할 수 있습니다. 맞춤형 광고 수신은 Google 광고 설정 페이지에서 언제든지 해제하실 수 있습니다.
              </p>
            </>
          ) : (
            <>
              <p>
                At Frontend Toolbox, we prioritize user privacy. Since all of our tools (JSON generators, Props analyzers, and design systems) run entirely client-side, <strong>none of your configuration payloads, source code, or mock inputs are ever uploaded to our servers.</strong>
              </p>
              <h3 style={{ fontSize: "1.1rem", marginTop: "1rem" }}>1. Data Collection</h3>
              <p>
                We collect anonymized usage behavior via Google Analytics (GA4) to understand which tools are used most frequently. This data cannot be linked back to individual source codes or proprietary database models.
              </p>
              <h3 style={{ fontSize: "1.1rem", marginTop: "1rem" }}>2. Third-Party Advertisements</h3>
              <p>
                We use Google AdSense to serve ads. AdSense may use cookies to serve personalized ads based on your visits to this and other websites. You can opt out of personalized advertising by visiting Google Ad Settings.
              </p>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
