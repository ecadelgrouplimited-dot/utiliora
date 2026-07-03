import { buildEnhancedToolFaq } from "@/lib/tool-content";
import type { ToolDefinition, ToolFaq } from "@/lib/types";

/**
 * Hand-written, per-tool editorial content for high-priority tools.
 * Unlike the category-templated guidance in tool-content.ts, every string
 * here is unique to one tool — this is what lets individual tool pages rank
 * on their own merits instead of sharing boilerplate with 80 siblings.
 */
export interface ToolArticle {
  intro: string[];
  useCases: string[];
  tips: string[];
  faq: ToolFaq[];
}

const ARTICLES: Record<string, ToolArticle> = {
  "calculators/age-calculator": {
    intro: [
      "The Age Calculator turns a birth date into a complete age breakdown: years, months, and days, plus total days lived and a countdown to the next birthday. Because you can also set a custom target date, it doubles as a date-difference calculator for anniversaries, contracts, visa windows, and eligibility cut-offs.",
      "Everything runs instantly in your browser. There is no form to submit and no account to create — change either date and the result updates as you type.",
    ],
    useCases: [
      "Check exact age in years, months, and days for school enrollment, sports leagues, or visa and retirement eligibility rules that use precise cut-off dates.",
      "Work out someone's age on a specific past or future date, such as the first day of a school year or the date of a scheduled exam.",
      "Count the exact number of days between two dates for notice periods, probation windows, or medication schedules.",
      "Find out which weekday you were born on and how many days remain until your next birthday.",
    ],
    tips: [
      "Set the target date to something other than today to answer questions like \"how old will I be on June 1, 2030?\"",
      "For eligibility rules phrased as \"must be 18 by the start date\", enter the start date as the target date rather than checking today's age.",
      "Total days lived is handy for 10,000-day and 20,000-day milestone celebrations — a fun alternative to birthdays.",
    ],
    faq: [
      {
        question: "How does the Age Calculator handle leap years?",
        answer:
          "The calculation uses real calendar arithmetic, so February 29 birthdays and leap-year day counts are handled exactly rather than approximated with a 365-day year.",
      },
      {
        question: "Can I calculate age at a date in the past or future?",
        answer:
          "Yes. Set the target date field to any date and the tool reports the exact age on that day — useful for eligibility rules, historical records, and planning ahead.",
      },
    ],
  },
  "calculators/bmi-calculator": {
    intro: [
      "The BMI Calculator computes Body Mass Index from your height and weight and places the result in the standard World Health Organization categories: underweight (below 18.5), healthy range (18.5–24.9), overweight (25–29.9), and obesity (30 and above).",
      "BMI is a screening number, not a diagnosis — it cannot distinguish muscle from fat. Use it as a quick trend indicator, and pair it with the Body Fat Calculator on Utiliora for a more complete picture.",
    ],
    useCases: [
      "Track how your BMI moves over a training or nutrition block by re-checking with the same conditions each month.",
      "Convert between the metric and imperial mindsets quickly — enter kg and cm, or use the pound and inch conversions from the converters section first.",
      "Pre-fill health, insurance, or fitness program forms that ask for a current BMI value.",
      "Sanity-check a weight goal: enter the target weight with your height to see which category the goal would land in.",
    ],
    tips: [
      "Weigh yourself at the same time of day for comparable readings — morning after waking is the most repeatable.",
      "Athletes with high muscle mass often read as overweight on BMI; a body-fat estimate is the better indicator in that case.",
      "For children and teens, BMI is interpreted against age-specific percentiles, not these adult ranges — ask a pediatrician for the right chart.",
    ],
    faq: [
      {
        question: "What formula does the BMI Calculator use?",
        answer:
          "BMI = weight in kilograms divided by height in meters squared (kg/m²). Imperial inputs are converted internally, equivalent to 703 × weight in pounds / height in inches squared.",
      },
      {
        question: "Is BMI accurate for athletes and older adults?",
        answer:
          "BMI over-reads for muscular athletes and can under-read for older adults with reduced muscle mass. Treat it as a population-level screening number and use body-fat percentage or waist measurements for individual decisions.",
      },
    ],
  },
  "calculators/body-fat-calculator": {
    intro: [
      "This Body Fat Calculator implements the U.S. Navy circumference method: it estimates body-fat percentage from your height, neck, and waist measurements (plus hips for women), with no calipers, scales, or lab equipment required.",
      "The Navy method is used for military fitness standards because it is fast, repeatable, and requires only a tape measure. Expect results within a few percentage points of a DEXA scan when measurements are taken carefully.",
    ],
    useCases: [
      "Track a cut or bulk with a metric that separates fat change from total weight change — something a bathroom scale cannot do.",
      "Estimate lean body mass to set protein targets, since common recommendations are expressed per kilogram of lean mass.",
      "Check against military, police, or fire service body-composition standards that use the same circumference formula.",
      "Get a starting body-fat estimate before investing in a smart scale or a DEXA scan.",
    ],
    tips: [
      "Measure the waist at the navel, relaxed, without pulling the tape tight — tape tension is the biggest source of error.",
      "Take each measurement twice and average them; re-measure at the same time of day for trend tracking.",
      "Track the trend over weeks rather than reacting to a single reading — day-to-day water shifts move circumference measurements noticeably.",
    ],
    faq: [
      {
        question: "How accurate is the U.S. Navy body-fat method?",
        answer:
          "Studies place it within roughly 3–4 percentage points of DEXA for most people when measurements are taken correctly. Its real strength is consistency: measured the same way each time, it tracks changes reliably.",
      },
      {
        question: "Why does the calculation differ for men and women?",
        answer:
          "The Navy formula uses waist minus neck for men, and waist plus hips minus neck for women, reflecting typical differences in fat distribution. Height enters both versions logarithmically.",
      },
    ],
  },
  "calculators/water-intake-calculator": {
    intro: [
      "The Water Intake Calculator gives you a personalized daily hydration target in both milliliters and liters, based on body weight and activity level rather than the one-size-fits-all \"8 glasses\" rule.",
      "Hydration needs scale with body mass and sweat loss. A 90 kg runner in summer needs far more than a 55 kg office worker in winter — this tool reflects that instead of guessing.",
    ],
    useCases: [
      "Set a realistic daily water goal for a fitness app, smart bottle, or habit tracker instead of accepting the default.",
      "Adjust intake targets for training days versus rest days by re-running the calculation with a different activity level.",
      "Plan fluid supplies for hikes, long runs, or travel days where water access is limited.",
      "Help kids or older family members establish an age- and weight-appropriate baseline.",
    ],
    tips: [
      "Roughly 20% of daily fluid typically comes from food, so treat the target as total intake, not just plain water.",
      "Spread intake through the day; very large amounts in a short window are neither comfortable nor useful.",
      "Urine color is a practical live indicator: pale straw suggests you are on track, dark yellow suggests you are behind.",
    ],
    faq: [
      {
        question: "Is the \"8 glasses of water a day\" rule accurate?",
        answer:
          "It is a rough population average, not a personal target. Body weight, activity, climate, and diet change individual needs substantially — a weight-based calculation is a much better starting point.",
      },
      {
        question: "Does coffee or tea count toward daily water intake?",
        answer:
          "Yes. The mild diuretic effect of caffeine does not cancel out the fluid consumed, so caffeinated drinks still contribute positively to daily hydration totals.",
      },
    ],
  },
  "seo-tools/meta-tag-generator": {
    intro: [
      "The Meta Tag Generator builds a complete, copy-paste-ready head section for any page: title and description tags, Open Graph tags for Facebook, WhatsApp, and LinkedIn previews, and Twitter Card tags — all validated for length as you type.",
      "Titles and descriptions are the first thing searchers see in results, and Open Graph tags decide whether a shared link shows a rich preview or a bare URL. Getting them right is the cheapest click-through improvement in SEO.",
    ],
    useCases: [
      "Generate correct meta tags for a landing page, portfolio, or product page without memorizing tag syntax.",
      "Fix pages that show broken or empty previews when shared in WhatsApp, Slack, or social feeds.",
      "Draft title and description variants and check pixel-length limits before handing them to a developer.",
      "Add Twitter Card and Open Graph coverage to older pages that only have basic title tags.",
    ],
    tips: [
      "Keep titles under about 60 characters and descriptions under about 160 so they do not truncate in search results.",
      "Write the description as ad copy for the click — state the benefit and include the primary phrase naturally once.",
      "Set og:image to a 1200×630 image; smaller images get cropped or ignored by most platforms.",
    ],
    faq: [
      {
        question: "Do meta keywords still matter for SEO?",
        answer:
          "No — Google has ignored the keywords meta tag since 2009. Spend the effort on the title tag, meta description, and Open Graph tags instead, which affect both rankings presentation and click-through rate.",
      },
      {
        question: "What is the difference between Open Graph and Twitter Card tags?",
        answer:
          "Open Graph (og:) tags control previews on Facebook, WhatsApp, LinkedIn, and most chat apps. Twitter Cards (twitter:) do the same for X/Twitter, which falls back to Open Graph when its own tags are missing. Including both guarantees consistent previews everywhere.",
      },
    ],
  },
  "seo-tools/adsense-readiness-auditor": {
    intro: [
      "The AdSense Readiness Auditor runs the practical checklist reviewers actually apply before your site is approved: presence and quality of About, Contact, Privacy Policy, and Terms pages, robots.txt and sitemap availability, ads.txt setup, and on-page quality signals — then prioritizes exactly what to fix first.",
      "Most AdSense rejections cite \"low value content\" or missing policy pages, and applicants often cannot tell which specific item failed. Auditing before you apply turns a weeks-long rejection loop into a single pass.",
    ],
    useCases: [
      "Audit a site before its first AdSense application to catch missing policy pages and crawlability problems.",
      "Diagnose a rejection: re-run the audit and work through the prioritized fixes instead of guessing what reviewers disliked.",
      "Pre-check client sites before agreeing to monetization work, so you can quote the real scope.",
      "Re-verify after a redesign or domain move that robots.txt, sitemap, and ads.txt still resolve correctly.",
    ],
    tips: [
      "Publish genuinely distinct About, Contact, Privacy, and Terms pages — thin single-line placeholders are treated the same as missing pages.",
      "Make sure robots.txt does not block the pages you want reviewed, and that your sitemap only lists canonical, indexable URLs.",
      "Apply after the site has a base of substantial, original pages; a handful of thin posts is the most common rejection cause.",
    ],
    faq: [
      {
        question: "Why was my AdSense application rejected for low value content?",
        answer:
          "\"Low value content\" usually means thin pages, duplicated or templated text, or missing trust pages (About, Contact, Privacy). Fix the prioritized items from the audit, add substantial original content, and reapply — there is no penalty for reapplying after improvements.",
      },
      {
        question: "Do I need ads.txt before applying to AdSense?",
        answer:
          "It is not required for approval, but publishing ads.txt with your publisher ID immediately after approval protects your ad revenue from unauthorized inventory resale, so it is worth preparing during the audit.",
      },
    ],
  },
  "developer-tools/accessibility-auditor-fix-planner": {
    intro: [
      "The Accessibility Auditor & Fix Planner runs a structured audit across the checks that matter most in practice — heading order, landmarks, image alt text, form labels, button and link names, dialogs, tables, media, and duplicate IDs — and turns the findings into a prioritized remediation plan you can hand to a team.",
      "Accessibility is both a legal exposure (ADA, EAA, Section 508) and a quality signal: the same missing labels and broken heading structures that block screen readers also degrade SEO and conversion. Fixing them is rarely hard once they are found and ranked.",
    ],
    useCases: [
      "Audit a page before launch and export prioritized findings for the sprint backlog.",
      "Triage an accessibility complaint by identifying which failures are critical (unlabeled forms, missing button names) versus cosmetic.",
      "Generate reusable remediation notes for recurring patterns so future pages avoid the same mistakes.",
      "Verify a fix pass actually resolved the issues by re-running the audit and comparing counts.",
    ],
    tips: [
      "Fix unlabeled form fields and nameless buttons first — they block task completion for assistive technology users completely.",
      "Maintain one h1 per page with a logical h2/h3 hierarchy; skipped levels confuse both screen readers and search crawlers.",
      "Automated checks catch roughly a third of WCAG issues; pair the audit with a keyboard-only walkthrough of your critical flow.",
    ],
    faq: [
      {
        question: "Can an automated audit make my site WCAG compliant?",
        answer:
          "No automated tool can certify compliance — automated checks reliably detect roughly 30–40% of WCAG failures. What they do well is eliminate the whole class of structural issues (labels, headings, alt text, duplicate IDs) so human review can focus on judgment calls like focus order and content clarity.",
      },
      {
        question: "Which accessibility issues should I fix first?",
        answer:
          "Prioritize failures that block task completion: unlabeled form inputs, buttons and links without accessible names, keyboard traps, and missing dialog semantics. Then address perception issues like alt text and contrast, and structural polish like landmark and heading order last.",
      },
    ],
  },
  "image-tools/background-remover": {
    intro: [
      "The Background Remover isolates the subject of a photo and exports a transparent PNG or WebP — entirely in your browser. The image never uploads to a server, which makes it safe for product shots, ID photos, and anything you would not post publicly.",
      "Most online background removers are upload services with watermarks, resolution caps, or per-image credits. Running the model locally removes all three limitations: your hardware does the work, so the tool stays free at full resolution.",
    ],
    useCases: [
      "Create clean product photos with transparent or white backgrounds for marketplaces like Etsy, eBay, Jumia, or Shopify stores.",
      "Cut out portraits for CVs, ID-style photos, team pages, and social profile pictures.",
      "Prepare logos and subjects for flyers, thumbnails, and business cards — then continue in the Business Cards Designer without leaving Utiliora.",
      "Batch-produce transparent PNGs for presentation decks and picture-in-picture video overlays.",
    ],
    tips: [
      "Photos with clear subject-background contrast and even lighting cut most cleanly; busy backgrounds behind hair or fur are the hardest case.",
      "Export WebP for the web when you need smaller files, and PNG when the design tool downstream requires it.",
      "The first run downloads the model, so it takes longer — subsequent images process much faster.",
    ],
    faq: [
      {
        question: "Are my photos uploaded to a server?",
        answer:
          "No. The segmentation model runs inside your browser, so the image never leaves your device. That is different from most background-removal sites, which process photos on their servers.",
      },
      {
        question: "Why is the free background remover not watermarking or limiting resolution?",
        answer:
          "Because processing happens on your own hardware, there is no per-image server cost to recover — so there is no reason for watermarks, credits, or resolution caps. The tool is open source and free.",
      },
    ],
  },
  "branding-tools/business-cards-design": {
    intro: [
      "The Business Cards Designer is a full design workspace in your browser: layered text, shapes, and images with snap-grid positioning, side-by-side front and back editing, ready-made template starters, and high-resolution PNG export for print or digital sharing.",
      "Your work saves to local session storage automatically, so you can close the tab and continue later — without an account, and without your design ever leaving your device.",
    ],
    useCases: [
      "Design and export print-ready cards for a new business without buying design software or hiring out a one-off job.",
      "Produce consistent cards for a whole team by duplicating a layout and swapping names and roles.",
      "Create digital business cards to attach in email signatures or share as images in chat.",
      "Start from a template, drop in a logo cut out with the Background Remover, and export both sides in minutes.",
    ],
    tips: [
      "Standard card size is 3.5 × 2 inches (89 × 51 mm); keep text at least 3 mm from the edges so nothing is clipped when printed and cut.",
      "Limit a card to two fonts and give the back a single job — a QR code, tagline, or service list — rather than repeating the front.",
      "Generate a QR code with Utiliora's QR tool linking to your site or contact page and place it on the back.",
    ],
    faq: [
      {
        question: "Can I print cards designed with this tool at a print shop?",
        answer:
          "Yes. Export the front and back as high-resolution PNGs and hand them to any print service. Design at the standard 3.5 × 2 inch ratio and keep important elements away from the edges to survive trimming.",
      },
      {
        question: "Will I lose my design if I close the browser?",
        answer:
          "The workspace persists your layers to local storage in your browser, so the design survives tab closes and restarts on the same device. Export a PNG (or keep source assets) as your permanent backup.",
      },
    ],
  },
  "productivity-tools/bank-statement-normalizer-expense-intelligence": {
    intro: [
      "The Bank Statement Normalizer imports statements as CSV, TSV, PDF, or pasted text and turns them into clean, analyzable data: standardized dates, normalized merchant names, corrected debit/credit polarity, and spend grouped by merchant.",
      "On top of the cleaned data it runs expense intelligence: recurring-charge detection for subscriptions you forgot about, spike and duplicate flags, and hidden-fee surfacing. Statements are processed in your browser — financial data never uploads to a server.",
    ],
    useCases: [
      "Consolidate statements from different banks into one consistent format for budgeting or a spreadsheet pipeline.",
      "Find every recurring subscription across months of transactions — the classic source of silent budget leaks.",
      "Prepare clean expense data for an accountant, a tax return, or a small-business bookkeeping handoff.",
      "Spot duplicate charges and unusual fee patterns before disputing them with your bank.",
    ],
    tips: [
      "CSV exports from your bank parse more reliably than PDFs; use the PDF path only when CSV is not offered.",
      "Review the debit/credit polarity preview before analyzing — banks disagree on sign conventions, and one wrong assumption inverts every total.",
      "Run three or more months at once for recurring-charge detection to distinguish true subscriptions from one-off purchases.",
    ],
    faq: [
      {
        question: "Is it safe to analyze bank statements in an online tool?",
        answer:
          "In this tool, yes: parsing and analysis run entirely in your browser and the statement never leaves your device. That is a critical difference from upload-based services — verify that property before using any tool on financial documents.",
      },
      {
        question: "Which statement formats can be imported?",
        answer:
          "CSV and TSV exports work best, PDFs are parsed with layout heuristics, and you can paste transaction text directly. After import, dates, merchants, and amounts are normalized to one consistent schema regardless of the source bank.",
      },
    ],
  },
};

export function getToolArticle(tool: ToolDefinition): ToolArticle | null {
  return ARTICLES[`${tool.category}/${tool.slug}`] ?? null;
}

/** Article FAQs first (unique content), then the generated ones, capped for readability. */
export function buildToolFaqWithArticle(tool: ToolDefinition, article: ToolArticle | null): ToolFaq[] {
  const generated = buildEnhancedToolFaq(tool);
  if (!article) return generated;
  const merged = [...article.faq, ...generated];
  return merged
    .filter((item, index, list) => list.findIndex((other) => other.question === item.question) === index)
    .slice(0, 8);
}
