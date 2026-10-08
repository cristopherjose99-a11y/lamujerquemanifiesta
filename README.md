# La Mujer que Manifiesta

Sitio de venta de los kits digitales. HTML estático, sin build de dependencias, servido por GitHub Pages.

🔗 **Web:** https://lamujerquemanifiesta.com

---

## ➕ Cómo añadir un producto

Todo se controla desde **un solo archivo**: [`productos.config.js`](productos.config.js).

Abre ese archivo, copia un bloque `{ ... }` entero, pégalo debajo y cambia los textos.
Lo mínimo que necesita un producto son cuatro datos:

```js
{
  slug:     "mi-producto-nuevo",     // la carpeta: lamujerquemanifiesta.com/mi-producto-nuevo/
  nombre:   "Mi Producto Nuevo",
  checkout: "https://go.hotmart.com/XXXXX?ap=XXXX",   // el enlace de pago
  precio:   "$27"
}
```

Luego, **una de estas dos cosas**:

**Desde el navegador (lo más fácil).** Edita `productos.config.js` en GitHub, dale a *Commit*,
y una acción automática genera las páginas y las publica. No hay que hacer nada más.

**Desde tu ordenador.** En la carpeta del proyecto:

```bash
node build.js
```

Y luego `git add -A && git commit -m "nuevo producto" && git push`.

En ambos casos se crea sola la landing completa del producto nuevo, idéntica en diseño a la
actual pero con sus textos, y aparece en el catálogo.

> Todas las secciones son opcionales. Si omites `dolor`, `bonos`, `faq`… esa sección
> simplemente no sale. Puedes publicar con lo mínimo y rellenar después.
>
> Si todavía no tienes el enlace de pago, pon `estado: "proximamente"`: sale en el catálogo
> marcado como «Pronto», sin botón de compra.

---

## Archivos

| Archivo | Para qué sirve |
|---|---|
| **`productos.config.js`** | **El único que editas.** Todos los productos y sus textos. |
| `build.js` | Genera las páginas a partir del anterior. `node build.js`. |
| `plantillas/` | Estilos compartidos: paleta, tipografías, componentes. |
| `.github/workflows/construir.yml` | Regenera y publica solo al editar el config en GitHub. |
| `og-image.jpg` | Imagen que se ve al compartir el enlace. 1200×630. |

### Generados automáticamente — no los edites a mano

Lo que escribas aquí se pierde en la siguiente generación.

| Archivo | Qué es |
|---|---|
| `index.html` | La portada: la landing del producto con `principal: true`. |
| `<slug>/index.html` | Una landing completa por producto. |
| `productos.html` | El catálogo. |
| `artifact.html` | Copia sin `<head>` para previsualizar en Claude. |

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
