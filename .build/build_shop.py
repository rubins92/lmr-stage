"""Собирает shablony.html — витрину шаблонов внутри лендинга.
Шапка, подвал, стили, тема, cookie и аналитика берутся из index.html при каждой сборке,
поэтому витрина всегда выглядит как часть главной. Запуск из корня worktree: python3 .build/build_shop.py"""
import sys, json, html, re
sys.path.insert(0, '.build')
from templates_data import LUMIR, AUTHORS

def mix(items, first=('senior', 'kids', 'school4')):
    """Вперемешку: детские и взрослые дизайны равномерно по всему ряду, порядок внутри группы сохраняется."""
    keyed = []
    for gi, g in enumerate(first):
        grp = [t for t in items if t[2] == g]
        keyed += [((n + 0.5) / len(grp), gi, t) for n, t in enumerate(grp)]
    return [t for _, _, t in sorted(keyed, key=lambda x: (x[0], x[1]))]
LUMIR = mix(LUMIR)
# первые места в слайдере — выбор Лизы
TOP = ['player', 'neon', 'avant']
LUMIR = [t for k in TOP for t in LUMIR if t[0] == k] + [t for t in LUMIR if t[0] not in TOP]
for _a in AUTHORS: _a['items'] = mix(_a['items'], ('kids', 'senior', 'school4'))

REG = 'https://fotoklass.lumir.photo/'
esc = lambda s: html.escape(s, quote=True)
NB = '\u00a0'
def nbsp_rub(t):
    # «1 500 ₽» не должно рваться на две строки
    t = re.sub(r'(\d) (?=\d{3}(?:[ \u00a0]\d{3})*[ \u00a0]₽)', '\\1' + NB, t)
    return re.sub(r'(\d) ₽', '\\1' + NB + '₽', t)
def pl(n, one, few, many):
    m = n % 100
    return one if m % 10 == 1 and m != 11 else few if 2 <= m % 10 <= 4 and not 12 <= m <= 14 else many
idx = open('index.html', encoding='utf-8').read()

def cut(start, end, src=idx, incl_end=True):
    i = src.index(start); j = src.index(end, i)
    return src[i:j + (len(end) if incl_end else 0)]

# ── общие куски главной
analytics_top = cut('<!--\n  ANALYTICS KILL-SWITCH', '<title>', incl_end=False)
vid_block = cut('<!-- lumir_vid cookie -->', '<!-- OpenPanel analytics -->', incl_end=False)
op_block = cut('<!-- OpenPanel analytics -->', '</script>')
landing_css = cut('<style>', '</style>')
theme_init = cut("<script>\n(function(){\n  var saved = null;", '</script>')
nav = cut('<!-- ============================================ NAV (v2 design)', '</div>\n\n<!-- ============================================ S1', incl_end=False) + '</div>'
footer = cut('<footer class="footer"', '</footer>')
cookie = cut('<div id="cookie-banner"', '</div>')

def to_home(fragment):
    # якоря главной ведут на главную
    return re.sub(r'href="#([a-z-]+)"', r'href="./#\1"', fragment).replace('href="/"', 'href="./"')

nav = to_home(nav)
nav = nav.replace('<div class="nav-logo"><img', '<a class="nav-logo" href="./" aria-label="Lumir Photo, на главную"><img', 1)
nav = nav.replace('decoding="async" /></div>', 'decoding="async" /></a>', 1)
nav = nav.replace('href="shablony.html" class="nav-link"', 'href="shablony.html" class="nav-link is-current" aria-current="page"')
nav = nav.replace('href="shablony.html" class="nav-overlay-link"', 'href="shablony.html" class="nav-overlay-link is-current" aria-current="page"')
footer = to_home(footer)  # ссылка на витрину уже есть в подвале главной

