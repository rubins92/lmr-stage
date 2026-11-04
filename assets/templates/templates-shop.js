// Витрина шаблонов: фильтры, просмотр разворотов, аналитика кликов в регистрацию
(function () {
  var REG = 'https://fotoklass.lumir.photo/';

  // ── фильтры: аудитория × тип (бесплатные / студия)
  var state = { aud: 'all', kind: 'all' };
  var buttons = document.querySelectorAll('.filters button[data-f]');
  function apply() {
    document.querySelectorAll('.tcard').forEach(function (c) {
      var okA = state.aud === 'all' || c.dataset.aud === state.aud;
      var okK = state.kind === 'all' || c.dataset.kind === state.kind;
      c.hidden = !(okA && okK);
    });
    ['free', 'studio'].forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return;
      sec.hidden = !sec.querySelector('.tcard:not([hidden])');
    });
    buttons.forEach(function (b) {
      var p = b.dataset.f.split(':');
      b.setAttribute('aria-pressed', String(state[p[0]] === p[1]));
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.dataset.f.split(':');
      // повторный клик по «Бесплатные» / «Студия» снимает фильтр
      state[p[0]] = (p[0] === 'kind' && state.kind === p[1]) ? 'all' : p[1];
      apply();
    });
  });

  // ── просмотр шаблона
  var lb = document.getElementById('lb');
  var img = document.getElementById('lb-img');
  var thumbs = document.getElementById('lb-thumbs');
  var cur = null, i = 0;
  function show(n) {
    i = (n + cur.imgs.length) % cur.imgs.length;
    var p = cur.imgs[i];
    img.src = p.src;
    img.alt = 'Шаблон «' + cur.title + '»: ' + p.cap.toLowerCase();
    document.getElementById('lb-count').textContent = (i + 1) + ' из ' + cur.imgs.length;
    thumbs.querySelectorAll('button').forEach(function (b, j) { b.setAttribute('aria-current', String(j === i)); });
    var many = cur.imgs.length > 1;
    document.getElementById('lb-prev').hidden = !many;
    document.getElementById('lb-next').hidden = !many;
  }
  function open(t) {
    cur = t;
    document.getElementById('lb-crumb').textContent = 'Шаблоны / ' + (t.kind === 'free' ? 'Библиотека Lumir' : 'Студия Мироновой') + ' / ' + t.title;
    document.getElementById('lb-title').textContent = t.title;
    document.getElementById('lb-desc').textContent = t.desc;
    document.getElementById('lb-aud').textContent = t.aud;
    document.getElementById('lb-inside').textContent = t.inside;
    var tag = document.getElementById('lb-tag');
    tag.className = t.kind === 'free' ? 'badge-green' : 'badge-gold';
    tag.textContent = t.kind === 'free' ? 'БЕСПЛАТНО' : 'СТУДИЯ МИРОНОВОЙ';
    var cta = document.getElementById('lb-cta');
    cta.innerHTML = t.kind === 'free'
      ? '<a class="btn-main" href="' + REG + '" data-loc="lightbox_free">ИСПОЛЬЗОВАТЬ БЕСПЛАТНО</a><small>Регистрация бесплатная. Lumir соберёт альбом каждому ученику в этом дизайне</small>'
      : '<a class="btn-rent" href="' + REG + '" data-loc="lightbox_rent"><span>Аренда на класс</span><b>390 ₽</b></a><a class="btn-buy" href="' + REG + '" data-loc="lightbox_buy"><span>Купить навсегда</span><b>' + t.buy + '</b></a><small>Шаблон откроется в вашем кабинете Lumir после регистрации</small>';
    bindTrack(cta);
    thumbs.innerHTML = '';
    t.imgs.forEach(function (p, j) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'listitem');
      b.innerHTML = '<img alt="" src="' + p.src + '">' + p.cap;
      b.addEventListener('click', function () { show(j); });
      thumbs.appendChild(b);
    });
    show(0);
    lb.showModal();
    track('template_opened', { template: t.title, kind: t.kind });
  }
  document.querySelectorAll('.tcard-shot').forEach(function (b) {
    b.addEventListener('click', function () { open(JSON.parse(b.dataset.tpl)); });
  });
  document.getElementById('lb-prev').addEventListener('click', function () { show(i - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(i + 1); });
  document.getElementById('lb-close').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });

  // ── аналитика: клики в регистрацию (ссылки остаются чистыми, как на главной)
  function track(name, props) { try { if (window.op) window.op('track', name, props); } catch (e) {} }
  function bindTrack(root) {
    root.querySelectorAll('a[href*="fotoklass.lumir.photo"]').forEach(function (a) {
      a.addEventListener('click', function () {
        track('cta_to_app_clicked', { href: a.href, label: (a.textContent || '').trim().slice(0, 80), location: 'templates_shop_' + (a.dataset.loc || 'other'), template: cur && lb.open ? cur.title : null });
      });
    });
  }
  bindTrack(document);
})();
