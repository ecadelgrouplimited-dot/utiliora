import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og-card";

export const alt = "Utiliora — free browser-based tools for real digital work";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        title="Simple Tools. Instant Results."
        subtitle="Free calculators, converters, SEO, image, developer, and productivity tools — no signup, right in your browser."
      />
    ),
    size,
  );
}