# ── карточки
def lumir_card(t):
    key, title, aud, al, cov, sk, desc = t
    d = f'assets/templates/tpl-{key}'
    imgs = [{'src': f'{d}-cover.jpg', 'cap': 'Обложка'}]
    if sk:
        imgs += [{'src': f'{d}-vignette.jpg', 'cap': 'Виньетка'}] + [{'src': f'{d}-s{i}.jpg', 'cap': f'Разворот {i}'} for i in range(1, 5)]
    inside = 'обложка, 3 виньетки, 11 разворотов' if sk else 'обложка, 2 переплёта'
    data = esc(json.dumps({'title': title, 'kind': 'free', 'aud': al, 'desc': desc, 'inside': inside, 'imgs': imgs}, ensure_ascii=False))
    return f'''        <article class="tcard" id="tpl-{key}" data-aud="{aud}" data-kind="free">
          <button type="button" class="tcard-shot" data-tpl="{data}" aria-label="Открыть шаблон «{esc(title)}»: обложка и развороты">
            <img src="{d}-front.jpg" alt="Шаблон выпускного альбома «{esc(title)}», {al.lower()}: обложка" loading="lazy" decoding="async">
            <span class="tcard-zoom" aria-hidden="true">Смотреть развороты</span>
          </button>
          <div class="tcard-row"><h3>{esc(title)}</h3><span class="tag tag-free">Бесплатно</span></div>
          <p class="tcard-meta">{al} · {'11 разворотов' if sk else 'обложка'}</p>
          <a class="tbtn tbtn-free" href="{REG}" data-loc="free_card">Использовать бесплатно</a>
        </article>'''

def studio_imgs(t, a):
    slug, title, aud, al, fmt, buy, has_cover, n = t
    d = f'assets/{a["key"]}/mir-{slug}'
    imgs = [{'src': f'{d}-cover.jpg', 'cap': 'Обложка'}] if has_cover else []
    return imgs + [{'src': f'{d}-s{i}.jpg', 'cap': f'Разворот {i}'} for i in range(1, n + 1)]

def studio_card(t, a):
    slug, title, aud, al, fmt, buy, has_cover, n = t
    src = f'assets/{a["key"]}/mir-{slug}-front.jpg'
    sq = ' is-square' if fmt == '23×23' else ''
    data = esc(json.dumps({'title': title, 'kind': 'studio', 'author': a['name'], 'aud': al, 'fmt': fmt, 'rent': a['rent'], 'buy': buy, 'desc': f'Платный авторский дизайн: {a["short"]}. Формат {fmt}.', 'inside': 'обложка, виньетка, развороты', 'imgs': studio_imgs(t, a)}, ensure_ascii=False))
    return f'''        <article class="tcard" id="tpl-{a['key']}-{slug}" data-aud="{aud}" data-kind="studio">
          <button type="button" class="tcard-shot{sq}" data-tpl="{data}" aria-label="Открыть платный шаблон «{esc(title)}»: обложка и развороты">
            <img src="{src}" alt="Платный шаблон выпускного альбома «{esc(title)}», {a['short']}, {al.lower()}, {fmt}: обложка" width="600" height="{600 if sq else 840}" loading="lazy" decoding="async">
            <span class="tcard-zoom" aria-hidden="true">Смотреть развороты</span>
          </button>
          <div class="tcard-row"><h3>{esc(title)}</h3><span class="tag tag-paid">Платно</span></div>
          <p class="tcard-meta">{al} · {fmt}</p>
          <div class="tbtn-pair">
            <a class="tbtn tbtn-rent" href="{REG}" data-loc="studio_rent"><span>Аренда на класс</span><b>{a['rent']}</b></a>
            <a class="tbtn tbtn-buy" href="{REG}" data-loc="studio_buy"><span>Купить навсегда</span><b>{buy}</b></a>
          </div>
        </article>'''

