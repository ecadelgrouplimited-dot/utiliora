"use client";

import dynamic from "next/dynamic";
import type { ToolDefinition } from "@/lib/types";

/*
 * The tool implementations live in ToolRendererImpl (all 85 tools in one
 * module). Loading it with next/dynamic keeps that bundle out of the tool
 * page's critical chunk, so the page shell hydrates before the tool code
 * downloads. ssr: true keeps the server-rendered HTML for crawlers and
 * first paint, so there is no layout shift on initial load.
 */
const ToolRendererImpl = dynamic(
  () => import("@/components/ToolRendererImpl").then((mod) => mod.ToolRenderer),
  {
    ssr: true,
    loading: () => (
      <section className="content-block" aria-busy="true">
        <p>Loading tool…</p>
      </section>
    ),
  },
);

interface ToolRendererProps {
  tool: ToolDefinition;
}

export function ToolRenderer({ tool }: ToolRendererProps) {
  return <ToolRendererImpl tool={tool} />;
}
