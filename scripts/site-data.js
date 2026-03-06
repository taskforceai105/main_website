export const siteContent = {
  title: "DET 105 AI TASK FORCE",
  subtitle: "Explore modern AI tools, workflows, and resources.",
  supportingLine:
    "A curated launch point for students to discover practical AI systems without the noise.",
  eyebrow: "Student Exploration Hub",
  explorerIntro:
    "Use the category tabs to move through a focused set of assistants, coding tools, research platforms, local AI options, and fast-reference learning material.",
  footerNote:
    "Det 105 AI Task Force \u2014 Student AI Exploration Hub",
  footerDisclaimer: "External tools, pricing, and availability may change over time.",
  signals: [
    {
      label: "Mission Focus",
      text: "Practical AI discovery for students who need a clean starting point, not a crowded course portal.",
    },
    {
      label: "Operational Style",
      text: "Premium command-center visuals, lightweight descriptions, and quick outbound links to official products.",
    },
    {
      label: "Expansion Ready",
      text: "Tool categories, card copy, and menu content are driven from a single data file for future updates.",
    },
  ],
};

export const orbitingLogos = [
  {
    name: "OpenAI",
    href: "https://openai.com/chatgpt/overview/",
    asset: "assets/logos/openai-badge.svg",
    angle: "0deg",
  },
  {
    name: "Gemini",
    href: "https://gemini.google.com/",
    asset: "assets/logos/gemini-badge.svg",
    angle: "60deg",
  },
  {
    name: "Claude",
    href: "https://www.anthropic.com/claude",
    asset: "assets/logos/claude-badge.svg",
    angle: "120deg",
  },
  {
    name: "Grok",
    href: "https://x.ai/grok",
    asset: "assets/logos/grok-badge.svg",
    angle: "180deg",
  },
  {
    name: "Qwen",
    href: "https://qwen.ai/",
    asset: "assets/logos/qwen-badge.svg",
    angle: "240deg",
  },
  {
    name: "Perplexity",
    href: "https://www.perplexity.ai/",
    asset: "assets/logos/perplexity-badge.svg",
    angle: "300deg",
  },
];

