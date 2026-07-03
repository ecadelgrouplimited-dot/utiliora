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
  "seo-tools/password-generator": {
    intro: [
      "The Password Generator creates cryptographically random passwords at whatever length and character mix you need — lowercase, uppercase, digits, and symbols — directly in your browser. Nothing is transmitted or stored, so the password exists only on your screen until you copy it.",
      "Human-invented passwords follow patterns attackers know intimately: a capitalized word, a year, an exclamation mark. Random generation is the only reliable defense, and length beats cleverness — every added character multiplies cracking time.",
    ],
    useCases: [
      "Generate strong unique passwords when opening accounts, instead of reusing a variation of the same one.",
      "Create temporary credentials for team members, contractors, or test accounts that are strong from day one.",
      "Produce Wi-Fi passphrases that guests can type but attackers cannot guess.",
      "Meet a specific site's password policy quickly by toggling character sets to match its rules.",
    ],
    tips: [
      "Use 16+ characters wherever the site allows; length adds far more strength than symbol tricks.",
      "Generate a different password for every account — password reuse is how a single breach cascades into many.",
      "Store generated passwords in a password manager rather than a notes app; the generator pairs naturally with one.",
    ],
    faq: [
      {
        question: "Is it safe to use an online password generator?",
        answer:
          "It is when generation happens client-side, as it does here: the password is produced by your browser's cryptographic random number generator and never leaves your device. Avoid generators that create the password on a server.",
      },
      {
        question: "How long should a password be in 2026?",
        answer:
          "16 characters of mixed random characters is a sound default; 20+ for email, banking, and password-manager master passwords. Below 12 characters, modern GPU cracking makes offline attacks practical.",
      },
    ],
  },
  "seo-tools/word-counter": {
    intro: [
      "The Word Counter gives you live word, character, sentence, and paragraph counts as you type or paste — with no length limits and no upload, since counting happens in your browser.",
      "Almost every writing surface has a hard or soft length constraint: meta descriptions truncate near 160 characters, tweets cap at 280, college essays specify word ranges, and ad platforms enforce exact limits. Counting before you paste saves the rejection-edit-retry loop.",
    ],
    useCases: [
      "Keep essays, abstracts, and application statements inside required word ranges before submission.",
      "Check article and blog-post length against content briefs that specify minimum word counts.",
      "Fit copy into character-limited fields: meta descriptions, ad headlines, app store listings, and social bios.",
      "Track daily writing output for NaNoWriMo-style goals or client billing based on word count.",
    ],
    tips: [
      "For SEO, match length to intent rather than chasing a magic number — competitive informational queries usually take 1,000+ words, but a converter page can rank with 300 well-structured ones.",
      "Character counts include spaces unless stated otherwise — check which definition your platform uses.",
      "Long sentences drag readability down; if your average sentence passes 25 words, split them.",
    ],
    faq: [
      {
        question: "How many words should a blog post be for SEO?",
        answer:
          "There is no ranking bonus for length itself. Look at what currently ranks for your target query and match its depth — often 800–1,500 words for informational topics. Padding beyond what the topic needs hurts engagement metrics.",
      },
      {
        question: "Does the word counter store or send my text anywhere?",
        answer: "No. Counting runs entirely in your browser; the text never leaves your device, so it is safe for confidential drafts.",
      },
    ],
  },
  "seo-tools/json-formatter": {
    intro: [
      "The JSON Formatter takes raw, minified, or messy JSON and returns a properly indented, readable structure — and because it must parse the input to format it, it doubles as a validator that pinpoints syntax errors like trailing commas, single quotes, and unquoted keys.",
      "Formatting runs in your browser, which matters more for JSON than almost any other format: API responses and config files routinely contain tokens, keys, and customer data that should never be pasted into a server-side tool.",
    ],
    useCases: [
      "Prettify a minified API response so you can actually read the structure while debugging.",
      "Validate JSON config files (package.json, tsconfig, CI manifests) before committing, catching the trailing comma before the pipeline does.",
      "Inspect webhook payloads from Stripe, GitHub, or Slack to find the field you need.",
      "Clean up JSON before pasting it into documentation, bug reports, or Postman collections.",
    ],
    tips: [
      "JSON requires double quotes around keys and strings — single quotes are the most common paste-from-JavaScript error.",
      "Trailing commas are valid in modern JavaScript but never in JSON; they are the second most common failure.",
      "For huge payloads, format once and collapse to the branch you need rather than scrolling — structure first, values second.",
    ],
    faq: [
      {
        question: "Why is my JSON invalid even though it works in JavaScript?",
        answer:
          "JavaScript object literals allow single quotes, unquoted keys, trailing commas, and comments — JSON allows none of these. The formatter's error position points at the first construct that JSON's stricter grammar rejects.",
      },
      {
        question: "Is it safe to paste API responses with tokens into this formatter?",
        answer:
          "Yes — parsing and formatting run entirely in your browser with no network request, so the payload never leaves your machine. That is exactly why a client-side formatter is the right choice for production data.",
      },
    ],
  },
  "image-tools/qr-code-generator": {
    intro: [
      "The QR Code Generator creates scannable codes for URLs, text, Wi-Fi credentials, and contact details, with control over size and error correction, plus PNG and SVG export. A batch mode generates whole lists of codes in one pass.",
      "Because generation is client-side, there are no accounts, no watermarks, and — critically — no third-party redirect: the QR encodes your destination directly, so codes keep working forever instead of dying when a link-shortening service retires them.",
    ],
    useCases: [
      "Put a scannable link to your menu, catalog, or payment page on printed flyers, packaging, table tents, and posters.",
      "Share Wi-Fi access with guests via a printable code instead of reading out a password.",
      "Add a QR to business cards (pairs with Utiliora's Business Cards Designer) linking to your site or vCard.",
      "Batch-generate codes for event tickets, asset labels, or per-location signage from a list.",
    ],
    tips: [
      "Export SVG for print — it scales to any size without blurring; use PNG for screens and documents.",
      "Choose higher error correction (Q or H) when the code will be printed small or might get scuffed; it adds redundancy that survives damage.",
      "Always test-scan from an arm's length before mass printing — contrast and quiet-zone margins matter more than size.",
    ],
    faq: [
      {
        question: "Do these QR codes expire or stop working?",
        answer:
          "No. The code encodes your URL or text directly with no intermediary service, so it works as long as the destination exists. \"Expiring\" QR codes are an artifact of services that route scans through their own tracking domain.",
      },
      {
        question: "PNG or SVG — which QR format should I download?",
        answer:
          "SVG for anything going to print or professional design tools, since it is vector and infinitely scalable. PNG for web pages, chat, and slide decks. When in doubt, keep both — they encode the identical code.",
      },
    ],
  },
  "image-tools/image-compressor": {
    intro: [
      "The Image Compressor reduces file sizes right in your browser with an adjustable quality slider and instant before/after comparison — no uploads, no file-count limits, no watermarks.",
      "Oversized images are the number-one cause of slow pages, and page speed feeds directly into Core Web Vitals, search rankings, and bounce rate. Compressing a 4 MB photo to 300 KB is usually invisible to the eye and transformative for load time.",
    ],
    useCases: [
      "Compress hero and product images before uploading to a website or store to protect page speed.",
      "Shrink photos to fit email attachment limits and form upload caps (many portals cap at 1–2 MB).",
      "Reduce screenshots for documentation, tickets, and READMEs where repositories penalize large binaries.",
      "Prepare batches of listing photos for marketplaces that recompress aggressively anyway — send them lean.",
    ],
    tips: [
      "Quality 75–85% is the sweet spot for photos: substantial size reduction with differences the eye cannot resolve.",
      "Resize before you compress — a 4000px image displayed at 800px wastes bytes no quality setting can recover. The Image Resizer pairs well here.",
      "Keep original files for anything you may re-edit; recompressing an already-compressed JPG compounds artifacts.",
    ],
    faq: [
      {
        question: "How much can I compress an image without visible quality loss?",
        answer:
          "For photographs, 60–80% file-size reduction is typically invisible at normal viewing sizes, especially with correct dimensions. Graphics with sharp edges and text show artifacts sooner — inspect the preview before downloading.",
      },
      {
        question: "Are my images uploaded to a server for compression?",
        answer: "No — compression runs in your browser, so images never leave your device. That makes it safe for private photos, IDs, and unreleased product shots.",
      },
    ],
  },
  "calculators/loan-emi-calculator": {
    intro: [
      "The Loan EMI Calculator computes your Equated Monthly Installment from principal, interest rate, and tenure, and splits the total repayment into principal versus interest so you can see what the loan actually costs.",
      "The EMI formula is the same for personal, auto, home, and business loans everywhere: P × r × (1+r)ⁿ / ((1+r)ⁿ − 1). What changes your payment is the three inputs — and this calculator makes it effortless to test how each one moves the number before you sign anything.",
    ],
    useCases: [
      "Check whether a loan offer's quoted EMI matches the math before signing — discrepancies usually reveal fees baked into the rate.",
      "Compare tenure options: see exactly how much total interest a 5-year term saves versus 7 years for the same principal.",
      "Work backwards from an affordable monthly payment to the loan size you can realistically take.",
      "Model a rate negotiation: even 0.5% off the rate on a long tenure is often worth more than a processing-fee waiver.",
    ],
    tips: [
      "Compare loans on total interest paid, not EMI — a lower EMI over a longer tenure almost always costs more overall.",
      "Ask whether the quoted rate is flat or reducing-balance; a flat 8% costs roughly the same as a reducing-balance 14–15%.",
      "Keep EMI commitments under about 40% of net income — lenders check this debt-to-income line, and so should you.",
    ],
    faq: [
      {
        question: "How is EMI calculated?",
        answer:
          "EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1), where P is principal, r the monthly interest rate (annual ÷ 12), and n the number of monthly payments. The calculator applies this exact reducing-balance formula.",
      },
      {
        question: "Why is total interest so high even with a modest rate?",
        answer:
          "Interest accrues on the outstanding balance every month, and early EMIs are mostly interest. Long tenures multiply this: a 20-year loan can cost more in interest than the principal itself. Shortening tenure or prepaying early cuts it disproportionately.",
      },
    ],
  },
  "calculators/mortgage-calculator": {
    intro: [
      "The Mortgage Calculator estimates your true monthly housing cost: principal and interest from loan amount, rate, and term, plus the extras that lenders and first-time buyers routinely underestimate — property tax, insurance, and other recurring charges.",
      "The principal-and-interest figure alone understates real cost by 20–40% in most markets. Seeing the all-in number before you shop for homes prevents the classic mistake of qualifying for a payment you cannot comfortably live with.",
    ],
    useCases: [
      "Set a realistic home-shopping budget from the all-in monthly payment, not just the loan payment.",
      "Compare a 15-year versus 30-year term side by side — payment difference versus lifetime interest difference.",
      "Estimate how much a larger down payment lowers both the monthly payment and total interest.",
      "Stress-test affordability: re-run the numbers 1–2% above today's rate to see if a refinance-era budget survives.",
    ],
    tips: [
      "Include property tax and insurance from day one — they typically add hundreds per month and rise over time.",
      "A 20% down payment usually avoids mortgage insurance, which is pure cost with no equity benefit.",
      "Compare lender offers on APR rather than the headline rate; APR folds in most fees.",
    ],
    faq: [
      {
        question: "How much house can I afford?",
        answer:
          "A common guideline keeps total housing costs (payment, tax, insurance) under 28% of gross monthly income, with all debt under 36%. Work backwards: enter rates and terms until the all-in payment lands inside that band, and that is your price range.",
      },
      {
        question: "Is a 15-year or 30-year mortgage better?",
        answer:
          "A 15-year term costs dramatically less interest but demands a higher payment; a 30-year keeps payments manageable and flexible. Many buyers take the 30-year and prepay like a 15 — keeping the lower obligation while capturing most of the interest savings.",
      },
    ],
  },
  "calculators/compound-interest-calculator": {
    intro: [
      "The Compound Interest Calculator models how money grows when returns earn returns: set a starting principal, rate, time horizon, and compounding frequency, and see the year-by-year outcome.",
      "Compounding is unintuitive because it is exponential — growth looks slow for years and then accelerates sharply. Watching the curve for your own numbers is the fastest way to internalize why starting early beats contributing more later.",
    ],
    useCases: [
      "Project long-term savings or investment outcomes for retirement and education goals.",
      "Compare offers with different compounding frequencies — annual, quarterly, monthly, daily — on equal footing.",
      "Show the cost of delay: run the same plan starting today versus in five years and compare the endpoints.",
      "Understand debt from the other side: the same mathematics is why unpaid credit-card balances balloon.",
    ],
    tips: [
      "Time in the market dominates: doubling the horizon does far more than doubling the rate in most realistic ranges.",
      "Use a real (inflation-adjusted) rate — subtract expected inflation of 2–3% — to see results in today's purchasing power.",
      "The Rule of 72 gives a quick sanity check: 72 ÷ rate ≈ years to double. At 8%, money doubles roughly every 9 years.",
    ],
    faq: [
      {
        question: "What is the difference between simple and compound interest?",
        answer:
          "Simple interest is earned only on the original principal; compound interest is earned on principal plus all previously earned interest. Over 30 years at 8%, $10,000 grows to $34,000 with simple interest but over $100,000 with annual compounding.",
      },
      {
        question: "How much does compounding frequency actually matter?",
        answer:
          "Less than most people expect: at 8% annual, monthly compounding yields an effective 8.30% versus 8.00% for annual. Frequency is a refinement — rate and time are the levers that matter.",
      },
    ],
  },
  "calculators/calorie-needs-calculator": {
    intro: [
      "The Calorie Needs Calculator estimates your daily energy requirement from body metrics and activity level: first your basal metabolic rate (BMR), then your total daily energy expenditure (TDEE) after activity is applied.",
      "Every diet that works — regardless of branding — works through energy balance. Knowing your TDEE turns vague goals like \"eat less\" into a concrete daily target you can actually track against.",
    ],
    useCases: [
      "Set a calorie target for fat loss (typically TDEE minus 300–500) or muscle gain (TDEE plus 200–300).",
      "Calibrate a food-tracking app with a starting budget based on your body, not a generic 2,000-calorie default.",
      "Recalculate after significant weight change — TDEE moves with body mass, and a stalled diet often just needs updated numbers.",
      "Plan fueling for heavy training blocks where under-eating undermines recovery.",
    ],
    tips: [
      "Most people overestimate activity level; if you sit most of the day and train three times a week, \"lightly active\" is usually the honest pick.",
      "Treat the output as a starting estimate: track weight for two to three weeks and adjust ±150 calories based on the trend.",
      "Prefer moderate deficits — aggressive cuts lose muscle, tank energy, and rebound. 0.5–1% of body weight per week is sustainable.",
    ],
    faq: [
      {
        question: "What is the difference between BMR and TDEE?",
        answer:
          "BMR is the energy your body burns at complete rest just staying alive. TDEE adds movement, exercise, and digestion — it is BMR multiplied by an activity factor between roughly 1.2 (sedentary) and 1.9 (very active), and it is the number to plan intake around.",
      },
      {
        question: "How many calories should I eat to lose weight?",
        answer:
          "A deficit of 300–500 calories below TDEE produces roughly 0.3–0.5 kg of loss per week for most adults, which preserves muscle and adherence. Larger deficits work faster but fail more often; consult a professional for medical conditions.",
      },
    ],
  },
  "calculators/pregnancy-due-date-calculator": {
    intro: [
      "The Pregnancy Due Date Calculator estimates the expected delivery date from the first day of your last menstrual period using the standard method clinicians use (Naegele's rule: LMP plus 280 days), and shows current gestational progress in weeks and days.",
      "Knowing gestational age week by week anchors everything in early pregnancy: when tests and scans are scheduled, how symptoms map to development stages, and how care guidelines apply. This calculator is for orientation — your provider's dating scan is the medical reference.",
    ],
    useCases: [
      "Get an estimated due date immediately after a positive test, before the first prenatal appointment.",
      "Track the current week of pregnancy to follow along with week-by-week development guides.",
      "Plan work leave, travel cut-offs, and family logistics around the expected window rather than a single date.",
      "Adjust the cycle-length input if your cycles are longer or shorter than 28 days for a better estimate.",
    ],
    tips: [
      "Only about 4–5% of babies arrive on their exact due date; think of it as the midpoint of a window from 37 to 42 weeks.",
      "A first-trimester ultrasound dates pregnancy more accurately than LMP, particularly with irregular cycles — expect your provider to possibly revise the date.",
      "Count from the first day of the last period, not from conception; gestational age runs about two weeks ahead of embryonic age by convention.",
    ],
    faq: [
      {
        question: "How accurate is a due date calculated from my last period?",
        answer:
          "For regular 28-day cycles it is a good estimate, but ovulation timing varies — which is why an early ultrasound may shift the date by several days to two weeks. Treat the LMP-based date as provisional until your dating scan.",
      },
      {
        question: "What if I don't remember my last menstrual period?",
        answer:
          "Use your best estimate to get an approximate window, then rely on the first-trimester ultrasound for accurate dating — it measures the embryo directly and is the standard method when LMP is uncertain.",
      },
    ],
  },
  "calculators/currency-converter-calculator": {
    intro: [
      "This Currency Converter works with a rate you enter — the actual rate you were quoted by your bank, card, or transfer service — plus an optional fee, so the result reflects what you will really pay or receive rather than an idealized mid-market number.",
      "Most online converters show the interbank rate no consumer actually gets. The spread between that and your provider's rate, plus fees, is the true cost of exchange — and making it visible is exactly what this calculator is for.",
    ],
    useCases: [
      "Compare two remittance or transfer services by entering each one's real quoted rate and fee for the same amount.",
      "Check what an international invoice or purchase actually costs after your card's exchange rate and foreign-transaction fee.",
      "Budget for travel with the rate from your actual exchange source, not the newspaper rate.",
      "Price cross-border freelance work so the fee and spread don't silently eat your margin.",
    ],
    tips: [
      "Find the mid-market rate from a search engine, then compare it against your provider's quote — the difference is the hidden margin.",
      "A \"zero-fee\" transfer usually recovers costs in the exchange-rate spread; always compare the amount received, not the fee line.",
      "For recurring transfers, small rate differences compound — a 1% better rate on monthly remittances is an extra payment every eight years.",
    ],
    faq: [
      {
        question: "Why does my bank's exchange rate differ from the rate I see online?",
        answer:
          "Published rates are interbank mid-market rates. Banks and transfer services add a margin of typically 1–4% to that rate, sometimes alongside an explicit fee. Comparing the final received amount across providers is the only honest comparison.",
      },
      {
        question: "Why doesn't this tool fetch live exchange rates?",
        answer:
          "Because the live mid-market rate is not the rate you get. Entering your provider's actual quote — with their fee — produces the number that matches your statement, which is more useful for real decisions than an unattainable reference rate.",
      },
    ],
  },
  "calculators/salary-after-tax-calculator": {
    intro: [
      "The Salary After Tax Calculator turns a gross salary into a realistic take-home estimate by applying federal and state tax rates plus your recurring deductions — retirement contributions, insurance premiums, and anything else that comes off the top.",
      "Job offers, raises, and budgets all talk in gross numbers, but rent and groceries are paid from net. The gap routinely surprises people by 20–35%, and knowing your actual monthly landing amount is the foundation of any budget that works.",
    ],
    useCases: [
      "Evaluate a job offer by comparing net take-home, not gross — especially across states or countries with different tax burdens.",
      "See what a raise actually adds per month after taxes and percentage-based deductions scale with it.",
      "Budget from your true monthly net when planning rent, loan EMIs, and savings targets.",
      "Model how increasing retirement contributions changes take-home pay versus long-term savings.",
    ],
    tips: [
      "Marginal rates apply to slices of income, not the whole salary — a raise into a higher bracket never reduces your net pay.",
      "Pre-tax retirement contributions lower taxable income, so the take-home cost of contributing is less than the contribution itself.",
      "Re-check after any life change (marriage, dependents, second income) — withholding assumptions shift more than people expect.",
    ],
    faq: [
      {
        question: "Why is my take-home pay so much lower than my salary?",
        answer:
          "Income tax is only part of it: payroll/social contributions, health premiums, and retirement deductions stack on top. A 30% total gap between gross and net is normal in many jurisdictions — itemizing each deduction in the calculator shows exactly where it goes.",
      },
      {
        question: "Will a raise push me into a higher tax bracket and reduce my pay?",
        answer:
          "No — this is the most persistent tax myth. Brackets are marginal: only the income above each threshold is taxed at the higher rate. A raise always increases net pay, just by somewhat less than the gross amount.",
      },
    ],
  },
  "image-tools/pdf-merge": {
    intro: [
      "PDF Merge combines multiple PDFs into a single document in the order you choose, with page-count validation and export — processed entirely in your browser, so contracts and statements never upload to anyone's server.",
      "Combining PDFs is one of the most common document tasks there is, and most \"free\" merge sites route your files through their servers with file-size caps and watermarks. Client-side merging removes the privacy question entirely.",
    ],
    useCases: [
      "Combine a cover letter, resume, and certificates into one application PDF as portals frequently require.",
      "Assemble contracts, annexes, and signature pages into a single file for sending or archiving.",
      "Merge monthly statements or invoices into one document per quarter for bookkeeping.",
      "Stitch scanned chapters or handouts into a single readable course pack.",
    ],
    tips: [
      "Order files before merging — drag them into sequence rather than merging twice.",
      "Merging preserves each page as-is; to shrink the combined file afterwards, run it through the PDF Compressor.",
      "Keep the source PDFs until you have verified the merged output opens correctly and pages are complete.",
    ],
    faq: [
      {
        question: "Are my PDFs uploaded when I merge them?",
        answer:
          "No. Files are read and combined by your browser locally; nothing is transmitted. That makes this merge safe for contracts, financial statements, and anything confidential.",
      },
      {
        question: "Is there a limit on how many PDFs I can merge?",
        answer:
          "No fixed limit — the practical constraint is your device's memory for very large documents. Typical use (dozens of files, hundreds of pages) is comfortably in range.",
      },
    ],
  },
  "image-tools/image-resizer": {
    intro: [
      "The Image Resizer changes image dimensions to exact pixel sizes in your browser, with instant download and no server upload — no watermarks, accounts, or file limits.",
      "Platforms are strict about dimensions: profile pictures, cover images, ad creatives, and print sizes each have expected pixel dimensions, and letting a platform auto-crop rarely ends well. Resizing to spec keeps composition under your control.",
    ],
    useCases: [
      "Resize photos to a platform's exact spec — profile and cover images, YouTube thumbnails (1280×720), OG images (1200×630).",
      "Downscale phone photos (often 4000px+) to sensible web dimensions before compressing and uploading.",
      "Meet upload requirements for portals that reject images above fixed dimensions or below minimums.",
      "Produce multiple size variants of one asset for responsive web use.",
    ],
    tips: [
      "Always downscale rather than upscale — enlarging cannot create detail and produces visible softness.",
      "Keep the aspect ratio locked unless the target spec genuinely differs; distorted faces and logos are instantly noticeable.",
      "Resize first, then compress (the Image Compressor pairs naturally) — that order yields the smallest clean files.",
    ],
    faq: [
      {
        question: "How do I resize an image without losing quality?",
        answer:
          "Downscaling with good interpolation preserves apparent quality — a 4000px photo reduced to 1200px looks sharp at normal viewing sizes. Quality loss becomes visible when enlarging, or when compressing too aggressively after resizing.",
      },
      {
        question: "What is the difference between resizing and cropping?",
        answer:
          "Resizing scales the whole image to new dimensions; cropping cuts a region out at its original scale. To hit an exact aspect ratio without squashing the subject, crop to the ratio first, then resize — the Image Cropper handles the first step.",
      },
    ],
  },
  "productivity-tools/invoice-generator": {
    intro: [
      "The Invoice Generator produces client-ready invoices with your logo, full itemization, taxes and totals, and export for sending — with multiple saved invoice workspaces so repeat billing does not start from scratch each time.",
      "It supports a full range of currencies including African currencies that mainstream invoice tools often omit — built for freelancers and small businesses billing across borders. Everything stays in your browser: client names, amounts, and terms are yours alone.",
    ],
    useCases: [
      "Send a first professional invoice as a new freelancer without subscribing to accounting software.",
      "Bill international clients in their currency — USD, EUR, GBP, NGN, KES, UGX, ZAR, and more.",
      "Keep separate workspaces per client so recurring monthly invoices take a minute to issue.",
      "Produce clean itemized invoices that satisfy client accounting departments and reduce payment-query delays.",
    ],
    tips: [
      "Number invoices sequentially and never reuse a number — it is the backbone of clean bookkeeping and tax records.",
      "State payment terms explicitly (e.g. \"Net 14\") and the accepted payment methods; vague invoices get paid last.",
      "Include your tax/registration ID where applicable — many corporate clients cannot process invoices without it.",
    ],
    faq: [
      {
        question: "What must an invoice include to be valid?",
        answer:
          "Core elements: your business name and contact details, the client's, a unique invoice number, issue date, itemized description with quantities and rates, total with any tax broken out, and payment terms. Jurisdictions with VAT/GST add tax IDs and rates.",
      },
      {
        question: "Is my client and billing data stored on a server?",
        answer:
          "No — invoice workspaces persist in your browser's local storage on your device. Nothing about your clients or amounts is transmitted, which is exactly what you want for billing data.",
      },
    ],
  },
  "productivity-tools/resume-builder": {
    intro: [
      "The Resume Builder creates polished resumes from role-based starter templates with profile-photo support, one-click improvement actions, and ATS keyword alignment checks — then exports to PDF, DOC, HTML, Markdown, or plain text.",
      "Most resumes are first read by software, not people: applicant tracking systems filter on structure and keywords before a recruiter sees anything. Building with ATS alignment checked as you write beats discovering the problem after fifty silent rejections.",
    ],
    useCases: [
      "Build a first professional resume from a role-based template instead of fighting a word processor's formatting.",
      "Tailor an existing resume to a specific job posting using the keyword alignment check against the job description.",
      "Maintain master and role-specific variants, exporting PDF for applications and DOC where portals demand it.",
      "Refresh an outdated resume's structure and phrasing with the one-click improvement suggestions.",
    ],
    tips: [
      "Mirror the job posting's exact terminology for skills — ATS matching is often literal, and \"PostgreSQL\" does not match \"Postgres\".",
      "Lead bullets with outcomes and numbers (\"cut processing time 40%\") rather than duties (\"responsible for processing\").",
      "Export PDF unless the posting says otherwise; it preserves layout everywhere. Keep a plain-text export for paste-into-form portals.",
    ],
    faq: [
      {
        question: "What makes a resume ATS-friendly?",
        answer:
          "Standard section headings (Experience, Education, Skills), a single-column layout without tables or text boxes, real text rather than images, and keywords that mirror the job description. The builder's templates and alignment check are designed around exactly these constraints.",
      },
      {
        question: "Should I put a photo on my resume?",
        answer:
          "It depends on region: photos are customary in much of Europe, Africa, and Asia, but discouraged in the US, UK, and Canada where they can trigger bias-screening removal. The builder supports both — check the norm for the market you are applying in.",
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
