// Single source of truth for all site content. Everything here comes from the
// resume; wrap text in **double asterisks** to highlight it on the page.

const RESUME_DOC_ID = "1vctqQ3lUzCxFjAlpIMCZcJqIO8GAvQP2WamxCfzGVRA";

export const profile = {
  name: "Luis Rasgado",
  initials: "LR",
  role: "Senior AI & Full Stack Engineer",
  tagline: "Turning ambiguous ideas into reliable AI products",
  email: "luis.rasgado71@outlook.com",
  location: "San Francisco, CA",
  // Live PDF export of the resume doc, so the download never goes stale.
  resumeUrl: `https://docs.google.com/document/d/${RESUME_DOC_ID}/export?format=pdf`,
  summary:
    "Full Stack AI Engineer with 12+ years of experience in turning ambiguous product ideas into reliable software products across education technology, healthcare, and financial technology. Shipped LLM-powered applications, RAG pipelines, backend AI services, and polished React user interfaces that saved $200K annually and supported 75M users generating $2.2B in revenue.",
  expertise: ["Java", "Python", "React", "TypeScript"],
};

export const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "75M", label: "Users Supported" },
  { value: "$2.2B", label: "Annual Revenue Supported" },
  { value: "$200K", label: "Saved Annually" },
];

export type SkillIcon = "code" | "server" | "brain" | "database" | "layout" | "cloud";

export const skills: { title: string; icon: SkillIcon; items: string[] }[] = [
  {
    title: "Languages",
    icon: "code",
    items: ["Java", "JavaScript", "Python", "TypeScript", "SQL", "GraphQL"],
  },
  {
    title: "AI / ML",
    icon: "brain",
    items: ["LLMs", "Claude", "OpenAI", "LangChain", "LangGraph", "RAG", "Agentic AI", "MCP"],
  },
  {
    title: "Backend",
    icon: "server",
    items: ["Spring Boot", "Node.js", "NestJS", "Express.js", "Django", "FastAPI"],
  },
  {
    title: "Frontend",
    icon: "layout",
    items: ["React", "Redux", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "Vite"],
  },
  {
    title: "Databases",
    icon: "database",
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Pinecone"],
  },
  {
    title: "DevOps",
    icon: "cloud",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "Git", "Terraform", "Jenkins"],
  },
];

export const experience = [
  {
    title: "Applied AI Engineer",
    company: "Blackboard",
    location: "Reston, VA",
    period: "May 2023 - Nov 2026",
    highlights: [
      "Reduced instructor follow-up by **12 hours per week** by building AI agents with LangGraph and Anthropic Claude that identify at-risk students and automate personalized outreach.",
      "Cut course discovery time from 2 minutes to **under 30 seconds** by implementing RAG pipelines using LangChain, OpenAI embeddings, Hugging Face Transformers, and Pinecone.",
      "Saved **$200K annually** in LLM spend through prompt engineering, model routing, retrieval tuning, and context optimization that reserved premium models for high-complexity tasks.",
      "Built secure MCP servers in Python to connect agents with internal content and workflow systems, enabling reliable tool calling and scalable multi-agent orchestration across Java and AI backends.",
      "Reduced low-confidence AI responses by **30%** by building guardrails pipelines for hallucination detection, PII filtering, and policy enforcement.",
    ],
    tags: ["LangGraph", "Claude", "LangChain", "OpenAI", "Hugging Face", "Pinecone", "MCP", "Python", "Java"],
  },
  {
    title: "Full Stack AI Engineer",
    company: "Medtronic",
    location: "Minneapolis, MN",
    period: "Jul 2021 - Apr 2023",
    highlights: [
      "Built a healthcare platform for personalized insulin dosing using Java, Spring Boot, React, Redux, TypeScript, and GraphQL, supporting **$2.2B in annual revenue** across diabetes care.",
      "Improved patient-message classification accuracy to **91%** by fine-tuning healthcare NLP models with PyTorch and Hugging Face Trainer, and by developing pipelines for data extraction, enrichment, and classification from unstructured clinical text.",
      "Reduced accessibility QA defects by **95%** and improved UI consistency by creating an ADA-compliant component library and design system with React, TypeScript, Storybook, semantic HTML, and Tailwind CSS.",
      "Implemented HIPAA-compliant observability and security controls using OpenTelemetry, Prometheus, Grafana, OIDC authentication, and encryption, strengthening platform reliability and compliance practices.",
      "Increased team productivity by **50%** through code reviews, mentoring, and technical leadership in component design, software architecture, clean code, and SOLID principles.",
    ],
    tags: ["Java", "Spring Boot", "React", "TypeScript", "GraphQL", "PyTorch", "Storybook", "OpenTelemetry"],
  },
  {
    title: "Senior Software Engineer",
    company: "Boston Consulting Group",
    location: "San Francisco, CA",
    period: "Oct 2015 - Jun 2021",
    highlights: [
      "Supported Axle's **$10 million Series A** fundraising by re-architecting a Django monolith into microservices with event-driven architecture using Java, Spring Boot, and Spring Cloud.",
      "Built real-time ETL data pipelines processing **50 million user events** using Spark Streaming, Hadoop, Hive, and Kafka, powering analytics dashboards for engagement, feature adoption, and subscription insights.",
      "Drove a **15% increase** in mobile conversion by building responsive web applications with React, Next.js, Material UI, and TypeScript, improving frontend architecture, state management, and rendering performance.",
      "Reduced regression issues by **85%** by enhancing code quality with SonarQube and expanding automated unit and end-to-end test coverage using Jest, React Testing Library, JUnit, Mockito, and Cypress.",
      "Implemented security controls including OAuth 2.0/JWT, RBAC, rate limiting, and audit logging, enabling SOC 2 compliance and reducing security incidents.",
    ],
    tags: ["Java", "Spring Cloud", "Kafka", "Spark", "React", "Next.js", "Cypress", "OAuth 2.0"],
  },
  {
    title: "Junior Developer",
    company: "Spotify",
    location: "San Francisco, CA",
    period: "Jun 2013 - Sep 2015",
    highlights: [
      "Reduced inter-service latency by **80%** by migrating service-to-service communication from REST/JSON to gRPC with Protocol Buffers across distributed backend systems.",
      "Improved production reliability to support a **99.99% uptime SLA** through CI/CD pipelines, containerized workloads, and monitoring with Git, Docker, Kubernetes, Jenkins, Prometheus, and GCP.",
      "Scaled backend services supporting **75 million users**, delivering architecture and performance improvements in Java and Node.js through object-oriented design, MVC, and service-oriented architecture.",
    ],
    tags: ["Java", "Node.js", "gRPC", "Docker", "Kubernetes", "Jenkins", "Prometheus", "GCP"],
  },
];

