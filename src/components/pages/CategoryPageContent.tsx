"use client";

import { AffiliateCard } from "@/components/AffiliateCard";
import { ToolCard } from "@/components/ToolCard";
import { useLocale } from "@/components/LocaleProvider";
import type { AffiliateOffer, ToolCategory, ToolDefinition } from "@/lib/types";
import type { UnitPairDefinition } from "@/lib/unit-pairs";

interface CategoryPageContentProps {
  category: ToolCategory;
  tools: ToolDefinition[];
  categoryAffiliateOffer: AffiliateOffer | null;
  unitPairs?: UnitPairDefinition[];
}

export function CategoryPageContent({ category, tools, categoryAffiliateOffer, unitPairs }: CategoryPageContentProps) {
  const { t } = useLocale();
  const title = t(`category.${category.slug}.title`, undefined, category.title);
  const shortTitle = t(`category.${category.slug}.short`, undefined, category.shortTitle);
  const description = t(`category.${category.slug}.description`, undefined, category.description);

  return (
    <div className="site-container page-stack">
      <section>
        <p className="eyebrow">{t("category.collection_suffix", { shortTitle }, `${shortTitle} collection`)}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>

      {categoryAffiliateOffer ? <AffiliateCard offer={categoryAffiliateOffer} /> : null}

      <section className="tool-grid">
        {tools.map((tool) => (
          <ToolCard key={`${tool.category}-${tool.slug}`} tool={tool} />
        ))}
      </section>

      {unitPairs?.length ? (
        <section className="content-block">
          <h2>Popular conversions</h2>
          <p>Jump straight to a dedicated converter with the formula and a full conversion table.</p>
          <div className="chip-row">
            {unitPairs.map((pairDef) => (
              <a key={pairDef.slug} className="chip-link" href={`/converters/${pairDef.slug}`}>
                {pairDef.fromAbbr} to {pairDef.toAbbr}
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
