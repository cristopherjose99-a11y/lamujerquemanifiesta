# La Mujer que Manifiesta

Sitio de venta de los kits digitales. HTML estático, sin build de dependencias, servido por GitHub Pages.

🔗 **Web:** https://lamujerquemanifiesta.com

---

## ➕ Cómo añadir un producto

Abre **[`MIS-PRODUCTOS.js`](MIS-PRODUCTOS.js)**, baja hasta donde pone `PRODUCTO 2`, quita las
marcas de comentario (`/*` y `*/`) y cambia los textos. Son siete líneas:

```js
{
  slug:        "mi-producto-nuevo",    // la carpeta: .../mi-producto-nuevo/
  nombre:      "Mi Producto Nuevo",
  categoria:   "Kit digital",
  subtitulo:   "Lo que sea",
  checkout:    "https://go.hotmart.com/XXXXX?ap=XXXX",
  precio:      "$27",
  descripcion: "Una línea contando de qué va."
}
```

Con eso se genera sola una landing completa, con el estilo del sitio: portada, oferta con
cuenta atrás, garantía, preguntas frecuentes y cierre. Y aparece en el catálogo.

Guarda y haz **una** de estas dos cosas:

- **Desde GitHub en el navegador.** Edita el archivo ahí, dale a *Commit*, y una acción
  automática genera y publica. No hace falta nada más.
- **Desde tu ordenador.** `node build.js`, luego `git add -A && git commit -m "nuevo producto" && git push`.

### Los textos largos son opcionales

Cada producto puede llevar un bloque `textos: { ... }` con la copia larga (la sección de dolor,
las piezas, los bonos, las preguntas propias…). **Si no lo pones, esas secciones no salen** y la
landing se genera igual, más corta pero completa. Pide que te la escriban y se rellena después.

### Lo que se pone solo

Sin que tengas que hacer nada, cada producto hereda de `AJUSTES`: la barra dorada de arriba,
las horas de la cuenta atrás, los días de garantía, el correo de soporte y el aviso legal.
Y se le generan tres preguntas frecuentes que valen para cualquier producto digital (cómo se
recibe, si caduca el acceso, cómo se devuelve).

### Si todavía no se vende

Ponle `proximamente: true`. Sale en el catálogo marcado como **Pronto**, sin botón de compra.

---

## Para cambiar algo rápido

Todo está en `MIS-PRODUCTOS.js`:

| Qué quieres cambiar | Dónde |
|---|---|
| El precio | `precio` y `precioAntes` del producto |
| El enlace de pago | `checkout` del producto |
| Las horas del contador | `horasContador`, en `AJUSTES` |
| Los días de garantía | `diasGarantia`, en `AJUSTES` |
| El correo de soporte | `correoSoporte`, en `AJUSTES` |
| La barra dorada de arriba | `barraUrgencia`, en `AJUSTES` |
| Cuál sale al entrar al sitio | `portada: true` (solo uno lo lleva) |

---

## Los archivos

| | |
|---|---|
| **`MIS-PRODUCTOS.js`** | **El único que editas.** |
| `build.js` | El generador. Contiene los estilos del sitio. No hace falta abrirlo. |
| `og-image.jpg` | La imagen que se ve al compartir el enlace. |
| `.github/workflows/` | La automatización que publica al editar desde GitHub. |

**Generados: no los edites a mano**, se sobrescriben en cada generación.

| | |
|---|---|
| `index.html` | La portada. |
| `<nombre-del-producto>/` | Una carpeta por producto. Es lo que hace su dirección web. |
| `productos.html` | El catálogo. |
| `artifact.html` | Copia para previsualizar en Claude. |

---

## Stack

HTML estático · [Tailwind CSS 3.4.17](https://tailwindcss.com) por CDN · Playfair Display y Plus Jakarta Sans

### Paleta

| Token | Hex | Uso |
|---|---|---|
| Crema | `#FDFBF7` | Fondo principal |
| Lino | `#FAF6EE` | Secciones alternadas |
| Arena | `#E8DED1` | Tarjetas |
| Grafito | `#2A2421` | Texto |
| Oro | `#D4AF37` | CTAs y acentos |
| Oro viejo | `#C5A059` | Hover |

---

## La cuenta atrás

Es **por visitante**, no global. El plazo se guarda en el navegador de cada persona:

- Quien vuelve, retoma donde lo dejó. No se reinicia.
- Quien llega por primera vez, empieza con el plazo completo.
- Al llegar a cero arranca otro, nunca se queda en `00 h 00 m 00 s`.

Se cambia con `horasOferta` en `productos.config.js`. Está en 8 horas.

Funciona también en incógnito: si el navegador bloquea el almacenamiento, el plazo se
mantiene en memoria durante la visita.

---

## Dominio

`lamujerquemanifiesta.com`, comprado en Porkbun, apuntando a GitHub Pages con HTTPS.
Los detalles y el diagnóstico de problemas están en [DOMINIO.md](DOMINIO.md).

**El archivo [`CNAME`](CNAME) no se borra.** Si desaparece, la web deja de responder en el dominio.

---

## Pendiente

- [ ] **Píxeles de anuncios — el usuario pasará los IDs.**
  - **Meta Pixel** (Facebook + Instagram). ID numérico, de Meta Business Suite → Administrador de eventos.
  - **Google Analytics 4**. ID que empieza por `G-`, en Analytics → Administrar → Flujos de datos.
  - Se instalan en `build.js` para que entren en todas las páginas de golpe.
  - **Importante:** el pago ocurre en Hotmart, así que el píxel de la web solo ve visitas y clics.
    Hay que conectar el mismo píxel dentro de Hotmart (Herramientas → Píxeles) o las compras
    no se atribuyen y los anuncios optimizan a ciegas.

- [ ] **Testimonios reales.** Mientras el array `testimonios` esté vacío se muestra la sección
  de «primera edición», que dice la verdad. En cuanto metas testimonios reales, esa sección
  se sustituye sola por ellos.

- [ ] **Renovación automática del dominio** en Porkbun.

---

## Desarrollo local

```bash
node build.js && python3 -m http.server 8000
```

Luego abre http://localhost:8000
