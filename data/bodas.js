/* ==========================================================================
   ARCHIVO DE BODAS (whiim)
   Cada boda es una carpeta en whiim/ y tiene su página: whiim/boda.html#slug

   ejemplo: true  → carpeta de muestra con fotos de stock. Se marca como
                    "Ejemplo" en la web. BÓRRALAS antes de publicar o apenas
                    tengas bodas reales.

   Campos:
     pareja, lugar, fecha   → lo que se lee bajo la carpeta
     portada                → foto de la carpeta (horizontal, ~640 px)
     hero                   → foto grande de arriba
     titulo                 → dos líneas
     texto                  → párrafos
     foto                   → foto a color junto al texto
     invitacion.pantallas   → capturas de la invitación en el celular
     invitacion.url         → link a la invitación (déjalo vacío si tiene
                              datos privados, como cuentas bancarias)
     galeria                → fotos del día (con w y h reales)
     creditos               → pares [etiqueta, texto]
   Las rutas de imágenes empiezan en la carpeta raíz del sitio.
   ========================================================================== */
window.BODAS = [
  {
    slug: 'rosana-nicanor',
    pareja: 'Rosana & Nicanor',
    lugar: 'Tingo María, Huánuco',
    fecha: 'Julio 2026',
    ejemplo: false,
    portada: 'assets/img/bodas/rosana-nicanor/cover.webp',
    hero: { src: 'assets/img/bodas/rosana-nicanor/hero.webp', w: 1920, h: 1081, alt: 'Rosana y Nicanor caminan de la mano por un bosque.' },
    titulo: ['Rosana & Nicanor', 'Tingo María, julio 2026'],
    texto: [
      'La invitación de su boda en Tingo María. Terciopelo oscuro y crema, una caligrafía script contenida por una tipografía fría y espaciada.',
      'Se abre con su canción y reúne la cuenta regresiva, la ceremonia y la recepción con mapa, su galería de fotos, los regalos, el dress code y la confirmación de asistencia. Diseñada en Illustrator y programada a mano, sin plantillas.'
    ],
    foto: { src: 'assets/img/bodas/rosana-nicanor/color.webp', w: 1400, h: 1120, alt: 'Rosana y Nicanor de noche, bajo una lluvia de luces.' },
    invitacion: {
      url: '',   // pon aquí la versión "vitrina" de la invitación, sin números de cuenta ni QR
      texto: 'Así se ve en el celular de cada invitado: un link que se abre sin descargar nada.',
      pantallas: [
        { src: 'assets/img/bodas/rosana-nicanor/pantallas/portada.webp', alt: 'Pantalla de bienvenida con los nombres y el botón Invitación.' },
        { src: 'assets/img/bodas/rosana-nicanor/pantallas/hero.webp', alt: 'Portada con la foto de la pareja, el monograma y la fecha.' },
        { src: 'assets/img/bodas/rosana-nicanor/pantallas/historia.webp', alt: 'Bienvenida con fecha, lugar y fotos.' },
        { src: 'assets/img/bodas/rosana-nicanor/pantallas/countdown.webp', alt: 'Cuenta regresiva para el sí.' },
        { src: 'assets/img/bodas/rosana-nicanor/pantallas/ceremonia.webp', alt: 'Ceremonia con hora y botón al mapa.' },
        { src: 'assets/img/bodas/rosana-nicanor/pantallas/galeria.webp', alt: 'Galería Nuestros momentos.' },
        { src: 'assets/img/bodas/rosana-nicanor/pantallas/rsvp.webp', alt: 'Dress code y confirmación de asistencia.' }
      ]
    },
    galeriaTitulo: 'Sus fotos',
    galeria: [
      { src: 'assets/img/bodas/rosana-nicanor/01.webp', w: 1045, h: 1566, alt: 'Rosana y Nicanor se besan de noche, rodeados de luces.' },
      { src: 'assets/img/bodas/rosana-nicanor/02.webp', w: 1010, h: 1515, alt: 'Retrato de la pareja en un bar.' },
      { src: 'assets/img/bodas/rosana-nicanor/03.webp', w: 1400, h: 789, alt: 'Rosana y Nicanor abrazados, en blanco y negro.' },
      { src: 'assets/img/bodas/rosana-nicanor/04.webp', w: 1097, h: 1645, alt: 'Abrazo frente a una pared de plantas.' },
      { src: 'assets/img/bodas/rosana-nicanor/05.webp', w: 945, h: 1417, alt: 'Nicanor brinda en el bar.' }
    ],
    creditos: [
      ['Invitación', 'whiim · Stephano Ginocchio'],
      ['Fotos', 'Archivo de la pareja']
    ]
  },

  /* ---------------- EJEMPLOS (fotos de stock de Pexels) ---------------- */
  {
    slug: 'lucia-mateo',
    pareja: 'Lucía & Mateo',
    lugar: 'Barranco, Lima',
    fecha: 'Concepto',
    ejemplo: true,
    portada: 'assets/img/bodas/lucia-mateo/cover.webp',
    hero: { src: 'assets/img/bodas/lucia-mateo/hero.webp', w: 2000, h: 1335, alt: 'Novios caminando de la mano por un pasaje, en blanco y negro.' },
    titulo: ['Lucía & Mateo', 'Barranco, Lima'],
    texto: [
      'Concepto de ejemplo. Una boda de tarde en Barranco: blanco y negro, mucho aire y una serif editorial. La invitación se lee como una revista de dos páginas.',
      'Las fotos son de stock y están aquí para mostrar cómo se ve una carpeta del archivo.'
    ],
    foto: { src: 'assets/img/bodas/lucia-mateo/color.webp', w: 1400, h: 932, alt: 'Manos con anillos sobre un ramo de calas blancas.' },
    galeriaTitulo: 'El día',
    galeria: [
      { src: 'assets/img/bodas/lucia-mateo/01.webp', w: 1200, h: 1805, alt: 'Manos con anillos de boda, en blanco y negro.' },
      { src: 'assets/img/bodas/lucia-mateo/02.webp', w: 1200, h: 800, alt: 'Calas blancas sobre fondo negro.' },
      { src: 'assets/img/bodas/lucia-mateo/03.webp', w: 1200, h: 1800, alt: 'Novios caminando por un parque, en blanco y negro.' }
    ],
    creditos: [['Fotos', 'Pexels (stock de ejemplo)']]
  },
  {
    slug: 'valeria-diego',
    pareja: 'Valeria & Diego',
    lugar: 'Pachacámac, Lima',
    fecha: 'Concepto',
    ejemplo: true,
    portada: 'assets/img/bodas/valeria-diego/cover.webp',
    hero: { src: 'assets/img/bodas/valeria-diego/hero.webp', w: 2000, h: 1333, alt: 'Manos de los novios con el anillo y tulipanes blancos.' },
    titulo: ['Valeria & Diego', 'Pachacámac, Lima'],
    texto: [
      'Concepto de ejemplo. Anillos, manos y flores en primer plano: una invitación íntima, hecha de detalles, con una paleta de marfil y gris.',
      'Las fotos son de stock y están aquí para mostrar cómo se ve una carpeta del archivo.'
    ],
    foto: { src: 'assets/img/bodas/valeria-diego/color.webp', w: 1400, h: 934, alt: 'Manos de los novios con sus anillos.' },
    galeriaTitulo: 'El día',
    galeria: [
      { src: 'assets/img/bodas/valeria-diego/01.webp', w: 1200, h: 1800, alt: 'Novia de espaldas con el velo.' },
      { src: 'assets/img/bodas/valeria-diego/02.webp', w: 1200, h: 1800, alt: 'Novia sentada junto a una ventana.' },
      { src: 'assets/img/bodas/valeria-diego/03.webp', w: 1200, h: 1800, alt: 'Novios de la mano bajando una escalera, en blanco y negro.' }
    ],
    creditos: [['Fotos', 'Pexels (stock de ejemplo)']]
  },
  {
    slug: 'camila-joaquin',
    pareja: 'Camila & Joaquín',
    lugar: 'Centro de Lima',
    fecha: 'Concepto',
    ejemplo: true,
    portada: 'assets/img/bodas/camila-joaquin/cover.webp',
    hero: { src: 'assets/img/bodas/camila-joaquin/hero.webp', w: 2000, h: 1333, alt: 'Novios caminando por una plaza, en blanco y negro.' },
    titulo: ['Camila & Joaquín', 'Centro de Lima'],
    texto: [
      'Concepto de ejemplo. Boda civil en la ciudad, con estética de foto callejera y una tipografía de máquina de escribir.',
      'Las fotos son de stock y están aquí para mostrar cómo se ve una carpeta del archivo.'
    ],
    foto: { src: 'assets/img/bodas/camila-joaquin/color.webp', w: 1400, h: 933, alt: 'Manos con anillos sobre el vestido de novia.' },
    galeriaTitulo: 'El día',
    galeria: [
      { src: 'assets/img/bodas/camila-joaquin/01.webp', w: 1200, h: 1798, alt: 'Novia apoyada en un muro de piedra, en blanco y negro.' },
      { src: 'assets/img/bodas/camila-joaquin/02.webp', w: 1200, h: 1807, alt: 'Novia sentada en una escalera, en blanco y negro.' },
      { src: 'assets/img/bodas/camila-joaquin/03.webp', w: 1200, h: 1799, alt: 'Los novios se toman de la mano frente a una pared oscura.' }
    ],
    creditos: [['Fotos', 'Pexels (stock de ejemplo)']]
  },
  {
    slug: 'andrea-sebastian',
    pareja: 'Andrea & Sebastián',
    lugar: 'Cieneguilla, Lima',
    fecha: 'Concepto',
    ejemplo: true,
    portada: 'assets/img/bodas/andrea-sebastian/cover.webp',
    hero: { src: 'assets/img/bodas/andrea-sebastian/hero.webp', w: 2000, h: 1335, alt: 'Recepción de noche al aire libre, con guirnaldas de luces.' },
    titulo: ['Andrea & Sebastián', 'Cieneguilla, Lima'],
    texto: [
      'Concepto de ejemplo. Una boda de noche: luces cálidas, fondo casi negro y la cuenta regresiva como protagonista.',
      'Las fotos son de stock y están aquí para mostrar cómo se ve una carpeta del archivo.'
    ],
    foto: { src: 'assets/img/bodas/andrea-sebastian/color.webp', w: 1400, h: 933, alt: 'Mesa de la recepción con velas y flores.' },
    galeriaTitulo: 'La noche',
    galeria: [
      { src: 'assets/img/bodas/andrea-sebastian/01.webp', w: 1200, h: 1812, alt: 'Silueta de los novios de noche, a contraluz.' },
      { src: 'assets/img/bodas/andrea-sebastian/02.webp', w: 1200, h: 2133, alt: 'Novia en penumbra con un perfume.' },
      { src: 'assets/img/bodas/andrea-sebastian/03.webp', w: 1200, h: 800, alt: 'Manos de los novios sosteniendo los anillos.' }
    ],
    creditos: [['Fotos', 'Pexels (stock de ejemplo)']]
  }
];
