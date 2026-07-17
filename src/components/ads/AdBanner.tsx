"use client";

import { useEffect, useState, ReactNode } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
}

export function AdBanner({
  slot,
  format = "auto",
  responsive = true,
}: AdBannerProps): ReactNode {
  const [adClient, setAdClient] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAdClient(process.env.NEXT_PUBLIC_ADSENSE_CLIENT);
  }, []);

  // If there's no client key defined, render a beautiful placeholder box for development layout checks.
  if (!adClient) {
    return (
      <div
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "var(--bg-tertiary)",
          border: "1px dashed var(--border)",
          borderRadius: "6px",
          textAlign: "center",
          fontSize: "0.875rem",
          color: "var(--fg-tertiary)",
          margin: "1.5rem 0",
        }}
      >
        <span>[Advertisement Slot {slot}]</span>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", overflow: "hidden", margin: "1.5rem 0" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
