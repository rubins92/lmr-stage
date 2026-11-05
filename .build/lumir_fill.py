# -*- coding: utf-8 -*-
"""Фото в пустые рамки 22 дизайнов Lumir: из .build/photos/lumir-orig → assets/templates."""
import sys, glob, os
sys.path.insert(0, '.build')
from PIL import Image
from photos_fill import fill
from templates_data import LUMIR
GREY = (208, 208, 208)
# обложки, где крупный заголовок лежит на фото: кадр, в котором лицо ниже заголовка
FORCE = {'vogue': (['.build/photos/demo/01_68.jpg'], 0.0, 1.3, 0.6)}
cnt = {}
for t in LUMIR:
    key, aud = t[0], t[2]
    r = cnt.get(aud, 0); cnt[aud] = r + 1
    for f in sorted(glob.glob(f'.build/photos/lumir-orig/tpl-{key}-*.jpg')):
        part = f.rsplit('-', 1)[1][:-4]
        cover = part in ('front', 'cover')
        fo, fy, fz, fx = FORCE.get(key, (None, 0.5, 1.0, 0.5)) if cover else (None, 0.5, 1.0, 0.5)
        im, n = fill(Image.open(f), aud, f'{key}-{part}', ph=GREY, rot=r if cover else None, force=fo, force_fy=fy, force_zoom=fz, force_fx=fx)
        im.save(f'assets/templates/{os.path.basename(f)}', 'JPEG', quality=80, optimize=True, progressive=True)
print('ok', cnt)
