# Logo Sources

Local logo files in this directory are used to avoid fragile remote hotlinks in production.

The canonical structured manifest is `scripts/data/logo-sources.js`. This file is a quick human-readable summary of the current local asset strategy.

## Current Local Image Assets

- `openai-badge.svg`: `https://github.com/openai.png?size=200`
- `gemini-badge.svg`: `https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg`
- `claude-badge.svg`: `https://www.anthropic.com/favicon.ico`
- `grok-badge.svg`: `https://x.ai/favicon.ico`
- `qwen-badge.svg`: `https://g.alicdn.com/qwenweb/qwen-ai-fe/0.0.4/favicon.ico`
- `deepseek.ico`: `https://www.deepseek.com/favicon.ico`
- `kimi.ico`: `https://www.kimi.com/favicon.ico`
- `minimax.ico`: `https://www.minimax.io/favicon.ico`
- `le-chat.ico`: `https://mistral.ai/favicon.ico`
- `poe.png`: `https://psc2.cf2.poecdn.net/assets/apple-touch-icon.png`
- `perplexity-badge.svg`: `https://www.perplexity.ai/favicon.ico`
- `cursor.png`: `https://cursor.com/marketing-static/icon-192x192.png`
- `ollama.png`: `https://ollama.com/public/icon-64x64.png`
- `openwebui.png`: `https://openwebui.com/logo.png`
- `ggml-org.png`: `https://github.com/ggml-org.png?size=200`
- `google-gemini.png`: `https://github.com/google-gemini.png?size=200`
- `google.png`: `https://blog.google/static/blogv2/images/google-1000x1000.png?version=pr20260219-1731`
- `github.svg`: `https://github.githubassets.com/favicons/favicon.svg`
- `elicit.png`: `https://framerusercontent.com/images/GWXKVhGBLC34aTLlmLIMsRVb4.png`
- `runway.png`: `https://runwayml.com/icon.png?icon.8128ee70.png`
- `lmstudio.ico`: `https://lmstudio.ai/favicon.ico`
- `windsurf.svg`: `https://windsurf.com/favicon.svg`
- `replit.png`: `https://cdn.replit.com/dotcom/favicon-196.png`
- `aider.png`: `https://github.com/Aider-AI.png?size=200`
- `continue.png`: `https://www.continue.dev/favicon.png`
- `consensus.png`: `https://framerusercontent.com/images/LDoQQ5WRIW2qGgO5NYEokWPffIk.png`
- `scite.svg`: `https://cdn.scite.ai/assets/images/logo-blue.svg`
- `semantic-scholar.png`: `https://cdn.semanticscholar.org/00dc9154a94e758e/img/apple-touch-icon-57x57.png`
- `pika.ico`: `https://pika.art/favicon.ico?favicon.3e7abfbd.ico`
- `heygen.ico`: `https://www.heygen.com/favicon.ico`
- `elevenlabs.ico`: `https://elevenlabs.io/favicon.ico`
- `suno.png`: `https://cdn-o.suno.com/apple-touch-icon.png`
- `descript.png`: `https://static-cdn.descript.com/web/icons/apple-touch-icon.png`
- `otter.png`: `https://cdn.prod.website-files.com/618e9316785b3582a5178502/618e94bcbca88b51e2ad81f7_favicon.png`
- `fireflies.ico`: `https://fireflies.ai/favicon.ico?22cbfa51f42d5e95`
- `hugging-face.ico`: `https://huggingface.co/favicon.ico`
- `comfyui.png`: `https://framerusercontent.com/images/VYwSRlkOR01d0rBJ6hcCnzXNBc.png`
- `jan.ico`: `https://www.jan.ai/favicon.ico`
- `vllm.svg`: `https://vllm.ai/vLLM-Logo.svg`
- `n8n.ico`: `https://n8n.io/favicon.ico`
- `zapier.png`: `https://zapier.com/l/favicon-180.png`
- `make.ico`: `https://www.make.com/favicon.ico`
- `crewai.png`: `https://cdn.prod.website-files.com/69a111972d2e0bbcc6adb934/69a111972d2e0bbcc6adbab3_66e1e4b0efcc40f3abe63988_32x32.png`
- `langchain.png`: `https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69a17e4a429d54e956e2a763_favicon.png`

## Remaining Intentional Fallbacks

The following still use non-image fallback treatment in `scripts/data/logo-sources.js` because a clean reliable official/public transparent mark was not readily obtainable during this pass or because the item is a non-brand concept:

- `NotebookLM`
- `Leonardo AI`
- `Midjourney`
- `AutoGen`
- `Prompting`
- `Model Selection`
- `Responsible Use`
- `Best Practices`
- `Evaluation`
- `Verification`

Future sessions should prefer replacing those with local official/public transparent assets only if the source is reliable enough for production.
