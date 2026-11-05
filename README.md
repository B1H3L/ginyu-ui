# ginyu-ui

Sistema de diseño. Mismo API que Bootstrap 6 donde Bootstrap ya resolvió el problema (botones con estilo + theme, tamaños), y componentes propios en español donde el dominio lo pide. Prefijo de clases: `gyu-`.

## Uso por CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ginyu-ui@1.0.0/dist/ginyu.min.css">
<script src="https://cdn.jsdelivr.net/npm/ginyu-ui@1.0.0/dist/ginyu.min.js"></script>
```

Desde GitHub, con la etiqueta de versión:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/B1H3L/ginyu-ui@v1.0.0/dist/ginyu.min.css">
<script src="https://cdn.jsdelivr.net/gh/B1H3L/ginyu-ui@v1.0.0/dist/ginyu.min.js"></script>
```

Quien solo use botones, formularios, cabecera y layout carga únicamente el CSS. El JS es para diálogos, toasts, tabs, selector desplegable, estado vacío y bloqueo de botón en AJAX.

## Dependencias

| Parte | Necesita |
|---|---|
| CSS | Nada propio. Importa DM Sans (Google Fonts) e iziToast (jsDelivr). |
| JS | jQuery. SweetAlert2 para `Swalert`. iziToast para `GinyuToast`. jqWidgets para `GinyuTabs` y la grilla. |

## Botones

Estilo + theme. Sin theme es primary. Sin tamaño es mediano (38px).

```html
<button class="gyu-btn-solid">Agregar</button>
<button class="gyu-btn-solid gyu-theme-success gyu-btn-lg">Guardar</button>
<button class="gyu-btn-outline gyu-theme-danger">Eliminar</button>
<button class="gyu-btn-text gyu-theme-secondary gyu-btn-icon" aria-label="Cerrar">X</button>
```

| Eje | Clases |
|---|---|
| Estilo | `gyu-btn-solid`, `gyu-btn-outline`, `gyu-btn-subtle`, `gyu-btn-text`, `gyu-btn-link` |
| Theme | `gyu-theme-{primary, secondary, success, danger, warning, info, accent, inverse}` |
| Tamaño | `gyu-btn-xs`, `gyu-btn-sm`, `gyu-btn-lg` |
| Forma | `gyu-btn-icon` |

## Selector desplegable

```js
$('#estado').gyuSeleccion({ placeholder: 'Todos' });
$('#sedes').gyuSeleccion({ placeholder: 'Sedes' });
```
Con `<select multiple>` se activan las casillas y las acciones Todos y Limpiar.

## Instalar como skill desde GitHub

Con la misma herramienta con la que se instalan otros skills (`skills/<nombre>/SKILL.md`):

```
npx skills add B1H3L/ginyu-ui
```

El skill queda en `~/.claude/skills/ginyu/` con el CSS y el JS dentro de `assets/`.

## Instalar como plugin de Claude Code

El repositorio es también un plugin con un skill (`skills/ginyu`) que explica las reglas, la lista de componentes y cómo agregar Ginyu a un proyecto.

```
/plugin marketplace add B1H3L/ginyu-ui
/plugin install ginyu-ui@ginyu
```

Para probarlo desde una carpeta local, antes de subirlo:

```
claude plugin validate C:\ginyu-ui
claude plugin marketplace add C:\ginyu-ui
claude plugin install ginyu-ui@ginyu
```

El skill se invoca como `/ginyu-ui:ginyu`, o Claude lo carga solo cuando se pide usar un componente `gyu-`. Los archivos de `dist/` quedan accesibles para el skill dentro del plugin.

## Desarrollo

```
npm install
npm run build
```

| Ruta | Qué es |
|---|---|
| `src/css/_*.css` | Un parcial por componente. |
| `src/css/index.txt` | Orden de unión de los parciales. |
| `src/js/ginyu.js` | Helpers JS. |
| `scripts/build.js` | Genera `dist/`. |
| `dist/` | Lo que se publica. Se sube al repositorio. |

Reglas de mantenimiento:

1. Nunca se editan `dist/` ni `skills/ginyu/assets/`. Se edita `src/` y se corre el build, que actualiza ambos.
2. Un componente nuevo es un parcial `src/css/_nombre.css` agregado a `src/css/index.txt` antes de `_utilities.css`.
3. Los colores y medidas salen de las variables `--gyu-*` de `_tokens.css`. Un color nuevo es un bloque en `_theme.css` con sus tokens.
4. Después de cambiar algo, revisar que toda clase `gyu-*` usada en `skills/ginyu/componentes.md` exista en `dist/ginyu.css`.
5. Subir la versión en `package.json` y en `.claude-plugin/plugin.json` en cada publicación.

## Publicar una versión

1. Subir el número en `package.json`.
2. `npm run build`.
3. Commit con `dist/` incluido.
4. Crear la etiqueta: `git tag v1.0.1 && git push --tags`.
5. Opcional: `npm publish`.

jsDelivr sirve cada etiqueta por separado y la guarda en caché, así que una versión publicada no se modifica: se publica una nueva.
