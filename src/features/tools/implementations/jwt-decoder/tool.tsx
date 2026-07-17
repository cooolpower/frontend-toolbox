"use client";

import { useState, useEffect, ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { useLanguage } from "@/lib/i18n/language";
import { translations } from "@/lib/i18n/translations";
import styles from "./tool.module.css";

// Simple helper to decode Base64Url
function base64UrlDecode(str: string): string {
  // Add padding if needed
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  
  try {
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (err) {
    throw new Error("Invalid base64 payload");
  }
}

interface DecodedToken {
  header: Record<string, any>;
  payload: Record<string, any>;
  signature: string;
}

const EXAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
  "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbWVzIERvZSIsImlzcyI6ImNvb29scG93ZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE4OTA2NTI4MDB9." +
  "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export function JwtDecoderTool(): ReactNode {
  const { language } = useLanguage();
  const t = translations[language].jwtDecoder;
  const commonT = translations[language].common;

  const [tokenInput, setTokenInput] = useState("");
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Time calculations
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const handleDecode = (token = tokenInput) => {
    setError(null);
    if (!token.trim()) {
      setDecoded(null);
      return;
    }

    const parts = token.trim().split(".");
    if (parts.length !== 3) {
      setError(t.errorInvalid);
      setDecoded(null);
      return;
    }

    try {
      const headerStr = base64UrlDecode(parts[0]);
      const payloadStr = base64UrlDecode(parts[1]);
      
      const header = JSON.parse(headerStr);
      const payload = JSON.parse(payloadStr);
      
      setDecoded({
        header,
        payload,
        signature: parts[2],
      });
    } catch (err) {
      setError(t.errorDecode);
      setDecoded(null);
    }
  };

  useEffect(() => {
    if (!decoded || !decoded.payload.exp) {
      setTimeRemaining(null);
      return;
    }

    const interval = setInterval(() => {
      const expSecs = decoded.payload.exp;
      const nowSecs = Math.floor(Date.now() / 1000);
      const diff = expSecs - nowSecs;
      setTimeRemaining(diff);
    }, 1000);

    // Initial check
    const expSecs = decoded.payload.exp;
    const nowSecs = Math.floor(Date.now() / 1000);
    setTimeRemaining(expSecs - nowSecs);

    return () => clearInterval(interval);
  }, [decoded]);

  const loadExample = () => {
    setTokenInput(EXAMPLE_JWT);
    handleDecode(EXAMPLE_JWT);
  };

  const handleReset = () => {
    setTokenInput("");
    setDecoded(null);
    setError(null);
  };

  const formatTimestamp = (timestamp?: number): string => {
    if (!timestamp) return "-";
    const date = new Date(timestamp * 1000);
    return date.toLocaleString(language === "ko" ? "ko-KR" : "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return language === "ko" ? "만료됨" : "Expired";
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (days > 0) parts.push(`${days}${language === "ko" ? "일" : "d"}`);
    if (hours > 0 || days > 0) parts.push(`${hours}${language === "ko" ? "시간" : "h"}`);
    parts.push(`${mins}${language === "ko" ? "분" : "m"}`);
    parts.push(`${secs}${language === "ko" ? "초" : "s"}`);

    return parts.join(" ");
  };

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <h3 style={{ fontSize: "1rem" }}>{t.tokenLabel}</h3>
        </CardHeader>
        <CardBody style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Textarea
            placeholder={t.placeholder}
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            style={{ minHeight: "100px", fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}
            aria-label="JWT Token String"
          />
          {error && <div className={styles.errorBox}>{error}</div>}
          <div className={styles.actions}>
            <Button
              variant="primary"
              onClick={() => handleDecode()}
              disabled={!tokenInput.trim()}
            >
              Decode
            </Button>
            <Button variant="secondary" onClick={loadExample}>
              {commonT.loadExample}
            </Button>
            <Button variant="ghost" onClick={handleReset}>
              {commonT.reset}
            </Button>
          </div>
        </CardBody>
      </Card>

      {decoded && (
        <div className={styles.resultsGrid}>
          {/* Header code block */}
          <Card>
            <CardHeader className={styles.headerBar}>
              <h3 className={styles.headerTitle}>{t.headerTitle}</h3>
            </CardHeader>
            <CardBody>
              <CodeBlock code={JSON.stringify(decoded.header, null, 2)} language="json" />
            </CardBody>
          </Card>

          {/* Payload code block */}
          <Card>
            <CardHeader className={styles.payloadBar}>
              <h3 className={styles.payloadTitle}>{t.payloadTitle}</h3>
            </CardHeader>
            <CardBody>
              <CodeBlock code={JSON.stringify(decoded.payload, null, 2)} language="json" />
            </CardBody>
          </Card>

          {/* Analysis info card */}
          <Card className={styles.analysisCard}>
            <CardHeader>
              <h3 style={{ fontSize: "1rem" }}>{t.analysisTitle}</h3>
            </CardHeader>
            <CardBody className={styles.analysisList}>
              <div className={styles.analysisItem}>
                <span className={styles.analysisLabel}>{t.statusLabel}</span>
                <span
                  className={`${styles.statusBadge} ${
                    timeRemaining === null
                      ? styles.statusNoExp
                      : timeRemaining <= 0
                      ? styles.statusExpired
                      : styles.statusValid
                  }`}
                >
                  {timeRemaining === null
                    ? t.statusNoExp
                    : timeRemaining <= 0
                    ? t.statusExpired
                    : t.statusValid}
                </span>
              </div>

              {timeRemaining !== null && timeRemaining > 0 && (
                <div className={styles.analysisItem}>
                  <span className={styles.analysisLabel}>{t.timeLeft}</span>
                  <span className={styles.timeLeftVal}>{formatTimeRemaining(timeRemaining)}</span>
                </div>
              )}

              <div className={styles.analysisItem}>
                <span className={styles.analysisLabel}>{t.algorithm}</span>
                <span className={styles.codeText}>{decoded.header.alg || "-"}</span>
              </div>

              {decoded.payload.iss && (
                <div className={styles.analysisItem}>
                  <span className={styles.analysisLabel}>{t.issuer}</span>
                  <span>{decoded.payload.iss}</span>
                </div>
              )}

              {decoded.payload.sub && (
                <div className={styles.analysisItem}>
                  <span className={styles.analysisLabel}>{t.subject}</span>
                  <span>{decoded.payload.sub}</span>
                </div>
              )}

              {decoded.payload.iat && (
                <div className={styles.analysisItem}>
                  <span className={styles.analysisLabel}>{t.issuedAt}</span>
                  <span className={styles.dateText}>{formatTimestamp(decoded.payload.iat)}</span>
                </div>
              )}

              {decoded.payload.exp && (
                <div className={styles.analysisItem}>
                  <span className={styles.analysisLabel}>{t.expiredAt}</span>
                  <span className={styles.dateText}>{formatTimestamp(decoded.payload.exp)}</span>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
