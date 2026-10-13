/* ==========================================================================
   SITE.JS — piezas compartidas por todas las páginas
   - menú (web personal) y cabecera de whiim
   - pie de página con el nombre gigante cortado
   - cuadrado-puente de contacto (fijo al borde derecho)
   - animaciones de entrada con GSAP + ScrollTrigger
   Lee los datos de /data/config.js (window.SITE).
   ========================================================================== */
(function () {
  'use strict';

  var SITE = window.SITE || {};
  var WH = SITE.whiim || {};
  var doc = document.documentElement;
  var body = document.body;
  var root = body.getAttribute('data-root') || '';
  var page = body.getAttribute('data-page') || '';
  var isWhiim = body.classList.contains('whiim');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gsap = window.gsap;
  var hasGsap = !!(gsap && window.ScrollTrigger) && !reduce;
  var onFile = location.protocol === 'file:';

  if (hasGsap) gsap.registerPlugin(window.ScrollTrigger);
  else doc.classList.remove('anim');

  /* ---------- utilidades ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* ruta de un archivo del sitio, relativa a la página actual */
  function asset(p) {
    if (!p || /^(https?:|mailto:|tel:|data:|#|\/)/.test(p)) return p;
    return root + p;
  }
  /* ruta de una página. En file:// las carpetas necesitan index.html */
  function pageUrl(p) {
    p = p || '';
    if (onFile && (p === '' || /\/$/.test(p))) p += 'index.html';
    if (p === '') return root || './';
    return asset(p);
  }

  var ARROW = '<svg class="arrow" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.4 9.6 9.4 2.6M3.4 2.6h6v6"/></svg>';
  var CLOSE = '<svg viewBox="0 0 30 30" aria-hidden="true" focusable="false"><path d="M3 3l24 24M27 3 3 27"/></svg>';
  var BACK = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 12H3.5M10 5 3 12l7 7"/></svg>';
  var LOGO_PATHS = '<path d="M726.89,187.69l-24.82,18.27-28.86,21.4c-28.18,20.9-36.55,50.3-52.55,44.24-18.34-6.95-1.23-23.23.87-40.92l-35.75,29.75c-12.62,10.5-27.17,17.62-43.86,17.75-11.19.09-18.87-7.65-19.01-18.76l-1.56-11.19-12.37,9.68c-10.65,8.34-20.06,18.4-32.03,25.17-12.55,7.09-28.63,6.19-41.57.66-18.57-7.94-14.04-29.92-18.23-33.07-5.8-4.35-30.01,13.92-38.99,22.96l-22.08,28.49c-6.46,8.33-13.61,15.69-22.56,20.91-9.67,5.64-21.18,2.07-25.45-8.76-7.9-20,16.1-40.82,29.78-55.49l29.69-31.84c4.62-4.96,6.61-13.81,2.88-19.69-12.5-19.67-68.07,13.78-90.12,35.73l-10.67,10.61-33.93,37.35-31.47,34.41-6.55-.13c-1.38-.03-1.4-4.6-.79-6.06l12.29-29.5c-23.18,18.15-40.19,38.82-70.24,40.55-9.85.57-17.68-4.94-19.84-14.55-3.25-14.47,7.49-24.44,2.53-29.36-1.26-1.25-6.31-.72-7.79.78l-29.57,30.11-16.35,17.25c-11.05,11.66-26.17,15.62-41.63,9.75-12.38-4.71-21.39-16.15-24.48-27.02-4.31-15.18-.56-28.95,8.2-40.51,9.77-12.9,18.64-25.63,25.64-40.11,5.68-11.74.92-22.06,8.01-26.97,16.12-11.16,36.64-18.54,49.21-4.81,4.4,4.81,2.88,9.63-1.3,13.54-18.95,17.73-33.75,39.11-45.22,62.38-5.69,11.55-8.84,25.56-.94,31.32,11.69,8.53,26.15-7.53,37.52-18.38l25.83-24.66c14.25-13.6,41.41-31.95,53.85-21.23,3.26,2.81,4.47,8.89,3.11,13.77l-8.29,29.8c-.63,2.27,1.26,6.98,3.02,8.18,7.78,5.27,39.5-24.04,51.78-36.18l25.36-25.06c7.21-7.12,10.81-15.77,13.97-25.53,4.67-14.43,19.12-16.67,30.97-36l40.84-66.66,25.5-41.89c10.44-17.16,18.74-34.11,25.1-53.18,1.98-5.95,7.23-11.42,11.52-13.34,11.75-5.23,28.69,2.89,34.79,11.55,3.83,5.43.94,13.61-3.87,17.62-10.24,8.52-17.12,19.07-25.85,28.7-11.87,13.1-21.18,26-30.91,40.81l-47,71.52-15.61,23.63c-3.93,5.95-8.42,10.76-8.85,19.21l31.81-19.95c22.54-14.14,60.77-26.44,74.17-4.17,13.24,22.01-15.25,48.74-18.66,58.91-.26.78,3.02,1.08,4.22,1.13,15.98-10.43,29.87-22,44.15-34.65l21.56-23.21c7.19-7.74,14.79-15.14,26.66-14.41,5.3.32,10.49,3.42,13.19,7.54,2.46,3.75,2.66,11.35-.7,15.18l-17.06,19.49c-10.46,11.95-24.25,33.61-16.81,44.99,10.98,16.79,41.82-14.16,57.47-28.15,10.8-9.66,21.52-19.26,27.61-32.56,9.07-19.8,26.78-47.84,47.69-45.22,5.01.63,10.6,4.35,12.13,8.25,2.15,5.47.58,12.14-3.49,16.22l-18.87,18.91c-12.74,12.76-25.51,40.45-15.13,46.7,2.39,1.44,8.77,2.05,11.29.2l30.83-22.6,19.92-13.76c11.56-7.99,22.42-16.55,29.52-29.28l13.02-30.23c2.99-6.95,8.48-11.9,14.74-12.81,7.75-1.12,15.71.89,19.95,8.17,2.26,3.88,1.04,10.38-.64,14.81l-22.13,35.48c.18,1.03.42,2.63.98,2.57l2.9-.3,33.39-29.6c17.09-16.76,50.75-24.26,54.7-6.99,2.17,9.49-2.18,17.57,1.8,21.28,1.14,1.07,5.27.76,6.68-.01l40.61-22.3c10.65-5.85,33.03-10.21,41.99.32,4,4.71,5.76,12.32,3.69,18.53l-6.38,19.1c-1.7,5.1-.84,11.77,2.32,15.73,10.86,13.64,42.05-1.95,59.28-13.01,8.55-5.49,17.69-5.33,24.85,2.8,1.46,1.66,3.52,5.71,3.55,7.94.15,8.8-26.3,18.76-40.46,23.39l-33.61,10.99c-9.88,3.23-20.98,4.9-30.82,1.22-5.3-1.99-7.77-8.8-10.42-13.26-13.39-22.48-3.14-35.86-9.9-41.28-7.92-6.35-24.15,2.6-34.97,10.79l-35.84,27.12c-4.26,3.22-12.47,3.72-17.19,1.9-5.46-2.11-7.56-9.78-5.76-14.76l9.06-25.12c.74-2.04.68-5.58-.39-6.98-1.07-1.4-6.31-3.07-7.76-2Z"/><path d="M636.98,105.84c-5.13,19.38-28.28,44.78-47.29,31.73-11.18-7.67-4.74-35.17,14.46-49.14,5.12-3.72,12.05-5.35,17.97-4.38,10.72,1.75,17.65,11.22,14.86,21.78Z"/><path d="M494.34,161.03c-6.81,3.07-17.2.64-19.43-6.44-4.63-14.69,4.04-32.91,18.1-38,8.35-3.02,16.96.4,21.46,6.09,10.72,13.54-3.84,31-20.13,38.35Z"/>';

  function logo(cls, label) {
    var a11y = label ? ' role="img" aria-label="' + esc(label) + '"' : ' aria-hidden="true" focusable="false"';
    return '<svg class="' + (cls || '') + '" viewBox="0 0 945 347"' + a11y + '>' + LOGO_PATHS + '</svg>';
  }

  /* contacto */
  var mailHref = SITE.email ? 'mailto:' + SITE.email : '';
  var whiimHref = WH.whatsapp
    ? 'https://wa.me/' + String(WH.whatsapp).replace(/\D/g, '') + '?text=' + encodeURIComponent(WH.whatsappText || '')
    : (WH.instagramDM || WH.instagram || '');
  var whiimLabel = WH.whatsapp ? 'WhatsApp' : (WH.handle || '@whiim__');

  function ext(href) { return /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''; }

  /* ==========================================================================
     CABECERA
     ========================================================================== */
  function renderHeader() {
    var slot = document.querySelector('[data-header]');
    if (!slot) return;

    if (!isWhiim) {
      var cur = function (p) { return page === p ? ' aria-current="page"' : ''; };
      slot.outerHTML =
        '<header class="nav" id="top">' +
          '<a class="nav__link" href="' + pageUrl('') + '"' + cur('home') + '>' + esc(SITE.name || 'Stephano Ginocchio') + '</a>' +
          '<a class="nav__link nav__link--hide-m" href="' + pageUrl('portfolio.html') + '"' + cur('portfolio') + '>Portfolio</a>' +
          '<a class="nav__link nav__link--hide-m" href="' + pageUrl('profile.html') + '"' + cur('profile') + '>My Profile</a>' +
          '<a class="nav__logo" href="' + pageUrl('whiim/') + '" aria-label="whiim, invitaciones web de boda">' + logo('', '') + '</a>' +
          (mailHref
            ? '<a class="nav__link nav__link--hide-m nav__mail" href="' + mailHref + '" title="Copiar correo">' +
                '<span class="sr-only">Email me (copiar correo)</span>' +
                '<span class="roll" aria-hidden="true">' + rollWord('Email me', 'roll__a') + rollWord('Copied', 'roll__b') + '</span>' +
              '</a>'
            : '<span></span>') +
          '<button class="nav__menu" type="button" aria-expanded="false" aria-controls="menu">Menu</button>' +
        '</header>' +
        '<div class="menu" id="menu" hidden role="dialog" aria-modal="true" aria-label="Menú">' +
          '<div class="menu__top">' +
            '<a class="nav__link" href="' + pageUrl('') + '">' + esc(SITE.name || 'Stephano Ginocchio') + '</a>' +
            '<button class="menu__close" type="button">Cerrar</button>' +
          '</div>' +
          '<nav class="menu__list" aria-label="Principal">' +
            '<a href="' + pageUrl('') + '">Home</a>' +
            '<a href="' + pageUrl('portfolio.html') + '">Portfolio</a>' +
            '<a href="' + pageUrl('profile.html') + '">My Profile</a>' +
            '<a href="' + pageUrl('whiim/') + '">whiim ' + ARROW + '</a>' +
            (mailHref ? '<a href="' + mailHref + '">Email me ' + ARROW + '</a>' : '') +
          '</nav>' +
          '<div class="menu__foot"><span>' + esc(SITE.location || '') + '</span>' +
            (SITE.instagram ? '<a href="' + esc(SITE.instagram) + '"' + ext(SITE.instagram) + '>Instagram</a>' : '') +
          '</div>' +
        '</div>';
      var live = document.createElement('p');
      live.className = 'sr-only';
      live.id = 'copy-status';
      live.setAttribute('role', 'status');
      body.appendChild(live);
      initMenu();
      initCopyMail();
      return;
    }

    var boda = page === 'boda';
    var home = pageUrl('');
    slot.outerHTML =
      '<header class="wh-head' + (boda ? ' wh-head--boda' : '') + '" id="top">' +
        '<div class="wh-head__bg" aria-hidden="true"></div>' +
        (boda ? '' :
          '<a class="wh-bridge" href="' + home + '"><span class="wh-bridge__name">' + esc(SITE.name || 'Stephano Ginocchio') + '</span><span class="wh-bridge__home">Home ' + ARROW + '</span></a>' +
          '<a class="wh-back" href="' + home + '" aria-label="Volver">' + BACK + '</a>') +
        '<a class="wh-logo" href="' + (boda ? pageUrl('whiim/') : '#top') + '">' + logo('', 'whiim') + '</a>' +
        (boda ? '<a class="wh-close" href="' + pageUrl('whiim/') + '#archivo" aria-label="Cerrar y volver al archivo">' + CLOSE + '</a>' : '') +
      '</header>';
    initWhiimHead();
  }

  /* cabecera de whiim: se acopla arriba al bajar; la flecha del celular vuelve atrás */
  function initWhiimHead() {
    var head = document.querySelector('.wh-head');
    if (!head) return;
    var raf = 0;
    function update() {
      raf = 0;
      head.classList.toggle('is-docked', (window.scrollY || window.pageYOffset) > 40);
    }
    addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    update();

    var top = head.querySelector('.wh-logo[href="#top"]');
    if (top) top.addEventListener('click', function (e) {
      e.preventDefault();
      scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });

    /* si vienes de otra página del sitio, la flecha hace lo mismo que el botón atrás */
    var back = head.querySelector('.wh-back');
    if (back) back.addEventListener('click', function (e) {
      var ref = document.referrer;
      if (ref && location.origin !== 'null' && ref.indexOf(location.origin) === 0 && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    });
  }

  /* palabra partida en letras para la animación de "Email me" → "Copied" */
  function rollWord(word, cls) {
    return '<span class="' + cls + '">' + word.split('').map(function (ch, i) {
      return '<span class="ch" style="--i:' + i + '">' + (ch === ' ' ? '&nbsp;' : esc(ch)) + '</span>';
    }).join('') + '</span>';
  }

  /* "Email me" copia el correo y las letras giran a "Copied" en azul hielo */
  function copyText(text) {
    function legacy() {
      return new Promise(function (ok, fail) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
        body.appendChild(ta);
        ta.select();
        var done = false;
        try { done = document.execCommand('copy'); } catch (e) { /* nada */ }
        ta.remove();
        if (done) ok(); else fail();
      });
    }
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(legacy);
    }
    return legacy();
  }

  function initCopyMail() {
    var a = document.querySelector('.nav__mail');
    if (!a || !SITE.email) return;
    var status = document.getElementById('copy-status');
    var timer;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      copyText(SITE.email).then(function () {
        clearTimeout(timer);
        a.classList.remove('is-copied');
        void a.offsetWidth;                         // reinicia el brillo si haces clic otra vez
        a.classList.add('is-copied');
        if (status) status.textContent = 'Correo copiado: ' + SITE.email;
        timer = setTimeout(function () {
          a.classList.remove('is-copied');
          if (status) status.textContent = '';
        }, 2400);
      }, function () {
        location.href = a.href;                     // si no se puede copiar, abre el correo
      });
    });
  }

  /* menú del celular */
  function initMenu() {
    var btn = document.querySelector('.nav__menu');
    var menu = document.getElementById('menu');
    if (!btn || !menu) return;
    var close = menu.querySelector('.menu__close');
    var links = menu.querySelectorAll('.menu__list a');

    function open() {
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      doc.style.overflow = 'hidden';
      if (hasGsap) {
        gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: .35, ease: 'power2.out' });
        gsap.fromTo(links, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .8, ease: 'expo.out', stagger: .05, delay: .05 });
      }
      (links[0] || close).focus();
    }
    function shut() {
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      doc.style.overflow = '';
      btn.focus();
    }
    btn.addEventListener('click', open);
    close.addEventListener('click', shut);
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') shut();
      if (e.key === 'Tab') {                       // el foco no sale del menú
        var f = menu.querySelectorAll('a, button');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    addEventListener('resize', function () { if (!menu.hidden && innerWidth >= 760) shut(); });
  }

  /* ==========================================================================
     PIE DE PÁGINA
     ========================================================================== */
  function renderFooter() {
    var slot = document.querySelector('[data-footer]');
    if (!slot) return;
    var year = new Date().getFullYear();
    var name = SITE.name || 'Stephano Ginocchio';
    var bridge, contact, links, social, legal, locLabel, topLabel;

    if (!isWhiim) {
      bridge =
        '<a class="foot__bridge" href="' + pageUrl('whiim/') + '" aria-label="whiim: wedding cards and more">' +
          logo('logo', '') +
          '<span class="foot__bridge-sub">wedding cards &amp; more ' + ARROW + '</span>' +
        '</a>';
      contact =
        '<p class="foot__avail">Available for<br>selected projects</p>' +
        (mailHref ? '<p class="foot__write">Write directly to:</p><a class="foot__mail" href="' + mailHref + '">' + esc(SITE.email) + '</a>' : '');
      links = [
        ['Home', pageUrl('')],
        ['Portfolio', pageUrl('portfolio.html')],
        ['My Profile', pageUrl('profile.html')],
        ['whiim', pageUrl('whiim/'), true],
        mailHref ? ['Contact', mailHref] : null
      ];
      social = [['Instagram', SITE.instagram], ['Behance', SITE.behance], ['LinkedIn', SITE.linkedin]];
      legal = '© ' + esc(name) + ' ' + year;
      locLabel = 'Location';
      topLabel = 'Back to top';
    } else {
      bridge =
        '<a class="foot__bridge foot__bridge--sg" href="' + pageUrl('') + '">' +
          '<span class="wh-bridge__name">' + esc(name) + '</span>' +
          '<span class="wh-bridge__home">Home ' + ARROW + '</span>' +
        '</a>';
      contact =
        '<p class="foot__avail">Invitaciones de boda<br>diseñadas a medida</p>' +
        (whiimHref ? '<p class="foot__write">Escríbenos directo:</p><a class="foot__mail" href="' + esc(whiimHref) + '"' + ext(whiimHref) + '>' + esc(whiimLabel) + '</a>' : '');
      links = [
        ['Inicio', pageUrl('whiim/')],
        ['Proceso', pageUrl('whiim/') + '#proceso'],
        ['Archivo', pageUrl('whiim/') + '#archivo'],
        [name, pageUrl(''), true]
      ];
      social = [['Instagram', WH.instagram], ['TikTok', WH.tiktok]];
      legal = '© whiim ' + year + ' · invitaciones firmadas por ' + esc(name);
      locLabel = 'Ubicación';
      topLabel = 'Volver arriba';
    }

    var linkHtml = links.filter(Boolean).map(function (l) {
      return '<a href="' + esc(l[1]) + '">' + esc(l[0]) + (l[2] ? ' ' + ARROW : '') + '</a>';
    }).join('');
    var socialHtml = social.filter(function (s) { return s[1]; }).map(function (s) {
      return '<a href="' + esc(s[1]) + '"' + ext(s[1]) + '>' + esc(s[0]) + '</a>';
    }).join('');

    slot.outerHTML =
      '<footer class="foot" id="contacto">' +
        '<div class="foot__band">' + bridge + '<div class="foot__contact">' + contact + '</div></div>' +
        '<div class="foot__name" aria-hidden="true"><span class="foot__name-in">' + esc(name).replace(' ', '  ') + '</span></div>' +
        '<div class="foot__base">' +
          '<div class="foot__col foot__col--loc"><h2>' + locLabel + '</h2><p>' + esc(SITE.location || '') + '</p></div>' +
          '<nav class="foot__col foot__links" aria-label="' + (isWhiim ? 'Enlaces' : 'Links') + '">' + linkHtml + '</nav>' +
          '<div class="foot__col foot__links">' + socialHtml + '</div>' +
          '<p class="foot__legal">' + legal + '</p>' +
          '<p class="foot__legal foot__legal--right"><a class="foot__top" href="#top">' + topLabel + ' ↑</a></p>' +
        '</div>' +
      '</footer>';

    var top = document.querySelector('.foot__top');
    if (top) top.addEventListener('click', function (e) {
      e.preventDefault();
      scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* el nombre gigante ocupa todo el ancho y se corta un poco antes de la línea base */
  var measureCtx;
  function fitName() {
    var box = document.querySelector('.foot__name');
    if (!box) return;
    var span = box.firstElementChild;
    var family = getComputedStyle(span).fontFamily;
    measureCtx = measureCtx || document.createElement('canvas').getContext('2d');
    var c = measureCtx;
    c.font = '700 100px ' + family;
    var text = span.textContent;
    var m = c.measureText(text);
    var width = m.width - 1.2 * text.length;            // letter-spacing -0.012em
    var cap = c.measureText('H').actualBoundingBoxAscent || 72;
    var asc = m.fontBoundingBoxAscent || 95;
    var desc = m.fontBoundingBoxDescent || 25;
    var fs = box.clientWidth / width * 100;
    var k = fs / 100;
    var baseline = ((100 - asc - desc) / 2 + asc) * k;  // con line-height: 1
    var capPx = cap * k;
    var gap = capPx * .2;
    box.style.setProperty('--fs', fs.toFixed(2) + 'px');
    box.style.setProperty('--top', (gap + capPx - baseline).toFixed(2) + 'px');
    box.style.setProperty('--h', (gap + capPx * .9).toFixed(2) + 'px');
  }

  /* ==========================================================================
     CUADRADO-PUENTE
     ========================================================================== */
  function renderBridge() {
    if (body.hasAttribute('data-no-bridge')) return;
    var href = isWhiim ? whiimHref : (mailHref ? mailHref + '?subject=' + encodeURIComponent('Proyecto') : '');
    if (!href) return;
    var label = isWhiim ? 'Escríbenos' : 'Contact me';
    var a = document.createElement('a');
    a.className = 'bridge';
    a.href = href;
    if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    a.innerHTML = '<span class="bridge__label">' + label + '</span><span class="bridge__icon">' + ARROW + '</span>';
    a.setAttribute('aria-label', label);
    body.appendChild(a);

    /* se despliega solo cuando llegas al pie de página */
    var foot = document.querySelector('.foot');
    if (foot && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        a.classList.toggle('is-open', en[0].isIntersecting);
      }, { rootMargin: '0px 0px -20% 0px' }).observe(foot);
    }
    /* se esconde mientras el menú del celular está abierto */
    var menu = document.getElementById('menu');
    if (menu) new MutationObserver(function () { a.classList.toggle('is-hidden', !menu.hidden); })
      .observe(menu, { attributes: true, attributeFilter: ['hidden'] });
  }

  /* botones de contacto dentro de las páginas: <a data-contact> */
  function fillContactLinks() {
    document.querySelectorAll('[data-contact]').forEach(function (a) {
      var href = isWhiim ? whiimHref : mailHref;
      if (!href) { a.hidden = true; return; }
      a.href = href;
      if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    });
    document.querySelectorAll('[data-logo]').forEach(function (el) {
      el.innerHTML = logo(el.getAttribute('data-logo-class') || '', el.getAttribute('data-logo') || '');
    });
  }

  /* ==========================================================================
     ANIMACIONES
     ========================================================================== */
  /* parte los títulos por <br> en líneas con máscara */
  function splitLines(el) {
    if (el.__split) return;
    el.__split = true;
    var parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map(function (p) {
      return '<span class="line"><span>' + p.trim() + '</span></span>';
    }).join('');
    el.classList.add('is-split');
  }

  function initAnimations(scope) {
    scope = scope || document;
    scope.querySelectorAll('[data-split]').forEach(splitLines);
    if (!hasGsap) return;
    var ST = window.ScrollTrigger;

    scope.querySelectorAll('[data-split]').forEach(function (el) {
      var lines = el.querySelectorAll('.line > span');
      gsap.fromTo(lines, { yPercent: 105, y: 0 }, {
        yPercent: 0, y: 0, duration: 1.15, ease: 'expo.out', stagger: .09,
        delay: parseFloat(el.getAttribute('data-delay')) || 0,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });

    var reveal = Array.prototype.slice.call(scope.querySelectorAll('[data-reveal]'));
    if (reveal.length) {
      ST.batch(reveal, {
        start: 'top 92%',
        once: true,
        onEnter: function (els) {
          gsap.fromTo(els, { opacity: 0, y: 26 }, {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: .07, overwrite: true
          });
        }
      });
    }

    initParallax(scope);
  }

  /* ==========================================================================
     PARALLAX DE LOS HEROS
     En el HTML:
       data-parallax-root      → el hero (la "ventana" que recorta)
       data-parallax="0.4"     → el fondo baja más lento que la página
                                 (0.4 = recorre el 40 % de su alto mientras el hero sale)
       data-parallax-fg        → el texto encima sube más rápido y se desvanece
       data-parallax-fg-desk   → igual, pero solo con mouse
       data-parallax-trigger   → (opcional) otro elemento marca el recorrido
       data-parallax-touch     → (opcional) en celular empieza en otro punto
                                 (home: "bottom bottom", cuando termina la marea)
     ========================================================================== */
  var isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches;

  function initParallax(scope) {
    scope.querySelectorAll('[data-parallax-root]').forEach(function (root) {
      root.querySelectorAll('[data-parallax]').forEach(function (el) {
        var k = parseFloat(el.getAttribute('data-parallax')) || .4;
        var sel = el.getAttribute('data-parallax-trigger');
        var trig = (sel && document.querySelector(sel)) || root;
        var start = (isTouch && el.getAttribute('data-parallax-touch')) || 0;
        gsap.fromTo(el, { yPercent: 0 }, {
          yPercent: k * 100,
          ease: 'none',
          scrollTrigger: { trigger: trig, start: start, end: 'bottom top', scrub: true, invalidateOnRefresh: true }
        });
      });

      root.querySelectorAll('[data-parallax-fg]').forEach(function (el) {
        if (isTouch && el.hasAttribute('data-parallax-fg-desk')) return;
        gsap.fromTo(el, { y: 0, opacity: 1 }, {
          y: function () { return -root.offsetHeight * .2; },
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 0, end: 'bottom 30%', scrub: true, invalidateOnRefresh: true }
        });
      });
    });
  }

  function initFooterMotion() {
    var box = document.querySelector('.foot__name');
    if (!box || !hasGsap) return;
    gsap.fromTo(box.firstElementChild, { yPercent: 62 }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom 72%', scrub: .6 }
    });
  }

  /* ==========================================================================
     FILAS QUE SE ENCIENDEN (servicios, proceso de whiim): la más cercana al centro de pantalla
     ========================================================================== */
  /* opts.fade: además pone --d (0 en el centro, 1 lejos) para apagar las filas lejanas */
  function activeRows(container, sel, opts) {
    if (!container) return;
    var rows = Array.prototype.slice.call(container.querySelectorAll(sel));
    if (!rows.length) return;
    var fade = opts && opts.fade;
    var raf = 0;
    function update() {
      raf = 0;
      var mid = innerHeight / 2, best = null, bd = Infinity;
      rows.forEach(function (r) {
        var b = r.getBoundingClientRect();
        var d = Math.abs(b.top + b.height / 2 - mid);
        if (d < bd) { bd = d; best = r; }
        if (fade) r.style.setProperty('--d', Math.min(1, Math.max(0, (d - b.height * .5) / (b.height * fade))).toFixed(3));
      });
      rows.forEach(function (r) { r.classList.toggle('is-on', r === best); });
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    update();
  }

  /* ==========================================================================
     ARRANQUE
     ========================================================================== */
  renderHeader();
  renderFooter();
  fillContactLinks();
  renderBridge();
  fitName();

  var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  fontsReady.then(function () {
    fitName();
    if (hasGsap) window.ScrollTrigger.refresh();
  });
  var rt;
  addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(fitName, 120);
  });

  /* API para las páginas (personal.js / whiim.js) */
  window.SG = {
    root: root, page: page, isWhiim: isWhiim, reduce: reduce, hasGsap: hasGsap,
    esc: esc, asset: asset, pageUrl: pageUrl, logo: logo,
    ARROW: ARROW, mailHref: mailHref, whiimHref: whiimHref, ext: ext,
    animate: initAnimations,
    activeRows: activeRows,
    ready: function (fn) { fontsReady.then(fn); }
  };

  /* las páginas registran su contenido antes; aquí se animan */
  document.addEventListener('DOMContentLoaded', function () {
    initAnimations(document);
    initFooterMotion();
    window.__sgReady = true;
  });
})();
