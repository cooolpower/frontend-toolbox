import { ToolDefinition } from "../../types";
import { JwtDecoderTool } from "./tool";

export const jwtDecoderDefinition: ToolDefinition = {
  id: "jwt-decoder",
  slug: "jwt-decoder-online",
  title: "JWT Decoder & Payload Inspector",
  koTitle: "보안 JWT 디코더 및 페이로드 분석기",
  description: "Decode JSON Web Tokens (JWT) safely inside your browser. Analyze headers, token payloads, signature formats, and key claims instantly.",
  koDescription: "브라우저 내에서 안전하게 JSON Web Token(JWT)을 디코딩합니다. 헤더, 토큰 페이로드, 서명 포맷 및 주요 클레임을 즉시 분석합니다.",
  category: "api",
  keywords: ["jwt decoder", "decode json web token", "jwt inspector", "secure jwt parser"],
  difficulty: "Easy",
  component: JwtDecoderTool,
  seo: {
    title: "JWT Decoder - Secure Client-Side Token Parser",
    koTitle: "JWT 디코더 - 보안 클라이언트 사이드 토큰 파서",
    description: "Inspect JWT claims, check token expiration timestamps, and decode JWT payloads without uploading any token data to servers.",
    koDescription: "토큰 데이터를 서버에 업로드하지 않고 JWT 클레임을 검사하고 토큰 만료 시간표를 확인하며 JWT 페이로드를 디코딩합니다.",
    keywords: ["jwt inspect", "jwt online checker", "base64 jwt parsing", "security token parser"],
    faq: [
      {
        question: "Is my token secure when decoding it here?",
        answer: "Yes. The decoding process runs 100% locally in your browser memory using Javascript. We never transmit any token information to our servers.",
      },
      {
        question: "How do I read token expiration (exp) dates?",
        answer: "JWT dates are represented as Unix epoch timestamps (seconds). This tool automatically translates these values into human-readable local times.",
      },
    ],
    koFaq: [
      {
        question: "여기서 토큰을 디코딩하면 제 토큰은 안전한가요?",
        answer: "네, 안전합니다. 디코딩 프로세스는 자바스크립트를 사용해 100% 브라우저 로컬 메모리 내에서 수행됩니다. 저희는 어떠한 토큰 정보도 서버에 전송하지 않습니다.",
      },
      {
        question: "토큰의 만료 일시(exp) 정보는 어떻게 읽나요?",
        answer: "JWT의 시간 정보는 Unix Epoch 타임스탬프(초 단위)로 표기됩니다. 이 도구는 이 숫자 값을 사람이 읽기 편한 한국형 로컬 시간으로 자동 변환해 보여줍니다.",
      },
    ],
  },
  analytics: {
    events: ["jwt_decode_attempt", "jwt_decode_success", "jwt_decode_error"],
  },
};
