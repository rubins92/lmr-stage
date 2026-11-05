# -*- coding: utf-8 -*-
"""Импорт шаблонов студии Мироновой с прода: обложки (превью 1280) + развороты (1920) → assets/mironova, данные → .build/mironova_items.py"""
import sys, glob, os
from PIL import Image
sys.path.insert(0, '.build')
from photos_fill import fill
SRC = sys.argv[1]  # папка mir-prod: compact.txt, list.tsv, raw/, pages/
OUT = 'assets/mironova'
PRICES = {'ABC':950,
'Arrows_21x30':950,
'Black_design_21x30':950,
'Doodle_21x30':1200,
'Exact_21x30':800,
'Freedom_21x30':950,
'Gold_21x30':1100,
'Green':950,
'Like':1100,
'Lux_21x30':1100,
'Mechta_21х30':1300,
'Orange_21x30':700,
'School Bus_21x30':1200,
'The Best_21x30':1200,
'White+Grunge':1100,
'Бамби':950,
'Воздух':1650,
'Воздушный шар_21х30':850,
'Городок_21х30':1617,
'Давид':1950,
'Детство_21x30':850,
'Домики_21х30':1150,
'Золотая пора_23х23':950,
'Кляксы':1350,
'Книги_21х30':1950,
'Контур':1500,
'Кораблики':1250,
'Космос_21х30':2100,
'Круги_21х30':1500,
'Лев 21х30':1250,
'Мрамор_21x30':1750,
'Мышата':1200,
'Непоседы':950,
'Первоклашка 21х30':1200,
'Планета+Детства_21х30':1500,
'Принц_21х30':1800,
'Радость':1100,
'Радуга 21х30':850,
'Радуга 23х23':850,
'Скетч':1850,
'Солнышко_21х30':1800,
'Сплит':1650,
'Штрихи':1550}
# имя в каталоге → (slug, название на витрине, аудитория)
META = {'ABC':('abc','ABC','school4'),
'Arrows_21x30':('arrows','Arrows','school4'),
'Black_design_21x30':('black','Black design','senior'),
'Doodle_21x30':('doodle','Doodle','school4'),
'Exact_21x30':('exact','Exact','senior'),
'Freedom_21x30':('freedom','Freedom','senior'),
'Gold_21x30':('gold','Gold','senior'),
'Green':('green','Green','senior'),
'Like':('like','Like','senior'),
'Lux_21x30':('lux','Lux','senior'),
'Mechta_21х30':('mechta','Мечта','school4'),
'Orange_21x30':('orange','Orange','senior'),
'School Bus_21x30':('school-bus','School Bus','school4'),
'The Best_21x30':('the-best','The Best','senior'),
'White+Grunge':('white-grunge','White Grunge','senior'),
'Бамби':('bambi','Бамби','kids'),
'Воздух':('vozduh','Воздух','school4'),
'Воздушный шар_21х30':('vozdushny-shar','Воздушный шар','school4'),
'Городок_21х30':('gorodok','Городок','school4'),
'Давид':('david','Давид','senior'),
'Детство_21x30':('detstvo','Детство','kids'),
'Домики_21х30':('domiki','Домики','school4'),
'Золотая пора_23х23':('zolotaya-pora','Золотая пора','kids'),
'Кляксы':('klyaksy','Кляксы','school4'),
'Книги_21х30':('knigi','Книги','school4'),
'Контур':('kontur','Контур','senior'),
'Кораблики':('korabliki','Кораблики','kids'),
'Космос_21х30':('kosmos','Космос','kids'),
'Круги_21х30':('krugi','Круги','senior'),
'Лев 21х30':('lev','Лев','kids'),
'Мрамор_21x30':('mramor','Мрамор','senior'),
'Мышата':('myshata','Мышата','kids'),
'Непоседы':('neposedy','Непоседы','kids'),
'Первоклашка 21х30':('pervoklashka','Первоклашка','school4'),
'Планета+Детства_21х30':('planeta-detstva','Планета детства','kids'),
'Принц_21х30':('princ','Принц','kids'),
'Радость':('radost','Радость','kids'),
'Радуга 21х30':('raduga','Радуга','kids'),
'Радуга 23х23':('raduga-23','Радуга','kids'),
'Скетч':('sketch','Скетч','school4'),
'Солнышко_21х30':('solnyshko','Солнышко','kids'),
'Сплит':('split','Сплит','senior'),
'Штрихи':('shtrihi','Штрихи','senior')}
AL = {'kids':'Детский сад','school4':'Начальная школа','senior':'9–11 класс'}
# порядок на витрине: сначала самые яркие, дальше по алфавиту каталога
FIRST = ['planeta-detstva','kosmos','gorodok','knigi','david','mechta','pervoklashka','lev','princ','solnyshko','zolotaya-pora','gold','school-bus','raduga','the-best','vozdushny-shar']

def save(im, path, w, q):
    im = im.convert('RGB')
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(path, 'JPEG', quality=q, optimize=True, progressive=True)

previews = {}
for k, line in enumerate(open(f'{SRC}/list.tsv', encoding='utf-8'), 1):
    previews[line.split('\t')[0]] = glob.glob(f'{SRC}/raw/{k:02d}.*')[0]
for f in glob.glob(f'{OUT}/*.jpg'): os.remove(f)
items = []
for line in open(f'{SRC}/compact.txt', encoding='utf-8'):
    i, nm, sz, uuid, files = line.strip().split('|')
    slug, title, aud = META[nm]
    pages = sorted(glob.glob(f'{SRC}/pages/{int(i):02d}-*'))
    cov, _ = fill(Image.open(previews[nm] if nm in previews else pages[0]), aud, slug + 'c', cover=True)
    w, h = cov.size
    save(cov.crop((w // 2, 0, w, h)), f'{OUT}/mir-{slug}-front.jpg', 600, 82)
    has_cover = nm in previews
    if has_cover: save(cov, f'{OUT}/mir-{slug}-cover.jpg', 1280, 80)
    n = 0
    for p in pages[:5]:
        n += 1; save(fill(Image.open(p), aud, f'{slug}{n}')[0], f'{OUT}/mir-{slug}-s{n}.jpg', 1200, 76)
    items.append((slug, title, aud, AL[aud], sz, f"{PRICES[nm]:,} ₽".replace(',', ' '), has_cover, n))
items.sort(key=lambda t: (FIRST.index(t[0]) if t[0] in FIRST else 99))
with open('.build/mironova_items.py', 'w', encoding='utf-8') as f:
    f.write('# сгенерировано mironova_import.py: slug, title, aud, aud label, format, buy price, has cover, spreads\nITEMS = [\n')
    for t in items: f.write(f' {t!r},\n')
    f.write(']\n')
print(len(items))
