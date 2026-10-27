/* ==========================================================================
   PERSONAL.JS — páginas de la web personal
   home (hero líquido + grilla + servicios), portfolio, proyecto, my profile
   Los contenidos salen de /data/projects.js (window.PROJECTS).
   ========================================================================== */
(function () {
  'use strict';

  var SG = window.SG;
  if (!SG) return;
  /* Solo se publica lo terminado: las imágenes marcadas "pendiente" no salen
     en la web, y un proyecto sin ninguna imagen terminada no aparece (ni en
     la grilla, ni en "Next project", ni por su dirección). */
  function done(p) { return (p.images || []).filter(function (img) { return !img.pendiente; }); }
  var P = (window.PROJECTS || []).filter(function (p) { return done(p).length > 0; });
  var esc = SG.esc, asset = SG.asset;
  var gsap = window.gsap;

  /* Un proyecto con página propia (campo "page" en projects.js) se enlaza a
     esa página, que tiene su propia vista previa al compartir. El resto usa
     project.html#slug. */
  function projectUrl(slug) {
    for (var i = 0; i < P.length; i++) {
      if (P[i].slug === slug && P[i].page) return SG.pageUrl(P[i].page);
    }
    return SG.pageUrl('project.html') + '#' + encodeURIComponent(slug);
  }

  function ratio(img) {
    if (img.pendiente) {
      var p = String(img.pendiente).split('/');
      return (parseFloat(p[0]) || 4) / (parseFloat(p[1]) || 3);
    }
    return img.w && img.h ? img.w / img.h : 4 / 3;
  }

  function plate(project, img, i) {
    var n = (i < 9 ? '0' : '') + (i + 1);
    return '<span class="plate" style="--c:' + esc(project.color || '#dcf4fc') + '" role="img" aria-label="' +
      esc('Imagen pendiente de ' + project.title + (img.nota ? ': ' + img.nota : '')) + '">' +
        '<span class="plate__top"><span class="plate__kicker">Pendiente · ' + n + '</span><span class="plate__dot"></span></span>' +
        '<span class="plate__title">' + esc(img.nota || project.title) + '</span>' +
      '</span>';
  }

  function media(project, img, i, o) {
    o = o || {};
    if (img.pendiente) return plate(project, img, i);
    /* video: en la grilla se ve su póster; en la página, el video en silencio
       (se reproduce solo mientras está a la vista; ver initVideos) */
    if (img.video && !o.thumb) {
      return '<video src="' + esc(asset(img.video)) + '"' +
        (img.poster ? ' poster="' + esc(asset(img.poster)) + '"' : '') +
        (img.w ? ' width="' + img.w + '" height="' + img.h + '"' : '') +
        ' muted loop playsinline preload="none"' + (img.controls ? ' controls' : '') +
        ' aria-label="' + esc(img.alt || '') + '" data-autoplay></video>';
    }
    var src = o.thumb && img.thumb ? img.thumb : (img.video ? img.poster : img.src);
    var tag = '<img src="' + esc(asset(src)) + '" alt="' + esc(img.alt || '') + '"' +
      (img.w ? ' width="' + img.w + '" height="' + img.h + '"' : '') +
      ' loading="' + (o.eager ? 'eager' : 'lazy') + '" decoding="async">';
    /* portada: versión vertical opcional para celular (campo "mobile") */
    if (o.eager && img.mobile) {
      tag = '<picture><source media="(max-width: 699px)" srcset="' + esc(asset(img.mobile)) + '">' + tag + '</picture>';
    }
    return tag;
  }

  /* ==========================================================================
     GRILLA (home y portfolio)
     ========================================================================== */
  function renderWorks(grid) {
    if (!grid) return;
    var html = '';
    P.forEach(function (p) {
      done(p).forEach(function (img, i) {
        var first = i === 0;
        html +=
          '<a class="work" data-p="' + esc(p.slug) + '" href="' + projectUrl(p.slug) + '" style="--ar:' + ratio(img).toFixed(4) + '" data-reveal' +
            (first ? ' aria-label="' + esc(p.title + ', ' + p.subtitle) + '"' : ' tabindex="-1" aria-hidden="true"') + '>' +
            '<span class="work__meta">' +
              (first ? '<span class="work__name">' + esc(p.title) + '</span>' : '') +
              '<span class="work__n">' + (i + 1) + '</span>' +
            '</span>' +
            '<span class="work__media">' + media(p, img, i, { thumb: true }) + '</span>' +
          '</a>';
      });
    });
    grid.innerHTML = html;

    /* al pasar el mouse por un proyecto, se apagan los demás */
    if (!matchMedia('(hover: hover)').matches) return;
    var offTimer;
    function on(slug) {
      clearTimeout(offTimer);
      grid.classList.add('is-hover');
      grid.querySelectorAll('.work').forEach(function (w) {
        w.classList.toggle('is-on', w.getAttribute('data-p') === slug);
      });
    }
    function off() {
      clearTimeout(offTimer);
      offTimer = setTimeout(function () { grid.classList.remove('is-hover'); }, 90);
    }
    grid.addEventListener('mouseover', function (e) {
      var w = e.target.closest('.work');
      if (w) on(w.getAttribute('data-p')); else off();
    });
    grid.addEventListener('mouseleave', off);
    grid.addEventListener('focusin', function (e) {
      var w = e.target.closest('.work');
      if (w) on(w.getAttribute('data-p'));
    });
    grid.addEventListener('focusout', off);
  }

  /* ==========================================================================
     HOME
     ========================================================================== */
  function initHome() {
    var fog = document.getElementById('fog');
    var track = document.getElementById('fog-track');
    if (fog && typeof window.initFluidHero === 'function') {
      /* Tu diseño usa 65 Medium (500). El kit emb0tmp solo trae 400 y 700:
         mientras no agregues Medium al proyecto web de Adobe Fonts, se usa 700,
         que es lo más parecido. Cuando lo agregues, se usa 500 solo. */
      var hasMedium = false;
      if (document.fonts && document.fonts.forEach) {
        document.fonts.forEach(function (f) {
          if (/neue-haas-grotesk-display/i.test(f.family) && String(f.weight) === '500') hasMedium = true;
        });
      }
      try {
        /* Ajustes del líquido: los mismos nombres de tu CONFIG original.
           Ej: { textDark: 'INTUITION', textLight: 'STRUCTURE', swirl: 3 } */
        window.initFluidHero(fog, track, {
          weight: hasMedium ? 500 : 700,
          family: '"neue-haas-grotesk-display", "Helvetica Neue", Helvetica, Arial, sans-serif'
        });
      } catch (e) {
        console.error(e);
        fog.classList.add('no-gl');
      }
    }
    renderWorks(document.getElementById('works'));
    SG.activeRows(document.querySelector('.services'), '.svc');
  }

  /* ==========================================================================
     PROYECTO  (project.html#slug)
     ========================================================================== */
  function renderProject() {
    var main = document.getElementById('project');
    if (!main) return;
    var fixed = main.getAttribute('data-project');   /* página propia del proyecto */
    var slug = fixed || decodeURIComponent(location.hash.replace(/^#/, ''));
    var idx = -1;
    P.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx < 0 && !slug && P.length) idx = 0;

    if (idx < 0) {
      document.title = 'Proyecto no encontrado — ' + (window.SITE && SITE.name || 'Stephano Ginocchio');
      main.innerHTML =
        '<section class="p-missing">' +
          '<h1 class="t-h">Este proyecto no existe<br>o cambió de nombre.</h1>' +
          '<p><a class="p-link" href="' + SG.pageUrl('portfolio.html') + '">Ver el portafolio ' + SG.ARROW + '</a></p>' +
        '</section>';
      return;
    }

    var p = P[idx];
    /* los links viejos (project.html#slug) llevan a la página propia si existe */
    if (!fixed && slug && p.page) { location.replace(SG.pageUrl(p.page)); return; }
    var next = P[(idx + 1) % P.length];
    var imgs = done(p);
    var cover = imgs[0], side = imgs[1], rest = imgs.slice(2);
    var name = (window.SITE && SITE.name) || 'Stephano Ginocchio';

    document.title = p.title + ' — ' + name;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', p.title + ': ' + p.subtitle + '. ' + ((p.text || [])[0] || ''));

    var credits = (p.credits || []).map(function (c) {
      return '<div><dt>' + esc(c[0]) + '</dt><dd>' + esc(c[1]) + '</dd></div>';
    }).join('');
    if (p.service) credits = '<div><dt>Servicio</dt><dd>' + esc(p.service) + '</dd></div>' + credits;

    var gallery = p.result ? '' : rest.map(function (img, k) {
      var r = ratio(img);
      return '<figure style="--ar:' + r.toFixed(4) + '" data-reveal>' +
        media(p, img, k + 2) + '</figure>';
    }).join('');

    /* casos con desarrollo: pasos del proceso y bloque de resultado (opcionales) */
    var paras = function (t) { return (Array.isArray(t) ? t : [t]).map(function (x) { return '<p>' + esc(x) + '</p>'; }).join(''); };
    var process = (p.process || []).map(function (s, k) {
      return '<article class="p-step">' +
        '<div class="p-step__text" data-reveal>' +
          '<span class="p-step__n">' + (k < 9 ? '0' : '') + (k + 1) + '</span>' +
          '<h3 class="p-step__title">' + esc(s.title) + '</h3>' +
          '<div class="t-mono">' + paras(s.text || '') + '</div>' +
        '</div>' +
        '<div class="p-step__media" style="--cols:' + (s.cols || 3) + ';--cols-m:' + (s.colsM || 2) + '">' +
          (s.media || []).map(function (m, j) { return fig(p, m, j); }).join('') +
        '</div>' +
      '</article>';
    }).join('');
    var result = p.result
      ? '<section class="p-result" aria-labelledby="p-result-t">' +
          '<div class="p-result__head">' +
            '<h2 class="t-h" id="p-result-t" data-split>' + esc(p.result.title || 'Resultado') + '</h2>' +
            (p.result.text ? '<div class="t-mono" data-reveal>' + paras(p.result.text) + '</div>' : '') +
          '</div>' +
          '<div class="p-result__grid" style="--cols:' + (p.result.cols || 4) + '">' +
            rest.map(function (img, k) { return fig(p, img, k + 2); }).join('') +
          '</div>' +
        '</section>'
      : '';

    main.innerHTML =
      '<section class="p-hero" data-parallax-root>' +
        '<div class="p-hero__media" data-parallax="0.4">' + (cover ? media(p, cover, 0, { eager: true }) : '') + '</div>' +
        '<div class="p-hero__shade"></div>' +
        '<h1 class="p-hero__title t-h" data-split data-parallax-fg>' + esc(p.title) + '<br><em class="p-hero__sub">' + esc(p.subtitle) + '</em></h1>' +
      '</section>' +
      '<section class="p-intro">' +
        '<div class="p-intro__text">' +
          '<h2 class="t-h" data-split>' + (p.statement || []).map(esc).join('<br>') + '</h2>' +
          '<div class="p-intro__copy t-mono" data-reveal>' + (p.text || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
          (credits ? '<dl class="p-meta" data-reveal>' + credits + '</dl>' : '') +
          (p.link ? '<a class="p-link" href="' + esc(SG.pageUrl(p.link.href)) + '" data-reveal>' + esc(p.link.label) + ' ' + SG.ARROW + '</a>' : '') +
        '</div>' +
        (side ? '<figure class="p-intro__media" style="--ar:' + ratio(side).toFixed(4) + '" data-reveal>' + media(p, side, 1) + '</figure>' : '') +
      '</section>' +
      (process ? '<section class="p-process" aria-labelledby="p-process-t">' +
          '<h2 class="t-h p-process__title" id="p-process-t" data-split>' + esc(p.processTitle || 'Proceso') + '</h2>' + process +
        '</section>' : '') +
      result +
      (gallery ? '<section class="p-gallery" aria-label="Imágenes del proyecto">' + gallery + '</section>' : '') +
      (next && next !== p
        ? '<a class="p-next" href="' + projectUrl(next.slug) + '">' +
            '<span class="p-next__label t-label">Next project</span>' +
            '<span class="p-next__title">' + esc(next.title) + ' ' + SG.ARROW + '</span>' +
          '</a>'
        : '');
    initVideos(main);
  }

  /* figura con proporción fija y leyenda opcional (proceso y resultado) */
  function fig(project, img, i) {
    return '<figure class="p-fig" data-reveal>' +
      '<div class="p-fig__media" style="--ar:' + ratio(img).toFixed(4) + '">' + media(project, img, i) + '</div>' +
      (img.cap ? '<figcaption class="p-fig__cap">' + esc(img.cap) + '</figcaption>' : '') +
    '</figure>';
  }

  /* los videos se reproducen en silencio solo mientras se ven; con
     "reducir movimiento" se queda el póster y se reproducen a mano */
  function initVideos(scope) {
    var vids = (scope || document).querySelectorAll('video[data-autoplay]');
    if (!vids.length || SG.reduce || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.getAttribute('data-started')) { v.muted = true; v.setAttribute('data-started', ''); }
          var pr = v.play();
          if (pr && pr.catch) pr.catch(function () {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    vids.forEach(function (v) { io.observe(v); });
  }

  function initProject() {
    renderProject();
    var main = document.getElementById('project');
    if (main && main.getAttribute('data-project')) return;   /* página propia: no depende del # */
    addEventListener('hashchange', function () {
      if (SG.hasGsap) {
        window.ScrollTrigger.getAll().forEach(function (t) {
          if (t.trigger && !document.body.contains(t.trigger)) t.kill();
        });
      }
      renderProject();
      scrollTo(0, 0);
      SG.animate(document.getElementById('project'));
      if (SG.hasGsap) window.ScrollTrigger.refresh();
    });
  }

  /* ==========================================================================
     MY PROFILE
     ========================================================================== */
  function initProfile() {
    if (!SG.hasGsap) return;
    var head = document.querySelector('.pf__head');
    if (head) {
      gsap.to(head, {
        opacity: .18, ease: 'none',
        scrollTrigger: { trigger: '.pf', start: 'top top', end: 'bottom 60%', scrub: true }
      });
    }
  }

  /* ==========================================================================
     ARRANQUE
     ========================================================================== */
  switch (SG.page) {
    case 'home': initHome(); break;
    case 'portfolio': renderWorks(document.getElementById('works')); break;
    case 'project': initProject(); break;
    case 'profile': initProfile(); break;
  }
})();
