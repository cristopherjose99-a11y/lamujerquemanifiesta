/* ══════════════════════════════════════════════════════════════════════════
   TUS PRODUCTOS

   Este es el único archivo que tienes que tocar para añadir un producto.
   Copia un bloque { ... } entero, pégalo debajo, cambia los textos, y ejecuta:

       node build.js

   Eso genera sola la landing completa del producto nuevo y la añade al
   catálogo. No hay que tocar HTML.

   ── CAMPOS OBLIGATORIOS ───────────────────────────────────────────────────
   slug       La carpeta donde vivirá: lamujerquemanifiesta.com/<slug>/
              Solo minúsculas, números y guiones. Sin tildes ni espacios.
   nombre     El nombre del producto.
   checkout   El enlace de pago (Hotmart, Stripe, el que sea).
   precio     Lo que cuesta, como texto: "$17".

   ── CAMPOS OPCIONALES ─────────────────────────────────────────────────────
   Todo lo demás se puede omitir. Si quitas una sección entera, esa sección
   simplemente no aparece en la página. Así puedes publicar un producto nuevo
   con lo mínimo y rellenarlo después.

   principal: true   marca cuál sale en la portada del sitio (solo uno).
   estado: "proximamente"   lo muestra en el catálogo pero sin botón de compra.
   ══════════════════════════════════════════════════════════════════════════ */

