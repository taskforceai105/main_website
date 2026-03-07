export const universeContent = {
  title: "DET 105 AI TASK FORCE",
  subtitle: "Explore modern AI tools by topic.",
  teaser:
    "A clean, curated AI directory built for Det 105 students who need quick orientation across today's major tools, workflows, and foundational practices.",
  introPrompt:
    "Browse by category, compare real products, and open concise detail panels with official links instead of navigating a heavy experimental map.",
  enterLabel: "Browse AI Directory",
  universeBriefTitle: "AI Directory",
  universeBriefText:
    "This site now uses a stable categorized directory across desktop and mobile. It prioritizes clear navigation, reliable detail panels, and maintainable structured content over map-style exploration.",
  footerNote: "Det 105 AI Task Force - Student AI Exploration Hub",
  footerDisclaimer:
    "Brand assets are sourced from official public origins where practical. Tool access and availability may change.",
};

export const interfaceModes = {
  pc: {
    id: "pc",
    label: "PC",
    title: "PC Command View",
    eyebrow: "Desktop profile",
    summary: "Richer spatial framing built for mouse, wheel, keyboard, and wider command-deck layouts.",
    introHint: "Scroll, click, and zoom through the AI universe.",
    universeHint: "Wheel to zoom. Click once to focus, then click again or press Enter to enter a galaxy.",
    galaxyHint: "Click tool nodes to inspect them. Wheel out or use Back to retreat to the universe.",
    recommendation: "Best for desktops, laptops, and larger screens.",
  },
  mobile: {
    id: "mobile",
    label: "Mobile",
    title: "Mobile Command View",
    eyebrow: "Field device profile",
    summary: "Touch-first framing with tighter information density, mobile-safe panels, and landscape optimization.",
    introHint: "Touch-first galaxy focus with cinematic mobile panels.",
    universeHint: "Tap destinations to focus them, then use the launch card to zoom into a galaxy.",
    galaxyHint: "Tap tool nodes to open their briefing. Use the bottom sheet and back controls to navigate.",
    recommendation: "Best experienced in landscape on mobile for the full command view.",
    rotateTitle: "Rotate your device for the full command view",
    rotateCopy: "Landscape unlocks the strongest framing, cleaner node spacing, and the full mobile command layout.",
  },
};

