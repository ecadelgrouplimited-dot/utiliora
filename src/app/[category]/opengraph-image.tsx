import { ImageResponse } from "next/og";
import { getCategory } from "@/lib/categories";
import { OgCard, OG_SIZE } from "@/lib/og-card";
import { getToolsByCategory } from "@/lib/tools";

export const alt = "Utiliora tool category";
export const size = OG_SIZE;
export const contentType = "image/png";

interface CategoryImageProps {
  params: { category: string };
}

export default function Image({ params }: CategoryImageProps) {
  const category = getCategory(params.category);
  const toolCount = category ? getToolsByCategory(category.slug).length : 0;

  return new ImageResponse(
    (
      <OgCard
        eyebrow="Free tool collection"
        title={category?.title ?? "Utility Tools"}
        subtitle={category?.description}
        chips={[
          toolCount ? `${toolCount} free tools` : "Free tools",
          "No signup",
          "Runs in your browser",
        ]}
      />
    ),
    size,
  );
}
