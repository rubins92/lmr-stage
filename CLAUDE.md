# Agent instructions — Lumir landing staging

Read this first. Then read `.claude/CLAUDE.md` for project conventions.

## What this repo is

Staging of the **lumir.photo** marketing landing. Single-file site: `index.html` + assets in root.

Stack: plain HTML + Tailwind via CDN + vanilla JS inline. **No build, no npm, no framework.**

## Run preview

```bash
npx serve .
```

Open `http://localhost:3000`. Reload page after edits.

## Make changes

Edit `index.html` directly. Don't refactor structure unless asked.

```bash
git add -A
git commit -m "<concise change description>"
git push origin main
```

**Push directly to `main`** — no PR flow on this repo. Sergei reviews via GitHub commits, deploys to prod manually.

## Hard constraints

- **Russian-language UI only.** Никаких английских строк в видимом тексте.
- **No build tooling.** Don't propose webpack/vite/npm/postcss/SCSS/React/Vue/TypeScript.
- **Don't move assets.** All stay in repo root (`og-image.jpg`, `placeholder-*.mp4`, `assets/*`).
- **Don't push files >20 MB.** GitHub rejects them.
- **Don't delete sections** without explicit user instruction.
- **Don't touch analytics.** OpenPanel + Yandex Metrika scripts are pre-configured in `<head>`. Staging has `window.ANALYTICS_ENABLED = false` (line ~7) — leave as-is. Production deploy flips this via `_PROJECTS/_LANDING/deploy.sh`.

## Brand voice (короткая версия)

- Прямой, разговорный тон. На «ты».
- Без буллшита: «революционный», «инновационный», «уникальный» — вырезать.
- Конкретика > обещания.
- Аудитория — школьные фотографы в России.

## Definition of done

Before commit, verify:
1. `npx serve .` opens locally, no console errors
2. Mobile readable at ~375px width (DevTools device emulation)
3. All CTA links resolve, no `href="#"` placeholders
4. Videos/images load (referenced files exist)

## If unsure

Ask Sergei. Don't guess brand voice or technical decisions.

## Related context

- `README.md` — same info for human contributors
- `.claude/CLAUDE.md` — additional project rules
- Linear tickets: https://linear.app/lumir (issue refs in commits)
