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

- [ ] **Enlazar los botones a la pasarela de pago.** Los CTAs apuntan a `#oferta` o a `#`. Busca `href="#"` en la sección `id="oferta"` y pon la URL de Hotmart / Stripe / Gumroad.
- [ ] **Sustituir los testimonios.** Los tres bloques de la sección «Lo que dicen» están marcados como `Ejemplo`. Cámbialos por testimonios reales con nombre y foto.
- [ ] **Confirmar precios.** La página usa $17 USD sobre un valor de $55 (69% de descuento) y el desglose suma $100. Ajusta las cifras si el precio real es otro.
- [ ] **Imagen Open Graph.** Añade `og-image.jpg` (1200×630 px) en la raíz y descomenta las dos metas en el `<head>`.
- [ ] **Analítica.** No hay ningún píxel instalado (Meta, GA4, TikTok).

## Desarrollo local

```bash
python3 -m http.server 8000
```

Luego abre http://localhost:8000
