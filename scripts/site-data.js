export const universeContent = {
  title: "DET 105 AI TASK FORCE",
  subtitle: "AI Universe",
  heading: "Det 105 AI Task Force Homepage",
  supportingLine:
    "Explore the AI universe through galaxy-scale topic regions, glowing planetary nodes, and focused mission-ready briefings.",
  missionLine:
    "This experience is designed as a command-map for students: visual first, lightweight on text, and easy to expand as the ecosystem evolves.",
  overviewTitle: "AI Universe Overview",
  overviewSubtitle: "Select a galaxy or planetary node",
  overviewDescription:
    "Start from the zoomed-out map to see the full AI landscape, then focus a sector to inspect tools, concepts, and learning pathways.",
  overviewWhy:
    "The homepage is intentionally structured as a living visual map first and a content library second.",
  footerNote: "Det 105 AI Task Force - Student AI Exploration Hub",
  footerDisclaimer:
    "Tool coverage is curated for exploration. External services, pricing, and availability may change.",
  commandDeck: [
    {
      label: "Universe State",
      value: "7 Sectors",
      text: "Core AI domains arranged as a cinematic galaxy map with live focus states and ambient motion.",
    },
    {
      label: "Interaction Mode",
      value: "Click to Focus",
      text: "Select a galaxy to isolate the region, then open planets for concise mission notes and official links.",
    },
    {
      label: "Build Profile",
      value: "Netlify Static",
      text: "Maintains the existing zero-build deployment path while pushing the homepage toward a richer visual system.",
    },
  ],
};

