#!/bin/sh
# пересобрать все обложки и развороты с фото (порядок важен)
set -e
cd "$(dirname "$0")/.."
python3 .build/mironova_import.py "${1:?папка mir-prod}"
python3 .build/lumir_fill.py
python3 .build/bleed_fill.py
python3 .build/theend_fill.py
python3 .build/compress.py
python3 .build/build_shop.py
