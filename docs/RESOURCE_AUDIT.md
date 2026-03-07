# Resource Audit

This file records the current outbound resources and brand-asset decisions for the Det 105 AI universe homepage.

## What Was Audited In This Pass

- Tool names and categories in `scripts/data/universe.js`
- Outbound links for the live galaxy/tool nodes
- Local logo source metadata in `scripts/data/logo-sources.js`
- The current fallback strategy for tools without a clean public mark

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

- Most brand marks now use local files under `assets/logos/`.
- Newly added local assets in this pass:
  - `github.svg`
  - `elicit.ico`
  - `runway.ico`
  - `lmstudio.ico`
- The six galaxy visuals in `assets/galaxies/` are custom local SVGs created for this site's command-cosmos design system.
- `NotebookLM` still uses a monogram fallback because a stable public product mark was not reliably exposed during this pass.

## Known Follow-Up Checks

- Recheck outbound resource accuracy periodically; product URLs and branding can change.
- If a cleaner official NotebookLM mark becomes available, replace the monogram fallback.
- Real-device review is still warranted for how outbound-link cards feel inside the current mobile detail sheet.
