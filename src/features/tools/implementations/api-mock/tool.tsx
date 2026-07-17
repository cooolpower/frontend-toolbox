"use client";

import { useState, useTransition, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Tabs } from "@/components/ui/Tabs";
import { generateMockDataAndStub, MockOptions } from "./mock-generator";
import styles from "./tool.module.css";

const EXAMPLE_INPUT = `{
  "id": "user_id_example",
  "name": "Alex Mercer",
  "email": "alex.m@domain.com",
  "joinedDate": "2024-01-15",
  "avatarUrl": "https://picsum.photos/150",
  "role": "Maintainer",
  "isAdmin": true
}`;

export function ApiMockTool(): ReactNode {
  const [jsonInput, setJsonInput] = useState("");
  const [endpoint, setEndpoint] = useState("/api/v1/users");
  const [arrayLength, setArrayLength] = useState(3);
  const [includeMsw, setIncludeMsw] = useState(true);
  const [activeTab, setActiveTab] = useState("mock-data");
  
  const [mockData, setMockData] = useState("");
  const [stubCode, setStubCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleGenerate = (input = jsonInput) => {
    setError(null);
    if (!input.trim()) {
      setMockData("");
      setStubCode("");
      return;
    }

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      try {
        const options: MockOptions = {
          arrayLength,
          includeMsw,
          endpoint,
        };
        const { mockData: data, stubCode: code } = generateMockDataAndStub(input, options);
        setMockData(data);
        setStubCode(code);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
        setMockData("");
        setStubCode("");
      }
    });
  };

  const loadExample = () => {
    setJsonInput(EXAMPLE_INPUT);
    handleGenerate(EXAMPLE_INPUT);
  };

  const handleReset = () => {
    setJsonInput("");
    setMockData("");
    setStubCode("");
    setError(null);
  };

  const outputTabs = [
    {
      id: "mock-data",
      label: "Mock Data (JSON)",
      content: mockData ? (
        <CodeBlock code={mockData} language="json" />
      ) : (
        <div style={{ padding: "3rem", textAlign: "center", color: "var(--fg-tertiary)" }}>
          No Mock Data generated yet. Click 'Generate Mock'.
        </div>
      ),
    },
    {
      id: "api-handler",
      label: includeMsw ? "MSW Handler" : "API Handler",
      content: stubCode ? (
        <CodeBlock code={stubCode} language="typescript" />
      ) : (
        <div style={{ padding: "3rem", textAlign: "center", color: "var(--fg-tertiary)" }}>
          No Handler Code generated yet.
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card className={styles.optionsCard}>
        <CardHeader>
          <h3 style={{ fontSize: "1rem" }}>Mock Config</h3>
        </CardHeader>
        <CardBody>
          <div className={styles.optionsGroup}>
            <Input
              label="Endpoint Path"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/api/v1/users"
            />
            <Input
              label="Mock Array Length"
              type="number"
              min={1}
              max={50}
              value={arrayLength}
              onChange={(e) => setArrayLength(Number(e.target.value))}
            />
            <div>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={includeMsw}
                  onChange={(e) => setIncludeMsw(e.target.checked)}
                />
                Use MSW (Mock Service Worker)
              </label>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className={styles.workspace}>
        <Card>
          <CardHeader>
            <h3 style={{ fontSize: "1rem" }}>API Schema/JSON Payload</h3>
          </CardHeader>
          <CardBody style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Textarea
              placeholder='Paste JSON representation of API response here... e.g. { "name": "Antigravity" }'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              style={{ minHeight: "300px" }}
              aria-label="JSON Payload Input"
            />
            {error && <div className={styles.errorBox}>{error}</div>}
            <div className={styles.actions}>
              <Button
                variant="primary"
                onClick={() => handleGenerate()}
                isLoading={isPending}
                disabled={!jsonInput.trim()}
              >
                Generate Mock
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
            <h3 style={{ fontSize: "1rem" }}>Generated Mock & Stubs</h3>
          </CardHeader>
          <CardBody>
            <Tabs items={outputTabs} activeId={activeTab} onChange={setActiveTab} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
