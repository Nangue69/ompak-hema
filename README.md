# App Opleiding Ompak HEMA

Manual de instrucciones básicas del departamento de reempaque, para el móvil del operario.
Funciona sin cobertura y se instala en la pantalla de inicio del teléfono.

## Arrancar el proyecto

```bash
npm install          # solo la primera vez
npm run dev          # desarrollo -> http://localhost:5173
npm run build        # genera la carpeta dist/ lista para publicar
npm run preview      # ver el resultado del build
npm test             # 20 tests automáticos
npm run imagenes     # vuelve a optimizar las fotos de img/
```

Para probarlo en el móvil durante el desarrollo: `npm run dev -- --host` y abre en el teléfono
la dirección que aparece en la consola (ambos en la misma red wifi).

## Key-users de prueba

| Key-user | Contraseña |
|---|---|
| ompak01 | hema1771 |
| ompak02 | hema2284 |
| ompak03 | hema3395 |
| ompak04 | hema4406 |
| ompak05 | hema5517 |

**Cámbialos antes de usar la app de verdad.** Para crear uno nuevo:

```bash
node scripts/crear-usuario.mjs ompak06 micontrasena
```

Pega la línea que imprime en `src/auth/usuarios.json`. Las contraseñas nunca se guardan en
claro, solo su hash SHA-256.

### Cómo funcionan los 5 días

Cada key-user empieza a contar en su **primer uso**, no en la fecha en que se crea. A partir
de ahí tiene 5 días; después la app muestra "Acceso caducado" y ya no deja entrar con ese
usuario. Si alguien atrasa el reloj del teléfono, la clave también se da por caducada.

**Limitación conocida:** al no haber servidor, el control vive en el propio teléfono. Quien
borre los datos del navegador reinicia el contador. Sirve como control de acceso al material
de formación, no como barrera de seguridad. Si algún día hace falta un control real, lo único
que hay que cambiar es `src/auth/AuthContext.jsx`.

## Cambiar los textos sin tocar código

Todo el contenido está en `src/datos/`. Nunca hace falta abrir un archivo `.jsx` para
corregir un texto.

| Archivo | Qué contiene |
|---|---|
| `comandos.json` | Lo que aparece en la pantalla del PC para cada tecla F (igual en todos los idiomas) |
| `comandos.es.json` (+ `en`, `nl`, `pl`) | Título y explicación de cada tecla |
| `reglas.es.json` (+ …) | Reglas de la casa y de Ompak |
| `consejos.json` + `consejos.es.json` (+ …) | Consejos útiles |
| `fotos.json` + `fotos.es.json` (+ …) | Galería de fotos y sus pies de foto |
| `glosario.json` + `glosario.es.json` (+ …) | Palabras del sistema (PU, tote, manco…) |
| `standard.json` + `standard.es.json` (+ …) | Cifras de picks y cajas por hora |

Los textos de la interfaz (botones, menús) están en `src/i18n/es.json`, `en.json`, `nl.json`
y `pl.json`.

### Marcas de contenido pendiente

- En `comandos.json`, el campo `fuente` dice de dónde sale el texto: `pantalla` (visto en las
  capturas reales del puesto), `documento` (de AGENTE.md), `usuario` (confirmado por el
  responsable) o `borrador`. **Solo `borrador` muestra en la app el aviso "Texto provisional
  pendiente de revisión".** Ahora mismo ninguna tecla es borrador.
- También en `comandos.json`, el campo `pantalla` es opcional: las teclas que no producen una
  pantalla (supervisión o sin uso) simplemente no lo llevan y la app no dibuja ese bloque.
- En `fotos.json`, el campo `estado` vale `bien`, `mal` o `revisar`. Cambia a `bien` o `mal`
  para que la foto salga con ✅ o ⛔ y desaparezca el aviso.

### Cambiar las fotos

Deja los JPG nuevos en `img/`, añade su nombre al mapa `NOMBRES` de
`scripts/optimizar-imagenes.mjs` y ejecuta `npm run imagenes`. Las fotos se reducen a WebP de
1280 px (de 28 MB a menos de 1 MB en total) y se guardan en `public/img/fotos/`.

## Qué falta por revisar

1. **Las fotos de la galería.** Hay que decir cuál muestra un acierto y cuál un error, y
   corregir los pies de foto. Es lo único del contenido que sigue sin confirmar.
2. **Key-users definitivos.**

Revisado y confirmado el 2026-10-04: las doce teclas F, el glosario, las reglas de la casa y
de Ompak, los consejos y las cifras del standard.

## Estructura

```
src/
  auth/         key-users, caducidad de 5 días y protección de rutas
  i18n/         los cuatro idiomas de la interfaz
  tema/         tema claro y oscuro
  datos/        todo el contenido editable
  componentes/  cabecera, tarjetas, acordeón, pantalla simulada
  paginas/      login, inicio y las cuatro secciones
scripts/        optimizar imágenes y crear key-users
img/            fotos originales (no se publican)
public/         logo, fotos optimizadas e iconos de la app
```

## Publicar

`npm run build` deja todo en `dist/`. Como las rutas van con `#` y las rutas de archivos son
relativas, `dist/` se puede subir tal cual a cualquier hosting estático o a una carpeta de la
intranet, sin configurar nada en el servidor.

En el móvil: abre la dirección en Chrome o Safari y elige "Añadir a la pantalla de inicio".
A partir de ahí la app abre a pantalla completa y funciona sin conexión.
