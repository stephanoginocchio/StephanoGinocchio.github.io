# www.stephanoginocchio.com

Web personal de Stephano Ginocchio + whiim (invitaciones web de boda), hecha a partir de las maquetas de Illustrator. HTML, CSS y JavaScript sin frameworks; animaciones con GSAP. Se publica con GitHub Pages desde el repositorio `stephanoginocchio.github.io`.

## Páginas

| Página | Archivo | Contenido |
|---|---|---|
| Home | `index.html` | Hero líquido (Intuition / Structure), grilla de proyectos y servicios |
| Portfolio | `portfolio.html` | La grilla completa |
| Proyecto | `project.html#slug` | Una página por proyecto, armada desde `data/projects.js` |
| My Profile | `profile.html` | Versión 1. La siguiente toma la forma de Parallelo |
| 404 | `404.html` | GitHub Pages la muestra sola cuando una dirección no existe |
| whiim | `whiim/index.html` | Landing: portada, proceso, beneficios, archivo de carpetas |
| Carpeta de boda | `whiim/boda.html#slug` | Una página por boda, armada desde `data/bodas.js` |

## Qué editar (todo lo de uso diario está en `/data`)

- **`data/config.js`**: correo, ubicación, redes y el **WhatsApp de whiim**. Mientras el WhatsApp esté vacío, "Escríbenos" abre el chat de Instagram de @whiim__.
- **`data/projects.js`**: proyectos del portafolio. La primera imagen es la portada, la segunda va junto al texto y el resto es la galería. Si todavía no tienes una imagen, deja `{ pendiente: '4/5', nota: 'Qué va aquí' }` y sale una placa gris.
- **`data/bodas.js`**: las carpetas del archivo de whiim.
- **Textos de servicios**: en `index.html` (Visual / Editorial / Web).
- **Textos de whiim** (portada, proceso, beneficios, cierre): en `whiim/index.html`.
- **Hero líquido**: tu código está en `assets/js/fluid-hero.js` y los ajustes se pasan desde `assets/js/personal.js` (función `initHome`).
- **"Email me" del menú**: copia el correo y las letras giran a "Copied" con un brillo de azul hielo; a los 2,4 segundos vuelve. Si el navegador no deja copiar, abre el correo. El estilo está en `assets/css/base.css` (busca "Copied") y el tiempo en `assets/js/site.js` (`initCopyMail`). En el menú del celular, "Email me" sigue abriendo la app de correo.
- **Cabecera de whiim**: se queda fija arriba. Al bajar, el logo se achica y aparece un degradado oscuro con desenfoque detrás. En celular, en vez de "Stephano Ginocchio / Home" hay una flecha para volver (si la persona venía de otra página del sitio, regresa ahí; si no, va a tu home). Los tamaños están como variables en `.wh-head` dentro de `assets/css/base.css`.
- **Parallax de los heros** (home, whiim, proyectos y carpetas): el fondo baja más lento que la página y el texto de encima sube más rápido y se desvanece. La velocidad es el número de `data-parallax="0.4"` (0 = sin efecto; más alto = el fondo se queda más quieto). Está en `index.html`, `whiim/index.html`, `assets/js/personal.js` (proyectos) y `assets/js/whiim.js` (carpetas). Esto es solo con mouse: en celular y tablet un efecto atado al scroll con JavaScript se ve a saltos, así que ahí se usa el "efecto cortina": la portada se queda quieta y la página sube por encima. Es puro CSS (`position: sticky`, al final de `whiim.css` y `personal.css`) y lo mueve el propio navegador, por eso va suave.

Imágenes: WebP o JPG, de 1600–2000 px de ancho para portadas y de 1200 px para el resto. Las miniaturas de la grilla (`thumb`) van bien a 520 px.

## Verlo en tu compu

Abre `index.html` en el navegador. Si algo no carga, sirve la carpeta con un servidor local:

```
cd stephanoginocchio.github.io
python3 -m http.server 8000
```

y entra a http://localhost:8000

## Publicar en GitHub Pages

1. El repositorio se llama exactamente **`stephanoginocchio.github.io`**. No le cambies el nombre.
2. Sube todo el contenido de esta carpeta, `.nojekyll` y `CNAME` incluidos.
3. En el repositorio: Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
4. En uno o dos minutos los cambios se ven en https://www.stephanoginocchio.com y whiim en https://www.stephanoginocchio.com/whiim/

Si en vez de eso lo subes como proyecto (`usuario.github.io/otro-nombre/`), la página 404 deja de encontrar sus estilos, porque usa rutas que empiezan con `/`.

