import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPageContent } from "@/components/pages/ToolPageContent";
import { getAffiliateOfferForTool } from "@/lib/affiliates";
import { getCategory } from "@/lib/categories";
import { absoluteUrl, ogImages, SITE_NAME } from "@/lib/site";
import { buildToolFaqWithArticle, getToolArticle } from "@/lib/tool-articles";
import { getAllTools, getRelatedTools, getToolByCategoryAndSlug } from "@/lib/tools";
import { UnitPairPageContent } from "@/components/pages/UnitPairPageContent";
import {
  buildPairDescription,
  buildPairFaq,
  buildPairTitle,
  getAllUnitPairs,
  getUnitPairBySlug,
} from "@/lib/unit-pairs";

interface ToolPageProps {
  params: {
    category: string;
    tool: string;
  };
}

export function generateStaticParams() {
  return [
    ...getAllTools().map((tool) => ({
      category: tool.category,
      tool: tool.slug,
    })),
    ...getAllUnitPairs().map((pairDef) => ({
      category: "converters",
      tool: pairDef.slug,
    })),
  ];
}

function getUnitPairForParams(params: ToolPageProps["params"]) {
  if (params.category !== "converters") return null;
  return getUnitPairBySlug(params.tool);
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = getToolByCategoryAndSlug(params.category, params.tool);
  if (!tool) {
    const pairDef = getUnitPairForParams(params);
    if (!pairDef) return {};
    const title = buildPairTitle(pairDef);
    const description = buildPairDescription(pairDef);
    const path = `/converters/${pairDef.slug}`;
    return {
      title,
      description,
      keywords: [...pairDef.keywords, `${pairDef.fromAbbr} to ${pairDef.toAbbr}`, "unit converter", "utiliora"],
      alternates: { canonical: path },
      openGraph: {
        title,
        description,
        url: absoluteUrl(path),
        type: "article",
        images: ogImages(`${path}/opengraph-image`),
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | ${SITE_NAME}`,
        description,
        images: ogImages(`${path}/opengraph-image`),
      },
      robots: { index: true, follow: true },
    };
  }
  return {
    title: tool.title,
    description: tool.description,
    keywords: Array.from(new Set([...tool.keywords, tool.title.toLowerCase(), `${tool.category} tool`, "utiliora"])),
    alternates: {
      canonical: `/${tool.category}/${tool.slug}`,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: absoluteUrl(`/${tool.category}/${tool.slug}`),
      type: "article",
      images: ogImages(`/${tool.category}/${tool.slug}/opengraph-image`),
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
      images: ogImages(`/${tool.category}/${tool.slug}/opengraph-image`),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function buildJsonLd(
  toolTitle: string,
  description: string,
  categoryTitle: string,
  categorySlug: string,
  toolSlug: string,
  faq: Array<{ question: string; answer: string }>,
) {
  const url = absoluteUrl(`/${categorySlug}/${toolSlug}`);
  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: toolTitle,
    applicationCategory: categoryTitle,
    operatingSystem: "Web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description,
    url,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryTitle,
        item: absoluteUrl(`/${categorySlug}`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: toolTitle,
        item: url,
      },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return [softwareApplication, breadcrumb, faqPage];
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolByCategoryAndSlug(params.category, params.tool);
  if (!tool) {
    const pairDef = getUnitPairForParams(params);
    if (!pairDef) notFound();
    const jsonLd = buildJsonLd(
      buildPairTitle(pairDef),
      buildPairDescription(pairDef),
      "Converters",
      "converters",
      pairDef.slug,
      buildPairFaq(pairDef),
    );
    return (
      <>
        <UnitPairPageContent pairDef={pairDef} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </>
    );
  }

  const category = getCategory(tool.category);
  const relatedTools = getRelatedTools(tool);
  const affiliateOffer = getAffiliateOfferForTool(tool);
  const article = getToolArticle(tool);
  const categoryTitle = category?.title ?? "Utility Tool";
  const jsonLd = buildJsonLd(
    tool.title,
    tool.description,
    categoryTitle,
    tool.category,
    tool.slug,
    buildToolFaqWithArticle(tool, article),
  );

  return (
    <>
      <ToolPageContent
        tool={tool}
        categoryTitle={categoryTitle}
        relatedTools={relatedTools}
        affiliateOffer={affiliateOffer}
        article={article}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
