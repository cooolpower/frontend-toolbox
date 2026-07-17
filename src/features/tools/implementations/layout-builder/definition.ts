import { ToolDefinition } from "../../types";
import { LayoutBuilderTool } from "./tool";

export const layoutBuilderDefinition: ToolDefinition = {
  id: "layout-builder",
  slug: "css-layout-builder",
  title: "CSS Flex/Grid Layout Builder",
  koTitle: "CSS Flex/Grid 레이아웃 빌더",
  description: "Configure CSS Flexbox and Grid layouts visually. Customize alignment, wrap, gap, rows, and columns with interactive live preview boards.",
  koDescription: "CSS Flexbox 및 Grid 레이아웃을 시각적으로 구성합니다. 실시간 프리뷰 보드를 통해 정렬 방식, 줄바꿈, 간격, 행과 열을 자유롭게 조정하세요.",
  category: "css-ui",
  keywords: ["css layout builder", "flexbox visual generator", "css grid helper", "interactive layout builder"],
  difficulty: "Medium",
  component: LayoutBuilderTool,
  seo: {
    title: "CSS Layout Builder - Interactive Flexbox & Grid Generator",
    koTitle: "CSS 레이아웃 빌더 - Flexbox 및 Grid 디자인 제너레이터",
    description: "Design responsive web layouts interactively. Visual controls for flex-direction, align-items, grid-template-columns, and instant CSS code output.",
    koDescription: "반응형 웹 레이아웃을 대화식으로 디자인하세요. flex-direction, align-items, grid-template-columns 등을 위한 시각적 컨트롤 및 즉각적인 CSS 코드 출력을 제공합니다.",
    keywords: ["flexbox editor", "grid visual designmaker", "css layout cheat sheet", "ui layout code"],
    faq: [
      {
        question: "What is the key difference between Flexbox and Grid?",
        answer: "Flexbox is designed for one-dimensional layouts (either a single row or column), whereas CSS Grid is optimized for two-dimensional structures (both rows and columns simultaneously).",
      },
      {
        question: "Can I copy individual layout attributes into my existing stylesheet?",
        answer: "Yes, you can copy the generated CSS properties from the output editor card and drop them directly into your stylesheet class or inline styles.",
      },
    ],
    koFaq: [
      {
        question: "Flexbox와 CSS Grid의 핵심 차이점은 무엇인가요?",
        answer: "Flexbox는 1차원 레이아웃(단일 행 또는 열)을 위해 설계된 반면, CSS Grid는 2차원 구조(행과 열을 동시에 제어)에 최적화되어 있습니다.",
      },
      {
        question: "생성된 레이아웃 속성을 내 스타일시트에 부분적으로 적용할 수 있나요?",
        answer: "네, 코드 출력 카드에서 생성된 CSS 속성을 복사하여 귀하의 기존 스타일시트 클래스 또는 인라인 스타일에 직접 대입해 사용할 수 있습니다.",
      },
    ],
  },
  analytics: {
    events: ["layout_type_switch", "layout_adjust_param", "copy_layout_css"],
  },
};
