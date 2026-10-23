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

   page es opcional: un archivo .html propio del proyecto (como
   master-aplicador.html), con su título e imagen para la vista previa al
   compartir el link. La grilla y "Next project" enlazan ahí. Cómo crear uno:
   en el README, "Página propia para compartir un proyecto".
   Mientras no tengas la imagen, deja una placa:
     { pendiente: '4/5', nota: 'Portada de la guía' }
   ('4/5' es la proporción ancho/alto que tendrá la imagen.)
   Las placas pendientes NO se publican: la web muestra solo las imágenes
   terminadas, y un proyecto sin ninguna (hoy Khōra y Parallelo)
   no aparece hasta que le pongas la primera.
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
    page: 'master-aplicador.html',   // página propia: se comparte como stephanoginocchio.com/master-aplicador
    title: 'Master Aplicador Expert',
    subtitle: 'Guía de estudio · VK Studio',
    service: 'Editorial',
    year: '2026',
    color: '#ff5fa8',
    statement: ['Contenido técnico', 'tratado como libro de arte.'],
    text: [
      'Guía impresa de 134 páginas para Master Aplicador Expert, la formación de especialización de VK Studio para nail artists. Siete módulos —anatomía, diagnóstico, manicura, química, Dual Form, esculpido y fotografía— explicados con diagramas anotados y procesos paso a paso.',
      'Un sistema en dos tiempos: aperturas de módulo en negro, a sangre y con el título en vertical, y páginas técnicas en blanco con barras grises, letras de sección y el patrón VK detrás de los diagramas. Un manual de clase convertido en un objeto que se quiere conservar.'
    ],
    credits: [
      ['Año', '2026'],
      ['Cliente', 'VK Studio'],
      ['Rol', 'Diseño editorial y diagramación'],
      ['Formato', 'Impreso · A4 · 134 páginas'],
      ['Herramientas', 'InDesign · Firefly']
    ],
    images: [
      { src: 'assets/img/proyectos/master-aplicador/01.webp', thumb: 'assets/img/proyectos/master-aplicador/01-sm.webp', w: 1536, h: 1024, alt: 'Doble página del módulo de manicura: diámetros de la fresa flama y creación del bolsillo paso a paso, junto a una fresa real.' },
      { src: 'assets/img/proyectos/master-aplicador/02.webp', thumb: 'assets/img/proyectos/master-aplicador/02-sm.webp', w: 1122, h: 1402, alt: 'Portada negra de la guía: VK Studio, Master Aplicador y «Expert» en letra script, sobre terciopelo burdeos.' },
      { src: 'assets/img/proyectos/master-aplicador/03.webp', thumb: 'assets/img/proyectos/master-aplicador/03-sm.webp', w: 1122, h: 1402, alt: 'Apertura del módulo 01, Anatomía de la uña: corte anatómico del dedo a la izquierda y el título en vertical a la derecha.' },
      { src: 'assets/img/proyectos/master-aplicador/04.webp', thumb: 'assets/img/proyectos/master-aplicador/04-sm.webp', w: 1536, h: 1024, alt: 'Una mujer lee la guía abierta en el módulo de esculpido: estructuras cuadrada moderna y almendra clásica.' },
      { src: 'assets/img/proyectos/master-aplicador/05.webp', thumb: 'assets/img/proyectos/master-aplicador/05-sm.webp', w: 1536, h: 1024, alt: 'La guía abierta sobre terciopelo burdeos, en la doble página «Capas de la placa ungueal», con luz de ventana.' }
    ]
  },

  {
    slug: 'vk-studio',
    page: 'vk-studio.html',   // página propia: se comparte como stephanoginocchio.com/vk-studio
    title: 'VK Studio',
    subtitle: 'Rebranding y manual de marca',
    service: 'Visual',
    year: '2025',
    color: '#ff8cc6',
    statement: ['Un logo inflado', 'y el sistema que lo sostiene.'],
    text: [
      'Identidad para VK Studio, academia y estudio de nail art de Lima que trata cada diseño como una obra. Un logo inflado y brillante como versión de arte para campañas, una versión plana para el día a día y una paleta de tres rosas con blanco, gris y negro.',
      'El manual fija lo esencial para que la marca se vea igual en cada pieza: el espacio seguro del logo, las combinaciones de color aprobadas, los usos incorrectos y una pareja tipográfica, Neue Haas para títulos y Satoshi para textos.'
    ],
    credits: [
      ['Año', '2025'],
      ['Cliente', 'VK Studio'],
      ['Rol', 'Identidad visual y manual de marca'],
      ['Formato', 'Manual de marca · 12 láminas'],
      ['Tipografías', 'Neue Haas · Satoshi']
    ],
    images: [
      { src: 'assets/img/proyectos/vk-studio/01.webp', thumb: 'assets/img/proyectos/vk-studio/01-sm.webp', mobile: 'assets/img/proyectos/vk-studio/01-m.webp', w: 2400, h: 1350, alt: 'Logo de VK Studio en su versión inflada, rosa y brillante, sobre fondo negro.' },
      { src: 'assets/img/proyectos/vk-studio/02.webp', thumb: 'assets/img/proyectos/vk-studio/02-sm.webp', w: 2400, h: 1350, alt: 'Versión de arte y versión plana del logo: VK y VK Studio en rosa y en blanco.' },
      { src: 'assets/img/proyectos/vk-studio/03.webp', thumb: 'assets/img/proyectos/vk-studio/03-sm.webp', w: 2400, h: 1350, alt: 'Paleta de colores: Vivid Pink, Blush Pink, Pastel Pink, Pure White, Soft Gray y Deep Black, con sus códigos.' },
      { src: 'assets/img/proyectos/vk-studio/04.webp', thumb: 'assets/img/proyectos/vk-studio/04-sm.webp', w: 2400, h: 1350, alt: 'Aplicaciones recomendadas: el logo y el nombre sobre fondos rosa, blanco y negro.' },
      { src: 'assets/img/proyectos/vk-studio/05.webp', thumb: 'assets/img/proyectos/vk-studio/05-sm.webp', w: 2400, h: 1350, alt: 'Tipografía: Neue Haas para títulos y Satoshi para subtítulos y textos.' },
      { src: 'assets/img/proyectos/vk-studio/06.webp', thumb: 'assets/img/proyectos/vk-studio/06-sm.webp', w: 2400, h: 1350, alt: 'Patrón de logos VK sobre rosa intenso.' }
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
