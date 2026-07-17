// GA4 Event Tracking Utility

// Extend global window object for gtag
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config",
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export function trackPageView(url: string): void {
  if (typeof window !== "undefined" && window.gtag && GA_TRACKING_ID) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
}

// Track custom tool events
export interface ToolEventParams {
  toolId: string;
  actionType?: string;
  [key: string]: unknown;
}

export function trackToolEvent(
  eventName: "tool_open" | "tool_execute" | "copy_click" | "download_click",
  params: ToolEventParams
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      ...params,
      event_category: "ToolInteraction",
    });
  } else {
    // Fallback logging in development mode
    console.log(`[GA4 Event] ${eventName}:`, params);
  }
}