// The resume lists no side projects, so these are the standout shipped systems
// from the work history above. Replace or extend with real projects and links.
export const featuredWork = [
  {
    metric: "12 hrs/week",
    metricLabel: "instructor follow-up saved",
    title: "At-Risk Student Outreach Agents",
    company: "Blackboard",
    description:
      "AI agents that identify at-risk students and automate personalized outreach, backed by secure MCP servers connecting them to internal content and workflow systems.",
    tags: ["LangGraph", "Claude", "MCP", "Python"],
  },
  {
    metric: "< 30 sec",
    metricLabel: "course discovery, down from 2 min",
    title: "RAG-Powered Course Discovery",
    company: "Blackboard",
    description:
      "RAG pipelines that take course discovery from minutes to seconds, combined with model routing and context optimization that saved $200K a year in LLM spend.",
    tags: ["LangChain", "OpenAI", "Hugging Face", "Pinecone"],
  },
  {
    metric: "$2.2B",
    metricLabel: "annual revenue supported",
    title: "Personalized Insulin Dosing Platform",
    company: "Medtronic",
    description:
      "A healthcare platform for personalized insulin dosing across diabetes care, with HIPAA-compliant observability and security controls.",
    tags: ["Java", "Spring Boot", "React", "GraphQL"],
  },
  {
    metric: "95%",
    metricLabel: "fewer accessibility QA defects",
    title: "ADA-Compliant Design System",
    company: "Medtronic",
    description:
      "A component library and design system that improved UI consistency and made accessibility the default across the product.",
    tags: ["React", "TypeScript", "Storybook", "Tailwind CSS"],
  },
  {
    metric: "50M",
    metricLabel: "user events processed",
    title: "Real-Time Analytics Pipelines",
    company: "Boston Consulting Group",
    description:
      "Real-time ETL pipelines powering analytics dashboards for engagement, feature adoption, and subscription insights.",
    tags: ["Spark Streaming", "Kafka", "Hadoop", "Hive"],
  },
  {
    metric: "80%",
    metricLabel: "lower inter-service latency",
    title: "gRPC Service Migration",
    company: "Spotify",
    description:
      "Migrated service-to-service communication from REST/JSON to gRPC with Protocol Buffers across distributed backend systems serving 75 million users.",
    tags: ["gRPC", "Protocol Buffers", "Java", "Node.js"],
  },
];

export const education = {
  degree: "Bachelor of Science, Computer Science",
  school: "University of San Francisco",
  graduated: "Graduated 2013",
};

export const certifications = [
  "Oracle Certified Professional: Java SE 21 Developer",
  "IBM AI Engineering Professional Certificate",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