export const galaxyClusters = [
  {
    id: "llms",
    title: "LLMs",
    subtitle: "Frontline assistant systems",
    visualKey: "llms",
    accent: "#74beff",
    accentSoft: "rgba(116, 190, 255, 0.26)",
    description:
      "General-purpose model platforms for drafting, analysis, multimodal work, and broad problem solving.",
    why:
      "This is the most common entry point for students evaluating modern AI capability.",
    universeX: 19,
    universeY: 33,
    focusTitle: "LLM Galaxy",
    focusCopy:
      "The language-model sector concentrates mainstream assistant platforms and the fastest route into daily AI workflows.",
    planets: [
      {
        id: "chatgpt",
        name: "ChatGPT",
        type: "Assistant",
        logoKey: "chatgpt",
        focusX: 18,
        focusY: 54,
        size: "lg",
        description:
          "A flexible multimodal assistant for writing, planning, code help, image work, and general-purpose AI workflows.",
        goodFor: "Strong all-around starting point for student AI exploration.",
        href: "https://openai.com/chatgpt/overview/",
      },
      {
        id: "gemini",
        name: "Gemini",
        type: "Assistant",
        logoKey: "gemini",
        focusX: 74,
        focusY: 26,
        size: "md",
        description:
          "Google's broad assistant ecosystem with strong ties to search, docs, and productivity workflows.",
        goodFor: "Useful when your work already lives in Google's ecosystem.",
        href: "https://gemini.google.com/",
      },
      {
        id: "claude",
        name: "Claude",
        type: "Assistant",
        logoKey: "claude",
        focusX: 31,
        focusY: 76,
        size: "md",
        description:
          "Known for polished long-form responses, careful writing, and strong document-oriented reasoning.",
        goodFor: "Excellent for reading, synthesis, and structured writing tasks.",
        href: "https://www.anthropic.com/claude",
      },
      {
        id: "grok",
        name: "Grok",
        type: "Assistant",
        logoKey: "grok",
        focusX: 78,
        focusY: 63,
        size: "sm",
        description:
          "An xAI assistant aimed at fast ideation and current-information workflows.",
        goodFor: "Useful for quick exploration and web-aware interaction patterns.",
        href: "https://x.ai/grok",
      },
      {
        id: "qwen",
        name: "Qwen",
        type: "Assistant",
        logoKey: "qwen",
        focusX: 52,
        focusY: 18,
        size: "sm",
        description:
          "A major frontier model family and chat surface for broader ecosystem comparison.",
        goodFor: "Good for exploring model variety beyond the most common defaults.",
        href: "https://qwen.ai/",
      },
    ],
  },
  {
    id: "coding",
    title: "Coding Tools",
    subtitle: "Developer acceleration systems",
    visualKey: "coding",
    accent: "#88f2ff",
    accentSoft: "rgba(136, 242, 255, 0.22)",
    description:
      "Terminal agents, AI IDEs, and code-native systems that reshape software workflows.",
    why:
      "This region matters once students move from asking questions to building with AI directly in technical environments.",
    universeX: 77,
    universeY: 29,
    focusTitle: "Coding Tools Galaxy",
    focusCopy:
      "This sector shifts from general chat into execution: repositories, editors, terminals, refactors, and agent-style coding loops.",
    planets: [
      {
        id: "codex-cli",
        name: "Codex CLI",
        type: "Terminal Agent",
        logoKey: "chatgpt",
        focusX: 22,
        focusY: 34,
        size: "md",
        description:
          "A terminal-native coding agent built for repository navigation, edits, reviews, and local engineering tasks.",
        goodFor: "Best when you want AI working inside an actual repo workflow.",
        href: "https://github.com/openai/codex",
      },
      {
        id: "cursor",
        name: "Cursor",
        type: "AI IDE",
        logoKey: "cursor",
        focusX: 76,
        focusY: 34,
        size: "md",
        description:
          "An AI-first code editor for file-aware Q&A, generation, refactors, and rapid iterative development.",
        goodFor: "Strong for editor-centric coding and high-velocity iteration.",
        href: "https://www.cursor.com/",
      },
      {
        id: "gemini-cli",
        name: "Gemini CLI",
        type: "CLI",
        logoKey: "googleGeminiCli",
        focusX: 36,
        focusY: 72,
        size: "sm",
        description:
          "Google's open-source command-line agent for code, research-grounded tasks, and developer automation.",
        goodFor: "Useful for comparing different terminal-agent workflows.",
        href: "https://github.com/google-gemini/gemini-cli",
      },
      {
        id: "github-copilot",
        name: "GitHub Copilot",
        type: "Coding Assistant",
        logoKey: "githubCopilot",
        focusX: 70,
        focusY: 70,
        size: "sm",
        description:
          "GitHub's AI coding assistant for in-editor completions, chat, and repository-aware software workflows.",
        goodFor: "Useful when your coding flow already lives in GitHub, VS Code, or JetBrains tools.",
        href: "https://github.com/features/copilot",
      },
    ],
  },
  {
    id: "research",
    title: "Research Tools",
    subtitle: "Grounded information systems",
    visualKey: "research",
    accent: "#9fd0ff",
    accentSoft: "rgba(159, 208, 255, 0.2)",
    description:
      "Tools that collect, synthesize, and reason over sources, documents, and research threads.",
    why:
      "This sector matters when citations, source grounding, or study-oriented workflows matter more than raw chat speed.",
    universeX: 81,
    universeY: 67,
    focusTitle: "Research Galaxy",
    focusCopy:
      "This region is about source-aware AI: research engines, notebook-style synthesis, and verification-minded workflows.",
    planets: [
      {
        id: "perplexity",
        name: "Perplexity",
        type: "Research Engine",
        logoKey: "perplexity",
        focusX: 22,
        focusY: 42,
        size: "md",
        description:
          "A source-linked answer engine that blends AI responses with citations and follow-up exploration.",
        goodFor: "Fast research with visible sources and quick drilldown.",
        href: "https://www.perplexity.ai/",
      },
      {
        id: "notebooklm",
        name: "NotebookLM",
        type: "Notebook",
        logoKey: "notebooklm",
        focusX: 72,
        focusY: 36,
        size: "md",
        description:
          "A notebook-style assistant for working from uploaded material and source-bounded study sets.",
        goodFor: "Useful for reading packs, notes, and source-specific study sessions.",
        href: "https://notebooklm.google.com/",
      },
      {
        id: "elicit",
        name: "Elicit",
        type: "Research Assistant",
        logoKey: "elicit",
        focusX: 52,
        focusY: 72,
        size: "sm",
        description:
          "A research workflow assistant built around paper search, evidence synthesis, and structured literature review tasks.",
        goodFor: "Strong when students need paper discovery and study-oriented evidence gathering.",
        href: "https://elicit.com/",
      },
    ],
  },
  {
    id: "media",
    title: "Image / Media AI",
    subtitle: "Visual and multimodal systems",
    visualKey: "media",
    accent: "#9f94ff",
    accentSoft: "rgba(159, 148, 255, 0.2)",
    description:
      "Image generation, multimodal reasoning, and media-oriented AI workflows for creative or presentation tasks.",
    why:
      "This region helps students see that modern AI is not only about text; visual and multimodal systems are part of the same landscape.",
    universeX: 61,
    universeY: 80,
    focusTitle: "Image and Media Galaxy",
    focusCopy:
      "This sector brings visual ideation, multimodal work, and concept-generation tools into one cinematic region.",
    planets: [
      {
        id: "chatgpt-image",
        name: "ChatGPT Image",
        type: "Generation",
        logoKey: "chatgpt",
        focusX: 24,
        focusY: 40,
        size: "md",
        description:
          "Use prompts to create concept art, explainers, visual mockups, and presentation assets.",
        goodFor: "Fast visual ideation without leaving the main assistant workflow.",
        href: "https://openai.com/chatgpt/overview/",
      },
      {
        id: "gemini-multimodal",
        name: "Gemini Multimodal",
        type: "Multimodal",
        logoKey: "gemini",
        focusX: 74,
        focusY: 34,
        size: "md",
        description:
          "A multimodal environment for working across text, images, and media-aware tasks.",
        goodFor: "Useful when one workflow needs both language and visual reasoning.",
        href: "https://gemini.google.com/",
      },
      {
        id: "runway",
        name: "Runway",
        type: "Media Studio",
        logoKey: "runway",
        focusX: 50,
        focusY: 72,
        size: "sm",
        description:
          "A creative AI studio focused on image, video, and production-oriented generative media workflows.",
        goodFor: "Useful when visual ideation needs to move into motion, storyboards, or media production.",
        href: "https://runwayml.com/",
      },
    ],
  },
  {
    id: "local",
    title: "Local / Open Source AI",
    subtitle: "Self-hosted model infrastructure",
    visualKey: "local",
    accent: "#72ffe5",
    accentSoft: "rgba(114, 255, 229, 0.2)",
    description:
      "The self-hosted model ecosystem for students who want to run models locally and understand the open stack.",
    why:
      "This sector is where AI becomes tangible infrastructure: runtimes, interfaces, quantized models, and local control.",
    universeX: 21,
    universeY: 73,
    focusTitle: "Local and Open Source Galaxy",
    focusCopy:
      "This region is about running the stack yourself: local inference, interfaces, and open-source control planes.",
    planets: [
      {
        id: "ollama",
        name: "Ollama",
        type: "Runtime",
        logoKey: "ollama",
        focusX: 20,
        focusY: 38,
        size: "md",
        description:
          "A simple local-model runtime that makes downloading and running models much easier on personal systems.",
        goodFor: "Fastest on-ramp for local model experimentation.",
        href: "https://ollama.com/",
      },
      {
        id: "llama-cpp",
        name: "llama.cpp",
        type: "Inference",
        logoKey: "ggml",
        focusX: 74,
        focusY: 34,
        size: "md",
        description:
          "A lightweight and portable inference project for quantized models on consumer hardware.",
        goodFor: "Important when performance, portability, and lower-level control matter.",
        href: "https://github.com/ggml-org/llama.cpp",
      },
      {
        id: "open-webui",
        name: "Open WebUI",
        type: "Interface",
        logoKey: "openwebui",
        focusX: 34,
        focusY: 74,
        size: "sm",
        description:
          "A self-hosted chat interface that sits on top of local runtimes and model-serving backends.",
        goodFor: "Useful when you want a clean front-end over local AI infrastructure.",
        href: "https://openwebui.com/",
      },
      {
        id: "lm-studio",
        name: "LM Studio",
        type: "Desktop Runtime",
        logoKey: "lmStudio",
        focusX: 72,
        focusY: 72,
        size: "sm",
        description:
          "A desktop application for discovering, downloading, and running local models with a polished local-first workflow.",
        goodFor: "Good for students who want a simpler desktop path into local model use.",
        href: "https://lmstudio.ai/",
      },
    ],
  },
  {
    id: "learning",
    title: "AI Learning",
    subtitle: "Core operating knowledge",
    visualKey: "learning",
    accent: "#ffd97f",
    accentSoft: "rgba(255, 217, 127, 0.22)",
    description:
      "Prompting, responsible use, model selection, and fundamentals that improve judgment across every other sector.",
    why:
      "This is the doctrinal layer of the map: the knowledge that makes every other AI tool more useful.",
    universeX: 46,
    universeY: 17,
    focusTitle: "AI Learning and Fundamentals Galaxy",
    focusCopy:
      "This sector is about using AI with more skill and judgment: better prompts, clearer model choice, and stronger validation habits.",
    planets: [
      {
        id: "prompting",
        name: "Prompting",
        type: "Practice",
        logoKey: "prompting",
        focusX: 24,
        focusY: 34,
        size: "sm",
        description:
          "Prompt design shapes quality, specificity, and reliability more than most beginners expect.",
        goodFor: "High-return skill for nearly every AI workflow.",
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
      },
      {
        id: "model-selection",
        name: "Model Selection",
        type: "Practice",
        logoKey: "models",
        focusX: 74,
        focusY: 35,
        size: "sm",
        description:
          "Different models excel at different jobs: code, speed, multimodal work, cost efficiency, or long context.",
        goodFor: "Prevents defaulting to one tool for every mission.",
        href: "https://platform.openai.com/docs/models",
      },
      {
        id: "responsible-use",
        name: "Responsible Use",
        type: "Practice",
        logoKey: "responsible",
        focusX: 30,
        focusY: 72,
        size: "sm",
        description:
          "Understanding risk, trust, and validation helps students use AI effectively without over-trusting it.",
        goodFor: "Critical for sound judgment and operational discipline.",
        href: "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook",
      },
      {
        id: "best-practices",
        name: "Best Practices",
        type: "Practice",
        logoKey: "bestPractices",
        focusX: 70,
        focusY: 72,
        size: "sm",
        description:
          "Operational habits like source checks, task-tool matching, and iteration discipline make AI use more reliable.",
        goodFor: "Turns experimentation into repeatable workflow competence.",
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
      },
    ],
  },
];

