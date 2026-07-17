"use client";

import { useState, ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { useLanguage } from "@/lib/i18n/language";
import { translations } from "@/lib/i18n/translations";
import styles from "./tool.module.css";

type LayoutType = "flex" | "grid";

export function LayoutBuilderTool(): ReactNode {
  const { language } = useLanguage();
  const t = translations[language].layoutBuilder;
  const commonT = translations[language].common;

  const [layoutType, setLayoutType] = useState<LayoutType>("flex");
  const [itemCount, setItemCount] = useState(6);
  const [gap, setGap] = useState(16);

  // Flexbox States
  const [flexDirection, setFlexDirection] = useState("row");
  const [flexWrap, setFlexWrap] = useState("wrap");
  const [justifyContent, setJustifyContent] = useState("center");
  const [alignItems, setAlignItems] = useState("center");

  // Grid States
  const [gridCols, setGridCols] = useState(3);
  const [gridRows, setGridRows] = useState(2);
  const [justifyItems, setJustifyItems] = useState("stretch");
  const [alignItemsGrid, setAlignItemsGrid] = useState("stretch");

  const generateCss = (): string => {
    if (layoutType === "flex") {
      return `.container {
  display: flex;
  flex-direction: ${flexDirection};
  flex-wrap: ${flexWrap};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  gap: ${gap}px;
}
.item {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary), #8b5cf6);
  color: white;
  border-radius: 8px;
  min-width: 100px;
  text-align: center;
}`;
    } else {
      return `.container {
  display: grid;
  grid-template-columns: repeat(${gridCols}, minmax(0, 1fr));
  grid-template-rows: repeat(${gridRows}, minmax(0, 1fr));
  justify-items: ${justifyItems};
  align-items: ${alignItemsGrid};
  gap: ${gap}px;
}
.item {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary), #8b5cf6);
  color: white;
  border-radius: 8px;
  text-align: center;
}`;
    }
  };

  const getContainerStyle = () => {
    if (layoutType === "flex") {
      return {
        display: "flex",
        flexDirection: flexDirection as any,
        flexWrap: flexWrap as any,
        justifyContent: justifyContent,
        alignItems: alignItems,
        gap: `${gap}px`,
        minHeight: "300px",
        width: "100%",
      };
    } else {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
        justifyItems: justifyItems,
        alignItems: alignItemsGrid,
        gap: `${gap}px`,
        minHeight: "300px",
        width: "100%",
      };
    }
  };

  const handleReset = () => {
    setItemCount(6);
    setGap(16);
    setFlexDirection("row");
    setFlexWrap("wrap");
    setJustifyContent("center");
    setAlignItems("center");
    setGridCols(3);
    setGridRows(2);
    setJustifyItems("stretch");
    setAlignItemsGrid("stretch");
  };

  return (
    <div className={styles.container}>
      {/* Configuration panel */}
      <Card className={styles.configCard}>
        <CardHeader>
          <div className={styles.typeTabs}>
            <button
              onClick={() => setLayoutType("flex")}
              className={`${styles.tabBtn} ${layoutType === "flex" ? styles.activeTab : ""}`}
            >
              {t.flexMode}
            </button>
            <button
              onClick={() => setLayoutType("grid")}
              className={`${styles.tabBtn} ${layoutType === "grid" ? styles.activeTab : ""}`}
            >
              {t.gridMode}
            </button>
          </div>
        </CardHeader>
        <CardBody className={styles.configBody}>
          {/* Common controls */}
          <div className={styles.row}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>
                {t.itemCount}: <span className={styles.val}>{itemCount}</span>
              </label>
              <input
                type="range"
                min="1"
                max="16"
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                className={styles.range}
              />
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>
                {t.gapSize}: <span className={styles.val}>{gap}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="64"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className={styles.range}
              />
            </div>
          </div>

          {layoutType === "flex" ? (
            <div className={styles.optionsGrid}>
              <div className={styles.controlGroup}>
                <label className={styles.label}>{t.flexDirection}</label>
                <select
                  value={flexDirection}
                  onChange={(e) => setFlexDirection(e.target.value)}
                  className={styles.select}
                >
                  <option value="row">row</option>
                  <option value="row-reverse">row-reverse</option>
                  <option value="column">column</option>
                  <option value="column-reverse">column-reverse</option>
                </select>
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.label}>{t.flexWrap}</label>
                <select
                  value={flexWrap}
                  onChange={(e) => setFlexWrap(e.target.value)}
                  className={styles.select}
                >
                  <option value="nowrap">nowrap</option>
                  <option value="wrap">wrap</option>
                  <option value="wrap-reverse">wrap-reverse</option>
                </select>
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.label}>{t.justifyContent}</label>
                <select
                  value={justifyContent}
                  onChange={(e) => setJustifyContent(e.target.value)}
                  className={styles.select}
                >
                  <option value="flex-start">flex-start</option>
                  <option value="flex-end">flex-end</option>
                  <option value="center">center</option>
                  <option value="space-between">space-between</option>
                  <option value="space-around">space-around</option>
                  <option value="space-evenly">space-evenly</option>
                </select>
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.label}>{t.alignItems}</label>
                <select
                  value={alignItems}
                  onChange={(e) => setAlignItems(e.target.value)}
                  className={styles.select}
                >
                  <option value="stretch">stretch</option>
                  <option value="flex-start">flex-start</option>
                  <option value="flex-end">flex-end</option>
                  <option value="center">center</option>
                  <option value="baseline">baseline</option>
                </select>
              </div>
            </div>
          ) : (
            <div className={styles.optionsGrid}>
              <div className={styles.controlGroup}>
                <label className={styles.label}>{t.gridColumns}</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={gridCols}
                  onChange={(e) => setGridCols(Math.max(1, Number(e.target.value)))}
                  className={styles.inputNum}
                />
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.label}>{t.gridRows}</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={gridRows}
                  onChange={(e) => setGridRows(Math.max(1, Number(e.target.value)))}
                  className={styles.inputNum}
                />
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.label}>{t.justifyItems}</label>
                <select
                  value={justifyItems}
                  onChange={(e) => setJustifyItems(e.target.value)}
                  className={styles.select}
                >
                  <option value="stretch">stretch</option>
                  <option value="start">start</option>
                  <option value="end">end</option>
                  <option value="center">center</option>
                </select>
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.label}>{t.alignItems}</label>
                <select
                  value={alignItemsGrid}
                  onChange={(e) => setAlignItemsGrid(e.target.value)}
                  className={styles.select}
                >
                  <option value="stretch">stretch</option>
                  <option value="start">start</option>
                  <option value="end">end</option>
                  <option value="center">center</option>
                </select>
              </div>
            </div>
          )}

          <div style={{ marginTop: "1rem" }}>
            <Button variant="ghost" onClick={handleReset} style={{ width: "100%" }}>
              {commonT.reset}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Interactive preview area */}
      <div className={styles.layoutResultGrid}>
        <Card className={styles.previewCard}>
          <CardHeader>
            <h3 style={{ fontSize: "1rem" }}>{t.previewBoard}</h3>
          </CardHeader>
          <CardBody className={styles.previewContainer}>
            <div style={getContainerStyle()} className={styles.board}>
              {Array.from({ length: itemCount }).map((_, i) => (
                <div key={i} className={styles.item}>
                  {t.itemLabel} {i + 1}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Code block card */}
        <Card>
          <CardHeader>
            <h3 style={{ fontSize: "1rem" }}>{t.codeTitle}</h3>
          </CardHeader>
          <CardBody>
            <CodeBlock code={generateCss()} language="css" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