def author_block(a, first):
    rest = a['total'] - len(a['items'])
    return f'''  <div class="ts-author" id="author-{a['key']}">
    <div class="container ts-sec-head">
      <div>
        <h3 class="ts-author-name">{esc(a['name'])} <span class="badge badge-paid">Платные дизайны</span></h3>
        <p class="ts-sec-sub">Партнёр Lumir · {a['total']} {pl(a["total"], "авторский дизайн", "авторских дизайна", "авторских дизайнов")} · аренда на класс {a['rent']} · покупка от {a['buy_from']}</p>
      </div>
      {slider_controls(a['short'])}
    </div>
    <div class="slider" data-slider tabindex="0" aria-label="Платные шаблоны: {esc(a['short'])}, листаются вбок">
{chr(10).join(studio_card(t, a) for t in a['items'])}
{f'        <a class="tcard tcard-more" href="{REG}" data-kind="studio" data-aud="all" data-loc="studio_more"><b>+{rest}</b><span>платных дизайнов автора в каталоге Lumir</span></a>' if rest > 0 else ''}
    </div>
  </div>'''

def slider_controls(name):
    return f'''<div class="slider-ctrl" aria-label="Листать: {name}">
          <button type="button" class="slider-btn" data-dir="-1" aria-label="Назад"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
          <button type="button" class="slider-btn" data-dir="1" aria-label="Вперёд"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
        </div>'''

FAQ = [
    ('Какие шаблоны бесплатные, а какие платные?', 'Бесплатны более 25 дизайнов библиотеки Lumir: работаете в редакторе Lumir и платите только за файлы на печать: 980 ₽ за весь класс. Дизайны авторов и студий, например студии Мироновой, платные: аренда на один класс 390 ₽ или покупка навсегда от 700 ₽.'),
    ('Чем аренда отличается от покупки?', 'Аренда открывает дизайн на один проект, то есть на один класс, за 390 ₽. Купленный дизайн остаётся у вас навсегда, цена от 700 ₽.'),
    ('Для каких классов есть шаблоны?', 'Для детского сада, начальной школы, 9 и 11 класса. В каждом дизайне есть обложка, виньетка класса и развороты.'),
    ('Можно скачать бесплатный шаблон?', 'Нет. Бесплатные дизайны библиотеки работают только в редакторе Lumir: выбираете шаблон, загружаете съёмку, и сервис сам собирает по нему индивидуальный альбом каждому ученику. На печать вы скачиваете уже готовые макеты альбомов.'),
    ('Сколько стоят шаблоны студии Мироновой?', 'В Lumir 43 дизайна студии Мироновой для детского сада, начальной школы, 9 и 11 класса. Любой можно взять в аренду на один класс за 390 ₽ или купить навсегда: от 700 до 2 100 ₽ в зависимости от шаблона. Есть форматы 21×30 и 23×23.'),
    ('Можно загрузить свой дизайн?', 'Да, PSD или InDesign. Для первой 1000 фотографов три дизайн-пака адаптируем бесплатно: стандартные паки до 25 разворотов.'),
]
faq_html = '\n'.join(f'''      <div class="faq-item">
        <button class="faq-q" type="button" aria-expanded="false">{esc(q)}<span class="faq-toggle" aria-hidden="true">+</span></button>
        <div class="faq-a"><div><div class="faq-a-content"><p>{esc(a)}</p></div></div></div>
      </div>''' for q, a in FAQ)

