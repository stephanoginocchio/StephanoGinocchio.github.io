"""
Escribe en el HTML lo que arma el JavaScript: el menú, el pie, la grilla de
proyectos y el caso de cada proyecto con página propia (como
master-aplicador.html). Así Google, las vistas previas de WhatsApp, LinkedIn y
correo, y cualquier lector sin JavaScript ven el contenido real.

Los datos se siguen editando en data/projects.js y data/config.js. Al cargar la
página, el JavaScript vuelve a dibujar todo desde esos archivos (con GSAP
encima), así que lo que ve la gente siempre está al día. Este script solo
actualiza la copia que va escrita dentro del HTML.

Correrlo después de cambiar projects.js o config.js:
    python3 tools/prerender.py

Necesita Python 3 y Playwright con Chromium. Lo corre Claude.
"""
import functools
import http.server
import os
import sys
import threading
from html.parser import HTMLParser

from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# qué partes se escriben en cada página
PAGES = {
    'index.html': ['header', 'works', 'footer'],
    'portfolio.html': ['header', 'works', 'footer'],
    'profile.html': ['header', 'footer'],
    'project.html': ['header', 'footer'],
    '404.html': ['header', 'footer'],
}
# cada proyecto con página propia (campo "page") también lleva su caso escrito
# — se agregan solos más abajo leyendo data/projects.js

# dónde va cada parte: (atributo, valor) del elemento que la contiene
HOSTS = {
    'header': ('data-header', None),
    'footer': ('data-footer', None),
    'works': ('id', 'works'),
    'project': ('id', 'project'),
}

# Captura el HTML exacto que el JavaScript asigna al dibujar cada parte.
CAPTURE = r"""
window.__pr = {};
(function () {
  var oh = Object.getOwnPropertyDescriptor(Element.prototype, 'outerHTML');
  Object.defineProperty(Element.prototype, 'outerHTML', { configurable: true,
    get: function () { return oh.get.call(this); },
    set: function (v) {
      if (this.hasAttribute('data-header')) window.__pr.header = v;
      if (this.hasAttribute('data-footer')) window.__pr.footer = v;
      oh.set.call(this, v);
    } });
  var ih = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  Object.defineProperty(Element.prototype, 'innerHTML', { configurable: true,
    get: function () { return ih.get.call(this); },
    set: function (v) {
      if (this.id === 'works') window.__pr.works = v;
      if (this.id === 'project') window.__pr.project = v;
      ih.set.call(this, v);
    } });
})();
"""


class Finder(HTMLParser):
    """Ubica el contenido de un elemento (entre su etiqueta de apertura y la de cierre)."""

    def __init__(self, src, attr, value):
        super().__init__(convert_charrefs=False)
        self.src, self.attr, self.value = src, attr, value
        self.lines = [0]
        for i, ch in enumerate(src):
            if ch == '\n':
                self.lines.append(i + 1)
        self.tag = None
        self.depth = 0
        self.inner_start = self.inner_end = None

    def _abs(self):
        line, col = self.getpos()
        return self.lines[line - 1] + col

    def handle_starttag(self, tag, attrs):
        if self.inner_end is not None:
            return
        if self.tag is None:
            d = dict(attrs)
            if self.attr in d and (self.value is None or d[self.attr] == self.value):
                self.tag = tag
                self.depth = 1
                self.inner_start = self._abs() + len(self.get_starttag_text())
        elif tag == self.tag:
            self.depth += 1

    def handle_endtag(self, tag):
        if self.tag is None or self.inner_end is not None or tag != self.tag:
            return
        self.depth -= 1
        if self.depth == 0:
            self.inner_end = self._abs()


def write_part(src, part, markup):
    attr, value = HOSTS[part]
    f = Finder(src, attr, value)
    f.feed(src)
    if f.inner_start is None or f.inner_end is None:
        raise SystemExit(f'No encontré dónde va "{part}"')
    return src[:f.inner_start] + '\n' + markup + '\n' + src[f.inner_end:]


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve():
    handler = functools.partial(Quiet, directory=ROOT)
    httpd = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    httpd.handle_error = lambda *a: None   # el navegador corta videos al cambiar de página
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def main():
    httpd = serve()
    base = f'http://127.0.0.1:{httpd.server_address[1]}/'
    with sync_playwright() as p:
        browser = p.chromium.launch(args=['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
        ctx = browser.new_context(reduced_motion='reduce', viewport={'width': 1440, 'height': 900})
        ctx.add_init_script(CAPTURE)
        page = ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))

        # proyectos con página propia
        page.goto(base + 'portfolio.html', wait_until='domcontentloaded')
        own = page.evaluate("(window.PROJECTS || []).filter(p => p.page).map(p => p.page)")
        pages = dict(PAGES)
        for f in own:
            pages[f] = ['header', 'project', 'footer']

        for name, parts in pages.items():
            errors.clear()
            page.goto(base + name, wait_until='load')
            page.wait_for_timeout(300)
            got = page.evaluate('window.__pr')
            if errors:
                raise SystemExit(f'{name}: error de JavaScript: {errors[0]}')
            path = os.path.join(ROOT, name)
            src = open(path, encoding='utf-8').read()
            out = src
            for part in parts:
                if not got.get(part):
                    raise SystemExit(f'{name}: el JavaScript no dibujó "{part}"')
                out = write_part(out, part, got[part])
            if out != src:
                open(path, 'w', encoding='utf-8').write(out)
            print(f'{name:24s} {", ".join(parts):28s} {len(src):>6} → {len(out):>6} bytes')
        browser.close()
    httpd.shutdown()


if __name__ == '__main__':
    sys.exit(main())
