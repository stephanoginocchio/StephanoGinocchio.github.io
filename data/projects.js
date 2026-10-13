/* ==========================================================================
   PROYECTOS DEL PORTAFOLIO
   Cada proyecto aparece en la grilla (home y portfolio) y tiene su página:
   project.html#slug

   Imágenes: la PRIMERA es la portada de la página del proyecto, la SEGUNDA va
   junto al texto y el resto forma la galería. En la grilla salen todas, en orden.
     { src: 'assets/img/proyectos/slug/01.jpg', thumb: '...01-sm.jpg',
       alt: 'Qué se ve', w: 1600, h: 1000 }
   - thumb es opcional (versión chica para la grilla, ~520 px de ancho).
   - w y h son el ancho y alto reales: evitan saltos al cargar.
   - mobile es opcional, solo para la portada: versión vertical para celular.

   Mientras no tengas la imagen, deja una placa:
     { pendiente: '4/5', nota: 'Portada de la guía' }
   ('4/5' es la proporción ancho/alto que tendrá la imagen.)
   ========================================================================== */
window.PROJECTS = [
  {
    slug: 'rosana-nicanor',
    title: 'Rosana & Nicanor',
    subtitle: 'Invitación web de boda',
    service: 'Web',
    year: '2026',
    color: '#e8dcc6',
    statement: ['Romanticismo editorial', 'en geometría precisa.'],
    text: [
      'Invitación web para la boda de Rosana y Nicanor en Tingo María. Una caligrafía script contra una sans fría y espaciada, terciopelo oscuro y crema: la emoción contenida en una retícula exacta.',
      'Diseñada en Illustrator y programada a mano en HTML, CSS y JavaScript, sin plantillas. Portada con música, cuenta regresiva, ceremonia y recepción con mapa, galería, regalos, dress code y confirmación de asistencia.'
    ],
    credits: [
      ['Año', '2026'],
      ['Rol', 'Diseño y desarrollo'],
      ['Herramientas', 'Illustrator · HTML · CSS · JS'],
      ['Lugar', 'Tingo María, Perú']
    ],
    link: { label: 'Ver la carpeta en whiim', href: 'whiim/boda.html#rosana-nicanor' },
    images: [
      { src: 'assets/img/proyectos/rosana-nicanor/02.webp', thumb: 'assets/img/proyectos/rosana-nicanor/02-sm.webp', mobile: 'assets/img/bodas/rosana-nicanor/pantallas/hero.webp', w: 1600, h: 1000, alt: 'Portada de la invitación: Rosana y Nicanor caminando por un bosque, con su monograma, la fecha y el lugar.' },
      { src: 'assets/img/proyectos/rosana-nicanor/01.webp', thumb: 'assets/img/proyectos/rosana-nicanor/01-sm.webp', w: 1600, h: 1000, alt: 'Pantalla de bienvenida en blanco y negro con los nombres y el botón para abrir la invitación.' },
      { src: 'assets/img/proyectos/rosana-nicanor/03.webp', thumb: 'assets/img/proyectos/rosana-nicanor/03-sm.webp', w: 780, h: 900, alt: 'La pantalla de bienvenida en el celular.' },
      { src: 'assets/img/proyectos/rosana-nicanor/04.webp', thumb: 'assets/img/proyectos/rosana-nicanor/04-sm.webp', w: 1600, h: 1122, alt: 'Sección de bienvenida con la fecha, el lugar y fotos de la pareja.' },
      { src: 'assets/img/proyectos/rosana-nicanor/05.webp', thumb: 'assets/img/proyectos/rosana-nicanor/05-sm.webp', w: 1600, h: 770, alt: 'Ceremonia y recepción: fotos de cada lugar, horarios y botones para ver el mapa.' },
      { src: 'assets/img/proyectos/rosana-nicanor/06.webp', thumb: 'assets/img/proyectos/rosana-nicanor/06-sm.webp', w: 780, h: 480, alt: 'Cuenta regresiva para el sí en el celular.' },
      { src: 'assets/img/proyectos/rosana-nicanor/07.webp', thumb: 'assets/img/proyectos/rosana-nicanor/07-sm.webp', w: 1600, h: 926, alt: 'Galería de fotos de la pareja con el botón para ver más momentos.' }
    ]
  },

  {
    slug: 'master-aplicador',
    title: 'Master Aplicador Expert',
    subtitle: 'Guía de estudio · VK Studio',
    service: 'Editorial',
    year: '',   // completa el año
    color: '#ff5fa8',
    statement: ['Contenido técnico', 'tratado como libro de arte.'],
    text: [
      'Guía impresa de unas 50 páginas para la formación Master Aplicador Expert de VK Studio. Contenido técnico y anatómico —cutícula, pliegue queratinizado, queratosis— explicado con diagramas anotados.',
      'Un sistema visual negro y cinematográfico que convierte un manual de clase en un objeto que se quiere conservar. Incluye packaging, tarjetas de bienvenida y separadores.'
    ],
    credits: [
      ['Cliente', 'VK Studio'],
      ['Rol', 'Diseño editorial y diagramación'],
      ['Formato', 'Impreso · ~50 páginas']
    ],
    images: [
      { pendiente: '4/5', nota: 'Portada de la guía' },
      { pendiente: '3/2', nota: 'Doble página' },
      { pendiente: '3/2', nota: 'Diagrama anotado' },
      { pendiente: '1/1', nota: 'Packaging' },
      { pendiente: '4/5', nota: 'Tarjetas y separadores' }
    ]
  },

  {
    slug: 'vk-studio',
    title: 'VK Studio',
    subtitle: 'Rebranding y manual de marca',
    service: 'Visual',
    year: '',
    color: '#ff8cc6',
    statement: ['Un logo inflado', 'y el sistema que lo sostiene.'],
    text: [
      'Rebranding para VK Studio, academia y marca de nail art de Lima. Un logo inflado y orgánico como versión de arte, una versión plana para el día a día y un sistema de rosas con blanco y negro.',
      'El manual reúne tipografía (Neue Haas y Satoshi), color, aplicaciones, usos correctos e incorrectos y la comparación entre la imagen anterior y la nueva.'
    ],
    credits: [
      ['Cliente', 'VK Studio'],
      ['Rol', 'Identidad y manual de marca'],
      ['Tipografías', 'Neue Haas · Satoshi']
    ],
    images: [
      { pendiente: '16/10', nota: 'Logo, versión arte' },
      { pendiente: '16/10', nota: 'Sistema de color' },
      { pendiente: '4/5', nota: 'Aplicaciones' },
      { pendiente: '16/10', nota: 'Antes y después' }
    ]
  },

  {
    slug: 'khora',
    title: 'Khōra',
    subtitle: 'Identidad para press-on nails',
    service: 'Visual',
    year: '',
    color: '#d9d9d9',
    statement: ['Blackletter gótica', 'para una marca de uñas.'],
    text: [
      'Identidad para Khōra, marca personal de una nail artist que diseña press-on nails. Una blackletter gótica —la letra del metal y del tatuaje— aplicada a una marca femenina, con ornamento, versiones en círculo y un monograma «ō».',
      'Desborde artístico con precisión: dos mundos que no deberían tocarse, funcionando como si siempre hubieran estado juntos.'
    ],
    credits: [
      ['Rol', 'Identidad visual'],
      ['Entregables', 'Logo, monograma, versiones en círculo']
    ],
    images: [
      { pendiente: '1/1', nota: 'Logo blackletter' },
      { pendiente: '1/1', nota: 'Monograma ō' },
      { pendiente: '4/5', nota: 'Versiones en círculo' },
      { pendiente: '3/2', nota: 'Aplicaciones' }
    ]
  },

  {
    slug: 'parallelo',
    title: 'Parallelo',
    subtitle: 'Revista de arte independiente',
    service: 'Editorial',
    year: '',
    color: '#e3241b',
    statement: ['Arte conceptual denso,', 'maquetación suiza.'],
    text: [
      'Revista de arte independiente con sistema tipográfico propio y secciones como Signal Lost, Noise Poisoning, Junk Memory y White Noise Therapy. Nam June Paik, Kubrick, Ryoji Ikeda y la cultura grime, leídos con una maquetación editorial limpia.',
      'Una primera edición empezada y en pausa: el lugar donde diseño sin cliente, solo con criterio.'
    ],
    credits: [
      ['Rol', 'Edición, dirección de arte y maquetación'],
      ['Estado', 'Primera edición en proceso']
    ],
    images: [
      { pendiente: '3/4', nota: 'Portada' },
      { pendiente: '3/2', nota: 'Índice' },
      { pendiente: '3/2', nota: 'Signal Lost' },
      { pendiente: '3/2', nota: 'Noise Poisoning' },
      { pendiente: '3/4', nota: 'Sistema tipográfico' }
    ]
  }
];