export const galaxyClusters = [
  {
    id: "llms",
    title: "LLMs",
    subtitle: "Frontline assistant systems",
    description:
      "General-purpose language-model platforms for drafting, ideation, analysis, and multimodal workflows.",
    why:
      "This sector is where most students start when they need immediate capability across writing, reasoning, and rapid problem-solving.",
    accent: "#70b8ff",
    accentSoft: "rgba(112, 184, 255, 0.2)",
    x: 16,
    y: 18,
    size: 360,
    planets: [
      {
        id: "chatgpt",
        name: "ChatGPT",
        type: "Assistant",
        x: 23,
        y: 26,
        size: "lg",
        description:
          "A flexible multimodal assistant for writing, planning, code help, image work, and general-purpose AI workflows.",
        goodFor: "Strong all-around starting point for students exploring modern AI systems.",
        href: "https://openai.com/chatgpt/overview/",
      },
      {
        id: "gemini",
        name: "Gemini",
        type: "Assistant",
        x: 74,
        y: 30,
        size: "md",
        description:
          "Google's broad AI assistant ecosystem with strong integration across search, documents, and productivity workflows.",
        goodFor: "Useful when your work already lives in Google's tools.",
        href: "https://gemini.google.com/",
      },
      {
        id: "claude",
        name: "Claude",
        type: "Assistant",
        x: 34,
        y: 72,
        size: "md",
        description:
          "Known for polished long-form responses, careful writing, and strong performance on document-heavy tasks.",
        goodFor: "Excellent for structured writing, reading, and context-rich analysis.",
        href: "https://www.anthropic.com/claude",
      },
      {
        id: "grok",
        name: "Grok",
        type: "Assistant",
        x: 77,
        y: 68,
        size: "sm",
        description:
          "An xAI assistant positioned around web-connected exploration and current-information workflows.",
        goodFor: "Useful for fast ideation and live-web style interaction.",
        href: "https://x.ai/grok",
      },
      {
        id: "qwen",
        name: "Qwen",
        type: "Assistant",
        x: 54,
        y: 13,
        size: "sm",
        description:
          "A broadly accessible model family and chat surface for experimenting with another major frontier model ecosystem.",
        goodFor: "Good for comparison testing and exploring model variety beyond the most common defaults.",
        href: "https://qwen.ai/",
      },
    ],
  },
  {
    id: "coding-tools",
    title: "AI Coding Tools",
    subtitle: "Developer acceleration systems",
    description:
      "Terminal agents, editors, and code-native assistants that help navigate, edit, and build software projects faster.",
    why:
      "Students moving into technical work can use this region to understand how AI changes software workflows, not just chat.",
    accent: "#7fe7ff",
    accentSoft: "rgba(127, 231, 255, 0.2)",
    x: 70,
    y: 16,
    size: 350,
    planets: [
      {
        id: "codex-cli",
        name: "Codex CLI",
        type: "Terminal Agent",
        x: 24,
        y: 29,
        size: "md",
        description:
          "A terminal-native coding agent built for repository navigation, edits, reviews, and local engineering tasks.",
        goodFor: "Best when you want AI inside a real repo workflow instead of a copy-paste chat loop.",
        href: "https://github.com/openai/codex",
      },
      {
        id: "cursor",
        name: "Cursor",
        type: "AI IDE",
        x: 76,
        y: 31,
        size: "md",
        description:
          "An AI-first editor designed for code generation, refactoring, file-aware Q&A, and fast iterative development.",
        goodFor: "Strong for editor-centric coding workflows and rapid iteration.",
        href: "https://www.cursor.com/",
      },
      {
        id: "gemini-cli",
        name: "Gemini CLI",
        type: "CLI",
        x: 38,
        y: 72,
        size: "sm",
        description:
          "Google's open-source command-line agent for code, research-grounded tasks, and developer automation.",
        goodFor: "A useful comparison point when evaluating terminal-based agents.",
        href: "https://github.com/google-gemini/gemini-cli",
      },
      {
        id: "local-code-agents",
        name: "Local Code Assistants",
        type: "Workflow",
        x: 72,
        y: 71,
        size: "sm",
        description:
          "A placeholder node for self-hosted or laptop-run coding assistants built on local models and open-source tooling.",
        goodFor: "Relevant when data control, offline testing, or customization matters more than convenience.",
        href: "https://ollama.com/",
      },
    ],
  },
  {
    id: "research",
    title: "Research / Knowledge",
    subtitle: "Grounded information systems",
    description:
      "Tools that help collect, synthesize, and reason over sources, documents, and research threads.",
    why:
      "This sector matters when students need citations, source grounding, or structured study support instead of generic chat.",
    accent: "#92c5ff",
    accentSoft: "rgba(146, 197, 255, 0.18)",
    x: 82,
    y: 52,
    size: 320,
    planets: [
      {
        id: "perplexity",
        name: "Perplexity",
        type: "Research Engine",
        x: 26,
        y: 33,
        size: "md",
        description:
          "A source-linked answer engine that blends AI responses with citations and quick web research patterns.",
        goodFor: "Fast research with visible sources and follow-up questions.",
        href: "https://www.perplexity.ai/",
      },
      {
        id: "notebooklm",
        name: "NotebookLM",
        type: "Notebook",
        x: 72,
        y: 37,
        size: "md",
        description:
          "A notebook-style assistant for working from your own uploaded material and source collections.",
        goodFor: "Useful for reading packets, notes, and source-bounded study work.",
        href: "https://notebooklm.google.com/",
      },
      {
        id: "research-workflows",
        name: "AI Research Workflows",
        type: "Concept",
        x: 52,
        y: 75,
        size: "sm",
        description:
          "A placeholder node covering combined workflows: search, synthesis, verification, and turning findings into briefs.",
        goodFor: "Represents method, not one single product.",
        href: "https://openai.com/chatgpt/overview/",
      },
    ],
  },
  {
    id: "image-media",
    title: "Image / Media AI",
    subtitle: "Visual generation and multimodal systems",
    description:
      "Image generation, multimodal reasoning, and media-centric AI workflows for creative and presentation tasks.",
    why:
      "This region helps students understand that modern AI is not only text-based; visuals and multimodal systems are part of the same ecosystem.",
    accent: "#9f90ff",
    accentSoft: "rgba(159, 144, 255, 0.16)",
    x: 58,
    y: 76,
    size: 340,
    planets: [
      {
        id: "chatgpt-images",
        name: "ChatGPT Image",
        type: "Generation",
        x: 29,
        y: 26,
        size: "md",
        description:
          "Use text prompts to create concept art, explainers, visual mockups, and rapid presentation assets.",
        goodFor: "Quick visual ideation without leaving the broader assistant workflow.",
        href: "https://openai.com/chatgpt/overview/",
      },
      {
        id: "gemini-media",
        name: "Gemini Multimodal",
        type: "Multimodal",
        x: 72,
        y: 34,
        size: "md",
        description:
          "A multimodal environment for working across text, images, and media-aware AI tasks.",
        goodFor: "Useful when you need cross-format interaction inside one system.",
        href: "https://gemini.google.com/",
      },
      {
        id: "media-workflows",
        name: "Media Workflows",
        type: "Concept",
        x: 49,
        y: 73,
        size: "sm",
        description:
          "A placeholder node for creative workflows such as storyboarding, briefing, concept development, and multimodal presentation design.",
        goodFor: "Represents the broader category rather than a single fixed tool.",
        href: "https://www.perplexity.ai/",
      },
    ],
  },
  {
    id: "local-open-source",
    title: "Local / Open Source AI",
    subtitle: "Self-hosted model infrastructure",
    description:
      "The local-model ecosystem for students who want to run models on their own hardware or understand the open-source stack.",
    why:
      "This sector is where the AI universe becomes tangible: models, runtimes, and interfaces you can directly control.",
    accent: "#6dffe6",
    accentSoft: "rgba(109, 255, 230, 0.16)",
    x: 20,
    y: 68,
    size: 360,
    planets: [
      {
        id: "ollama",
        name: "Ollama",
        type: "Runtime",
        x: 24,
        y: 33,
        size: "md",
        description:
          "A simple local-model runtime that makes downloading and running popular models much easier on personal systems.",
        goodFor: "Fastest on-ramp for local model experimentation.",
        href: "https://ollama.com/",
      },
      {
        id: "llama-cpp",
        name: "llama.cpp",
        type: "Inference",
        x: 76,
        y: 28,
        size: "md",
        description:
          "A lightweight and portable inference project for quantized models running on consumer hardware.",
        goodFor: "Important when performance, portability, and lower-level control matter.",
        href: "https://github.com/ggml-org/llama.cpp",
      },
      {
        id: "open-webui",
        name: "Open WebUI",
        type: "Interface",
        x: 33,
        y: 75,
        size: "sm",
        description:
          "A self-hosted chat interface that can sit on top of local runtimes and model-serving backends.",
        goodFor: "Useful when you want a clean front-end over local AI infrastructure.",
        href: "https://openwebui.com/",
      },
      {
        id: "local-model-stacks",
        name: "Model Stacks",
        type: "Concept",
        x: 73,
        y: 70,
        size: "sm",
        description:
          "A placeholder node for combining runtimes, interfaces, quantized models, and hardware-specific workflows.",
        goodFor: "Represents the ecosystem architecture rather than one tool.",
        href: "https://ollama.com/",
      },
    ],
  },
  {
    id: "fundamentals",
    title: "AI Fundamentals / Learning",
    subtitle: "Core operating knowledge",
    description:
      "Prompting, responsible use, model selection, and baseline concepts that help students use AI with more judgment.",
    why:
      "This is the doctrinal layer of the map: the knowledge that improves how every other sector is used.",
    accent: "#ffd57a",
    accentSoft: "rgba(255, 213, 122, 0.16)",
    x: 44,
    y: 44,
    size: 260,
    planets: [
      {
        id: "prompting",
        name: "Prompting",
        type: "Practice",
        x: 27,
        y: 30,
        size: "sm",
        description:
          "Prompt design shapes the quality, specificity, and reliability of model outputs more than most beginners expect.",
        goodFor: "High-return skill for nearly every AI workflow.",
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
      },
      {
        id: "model-selection",
        name: "Model Selection",
        type: "Practice",
        x: 73,
        y: 35,
        size: "sm",
        description:
          "Different models excel at different things: code, speed, multimodal tasks, cost efficiency, or long-context work.",
        goodFor: "Prevents defaulting to a single tool for every mission.",
        href: "https://platform.openai.com/docs/models",
      },
      {
        id: "responsible-use",
        name: "Responsible Use",
        type: "Practice",
        x: 50,
        y: 74,
        size: "sm",
        description:
          "Understanding risk, trust, and validation helps students use AI effectively without over-trusting it.",
        goodFor: "Critical for sound judgment and operational discipline.",
        href: "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook",
      },
    ],
  },
  {
    id: "agents",
    title: "Agents / Automation",
    subtitle: "Future-ready autonomous workflows",
    description:
      "The emerging region where AI shifts from one-off answers toward orchestration, tool use, and longer-running tasks.",
    why:
      "This sector is intentionally more conceptual. It gives the homepage a future-facing lane without pretending the category is fully settled.",
    accent: "#ff8cd7",
    accentSoft: "rgba(255, 140, 215, 0.14)",
    x: 50,
    y: 10,
    size: 240,
    planets: [
      {
        id: "workflow-agents",
        name: "Workflow Agents",
        type: "Concept",
        x: 30,
        y: 32,
        size: "sm",
        description:
          "Agents that can plan, call tools, and complete a sequence of steps instead of returning only one response.",
        goodFor: "A useful concept for understanding where AI tooling is headed.",
        href: "https://github.com/openai/codex",
      },
      {
        id: "automation",
        name: "Automation",
        type: "Concept",
        x: 71,
        y: 38,
        size: "sm",
        description:
          "Automation combines AI systems with repeatable actions, making them part of a larger operational workflow.",
        goodFor: "Represents system-level thinking rather than a single UI.",
        href: "https://openai.com/chatgpt/overview/",
      },
      {
        id: "human-loop",
        name: "Human in the Loop",
        type: "Principle",
        x: 50,
        y: 75,
        size: "sm",
        description:
          "The most useful automation designs still keep humans supervising intent, quality, and critical decisions.",
        goodFor: "A grounding principle for future AI task-force expansion.",
        href: "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook",
      },
    ],
  },
];
