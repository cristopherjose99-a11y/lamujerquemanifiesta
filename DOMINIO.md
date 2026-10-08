# Conectar lamujerquemanifiesta.com

Estado: dominio **comprado en Porkbun** el 8 de octubre de 2026. Falta configurar el DNS.

La web funciona mientras tanto en
https://cristopherjose99-a11y.github.io/lamujerquemanifiesta/

---

## Paso 1 — Comprar el dominio ✅ HECHO

`lamujerquemanifiesta.com` comprado en **Porkbun** el 8 de octubre de 2026.
Caduca el 8 de octubre de 2027 — activa la renovación automática para no perderlo.

Nameservers asignados: `curitiba` / `fortaleza` / `maceio` / `salvador` `.ns.porkbun.com`.

## Paso 2 — Crear los registros DNS en Porkbun

Porkbun → **Domain Management** → fila de `lamujerquemanifiesta.com` → botón **DNS**.

El formulario tiene cuatro campos: **Type**, **Host**, **Answer**, **TTL**.
Para el dominio raíz, **Host se deja vacío** (no escribas `@` ni el dominio).
TTL: `600`.

| Type | Host | Answer |
|---|---|---|
| A | *(vacío)* | `185.199.108.153` |
| A | *(vacío)* | `185.199.109.153` |
| A | *(vacío)* | `185.199.110.153` |
| A | *(vacío)* | `185.199.111.153` |
| AAAA | *(vacío)* | `2606:50c0:8000::153` |
| AAAA | *(vacío)* | `2606:50c0:8001::153` |
| AAAA | *(vacío)* | `2606:50c0:8002::153` |
| AAAA | *(vacío)* | `2606:50c0:8003::153` |
| CNAME | `www` | `cristopherjose99-a11y.github.io` |

El CNAME apunta solo al dominio de GitHub, **sin** `/lamujerquemanifiesta` al final.

Si al comprar quedó algún registro de parking, bórralo antes.

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