## Dominio: www.stephanoginocchio.com

Registrado en Spaceship el 12 de octubre de 2026, con renovación automática cada año. `stephanoginocchio.com` y `stephanoginocchio.github.io` redirigen solos a `www.stephanoginocchio.com`.

- **No borres el archivo `CNAME`.** Es lo que le dice a GitHub cuál es tu dominio: si desaparece en un commit, la web vuelve a `github.io`. Antes de copiar archivos nuevos a la carpeta, haz *Pull origin* en GitHub Desktop.
- **Registros DNS** (Spaceship → Advanced DNS → stephanoginocchio.com). Para la web van solo estos:

  | Tipo | Host | Valor |
  |---|---|---|
  | A | `@` | `185.199.108.153` |
  | A | `@` | `185.199.109.153` |
  | A | `@` | `185.199.110.153` |
  | A | `@` | `185.199.111.153` |
  | CNAME | `www` | `stephanoginocchio.github.io` |
  | TXT | `_github-pages-challenge-stephanoginocchio` | El código que da GitHub. No lo borres. |

- El TXT verifica el dominio en GitHub (tu foto → Settings → Pages) e impide que otra cuenta publique una web con él.
- No agregues registros comodín (`*`): dejan tus subdominios expuestos aunque el dominio esté verificado. Si algún día agregas correo con tu dominio, sus registros (MX y TXT) conviven con estos.
- Las vistas previas al compartir el link (WhatsApp, Instagram) usan `assets/img/og/stephano.jpg` y `assets/img/og/whiim.jpg`, con la dirección `https://www.stephanoginocchio.com/` escrita en el `<head>` de cada página. Si cambias la portada de whiim, conviene rehacer `whiim.jpg` (1200 × 630 px).

## Tipografías

Kit de Adobe Fonts `emb0tmp`: Neue Haas Grotesk Display (400, 700), Neue Haas Grotesk Text (400, 700) y Nitti Typewriter Normal (400). Adobe no pide lista de dominios: el kit funciona en GitHub Pages y en tu compu.

Tu hero está diseñado en **65 Medium**, que el kit no trae. Mientras no lo agregues, el hero usa 700, que es lo más parecido. Si agregas *Neue Haas Grotesk Display Pro 65 Medium* al proyecto web en fonts.adobe.com, el hero lo usa solo, sin tocar código.

## Antes de publicar

- [ ] Poner el WhatsApp de whiim en `data/config.js`.
- [ ] Agregar Behance y LinkedIn en `data/config.js` (si los dejas vacíos, no aparecen).
- [ ] Reemplazar las placas "Pendiente" de Master Aplicador, VK Studio, Khōra y Parallelo por imágenes reales, y completar los años.
- [ ] Borrar las 4 carpetas de ejemplo de `data/bodas.js` (`ejemplo: true`) y sus fotos en `assets/img/bodas/` cuando tengas bodas reales.
- [ ] Pedir permiso a Rosana y Nicanor para mostrar su invitación y sus fotos.
- [ ] Hacer una versión "vitrina" de su invitación sin números de cuenta ni QR, y poner ese link en `invitacion.url`.
- [ ] Confirmar los números y el proceso de whiim (0 plantillas, 2 rondas, 21 días, propuesta en 5 días). Son una propuesta.
- [ ] Cambiar las fotos de stock de whiim (portada e intro) por fotos propias cuando las tengas.

## Créditos de fotos (placeholders)

Fotos de [Pexels](https://www.pexels.com/license/), uso libre sin atribución obligatoria. IDs:

- whiim: portada e intro por confirmar (las cambiaste por fotos nuevas; anota aquí de dónde son)
- Lucía & Mateo: 12341927, 6968988, 18856007, 31724460, 26673763
- Valeria & Diego: 18079000, 20091878, 10673499, 14000811, 8669256
- Camila & Joaquín: 8693631, 7907264, 4661209, 3714427, 15784736
- Andrea & Sebastián: 15964967, 1128783, 954825, 15595060, 20654837

Rosana & Nicanor: capturas de su invitación y fotos de la pareja.

## Técnico

- GSAP 3.14.2 + ScrollTrigger en `assets/vendor/` (licencia gratuita de GSAP).
- Sin módulos ni `fetch`: también funciona abriendo los archivos directo desde la compu.
- Respeta "reducir movimiento" del sistema: sin animaciones, todo visible.
- Menú, pie de página y cuadrado-puente se dibujan desde `assets/js/site.js`, así se editan en un solo lugar.
