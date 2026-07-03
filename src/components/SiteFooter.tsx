"use client";

import { useLocale } from "@/components/LocaleProvider";
import { HOSTINGER_AFFILIATE_URL } from "@/lib/affiliates";

export function SiteFooter() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <div className="footer-brand">
          <strong>{t("brand.name", undefined, "Utiliora")}</strong>
          <p>{t("brand.tagline", undefined, "Simple tools. Instant results.")}</p>
          <small>{t("footer.copyright", { year }, `Copyright ${year} utiliora.cloud`)}</small>
        </div>

        <nav className="footer-links" aria-label="Footer links">
          <a href="/tools">{t("footer.tools", undefined, "Tools")}</a>
          <a href="/about">{t("footer.about", undefined, "About")}</a>
          <a href="/contact">{t("footer.contact", undefined, "Contact")}</a>
          <a href="/privacy">{t("footer.privacy", undefined, "Privacy")}</a>
          <a href="/terms">{t("footer.terms", undefined, "Terms")}</a>
        </nav>

        <div className="footer-socials" aria-label="Social links">
          <a href="mailto:hello@utiliora.cloud">hello@utiliora.cloud</a>
          <a href="https://x.com/utilioracloud" target="_blank" rel="noreferrer">
            X/Twitter
          </a>
          <a href="https://www.threads.com/@utilioracloud" target="_blank" rel="noreferrer">
            Threads
          </a>
          <a href="https://www.youtube.com/@utiliora" target="_blank" rel="noreferrer">
            YouTube
          </a>
        </div>

        <nav className="footer-links" aria-label="Partner links">
          <strong className="footer-column-title">
            {t("footer.partners_title", undefined, "Tools we use")}
          </strong>
          <a href={HOSTINGER_AFFILIATE_URL} target="_blank" rel="noopener noreferrer nofollow sponsored">
            {t("footer.partner_hostinger", undefined, "Hostinger — hosting we run on")}
          </a>
          <a href="https://github.com/ecadelgrouplimited-dot/utiliora" target="_blank" rel="noreferrer">
            {t("footer.open_source", undefined, "Open source on GitHub")}
          </a>
          <small className="footer-disclosure">
            {t(
              "footer.affiliate_disclosure",
              undefined,
              "Some links are affiliate links: they cost you nothing and help keep Utiliora free.",
            )}
          </small>
        </nav>
      </div>
    </footer>
  );
}
