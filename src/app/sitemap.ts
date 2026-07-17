import { MetadataRoute } from "next";
import { getAllTools } from "@/features/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();
  const domain = "https://frontend-toolbox.com";

  const toolUrls = tools.map((tool) => ({
    url: `${domain}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${domain}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${domain}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${domain}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${domain}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...toolUrls];
}
