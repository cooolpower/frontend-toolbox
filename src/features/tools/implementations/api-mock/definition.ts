import { ToolDefinition } from "../../types";
import { ApiMockTool } from "./tool";

export const apiMockDefinition: ToolDefinition = {
  id: "api-mock",
  slug: "api-mock-generator",
  title: "API Response Mock Generator",
  koTitle: "API 응답 모의 데이터 생성기",
  description: "Generate structured mock data and handler stubs based on JSON examples. Seamless integration with MSW (Mock Service Worker).",
  koDescription: "JSON 예제를 기반으로 구조화된 모의 데이터와 핸들러 스텁을 생성합니다. MSW (Mock Service Worker)와 매끄럽게 연동됩니다.",
  category: "api",
  keywords: ["api mock generator", "msw mock generator", "mock data generator", "typescript mock"],
  difficulty: "Medium",
  component: ApiMockTool,
  seo: {
    title: "API Response Mock Generator & MSW Stub Builder",
    koTitle: "API 응답 모의 데이터 생성기 및 MSW 스텁 빌더",
    description: "Generate mock JSON data arrays and MSW handler stubs directly from sample API responses. Boost your frontend test coverage and mock server speed.",
    koDescription: "샘플 API 응답에서 모의 JSON 데이터 배열과 MSW 핸들러 스텁을 직접 생성하세요. 프론트엔드 테스트 커버리지와 모의 서버 속도를 높입니다.",
    keywords: ["msw mockup", "api response mock", "mock json data maker", "api mockup"],
    faq: [
      {
        question: "What is MSW (Mock Service Worker)?",
        answer: "Mock Service Worker is an API mocking library that uses Service Worker API to intercept actual network requests. This tool generates standard MSW handler templates.",
      },
      {
        question: "Can I customize the array length for collections?",
        answer: "Yes, you can specify the exact number of list objects to generate through the 'Mock Array Length' field in the options panel.",
      },
    ],
    koFaq: [
      {
        question: "MSW (Mock Service Worker)란 무엇인가요?",
        answer: "Mock Service Worker는 Service Worker API를 사용하여 실제 네트워크 요청을 가로채는 API 모킹 라이브러리입니다. 이 도구는 표준 MSW 핸들러 템플릿을 생성합니다.",
      },
      {
        question: "컬렉션의 배열 길이를 사용자 정의할 수 있나요?",
        answer: "네, 옵션 패널의 '모의 배열 길이' 필드를 통해 생성할 리스트 객체의 정확한 개수를 지정할 수 있습니다.",
      },
    ],
  },
  analytics: {
    events: ["mock_generate", "mock_error", "copy_mock_json", "copy_msw"],
  },
};
