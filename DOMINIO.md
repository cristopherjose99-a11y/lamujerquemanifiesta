# Conectar lamujerquemanifiesta.com

Estado al 8 de octubre de 2026: el dominio `.com` estaba **libre**. El `.net` también.
Los `.online` y `.shop` ya están ocupados.

La web funciona mientras tanto en
https://cristopherjose99-a11y.github.io/lamujerquemanifiesta/

---

## Paso 1 — Comprar el dominio (lo haces tú)

Unos 10-15 USD al año. Cualquiera de estos sirve:

| Registrador | Nota |
|---|---|
| [Namecheap](https://www.namecheap.com) | Privacidad WHOIS gratis de por vida |
| [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) | Lo vende a precio de coste, sin recargo de renovación |
| [Porkbun](https://porkbun.com) | Barato y privacidad incluida |
| GoDaddy / Hostinger | Más caros al renovar; revisa el precio del año 2 |

Compra **lamujerquemanifiesta.com**. No contrates hosting ni correo: no hacen falta,
GitHub sirve la web gratis.

> ⚠️ Mira siempre el precio de **renovación**, no el del primer año. Varios
> registradores venden a 1 USD el primer año y cobran 20 el segundo.

## Paso 2 — Crear los registros DNS (los pones tú en el panel del registrador)

En la zona DNS del dominio, borra los registros que traiga por defecto (suele venir
un "parking") y crea estos nueve:

**Cuatro registros A, en el dominio raíz** (el campo nombre/host va vacío o con `@`):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Cuatro registros AAAA, también en la raíz** (IPv6, opcional pero recomendado):

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**Un registro CNAME para el www:**

```
nombre/host:  www
valor:        cristopherjose99-a11y.github.io
```

Ojo: el CNAME apunta a `cristopherjose99-a11y.github.io` **sin** el nombre del
repositorio al final.

## Paso 3 — Avisarme

Cuando los DNS estén puestos, dímelo y yo hago lo que falta:

1. Añadir el archivo `CNAME` al repositorio con el dominio dentro.
2. Configurar el dominio en los ajustes de Pages.
3. Activar **Enforce HTTPS** (el certificado es gratis y lo emite GitHub).
4. Actualizar `canonical` y las metas Open Graph de `index.html` y `artifact.html`.
5. Comprobar que `lamujerquemanifiesta.com` y `www.lamujerquemanifiesta.com` responden.

**No añado el archivo `CNAME` antes de que el DNS esté listo a propósito**: en cuanto
existe, GitHub deja de servir la URL de github.io y redirige al dominio nuevo. Si el DNS
todavía no resuelve, la web se queda caída hasta que propague.

## Cuánto tarda

La propagación suele ser de 10 minutos a 1 hora, aunque formalmente puede llegar a 24.
El certificado HTTPS lo emite GitHub solo, unos 15 minutos después de que el DNS resuelva.

## Comprobar que funciona

```bash
dig +short lamujerquemanifiesta.com
```

Tiene que devolver las cuatro IPs `185.199.10x.153`.
