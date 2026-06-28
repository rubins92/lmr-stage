# Lumir Landing — Staging

Стейджинг лендинга **lumir.photo**. Совместная редактура командой.

## Стек

- Один файл `index.html` — вся страница
- **Tailwind CSS через CDN** (никакой сборки, никакого npm/yarn)
- Ванильный JavaScript inline в `<script>` тегах
- Ассеты в `assets/` (картинки, видео) и `assets/banners/` (баннеры). `og-image.jpg` — в корне

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
- **Не меняй структуру папок.** Картинки и видео — в `assets/`, баннеры — в `assets/banners/`, `og-image.jpg` — в корне.
- **Не пушь файлы >20 МБ.** GitHub их не примет, deploy сломается.
- **Не удаляй секции** без явной команды от пользователя.
- **Не трогай аналитику** — `<script>` теги OpenPanel в `<head>` уже настроены. В staging они выключены через `window.ANALYTICS_ENABLED = false` около строки 7 — оставлять как есть. Procedure включения перед прод-деплоем — `DEPLOY.md` (раздел «Analytics kill-switch»), enforcement — в `deploy.sh` (оба в корне `Landing Site/`).

## Если что-то непонятно

Спроси пользователя. Не угадывай brand voice или техническое решение — лучше уточнить.

---

## Для maintainer'а (Сергей) — promotion в прод

Этот раздел применим ТОЛЬКО когда сессия запущена локально у Сергея в `Landing Site/staging/` (не у коллег — у них нет `production/` рядом).

**GitHub repo:** https://github.com/rubins92/lmr-stage
**Local layout:** `Landing Site/staging/` (этот репо) ↔ `Landing Site/production/` (deploy-папка)

### Триггер «задеплой лендинг» / «deploy the landing»

```bash
# 1. Подтянуть последние правки коллег
cd "/Users/sergei/Projects/Lumir/Landing Site/staging" && git pull

# 2. Промоушен staging → production + деплой (две команды)
cd "/Users/sergei/Projects/Lumir/Landing Site"
./promote.sh && ./deploy.sh "<commit message>"
```

`promote.sh` делает всё, что раньше был ручной `cp`-сниппет, и чинит то, что
сломалось при переходе staging на вложенную структуру `assets/`:
- копирует ассеты из `staging/assets/` И `staging/assets/banners/` **плоско** в `production/`;
- **выпрямляет пути** в `production/index.html` (`assets/banners/X.png`→`X.png`, `assets/X`→`X`),
  потому что `deploy.sh` ищет файлы через `find -maxdepth 1` и пушит их плоско;
- включает аналитику (`ANALYTICS_ENABLED` false→true) в `production/` (staging остаётся false);
- само-проверка: 0 `assets/`-путей и каждый referenced-ассет лежит в `production/`.

⚠️ **Почему НЕ просто `./deploy.sh`:** staging теперь хранит ассеты в подпапке
`assets/` (+ `assets/banners/`), а `production/` и `deploy.sh` рассчитаны на плоскую
структуру. Без `promote.sh` задеплоится старый снапшот `production/` без новых
ассетов → битые баннеры и видео на live. `promote.sh` — обязательный мост.

Полная процедура и rollback — `Landing Site/DEPLOY.md`.

### Откат плохого коммита в staging

```bash
cd "/Users/sergei/Projects/Lumir/Landing Site/staging"
git log --oneline -10
git revert <sha>
git push
```

Или через GitHub UI: открыть коммит → кнопка Revert.

### Приглашение коллег

GitHub → https://github.com/rubins92/lmr-stage/settings/access → Add people → **Write** permission.
