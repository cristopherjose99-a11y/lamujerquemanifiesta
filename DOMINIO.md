# Dominio: lamujerquemanifiesta.com ✅

Conectado el 8 de octubre de 2026. La web vive en **https://lamujerquemanifiesta.com**

## Cómo está montado

- **Registrador:** Porkbun. Caduca el 8 de octubre de 2027.
- **Hosting:** GitHub Pages, desde la rama `main` de este repositorio.
- **Certificado HTTPS:** lo emite y renueva GitHub, gratis.
- El archivo [`CNAME`](CNAME) de la raíz es lo que ata el dominio al repositorio. **No lo borres**: si desaparece, la web deja de responder en el dominio.

## Registros DNS en Porkbun

| Type | Host | Answer |
|---|---|---|
| A | *(raíz)* | `185.199.108.153` |
| A | *(raíz)* | `185.199.109.153` |
| A | *(raíz)* | `185.199.110.153` |
| A | *(raíz)* | `185.199.111.153` |
| AAAA | *(raíz)* | `2606:50c0:8000::153` |
| AAAA | *(raíz)* | `2606:50c0:8001::153` |
| AAAA | *(raíz)* | `2606:50c0:8002::153` |
| AAAA | *(raíz)* | `2606:50c0:8003::153` |
| CNAME | `www` | `cristopherjose99-a11y.github.io` |
| MX | *(raíz)* | `fwd1.porkbun.com` (prio 10) |
| MX | *(raíz)* | `fwd2.porkbun.com` (prio 20) |
| TXT | *(raíz)* | `v=spf1 include:_spf.porkbun.com ~all` |

Los dos MX y el TXT son el reenvío de correo gratuito de Porkbun. Siguen ahí sin usar:
con ellos puedes crear `hola@lamujerquemanifiesta.com` desde el panel de Porkbun, sin coste.

## Mantenimiento

**Renovación automática.** Actívala en Porkbun si no lo hiciste al comprar. Si el dominio
caduca, la web desaparece y alguien puede quedarse con el nombre.

**Comprobar que todo sigue en pie:**

```bash
curl -sI https://lamujerquemanifiesta.com | head -1
```

Tiene que devolver `HTTP/2 200`.

## Si algo se rompe

| Síntoma | Causa habitual |
|---|---|
| «Domain's DNS record could not be retrieved» en GitHub | El DNS aún propaga. Espera y vuelve a verificar en Settings → Pages. |
| Sale la página de parking de Porkbun | Volvió a aparecer el registro ALIAS o el CNAME `*`. Bórralos. |
| Aviso de certificado inválido | GitHub todavía no emitió el certificado. Tarda unos 15 minutos tras propagar el DNS. |
| 404 en el dominio pero la URL de github.io funciona | Falta el archivo `CNAME` en la raíz del repositorio. |