export const desktopUniverseDimensions = {
  width: 2600,
  height: 1680,
};

export const desktopUniverseCore = {
  x: 1260,
  y: 880,
  title: "Det 105 Command Core",
  subtitle: "Interconnected AI ecosystem",
};

export const desktopUniverseRegions = [
  {
    id: "learning",
    title: "AI Learning",
    subtitle: "Operating knowledge",
    accent: "#ffd97f",
    x: 980,
    y: 220,
    width: 560,
    height: 290,
    labelX: -220,
    labelY: -92,
  },
  {
    id: "llms",
    title: "LLM Systems",
    subtitle: "Frontline assistant ecosystems",
    accent: "#74beff",
    x: 540,
    y: 520,
    width: 820,
    height: 590,
    labelX: -300,
    labelY: -228,
  },
  {
    id: "coding",
    title: "Coding Tools",
    subtitle: "Developer acceleration",
    accent: "#88f2ff",
    x: 1540,
    y: 430,
    width: 700,
    height: 470,
    labelX: -250,
    labelY: -188,
  },
  {
    id: "research",
    title: "Research / Knowledge",
    subtitle: "Grounded information systems",
    accent: "#9fd0ff",
    x: 2120,
    y: 650,
    width: 520,
    height: 400,
    labelX: -220,
    labelY: -150,
  },
  {
    id: "agents",
    title: "Agents / Automation",
    subtitle: "Workflow orchestration systems",
    accent: "#7fc9ff",
    x: 2140,
    y: 1200,
    width: 520,
    height: 380,
    labelX: -220,
    labelY: -138,
  },
  {
    id: "local",
    title: "Local / Open Source",
    subtitle: "Self-hosted infrastructure",
    accent: "#72ffe5",
    x: 510,
    y: 1240,
    width: 700,
    height: 510,
    labelX: -270,
    labelY: -188,
  },
  {
    id: "media",
    title: "Image / Media",
    subtitle: "Visual and multimodal AI",
    accent: "#9f94ff",
    x: 1530,
    y: 1200,
    width: 780,
    height: 520,
    labelX: -280,
    labelY: -182,
  },
  {
    id: "voice",
    title: "Voice / Audio",
    subtitle: "Speech, meetings, and audio AI",
    accent: "#8db8ff",
    x: 930,
    y: 1390,
    width: 560,
    height: 360,
    labelX: -220,
    labelY: -130,
  },
];

const regionLookup = new Map(desktopUniverseRegions.map((region) => [region.id, region]));

const placeRegionNodes = (regionId, placements, nodes) => {
  const region = regionLookup.get(regionId);
  return nodes.map((node, index) => ({
    regionId,
    x: region.x + placements[index][0],
    y: region.y + placements[index][1],
    ...node,
  }));
};

