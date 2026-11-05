# -*- coding: utf-8 -*-
"""Обложки с фото на вылет и полупрозрачными затемнениями («Журнал», «Корешок»):
фото кладём под всю лицевую сторону, серые пиксели превью = затемнение поверх фото, белое = текст."""
import sys, numpy as np
sys.path.insert(0, '.build')
from PIL import Image
from photos_fill import cover_crop
BASE = 208.0
JOBS = {  # ключ: (кадр демо-съёмки, fy, zoom, fx)
    'magazine': ('.build/photos/demo/01_18.jpg', 0.0, 1.5, 0.45),
    'spine': ('.build/photos/demo/01_07.jpg', 0.05, 1.0, 0.5),
}
def bleed(path_in, path_out, photo, fy, zoom, fx, front_only):
    o = np.asarray(Image.open(path_in).convert('RGB')).astype(np.float32)
    H, W, _ = o.shape
    x0 = W // 2 if not front_only else 0
    ph = np.asarray(cover_crop(Image.open(photo).convert('RGB'), W - x0, H, fy, zoom, fx)).astype(np.float32)
    reg = o[:, x0:]
    L = reg.mean(axis=2, keepdims=True); chroma = (reg.max(axis=2) - reg.min(axis=2))[..., None]
    shade = np.clip(L / BASE, 0, 1)                    # серое = затемнение
    white = np.clip((L - BASE) / (255 - BASE), 0, 1)   # светлее фона = белый текст
    res = np.where(L <= BASE, ph * shade, ph * (1 - white) + 255 * white)
    neutral = np.clip(1 - (chroma - 10) / 20, 0, 1)   # цветное (красная линейка, корешок) оставляем
    reg2 = res * neutral + reg * (1 - neutral)
    o[:, x0:] = reg2
    Image.fromarray(np.clip(o, 0, 255).astype(np.uint8)).save(path_out, 'JPEG', quality=84, optimize=True, progressive=True)
for key, (photo, fy, zoom, fx) in JOBS.items():
    for part in ('front', 'cover'):
        bleed(f'.build/photos/lumir-orig/tpl-{key}-{part}.jpg', f'assets/templates/tpl-{key}-{part}.jpg', photo, fy, zoom, fx, part == 'front')
print('ok')