# ── разметка для поисковиков и ИИ-поиска
import datetime
SITE = 'https://lumir.photo/'
URL = SITE + 'shablony.html'
TODAY = datetime.date.today().isoformat()
ORG = {'@type': 'Organization', '@id': SITE + '#org', 'name': 'Lumir Photo', 'alternateName': ['Lumir', 'Люмир'], 'url': SITE, 'logo': SITE + 'og-image.jpg'}
AUD = {'kids': 'Выпускной детского сада', 'school4': 'Выпуск начальной школы, 4 класс', 'senior': 'Выпуск 9 и 11 класса'}
items = []
for t in LUMIR:
    items.append({'@type': 'ListItem', 'position': len(items) + 1, 'url': f'{URL}#tpl-{t[0]}', 'item': {'@type': 'Product', '@id': f'{URL}#tpl-{t[0]}', 'name': f'Шаблон выпускного альбома «{t[1]}»', 'description': f'{t[6]} Бесплатный дизайн библиотеки Lumir, {t[3].lower()}, формат 21×30. Работает в редакторе Lumir, файлы скачать нельзя.', 'category': f'Шаблоны выпускных альбомов: {t[3]}', 'image': f'{SITE}assets/templates/tpl-{t[0]}-front.jpg', 'brand': {'@type': 'Brand', 'name': 'Lumir'}, 'audience': {'@type': 'Audience', 'audienceType': AUD[t[2]]}, 'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'RUB', 'availability': 'https://schema.org/InStock', 'url': f'{URL}#tpl-{t[0]}', 'seller': {'@id': SITE + '#org'}}}})
for a in AUTHORS:
    for t in a['items']:
        u = f"{URL}#tpl-{a['key']}-{t[0]}"
        items.append({'@type': 'ListItem', 'position': len(items) + 1, 'url': u, 'item': {'@type': 'Product', '@id': u, 'name': f'Шаблон выпускного альбома «{t[1]}», {a["short"]}', 'description': f'Платный авторский дизайн, {a["short"]}: {t[3].lower()}, формат {t[4]}. Аренда на один класс {a["rent"]}, покупка навсегда {t[5]}. Работает в редакторе Lumir.', 'category': f'Шаблоны выпускных альбомов: {t[3]}', 'image': f"{SITE}assets/{a['key']}/mir-{t[0]}-front.jpg", 'brand': {'@type': 'Brand', 'name': a['name']}, 'audience': {'@type': 'Audience', 'audienceType': AUD[t[2]]}, 'offers': [{'@type': 'Offer', 'name': 'Аренда на один класс', 'price': re.sub(r'\D', '', a['rent']), 'priceCurrency': 'RUB', 'availability': 'https://schema.org/InStock', 'url': u, 'seller': {'@id': SITE + '#org'}}, {'@type': 'Offer', 'name': 'Покупка навсегда', 'price': re.sub(r'\D', '', t[5]), 'priceCurrency': 'RUB', 'availability': 'https://schema.org/InStock', 'url': u, 'seller': {'@id': SITE + '#org'}}]}})
N_PAID = sum(len(a['items']) for a in AUTHORS)
SUMMARY = [
    f'Более 25 шаблонов выпускных альбомов библиотеки Lumir бесплатны: обложка, виньетка класса и 11 разворотов, формат 21×30.',
    'Бесплатные шаблоны работают только в онлайн-редакторе Lumir, файлы дизайна скачать нельзя. Lumir сам собирает по шаблону индивидуальный альбом каждому ученику.',
    f'Платные авторские шаблоны: {N_PAID} {pl(N_PAID, "дизайн", "дизайна", "дизайнов")} студии Мироновой. Аренда на один класс 390 ₽, покупка навсегда от 700 до 2 100 ₽.',
    'Есть шаблоны для детского сада, начальной школы (4 класс), 9 и 11 класса.',
    'Регистрация бесплатная, фотограф платит только за файлы на печать: 980 ₽ за весь класс.',
]
LD = [
    {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': 1, 'name': 'Lumir Photo', 'item': SITE}, {'@type': 'ListItem', 'position': 2, 'name': 'Шаблоны выпускных альбомов', 'item': URL}]},
    {'@context': 'https://schema.org', '@type': 'CollectionPage', '@id': URL, 'name': 'Шаблоны выпускных альбомов', 'headline': 'Шаблоны выпускных альбомов бесплатно в Lumir', 'description': ' '.join(SUMMARY), 'url': URL, 'inLanguage': 'ru-RU', 'dateModified': TODAY,
     'isPartOf': {'@type': 'WebSite', 'name': 'Lumir Photo', 'url': SITE}, 'publisher': ORG, 'about': {'@type': 'Thing', 'name': 'Шаблоны выпускных альбомов для школы и детского сада'},
     'audience': {'@type': 'BusinessAudience', 'audienceType': 'Школьные и детсадовские фотографы'},
     'primaryImageOfPage': {'@type': 'ImageObject', 'url': SITE + 'assets/templates/og-shablony.jpg', 'width': 1200, 'height': 630},
     'speakable': {'@type': 'SpeakableSpecification', 'cssSelector': ['h1', '#ts-summary']},
     'mainEntity': {'@type': 'ItemList', 'name': 'Каталог шаблонов выпускных альбомов', 'numberOfItems': len(items), 'itemListElement': items}},
    {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in FAQ]},
]
ld_html = '\n'.join(f'<script type="application/ld+json">\n{json.dumps(x, ensure_ascii=False, indent=2)}\n</script>' for x in LD)

TITLE = 'Шаблоны выпускных альбомов бесплатно и от студий | Lumir Photo'
DESC = 'Шаблоны выпускных альбомов для детского сада, 4, 9 и 11 класса: более 25 бесплатных дизайнов Lumir и авторские шаблоны студий, аренда на класс от 390 ₽.'
KEYS = 'шаблоны выпускных альбомов, шаблон выпускного альбома бесплатно, шаблоны выпускных альбомов для детского сада, шаблон выпускного альбома 4 класс, шаблон выпускного альбома 11 класс, виньетка выпускного альбома шаблон, аренда шаблона выпускного альбома, шаблоны Мироновой, Lumir, Люмир'

page = f'''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
{analytics_top}<title>{TITLE}</title>
<meta name="description" content="{esc(DESC)}" />
<meta name="keywords" content="{esc(KEYS)}" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta name="theme-color" content="#7C6FE8" />
<link rel="canonical" href="https://lumir.photo/shablony.html" />
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon.png" />
<link rel="apple-touch-icon" href="assets/favicon.png" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://lumir.photo/shablony.html" />
<meta property="og:title" content="Шаблоны выпускных альбомов бесплатно в Lumir" />
<meta property="og:description" content="Более 25 бесплатных дизайнов Lumir и платные авторские шаблоны студии Мироновой: аренда на класс 390 ₽. Для сада, 4, 9 и 11 класса." />
<meta property="og:image" content="https://lumir.photo/assets/templates/og-shablony.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Шаблоны выпускных альбомов: более 25 бесплатно в Lumir и авторские от студий" />
<meta property="og:locale" content="ru_RU" />
<meta property="og:site_name" content="Lumir" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Шаблоны выпускных альбомов бесплатно в Lumir" />
<meta name="twitter:description" content="Более 25 бесплатных дизайнов Lumir и платные авторские шаблоны: аренда на класс 390 ₽." />
<meta name="twitter:image" content="https://lumir.photo/assets/templates/og-shablony.jpg" />
<meta property="article:modified_time" content="{TODAY}" />
<link rel="alternate" type="text/markdown" href="shablony.md" title="Шаблоны выпускных альбомов: текстовая версия для ИИ-ассистентов" />
{ld_html}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Golos+Text:wght@400;500;600&family=Caveat:wght@600;700&display=swap" rel="stylesheet" />
{vid_block}{op_block}
{landing_css}
<link rel="stylesheet" href="assets/templates/templates-shop.css" />
{theme_init}
</head>
<body class="tshop-page">

{nav}

<main>
<header class="container ts-hero">
  <nav class="ts-crumbs" aria-label="Вы здесь"><a href="./">Главная</a><span aria-hidden="true">›</span><span>Шаблоны выпускных альбомов</span></nav>
  <div class="ts-hero-grid">
    <div class="ts-hero-text">
      <div class="id-pill">✦ Магазин шаблонов</div>
      <h1>Шаблоны выпускных альбомов <span class="grad">бесплатно в Lumir</span></h1>
      <p class="ts-lede">Более 25 дизайнов библиотеки Lumir бесплатно. Отдельно есть платные авторские дизайны студий: аренда на один класс 390 ₽ или покупка навсегда. Для детского сада, 4, 9 и 11 класса.</p>
      <div class="ts-hero-cta">
        <a class="btn btn-primary" href="{REG}" data-loc="hero">ВЫБРАТЬ ШАБЛОН БЕСПЛАТНО</a>
        <a class="ts-btn-gold-ghost" href="#studio">АВТОРСКИЕ · ОТ 390 ₽</a>
      </div>
      <p class="hand-note">регистрация бесплатная, платите только за печать класса</p>
    </div>
    <div class="ts-fan" aria-hidden="true">
      <img class="f1" src="assets/templates/tpl-player-front.jpg" alt="">
      <img class="f2" src="assets/templates/tpl-neon-front.jpg" alt="">
      <img class="f3" src="assets/templates/tpl-avant-front.jpg" alt="">
      <span class="ts-chip">Работа в редакторе Lumir · 11 разворотов</span>
    </div>
  </div>
</header>

<section class="container ts-summary" id="ts-summary" aria-labelledby="ts-summary-h">
  <h2 id="ts-summary-h">Коротко о шаблонах</h2>
  <ul>
{chr(10).join(f'    <li>{esc(x)}</li>' for x in SUMMARY)}
  </ul>
</section>

<section class="container ts-banners" aria-label="Бесплатно и платно">
  <article class="ts-ban ts-ban--violet">
    <div class="ts-ban-text">
      <div class="ts-ban-kick">Библиотека Lumir · бесплатно</div>
      <h2>Более 25 дизайнов бесплатно</h2>
      <p>Обложка, виньетка и 11 разворотов. Работаете прямо в редакторе Lumir, он сам соберёт альбом каждому ученику.</p>
      <a href="{REG}" data-loc="banner_free">НАЧАТЬ БЕСПЛАТНО</a>
    </div>
    <div class="ts-ban-imgs ts-ban-imgs--3" aria-hidden="true"><img src="assets/templates/tpl-player-front.jpg" alt=""><img src="assets/templates/tpl-neon-front.jpg" alt=""><img src="assets/templates/tpl-avant-front.jpg" alt=""></div>
  </article>
  <article class="ts-ban ts-ban--gold">
    <div class="ts-ban-text">
      <div class="ts-ban-kick">Авторские дизайны · платно</div>
      <h2>Аренда дизайна на класс за 390 ₽</h2>
      <p>Дизайны студии Мироновой и других авторов. Не нужно покупать пак целиком: возьмите шаблон на один класс. Или купите навсегда от 700 ₽.</p>
      <a href="{REG}" data-loc="banner_rent">ВЗЯТЬ В АРЕНДУ</a>
    </div>
    <div class="ts-ban-imgs" aria-hidden="true"><img src="assets/mironova/mir-planeta-detstva-front.jpg" alt=""><img src="assets/mironova/mir-kosmos-front.jpg" alt=""></div>
  </article>
</section>

<div class="container ts-filters-wrap">
  <div class="ts-filters" role="group" aria-label="Для кого шаблон">
    <button type="button" data-aud="all" aria-pressed="true">Все</button>
    <button type="button" data-aud="kids" aria-pressed="false">Детский сад</button>
    <button type="button" data-aud="school4" aria-pressed="false">Начальная школа</button>
    <button type="button" data-aud="senior" aria-pressed="false">9–11 класс</button>
  </div>
</div>

<section class="ts-sec" id="free" aria-labelledby="free-h">
  <div class="container ts-sec-head">
    <div>
      <h2 id="free-h">Библиотека Lumir <span class="badge badge-free">Бесплатно</span></h2>
      <p class="ts-sec-sub">Более 25 дизайнов · формат 21×30 · обложка, виньетка и развороты</p>
      <p class="ts-free-note">Бесплатные дизайны работают в редакторе Lumir. Скачать их файлы нельзя.</p>
    </div>
    {slider_controls('библиотека Lumir')}
  </div>
  <div class="slider" data-slider tabindex="0" aria-label="Бесплатные шаблоны, листаются вбок">
{chr(10).join(lumir_card(t) for t in LUMIR)}
  </div>
  <p class="ts-empty" hidden>Для этого фильтра бесплатных шаблонов пока нет</p>
</section>

<section class="ts-sec ts-sec--studio" id="studio" aria-labelledby="studio-h">
  <div class="container ts-studio-intro">
    <h2 id="studio-h">Авторские дизайны <span class="badge badge-paid">Платно</span></h2>
    <p class="ts-studio-note">Это не библиотека Lumir: дизайны авторов и студий платные. Аренда действует на один класс, покупка навсегда. Работаете в них так же, в редакторе Lumir.</p>
  </div>
{chr(10).join(author_block(a, n == 0) for n, a in enumerate(AUTHORS))}
  <div class="container">
    <div class="ts-authors-soon">
      <div>
        <h3>Скоро здесь появятся новые авторы</h3>
        <p>Мы приглашаем дизайн-студии и иллюстраторов выпускных альбомов. Дизайнер? Продавайте свои шаблоны фотографам через Lumir.</p>
      </div>
      <a class="ts-authors-cta" href="https://t.me/lumirphoto_bot" data-loc="become_author">Стать автором</a>
    </div>
  </div>
  <p class="ts-empty" hidden>Для этого фильтра платных шаблонов пока нет</p>
</section>

<section class="container ts-how">
  <h2>Шаблон → готовые альбомы класса</h2>
  <ol>
    <li><span>Шаг 01</span><h3>Выберите шаблон</h3><p>Бесплатный из библиотеки или платный от студии: в аренду или навсегда</p></li>
    <li><span>Шаг 02</span><h3>Загрузите съёмку</h3><p>Lumir узнает каждого ученика и выберет лучшие кадры без повторов</p></li>
    <li><span>Шаг 03</span><h3>Получите альбомы класса</h3><p>Индивидуальный альбом каждому ученику в выбранном дизайне. Ученики утверждают его с телефона</p></li>
  </ol>
</section>

<section class="container ts-faq faq-section" id="faq-templates">
  <h2 class="h2">Вопросы о шаблонах</h2>
  <div class="faq-list">
{faq_html}
  </div>
</section>

<section class="container ts-final">
  <div class="ts-final-box">
    <h2>Выберите шаблон и соберите <span class="grad">первый класс сегодня</span></h2>
    <p>10 000 ₽ на баланс и 3 дизайн-пака бесплатно для первой 1000 фотографов</p>
    <a class="btn btn-primary" href="{REG}" data-loc="final">ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО</a>
  </div>
</section>
</main>

{footer}

{cookie}
<a href="{REG}" class="sticky-cta hidden" id="sticky-cta" data-loc="sticky">Выбрать бесплатно</a>

<dialog class="lb" id="lb" aria-label="Шаблон крупно">
  <div class="lb-main">
    <div class="lb-top"><span id="lb-crumb"></span><span id="lb-count"></span></div>
    <div class="lb-stage">
      <button type="button" class="lb-nav" id="lb-prev" aria-label="Предыдущая страница"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <img id="lb-img" alt="">
      <button type="button" class="lb-nav" id="lb-next" aria-label="Следующая страница"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
    </div>
    <div class="lb-thumbs" id="lb-thumbs" role="list" aria-label="Страницы шаблона"></div>
  </div>
  <aside class="lb-side">
    <button type="button" class="lb-close" id="lb-close" aria-label="Закрыть"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
    <span id="lb-tag"></span>
    <h2 id="lb-title"></h2>
    <p id="lb-desc"></p>
    <dl><dt>Для кого</dt><dd id="lb-aud"></dd><dt>Формат</dt><dd id="lb-fmt">21×30</dd><dt>Внутри</dt><dd id="lb-inside"></dd></dl>
    <div class="lb-cta" id="lb-cta"></div>
  </aside>
</dialog>

<script src="assets/templates/templates-shop.js"></script>
</body>
</html>
'''
page = nbsp_rub(page)
# версия картинок по дате файла: после замены фото браузер не покажет старые из кэша
import os, hashlib
def _ver(m):
    f = m.group(1)
    v = hashlib.md5(str(os.path.getmtime(f)).encode()).hexdigest()[:8] if os.path.exists(f) else ''
    return f + ('?v=' + v if v else '')
# прод «плоский» (promote.sh кладёт ассеты в корень): абсолютные ссылки для соцсетей, поисковиков и ИИ — без папок
page = re.sub(r'https://lumir\.photo/assets/(?:[\w-]+/)*([\w.-]+)', r'https://lumir.photo/\1', page)
# версия картинок против кэша — только для локального превью и тестовых копий (SHOP_VER=1), в git без меток
if os.environ.get('SHOP_VER'):
    page = re.sub(r'(assets/(?:templates|mironova)/[\w.-]+\.jpg)', _ver, page)
open('shablony.html', 'w', encoding='utf-8').write(page)

md = [f'# Шаблоны выпускных альбомов | Lumir Photo', '', f'> Каталог шаблонов выпускных альбомов сервиса автовёрстки Lumir. Страница: {URL}. Обновлено {TODAY}.', '', '## Коротко', '']
md += [f'- {x}' for x in SUMMARY]
md += ['', f'## Библиотека Lumir: бесплатно (более 25 дизайнов, здесь {len(LUMIR)} из них)', '', 'Работают в онлайн-редакторе Lumir, скачать файлы дизайна нельзя. Обложка, 3 виньетки и 11 разворотов, формат 21×30.', '']
md += [f'- **{t[1]}**, {t[3].lower()}. {t[6]} [Смотреть]({URL}#tpl-{t[0]})' for t in LUMIR]
for a in AUTHORS:
    md += ['', f'## {a["name"]}: платно ({len(a["items"])} {pl(len(a["items"]), "дизайн", "дизайна", "дизайнов")})', '', f'Авторские дизайны партнёра Lumir. Аренда на один класс {a["rent"]}, покупка навсегда по цене шаблона. Работают в редакторе Lumir.', '', '| Шаблон | Для кого | Формат | Аренда на класс | Покупка навсегда |', '|---|---|---|---|---|']
    md += [f'| [{t[1]}]({URL}#tpl-{a["key"]}-{t[0]}) | {t[3]} | {t[4]} | {a["rent"]} | {t[5]} |' for t in a['items']]
md += ['', '## Как это работает', '', '1. Выберите шаблон: бесплатный из библиотеки или платный от студии.', '2. Загрузите съёмку класса: Lumir узнает каждого ученика и выберет лучшие кадры.', '3. Получите индивидуальный альбом каждому ученику в выбранном дизайне. Ученики утверждают альбом с телефона.', '', '## Вопросы и ответы', '']
for q, a_ in FAQ: md += [f'### {q}', '', a_, '']
md += ['## Ссылки', '', f'- Регистрация (бесплатно): {REG}', f'- Главная: {SITE}', f'- Описание сервиса для ИИ: {SITE}llms.txt', '']
open('shablony.md', 'w', encoding='utf-8').write('\n'.join(md))
print('shablony.html', len(page), 'items', len(items))
