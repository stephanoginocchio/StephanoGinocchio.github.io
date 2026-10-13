/* ==========================================================================
   WHIIM.JS — landing (carrusel, proceso, archivo de carpetas) y página de
   cada boda (whiim/boda.html#slug). Los datos salen de /data/bodas.js.
   ========================================================================== */
(function () {
  'use strict';

  var SG = window.SG;
  if (!SG) return;
  var B = window.BODAS || [];
  var esc = SG.esc, asset = SG.asset;
  var gsap = window.gsap;

  function bodaUrl(slug) { return 'boda.html#' + encodeURIComponent(slug); }

  function picture(o, attrs) {
    if (!o || !o.src) return '';
    return '<img src="' + esc(asset(o.src)) + '" alt="' + esc(o.alt || '') + '"' +
      (o.w ? ' width="' + o.w + '" height="' + o.h + '"' : '') + (attrs || ' loading="lazy" decoding="async"') + '>';
  }
  function ar(o, fallback) { return o && o.w && o.h ? (o.w / o.h).toFixed(4) : fallback; }
  function contactAttrs() {
    var h = SG.whiimHref;
    return h ? ' href="' + esc(h) + '"' + SG.ext(h) : ' href="#"';
  }

  /* ==========================================================================
     LANDING
     ========================================================================== */
  function renderFolders() {
    var ul = document.getElementById('folders');
    if (!ul) return;
    var html = B.map(function (b) {
      return '<li class="fold-item" data-reveal>' +
        '<a class="fold" href="' + bodaUrl(b.slug) + '" aria-label="' + esc(b.pareja + (b.ejemplo ? ' (ejemplo)' : '') + ', ' + b.lugar) + '">' +
          '<span class="fold__tab"></span><span class="fold__back"></span><span class="fold__paper"></span>' +
          '<span class="fold__front"><img src="' + esc(asset(b.portada)) + '" alt="" loading="lazy" decoding="async">' +
            (b.ejemplo ? '<span class="fold__tag">Ejemplo</span>' : '') +
          '</span>' +
        '</a>' +
        '<p class="fold__name">' + esc(b.pareja) + '</p>' +
        '<p class="fold__meta">' + esc([b.lugar, b.fecha].filter(Boolean).join(' · ')) + '</p>' +
      '</li>';
    }).join('');
    /* la última carpeta está vacía: es la de la próxima pareja */
    html += '<li class="fold-item" data-reveal>' +
      '<a class="fold fold--new"' + contactAttrs() + ' aria-label="Su boda: escríbenos">' +
        '<span class="fold__tab"></span><span class="fold__back"></span><span class="fold__paper"></span>' +
        '<span class="fold__front"><span class="fold__plus" aria-hidden="true">+</span></span>' +
      '</a>' +
      '<p class="fold__name">Su boda</p>' +
      '<p class="fold__meta">Escríbenos</p>' +
    '</li>';
    ul.innerHTML = html;
  }

  /* carrusel de beneficios: flechas + arrastrar con el mouse */
  function initCards() {
    var track = document.querySelector('.cards');
    if (!track) return;
    var prev = document.querySelector('[data-cards="prev"]');
    var next = document.querySelector('[data-cards="next"]');
    var smooth = SG.reduce ? 'auto' : 'smooth';

    function step() {
      var c = track.querySelector('.card');
      var gap = parseFloat(getComputedStyle(track).columnGap) || 16;
      return c ? c.getBoundingClientRect().width + gap : 320;
    }
    var raf = 0;
    function update() {
      raf = 0;
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: smooth }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: smooth }); });
    track.addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    update();

    var down = false, moved = false, sx = 0, sl = 0;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
    });
    addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('is-drag'); }
      if (moved) track.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      if (moved) {
        track.classList.remove('is-drag');
        var s = step(), i = Math.round(track.scrollLeft / s);
        track.scrollTo({ left: i * s, behavior: smooth });
      }
    });
    track.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }

  function initLanding() {
    renderFolders();
    initCards();
    SG.activeRows(document.querySelector('.w-steps'), '.step', { fade: 2.6 });
  }

  /* ==========================================================================
     CARPETA DE UNA BODA  (whiim/boda.html#slug)
     ========================================================================== */
  function renderBoda() {
    var main = document.getElementById('boda');
    if (!main) return null;
    var slug = decodeURIComponent(location.hash.replace(/^#/, ''));
    var idx = -1;
    B.forEach(function (b, i) { if (b.slug === slug) idx = i; });
    if (idx < 0 && !slug && B.length) idx = 0;

    if (idx < 0) {
      document.title = 'Carpeta no encontrada — whiim';
      main.innerHTML =
        '<section class="b-missing">' +
          '<h1 class="t-h">Esta carpeta no existe<br>o cambió de nombre.</h1>' +
          '<p><a class="w-btn" href="' + SG.pageUrl('whiim/') + '#archivo">Ver el archivo ' + SG.ARROW + '</a></p>' +
        '</section>';
      return null;
    }

    var b = B[idx];
    var next = B[(idx + 1) % B.length];
    document.title = b.pareja + (b.ejemplo ? ' (ejemplo)' : '') + ' — whiim';
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', b.pareja + ', ' + b.lugar + '. ' + ((b.texto || [])[0] || ''));

    var credits = (b.creditos || []).map(function (c) {
      return '<div><dt>' + esc(c[0]) + '</dt><dd>' + esc(c[1]) + '</dd></div>';
    }).join('');
    var lugarFecha = '<div><dt>Lugar</dt><dd>' + esc(b.lugar) + '</dd></div>' + (b.fecha ? '<div><dt>Fecha</dt><dd>' + esc(b.fecha) + '</dd></div>' : '');

    var inv = b.invitacion || {};
    var invHtml = inv.pantallas && inv.pantallas.length
      ? '<section class="b-inv" aria-labelledby="inv-title">' +
          '<div class="b-sec-head">' +
            '<h2 class="t-h" id="inv-title" data-split>La invitación</h2>' +
            (inv.texto ? '<p class="t-mono" data-reveal>' + esc(inv.texto) + '</p>' : '') +
          '</div>' +
          '<div class="phones" tabindex="0" aria-label="Pantallas de la invitación">' +
            inv.pantallas.map(function (s) {
              return '<figure class="phone" data-reveal>' + picture(s) + '</figure>';
            }).join('') +
          '</div>' +
          (inv.url ? '<p class="b-inv__link"><a class="w-btn" href="' + esc(inv.url) + '" target="_blank" rel="noopener">Abrir la invitación ' + SG.ARROW + '</a></p>' : '') +
        '</section>'
      : '';

    var gal = b.galeria && b.galeria.length
      ? '<section class="b-gal" aria-labelledby="gal-title">' +
          '<div class="b-sec-head"><h2 class="t-h" id="gal-title" data-split>' + esc(b.galeriaTitulo || 'El día') + '</h2></div>' +
          '<div class="b-gal__track" tabindex="0" aria-label="Galería de fotos">' +
            b.galeria.map(function (g) {
              return '<figure style="--ar:' + ar(g, '.6667') + '">' + picture(g) + '</figure>';
            }).join('') +
          '</div>' +
        '</section>'
      : '';

    main.innerHTML =
      '<section class="b-hero" data-parallax-root>' +
        '<div class="b-hero__media" data-parallax="0.4">' + picture(b.hero, ' fetchpriority="high" decoding="async"') + '</div>' +
        '<div class="b-hero__shade"></div>' +
        (b.ejemplo ? '<p class="b-tag">Carpeta de ejemplo · fotos de stock</p>' : '') +
      '</section>' +
      '<section class="b-intro">' +
        '<div class="b-intro__text">' +
          '<h1 class="t-h" data-split>' + (b.titulo || [b.pareja]).map(esc).join('<br>') + '</h1>' +
          '<div class="b-intro__copy t-mono" data-reveal>' + (b.texto || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
          '<dl class="b-meta" data-reveal>' + lugarFecha + credits + '</dl>' +
        '</div>' +
        (b.foto ? '<figure class="b-intro__media" style="--ar:' + ar(b.foto, '1.57') + '" data-reveal>' + picture(b.foto) + '</figure>' : '') +
      '</section>' +
      invHtml +
      gal +
      (next && next !== b
        ? '<a class="b-next" href="' + bodaUrl(next.slug) + '">' +
            '<span class="b-next__label t-label">Siguiente carpeta</span>' +
            '<span class="b-next__title">' + esc(next.pareja) + ' ' + SG.ARROW + '</span>' +
          '</a>'
        : '');

    return main.querySelector('.b-gal');
  }

  /* en escritorio la galería se queda fija y las fotos pasan de lado */
  function initGallery(section) {
    if (!section || !SG.hasGsap) return;
    var track = section.querySelector('.b-gal__track');
    gsap.matchMedia().add('(min-width: 900px) and (hover: hover) and (pointer: fine)', function () {
      section.classList.add('is-pinned');
      function dist() { return Math.max(0, track.scrollWidth - innerWidth); }
      if (dist() < 40) { section.classList.remove('is-pinned'); return; }
      gsap.to(track, {
        x: function () { return -dist(); },
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: function () { return '+=' + dist(); },
          pin: true,
          scrub: .6,
          invalidateOnRefresh: true
        }
      });
      return function () { section.classList.remove('is-pinned'); };
    });
  }

  function initBoda() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    initGallery(renderBoda());
    /* cambiar de carpeta (#slug) recarga la página para empezar limpio */
    addEventListener('hashchange', function () {
      scrollTo(0, 0);
      location.reload();
    });
  }

  /* ==========================================================================
     ARRANQUE
     ========================================================================== */
  if (SG.page === 'whiim') initLanding();
  if (SG.page === 'boda') initBoda();
})();