const llmPlacements = [
  [-240, -130],
  [-120, -240],
  [-70, 40],
  [80, -70],
  [-300, 40],
  [80, -250],
  [-160, 190],
  [120, 150],
  [250, 20],
  [250, -170],
];

const codingPlacements = [
  [-160, -170],
  [120, -175],
  [-280, -40],
  [-70, 15],
  [250, -10],
  [280, 150],
  [-120, 170],
  [70, 170],
];

const researchPlacements = [
  [-140, -70],
  [30, -170],
  [160, 10],
  [-170, 140],
  [40, 160],
  [200, 160],
];

const mediaPlacements = [
  [-250, -100],
  [-70, -180],
  [120, -130],
  [300, -10],
  [-210, 130],
  [20, 170],
  [240, 170],
];

const voicePlacements = [
  [-160, -40],
  [10, -150],
  [160, -10],
  [-80, 120],
  [130, 120],
];

const localPlacements = [
  [-230, -90],
  [-70, -180],
  [90, -40],
  [-260, 130],
  [-40, 120],
  [210, -40],
  [170, 170],
  [-130, 190],
];

const agentsPlacements = [
  [-160, -50],
  [0, -150],
  [150, -30],
  [-90, 120],
  [100, 125],
  [220, 150],
];

const learningPlacements = [
  [-220, -10],
  [-30, -110],
  [-190, 120],
  [20, 120],
  [180, 15],
  [210, -120],
];

