/* ==========================================================================
   PROYECTOS DEL PORTAFOLIO
   Cada proyecto aparece en la grilla (home y portfolio) y tiene su página:
   project.html#slug

   Imágenes: la PRIMERA es la portada de la página del proyecto, la SEGUNDA va
   junto al texto y el resto forma la galería. En la grilla salen todas, en orden.

   Medidas para diseñar (iguales para todos los proyectos; guías en el README):
   - Portada, computadora: 2560 × 1440 (16:9). Portada, celular: 1080 × 1920
     (9:16), en el campo mobile.
   - Imagen junto al texto: 1080 × 1200 (9:10).
   - Grilla: 3 casillas por proyecto, 1080 × 1350 cada una (4:5), en grid.
     { src: 'assets/img/proyectos/slug/01.jpg', thumb: '...01-sm.jpg',
       alt: 'Qué se ve', w: 1600, h: 1000 }
   - thumb es opcional (versión chica para la grilla, ~520 px de ancho).
   - w y h son el ancho y alto reales: evitan saltos al cargar.
   - mobile es opcional, solo para la portada: versión vertical para celular.

   Videos: en lugar de src, { video: 'assets/video/...mp4', poster: '...webp',
   w, h }. MP4 H.264 a unos 720 px de ancho. Se reproducen en silencio solo
   mientras están a la vista; con controls: true se puede activar el sonido.

   process y result son opcionales, para casos con desarrollo (ver Diseños en
   Tendencia): process es una lista de pasos { title, text, media: [...] } y
   result agrega un bloque "Resultado" con las imágenes desde la tercera.

   grid es opcional: la lista de miniaturas para la grilla de home y
   portfolio (mismo formato que images). Sin grid, salen todas las imágenes.
   En la grilla, lo más vertical que 3:4 se recorta a 3:4.

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
    slug: 'disenos-en-tendencia',
    page: 'disenos-en-tendencia.html',   // página propia: se comparte como stephanoginocchio.com/disenos-en-tendencia
    title: 'Diseños en Tendencia',
    subtitle: 'Video ad · VK Studio × Khōra',
    service: 'Visual',
    year: '2026',
    color: '#d9b26f',
    statement: ['Las uñas al frente,', 'el diseño detrás.'],
    text: [
      'Campaña para Diseños en Tendencia, el taller privado de VK Studio con Khōra. El pedido era un video para pauta en Instagram, pero solo había fotos: nada grabado que editar.',
      'Con las fotos de Kamila como base, generé en Adobe Firefly los planos en movimiento que faltaban y armé un reel para el feed, un anuncio de 15 segundos y dos piezas fijas.'
    ],
    credits: [
      ['Año', '2026'],
      ['Cliente', 'VK Studio × Khōra'],
      ['Rol', 'Dirección de arte, video y edición'],
      ['Fotografía', 'Kamila · Khōra'],
      ['Herramientas', 'Firefly · Premiere Pro · Illustrator']
    ],
    /* Proceso: cada paso tiene título, texto e imágenes o videos.
       cols = columnas en computadora, colsM = en celular. cap = leyenda. */
    process: [
      {
        title: 'Solo había fotos',
        text: 'Kamila fotografió las uñas del taller, pero no había video: solo fotos fijas y un clip corto. Ese fue todo el material de partida.',
        cols: 3, colsM: 3,
        media: [
          { src: 'assets/img/proyectos/disenos-en-tendencia/foto-1.webp', w: 1200, h: 1200, alt: 'Foto original: las cinco uñas en fila sobre fondo oscuro.' },
          { src: 'assets/img/proyectos/disenos-en-tendencia/foto-2.webp', w: 1200, h: 1200, alt: 'Foto original: macro del relieve dorado y la gema ámbar.' },
          { src: 'assets/img/proyectos/disenos-en-tendencia/foto-3.webp', w: 1200, h: 1200, alt: 'Foto original: detalle de las uñas doradas y de mármol.' }
        ]
      },
      {
        title: 'Primero, una pieza fija',
        text: [
          'El arte anterior era tan llamativo que competía con las uñas, y los estilos de VK y Khōra chocan entre sí. Propuse lo contrario: fondo oscuro, tipografía sobria y las uñas como protagonistas.',
          'A VK le pareció poco llamativo. Mi respuesta fue darle movimiento: un video en pauta llama más la atención que cualquier color.'
        ],
        cols: 2, colsM: 2,
        media: [
          { src: 'assets/img/proyectos/disenos-en-tendencia/prueba.webp', w: 720, h: 1280, cap: 'Primera propuesta', alt: 'Primera propuesta: pieza fija con el título, el temario y los datos del taller sobre la foto de las uñas.' },
          { src: 'assets/img/proyectos/disenos-en-tendencia/ads-1.webp', w: 720, h: 1279, cap: 'Pieza final', alt: 'Pieza fija final: las uñas más grandes, el temario y los datos del taller.' }
        ]
      },
      {
        title: 'Video sin cámara',
        text: 'Usé las fotos como referencia en Adobe Firefly para generar los planos que no existían: macros del relieve dorado, recorridos de cámara y pruebas de luz. Esas generaciones fueron los insumos de la edición.',
        cols: 3, colsM: 2,
        media: [
          { video: 'assets/video/disenos-en-tendencia/firefly-29Q.mp4', poster: 'assets/img/proyectos/disenos-en-tendencia/ff-29Q.webp', w: 540, h: 960, alt: 'Clip generado con Adobe Firefly: macro de las uñas doradas.' },
          { video: 'assets/video/disenos-en-tendencia/firefly-Oh9.mp4', poster: 'assets/img/proyectos/disenos-en-tendencia/ff-Oh9.webp', w: 540, h: 960, alt: 'Clip generado con Adobe Firefly: la cámara se acerca a las uñas.' },
          { video: 'assets/video/disenos-en-tendencia/firefly-6kJ.mp4', poster: 'assets/img/proyectos/disenos-en-tendencia/ff-6kJ.webp', w: 540, h: 960, alt: 'Clip generado con Adobe Firefly: macro de la gema ámbar.' },
          { video: 'assets/video/disenos-en-tendencia/firefly-ChB.mp4', poster: 'assets/img/proyectos/disenos-en-tendencia/ff-ChB.webp', w: 540, h: 960, alt: 'Clip generado con Adobe Firefly: las uñas bajo una luz clara.' },
          { video: 'assets/video/disenos-en-tendencia/firefly-j42.mp4', poster: 'assets/img/proyectos/disenos-en-tendencia/ff-j42.webp', w: 540, h: 960, alt: 'Clip generado con Adobe Firefly: recorrido de cámara por la fila de uñas.' },
          { video: 'assets/video/disenos-en-tendencia/firefly-pcN.mp4', poster: 'assets/img/proyectos/disenos-en-tendencia/ff-pcN.webp', w: 540, h: 960, alt: 'Clip generado con Adobe Firefly: prueba de las uñas con luz rosa.' }
        ]
      },
      {
        title: 'Una edición, dos versiones',
        text: 'Edité los planos y animé el título y el temario sobre las uñas. Luego lo adapté a dos usos: el reel para el feed, con su portada para que el perfil se vea ordenado, y el anuncio, con el texto lejos de los bordes, donde Instagram pone el nombre de la cuenta y el botón.',
        cols: 2, colsM: 2,
        media: [
          { src: 'assets/img/proyectos/disenos-en-tendencia/version-reel.webp', w: 720, h: 1280, cap: 'Reel · feed', alt: 'Cuadro del reel para el feed, con el temario y los datos del taller.' },
          { src: 'assets/img/proyectos/disenos-en-tendencia/version-anuncio.webp', w: 720, h: 1280, cap: 'Anuncio · zonas seguras', alt: 'El mismo cuadro en el anuncio, con el texto más lejos de los bordes.' }
        ]
      }
    ],
    /* En la grilla: la foto, un clip de Firefly y la portada del reel
       (las demás piezas finales se parecen entre sí) */
    grid: [
      { src: 'assets/img/proyectos/disenos-en-tendencia/01.webp', thumb: 'assets/img/proyectos/disenos-en-tendencia/01-sm.webp', w: 2048, h: 1212, alt: 'Uñas press-on de Khōra con relieve dorado bajo un foco de luz.' },
      { src: 'assets/img/proyectos/disenos-en-tendencia/ff-6kJ.webp', w: 540, h: 960, alt: 'Cuadro de un clip generado con Adobe Firefly: macro de la gema ámbar.' },
      { src: 'assets/img/proyectos/disenos-en-tendencia/02.webp', thumb: 'assets/img/proyectos/disenos-en-tendencia/02-sm.webp', w: 720, h: 1275, alt: 'Portada del reel de Diseños en Tendencia.' }
    ],
    result: {
      title: 'Resultado',
      text: 'Un reel de 19 segundos con portada para el feed, un anuncio de 15 segundos y dos piezas fijas para pauta, todo en formato vertical 1080 × 1920. Las uñas siguen siendo lo primero que se ve.',
      cols: 4
    },
    images: [
      { src: 'assets/img/proyectos/disenos-en-tendencia/01.webp', thumb: 'assets/img/proyectos/disenos-en-tendencia/01-sm.webp', mobile: 'assets/img/proyectos/disenos-en-tendencia/01-m.webp', w: 2048, h: 1212, alt: 'Uñas press-on de Khōra con relieve dorado, mármol y una gema ámbar, en fila bajo un foco de luz. Foto de Kamila.' },
      { src: 'assets/img/proyectos/disenos-en-tendencia/intro.webp', w: 1080, h: 1200, alt: 'Portada del reel: «Taller privado. Diseños en Tendencia» sobre las uñas.' },
      { video: 'assets/video/disenos-en-tendencia/reel.mp4', poster: 'assets/img/proyectos/disenos-en-tendencia/reel-poster.webp', thumb: 'assets/img/proyectos/disenos-en-tendencia/reel-poster-sm.webp', controls: true, w: 720, h: 1280, cap: 'Reel · 19 s · con sonido', alt: 'Reel final de Diseños en Tendencia.' },
      { video: 'assets/video/disenos-en-tendencia/anuncio.mp4', poster: 'assets/img/proyectos/disenos-en-tendencia/anuncio-poster.webp', thumb: 'assets/img/proyectos/disenos-en-tendencia/anuncio-poster-sm.webp', controls: true, w: 720, h: 1280, cap: 'Anuncio · 15 s', alt: 'Anuncio final de 15 segundos.' },
      { src: 'assets/img/proyectos/disenos-en-tendencia/ads-1.webp', thumb: 'assets/img/proyectos/disenos-en-tendencia/ads-1-sm.webp', w: 720, h: 1279, cap: 'Pieza fija · anuncio', alt: 'Pieza fija para anuncio con el temario y los datos de contacto.' },
      { src: 'assets/img/proyectos/disenos-en-tendencia/ads-2.webp', thumb: 'assets/img/proyectos/disenos-en-tendencia/ads-2-sm.webp', w: 720, h: 1279, cap: 'Pieza fija · con marco', alt: 'Variante de la pieza fija con marco ornamental.' }
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
