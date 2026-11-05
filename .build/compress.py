# -*- coding: utf-8 -*-
"""Развороты и обложки для окна просмотра: максимум 1100 px по ширине, JPEG 72. Карточки (-front) не трогаем."""
import glob, os
from PIL import Image
before = after = 0
for d in ('assets/templates', 'assets/mironova'):
    for f in glob.glob(d + '/*.jpg'):
        b = os.path.basename(f)
        if '-front' in b or b.startswith('og-'):
            continue
        before += os.path.getsize(f)
        im = Image.open(f).convert('RGB')
        if im.width > 1100:
            im = im.resize((1100, round(im.height * 1100 / im.width)), Image.LANCZOS)
        im.save(f, 'JPEG', quality=72, optimize=True, progressive=True)
        after += os.path.getsize(f)
print(f'{before/1e6:.1f} → {after/1e6:.1f} MB')
