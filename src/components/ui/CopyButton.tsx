import { useState, ReactNode } from "react";
import styles from "./CopyButton.module.css";

interface CopyButtonProps {
  value: string;
  className?: string;
  onCopy?: () => void;
}

export function CopyButton({
  value,
  className = "",
  onCopy,
}: CopyButtonProps): ReactNode {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (onCopy) {
        onCopy();
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={[
        styles.button,
        copied ? styles.success : "",
        className,
      ].filter(Boolean).join(" ")}
      type="button"
      aria-label="Copy code content"
    >
      <span className={styles.icon}>
        {copied ? (
          <svg
            className={styles.iconSvg}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            className={styles.iconSvg}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </span>
      <span>{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}
