"use client";

import { useState, useTransition, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { analyzePropsDiff, DiffItem } from "./diff-logic";
import { useLanguage } from "@/lib/i18n/language";
import { translations } from "@/lib/i18n/translations";
import styles from "./tool.module.css";

const EXAMPLE_BEFORE = `{
  "theme": "dark",
  "activeTab": "overview",
  "user": {
    "name": "Jane",
    "role": "Architect"
  },
  "tags": ["react", "ui"],
  "visibleCount": 10
}`;

const EXAMPLE_AFTER = `{
  "theme": "dark",
  "activeTab": "settings",
  "user": {
    "name": "Jane",
    "role": "Lead Architect"
  },
  "tags": ["react", "ui", "performance"],
  "visibleCount": 10,
  "autoRefresh": true
}`;

export function PropsDiffTool(): ReactNode {
  const { language } = useLanguage();
  const t = translations[language].propsDiff;
  const commonT = translations[language].common;

  const [beforeProps, setBeforeProps] = useState("");
  const [afterProps, setAfterProps] = useState("");
  
  const [diffs, setDiffs] = useState<DiffItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleCompare = (before = beforeProps, after = afterProps) => {
    setError(null);
    if (!before.trim() || !after.trim()) {
      setDiffs([]);
      setSuggestions([]);
      return;
    }

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      try {
        const result = analyzePropsDiff(before, after, language);
        setDiffs(result.diffs);
        setSuggestions(result.memoizationSuggestions);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(language === "ko" ? "비교 분석 구동에 실패했습니다." : "Failed to run comparison analysis.");
        }
        setDiffs([]);
        setSuggestions([]);
      }
    });
  };

  const loadExample = () => {
    setBeforeProps(EXAMPLE_BEFORE);
    setAfterProps(EXAMPLE_AFTER);
    handleCompare(EXAMPLE_BEFORE, EXAMPLE_AFTER);
  };

  const handleReset = () => {
    setBeforeProps("");
    setAfterProps("");
    setDiffs([]);
    setSuggestions([]);
    setError(null);
  };

  const getBadgeClass = (status: DiffItem["status"]) => {
    switch (status) {
      case "added":
        return styles.badgeAdded;
      case "removed":
        return styles.badgeRemoved;
      case "changed":
        return styles.badgeChanged;
      default:
        return styles.badgeUnchanged;
    }
  };

  const getStatusText = (status: DiffItem["status"]) => {
    switch (status) {
      case "added":
        return t.badgeAdded;
      case "removed":
        return t.badgeRemoved;
      case "changed":
        return t.badgeChanged;
      default:
        return t.badgeUnchanged;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <Card>
          <CardHeader>
            <h3 style={{ fontSize: "1rem" }}>{t.prevProps}</h3>
          </CardHeader>
          <CardBody>
            <Textarea
              placeholder={t.placeholder}
              value={beforeProps}
              onChange={(e) => setBeforeProps(e.target.value)}
              style={{ minHeight: "220px" }}
              aria-label="Previous Props JSON"
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 style={{ fontSize: "1rem" }}>{t.currProps}</h3>
          </CardHeader>
          <CardBody>
            <Textarea
              placeholder={t.placeholder}
              value={afterProps}
              onChange={(e) => setAfterProps(e.target.value)}
              style={{ minHeight: "220px" }}
              aria-label="Current Props JSON"
            />
          </CardBody>
        </Card>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.actions}>
        <Button
          variant="primary"
          onClick={() => handleCompare()}
          isLoading={isPending}
          disabled={!beforeProps.trim() || !afterProps.trim()}
        >
          {t.compareBtn}
        </Button>
        <Button variant="secondary" onClick={loadExample}>
          {commonT.loadExample}
        </Button>
        <Button variant="ghost" onClick={handleReset}>
          {commonT.reset}
        </Button>
      </div>

      {(diffs.length > 0 || suggestions.length > 0) && (
        <div className={styles.results}>
          {suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <h3 style={{ fontSize: "1rem" }}>{t.suggestionsTitle}</h3>
              </CardHeader>
              <CardBody className={styles.suggestions}>
                {suggestions.map((msg, i) => (
                  <div key={i} className={styles.suggestionItem}>
                    {msg}
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          {diffs.length > 0 && (
            <Card>
              <CardHeader>
                <h3 style={{ fontSize: "1rem" }}>{t.matrixTitle}</h3>
              </CardHeader>
              <CardBody style={{ overflowX: "auto" }}>
                <table className={styles.diffTable}>
                  <thead>
                    <tr>
                      <th>{t.colKey}</th>
                      <th>{t.colStatus}</th>
                      <th>{t.colType}</th>
                      <th>{t.colBefore}</th>
                      <th>{t.colAfter}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diffs.map((item) => (
                      <tr key={item.key} className={styles[item.status]}>
                        <td>{item.key}</td>
                        <td>
                          <span className={`${styles.badge} ${getBadgeClass(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
                        </td>
                        <td>{item.type}</td>
                        <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.beforeValue}
                        </td>
                        <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.afterValue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
