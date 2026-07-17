import { ToolDefinition } from "../types";
import { jsonToTsDefinition } from "../implementations/json-to-ts/definition";
import { apiMockDefinition } from "../implementations/api-mock/definition";
import { propsDiffDefinition } from "../implementations/props-diff/definition";
import { cssShadowDefinition } from "../implementations/css-shadow/definition";
import { layoutBuilderDefinition } from "../implementations/layout-builder/definition";
import { jwtDecoderDefinition } from "../implementations/jwt-decoder/definition";

// Central array registering all tools in the application.
// To add a new tool, simply import its definition and add it to this list.
const TOOLS_REGISTRY: ToolDefinition[] = [
  jsonToTsDefinition,
  apiMockDefinition,
  propsDiffDefinition,
  cssShadowDefinition,
  layoutBuilderDefinition,
  jwtDecoderDefinition,
];

export function getAllTools(): ToolDefinition[] {
  return TOOLS_REGISTRY;
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS_REGISTRY.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolDefinition["category"]): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((tool) => tool.category === category);
}

export function getRelatedTools(currentTool: ToolDefinition, limit = 3): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((tool) => tool.id !== currentTool.id)
    .map((tool) => {
      let score = 0;
      if (tool.category === currentTool.category) {
        score += 3;
      }
      const sharedKeywords = tool.keywords.filter((kw) => currentTool.keywords.includes(kw));
      score += sharedKeywords.length * 2;
      return { tool, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.tool)
    .slice(0, limit);
}
