"use client";

import { ReactNode } from "react";
import styles from "./Tabs.module.css";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({
  items,
  activeId,
  onChange,
  className = "",
}: TabsProps): ReactNode {
  const activeContent = items.find((item) => item.id === activeId)?.content;

  return (
    <div className={[styles.container, className].filter(Boolean).join(" ")}>
      <div className={styles.tabList} role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={item.id === activeId}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            onClick={() => onChange(item.id)}
            className={[
              styles.tabButton,
              item.id === activeId ? styles.activeTab : "",
            ].filter(Boolean).join(" ")}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        id={`panel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeId}`}
        className={styles.tabContent}
      >
        {activeContent}
      </div>
    </div>
  );
}
