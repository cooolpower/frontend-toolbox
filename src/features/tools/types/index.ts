import { ComponentType } from "react";

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  title: string;
  koTitle?: string;
  description: string;
  koDescription?: string;
  category: "react" | "typescript" | "api" | "css-ui" | "design-system" | "performance";
  keywords: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  component: ComponentType;
  seo: {
    title: string;
    koTitle?: string;
    description: string;
    koDescription?: string;
    keywords: string[];
    faq: FAQ[];
    koFaq?: FAQ[];
  };
  analytics: {
    events: string[];
  };
}

export const CATEGORY_LABELS: Record<ToolDefinition["category"], string> = {
  react: "React Tools",
  typescript: "TypeScript Tools",
  api: "API Development Tools",
  "css-ui": "CSS / UI Tools",
  "design-system": "Design System Tools",
  performance: "Performance Tools",
};

export const CATEGORY_LABELS_KO: Record<ToolDefinition["category"], string> = {
  react: "React 도구",
  typescript: "TypeScript 도구",
  api: "API 개발 도구",
  "css-ui": "CSS / UI 도구",
  "design-system": "디자인 시스템 도구",
  performance: "성능 도구",
};
