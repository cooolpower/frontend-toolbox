import { ToolDefinition } from "../../types";
import { JsonToTsTool } from "./tool";

export const jsonToTsDefinition: ToolDefinition = {
  id: "json-to-ts",
  slug: "json-to-typescript",
  title: "JSON to TypeScript Generator",
  koTitle: "JSON to TypeScript 변환기",
  description: "Convert JSON structures to TypeScript interfaces or type aliases instantly. Supports nested objects and customizable type options.",
  koDescription: "JSON 구조를 TypeScript 인터페이스 또는 타입 별칭으로 즉시 변환합니다. 중첩된 객체와 맞춤형 타입 옵션을 지원합니다.",
  category: "typescript",
  keywords: ["json to typescript", "generate typescript interface", "json to type", "typescript generator"],
  difficulty: "Easy",
  component: JsonToTsTool,
  seo: {
    title: "JSON to TypeScript Interface Generator - Free Developer Tool",
    koTitle: "JSON to TypeScript 인터페이스 변환기 - 무료 개발자 도구",
    description: "Easily convert JSON objects to clean, reusable TypeScript interfaces and types. Supports optional values, custom root types, and nested object detection.",
    koDescription: "JSON 객체를 깨끗하고 재사용 가능한 TypeScript 인터페이스 및 타입으로 쉽게 변환하세요. 선택적 값, 사용자 정의 루트 타입 및 중첩 객체 감지를 지원합니다.",
    keywords: ["json to ts", "json schema to ts", "typescript interface generator", "typescript tool"],
    faq: [
      {
        question: "How does the JSON to TypeScript generator handle nested objects?",
        answer: "The generator detects nested objects recursively and extracts them into separate, cleanly named interfaces or inline type properties depending on your structural setup.",
      },
      {
        question: "Can I generate Type Aliases instead of Interfaces?",
        answer: "Yes, you can check the 'Use Type Alias' option to generate types using the 'export type ... =' syntax.",
      },
    ],
    koFaq: [
      {
        question: "JSON to TypeScript 변환기는 중첩된 객체를 어떻게 처리하나요?",
        answer: "변환기는 중첩된 객체를 재귀적으로 감지하여 구조적 설정에 따라 별도의 깔끔하게 명명된 인터페이스 또는 인라인 타입 속성으로 추출합니다.",
      },
      {
        question: "인터페이스 대신 타입 별칭(Type Alias)을 생성할 수 있나요?",
        answer: "네, '타입 별칭 사용' 옵션을 체크하면 'export type ... =' 구문을 사용하여 타입을 생성할 수 있습니다.",
      },
    ],
  },
  analytics: {
    events: ["json_convert", "json_error", "copy_typescript"],
  },
};
