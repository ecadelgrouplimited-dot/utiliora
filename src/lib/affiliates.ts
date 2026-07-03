import type { AffiliateOffer, ToolCategorySlug, ToolDefinition } from "@/lib/types";

export const HOSTINGER_AFFILIATE_URL = "https://www.hostinger.com/uk?REFERRALCODE=O2RECADELPW4";

export const hostingerOffer: AffiliateOffer = {
  label: "Hostinger",
  headline: "Why we recommend Hostinger",
  description:
    "Utiliora itself runs on Hostinger infrastructure — the same VPS hosting serving the page you are reading right now. If you are building or launching a site, it is the host we actually use and trust.",
  benefits: [
    "Domain, SSL, email, and hosting managed in one simple panel",
    "Shared hosting from a few dollars a month, with easy upgrades to VPS as you grow",
    "Fast global data centers with solid uptime — we monitor ours around the clock",
    "24/7 live chat support that actually resolves things",
  ],
  ctaLabel: "Get Hostinger with our discount link",
  url: HOSTINGER_AFFILIATE_URL,
  supportNote:
    "Using our referral link costs you nothing extra (you usually get a new-customer discount) and earns Utiliora a small commission that keeps every tool here free and open source.",
};

/**
 * Web/site-building tools where a hosting recommendation is genuinely
 * relevant — the visitor is actively working on a website.
 */
const toolAffiliateOverrides = new Map<string, AffiliateOffer>([
  ["developer-tools/whois-lookup", hostingerOffer],
  ["developer-tools/dns-lookup", hostingerOffer],
  ["developer-tools/dns-propagation-checker", hostingerOffer],
  ["developer-tools/ssl-checker", hostingerOffer],
  ["developer-tools/http-status-checker", hostingerOffer],
  ["seo-tools/meta-tag-generator", hostingerOffer],
  ["seo-tools/open-graph-generator", hostingerOffer],
  ["seo-tools/xml-sitemap-generator", hostingerOffer],
  ["seo-tools/robots-txt-generator", hostingerOffer],
  ["seo-tools/structured-data-validator", hostingerOffer],
  ["seo-tools/faq-schema-generator", hostingerOffer],
  ["seo-tools/adsense-readiness-auditor", hostingerOffer],
  ["seo-tools/internal-link-map-helper", hostingerOffer],
  ["seo-tools/keyword-cannibalization-checker", hostingerOffer],
  ["seo-tools/html-beautifier", hostingerOffer],
  ["developer-tools/accessibility-auditor-fix-planner", hostingerOffer],
]);

const categoryAffiliatePlacements = new Map<ToolCategorySlug, AffiliateOffer>([
  ["developer-tools", hostingerOffer],
  ["seo-tools", hostingerOffer],
]);

export function getAffiliateOfferForTool(tool: ToolDefinition): AffiliateOffer | null {
  const override = toolAffiliateOverrides.get(`${tool.category}/${tool.slug}`);
  if (override) return override;
  if (tool.affiliate) return tool.affiliate;
  return null;
}

export function getAffiliateOfferForCategory(category: ToolCategorySlug): AffiliateOffer | null {
  return categoryAffiliatePlacements.get(category) ?? null;
}
