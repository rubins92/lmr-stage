# Lumir Landing — Staging

Стейджинг лендинга **lumir.photo**. Совместная редактура командой.

## Стек

- Один файл `index.html` — вся страница
- **Tailwind CSS через CDN** (никакой сборки, никакого npm/yarn)
- Ванильный JavaScript inline в `<script>` тегах
- Ассеты в корне папки (PNG, SVG, MP4)

**Не предлагай:** webpack, vite, npm install, postcss, build-шаги, фреймворки (React/Vue/Svelte), TypeScript, SCSS/Sass. Это статичный лендинг — править напрямую в HTML.

## Как запустить превью

```bash
npx serve .
```

Открыть `http://localhost:3000`. Перезагрузить страницу после правок.

Альтернатива — VS Code `Live Server` extension (правый клик на `index.html` → Open with Live Server).

## Definition of Done

Перед коммитом проверь:

1. **Превью открывается** локально без ошибок в консоли браузера
2. **Mobile** — сжать окно до ~375px ширины, проверить что всё читается и не ломается
3. **Все ссылки кликаются** (CTA-кнопки, навигация, якоря)
4. **Видео и картинки загружаются** — `<picture>`, `<source>`, `srcset` указывают на существующие файлы
5. **Текст на русском** — никакого английского в видимом UI

## Brand voice (короткая версия)

- Прямой, разговорный тон. На «ты», без «вам/вы»
- Без буллшита: «революционный», «инновационный», «уникальный» — вырезать
- Конкретика > обещания: «загружайте 100 фото за раз», а не «удобная загрузка»
- Целевая аудитория — школьные фотографы и их клиенты в России

## Что НЕ делать

- **Не добавляй npm/build-шаги.** Лендинг — один HTML файл.
- **Не меняй структуру папок.** Все ассеты в корне.
- **Не пушь файлы >20 МБ.** GitHub их не примет, deploy сломается.
- **Не удаляй секции** без явной команды от пользователя.
- **Не трогай аналитику** — `<script>` теги OpenPanel в `<head>` уже настроены. В staging они выключены через `window.ANALYTICS_ENABLED = false` около строки 7 — оставлять как есть. Procedure включения перед прод-деплоем — `_PROJECTS/_LANDING/DEPLOY.md` (раздел «Analytics kill-switch»), enforcement — в `_PROJECTS/_LANDING/deploy.sh`.

## Если что-то непонятно

Спроси пользователя. Не угадывай brand voice или техническое решение — лучше уточнить.

---

## Для maintainer'а (Сергей) — promotion в прод

Этот раздел применим ТОЛЬКО когда сессия запущена локально у Сергея в `_PROJECTS/_LANDING/staging/` (не у коллег — у них нет `production/` рядом).

**GitHub repo:** https://github.com/rubins92/lmr-stage
**Local layout:** `_PROJECTS/_LANDING/staging/` (этот репо) ↔ `_PROJECTS/_LANDING/production/` (deploy-папка)

### Триггер «задеплой лендинг» / «deploy the landing»

```bash
# 1. Подтянуть последние правки коллег
cd "/Users/sergei/Projects/SMM Content/_PROJECTS/_LANDING/staging" && git pull

# 2. Промоушен staging → production (HTML + ассеты, без .git/.claude/README)
cd "/Users/sergei/Projects/SMM Content/_PROJECTS/_LANDING"
rm production/*.html production/*.png production/*.svg production/*.mp4 2>/dev/null || true
cp staging/*.html staging/*.png staging/*.svg staging/*.mp4 production/ 2>/dev/null

# 3. Включить аналитику в production (mandatory — staging держим false, prod true)
sed -i '' 's/window\.ANALYTICS_ENABLED = false/window.ANALYTICS_ENABLED = true/' production/index.html

# 4. Deploy в GitLab (автодеплой на lumir.photo за секунды)
./deploy.sh "promote staging snapshot $(date +%Y-%m-%d)"
```

Полная процедура и rollback — `_PROJECTS/_LANDING/DEPLOY.md`.

### Откат плохого коммита в staging

```bash
cd "/Users/sergei/Projects/SMM Content/_PROJECTS/_LANDING/staging"
git log --oneline -10
git revert <sha>
git push
```

Или через GitHub UI: открыть коммит → кнопка Revert.

### Приглашение коллег

GitHub → https://github.com/rubins92/lmr-stage/settings/access → Add people → **Write** permission.
