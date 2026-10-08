# La Mujer que Manifiesta

Landing page de ventas del kit digital **La Mujer que Manifiesta** — método de 21 días para
reprogramar creencias de escasez. Libro digital, trackers imprimibles y audios guiados.

🔗 **Web:** https://lamujerquemanifiesta.com



## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página completa. Documento HTML autónomo, sin build. Es lo que sirve GitHub Pages. |
| `artifact.html` | La misma página sin `<!doctype>` ni `<head>`, para publicarla como Artifact de Claude. |
| `productos.html` | Catálogo de productos. Para añadir uno, edita la lista `PRODUCTOS` del `<script>` al final del archivo. |

Ambos comparten el mismo marcado y los mismos estilos. Si cambias uno, replica el cambio en el otro.

## Stack

- HTML estático, sin dependencias de build
- [Tailwind CSS 3.4.17](https://tailwindcss.com) por CDN (play CDN, configurado inline)
- Google Fonts: Playfair Display (titulares) y Plus Jakarta Sans (texto)

## Paleta

| Token | Hex | Uso |
|---|---|---|
| Crema | `#FDFBF7` | Fondo principal |
| Lino | `#FAF6EE` | Secciones alternadas |
| Arena | `#E8DED1` | Tarjetas y contenedores |
| Grafito | `#2A2421` | Texto |
| Oro | `#D4AF37` | CTAs, acentos, filetes |
| Oro viejo | `#C5A059` | Hover de CTAs |

## Pendientes antes de lanzar

### Enlace de pago

Checkout de Hotmart: `https://go.hotmart.com/P107334202L?ap=c4cb`

Está en **cuatro** sitios de `index.html` y `artifact.html` (hero, sección de oferta, CTA final
y barra fija de móvil) y en la lista `PRODUCTOS` de `productos.html`. Si cambia, buáscalo con
`grep -rn 'go.hotmart.com' .` y reemplázalo en todos.

Ojo: `https://go.hotmart.com/P107334202L` **sin** el `?ap=c4cb` no lleva al pago, lleva a la
página de ventas configurada en el producto.

- [ ] **Sustituir los testimonios.** Los tres bloques de la sección «Lo que dicen» están marcados como `Ejemplo`. Cámbialos por testimonios reales con nombre y foto.
- [ ] **Píxeles de anuncios — PENDIENTE, el usuario pasará los IDs.**
  - **Meta Pixel** (Facebook + Instagram). ID numérico, se saca de Meta Business Suite → Administrador de eventos.
  - **Google Analytics 4**. ID de medición, empieza por `G-`, en Analytics → Administrar → Flujos de datos.
  - Instalar en `index.html`, `artifact.html` y `productos.html`.
  - **Importante:** el pago ocurre en Hotmart, así que el píxel de la web solo ve visitas y clics. Hay que
    conectar el mismo píxel dentro de Hotmart (Herramientas → Píxeles) para que las compras se atribuyan.

## Navegación

La landing lleva una cabecera fija (`<nav class="sticky">`, justo antes del hero) con la marca,
**Qué incluye**, **Productos** y un botón de compra. En móvil se ocultan «Qué incluye» y el botón
para no apretar la barra; abajo ya hay un CTA fijo.

El enlace a `productos.html` está en la cabecera y también en el pie.

## La cuenta atrás

El contador de la sección de oferta es **por visitante**, no global. El plazo se guarda en
`localStorage` del navegador de cada persona:

- Quien vuelve, retoma el tiempo donde lo dejó. No se reinicia.
- Quien llega por primera vez, empieza con el plazo completo.
- Al llegar a cero arranca otro plazo, nunca se queda en `00 h 00 m 00 s`.

Para cambiar la duración, edita `HORAS_DE_OFERTA` en el `<script>` del final de `index.html`
(y replica el cambio en `artifact.html`). Está en 24 horas.

Funciona también en incógnito: si el navegador bloquea el almacenamiento, el plazo se mantiene
en memoria durante la visita.

## Desarrollo local

```bash
python3 -m http.server 8000
```

Luego abre http://localhost:8000
