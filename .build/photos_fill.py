# -*- coding: utf-8 -*-
"""Вставляет сгенерированные фото в пустые серые рамки шаблонов (цвет плейсхолдера ~ #C8D5DE)."""
import glob, random, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

PH = np.array([200, 213, 222])
POOL = '.build/photos/pool'
_cache = {}

DEMO_AUDS = ('senior', 'school4')
def demo_pool():
    from PIL import Image as _I
    fs = sorted(glob.glob('.build/photos/demo/*.jpg'))
    vert = [f for f in fs if _I.open(f).height > _I.open(f).width]
    hor = [f for f in fs if f not in vert]
    return {'face': vert, 'v': vert, 'wide': hor}
def pool(aud):
    if aud == 'demo':
        if 'demo' not in _cache: _cache['demo'] = demo_pool()
        return _cache['demo']
    if aud not in _cache:
        g = lambda pat: sorted(glob.glob(f'{POOL}/{aud}-{pat}'))
        _cache[aud] = {'face': g('g*'), 'v': g('v*'), 'wide': g('wide*')}
    return _cache[aud]

def cover_crop(photo, w, h, fy=0.35, zoom=1.0, fx=0.5):
    pw, ph = photo.size; s = max(w / pw, h / ph) * zoom
    photo = photo.resize((max(w, round(pw * s)), max(h, round(ph * s))), Image.LANCZOS)
    pw, ph = photo.size
    x = int((pw - w) * fx); y = int((ph - h) * fy)
    return photo.crop((x, y, x + w, y + h))

_rot = {}
def fill(im, aud, seed, cover=False, ph=None, rot=None, force=None, force_fy=0.5, force_zoom=1.0, force_fx=0.5):
    im = im.convert('RGB'); a = np.asarray(im).astype(np.int16)
    d = np.abs(a - (PH if ph is None else np.array(ph))).max(axis=2)
    core = d <= 7
    lab, n = ndimage.label(core)
    H, W = core.shape
    showcase = (cover or rot is not None) and aud in DEMO_AUDS
    rnd = random.Random(seed); P = pool('demo' if showcase else aud)
    faces = P['face'][:]; rnd.shuffle(faces)
    vs = P['v'][:]
    if cover or rot is not None:
        key = 'demo' if showcase else aud
        r = rot if rot is not None else _rot.get(key, 0); _rot[key] = r + 1; sh = (r * 5) % len(vs); vs = vs[sh:] + vs[:sh]; faces = faces[sh % len(faces):] + faces[:sh % len(faces)] if showcase else faces
    else:
        rnd.shuffle(vs)
    wides = P['wide'][:]; rnd.shuffle(wides)
    objs = [(i + 1, s) for i, s in enumerate(ndimage.find_objects(lab))]
    sizes = ndimage.sum(core, lab, range(1, n + 1))
    objs = [(k, s) for k, s in objs if sizes[k - 1] > W * H * 0.0004]
    # дырки внутри букв («В», «Ы», «О») — часть того же фото, а не отдельные рамки
    objs.sort(key=lambda t: -sizes[t[0] - 1])
    groups = []  # [k_parent, slice, [children], filled_mask_crop]
    for k, sl in objs:
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        host = None
        for g in groups:
            gy0, gy1, gx0, gx1 = g[1][0].start, g[1][0].stop, g[1][1].start, g[1][1].stop
            if y0 >= gy0 and y1 <= gy1 and x0 >= gx0 and x1 <= gx1 and g[3][y0 - gy0:y1 - gy0, x0 - gx0:x1 - gx0][lab[y0:y1, x0:x1] == k].mean() > 0.9:
                host = g; break
        if host: host[2].append(k); continue
        if sizes[k - 1] <= W * H * 0.0025: continue
        groups.append([k, sl, [], ndimage.binary_fill_holes(lab[y0:y1, x0:x1] == k)])
    groups.sort(key=lambda g: (g[1][0].start // 40, g[1][1].start))
    out = np.asarray(im).astype(np.float32).copy(); orig = np.asarray(im).astype(np.float32)
    L = orig.mean(axis=2); chroma = orig.max(axis=2) - orig.min(axis=2)
    fi = vi = wi = 0
    for k, s, kids, filled in groups:
        y0, y1, x0, x1 = s[0].start, s[0].stop, s[1].start, s[1].stop
        w, h = x1 - x0, y1 - y0
        big = w * h > W * H * 0.05
        if big and force:
            src = force[vi % len(force)]; vi += 1; fy = force_fy; zm, fxx = force_zoom, force_fx
        elif w / h > 1.25 and big or w / h > 1.6:
            src = wides[wi % len(wides)]; wi += 1; fy = 0.4
        elif big:
            src = vs[vi % len(vs)]; vi += 1; fy = 0.3
        else:
            src = faces[fi % len(faces)]; fi += 1; fy = 0.3
        if not (big and force): zm, fxx = 1.0, 0.5
        pad = 3
        ya, yb, xa, xb = max(0, y0 - pad), min(H, y1 + pad), max(0, x0 - pad), min(W, x1 + pad)
        sub = lab[ya:yb, xa:xb]
        comp = np.isin(sub, [k] + kids)
        ring = ndimage.binary_dilation(comp, iterations=pad) & ~comp
        alpha = comp.astype(np.float32)
        dd = d[ya:yb, xa:xb].astype(np.float32)
        alpha[ring] = np.clip(1 - (dd[ring] - 7) / 45, 0, 1)
        photo = np.asarray(cover_crop(Image.open(src).convert('RGB'), xb - xa, yb - ya, fy, zm, fxx)).astype(np.float32)
        o = orig[ya:yb, xa:xb]
        res = o * (1 - alpha[..., None]) + photo * alpha[..., None]
        # текст, лежащий на фото: тёмный нейтральный → белый, со сглаживанием
        inner = np.zeros_like(comp); inner[y0 - ya:y1 - ya, x0 - xa:x1 - xa] = filled
        inner = ndimage.binary_dilation(inner, iterations=1) & ~comp
        txt = inner & (chroma[ya:yb, xa:xb] < 40)
        t = np.clip((208 - L[ya:yb, xa:xb]) / 175, 0, 1)
        if txt.any():
            tw = (t * txt)[..., None]
            res = np.where(txt[..., None], photo * (1 - tw) + 255 * tw, res)
        out[ya:yb, xa:xb] = res
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)), len(groups)
