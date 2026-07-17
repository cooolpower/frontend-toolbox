export interface MockOptions {
  arrayLength: number;
  includeMsw: boolean;
  endpoint: string;
}

export function generateMockDataAndStub(
  jsonInput: string,
  options: MockOptions
): { mockData: string; stubCode: string } {
  if (!jsonInput.trim()) {
    return { mockData: "", stubCode: "" };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonInput);
  } catch {
    throw new Error("Invalid JSON input. Please provide a valid JSON object or array to mock.");
  }

  function mockValue(value: unknown): unknown {
    if (value === null) return null;
    if (typeof value === "string") {
      const lower = value.toLowerCase();
      if (lower.includes("email")) return "developer@example.com";
      if (lower.includes("name")) return "Jane Doe";
      if (lower.includes("id")) return "uuid_" + Math.random().toString(36).substr(2, 9);
      if (lower.includes("date")) return new Date(Date.now() - Math.random() * 10000000000).toISOString().split("T")[0];
      if (lower.includes("url") || lower.includes("image")) return "https://picsum.photos/200/300";
      return "Mock " + value;
    }
    if (typeof value === "number") {
      if (value === 0) return 0;
      return Math.floor(Math.random() * 100) + 1;
    }
    if (typeof value === "boolean") {
      return Math.random() > 0.5;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) return ["mock_item"];
      const result: unknown[] = [];
      for (let i = 0; i < options.arrayLength; i++) {
        result.push(mockValue(value[0]));
      }
      return result;
    }
    if (typeof value === "object") {
      const obj = value as Record<string, unknown>;
      const result: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj)) {
        result[k] = mockValue(v);
      }
      return result;
    }
    return null;
  }

  let mockResult: unknown;
  if (Array.isArray(parsed)) {
    const list: unknown[] = [];
    const item = parsed.length > 0 ? parsed[0] : { id: 1, name: "Sample Item" };
    for (let i = 0; i < options.arrayLength; i++) {
      list.push(mockValue(item));
    }
    mockResult = list;
  } else {
    mockResult = mockValue(parsed);
  }

  const mockDataStr = JSON.stringify(mockResult, null, 2);

  const endpointPath = options.endpoint || "/api/v1/resource";
  let stubCode = "";

  if (options.includeMsw) {
    stubCode = `import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('${endpointPath}', () => {
    return HttpResponse.json(${JSON.stringify(mockResult, null, 2)});
  }),
];`;
  } else {
    stubCode = `// Next.js Route Handler or Express stub
export async function GET() {
  const data = ${JSON.stringify(mockResult, null, 2)};
  
  return Response.json(data);
}`;
  }

  return { mockData: mockDataStr, stubCode };
}
