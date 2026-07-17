import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, getAllTools } from "@/features/tools/registry";
import { ToolLayout } from "@/components/layout/ToolLayout";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {};
  }

  return {
    title: `${tool.seo.title} | Frontend Toolbox`,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    alternates: {
      canonical: `https://frontend-toolbox.com/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      url: `https://frontend-toolbox.com/tools/${tool.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seo.title,
      description: tool.seo.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;

  return (
    <ToolLayout tool={tool}>
      <ToolComponent />
    </ToolLayout>
  );
}