export const toolCategories = [
  {
    id: "chat-assistants",
    title: "Chat Assistants",
    description:
      "Start here for general-purpose chat, brainstorming, drafting, and fast question answering.",
    tools: [
      {
        name: "ChatGPT",
        description:
          "A flexible assistant for writing, analysis, planning, code help, and multimodal workflows in one interface.",
        href: "https://openai.com/chatgpt/overview/",
        tag: "General Use",
      },
      {
        name: "Gemini",
        description:
          "Google's assistant for general chat, document work, and cross-product workflows tied to the Google ecosystem.",
        href: "https://gemini.google.com/",
        tag: "Google Stack",
      },
      {
        name: "Claude",
        description:
          "Strong for structured writing, careful reasoning, and long-context document work when you need a clean, readable response style.",
        href: "https://www.anthropic.com/claude",
        tag: "Long Context",
      },
      {
        name: "Grok",
        description:
          "An xAI assistant with web-connected exploration and a conversational style suited to current-event lookups and quick ideation.",
        href: "https://x.ai/grok",
        tag: "Live Web",
      },
      {
        name: "Qwen Chat",
        description:
          "Alibaba's broadly accessible chat interface for experimenting with the Qwen model family across everyday student tasks.",
        href: "https://qwen.ai/",
        tag: "Open Access",
      },
    ],
  },
  {
    id: "coding-tools",
    title: "Coding Tools",
    description:
      "Developer-focused tools for terminal workflows, code editing, refactoring, and project acceleration.",
    tools: [
      {
        name: "Codex CLI",
        description:
          "OpenAI's terminal-based coding agent for repo navigation, edits, reviews, and local development workflows.",
        href: "https://github.com/openai/codex",
        tag: "Terminal Agent",
      },
      {
        name: "Cursor",
        description:
          "An AI-native code editor built for natural-language edits, codebase Q&A, and faster iteration inside the IDE.",
        href: "https://www.cursor.com/",
        tag: "IDE",
      },
      {
        name: "Gemini CLI",
        description:
          "Google's open-source command-line agent for code, search-grounded tasks, and developer-oriented automation.",
        href: "https://github.com/google-gemini/gemini-cli",
        tag: "Open Source",
      },
      {
        name: "Local Model Workflows",
        description:
          "Use self-hosted models when you want offline testing, hardware-aware experimentation, or controlled data handling.",
        href: "https://ollama.com/",
        tag: "Self-Hosted",
      },
    ],
  },
  {
    id: "research-tools",
    title: "Research Tools",
    description:
      "Use these when citations, source grounding, or notebook-style synthesis matter more than general chat.",
    tools: [
      {
        name: "Perplexity",
        description:
          "A source-linked answer engine that is useful for quick research, follow-up questions, and evidence-backed summaries.",
        href: "https://www.perplexity.ai/",
        tag: "Citations",
      },
      {
        name: "NotebookLM",
        description:
          "Google's notebook-style assistant for working from your own source set, especially useful for reading packs and study material.",
        href: "https://notebooklm.google.com/",
        tag: "Source Grounded",
      },
      {
        name: "ChatGPT Research Workflows",
        description:
          "Useful when you want broad synthesis, interactive planning, and multimodal support before narrowing into formal sources.",
        href: "https://openai.com/chatgpt/overview/",
        tag: "Synthesis",
      },
    ],
  },
  {
    id: "image-media",
    title: "Image / Media Tools",
    description:
      "Focused options for visual ideation, image generation, and multimedia experimentation without burying students in extra interfaces.",
    tools: [
      {
        name: "ChatGPT Image Generation",
        description:
          "Generate concept art, diagrams, mockups, and visual explainers from text prompts inside the ChatGPT workflow.",
        href: "https://openai.com/chatgpt/overview/",
        tag: "Images",
      },
      {
        name: "Gemini Media Tools",
        description:
          "Use Gemini's multimodal workflows for image understanding, generation-related tasks, and broader creative experimentation.",
        href: "https://gemini.google.com/",
        tag: "Multimodal",
      },
      {
        name: "Perplexity Pages",
        description:
          "Turn research threads into polished shareable summaries that are easier to brief, review, and pass along to a team.",
        href: "https://www.perplexity.ai/",
        tag: "Presentation",
      },
    ],
  },
  {
    id: "open-source-local-ai",
    title: "Open-Source / Local AI",
    description:
      "For students who want to run models locally, self-host interfaces, or understand the local AI tooling stack.",
    tools: [
      {
        name: "llama.cpp",
        description:
          "A lightweight local inference project for running quantized models on consumer hardware with strong portability.",
        href: "https://github.com/ggml-org/llama.cpp",
        tag: "Inference",
      },
      {
        name: "Ollama",
        description:
          "One of the easiest ways to download, run, and manage local models on a laptop or desktop system.",
        href: "https://ollama.com/",
        tag: "Runtime",
      },
      {
        name: "Open WebUI",
        description:
          "A clean self-hosted interface that can sit on top of Ollama and other compatible model backends.",
        href: "https://openwebui.com/",
        tag: "Interface",
      },
    ],
  },
  {
    id: "learning-resources",
    title: "Learning Resources",
    description:
      "Short reference points for prompting, responsible use, and choosing the right tool for the task at hand.",
    tools: [
      {
        name: "Prompt Engineering Guide",
        description:
          "A practical reference for building cleaner prompts, narrowing outputs, and reducing wasted iterations.",
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        tag: "Prompts",
      },
      {
        name: "Responsible AI Basics",
        description:
          "A grounded reference for risk, trust, and operational responsibility using the NIST AI RMF playbook.",
        href: "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook",
        tag: "Risk",
      },
      {
        name: "Model Selection Guide",
        description:
          "Use model capability guides to match the tool to the job instead of defaulting to the first assistant you open.",
        href: "https://platform.openai.com/docs/models",
        tag: "Compare",
      },
    ],
  },
];