module.exports = [

  /* ───────────────────────────── PRODUCTO 1 ───────────────────────────── */
  {
    slug:      "la-mujer-que-manifiesta",
    principal: true,
    estado:    "disponible",

    nombre:    "La Mujer que Manifiesta",
    categoria: "Kit digital",
    subtitulo: "Método de 21 días",

    checkout:    "https://go.hotmart.com/P107334202L?ap=c4cb",
    precio:      "$17",
    precioAntes: "$55",
    moneda:      "USD",
    descuento:   "69%",

    // Texto de la barra dorada de arriba. Quítalo y la barra no sale.
    urgencia: "✨ OFERTA DE LANZAMIENTO — 69% DE DESCUENTO DISPONIBLE HOY",

    // Horas que dura la cuenta atrás de cada visitante.
    horasOferta: 8,

    // Días de garantía. Pon 0 y la sección de garantía no aparece.
    garantiaDias: 7,

    seo: {
      titulo:      "La Mujer que Manifiesta — Kit digital de 21 días",
      descripcion: "Reprograma tu mente subconsciente, rompe el ciclo de escasez y atrae abundancia en 21 días. Libro digital, trackers imprimibles y audios guiados. Oferta de lanzamiento: 69% de descuento."
    },

    hero: {
      // Lo que va entre <em> sale en dorado.
      titular:    "Reprograma tu mente subconsciente, rompe el ciclo de escasez y atrae abundancia en <em>21 días</em>",
      subtitular: "El método práctico paso a paso para liberar tus bloqueos con el dinero, tus proyectos y tu poder interior.",
      cta:        "¡Quiero mi kit ahora por $17!",
      notaCta:    "Acceso inmediato · Pago único · Garantía de 7 días",
      insignias:  ["Libro digital", "Trackers imprimibles", "Audios guiados"]
    },

    // La portada que se dibuja en el mockup 3D.
    portada: {
      arriba: "Kit digital",
      titulo: "La Mujer<br>que <em>Manifiesta</em>",
      bajo:   "Método de 21 días",
      pie:    "Libro · Trackers · Audios"
    },

    dolor: {
      eyebrow: "Antes de seguir",
      titulo:  "Si algo de esto te suena familiar, estás en el lugar correcto",
      puntos: [
        "Te esfuerzas, trabajas de más, y el dinero siempre alcanza <strong>justo para lo justo</strong>.",
        "Dices que quieres abundancia y por dentro algo te susurra <strong>“pero no para ti”</strong>.",
        "Empiezas proyectos con fuego y los abandonas en la <strong>semana tres</strong>.",
        "Repites afirmaciones frente al espejo y <strong>no sientes nada</strong>.",
        "Sientes culpa cuando pides más, como si desear <strong>fuera egoísmo</strong>.",
        "Has leído sobre manifestación, pero nadie te dijo <strong>qué hacer cada día</strong>."
      ],
      cierre: "No te falta disciplina. Te falta reprogramar la parte de ti que decide, en silencio, cuánto mereces recibir."
    },

    porque: {
      eyebrow:  "El problema real",
      titulo:   "El problema no eres tú. Es tu programación.",
      parrafos: [
        "Tu mente consciente decide una parte mínima de tu día. El resto lo gobierna un sistema de creencias que se instaló antes de que supieras elegir: lo que escuchaste sobre el dinero en tu casa, lo que viste sufrir a tu madre, lo que aprendiste a callar para no incomodar.",
        "Por eso la fuerza de voluntad sola no funciona. Puedes querer ganar más y seguir sabotéandote, porque una parte de ti aprendió que tener es peligroso.",
        "@Las creencias no se discuten. Se sustituyen. Y eso se hace con repetición consciente, cuerpo presente y un plan diario que no te deje improvisar."
      ],
      // El párrafo que empieza por @ sale destacado.
      cajaTitulo: "Qué cambia en 21 días",
      pasos: [
        { titulo: "Ves el patrón",     texto: "Nombras la creencia exacta que te mantiene en el mismo lugar." },
        { titulo: "Lo sueltas",        texto: "Dejas de pelear con la emoción y aprendes a atravesarla." },
        { titulo: "Instalas lo nuevo", texto: "Repites el nuevo guion hasta que tu cuerpo lo reconoce como verdad." }
      ]
    },

    incluye: {
      eyebrow:  "El kit completo",
      titulo:   "Tres piezas que trabajan juntas",
      entrada:  "Una para entender, una para sostener el hábito y una para hablarle directo al subconsciente.",
      piezas: [
        {
          etiqueta: "Pieza uno",
          titulo:   "El libro digital",
          texto:    "El método completo en 7 capítulos: de dónde viene tu relación con el dinero, cómo detectar el bloqueo que repites y qué hacer con él. Lenguaje claro, sin misticismo vacío.",
          formato:  "PDF · Para leer en el celular"
        },
        {
          etiqueta: "Pieza dos",
          titulo:   "Los trackers imprimibles",
          texto:    "Tu registro de 21 días, el mapa de creencias heredadas, la rueda de áreas de vida y el diario de evidencias. Imprímelos o escríbelos en digital.",
          formato:  "Imprimible · Tamaño carta y A4"
        },
        {
          etiqueta: "Pieza tres",
          titulo:   "Los audios guiados",
          texto:    "Sesiones de reprogramación para escuchar al despertar y antes de dormir, cuando la mente está más receptiva. Con tu voz interna trabajando a favor.",
          formato:  "MP3 · Descarga y escucha sin internet"
        }
      ]
    },

    camino: {
      eyebrow: "El camino",
      titulo:  "Tus 21 días, semana por semana",
      etapas: [
        { cuando: "Días 1 – 7",   titulo: "Diagnóstico", texto: "Escribes tu historia con el dinero y descubres cuál de las creencias de tu familia sigues cargando. Sin juicio, solo claridad." },
        { cuando: "Días 8 – 14",  titulo: "Liberación",  texto: "Trabajas la culpa, el miedo a incomodar y la vergüenza de pedir. Aquí entran los audios y el ejercicio de perdón financiero." },
        { cuando: "Días 15 – 21", titulo: "Creación",    texto: "Instalas el guion nuevo, defines tu petición con precisión y registras la primera evidencia de que algo se movió." }
      ]
    },

    // Mientras no haya testimonios reales. Bórrala cuando los tengas.
    primeraEdicion: {
      eyebrow:  "Primera edición",
      titulo:   "Vas a estar entre las primeras",
      destacado:"Este kit se publica hoy por primera vez.",
      parrafos: [
        "No vas a encontrar aquí testimonios ni capturas de resultados. Podría inventarlos, como hacen tantas páginas como esta, pero entonces lo primero que haría contigo sería mentirte. Y este método va justo de lo contrario.",
        "@Lo que sí puedo darte son dos cosas concretas: el precio más bajo al que va a estar nunca, y siete días para devolverlo si al abrirlo sientes que no es para ti.",
        "Si haces los 21 días y algo se mueve, escríbeme. Las historias de esta primera edición son las que van a ocupar este espacio."
      ]
    },

    // Testimonios reales. Déjalo vacío hasta tenerlos: no inventes ninguno.
    testimonios: [],

    bonos: {
      eyebrow: "Incluidos hoy",
      titulo:  "Tres bonos que se van con el lanzamiento",
      lista: [
        { titulo: "Meditación «Dinero sin culpa»", texto: "Doce minutos para separar el merecimiento del esfuerzo. La que más piden repetir.", valor: "$19" },
        { titulo: "Tu guion de afirmaciones",      texto: "Plantilla para escribir afirmaciones que tu mente sí acepta, en lugar de frases que rechaza.", valor: "$14" },
        { titulo: "Ritual de luna nueva",          texto: "Checklist de una página para plantear tu petición del mes con claridad y cerrarla bien.", valor: "$12" }
      ]
    },

    oferta: {
      eyebrow: "Oferta de lanzamiento",
      titulo:  "Todo el kit, hoy, por menos de lo que cuesta un café a la semana",
      desglose: [
        { concepto: "Libro digital «La Mujer que Manifiesta»", valor: "$27" },
        { concepto: "Trackers imprimibles de 21 días",          valor: "$15" },
        { concepto: "Audios de reprogramación",                 valor: "$13" },
        { concepto: "Los tres bonos de lanzamiento",            valor: "$45" }
      ],
      valorTotal: "$100",
      cta:        "Sí, quiero mi kit por $17",
      notaCta:    "Acceso inmediato por correo · Pago seguro<br>Garantía de devolución de 7 días"
    },

    garantia: {
      titulo: "Pruébalo sin riesgo",
      texto:  "Si haces los ejercicios de la primera semana y sientes que esto no es para ti, escríbenos dentro de los primeros 7 días y te devolvemos el dinero completo. Sin cuestionarios, sin incomodidad."
    },

    paraQuien: {
      si: [
        "Estás lista para mirar de frente tu relación con el dinero.",
        "Quieres un plan diario, no más teoría acumulada.",
        "Puedes dedicarle 15 minutos al día durante tres semanas.",
        "Te cansaste de empezar y no terminar."
      ],
      no: [
        "Buscas que el dinero llegue sin que tú muevas nada.",
        "Esperas resultados sin escribir ni un ejercicio.",
        "Quieres asesoría financiera o de inversión. Esto no lo es.",
        "Atraviesas una crisis que necesita acompañamiento profesional."
      ]
    },

    faq: [
      { p: "¿Cómo y cuándo recibo el kit?", r: "Al confirmarse el pago te llega un correo con el enlace de descarga, normalmente en menos de cinco minutos. Son archivos digitales: no esperas envío ni pagas por entrega." },
      { p: "Nunca he trabajado la manifestación. ¿Me va a servir?", r: "Está escrito para empezar desde cero. El libro explica cada concepto antes de pedirte que hagas algo con él, y los trackers te dicen exactamente qué toca cada día." },
      { p: "¿Cuánto tiempo necesito al día?", r: "Unos 15 minutos: un audio corto y una página del tracker. Está pensado para una mujer con trabajo, casa y poco tiempo libre." },
      { p: "¿Puedo imprimir los trackers?", r: "Sí, vienen listos en tamaño carta y A4. También puedes escribirlos en digital desde el celular o la tablet si prefieres no imprimir." },
      { p: "¿El acceso caduca?", r: "No. Descargas los archivos y son tuyos. Puedes repetir los 21 días cuantas veces quieras." },
      { p: "¿Y si no me gusta?", r: "Tienes 7 días para pedir la devolución completa escribiendo al correo de soporte. Te regresamos el pago sin pedirte explicaciones." }
    ],

    cierre: {
      eyebrow: "Último paso",
      titulo:  "Dentro de 21 días vas a estar en el mismo lugar o en otro",
      texto:   "La diferencia no la hace la suerte. La hace la mujer que decide, hoy, dejar de negociar con su propia escasez.",
      cta:     "Empezar hoy por $17",
      nota:    "Acceso inmediato · Garantía de 7 días · Pago único"
    },

    // Cómo se ve en la página de catálogo.
    catalogo: {
      descripcion: "Libro digital, trackers imprimibles y audios de reprogramación para romper el ciclo de escasez en tres semanas.",
      boton:       "Comprar el kit"
    }
  },

  /* ───────────────────────────── PRODUCTO 2 ─────────────────────────────
     Ejemplo de lo MÍNIMO que hace falta. Descoméntalo, cambia los textos y
     ejecuta `node build.js`: tendrá su propia landing y saldrá en el catálogo.

  {
    slug:      "tu-segundo-producto",
    estado:    "proximamente",
    nombre:    "Tu segundo producto",
    categoria: "Kit digital",
    subtitulo: "Lo que sea",
    checkout:  "",
    precio:    "",
    catalogo:  { descripcion: "Una línea contando de qué va." }
  }
  ─────────────────────────────────────────────────────────────────────── */

];
