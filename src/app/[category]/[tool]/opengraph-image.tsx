import { ImageResponse } from "next/og";
import { getCategory } from "@/lib/categories";
import { OgCard, OG_SIZE } from "@/lib/og-card";
import { getToolByCategoryAndSlug } from "@/lib/tools";

export const alt = "Utiliora free online tool";
export const size = OG_SIZE;
export const contentType = "image/png";

interface ToolImageProps {
  params: { category: string; tool: string };
}

export default function Image({ params }: ToolImageProps) {
  const tool = getToolByCategoryAndSlug(params.category, params.tool);
  const category = tool ? getCategory(tool.category) : null;

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
