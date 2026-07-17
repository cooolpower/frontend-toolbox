import { ToolDefinition } from "../../types";
import { CssShadowTool } from "./tool";

export const cssShadowDefinition: ToolDefinition = {
  id: "css-shadow",
  slug: "css-shadow-generator",
  title: "CSS Shadow Generator",
  koTitle: "CSS 그림자 생성기",
  description: "Create complex CSS box shadows visually. Customize offset, blur, spread, opacity and instantly get modern CSS and Tailwind configs.",
  koDescription: "복잡한 CSS 박스 그림자(box-shadow)를 시각적으로 생성합니다. 오프셋, 흐림(blur), 확산(spread), 투명도를 설정하고 현대적인 CSS 및 Tailwind 설정을 즉시 가져옵니다.",
  category: "css-ui",
  keywords: ["css shadow generator", "box shadow generator", "tailwind shadow converter", "css visual editor"],
  difficulty: "Easy",
  component: CssShadowTool,
  seo: {
    title: "CSS Box Shadow & Tailwind Shadow Code Generator",
    koTitle: "CSS 박스 그림자 및 Tailwind 그림자 코드 생성기",
    description: "Design custom drop shadows and inset shadows visually. Instant output code for standard CSS rules and Tailwind CSS inline arbitrary styles.",
    koDescription: "시각적인 드롭 섀도우 및 인셋 섀도우를 디자인합니다. 표준 CSS 규칙 및 Tailwind CSS 인라인 임의 스타일을 위한 출력 코드를 즉시 제공합니다.",
    keywords: ["box shadow editor", "tailwind arbitrary shadow", "drop shadow css maker", "ui helper shadow"],
    faq: [
      {
        question: "How do I use generated Tailwind CSS arbitrary shadows?",
        answer: "Tailwind CSS allows arbitrary values using brackets. E.g., class='shadow-[0px_10px_20px_rgba(0,0,0,0.1)]' will apply the custom generated style dynamically.",
      },
      {
        question: "What is the difference between shadow blur and spread?",
        answer: "Blur controls how soft or feathered the shadow edges are. Spread controls how large the shadow is in all directions relative to the element box size.",
      },
    ],
    koFaq: [
      {
        question: "생성된 Tailwind CSS 임의 값 그림자는 어떻게 사용하나요?",
        answer: "Tailwind CSS는 대괄호([])를 사용하여 임의의 값을 지정할 수 있게 해줍니다. 예: class='shadow-[0px_10px_20px_rgba(0,0,0,0.1)]'와 같이 사용하여 생성된 스타일을 동적으로 적용할 수 있습니다.",
      },
      {
        question: "그림자의 흐림(blur)과 확산(spread)의 차이는 무엇인가요?",
        answer: "흐림(blur)은 그림자 가장자리가 얼마나 부드러워지는지를 제어합니다. 확산(spread)은 엘리먼트 박스 크기에 대비하여 그림자가 사방으로 얼마나 더 커지거나 작아질지 결정합니다.",
      },
    ],
  },
  analytics: {
    events: ["shadow_adjust", "copy_css_shadow", "copy_tailwind_shadow"],
  },
};
