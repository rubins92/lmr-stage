// Витрина шаблонов: слайдеры, фильтр, просмотр разворотов, шапка/тема/cookie как на главной, аналитика
(function () {
  var REG = 'https://fotoklass.lumir.photo/';
  function track(name, props) { try { if (window.op) window.op('track', name, props); } catch (e) {} }

  // ── мобильное меню (как на главной)
  var burger = document.getElementById('nav-burger'), overlay = document.getElementById('nav-overlay'), navWrap = document.getElementById('nav');
  if (burger && overlay && navWrap) {
    var setMenu = function (open) {
      overlay.classList.toggle('open', open); navWrap.classList.toggle('menu-open', open);
      document.body.classList.toggle('menu-open', open); document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', String(open)); overlay.setAttribute('aria-hidden', String(!open));
    };
    burger.addEventListener('click', function () { setMenu(!overlay.classList.contains('open')); });
    overlay.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) setMenu(false); });
  }
  // шапка становится плотной при прокрутке
  if (navWrap) {
    var onScroll = function () { navWrap.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // ── тема (ключ тот же, что на главной)
  var tBtn = document.getElementById('theme-toggle'), tIcon = document.getElementById('theme-toggle-icon');
  if (tBtn && tIcon) {
    var cur = function () { return document.documentElement.getAttribute('data-theme') || 'dark'; };
    var setIcon = function () { tIcon.textContent = cur() === 'dark' ? '☀️' : '🌙'; };
    setIcon();
    tBtn.addEventListener('click', function () {
      var next = cur() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('lumir-theme', next); } catch (e) {}
      setIcon();
    });
  }

  // ── cookie (общий ключ с главной)
  (function () {
    var KEY = 'lumir_consent_acknowledged', b = document.getElementById('cookie-banner');
    if (!b) return;
    var seen = null;
    try { seen = localStorage.getItem(KEY); } catch (e) {}
    if (seen || document.cookie.indexOf(KEY + '=') !== -1) return;
    b.removeAttribute('hidden');
    var ok = b.querySelector('.cookie-banner-btn');
    if (ok) ok.addEventListener('click', function () {
      try { localStorage.setItem(KEY, '1'); } catch (e) {}
      document.cookie = KEY + '=1; Path=/; Max-Age=31536000; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
      b.setAttribute('hidden', '');
    });
  })();

  // ── FAQ: один открытый вопрос
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    q.addEventListener('click', function () {
      var open = item.getAttribute('data-open') === 'true';
      faqItems.forEach(function (o) { o.setAttribute('data-open', 'false'); o.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
      item.setAttribute('data-open', String(!open)); q.setAttribute('aria-expanded', String(!open));
    });
  });

  // ── липкая кнопка на телефоне: после первого экрана
  var sticky = document.getElementById('sticky-cta'), hero = document.querySelector('.ts-hero');
  if (sticky && hero) {
    var chk = function () { sticky.classList.toggle('hidden', hero.getBoundingClientRect().bottom > 0); };
    window.addEventListener('scroll', chk, { passive: true }); chk();
  }

  // ── слайдеры: у каждого свои стрелки (в ближайшем блоке автора или секции)
  document.querySelectorAll('[data-slider]').forEach(function (track_) {
    var box = track_.closest('.ts-author') || track_.closest('.ts-sec');
    var btns = box.querySelectorAll('.slider-btn');
    var step = function () { var c = track_.querySelector('.tcard:not([hidden])'); if (!c) return 300; var w = c.getBoundingClientRect().width + 22; return w * Math.max(1, Math.floor(track_.clientWidth / w) - 1); };
    var upd = function () {
      var max = track_.scrollWidth - track_.clientWidth - 2;
      if (btns[0]) btns[0].disabled = track_.scrollLeft <= 2;
      if (btns[1]) btns[1].disabled = track_.scrollLeft >= max;
    };
    btns.forEach(function (b) { b.addEventListener('click', function () { track_.scrollBy({ left: step() * +b.dataset.dir, behavior: 'smooth' }); }); });
    track_.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    track_.addEventListener('keydown', function (e) {
      if (e.target !== track_) return;
      if (e.key === 'ArrowRight') { track_.scrollBy({ left: step(), behavior: 'smooth' }); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { track_.scrollBy({ left: -step(), behavior: 'smooth' }); e.preventDefault(); }
    });
    track_._upd = upd; upd();
  });

  // ── фильтр по аудитории
  var fBtns = document.querySelectorAll('.ts-filters button');
  fBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var aud = b.dataset.aud;
      fBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var paidShown = 0;
      document.querySelectorAll('[data-slider]').forEach(function (sl) {
        var box = sl.closest('.ts-author') || sl.closest('.ts-sec');
        var shown = 0;
        sl.querySelectorAll('.tcard').forEach(function (c) {
          var ok = aud === 'all' || c.dataset.aud === aud || c.dataset.aud === 'all';
          c.hidden = !ok;
          if (ok && !c.classList.contains('tcard-more')) shown++;
        });
        var cnt = box.querySelector('[data-count]'); if (cnt) cnt.textContent = shown;
        if (box.classList.contains('ts-author')) { box.hidden = shown === 0; paidShown += shown; }
        else { var e = box.querySelector('.ts-empty'); if (e) e.hidden = shown > 0; sl.hidden = shown === 0; }
        sl.scrollLeft = 0; if (sl._upd) sl._upd();
      });
      var pe = document.querySelector('#studio .ts-empty'); if (pe) pe.hidden = paidShown > 0;
      track('templates_filter', { aud: aud });
    });
  });

  // ── просмотр шаблона
  var lb = document.getElementById('lb'), img = document.getElementById('lb-img'), thumbs = document.getElementById('lb-thumbs');
  var cur = null, i = 0;
  function show(n) {
    i = (n + cur.imgs.length) % cur.imgs.length;
    var p = cur.imgs[i];
    img.src = p.src;
    img.alt = 'Шаблон «' + cur.title + '»: ' + p.cap.toLowerCase();
    document.getElementById('lb-count').textContent = (i + 1) + ' из ' + cur.imgs.length;
    thumbs.querySelectorAll('button').forEach(function (b, j) { b.setAttribute('aria-current', String(j === i)); if (j === i) b.scrollIntoView({ block: 'nearest', inline: 'nearest' }); });
    var many = cur.imgs.length > 1;
    document.getElementById('lb-prev').style.visibility = many ? '' : 'hidden';
    document.getElementById('lb-next').style.visibility = many ? '' : 'hidden';
    thumbs.hidden = !many;
  }
  function open(t) {
    cur = t;
    var free = t.kind === 'free';
    document.getElementById('lb-crumb').textContent = free ? 'Библиотека Lumir · бесплатно' : t.author + ' · платно';
    document.getElementById('lb-title').textContent = t.title;
    document.getElementById('lb-desc').textContent = t.desc;
    document.getElementById('lb-aud').textContent = t.aud;
    document.getElementById('lb-inside').textContent = t.inside;
    document.getElementById('lb-fmt').textContent = t.fmt || '21×30';
    var tag = document.getElementById('lb-tag');
    tag.className = 'badge ' + (free ? 'badge-free' : 'badge-paid');
    tag.textContent = free ? 'Бесплатно · Lumir' : 'Платно · ' + t.author;
    var cta = document.getElementById('lb-cta');
    cta.innerHTML = free
      ? '<a class="btn btn-primary" href="' + REG + '" data-loc="lightbox_free">ИСПОЛЬЗОВАТЬ БЕСПЛАТНО</a><small>Работаете в редакторе Lumir, файлы дизайна скачать нельзя. Lumir соберёт альбом каждому ученику в этом дизайне</small>'
      : '<a class="tbtn tbtn-rent" href="' + REG + '" data-loc="lightbox_rent"><span>Аренда на класс</span><b>' + t.rent + '</b></a><a class="tbtn tbtn-buy" href="' + REG + '" data-loc="lightbox_buy"><span>Купить навсегда</span><b>' + t.buy + '</b></a><small>Платный дизайн автора. Откроется в вашем кабинете Lumir после регистрации</small>';
    bindTrack(cta);
    thumbs.innerHTML = '';
    t.imgs.forEach(function (p, j) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'listitem');
      b.innerHTML = '<img alt="" src="' + p.src + '">' + p.cap;
      b.addEventListener('click', function () { show(j); });
      thumbs.appendChild(b);
    });
    show(0);
    lb.showModal();
    document.body.style.overflow = 'hidden';
    track('template_opened', { template: t.title, kind: t.kind });
  }
  document.querySelectorAll('.tcard-shot').forEach(function (b) {
    b.addEventListener('click', function () { open(JSON.parse(b.dataset.tpl)); });
  });
  document.getElementById('lb-prev').addEventListener('click', function () { show(i - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(i + 1); });
  document.getElementById('lb-close').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('close', function () { document.body.style.overflow = ''; });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
  // свайп по развороту
  var sx = null;
  var stage = lb.querySelector('.lb-stage');
  stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
  });

  // ── аналитика кликов в регистрацию (ссылки чистые, как на главной)
  function bindTrack(root) {
    root.querySelectorAll('a[href*="fotoklass.lumir.photo"]').forEach(function (a) {
      a.addEventListener('click', function () {
        track('cta_to_app_clicked', { href: a.href, label: (a.textContent || '').trim().slice(0, 80), location: 'templates_shop_' + (a.dataset.loc || (a.closest('.nav-wrap, .nav-overlay') ? 'nav' : a.closest('footer') ? 'footer' : 'other')), template: cur && lb.open ? cur.title : null });
      });
    });
  }
  bindTrack(document);
})();
