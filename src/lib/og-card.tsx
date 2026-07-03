import { SITE_NAME } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

interface OgCardOptions {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  chips?: string[];
}

const DEFAULT_CHIPS = ["100% Free", "No signup", "Runs in your browser"];

/**
 * Shared element tree for opengraph-image routes. Satori only supports
 * flexbox layout and inline styles, so everything is styled inline.
 */
export function OgCard({ eyebrow, title, subtitle, chips = DEFAULT_CHIPS }: OgCardOptions) {
  const titleSize = title.length > 52 ? 56 : title.length > 32 ? 66 : 78;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        backgroundColor: "#0c2c4d",
        backgroundImage: "linear-gradient(135deg, #0c2c4d 0%, #174f86 58%, #1d6ab3 100%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#ffffff",
              color: "#174f86",
              fontSize: 36,
              fontWeight: 800,
              marginRight: 18,
            }}
          >
            U
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>{SITE_NAME}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#bcd7f2" }}>utiliora.cloud</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {eyebrow ? (
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              color: "#8fc1ef",
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 1020,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#d7e8f9",
              marginTop: 22,
              maxWidth: 980,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {chips.map((chip) => (
          <div
            key={chip}
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              color: "#eaf4ff",
              backgroundColor: "rgba(255, 255, 255, 0.14)",
              border: "1px solid rgba(255, 255, 255, 0.28)",
              borderRadius: 999,
              padding: "10px 26px",
              marginRight: 18,
            }}
          >
            {chip}
          </div>
        ))}
      </div>
    </div>
  );
}
