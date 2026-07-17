"use client";

import { ReactNode } from "react";
import { CopyButton } from "./CopyButton";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  language?: string;
  onCopy?: () => void;
}

export function CodeBlock({
  code,
  language = "typescript",
  onCopy,
}: CodeBlockProps): ReactNode {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>
        <CopyButton value={code} onCopy={onCopy} />
      </div>
      <pre className={styles.pre}>
        <code className={styles.code}>{code}</code>
      </pre>
    </div>
  );
}
