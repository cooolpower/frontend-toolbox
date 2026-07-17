"use client";

import { useState, useTransition, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { convertJsonToTs, ConvertOptions } from "./converter";
import styles from "./tool.module.css";

const EXAMPLE_JSON = `{
  "id": 1,
  "name": "Frontend Developer Platform",
  "version": "1.0.0",
  "active": true,
  "tags": ["react", "typescript", "tools"],
  "creator": {
    "name": "James",
    "role": "Lead UI Engineer"
  },
  "stats": [
    { "month": "July", "views": 12500 }
  ]
}`;

export function JsonToTsTool(): ReactNode {
  const [jsonInput, setJsonInput] = useState("");
  const [rootName, setRootName] = useState("RootInterface");
  const [useTypeAlias, setUseTypeAlias] = useState(false);
  const [makeOptional, setMakeOptional] = useState(false);
  const [outputCode, setOutputCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const [isPending, startTransition] = useTransition();

  const handleConvert = (input = jsonInput) => {
    setError(null);
    if (!input.trim()) {
      setOutputCode("");
      return;
    }

    startTransition(async () => {
      // Small artificial delay to show micro loading state
      await new Promise((resolve) => setTimeout(resolve, 300));
      try {
        const options: ConvertOptions = {
          rootName: rootName || "RootInterface",
          useTypeAlias,
          makeOptional,
        };
        const result = convertJsonToTs(input, options);
        setOutputCode(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
        setOutputCode("");
      }
    });
  };

  const loadExample = () => {
    setJsonInput(EXAMPLE_JSON);
    handleConvert(EXAMPLE_JSON);
  };

  const handleReset = () => {
    setJsonInput("");
    setOutputCode("");
    setError(null);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.optionsCard}>
        <CardHeader>
          <h3 style={{ fontSize: "1rem" }}>Configuration Options</h3>
        </CardHeader>
        <CardBody>
          <div className={styles.optionsGroup}>
            <div style={{ maxWidth: "240px", width: "100%" }}>
              <Input
                label="Root Type Name"
                placeholder="RootInterface"
                value={rootName}
                onChange={(e) => setRootName(e.target.value)}
              />
            </div>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={useTypeAlias}
                onChange={(e) => setUseTypeAlias(e.target.checked)}
              />
              Use Type Alias
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={makeOptional}
                onChange={(e) => setMakeOptional(e.target.checked)}
              />
              Make Properties Optional
            </label>
          </div>
        </CardBody>
      </Card>

      <div className={styles.workspace}>
        <Card>
          <CardHeader>
            <h3 style={{ fontSize: "1rem" }}>JSON Input</h3>
          </CardHeader>
          <CardBody style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Textarea
              placeholder='Paste JSON here... e.g. { "key": "value" }'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              style={{ minHeight: "300px" }}
              aria-label="JSON Input"
            />
            {error && <div className={styles.errorBox}>{error}</div>}
            <div className={styles.actions}>
              <Button
                variant="primary"
                onClick={() => handleConvert()}
                isLoading={isPending}
                disabled={!jsonInput.trim()}
              >
                Generate
              </Button>
              <Button variant="secondary" onClick={loadExample}>
                Load Example
              </Button>
              <Button variant="ghost" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 style={{ fontSize: "1rem" }}>TypeScript Definitions</h3>
          </CardHeader>
          <CardBody>
            {outputCode ? (
              <CodeBlock code={outputCode} language="typescript" />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                  border: "1px dashed var(--border)",
                  borderRadius: "6px",
                  color: "var(--fg-tertiary)",
                  fontSize: "0.875rem",
                }}
              >
                Generated code will appear here.
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
