# -*- coding: utf-8 -*-
"""«The End»: мозаика 4×6 из фото класса под закатным градиентом (клетки найдены по краям)."""
import glob, random, numpy as np
from PIL import Image
POOL = sorted(glob.glob('.build/photos/pool/senior-g*.jpg'))
GRID = {
  'front': ([(58, 156), (160, 259), (263, 361), (365, 463)], [(79, 183), (187, 290), (294, 397), (401, 504), (508, 611), (615, 718)]),
  'cover': ([(793, 915), (920, 1042), (1047, 1170), (1174, 1296)], [(99, 227), (232, 360), (365, 492), (497, 625), (630, 758), (763, 891)]),
}
def crop(p, w, h):
    im = Image.open(p).convert('RGB'); s = max(w / im.width, h / im.height)
    im = im.resize((max(w, round(im.width * s)), max(h, round(im.height * s))), Image.LANCZOS)
    x = (im.width - w) // 2; y = int((im.height - h) * 0.3)
    return np.asarray(im.crop((x, y, x + w, y + h))).astype(np.float32)
for part, (cols, rows) in GRID.items():
    a = np.asarray(Image.open(f'.build/photos/lumir-orig/tpl-theend-{part}.jpg').convert('RGB')).astype(np.float32)
    rnd = random.Random('theend'); pool = POOL[:]; rnd.shuffle(pool); k = 0
    for (y0, y1) in rows:
        for (x0, x1) in cols:
            y0b, y1b, x0b, x1b = y0 + 2, y1 - 1, x0 + 2, x1 - 1
            c = a[y0b:y1b, x0b:x1b]
            text = ((c[..., 0] > 228) & (c[..., 1] > 205) & (c[..., 2] > 180))[..., None]
            p = crop(pool[k % len(pool)], x1b - x0b, y1b - y0b); k += 1
            tinted = np.clip(0.28 * c + 0.72 * p * (c / 255.0) * 1.35, 0, 255)
            a[y0b:y1b, x0b:x1b] = np.where(text, c, tinted)
    Image.fromarray(a.astype(np.uint8)).save(f'assets/templates/tpl-theend-{part}.jpg', 'JPEG', quality=82, optimize=True, progressive=True)
    print(part, k)
