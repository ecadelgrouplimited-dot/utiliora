export const SITE_NAME = "Utiliora";
export const SITE_ORIGIN = "https://www.utiliora.cloud";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_ORIGIN).toString();
}

/**
 * Explicit OG image list for page metadata. Next.js merges `openGraph`
 * shallowly, so pages that define their own openGraph config lose inherited
 * images — every page must reference its image route explicitly.
 */
export function ogImages(path = "/opengraph-image") {
  return [
    {
      url: absoluteUrl(path),
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} preview card`,
    },
  ];
}