export const desktopUniverseNodes = [
  ...placeRegionNodes("llms", llmPlacements, [
    {
      id: "chatgpt",
      name: "ChatGPT",
      type: "Assistant",
      logoKey: "chatgpt",
      importance: 1.52,
      orbStyle: "light",
      description:
        "A flexible multimodal assistant used for writing, planning, coding help, image work, and broad AI workflows.",
      goodFor: "Strong all-around starting point for students mapping modern AI capability.",
      href: "https://openai.com/chatgpt/overview/",
      relatedNodeIds: ["claude", "gemini", "codex-cli", "chatgpt-image", "prompting", "perplexity"],
    },
    {
      id: "gemini",
      name: "Gemini",
      type: "Assistant",
      logoKey: "gemini",
      importance: 1.32,
      orbStyle: "clear",
      description:
        "Google's multimodal assistant ecosystem with strong ties to search, docs, and productivity workflows.",
      goodFor: "Useful when work already lives in Google's ecosystem.",
      href: "https://gemini.google.com/",
      relatedNodeIds: ["gemini-multimodal", "gemini-cli", "notebooklm", "perplexity", "model-selection"],
    },
    {
      id: "claude",
      name: "Claude",
      type: "Assistant",
      logoKey: "claude",
      importance: 1.26,
      orbStyle: "light",
      description:
        "Known for polished long-form responses, careful writing, and strong document-oriented reasoning.",
      goodFor: "Excellent for reading, synthesis, and structured writing tasks.",
      href: "https://www.anthropic.com/claude",
      relatedNodeIds: ["chatgpt", "perplexity", "prompting", "responsible-use"],
    },
    {
      id: "grok",
      name: "Grok",
      type: "Assistant",
      logoKey: "grok",
      importance: 1.08,
      orbStyle: "dark",
      description:
        "An xAI assistant aimed at fast ideation and current-information workflows.",
      goodFor: "Useful for quick exploration and web-aware interaction patterns.",
      href: "https://x.ai/grok",
      relatedNodeIds: ["chatgpt", "perplexity", "qwen", "deepseek"],
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      type: "Reasoning Model",
      logoKey: "deepseek",
      importance: 1.18,
      orbStyle: "light",
      description:
        "A fast-rising model ecosystem known for strong reasoning visibility and price-performance attention.",
      goodFor: "Useful for comparing reasoning-focused model behavior and market shifts.",
      href: "https://www.deepseek.com/",
      relatedNodeIds: ["qwen", "kimi", "minimax", "llama-cpp", "model-selection"],
    },
    {
      id: "qwen",
      name: "Qwen",
      type: "Assistant",
      logoKey: "qwen",
      importance: 1.1,
      orbStyle: "light",
      description:
        "A major frontier model family and chat surface for broader ecosystem comparison.",
      goodFor: "Good for exploring model variety beyond the most common defaults.",
      href: "https://qwen.ai/",
      relatedNodeIds: ["deepseek", "grok", "model-selection", "le-chat"],
    },
    {
      id: "kimi",
      name: "Kimi",
      type: "Assistant",
      logoKey: "kimi",
      importance: 0.98,
      orbStyle: "light",
      description:
        "Moonshot AI's assistant platform focused on broader consumer and productivity-facing AI usage.",
      goodFor: "Useful when comparing fast-moving international assistant ecosystems beyond the default western tools.",
      href: "https://kimi.com/",
      relatedNodeIds: ["deepseek", "minimax", "chatgpt"],
    },
    {
      id: "minimax",
      name: "MiniMax",
      type: "Assistant / Agent Platform",
      logoKey: "minimax",
      importance: 0.96,
      orbStyle: "light",
      description:
        "A multimodal AI company offering assistant, coding, media, and agent-oriented products.",
      goodFor: "Useful for seeing how model platforms increasingly span assistant, coding, and media workflows together.",
      href: "https://www.minimax.io/",
      relatedNodeIds: ["deepseek", "kimi", "runway", "cursor", "midjourney"],
    },
    {
      id: "le-chat",
      name: "Le Chat",
      type: "Assistant",
      logoKey: "leChat",
      importance: 0.98,
      orbStyle: "light",
      description:
        "Mistral's assistant experience for quick prompting, general use, and ecosystem comparison.",
      goodFor: "Helpful for seeing how another frontier model provider packages chat workflows.",
      href: "https://chat.mistral.ai/",
      relatedNodeIds: ["qwen", "deepseek", "poe", "model-selection"],
    },
    {
      id: "poe",
      name: "Poe",
      type: "Multi-Model Hub",
      logoKey: "poe",
      importance: 0.92,
      orbStyle: "dark",
      description:
        "A multi-model chat hub that exposes many model providers inside one interface.",
      goodFor: "Useful when students want to compare assistant styles without switching products constantly.",
      href: "https://poe.com/",
      relatedNodeIds: ["chatgpt", "claude", "gemini", "le-chat"],
    },
  ]),
  ...placeRegionNodes("coding", codingPlacements, [
    {
      id: "cursor",
      name: "Cursor",
      type: "AI IDE",
      logoKey: "cursor",
      importance: 1.36,
      orbStyle: "dark",
      description:
        "An AI-first code editor for file-aware Q&A, generation, refactors, and high-velocity development.",
      goodFor: "Strong for editor-centric coding and rapid iteration.",
      href: "https://www.cursor.com/",
      relatedNodeIds: ["github-copilot", "codex-cli", "windsurf", "continue"],
    },
    {
      id: "github-copilot",
      name: "GitHub Copilot",
      type: "Coding Assistant",
      logoKey: "githubCopilot",
      importance: 1.24,
      orbStyle: "dark",
      description:
        "GitHub's AI coding assistant for completions, chat, and repository-aware development workflows.",
      goodFor: "Useful when coding already lives in GitHub, VS Code, or JetBrains tooling.",
      href: "https://github.com/features/copilot",
      relatedNodeIds: ["cursor", "codex-cli", "windsurf", "replit-agent"],
    },
    {
      id: "codex-cli",
      name: "Codex CLI",
      type: "Terminal Agent",
      logoKey: "chatgpt",
      importance: 1.14,
      orbStyle: "light",
      description:
        "A terminal-native coding agent built for repository navigation, edits, reviews, and local engineering tasks.",
      goodFor: "Best when you want AI working inside an actual repo workflow.",
      href: "https://github.com/openai/codex",
      relatedNodeIds: ["chatgpt", "cursor", "github-copilot", "aider"],
    },
    {
      id: "gemini-cli",
      name: "Gemini CLI",
      type: "CLI",
      logoKey: "googleGeminiCli",
      importance: 1.02,
      orbStyle: "light",
      description:
        "Google's open-source command-line agent for code, research-grounded tasks, and developer automation.",
      goodFor: "Useful for comparing terminal-agent workflows.",
      href: "https://github.com/google-gemini/gemini-cli",
      relatedNodeIds: ["gemini", "codex-cli", "cursor", "notebooklm"],
    },
    {
      id: "windsurf",
      name: "Windsurf",
      type: "AI IDE",
      logoKey: "windsurf",
      importance: 1.08,
      orbStyle: "light",
      description:
        "A coding environment focused on paired AI editing, chat, and agent-style development loops.",
      goodFor: "Useful for comparing AI IDE behaviors against Cursor and Copilot-centered setups.",
      href: "https://windsurf.com/editor",
      relatedNodeIds: ["cursor", "github-copilot", "continue"],
    },
    {
      id: "replit-agent",
      name: "Replit Agent",
      type: "Build Agent",
      logoKey: "replit",
      importance: 1.02,
      orbStyle: "light",
      description:
        "Replit's AI-assisted build environment for generating, iterating, and deploying apps from a browser workspace.",
      goodFor: "Useful for students exploring rapid build loops without a full local setup.",
      href: "https://replit.com/ai",
      relatedNodeIds: ["github-copilot", "cursor", "n8n"],
    },
    {
      id: "aider",
      name: "Aider",
      type: "Code Pairing",
      logoKey: "aider",
      importance: 0.94,
      orbStyle: "light",
      description:
        "An open-source terminal coding assistant focused on editing real repositories through chat-driven workflows.",
      goodFor: "Strong for comparing lightweight repo-native coding assistants.",
      href: "https://aider.chat/",
      relatedNodeIds: ["codex-cli", "continue", "llama-cpp"],
    },
    {
      id: "continue",
      name: "Continue",
      type: "Open IDE Assistant",
      logoKey: "continue",
      importance: 0.92,
      orbStyle: "light",
      description:
        "An open-source coding assistant that plugs into editors and local model stacks.",
      goodFor: "Useful when students want editor-native AI help with more open customization.",
      href: "https://continue.dev/",
      relatedNodeIds: ["cursor", "windsurf", "ollama", "open-webui"],
    },
  ]),
  ...placeRegionNodes("research", researchPlacements, [
    {
      id: "perplexity",
      name: "Perplexity",
      type: "Research Engine",
      logoKey: "perplexity",
      importance: 1.28,
      orbStyle: "dark",
      description:
        "A source-linked answer engine that blends AI responses with citations and rapid follow-up exploration.",
      goodFor: "Fast research with visible sources and quick drilldown.",
      href: "https://www.perplexity.ai/",
      relatedNodeIds: ["chatgpt", "claude", "gemini", "notebooklm", "consensus"],
    },
    {
      id: "notebooklm",
      name: "NotebookLM",
      type: "Notebook",
      logoKey: "notebooklm",
      importance: 1.2,
      orbStyle: "light",
      description:
        "A notebook-style assistant for working from uploaded material and source-bounded study sets.",
      goodFor: "Useful for reading packs, notes, and source-specific study sessions.",
      href: "https://notebooklm.google.com/",
      relatedNodeIds: ["gemini", "perplexity", "elicit", "responsible-use"],
    },
    {
      id: "elicit",
      name: "Elicit",
      type: "Research Assistant",
      logoKey: "elicit",
      importance: 0.98,
      orbStyle: "light",
      description:
        "A research workflow assistant built around paper discovery, evidence synthesis, and literature review tasks.",
      goodFor: "Strong when students need paper search and structured evidence gathering.",
      href: "https://elicit.com/",
      relatedNodeIds: ["perplexity", "consensus", "semantic-scholar", "prompting"],
    },
    {
      id: "consensus",
      name: "Consensus",
      type: "Evidence Search",
      logoKey: "consensus",
      importance: 0.96,
      orbStyle: "light",
      description:
        "A research tool centered on surfacing evidence-backed answers from scholarly material.",
      goodFor: "Useful for fast literature checks and question-first evidence review.",
      href: "https://consensus.app/",
      relatedNodeIds: ["perplexity", "elicit", "scite", "semantic-scholar"],
    },
    {
      id: "scite",
      name: "scite",
      type: "Citation Intelligence",
      logoKey: "scite",
      importance: 0.92,
      orbStyle: "light",
      description:
        "A research platform focused on citation context, smart citations, and paper credibility signals.",
      goodFor: "Useful when students need deeper paper validation beyond surface summaries.",
      href: "https://scite.ai/",
      relatedNodeIds: ["consensus", "semantic-scholar", "responsible-use"],
    },
    {
      id: "semantic-scholar",
      name: "Semantic Scholar",
      type: "Paper Discovery",
      logoKey: "semanticScholar",
      importance: 0.94,
      orbStyle: "light",
      description:
        "A scholarly search engine focused on paper discovery, citations, and structured academic browsing.",
      goodFor: "Helpful for broad academic search when students need raw paper access.",
      href: "https://www.semanticscholar.org/",
      relatedNodeIds: ["elicit", "consensus", "scite"],
    },
  ]),
  ...placeRegionNodes("media", mediaPlacements, [
    {
      id: "chatgpt-image",
      name: "ChatGPT Image",
      type: "Generation",
      logoKey: "chatgpt",
      importance: 1.08,
      orbStyle: "light",
      description:
        "Prompt-driven image generation for explainers, mockups, visual concepting, and presentation assets.",
      goodFor: "Fast visual ideation without leaving the main assistant workflow.",
      href: "https://openai.com/chatgpt/overview/",
      relatedNodeIds: ["chatgpt", "runway", "gemini-multimodal", "midjourney"],
    },
    {
      id: "gemini-multimodal",
      name: "Gemini Multimodal",
      type: "Multimodal",
      logoKey: "gemini",
      importance: 1.04,
      orbStyle: "clear",
      description:
        "A multimodal environment for working across text, images, and media-aware tasks.",
      goodFor: "Useful when one workflow needs both language and visual reasoning.",
      href: "https://gemini.google.com/",
      relatedNodeIds: ["gemini", "chatgpt-image", "runway", "notebooklm"],
    },
    {
      id: "runway",
      name: "Runway",
      type: "Media Studio",
      logoKey: "runway",
      importance: 1.12,
      orbStyle: "light",
      description:
        "A creative AI studio focused on image, video, and production-oriented generative media workflows.",
      goodFor: "Useful when visual ideation needs to move into motion, storyboards, or production.",
      href: "https://runwayml.com/",
      relatedNodeIds: ["chatgpt-image", "midjourney", "pika", "heygen"],
    },
    {
      id: "midjourney",
      name: "Midjourney",
      type: "Image Generation",
      logoKey: "midjourney",
      importance: 1.1,
      orbStyle: "light",
      description:
        "A major image-generation platform widely used for concept art, mood boards, and style exploration.",
      goodFor: "Useful for high-impact visual exploration and aesthetic reference work.",
      href: "https://www.midjourney.com/",
      relatedNodeIds: ["runway", "leonardo", "chatgpt-image"],
    },
    {
      id: "leonardo",
      name: "Leonardo AI",
      type: "Image Studio",
      logoKey: "leonardo",
      importance: 0.96,
      orbStyle: "light",
      description:
        "A visual generation platform built for concept art, assets, and creative iteration workflows.",
      goodFor: "Useful when students want another production-oriented image platform to compare.",
      href: "https://leonardo.ai/",
      relatedNodeIds: ["midjourney", "runway", "pika"],
    },
    {
      id: "pika",
      name: "Pika",
      type: "Video Generation",
      logoKey: "pika",
      importance: 0.94,
      orbStyle: "light",
      description:
        "A generative video tool aimed at short-form motion creation and visual experimentation.",
      goodFor: "Useful when students want to test quick prompt-to-video workflows.",
      href: "https://pika.art/",
      relatedNodeIds: ["runway", "heygen", "midjourney"],
    },
    {
      id: "heygen",
      name: "HeyGen",
      type: "Avatar Video",
      logoKey: "heygen",
      importance: 0.96,
      orbStyle: "light",
      description:
        "An AI video platform for avatars, translated presentations, and polished talking-head style output.",
      goodFor: "Useful when a presentation or explain-it video needs quick polished output.",
      href: "https://www.heygen.com/",
      relatedNodeIds: ["runway", "pika", "elevenlabs"],
    },
  ]),
  ...placeRegionNodes("voice", voicePlacements, [
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      type: "Voice Generation",
      logoKey: "elevenlabs",
      importance: 1.06,
      orbStyle: "dark",
      description:
        "A voice platform focused on speech generation, dubbing, and voice-centric AI applications.",
      goodFor: "Useful when students need high-quality synthetic speech or voice workflows.",
      href: "https://elevenlabs.io/",
      relatedNodeIds: ["heygen", "suno", "descript"],
    },
    {
      id: "suno",
      name: "Suno",
      type: "Music Generation",
      logoKey: "suno",
      importance: 1,
      orbStyle: "light",
      description:
        "A music-generation product focused on turning prompts into songs and audio concepts.",
      goodFor: "Useful for understanding how generative AI extends into music and sound design.",
      href: "https://suno.com/",
      relatedNodeIds: ["elevenlabs", "descript", "pika"],
    },
    {
      id: "descript",
      name: "Descript",
      type: "Audio / Video Editing",
      logoKey: "descript",
      importance: 0.98,
      orbStyle: "light",
      description:
        "A media editing platform with transcription, overdub, and AI-assisted production features.",
      goodFor: "Useful when editing, transcription, and publishing need to happen in one workflow.",
      href: "https://www.descript.com/",
      relatedNodeIds: ["elevenlabs", "fireflies", "otter"],
    },
    {
      id: "otter",
      name: "Otter",
      type: "Meeting Notes",
      logoKey: "otter",
      importance: 0.94,
      orbStyle: "light",
      description:
        "A meeting transcription and notes product aimed at capturing conversations and summaries.",
      goodFor: "Useful for comparing practical meeting-note AI tools.",
      href: "https://otter.ai/",
      relatedNodeIds: ["fireflies", "descript", "notebooklm"],
    },
    {
      id: "fireflies",
      name: "Fireflies",
      type: "Meeting Assistant",
      logoKey: "fireflies",
      importance: 0.92,
      orbStyle: "light",
      description:
        "A meeting AI assistant focused on recording, transcription, summaries, and workflow follow-up.",
      goodFor: "Useful for understanding how AI is applied to meeting-heavy environments.",
      href: "https://fireflies.ai/",
      relatedNodeIds: ["otter", "descript", "n8n"],
    },
  ]),
  ...placeRegionNodes("local", localPlacements, [
    {
      id: "ollama",
      name: "Ollama",
      type: "Runtime",
      logoKey: "ollama",
      importance: 1.12,
      orbStyle: "light",
      description:
        "A simple local-model runtime that makes downloading and running models much easier on personal systems.",
      goodFor: "Fastest on-ramp for local model experimentation.",
      href: "https://ollama.com/",
      relatedNodeIds: ["open-webui", "lm-studio", "llama-cpp", "continue"],
    },
    {
      id: "lm-studio",
      name: "LM Studio",
      type: "Desktop Runtime",
      logoKey: "lmStudio",
      importance: 1.06,
      orbStyle: "light",
      description:
        "A desktop application for discovering, downloading, and running local models with a polished workflow.",
      goodFor: "Good for students who want a simpler desktop path into local model use.",
      href: "https://lmstudio.ai/",
      relatedNodeIds: ["ollama", "llama-cpp", "open-webui", "jan"],
    },
    {
      id: "open-webui",
      name: "Open WebUI",
      type: "Interface",
      logoKey: "openwebui",
      importance: 1,
      orbStyle: "clear",
      description:
        "A self-hosted chat interface that sits on top of local runtimes and model-serving backends.",
      goodFor: "Useful when you want a clean front-end over local AI infrastructure.",
      href: "https://openwebui.com/",
      relatedNodeIds: ["ollama", "llama-cpp", "lm-studio", "hugging-face"],
    },
    {
      id: "llama-cpp",
      name: "llama.cpp",
      type: "Inference",
      logoKey: "ggml",
      importance: 0.98,
      orbStyle: "light",
      description:
        "A lightweight and portable inference project for quantized models on consumer hardware.",
      goodFor: "Important when performance, portability, and lower-level control matter.",
      href: "https://github.com/ggml-org/llama.cpp",
      relatedNodeIds: ["ollama", "lm-studio", "deepseek", "vllm"],
    },
    {
      id: "hugging-face",
      name: "Hugging Face",
      type: "Model Hub",
      logoKey: "huggingFace",
      importance: 1.02,
      orbStyle: "light",
      description:
        "A major platform for model distribution, demos, datasets, and open-source AI sharing.",
      goodFor: "Useful when students need to discover models and understand the open ecosystem.",
      href: "https://huggingface.co/",
      relatedNodeIds: ["open-webui", "comfyui", "vllm", "ollama"],
    },
    {
      id: "comfyui",
      name: "ComfyUI",
      type: "Visual Pipeline",
      logoKey: "comfyui",
      importance: 0.94,
      orbStyle: "light",
      description:
        "A node-based interface for building and experimenting with generative image workflows locally.",
      goodFor: "Useful for understanding graph-based local media pipelines.",
      href: "https://www.comfy.org/",
      relatedNodeIds: ["hugging-face", "runway", "leonardo"],
    },
    {
      id: "jan",
      name: "Jan",
      type: "Local Assistant",
      logoKey: "jan",
      importance: 0.9,
      orbStyle: "light",
      description:
        "A local-first AI application aimed at making personal model use more approachable.",
      goodFor: "Useful for comparing different local desktop AI experiences.",
      href: "https://jan.ai/",
      relatedNodeIds: ["lm-studio", "ollama", "open-webui"],
    },
    {
      id: "vllm",
      name: "vLLM",
      type: "Serving Engine",
      logoKey: "vllm",
      importance: 0.92,
      orbStyle: "light",
      description:
        "A serving engine focused on efficient inference and high-throughput model deployment.",
      goodFor: "Useful when students want to see the infrastructure layer beyond consumer apps.",
      href: "https://vllm.ai/",
      relatedNodeIds: ["llama-cpp", "hugging-face", "autogen"],
    },
  ]),
  ...placeRegionNodes("agents", agentsPlacements, [
    {
      id: "n8n",
      name: "n8n",
      type: "Workflow Automation",
      logoKey: "n8n",
      importance: 1.02,
      orbStyle: "light",
      description:
        "An automation platform for building AI-connected workflows, routing, and integrations.",
      goodFor: "Useful when students want practical agent workflows tied to real systems.",
      href: "https://n8n.io/",
      relatedNodeIds: ["zapier", "make", "fireflies", "replit-agent"],
    },
    {
      id: "zapier",
      name: "Zapier",
      type: "Automation",
      logoKey: "zapier",
      importance: 0.98,
      orbStyle: "light",
      description:
        "A workflow automation platform increasingly exposing AI-powered actions and agents.",
      goodFor: "Useful for understanding AI automation inside common business tooling.",
      href: "https://zapier.com/",
      relatedNodeIds: ["n8n", "make", "langchain"],
    },
    {
      id: "make",
      name: "Make",
      type: "Automation",
      logoKey: "make",
      importance: 0.96,
      orbStyle: "light",
      description:
        "A visual automation platform for orchestrating data movement, app logic, and AI-connected flows.",
      goodFor: "Useful for comparing automation-first interfaces against agent frameworks.",
      href: "https://www.make.com/",
      relatedNodeIds: ["n8n", "zapier", "crewai"],
    },
    {
      id: "crewai",
      name: "CrewAI",
      type: "Agent Framework",
      logoKey: "crewai",
      importance: 0.94,
      orbStyle: "light",
      description:
        "An agent framework centered on multi-agent roles, tasks, and orchestration patterns.",
      goodFor: "Useful when students want to understand coordinated agent systems.",
      href: "https://www.crewai.com/",
      relatedNodeIds: ["langchain", "autogen", "n8n"],
    },
    {
      id: "langchain",
      name: "LangChain",
      type: "Application Framework",
      logoKey: "langchain",
      importance: 0.98,
      orbStyle: "light",
      description:
        "A framework ecosystem for building LLM-powered applications, chains, and agentic workflows.",
      goodFor: "Useful for understanding the software layer behind many custom AI applications.",
      href: "https://www.langchain.com/",
      relatedNodeIds: ["crewai", "autogen", "n8n", "vllm"],
    },
    {
      id: "autogen",
      name: "AutoGen",
      type: "Agent Framework",
      logoKey: "autogen",
      importance: 0.92,
      orbStyle: "light",
      description:
        "Microsoft's framework for building conversational multi-agent systems and tool-using workflows.",
      goodFor: "Useful for understanding another major agent-architecture approach.",
      href: "https://www.microsoft.com/en-us/research/project/autogen/",
      relatedNodeIds: ["crewai", "langchain", "vllm"],
    },
  ]),
  ...placeRegionNodes("learning", learningPlacements, [
    {
      id: "prompting",
      name: "Prompting",
      type: "Practice",
      logoKey: "prompting",
      importance: 1.02,
      orbStyle: "light",
      description:
        "Prompt design shapes quality, specificity, and reliability more than most beginners expect.",
      goodFor: "High-return skill for nearly every AI workflow.",
      href: "https://platform.openai.com/docs/guides/prompt-engineering",
      relatedNodeIds: ["chatgpt", "claude", "elicit", "best-practices", "evaluation"],
    },
    {
      id: "model-selection",
      name: "Model Selection",
      type: "Practice",
      logoKey: "models",
      importance: 0.98,
      orbStyle: "light",
      description:
        "Different models excel at different jobs: code, speed, multimodal work, cost efficiency, or long context.",
      goodFor: "Prevents defaulting to one tool for every mission.",
      href: "https://platform.openai.com/docs/models",
      relatedNodeIds: ["qwen", "deepseek", "minimax", "best-practices", "poe"],
    },
    {
      id: "responsible-use",
      name: "Responsible Use",
      type: "Practice",
      logoKey: "responsible",
      importance: 0.96,
      orbStyle: "light",
      description:
        "Understanding risk, trust, and validation helps students use AI effectively without over-trusting it.",
      goodFor: "Critical for sound judgment and operational discipline.",
      href: "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook",
      relatedNodeIds: ["notebooklm", "claude", "best-practices", "evaluation"],
    },
    {
      id: "best-practices",
      name: "Best Practices",
      type: "Practice",
      logoKey: "bestPractices",
      importance: 0.94,
      orbStyle: "light",
      description:
        "Operational habits like source checks, task-tool matching, and iteration discipline make AI use more reliable.",
      goodFor: "Turns experimentation into repeatable workflow competence.",
      href: "https://platform.openai.com/docs/guides/prompt-engineering",
      relatedNodeIds: ["prompting", "model-selection", "github-copilot", "responsible-use"],
    },
    {
      id: "evaluation",
      name: "Evaluation",
      type: "Practice",
      logoKey: "evaluation",
      importance: 0.92,
      orbStyle: "light",
      description:
        "Evaluating outputs deliberately helps students compare systems, test prompts, and measure whether AI actually helped.",
      goodFor: "Useful when moving from novelty into reliable workflow design.",
      href: "https://platform.openai.com/docs/guides/evals",
      relatedNodeIds: ["prompting", "responsible-use", "verification"],
    },
    {
      id: "verification",
      name: "Verification",
      type: "Practice",
      logoKey: "verification",
      importance: 0.9,
      orbStyle: "light",
      description:
        "Source checks, cross-tool comparison, and evidence review are what keep AI use grounded.",
      goodFor: "Useful for building the habit of checking outputs before acting on them.",
      href: "https://www.nist.gov/artificial-intelligence",
      relatedNodeIds: ["evaluation", "perplexity", "consensus", "scite"],
    },
  ]),
];

