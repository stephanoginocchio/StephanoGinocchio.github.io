/* ==========================================================================
   HERO LÍQUIDO — Intuition / Structure  (tu código original, como módulo)
   Uso:  initFluidHero(seccion, contenedorDeLaMarea, { textDark: 'INTUITION', ... })
   Los ajustes (CONFIG) son los mismos de tu archivo; puedes pasarlos como
   tercer parámetro desde personal.js sin tocar este archivo.
   Cambios respecto al original:
   - recibe la sección y el contenedor por parámetro (antes buscaba #fog)
   - la marea del celular tiene en cuenta que la sección se pega bajo el menú
   - arreglo: el loop ya no arranca antes de construir el texto. Con la fuente
     de Adobe Fonts (que tarda en llegar) el loop se caía y el líquido
     quedaba congelado.
   ========================================================================== */
window.initFluidHero = function (section, track, overrides) {
  /* ==========================================================
     AJUSTES
     ========================================================== */
  const CONFIG = Object.assign({
    textDark: 'INTUITION',     // lo que se ve primero (capa oscura)
    textLight: 'STRUCTURE',    // lo que revela el líquido (capa clara)
    gap: 0.28,                 // espacio entre repeticiones de la palabra, en em
    weight: 500,               // 65 Medium
    family: '"Neue Haas Grotesk Display Pro", "neue-haas-grotesk-display", "Helvetica Neue", Helvetica, Arial, sans-serif',
    tracking: -0.01,           // em
    lineHeight: 0.8,           // distancia entre filas, en em
    rows: 4,                   // filas visibles en pantallas horizontales

    fogDark: 0.18,             // niebla en la capa oscura (la base)
    fogLight: 0.5,             // niebla en la capa clara que revela el fluido (0 = nítida)
    rim: 0.55,                 // relieve interno de la letra en la capa oscura (0–1)

    /* fluido */
    brush: 0.06,               // grosor del rastro del cursor (fracción del lado corto)
    drop: 0.12,                // tamaño de la gota al tocar o hacer clic
    life: 4.5,                 // segundos hasta que el tinte se evapora del todo (~3.8s visible)
    push: 0.25,                // cuánto arrastra el cursor al fluido (fracción de su velocidad)
    swirl: 3,                  // remolinos: más alto = más rizos y vórtices
    viscosity: 1.2,            // cuánto tarda el fluido en calmarse (más alto = se frena antes)

    /* celular: la marea */
    tideDesktop: false,        // true = la marea también sube con el scroll en escritorio
  }, overrides || {});

  const canvas  = section.querySelector('canvas');
  const reduce  = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touchUI = matchMedia('(hover: none), (pointer: coarse)').matches;
  const tideOn  = matchMedia('(hover: none) and (pointer: coarse)').matches || CONFIG.tideDesktop;

  const attrs = { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'high-performance' };
  let gl = canvas.getContext('webgl2', attrs);
  const isGL2 = !!gl;
  if (!gl) gl = canvas.getContext('webgl', attrs);
  if (!gl) { section.classList.add('no-gl'); return; }

  /* ---------- texturas de coma flotante para el fluido ---------- */
  const FLOAT = (() => {
    let internal, type;
    if (isGL2){
      gl.getExtension('EXT_color_buffer_float');
      gl.getExtension('EXT_color_buffer_half_float');
      internal = gl.RGBA16F; type = gl.HALF_FLOAT;
    } else {
      const hf = gl.getExtension('OES_texture_half_float');
      if (!hf || !gl.getExtension('OES_texture_half_float_linear')) return null;
      gl.getExtension('EXT_color_buffer_half_float');
      internal = gl.RGBA; type = hf.HALF_FLOAT_OES;
    }
    // ¿se puede renderizar en este formato?
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, 4, 4, 0, gl.RGBA, type, null);
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
    const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(fb); gl.deleteTexture(t);
    return ok ? { internal, type } : null;
  })();

  /* ==========================================================
     SHADERS
     ========================================================== */
  const NOISE = `
    float hash(vec2 p){
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3. - 2. * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
                 mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
    }
    float fbm(vec2 p){
      float v = 0., a = .5;
      for (int i = 0; i < 4; i++){
        v += a * noise(p);
        p = p * 2.03 + vec2(17.1, 9.2);
        a *= .5;
      }
      return v;
    }`;

  /* ---------- imagen final ---------- */
  const VS_MAIN = `
    attribute vec2 p;
    varying vec2 vUv;    // 0–1, y hacia abajo (como el DOM)
    varying vec2 vTex;   // 0–1, y hacia arriba (como las texturas de WebGL)
    void main(){
      vUv  = vec2(p.x * .5 + .5, .5 - p.y * .5);
      vTex = p * .5 + .5;
      gl_Position = vec4(p, 0., 1.);
    }`;

  const FS_MAIN = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vTex;

    uniform sampler2D uSharp, uSharpB;   // texto casi nítido: capa oscura / capa clara
    uniform sampler2D uBlur,  uBlurB;    // RGBA = 4 niveles de desenfoque de cada texto
    uniform float uTide, uWave;          // marea (celular): altura de la superficie y oleaje, px CSS
    uniform sampler2D uDye;     // tinte del fluido (cuánto se revela la capa clara)
    uniform vec2  uRes, uPad, uTexCss;
    uniform float uEm, uTime, uRim, uFogDark, uFogLight;
    uniform vec3  uRows;        // tope de la primera fila, paso entre filas, alto de mayúscula
    uniform vec3  cPale, cBlue, cDark;
    ${NOISE}

    /* degradado cíclico: hielo → azul → oscuro → azul → hielo.
       Capa clara lee [0, .5], capa oscura [.5, 1]. En la orilla del fluido el filo
       cae en el oscuro: letra con contorno negro y relleno azul. */
    vec3 ramp(float s){
      float q = fract(s) * 4.;
      vec3 c = mix(cPale, cBlue, clamp(q,      0., 1.));
      c = mix(c, cDark, clamp(q - 1., 0., 1.));
      c = mix(c, cBlue, clamp(q - 2., 0., 1.));
      c = mix(c, cPale, clamp(q - 3., 0., 1.));
      return c;
    }

    float fogField(vec2 css, float amount){
      vec2 p = css / uEm;
      float t = uTime;
      float n = fbm(p * .6 + vec2(t * .22, -t * .03));
      n = mix(n, fbm(p * 1.2 + vec2(-t * .06, t * .08) + 7.3), .35);
      float edge = abs(css.x / uRes.x - .5) * 2.;
      n += .16 * edge * edge;
      float th = mix(1.0, .41, amount);
      return smoothstep(th - .04, th + .11, n) * smoothstep(0., .25, amount);
    }

    float lean(vec2 css){
      float u = fract((css.y - uRows.x) / uRows.y);
      float k = uRows.z / uRows.y;
      float tri = u < k ? (.5 - u / k) : (-.5 + (u - k) / (1. - k));
      float amt = smoothstep(.42, .62, fbm(css / uEm * .45 + vec2(uTime * .12, uTime * .05) + 3.1));
      return amt * .24 * tri * uRows.z;
    }

    void main(){
      vec2 css = vUv * uRes;

      /* cuánto se revela la capa clara: tinte del fluido + un poco de ruido en la orilla */
      vec2 wq   = css / uEm * .9 + vec2(uTime * .15, -uTime * .1);
      vec2 warp = (vec2(noise(wq), noise(wq + 5.2)) - .5) * uEm * .12 / uRes;   // ondulación suave, sin serrucho
      float dye = texture2D(uDye, vTex + vec2(warp.x, -warp.y)).r;
      float r   = smoothstep(.15, .21, dye);          // borde definido, sin zonas a medio revelar

      /* marea: debajo de la superficie se ve la capa clara. El oleaje crece al scrollear rápido */
      float ys = uTide + uWave * ((noise(vec2(css.x / uEm * 1.4 + uTime * .5, uTime * .3)) - .5) * 2.
                                 + .45 * sin(css.x / uEm * 2.3 - uTime * 1.9));
      float ew = uEm * .012;
      r = max(r, smoothstep(ys - ew, ys + ew, css.y));
      float dark   = 1. - r;
      float offset = .5 * dark;
      float trans  = sin(3.14159 * r);

      vec2 tuv = (css - vec2(lean(css), 0.) + uPad) / uTexCss;
      float f  = fogField(css, mix(uFogDark, uFogLight, r));
      float kk = smoothstep(.35, .65, r);            // qué palabra se lee: la oscura o la clara
      float a0 = mix(texture2D(uSharp, tuv).r, texture2D(uSharpB, tuv).r, kk);
      vec4  bl = mix(texture2D(uBlur, tuv), texture2D(uBlurB, tuv), kk);

      float b = f * 4.;
      float a = a0;
      a = mix(a, bl.r, clamp(b,      0., 1.));
      a = mix(a, bl.g, clamp(b - 1., 0., 1.));
      a = mix(a, bl.b, clamp(b - 2., 0., 1.));
      a = mix(a, bl.a, clamp(b - 3., 0., 1.));
      a = mix(a, bl.g, .5 * trans);

      float melt = smoothstep(0., .4, f);
      float g    = smoothstep(.35, .8, f);
      float c    = mix(.46, .36, melt) - .09 * dark;
      float w    = mix(.06, .32, trans);
      float lo   = mix(c - w, .05, g);
      float hi   = mix(c + w, .85, g);
      float v    = smoothstep(lo, hi, a);
      v *= mix(1., .56, g);

      float rim = smoothstep(.3, .98, bl.g);
      v *= mix(1., .5 + .5 * rim, uRim * dark * (1. - f));

      vec3 col = ramp(offset + v * .5);
      float luma = dot(col, vec3(.299, .587, .114));
      col = mix(col, vec3(luma), g * g * .15);

      float halo = smoothstep(.04, .55, bl.b) * (1. - smoothstep(0., .5, v));
      col = mix(col, cBlue, .4 * halo * r * (1. - g));
      col *= 1. - .5 * halo * dark;
      col += (hash(css + fract(uTime)) - .5) / 255.;
      gl_FragColor = vec4(col, 1.);
    }`;

  /* ---------- fluido (Stable Fluids, en la línea de Jos Stam / Pavel Dobryakov) ----------
     velocidad → remolinos → divergencia → presión → la velocidad se vuelve
     incompresible → el fluido transporta su propia velocidad y el tinte. */
  const VS_FLUID = `
    precision highp float;
    attribute vec2 p;
    uniform vec2 texelSize;
    varying vec2 vUv, vL, vR, vT, vB;
    void main(){
      vUv = p * .5 + .5;
      vL = vUv - vec2(texelSize.x, 0.);
      vR = vUv + vec2(texelSize.x, 0.);
      vT = vUv + vec2(0., texelSize.y);
      vB = vUv - vec2(0., texelSize.y);
      gl_Position = vec4(p, 0., 1.);
    }`;
  const HEAD = `precision highp float; varying vec2 vUv, vL, vR, vT, vB;`;

  const FS_SPLAT = HEAD + `
    uniform sampler2D uTarget;
    uniform float aspect, radius, cap;
    uniform vec2 point;
    uniform vec3 color;
    void main(){
      vec2 p = vUv - point;
      p.x *= aspect;
      vec3 v = texture2D(uTarget, vUv).xyz + exp(-dot(p, p) / radius) * color;
      if (cap > 0.) v = min(v, vec3(cap));        // el tinte no se acumula sin fin
      gl_FragColor = vec4(v, 1.);
    }`;

  const FS_ADVECT = HEAD + `
    uniform sampler2D uVelocity, uSource;
    uniform vec2 texelSize, srcTexel;
    uniform float dt, dissipation, fade, tension;
    void main(){
      vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
      vec4 r = texture2D(uSource, coord);
      /* tensión superficial: suaviza un poco el tinte en cada paso. Con el umbral nítido
         del render, los bordes quedan redondeados y lo delgado se estrangula en gotas. */
      if (tension > 0.){
        vec4 n = texture2D(uSource, coord + vec2(srcTexel.x, 0.)) + texture2D(uSource, coord - vec2(srcTexel.x, 0.))
               + texture2D(uSource, coord + vec2(0., srcTexel.y)) + texture2D(uSource, coord - vec2(0., srcTexel.y));
        r = mix(r, n * .25, tension);
      }
      r /= 1. + dissipation * dt;
      if (fade > 0.) r = max(r - fade * dt, 0.);  // evaporación del tinte
      gl_FragColor = r;
    }`;

  const FS_DIVERGENCE = HEAD + `
    uniform sampler2D uVelocity;
    void main(){
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;
      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.) L = -C.x;
      if (vR.x > 1.) R = -C.x;
      if (vT.y > 1.) T = -C.y;
      if (vB.y < 0.) B = -C.y;
      gl_FragColor = vec4(.5 * (R - L + T - B), 0., 0., 1.);
    }`;

  const FS_CURL = HEAD + `
    uniform sampler2D uVelocity;
    void main(){
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      gl_FragColor = vec4(.5 * (R - L - T + B), 0., 0., 1.);
    }`;

  const FS_VORTICITY = HEAD + `
    uniform sampler2D uVelocity, uCurl;
    uniform float curl, dt;
    void main(){
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;
      vec2 force = .5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + .0001;
      force *= curl * C;
      force.y *= -1.;
      vec2 vel = texture2D(uVelocity, vUv).xy + force * dt;
      gl_FragColor = vec4(clamp(vel, -1000., 1000.), 0., 1.);
    }`;

  const FS_PRESSURE = HEAD + `
    uniform sampler2D uPressure, uDivergence;
    void main(){
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float div = texture2D(uDivergence, vUv).x;
      gl_FragColor = vec4((L + R + B + T - div) * .25, 0., 0., 1.);
    }`;

  const FS_GRADIENT = HEAD + `
    uniform sampler2D uPressure, uVelocity;
    void main(){
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 vel = texture2D(uVelocity, vUv).xy - vec2(R - L, T - B);
      gl_FragColor = vec4(vel, 0., 1.);
    }`;

  const FS_CLEAR = HEAD + `
    uniform sampler2D uTexture;
    uniform float value;
    void main(){ gl_FragColor = value * texture2D(uTexture, vUv); }`;

  function compile(type, src){
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  function program(vs, fs){
    const pr = gl.createProgram();
    gl.attachShader(pr, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(pr, compile(gl.FRAGMENT_SHADER, fs));
    gl.bindAttribLocation(pr, 0, 'p');
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
    const u = {};
    const n = gl.getProgramParameter(pr, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++){
      const name = gl.getActiveUniform(pr, i).name;
      u[name] = gl.getUniformLocation(pr, name);
    }
    return { pr, u };
  }

  let P;
  try {
    P = { main: program(VS_MAIN, FS_MAIN) };
    if (FLOAT){
      P.splat      = program(VS_FLUID, FS_SPLAT);
      P.advect     = program(VS_FLUID, FS_ADVECT);
      P.divergence = program(VS_FLUID, FS_DIVERGENCE);
      P.curl       = program(VS_FLUID, FS_CURL);
      P.vorticity  = program(VS_FLUID, FS_VORTICITY);
      P.pressure   = program(VS_FLUID, FS_PRESSURE);
      P.gradient   = program(VS_FLUID, FS_GRADIENT);
      P.clear      = program(VS_FLUID, FS_CLEAR);
    }
  } catch (e) {
    console.error(e);
    section.classList.add('no-gl');
    return;
  }

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.disable(gl.BLEND);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

  function makeTex(){
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  }
  const texSharp  = makeTex(), texBlur  = makeTex();   // capa oscura
  const texSharpB = makeTex(), texBlurB = makeTex();   // capa clara
  const texNoDye = makeTex();          // tinte vacío si el equipo no soporta el fluido
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

  function cssColor(name){
    const h = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace('#', '');
    const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  }
  gl.useProgram(P.main.pr);
  gl.uniform1i(P.main.u.uSharp, 0);
  gl.uniform1i(P.main.u.uBlur, 1);
  gl.uniform1i(P.main.u.uDye, 2);
  gl.uniform1i(P.main.u.uSharpB, 3);
  gl.uniform1i(P.main.u.uBlurB, 4);
  gl.uniform3fv(P.main.u.cPale, cssColor('--pale'));
  gl.uniform3fv(P.main.u.cBlue, cssColor('--blue'));
  gl.uniform3fv(P.main.u.cDark, cssColor('--dark'));
  gl.uniform1f(P.main.u.uRim, CONFIG.rim);
  gl.uniform1f(P.main.u.uFogDark, CONFIG.fogDark);
  gl.uniform1f(P.main.u.uFogLight, CONFIG.fogLight);

  /* ==========================================================
     DESENFOQUE DEL TEXTO: se calcula UNA vez por tamaño de pantalla
     ========================================================== */
  function boxSizes(sigma){
    const n = 3;
    const wIdeal = Math.sqrt(12 * sigma * sigma / n + 1);
    let wl = Math.floor(wIdeal); if (wl % 2 === 0) wl--;
    const m = Math.round((12 * sigma * sigma - n * wl * wl - 4 * n * wl - 3 * n) / (-4 * wl - 4));
    return [0, 1, 2].map(i => (i < m ? wl : wl + 2));
  }
  function boxH(src, dst, w, h, r){
    const k = 1 / (2 * r + 1);
    for (let y = 0; y < h; y++){
      const o = y * w;
      let acc = 0;
      for (let j = 0; j <= r && j < w; j++) acc += src[o + j];
      for (let x = 0; x < w; x++){
        dst[o + x] = acc * k;
        if (x + r + 1 < w) acc += src[o + x + r + 1];
        if (x - r >= 0)    acc -= src[o + x - r];
      }
    }
  }
  function boxV(src, dst, w, h, r){
    const k = 1 / (2 * r + 1);
    for (let x = 0; x < w; x++){
      let acc = 0;
      for (let j = 0; j <= r && j < h; j++) acc += src[j * w + x];
      for (let y = 0; y < h; y++){
        dst[y * w + x] = acc * k;
        if (y + r + 1 < h) acc += src[(y + r + 1) * w + x];
        if (y - r >= 0)    acc -= src[(y - r) * w + x];
      }
    }
  }
  function gauss(src, w, h, sx, sy){
    let a = Float32Array.from(src), b = new Float32Array(w * h);
    const bx = sx > .4 ? boxSizes(sx) : null;
    const by = sy > .4 ? boxSizes(sy) : null;
    for (let i = 0; i < 3; i++){
      if (bx){ boxH(a, b, w, h, (bx[i] - 1) >> 1); [a, b] = [b, a]; }
      if (by){ boxV(a, b, w, h, (by[i] - 1) >> 1); [a, b] = [b, a]; }
    }
    return a;
  }

  /* ==========================================================
     FLUIDO: texturas dobles (una se lee, la otra se escribe)
     ========================================================== */
  function fbo(w, h){
    gl.activeTexture(gl.TEXTURE0);
    const tex = makeTex();
    gl.texImage2D(gl.TEXTURE_2D, 0, FLOAT.internal, w, h, 0, gl.RGBA, FLOAT.type, null);
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return {
      tex, fb, w, h, texel: [1 / w, 1 / h],
      attach(unit){ gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex); return unit; }
    };
  }
  function doubleFbo(w, h){
    let a = fbo(w, h), b = fbo(w, h);
    return { get read(){ return a; }, get write(){ return b; }, swap(){ [a, b] = [b, a]; } };
  }
  function freeFbo(o){ if (o){ gl.deleteTexture(o.tex); gl.deleteFramebuffer(o.fb); } }
  function freeDouble(d){ if (d){ freeFbo(d.read); freeFbo(d.write); } }

  let velocity, dye, pressure, divergence, curlTex;

  function resolution(base){
    let aspect = W / H; if (aspect < 1) aspect = 1 / aspect;
    const min = Math.round(base), max = Math.round(base * aspect);
    return W > H ? [max, min] : [min, max];
  }
  function initFluid(){
    if (!FLOAT) return;
    [velocity, dye, pressure].forEach(freeDouble);
    [divergence, curlTex].forEach(freeFbo);
    const [sw, sh] = resolution(touchUI ? 96 : 128);
    const [dw, dh] = resolution(touchUI ? 256 : 384);
    velocity   = doubleFbo(sw, sh);
    pressure   = doubleFbo(sw, sh);
    divergence = fbo(sw, sh);
    curlTex    = fbo(sw, sh);
    dye        = doubleFbo(dw, dh);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  function blit(target){
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fb);
    gl.viewport(0, 0, target.w, target.h);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function use(p){ gl.useProgram(p.pr); return p.u; }

  function splat(x, y, vx, vy, amount, sigma){
    // x, y en px CSS; vx, vy en texeles/s de la simulación; sigma en px CSS
    let u = use(P.splat);
    gl.uniform1i(u.uTarget, velocity.read.attach(0));
    gl.uniform2f(u.texelSize, ...velocity.read.texel);
    gl.uniform1f(u.aspect, W / H);
    gl.uniform2f(u.point, x / W, 1 - y / H);
    gl.uniform3f(u.color, vx, vy, 0);
    gl.uniform1f(u.radius, 2 * Math.pow(sigma * 1.25 / H, 2));
    gl.uniform1f(u.cap, 0);
    blit(velocity.write); velocity.swap();

    if (amount > 0){
      gl.uniform1i(u.uTarget, dye.read.attach(0));
      gl.uniform3f(u.color, amount, 0, 0);
      gl.uniform1f(u.radius, 2 * Math.pow(sigma / H, 2));
      gl.uniform1f(u.cap, 1.2);
      blit(dye.write); dye.swap();
    }
  }

  function stepFluid(dt){
    let u;
    u = use(P.curl);
    gl.uniform2f(u.texelSize, ...velocity.read.texel);
    gl.uniform1i(u.uVelocity, velocity.read.attach(0));
    blit(curlTex);

    u = use(P.vorticity);
    gl.uniform2f(u.texelSize, ...velocity.read.texel);
    gl.uniform1i(u.uVelocity, velocity.read.attach(0));
    gl.uniform1i(u.uCurl, curlTex.attach(1));
    gl.uniform1f(u.curl, CONFIG.swirl);
    gl.uniform1f(u.dt, dt);
    blit(velocity.write); velocity.swap();

    u = use(P.divergence);
    gl.uniform2f(u.texelSize, ...velocity.read.texel);
    gl.uniform1i(u.uVelocity, velocity.read.attach(0));
    blit(divergence);

    u = use(P.clear);
    gl.uniform2f(u.texelSize, ...pressure.read.texel);
    gl.uniform1i(u.uTexture, pressure.read.attach(0));
    gl.uniform1f(u.value, .8);
    blit(pressure.write); pressure.swap();

    u = use(P.pressure);
    gl.uniform2f(u.texelSize, ...pressure.read.texel);
    gl.uniform1i(u.uDivergence, divergence.attach(0));
    for (let i = 0; i < 20; i++){
      gl.uniform1i(u.uPressure, pressure.read.attach(1));
      blit(pressure.write); pressure.swap();
    }

    u = use(P.gradient);
    gl.uniform2f(u.texelSize, ...velocity.read.texel);
    gl.uniform1i(u.uPressure, pressure.read.attach(0));
    gl.uniform1i(u.uVelocity, velocity.read.attach(1));
    blit(velocity.write); velocity.swap();

    u = use(P.advect);
    gl.uniform2f(u.texelSize, ...velocity.read.texel);
    gl.uniform1i(u.uVelocity, velocity.read.attach(0));
    gl.uniform1i(u.uSource, 0);
    gl.uniform1f(u.dt, dt);
    gl.uniform1f(u.dissipation, CONFIG.viscosity);
    gl.uniform1f(u.fade, 0);
    gl.uniform2f(u.srcTexel, ...velocity.read.texel);
    gl.uniform1f(u.tension, .22);                     // viscosidad: la velocidad también se suaviza (líquido espeso, sin serrucho)
    blit(velocity.write); velocity.swap();

    gl.uniform1i(u.uVelocity, velocity.read.attach(0));
    gl.uniform1i(u.uSource, dye.read.attach(1));
    gl.uniform1f(u.dissipation, 1.1 / CONFIG.life);   // evaporación: parte proporcional…
    gl.uniform1f(u.fade, .55 / CONFIG.life);          // …y parte fija, para que llegue a cero
    gl.uniform2f(u.srcTexel, ...dye.read.texel);
    gl.uniform1f(u.tension, .14);
    blit(dye.write); dye.swap();
  }

  /* ==========================================================
     CONSTRUIR (al cargar y al cambiar tamaño)
     ========================================================== */
  let W = 0, H = 0, EM = 0, SIGMA = 40, DROP = 40;

  /* dibuja una palabra repetida en filas y devuelve el texto casi nítido + 4 niveles de niebla */
  function rasterize(str, G){
    const { tw, th, s } = G;
    const c = document.createElement('canvas');
    c.width = tw; c.height = th;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, tw, th);
    ctx.fillStyle = '#fff';
    const fs = EM * s;
    ctx.font = `${CONFIG.weight} ${fs}px ${CONFIG.family}`;

    const trk = CONFIG.tracking * fs, gap = CONFIG.gap * fs;
    const adv = [];                                   // avance con kerning real
    for (let i = 0; i < str.length; i++){
      const a = str[i], b = str[(i + 1) % str.length];
      adv.push(ctx.measureText(a + b).width - ctx.measureText(b).width + trk + (i === str.length - 1 ? gap : 0));
    }
    const unit  = adv.reduce((x, y) => x + y, 0);
    const shift = unit * .31;                         // cada fila corre un poco: la palabra se parte distinto
    const pitch = CONFIG.lineHeight * fs;
    const first = (G.pad + EM * .6) * s;
    const capH  = ctx.measureText('H').actualBoundingBoxAscent || fs * .72;

    for (let r = -1; first + r * pitch - fs * .75 < th; r++){
      const base = first + r * pitch;
      let x = -(((r + 2) * shift) % unit) - unit;
      let i = 0;
      while (x < tw){
        ctx.fillText(str[i], x, base);
        x += adv[i];
        i = (i + 1) % str.length;
      }
    }

    const img = ctx.getImageData(0, 0, tw, th).data;
    const src = new Float32Array(tw * th);
    for (let i = 0; i < src.length; i++) src[i] = img[i * 4] / 255;

    const s0 = .02 * EM * s;
    const sharp = gauss(src, tw, th, s0, s0);
    const sharp8 = new Uint8Array(tw * th);
    for (let i = 0; i < sharp8.length; i++) sharp8[i] = Math.min(255, sharp[i] * 255 + .5);

    const hw = tw / 2, hh = th / 2;
    const half = new Float32Array(hw * hh);
    for (let y = 0; y < hh; y++) for (let x = 0; x < hw; x++){
      const i = (y * 2) * tw + x * 2;
      half[y * hw + x] = (src[i] + src[i + 1] + src[i + tw] + src[i + tw + 1]) * .25;
    }
    const levels = [
      [.018, 1.10, 1.00],
      [.028, 1.30, .90],
      [.040, 1.50, .80],
      [.054, 1.70, .72],
    ];
    const blur8 = new Uint8Array(hw * hh * 4);
    levels.forEach(([sig, ax, ay], ch) => {
      const px = sig * EM * s / 2;
      const out = gauss(half, hw, hh, px * ax, px * ay);
      for (let i = 0; i < out.length; i++) blur8[i * 4 + ch] = Math.min(255, out[i] * 255 + .5);
    });
    return { sharp8, blur8, hw, hh, capH, pitch };
  }

  function upload(texS, texB, R, G){
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texS);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, G.tw, G.th, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, R.sharp8);
    gl.bindTexture(gl.TEXTURE_2D, texB);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, R.hw, R.hh, 0, gl.RGBA, gl.UNSIGNED_BYTE, R.blur8);
  }

  function build(){
    W = section.clientWidth;
    H = section.clientHeight;
    if (!W || !H) return;

    EM = Math.min(H / (CONFIG.rows * CONFIG.lineHeight), W / 2.45);
    const pad  = Math.ceil(EM * .5);
    const cssW = W + pad * 2, cssH = H + pad * 2;
    const s    = Math.min(1, 2000 / cssW, 2000 / cssH);
    const G    = { pad, s, tw: Math.round(cssW * s / 2) * 2, th: Math.round(cssH * s / 2) * 2 };

    const A = rasterize(CONFIG.textDark, G);
    const B = rasterize(CONFIG.textLight, G);
    upload(texSharp, texBlur, A, G);
    upload(texSharpB, texBlurB, B, G);

    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    const u = use(P.main);
    gl.uniform2f(u.uRes, W, H);
    gl.uniform2f(u.uPad, pad, pad);
    gl.uniform2f(u.uTexCss, G.tw / s, G.th / s);
    gl.uniform1f(u.uEm, EM);
    gl.uniform3f(u.uRows, EM * .6 - A.capH / s, A.pitch / s, A.capH / s);

    const short = Math.min(W, H);
    SIGMA = Math.max(20, Math.min(short * CONFIG.brush, 150)) / 1.9;   // rastro del cursor
    DROP  = Math.max(50, Math.min(short * CONFIG.drop, 150)) / 1.9;    // gota al tocar
    initFluid();
  }

  /* ==========================================================
     INTERACCIÓN
     ========================================================== */
  const queue = [];                     // salpicaduras pendientes para el próximo fotograma
  const ptr = { x: 0, y: 0, t: 0, down: false };
  let lastInput = -99, time = 0;

  function localPos(clientX, clientY){
    const r = section.getBoundingClientRect();   // se recalcula: en celular la sección se mueve con el scroll
    return [clientX - r.left, clientY - r.top];
  }
  function start(x, y){ ptr.x = x; ptr.y = y; ptr.t = performance.now(); ptr.down = true; }
  function move(x, y){
    if (!velocity) return;                                // el fluido aún no existe
    if (!ptr.down){ start(x, y); return; }
    const now = performance.now();
    const dt  = Math.min(.1, Math.max(1 / 240, (now - ptr.t) / 1000));
    const dx = x - ptr.x, dy = y - ptr.y;
    const dist = Math.hypot(dx, dy);
    if (dist < .5) return;
    const k  = W / velocity.read.w;                       // px CSS por texel de la simulación
    const vx = dx / dt / k * CONFIG.push;
    const vy = -dy / dt / k * CONFIG.push;
    /* el tinte depende del movimiento: quieto no suelta nada, así no se forma un círculo */
    const n = Math.min(16, Math.ceil(dist / (SIGMA * .8)));
    for (let i = 1; i <= n; i++){
      const t = i / n;
      queue.push([ptr.x + dx * t, ptr.y + dy * t, vx, vy, .42, SIGMA]);
    }
    ptr.x = x; ptr.y = y; ptr.t = now;
    lastInput = time;
    kick();
  }
  function end(){ ptr.down = false; }

  /* gota: tinte en el centro y empuje hacia afuera en anillo */
  function splash(x, y){
    const R = DROP * (touchUI ? 1.8 : 1.3);             // en pantallas chicas la gota es más grande
    queue.push([x, y, 0, 0, 1.1, R]);
    const V = 90;
    for (let i = 0; i < 7; i++){
      const a = i / 7 * Math.PI * 2 + Math.random() * .6;
      const ox = Math.cos(a), oy = Math.sin(a);
      queue.push([x + ox * R * .6, y + oy * R * .6, ox * V, -oy * V, .25, R * .55]);
    }
    lastInput = time;
    kick();
  }

  if (FLOAT){
    /* mouse / lápiz */
    section.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      move(...localPos(e.clientX, e.clientY));
    }, { passive: true });
    section.addEventListener('pointerleave', e => { if (e.pointerType !== 'touch') end(); });

    /* clic o toque corto: gota */
    section.addEventListener('click', e => splash(...localPos(e.clientX, e.clientY)));

    /* dedo: eventos táctiles (siguen llegando mientras la página hace scroll) */
    section.addEventListener('touchstart', e => {
      const t = e.touches[0]; start(...localPos(t.clientX, t.clientY));
    }, { passive: true });
    section.addEventListener('touchmove', e => {
      const t = e.touches[0]; move(...localPos(t.clientX, t.clientY));
    }, { passive: true });
    section.addEventListener('touchend', end, { passive: true });
    section.addEventListener('touchcancel', end, { passive: true });
  }

  /* ==========================================================
     MAREA (celular): el scroll sube el líquido desde abajo
     ========================================================== */
  const tide = { p: 0, wave: 0, lastTop: null };
  function updateTide(dt){
    if (!tideOn){ tide.y = 1e5; tide.w = 0; return; }
    const r = track.getBoundingClientRect();
    const span = Math.max(1, r.height - H);
    const stickTop = parseFloat(getComputedStyle(section).top) || 0;   // la sección se pega debajo del menú
    const target = Math.min(1, Math.max(0, (stickTop - r.top) / span));
    const speed = tide.lastTop === null ? 0 : Math.abs(r.top - tide.lastTop) / Math.max(dt, 1 / 120);
    tide.lastTop = r.top;
    tide.p += (target - tide.p) * (reduce ? 1 : .12);           // el líquido sigue al scroll con inercia
    const calm = .05 + Math.min(1, speed / 1800) * .35;           // oleaje en em: crece si scrolleas rápido
    tide.wave += (calm - tide.wave) * (calm > tide.wave ? .25 : .035);
    const e = tide.p * tide.p * (3 - 2 * tide.p);
    tide.y = H * (.93 - 1.11 * e);                                 // en reposo asoma una línea de líquido abajo
    tide.w = tide.wave * EM;
  }

  /* ==========================================================
     LOOP
     ========================================================== */
  let visible = true, running = false, last = 0;

  function drawMain(){
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    const u = use(P.main);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texSharp);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texBlur);
    gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, FLOAT ? dye.read.tex : texNoDye);
    gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, texSharpB);
    gl.activeTexture(gl.TEXTURE4); gl.bindTexture(gl.TEXTURE_2D, texBlurB);
    gl.uniform1f(u.uTime, reduce ? 12 : time);
    gl.uniform1f(u.uTide, tide.y === undefined ? 1e5 : tide.y);
    gl.uniform1f(u.uWave, tide.w || 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function frame(now){
    if (!visible || !W){ running = false; last = 0; return; }   // !W: todavía no se construye (fuentes cargando)
    const dt = last ? Math.min(1 / 30, (now - last) / 1000) : 1 / 60;
    last = now;
    time += dt;

    updateTide(dt);
    if (FLOAT){
      while (queue.length) splat(...queue.shift());
      stepFluid(dt);
    }
    drawMain();

    /* con movimiento reducido solo se anima mientras el fluido está vivo */
    const alive = time - lastInput < CONFIG.life + 1.5;
    if (!reduce || alive) requestAnimationFrame(frame);
    else { running = false; last = 0; }
  }
  function kick(){
    if (running || !visible) return;
    running = true;
    requestAnimationFrame(frame);
  }

  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible) kick();
  }).observe(section);

  addEventListener('scroll', kick, { passive: true });      // con movimiento reducido, despertar al scrollear

  let rt;
  new ResizeObserver(() => {
    clearTimeout(rt);
    rt = setTimeout(() => { build(); drawMain(); }, 120);
  }).observe(section);

  const fontsLoaded = !document.fonts ? Promise.resolve() : Promise.all(
    CONFIG.family.split(',').slice(0, 2).map(f =>
      document.fonts.load(`${CONFIG.weight} 100px ${f.trim()}`, CONFIG.textDark + CONFIG.textLight).catch(() => {}))
  ).then(() => document.fonts.ready);

  fontsLoaded.then(() => {
    build();
    drawMain();
    kick();
  });

};
