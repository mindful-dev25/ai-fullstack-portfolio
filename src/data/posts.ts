// Blog posts. Text in paragraphs and list items may use **bold** markers.

type PostBlock =
  | { type: "paragraph" | "heading"; text: string }
  | { type: "numbered" | "bullets"; items: string[] };

export type Post = {
  slug: string;
  tags: string[];
  title: string;
  summary: string;
  date: string; // Shown on the page
  isoDate: string; // Machine-readable publish date
  readTime: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "building-production-ready-rag-systems",
    tags: ["RAG", "LLMs", "Python"],
    title: "Building Production-Ready RAG Systems",
    summary:
      "A deep dive into designing retrieval-augmented generation pipelines that actually work at scale. Covering vector databases, embedding strategies, and evaluation metrics.",
    date: "Jan 15, 2026",
    isoDate: "2026-01-15",
    readTime: "8 min read",
    body: [
      {
        type: "paragraph",
        text: "Retrieval-Augmented Generation (RAG) has become the go-to architecture for building AI applications that need access to custom knowledge bases. But there's a significant gap between a quick prototype and a production-ready system.",
      },
      { type: "heading", text: "Key Lessons Learned" },
      {
        type: "numbered",
        items: [
          "**Chunking Strategy Matters** - Don't just split on character count. Consider semantic boundaries, overlapping chunks, and metadata preservation.",
          "**Hybrid Search is King** - Pure vector search has limitations. Combine with BM25 for keyword matching, metadata filters, and re-ranking.",
          "**Evaluation is Non-Negotiable** - Build evaluation pipelines early with retrieval metrics (recall@k, MRR) and generation quality measures.",
        ],
      },
      {
        type: "paragraph",
        text: "Building production RAG systems requires thinking beyond the happy path. Invest in evaluation, monitoring, and iteration.",
      },
    ],
  },
  {
    slug: "agentic-ai-patterns-for-real-applications",
    tags: ["Agents", "LangChain", "AI"],
    title: "Agentic AI Patterns for Real Applications",
    summary:
      "Exploring practical patterns for building AI agents that can reason, plan, and execute multi-step tasks. From simple chains to complex autonomous workflows.",
    date: "Dec 28, 2025",
    isoDate: "2025-12-28",
    readTime: "12 min read",
    body: [
      {
        type: "paragraph",
        text: 'AI agents are having their moment. But between the hype of "autonomous AI" and the reality of production systems, there\'s a lot of practical wisdom to share.',
      },
      { type: "heading", text: "Patterns That Actually Work" },
      {
        type: "numbered",
        items: [
          "**ReAct (Reasoning + Acting)** - The foundation of most agent architectures. Interleave thinking and action for better results.",
          "**Plan-and-Execute** - For complex tasks, separate planning from execution. Generate a high-level plan first, then execute with ability to re-plan.",
          "**Multi-Agent Collaboration** - Sometimes one agent isn't enough. Use specialized agents for research, analysis, and writing.",
        ],
      },
      { type: "heading", text: "Common Pitfalls" },
      {
        type: "bullets",
        items: [
          "Over-autonomy: Don't let agents run forever",
          "Poor error handling: Agents will fail, plan for it",
          "Missing guardrails: Always validate outputs",
        ],
      },
    ],
  },
  {
    slug: "react-performance-in-ai-heavy-applications",
    tags: ["React", "Performance", "Frontend"],
    title: "React Performance in AI-Heavy Applications",
    summary:
      "Strategies for keeping your React UI responsive when dealing with streaming LLM responses, large datasets, and complex visualizations.",
    date: "Nov 10, 2025",
    isoDate: "2025-11-10",
    readTime: "6 min read",
    body: [
      {
        type: "paragraph",
        text: "When building AI-powered React applications, performance challenges multiply. Streaming responses, real-time updates, and complex visualizations can quickly overwhelm your UI.",
      },
      { type: "heading", text: "Key Strategies" },
      {
        type: "numbered",
        items: [
          "**Virtualization** - For long chat histories or document lists, use react-window or react-virtualized.",
          "**Streaming Optimization** - Batch DOM updates during LLM streaming. Don't re-render on every token.",
          "**Web Workers** - Offload heavy computations like embedding similarity calculations to background threads.",
          "**Memoization** - Use React.memo, useMemo, and useCallback strategically, especially for components receiving streaming data.",
        ],
      },
      {
        type: "paragraph",
        text: "The goal is maintaining 60fps while processing complex AI responses. It's achievable with the right architecture.",
      },
    ],
  },
];
