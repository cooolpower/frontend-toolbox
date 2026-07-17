"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import styles from "./tool.module.css";

export function CssShadowTool(): ReactNode {
  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(15);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(-5);
  const [opacity, setOpacity] = useState(15); // 0-100
  const [color, setColor] = useState("#000000");
  const [inset, setInset] = useState(false);

  // Parse hex to rgba
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const { r, g, b } = hexToRgb(color);
  const rgbaStr = `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`;
  const insetStr = inset ? "inset " : "";
  const shadowValue = `${insetStr}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${rgbaStr}`;

  const cssCode = `box-shadow: ${shadowValue};
-webkit-box-shadow: ${shadowValue};
-moz-box-shadow: ${shadowValue};`;

  // Tailwind equivalent format
  // Escape spaces with underscores
  const cleanRgba = `rgba(${r},${g},${b},${(opacity / 100).toFixed(2)})`;
  const tailwindValue = `shadow-[${inset ? "inset_" : ""}${hOffset}px_${vOffset}px_${blur}px_${spread}px_${cleanRgba}]`;

  const handleReset = () => {
    setHOffset(10);
    setVOffset(15);
    setBlur(20);
    setSpread(-5);
    setOpacity(15);
    setColor("#000000");
    setInset(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <Card>
          <CardHeader>
            <h3 style={{ fontSize: "1rem" }}>Adjust Shadow Properties</h3>
          </CardHeader>
          <CardBody className={styles.controlGroup}>
            <div className={styles.sliderRow}>
              <div className={styles.sliderHeader}>
                <span>Horizontal Offset</span>
                <span>{hOffset}px</span>
              </div>
              <input
                type="range"
                className={styles.slider}
                min="-50"
                max="50"
                value={hOffset}
                onChange={(e) => setHOffset(Number(e.target.value))}
              />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.sliderHeader}>
                <span>Vertical Offset</span>
                <span>{vOffset}px</span>
              </div>
              <input
                type="range"
                className={styles.slider}
                min="-50"
                max="50"
                value={vOffset}
                onChange={(e) => setVOffset(Number(e.target.value))}
              />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.sliderHeader}>
                <span>Blur Radius</span>
                <span>{blur}px</span>
              </div>
              <input
                type="range"
                className={styles.slider}
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
              />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.sliderHeader}>
                <span>Spread Radius</span>
                <span>{spread}px</span>
              </div>
              <input
                type="range"
                className={styles.slider}
                min="-50"
                max="50"
                value={spread}
                onChange={(e) => setSpread(Number(e.target.value))}
              />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.sliderHeader}>
                <span>Shadow Color</span>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{ border: "none", cursor: "pointer", width: "40px", height: "24px" }}
                />
              </div>
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.sliderHeader}>
                <span>Opacity</span>
                <span>{opacity}%</span>
              </div>
              <input
                type="range"
                className={styles.slider}
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                id="insetShadow"
                checked={inset}
                onChange={(e) => setInset(e.target.checked)}
                style={{ width: "16px", height: "16px" }}
              />
              <label htmlFor="insetShadow" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--fg-secondary)", cursor: "pointer" }}>
                Inset Shadow
              </label>
            </div>

            <Button variant="ghost" onClick={handleReset} className={styles.resetBtn}>
              Reset Settings
            </Button>
          </CardBody>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Card>
            <CardHeader>
              <h3 style={{ fontSize: "1rem" }}>Visual Preview</h3>
            </CardHeader>
            <CardBody className={styles.previewArea}>
              <div
                className={styles.previewBox}
                style={{
                  boxShadow: shadowValue,
                }}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 style={{ fontSize: "1rem" }}>Generated CSS & Tailwind</h3>
            </CardHeader>
            <CardBody className={styles.codeOutput}>
              <CodeBlock code={cssCode} language="css" />
              <CodeBlock code={tailwindValue} language="html" />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
