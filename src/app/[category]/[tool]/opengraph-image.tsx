import { ImageResponse } from "next/og";
import { getCategory } from "@/lib/categories";
import { OgCard, OG_SIZE } from "@/lib/og-card";
import { getToolByCategoryAndSlug } from "@/lib/tools";
import { buildPairDescription, getUnitPairBySlug } from "@/lib/unit-pairs";

export const alt = "Utiliora free online tool";
export const size = OG_SIZE;
export const contentType = "image/png";

interface ToolImageProps {
  params: { category: string; tool: string };
}

export default function Image({ params }: ToolImageProps) {
  const tool = getToolByCategoryAndSlug(params.category, params.tool);
  const category = tool ? getCategory(tool.category) : null;

  if (!tool && params.category === "converters") {
    const pairDef = getUnitPairBySlug(params.tool);
    if (pairDef) {
      const from = pairDef.fromName.charAt(0).toUpperCase() + pairDef.fromName.slice(1);
      const to = pairDef.toName.charAt(0).toUpperCase() + pairDef.toName.slice(1);
      return new ImageResponse(
        (
          <OgCard
            eyebrow="Unit Converter"
            title={`${from} to ${to} (${pairDef.fromAbbr} to ${pairDef.toAbbr})`}
            subtitle={buildPairDescription(pairDef)}
          />
        ),
        size,
      );
    }
  }

  return new ImageResponse(
    (
      <OgCard
        eyebrow={category?.title ?? "Free online tool"}
        title={tool?.title ?? "Simple Tools. Instant Results."}
        subtitle={tool?.summary}
      />
    ),
    size,
  );
}
