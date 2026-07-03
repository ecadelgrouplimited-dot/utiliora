# Utiliora Readiness Report

**Date:** July 3, 2026
**Live site:** https://www.utiliora.cloud
**Repo:** https://github.com/ecadelgrouplimited-dot/utiliora (public, open source)
**Goal:** 100,000+ monthly visitors, monetized via AdSense.

---

## 1. Infrastructure — READY

| Item | Status |
|---|---|
| Hosting | Self-hosted VPS (72.62.185.212), pm2 process `utiliora`, port 4500 |
| HTTPS | Let's Encrypt, both hosts, auto-renewing (expires 2026-10-01, renews itself) |
| Canonicalization | All variants 301 → `https://www.utiliora.cloud` (apex, http, www-http) |
| Deploys | Push to `main`, then `ssh root@72.62.185.212 /var/www/utiliora/deploy.sh` (pull → build → zero-downtime pm2 reload) |
| VPS repo access | Anonymous HTTPS pull (repo is public; no keys on the server) |
| Framework | Next.js 14.2.35 (patched for the Dec 2025 security advisory) |

## 2. Performance — READY

- Tool-page critical JS cut from **434 kB → 125 kB** by splitting the 49k-line
  ToolRenderer out of the route chunk (`next/dynamic`, SSR preserved).
- Heavy libraries (jspdf, jszip, pdfjs, tesseract, jsbarcode, qrcode) all
  lazy-load at point of use.
- All 234 pages statically generated; server responses ~100 ms.
- Remaining (optional) work: split the 85 tool implementations into per-tool
  chunks so a tool page downloads only its own code. Critical-path problem is
  already solved; this is a polish pass.

## 3. SEO surface — READY

- **234 indexable pages**: 85 tools, 59 unit-pair converter pages, 7 category
  pages, 5 workflow bundles, core pages.
- Unique metadata + canonical on every page; branded 1200×630 OG image on
  every page (site/category/tool/pair variants).
- Structured data: SoftwareApplication + BreadcrumbList + FAQPage on tool and
  pair pages, CollectionPage + ItemList on categories, WebSite + SearchAction
  + Organization on the homepage.
- robots.txt, sitemap.xml (all 234 URLs), IndexNow automated
  (`npm run indexnow:submit` after each release).
- Google Search Console: verified, sitemap submitted and processed.
  **Recommended:** add a Domain property (`utiliora.cloud`) so indexing stats
  cover the canonical `www` URLs (current property is the apex URL-prefix).

## 4. Content — STRONG, KEEP EXPANDING

- **26 tools** have hand-written editorial content (intro, use cases, tips,
  unique FAQs): the 10 hero tools plus the 16 highest-search tools.
- **59 unit-pair pages** each carry a unique conversion table, exact formula
  (including correct offset formulas for temperature), worked example,
  generated FAQ, and reverse/related links.
- Remaining ~59 tools still use category-templated guidance. Extending the
  article layer (`src/lib/tool-articles.ts`, keyed `category/slug`) is the
  highest-value writing work left. Add pairs in `src/lib/unit-pairs.ts` —
  one line each.

## 5. AdSense readiness — APPLY AFTER TRAFFIC BASELINE

Checklist against the criteria the site's own AdSense Readiness Auditor uses:

- [x] About, Contact, Privacy Policy, Terms pages — present and substantive
- [x] robots.txt and sitemap resolve and are correct
- [x] Original, unique content on high-traffic pages (26 tools + 59 pairs)
- [x] Fast, mobile-first pages (Core Web Vitals-friendly payloads)
- [x] HTTPS with clean canonical URLs
- [x] AdSense account meta tag already in the page head (`ca-pub-8247984832507820`)
- [ ] **Wait for 2–4 weeks of organic traffic in GSC before applying** —
  approvals favor sites with real visitors and crawl history
- [ ] After approval: publish `ads.txt` with the publisher ID immediately
- [ ] Reintroduce ad slots with fixed dimensions only (zero layout shift),
  and never inside tool interaction areas

## 6. Growth plan to 100k/month

1. **Weeks 1–3:** Watch GSC impressions. Pair pages surface first. Expand
   whatever shows traction (next tier: per-value pages, e.g. "170 cm in feet").
2. **Ongoing:** Article batches for remaining tools (~15/session).
3. **After traffic baseline:** AdSense application, then careful slot placement.
4. **Compounding channels:** the OG cards make every share a rich preview —
   push tool links into relevant communities (Reddit, X, WhatsApp groups);
   open source positioning is credible and shareable (repo is public).
5. **Dedicated session:** per-tool code splitting; hreflang/i18n expansion
   once English traffic is established.

## 7. Operations runbook

```bash
# Deploy latest main to production
ssh root@72.62.185.212 /var/www/utiliora/deploy.sh

# Ping search engines after a release
npm run indexnow:submit

# Logs / status on the VPS
pm2 logs utiliora --lines 100
pm2 ls
tail /root/utiliora-ssl.log        # SSL issuance history
```

- Env secrets live in `/var/www/utiliora/.env.local` (not in git).
- nginx vhost: `/etc/nginx/sites-available/utiliora.cloud.conf`.
- Certbot renews automatically; no action needed until at least Oct 2026.
