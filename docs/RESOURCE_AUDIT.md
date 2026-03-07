# Resource Audit

This file records the current outbound resources and brand-asset decisions for the Det 105 AI directory homepage.

## What Was Audited In This Pass

- Tool names and categories in `scripts/data/universe.js`
- Outbound links for the live directory items
- Local logo source metadata in `scripts/data/logo-sources.js`
- The current fallback strategy for items without a clean public mark

## Link Strategy

- Prefer official product or company pages.
- Prefer official docs or official product entry pages for fundamentals/resources.
- Avoid placeholders and concept-only entries on the live homepage.

## Current Verified Live Resources

- `ChatGPT`: `https://openai.com/chatgpt/overview/`
- `Gemini`: `https://gemini.google.com/`
- `Claude`: `https://www.anthropic.com/claude`
- `Grok`: `https://x.ai/grok`
- `Qwen`: `https://qwen.ai/`
- `DeepSeek`: `https://www.deepseek.com/`
- `Kimi`: `https://kimi.com/`
- `MiniMax`: `https://www.minimax.io/`
- `Codex CLI`: `https://github.com/openai/codex`
- `Cursor`: `https://www.cursor.com/`
- `Gemini CLI`: `https://github.com/google-gemini/gemini-cli`
- `GitHub Copilot`: `https://github.com/features/copilot`
- `Perplexity`: `https://www.perplexity.ai/`
- `NotebookLM`: `https://notebooklm.google.com/`
- `Elicit`: `https://elicit.com/`
- `Runway`: `https://runwayml.com/`
- `Ollama`: `https://ollama.com/`
- `llama.cpp`: `https://github.com/ggml-org/llama.cpp`
- `Open WebUI`: `https://openwebui.com/`
- `LM Studio`: `https://lmstudio.ai/`
- `Prompting`: `https://platform.openai.com/docs/guides/prompt-engineering`
- `Model Selection`: `https://platform.openai.com/docs/models`
- `Responsible Use`: `https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook`
- `Best Practices`: `https://platform.openai.com/docs/guides/prompt-engineering`

## Current Asset Notes

- The live card system now uses local image assets for most product items under `assets/logos/`.
- The current live directory split is:
  - `46` live items using image logos
  - `10` live items still using fallback treatment
- Remaining fallbacks are currently:
  - `NotebookLM`
  - `Midjourney`
  - `Leonardo AI`
  - `AutoGen`
  - the non-brand fundamentals entries such as `Prompting` and `Verification`
- The canonical asset/source manifest is now `scripts/data/logo-sources.js`, with a human-readable summary in `assets/logos/SOURCES.md`.
- The six galaxy visuals in `assets/galaxies/` are legacy custom SVGs from an older map-oriented UI direction and are not part of the current live homepage.

## Known Follow-Up Checks

- Recheck outbound resource accuracy periodically; product URLs and branding can change.
- If cleaner official/public transparent marks become available, prioritize replacing:
  - `NotebookLM`
  - `Leonardo AI`
  - `Midjourney`
  - `AutoGen`
- Real-device review is still warranted for how outbound-link cards feel inside the current mobile detail sheet.
