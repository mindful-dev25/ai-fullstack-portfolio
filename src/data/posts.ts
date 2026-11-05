// Blog posts. Results quoted here come from the resume; the surrounding advice
// is general engineering opinion, so edit it to match your own experience.

type PostSource = {
  slug: string;
  tags: string[];
  title: string;
  summary: string;
  date: string; // Shown on the page
  isoDate: string; // Machine-readable publish date
  sections: { heading: string; paragraphs: string[] }[];
};

const WORDS_PER_MINUTE = 200;

const sources: PostSource[] = [
  {
    slug: "from-2-minutes-to-30-seconds-with-rag",
    tags: ["RAG", "LangChain", "Pinecone"],
    title: "From 2 Minutes to 30 Seconds with RAG",
    summary:
      "Notes on cutting course discovery time at Blackboard using LangChain, OpenAI embeddings, Hugging Face Transformers, and Pinecone.",
    date: "Nov 5, 2026",
    isoDate: "2026-11-05",
    sections: [
      {
        heading: "Start with the number that matters",
        paragraphs: [
          "At Blackboard, I worked on bringing course discovery time down from 2 minutes to under 30 seconds. Having one concrete target made every design decision easier, because each change could be judged by whether it helped someone find the right course faster.",
          "A demo that answers a few questions well can look finished long before it is. A clear metric keeps a RAG project honest once it meets real queries.",
        ],
      },
      {
        heading: "The stack is the easy part",
        paragraphs: [
          "The pipelines used LangChain, OpenAI embeddings, Hugging Face Transformers, and Pinecone. These are well-understood tools, and getting a first version running with them is quick.",
          "The harder work comes afterward. In my view, most RAG quality problems are retrieval problems, so I look there first: how content is split, what gets embedded, and whether the right passage reaches the model at all. If the context is wrong, a better prompt will not save the answer.",
        ],
      },
      {
        heading: "What I would tell another team",
        paragraphs: [
          "Measure the user's task, not the model's output. Inspect retrieval on its own before judging generation. And treat the pipeline as a product feature that needs ongoing tuning, not a component you ship once and forget.",
        ],
      },
    ],
  },
  {
    slug: "saving-200k-a-year-on-llm-spend",
    tags: ["LLMs", "Cost", "Model Routing"],
    title: "Saving $200K a Year on LLM Spend",
    summary:
      "How prompt engineering, retrieval tuning, and context optimization keep premium models reserved for high-complexity tasks.",
    date: "Nov 5, 2026",
    isoDate: "2026-11-05",
    sections: [
      {
        heading: "Not every request needs your best model",
        paragraphs: [
          "At Blackboard, a combination of prompt engineering, model routing, retrieval tuning, and context optimization saved $200K a year in LLM spend. The principle behind it is simple: reserve premium models for high-complexity tasks.",
          "It is tempting to send everything to the most capable model because it is the safest default while building. That default gets expensive at production volume, and many requests never needed that capability.",
        ],
      },
      {
        heading: "Four levers that work together",
        paragraphs: [
          "Model routing decides which model handles a request. Prompt engineering makes each instruction shorter and clearer. Context optimization limits what gets sent along with the prompt. Retrieval tuning supports that, because more relevant passages mean less filler in every call.",
          "These compound. A tighter prompt with better context costs less on any model, and it also makes a smaller model more likely to give a good answer, which lets you route more traffic to it.",
        ],
      },
      {
        heading: "Protect quality while you cut",
        paragraphs: [
          "Cost work only counts if the product stays just as good. I would compare answers before and after each change, and roll out routing rules gradually. Savings that quietly make the product worse are not savings.",
        ],
      },
    ],
  },
  {
    slug: "guardrails-for-low-confidence-ai",
    tags: ["Guardrails", "Safety", "Agents"],
    title: "Guardrails for Low-Confidence AI",
    summary:
      "Using hallucination detection, PII filtering, and policy enforcement to reduce low-confidence responses by 30%.",
    date: "Nov 5, 2026",
    isoDate: "2026-11-05",
    sections: [
      {
        heading: "Guardrails are a pipeline, not a filter",
        paragraphs: [
          "At Blackboard, I built guardrails pipelines covering hallucination detection, PII filtering, and policy enforcement, which reduced low-confidence AI responses by 30%.",
          "I think of these as separate stages because each one answers a different question. Is this answer supported? Does it expose personal data? Is it something the product should say at all? A single catch-all check tends to answer all three poorly.",
        ],
      },
      {
        heading: "Why this matters more with agents",
        paragraphs: [
          "When an AI system only suggests text, a person can catch a bad answer. Agents act on what they conclude, so an unsupported claim can turn into a real action. That is why I treat guardrails as core infrastructure once agents are calling tools and reaching into internal systems.",
        ],
      },
      {
        heading: "Decide what happens on failure",
        paragraphs: [
          "Detecting a problem is only half of the job. Every check needs a defined outcome, such as retrying with more context, declining to answer, or handing off to a person. Without that, a guardrail just produces a log entry that nobody reads.",
          "Track how often each check fires, too. Those numbers show where the system is weak and tell you what to improve next.",
        ],
      },
    ],
  },
];

function minutesToRead(post: PostSource) {
  const text = post.sections.flatMap(({ heading, paragraphs }) => [heading, ...paragraphs]).join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export const posts = sources.map((post) => ({
  ...post,
  readTime: `${minutesToRead(post)} min read`,
}));

export type Post = (typeof posts)[number];
