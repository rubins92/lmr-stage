# Сборка витрины шаблонов (`shablony.html`)

Скрипты для витрины. На сайт не деплоятся, нужны только чтобы пересобрать страницу.

Быстро, после правок меню/подвала главной или каталога:

    python3 .build/build_shop.py        # shablony.html + shablony.md из index.html и каталога

- `templates_data.py` — каталог: 22 дизайна Lumir (`LUMIR`) и авторы (`AUTHORS`). Новый автор = новая запись, на странице появится его слайдер.
- `mironova_items.py` — 43 шаблона студии Мироновой (генерируется `mironova_import.py`, цены из её прайса).
- `build_shop.py` — берёт из `index.html` стили, шапку, подвал, тему, cookie и аналитику, собирает витрину, разметку для поисковиков (JSON-LD) и текстовую версию для ИИ.

Полная пересборка картинок (нужны исходники, которые лежат вне git, у Лизы в `~/Клод_Lumir/templates-shop-backup/build/`: `photos/` и `sources/mir-prod/`):

    sh .build/refill_all.sh .build/sources/mir-prod

`photos_fill.py` вставляет фото в серые рамки, `lumir_fill.py` / `bleed_fill.py` / `theend_fill.py` — дизайны Lumir, `compress.py` ужимает развороты до 1100 px.
