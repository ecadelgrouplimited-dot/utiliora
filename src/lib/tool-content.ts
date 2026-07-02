import type { ToolDefinition, ToolFaq } from "@/lib/types";

type Guidance = {
  audience: string;
  outcomes: string[];
  steps: string[];
  checks: string[];
  limits: string[];
  privacy: string;
};

function humanizeCategory(category: ToolDefinition["category"]) {
  switch (category) {
    case "seo-tools":
      return "SEO and content";
    case "image-tools":
      return "image";
    case "branding-tools":
      return "branding";
    case "developer-tools":
      return "developer";
    case "productivity-tools":
      return "productivity";
    default:
      return category.slice(0, -1);
  }
}

function engineLabel(tool: ToolDefinition) {
  switch (tool.engine.kind) {
    case "calculator":
      return "calculation";
    case "unit-converter":
      return `${tool.engine.quantity.replace(/-/g, " ")} conversion`;
    case "number-converter":
      return `${tool.engine.mode.replace(/-/g, " ")} conversion`;
    case "text-tool":
      return "text workflow";
    case "developer-tool":
      return "technical diagnostic";
    case "image-tool":
      return "visual workflow";
    case "productivity-tool":
      return "document and workflow task";
  }
}

function categoryGuidance(tool: ToolDefinition): Guidance {
  const categoryName = humanizeCategory(tool.category);
  const keywordFocus = tool.keywords.slice(0, 2).join(" and ") || tool.title.toLowerCase();

  switch (tool.engine.kind) {
    case "calculator":
      return {
        audience: `${tool.title} is built for people comparing real-world numbers before they make a financial, health, planning, or business decision.`,
        outcomes: [
          `Turn the inputs behind ${keywordFocus} into a clear result you can review immediately.`,
          "Compare scenarios by changing one variable at a time instead of guessing from a single estimate.",
          "Use the result as a planning aid alongside professional, local, or account-specific advice when the decision is high stakes.",
        ],
        steps: [
          "Enter the known values first, then adjust the uncertain values after you see the first result.",
          "Check the units, date ranges, tax assumptions, fees, and rounding before using the number in a budget or report.",
          "Save or copy the output into your notes with the assumptions that produced it.",
        ],
        checks: [
          "The result updates from transparent inputs instead of hiding the formula behind a signup wall.",
          "Labels are written for quick scanning on mobile and desktop.",
          "Outputs separate the main answer from supporting totals so users can spot mistakes.",
        ],
        limits: [
          "Calculator results are estimates, not legal, medical, tax, lending, or investment advice.",
          "Local rates, eligibility rules, fees, and policy changes can alter the final outcome.",
        ],
        privacy: "Most calculator inputs stay in the browser session and do not require an account.",
      };
    case "unit-converter":
    case "number-converter":
      return {
        audience: `${tool.title} helps students, builders, analysts, travelers, and technical teams move between formats without opening a spreadsheet.`,
        outcomes: [
          `Convert ${keywordFocus} with a focused interface that keeps source and target values visible.`,
          "Reduce copy errors by keeping labels, units, and converted values close together.",
          "Use the result in homework, shipping notes, recipes, engineering checks, code comments, or documentation.",
        ],
        steps: [
          "Choose the source value and unit before selecting the destination format.",
          "Review precision, rounding, and sign conventions when the result feeds another calculation.",
          "Run a second sample value if you are validating a formula or publishing a conversion table.",
        ],
        checks: [
          "Inputs are clearly labelled and work without registration.",
          "The page gives immediate feedback, which helps catch impossible or mistyped values.",
          "Related tools are nearby so users can continue the same workflow.",
        ],
        limits: [
          "Very large, very small, or domain-specific values may need specialist precision rules.",
          "Published technical work should cite the standard or conversion basis when accuracy requirements are strict.",
        ],
        privacy: "Conversion values are handled locally in the browser wherever the tool does not need a live data source.",
      };
    case "developer-tool":
      return {
        audience: `${tool.title} is made for developers, site owners, support teams, and operators who need a fast ${engineLabel(tool)}.`,
        outcomes: [
          `Investigate ${keywordFocus} problems without assembling a temporary script or command-line snippet.`,
          "Capture a cleaner before-and-after record when fixing site, network, encoding, timing, or security issues.",
          "Move from diagnosis to the next relevant tool without losing context.",
        ],
        steps: [
          "Paste the URL, domain, text, or technical value exactly as it appears in the failing workflow.",
          "Review warnings and secondary details before acting on the headline result.",
          "Re-run the check after a DNS, SSL, deployment, cache, or configuration change has had time to propagate.",
        ],
        checks: [
          "The tool avoids unnecessary account gates for common diagnostics.",
          "Results are structured for support tickets, QA notes, and handoff messages.",
          "Network-dependent tools use server routes only when the browser cannot perform the check directly.",
        ],
        limits: [
          "External lookups can vary by region, cache state, rate limits, and upstream provider availability.",
          "Security-sensitive decisions should be verified against authoritative logs and production monitoring.",
        ],
        privacy: "Technical checks only send the minimum value needed for the lookup or analysis path.",
      };
    case "image-tool":
      return {
        audience: `${tool.title} supports creators, marketers, developers, shop owners, and teams preparing visual assets for publishing.`,
        outcomes: [
          `Handle ${keywordFocus} tasks with a focused workflow instead of loading a full design suite.`,
          "Prepare lighter, cleaner, or better-formatted assets for websites, social posts, documents, and product pages.",
          "Preview the result before downloading so quality problems are visible early.",
        ],
        steps: [
          "Start with the highest-quality original file available.",
          "Check dimensions, file size, contrast, and format requirements before exporting.",
          "Download a test output and inspect it in the place where it will actually be used.",
        ],
        checks: [
          "The interface keeps original and output states easy to compare.",
          "Controls are designed for repeatable production work rather than a single hidden conversion.",
          "Most image workflows run in the browser to reduce unnecessary uploads.",
        ],
        limits: [
          "Aggressive compression, resizing, or format conversion can reduce detail.",
          "Sensitive images should be reviewed carefully before using any online workflow.",
        ],
        privacy: "Where possible, image processing happens client-side so files do not leave the device for routine edits.",
      };
    case "productivity-tool":
      return {
        audience: `${tool.title} is for operators, freelancers, students, job seekers, and small teams turning messy inputs into usable work products.`,
        outcomes: [
          `Complete ${keywordFocus} work with a structured flow instead of rebuilding the same document or checklist repeatedly.`,
          "Keep drafts, decisions, extracted details, or comparisons organized enough to act on.",
          "Export, copy, or continue into related Utiliora tools when the task becomes part of a larger workflow.",
        ],
        steps: [
          "Add the source material, then review the preview before trusting the output.",
          "Edit names, dates, amounts, labels, and formatting that depend on your local context.",
          "Keep a final copy in your own records before sending, signing, or publishing.",
        ],
        checks: [
          "The workflow favors clear user control over black-box automation.",
          "Important fields remain editable so the final output can match the real situation.",
          "Guided next steps help users finish the surrounding task, not just one isolated action.",
        ],
        limits: [
          "Documents, resumes, financial records, and translations should be reviewed by a human before use.",
          "OCR, parsing, and AI-assisted features may require correction when source material is noisy.",
        ],
        privacy: "Client-side handling is preferred when practical, and server features are limited to the work they must perform.",
      };
    case "text-tool":
    default:
      return {
        audience: `${tool.title} helps writers, marketers, publishers, students, and site owners improve ${categoryName.toLowerCase()} work before it goes live.`,
        outcomes: [
          `Refine ${keywordFocus} work with visible inputs, outputs, and checks.`,
          "Make copy, metadata, schema, formatting, or quality review easier to repeat.",
          "Use the result as a draft or audit trail instead of treating it as a final authority.",
        ],
        steps: [
          "Paste the source content and scan the first result for missing context.",
          "Adjust tone, length, metadata, or validation settings until the output matches the publishing goal.",
          "Review the final text for facts, brand voice, originality, and search intent before publishing.",
        ],
        checks: [
          "The page provides practical output, not filler text around a thin form.",
          "Guidance is written for responsible publishing and quality review.",
          "Related tools support common follow-up steps like schema, metadata, readability, and internal linking.",
        ],
        limits: [
          "Automated writing, SEO, and validation tools cannot guarantee rankings, approval, originality, or compliance.",
          "Publisher policies and search guidance should be checked directly for sensitive decisions.",
        ],
        privacy: "Text is processed in the browser where possible; server-assisted features should not receive secrets or regulated data.",
      };
  }
}

export function buildToolGuidance(tool: ToolDefinition): Guidance {
  return categoryGuidance(tool);
}

export function buildEnhancedToolFaq(tool: ToolDefinition): ToolFaq[] {
  const guidance = buildToolGuidance(tool);
  const base = tool.faq.filter((item, index, list) => list.findIndex((other) => other.question === item.question) === index);
  const enhanced: ToolFaq[] = [
    {
      question: `What is the best way to use ${tool.title}?`,
      answer: `${guidance.steps[0]} ${guidance.steps[1]}`,
    },
    {
      question: `Who is ${tool.title} for?`,
      answer: guidance.audience,
    },
    {
      question: `What should I check before relying on ${tool.title} results?`,
      answer: `${guidance.checks[0]} Also review ${guidance.limits[0].charAt(0).toLowerCase()}${guidance.limits[0].slice(1)}`,
    },
  ];

  return [...enhanced, ...base].slice(0, 6);
}
