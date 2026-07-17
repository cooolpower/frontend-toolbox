import { ToolDefinition } from "../../types";
import { PropsDiffTool } from "./tool";

export const propsDiffDefinition: ToolDefinition = {
  id: "props-diff",
  slug: "react-props-diff-viewer",
  title: "React Props Diff Viewer",
  koTitle: "React Props 비교 분석기",
  description: "Compare before and after Props states. Highlight diffs and get advanced performance suggestions for React.memo and reference stability.",
  koDescription: "변경 전후의 Props 상태를 비교합니다. 차이점을 강조하고 React.memo 및 참조 안정성을 위한 고급 성능 최적화 제안을 제공합니다.",
  category: "react",
  keywords: ["react props diff", "props viewer", "react render analyzer", "react memo performance"],
  difficulty: "Hard",
  component: PropsDiffTool,
  seo: {
    title: "React Props Diff Viewer - Optimize Rendering & Memoization",
    koTitle: "React Props 비교 분석기 - 렌더링 및 메모이제이션 최적화",
    description: "Compare React component properties over time. Detect reference type mutation and get advice for stabilizing props rendering with React.memo.",
    koDescription: "시간 경과에 따른 React 컴포넌트 속성을 비교합니다. 참조 타입 변경을 감지하고 React.memo를 사용한 props 렌더링 안정화에 대한 조언을 제공합니다.",
    keywords: ["props comparison", "react rendering optimizer", "react memo helper", "react props checker"],
    faq: [
      {
        question: "Why does React.memo fail with objects and arrays?",
        answer: "React.memo uses shallow comparison by default. When the parent component re-renders, it re-creates object or array instances, changing their reference addresses and causing children components to re-render despite matching keys.",
      },
      {
        question: "How do I fix unstable prop reference warnings?",
        answer: "Use React.useMemo() for caching objects or arrays, and React.useCallback() for caching helper methods in the parent component.",
      },
    ],
    koFaq: [
      {
        question: "객체와 배열에 대해 React.memo가 실패하는 이유는 무엇인가요?",
        answer: "React.memo는 기본적으로 얕은 비교(Shallow Comparison)를 사용합니다. 부모 컴포넌트가 다시 렌더링될 때 객체나 배열 인스턴스가 새로 생성되어 참조 주소가 바뀌므로, 내부 데이터가 같더라도 자식 컴포넌트가 불필요하게 렌더링됩니다.",
      },
      {
        question: "불안정한 Prop 참조 경고는 어떻게 해결하나요?",
        answer: "부모 컴포넌트에서 객체나 배열을 캐싱하려면 React.useMemo()를 사용하고, 헬퍼 메소드나 콜백을 캐싱하려면 React.useCallback()을 사용하세요.",
      },
    ],
  },
  analytics: {
    events: ["props_compare", "props_error", "memo_suggest"],
  },
};