const directorySectionCopy = {
  learning:
    "Foundational practices, evaluation habits, and operating knowledge that improve judgment across every other AI workflow.",
  llms:
    "Mainstream assistants and model ecosystems used for drafting, reasoning, planning, and general-purpose AI work.",
  coding:
    "AI-native editors, coding assistants, and terminal agents that accelerate software workflows.",
  research:
    "Source-grounded research systems, paper discovery tools, and notebook-style knowledge workflows.",
  agents:
    "Automation and orchestration platforms for chaining tools, tasks, and AI-assisted workflows together.",
  local:
    "Self-hosted runtimes, open-source interfaces, and local infrastructure for running models closer to the user.",
  media:
    "Image, video, and multimodal tools for visual ideation, generation, editing, and media production.",
  voice:
    "Speech, meeting, transcription, and audio-generation systems for voice-first AI workflows.",
};

export const directorySections = desktopUniverseRegions.map((region) => {
  const items = desktopUniverseNodes.filter((node) => node.regionId === region.id);

  return {
    id: region.id,
    title: region.title,
    subtitle: region.subtitle,
    description: directorySectionCopy[region.id] ?? region.subtitle,
    accent: region.accent,
    count: items.length,
  };
});

export const directoryItems = [...desktopUniverseNodes]
  .map((node) => ({
    ...node,
    categoryId: node.regionId,
    categoryTitle: regionLookup.get(node.regionId)?.title ?? node.regionId,
    officialLink: node.href,
    featured: (node.importance ?? 1) >= 1.18,
    tags: [node.type, regionLookup.get(node.regionId)?.title].filter(Boolean),
  }))
  .sort((left, right) => {
    const importanceDelta = (right.importance ?? 1) - (left.importance ?? 1);
    if (importanceDelta !== 0) {
      return importanceDelta;
    }

    return left.name.localeCompare(right.name);
  });

export const featuredDirectoryItems = directoryItems.filter((item) => item.featured);

export const directoryStats = {
  totalItems: directoryItems.length,
  totalCategories: directorySections.length,
  featuredItems: featuredDirectoryItems.length,
};
