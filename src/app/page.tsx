import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/HomePageContent";
import { getCategories } from "@/lib/categories";
import { getHeroTools, getWorkflowBundles } from "@/lib/growth";
import { SITE_NAME, SITE_ORIGIN, absoluteUrl, ogImages } from "@/lib/site";
import { getAllTools, getLatestTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Browser-Based Tools For Real Digital Work",
  description:
    "Use focused browser-based tools for SEO, creators, developers, business ops, and everyday calculations without signup friction.",
  keywords: [
    "browser based tools",
    "workflow tools",
    "free calculators",
    "seo tools online",
    "creator tools",
    "developer utilities",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: ogImages(),
    title: `${SITE_NAME} | Browser-Based Tools For Real Digital Work`,
    description:
      "Use focused browser-based tools for SEO, creators, developers, business ops, and everyday calculations without signup friction.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    images: ogImages(),
    card: "summary_large_image",
    title: `${SITE_NAME} | Browser-Based Tools For Real Digital Work`,
    description:
      "Use focused browser-based tools for SEO, creators, developers, business ops, and everyday calculations without signup friction.",
  },
};

export default function Home() {
  const categories = getCategories();
  const allTools = getAllTools();
  const heroTools = getHeroTools();
  const workflowBundles = getWorkflowBundles();
  const featuredTools = heroTools.slice(0, 6);
  const latestTools = getLatestTools(6);
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description:
      "Global utility platform with calculators, converters, SEO tools, image tools, developer tools, and productivity tools.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_ORIGIN}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/icons/icon-512.png`,
  };

  return (
    <>
      <HomePageContent
        categories={categories}
        allTools={allTools}
        featuredTools={featuredTools}
        heroTools={heroTools}
        workflowBundles={workflowBundles}
        latestTools={latestTools}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, organizationSchema]) }}
      />
    </>
  );
}
