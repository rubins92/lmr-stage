# SEO-патч для lumir.photo

**Проблема:** сайт пропал из поиска. Три причины:
1. Мета-теги `noindex, nofollow` в `<head>` блокируют индексацию всеми поисковиками
2. `robots.txt` содержит `Disallow: /` для всех ботов — полная блокировка краулинга
3. `sitemap.xml` не указан в robots.txt

**Целевые запросы:** Люмир, Люмир фото, Люмир фотокласс, Автоверстка индивидуальных альбомов, Автоверстка фотокниг, Lumir, Lumir photo

---

## 0. Файлы `robots.txt` и `sitemap.xml` — ЗАМЕНИТЬ ЦЕЛИКОМ

### robots.txt — заменить содержимое на:

```
User-agent: *
Allow: /
Disallow: /assets/screens/

# AI training crawlers — block
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Bytespider
Disallow: /

# SEO crawlers — block (optional, saves bandwidth)
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

Sitemap: https://lumir.photo/sitemap.xml
Host: https://lumir.photo
```

Логика: разрешаем краулинг для Google/Yandex/Bing, блокируем только AI-тренировочных ботов и SEO-краулеры.

### sitemap.xml — заменить содержимое на:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lumir.photo/</loc>
    <lastmod>2026-07-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fotoklass.lumir.photo/</loc>
    <lastmod>2026-07-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

При каждом обновлении лендинга менять `<lastmod>` на текущую дату.

---

## Что менять в `index.html` (в `<head>`)

### 1. КРИТИЧНО: Убрать блокировку индексации

**Найти (строки ~34-37):**
```html
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
<meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
<meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet" />
<meta name="yandex" content="noindex, nofollow, noarchive" />
```

**Заменить на:**
```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
```

`max-snippet:-1` — разрешает Google/Яндексу показывать длинные сниппеты. `max-image-preview:large` — разрешает большие превью картинок в выдаче.

---

### 2. Обновить title (оптимизация под ключевые запросы)

**Найти:**
```html
<title>Автоверстка индивидуальных школьных альбомов — LUMIR PHOTO</title>
```

**Заменить на:**
```html
<title>Lumir Photo — автовёрстка индивидуальных школьных альбомов и фотокниг</title>
```

---

### 3. Обновить description (расширить ключевые слова)

**Найти:**
```html
<meta name="description" content="Lumir распознаёт лица, выбирает лучшие кадры и собирает индивидуальные альбомы для каждого ребёнка автоматически." />
```

**Заменить на:**
```html
<meta name="description" content="Lumir Photo (Люмир Фото) — сервис автовёрстки индивидуальных школьных альбомов и фотокниг. Распознавание лиц, автоматическая сборка макетов, экспорт в типографию. Люмир Фотокласс — больше съёмок, меньше рутины." />
```

---

### 4. Обновить keywords

**Найти:**
```html
<meta name="keywords" content="школьные альбомы, автоверстка, фотоальбомы, выпускные альбомы, фотограф, школьная съёмка, Lumir, фотокласс, макеты альбомов, распознавание лиц" />
```

**Заменить на:**
```html
<meta name="keywords" content="Lumir, Lumir Photo, Люмир, Люмир фото, Люмир фотокласс, автоверстка индивидуальных альбомов, автоверстка фотокниг, школьные альбомы, выпускные альбомы, индивидуальные фотокниги, автоматическая верстка альбомов, школьный фотограф, фотокласс, распознавание лиц" />
```

---

### 5. Обновить OG title и description (те же тексты)

**Найти:**
```html
<meta property="og:title" content="Автоверстка индивидуальных школьных альбомов — LUMIR PHOTO" />
<meta property="og:description" content="Lumir распознаёт лица, выбирает лучшие кадры и собирает индивидуальные альбомы для каждого ребёнка автоматически." />
```

**Заменить на:**
```html
<meta property="og:title" content="Lumir Photo — автовёрстка индивидуальных школьных альбомов и фотокниг" />
<meta property="og:description" content="Lumir Photo (Люмир Фото) — сервис автовёрстки индивидуальных школьных альбомов и фотокниг. Распознавание лиц, автоматическая сборка макетов, экспорт в типографию." />
```

---

### 6. Обновить Twitter Card (те же тексты)

**Найти:**
```html
<meta name="twitter:title" content="Автоверстка индивидуальных школьных альбомов — LUMIR PHOTO" />
<meta name="twitter:description" content="Lumir распознаёт лица, выбирает лучшие кадры и собирает индивидуальные альбомы для каждого ребёнка автоматически." />
```

**Заменить на:**
```html
<meta name="twitter:title" content="Lumir Photo — автовёрстка индивидуальных школьных альбомов и фотокниг" />
<meta name="twitter:description" content="Lumir Photo (Люмир Фото) — сервис автовёрстки индивидуальных школьных альбомов и фотокниг. Распознавание лиц, автоматическая сборка макетов, экспорт в типографию." />
```

---

### 7. Обновить JSON-LD (расширить описание и добавить alternativeName)

**Найти:**
```json
  "name": "Lumir Фотокласс",
  "applicationCategory": "PhotographyApplication",
  "operatingSystem": "Web",
  "url": "https://lumir.photo/",
  "description": "Автоматическая вёрстка индивидуальных школьных фотоальбомов. Распознавание лиц, генерация макетов, проверка качества.",
```

**Заменить на:**
```json
  "name": "Lumir Photo",
  "alternateName": ["Люмир", "Люмир Фото", "Люмир Фотокласс", "Lumir"],
  "applicationCategory": "PhotographyApplication",
  "operatingSystem": "Web",
  "url": "https://lumir.photo/",
  "description": "Lumir Photo (Люмир Фото) — сервис автовёрстки индивидуальных школьных альбомов и фотокниг. AI-распознавание лиц, автоматическая сборка макетов, загрузка PSD-дизайнов, экспорт в типографию.",
```

---

### 8. НОВОЕ: Добавить Organization JSON-LD (после закрывающего `</script>` блока FAQPage)

Добавить сразу после закрытия блока `<!-- JSON-LD: FAQPage -->`:

```html
<!-- JSON-LD: Organization -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Lumir Photo",
  "alternateName": ["Люмир", "Люмир Фото", "Люмир Фотокласс", "Lumir"],
  "url": "https://lumir.photo/",
  "email": "info@lumir.photo",
  "sameAs": [
    "https://t.me/lumir_photo",
    "https://vk.ru/lumir.photo"
  ],
  "description": "Сервис автовёрстки индивидуальных школьных альбомов и фотокниг для фотографов"
}
</script>
```

---

### 9. НОВОЕ: Добавить WebSite JSON-LD (рядом с Organization)

```html
<!-- JSON-LD: WebSite -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lumir Photo",
  "alternateName": ["Люмир", "Люмир Фото"],
  "url": "https://lumir.photo/"
}
</script>
```

---

## После применения

1. Проверить разметку: https://search.google.com/test/rich-results (вставить URL)
2. Запросить переиндексацию в Google Search Console
3. Запросить переиндексацию в Яндекс.Вебмастер
4. Результат в выдаче появится через 3–14 дней
