# Componentes de Ginyu

Todas las clases llevan el prefijo `gyu-`.

## Layout

| Clase | Uso |
|---|---|
| `gyu-pagina` | Contenedor de la vista: columna flex de alto `100vh - 90px` (`--gyu-pagina-resta`). |
| `gyu-cabecera` | Cabecera azul marino con un `<h4>` y un `gyu-ruta`. |
| `gyu-ruta`, `gyu-ruta-sep` | Ruta de navegación blanca dentro de la cabecera, y su separador. |
| `gyu-cuerpo` | Caja gris que ocupa el resto de la página. |
| `gyu-pestana` | Contenido de una pestaña. |
| `gyu-panel`, `gyu-panel-tabs` | Panel y su variante para tabs. |
| `gyu-seccion` | Título de sección. |
| `gyu-separador` | Línea horizontal (`<hr>`). |
| `gyu-scroll` | Scrollbar fino. |
| `gyu-fila` | Columna en móvil, fila desde 768px. |
| `gyu-chip` | Cuadro de ícono de 38px. |

## Tarjetas y listados

`gyu-listado` (`-cabecera`, `-titulo`, `-acciones`, `-cuerpo`), `gyu-tarjeta` (`-titulo`, `-cuerpo`), `gyu-aviso` (`-icono`, `-texto`), `gyu-opcion` (`-info`, `-icono`, `-titulo`, `-subtitulo`), `gyu-tabla-caja`.

## Botones

| Eje | Clases |
|---|---|
| Estilo | `gyu-btn-solid`, `gyu-btn-outline`, `gyu-btn-subtle`, `gyu-btn-text`, `gyu-btn-link` |
| Theme | `gyu-theme-{primary, secondary, success, danger, warning, info, accent, inverse}` |
| Tamaño | `gyu-btn-xs`, `gyu-btn-sm`, `gyu-btn-lg` |
| Forma | `gyu-btn-icon` |

`gyu-btn` solo es una base con aspecto de solid primary. `gyu-theme-*` también colorea `gyu-badge`.

Variables por botón: `--gyu-btn-min-height`, `--gyu-btn-padding-x`, `--gyu-btn-font-size`, `--gyu-btn-border-radius`, `--gyu-btn-gap`, `--gyu-btn-disabled-opacity`.

## Datos

| Clase | Uso |
|---|---|
| `gyu-grilla` | Sobre el `<div>` de una jqxGrid. Variantes `gyu-grilla-sin-lineas`, `gyu-grilla-arbol`. |
| `gyu-vacio`, `-titulo`, `-desc` | Estado vacío de una grilla. |
| `gyu-buscar`, `gyu-buscar-icono`, `gyu-buscar-izq` | Buscador con ícono. |
| `gyu-conteo` | Contador de registros. |
| `gyu-badge` + `gyu-theme-*` | Etiqueta de estado. |
| `gyu-archivo` + `-pdf`, `-xls`, `-doc`, `-otros` | Ícono de tipo de archivo. |

## Formularios

| Clase | Uso |
|---|---|
| `gyu-input`, `gyu-select`, `gyu-textarea`, `gyu-label` | Controles. `gyu-input[type=date]` abre el selector con un clic en el borde derecho. |
| `gyu-select-jqx` | jqxDropDownButton con aspecto de select. |
| `gyu-check-lista`, `gyu-check`, `gyu-check-input`, `gyu-check-card`, `gyu-check-indicador` | Casillas tipo tarjeta. |
| `gyu-switch`, `gyu-switch-slider`, `gyu-switch-compact`, `gyu-switch-celda` | Interruptor. |
| `gyu-media-tabs`, `gyu-media-tab`, `gyu-media-tab-activo`, `gyu-dropzone` | Pestañas de medios y zona de subida. |

## Contenedores flotantes

| Clase | Uso |
|---|---|
| `gyu-modal` | Se agrega con `addClass` a un jqxWindow. `gyu-modal-titulo` para el título con ícono. |
| `gyu-sidebar-fondo`, `gyu-sidebar` (`-cabecera`, `-cuerpo`, `-fila`, `-pie`) | Panel lateral. Se abre con `gyu-sidebar-abierto`. |
| `gyu-menu`, `gyu-menu-item` | Menú de acciones. |
| `gyu-desplegable`, `gyu-desplegable-menu` | Menú con animación en cascada. |
| `gyu-tabs`, `gyu-tabs-linea`, `gyu-fade-in` | Estilo para jqxTabs. |
| `gyu-auth-error` | Pantalla de acceso denegado. |

## Selector desplegable

Sustituye un `<select>` por un panel con buscador. Con `multiple` agrega casillas y las acciones Todos y Limpiar.

```js
$('#estado').gyuSeleccion({ placeholder: 'Todos', ancho: '260px' });
```

Opciones: `placeholder`, `ancho`, `textoTodos`, `textoSeleccionados` (`{count}`), `maxItemsRotulo`, `buscadorPlaceholder`, `umbralBuscador`. Dispara `change` en el `<select>`. Si las opciones se regeneran por código: `$('#estado').trigger('gyu.actualizar')`. Imagen por opción: `<option data-imagen="url">`.

## JS

| API | Qué hace |
|---|---|
| `Swalert.confirmDelete`, `.confirmInfo`, `.info`, `.error` | Diálogos. Devuelven una promesa con `isConfirmed`. Opciones: `title`, `text`, `confirmButtonText`, `cancelButtonText`. |
| `GinyuToast.success`, `.error`, `.warning`, `.info` | Avisos: `(mensaje, título)`. |
| `GinyuTabs.habilitar('#tabs')` | Línea deslizante y animación para jqxTabs. |
| `$(grilla).ginyuEmptyState({ badge, cardInfo, titulo, subtitulo, top })` | Estado vacío automático. `GinyuGrilla.actualizar(grilla)` lo vuelve a evaluar. |
| `$(grilla).ginyuProtegerScrollbars()` | Evita seleccionar filas al arrastrar el scrollbar. |
| Opción `loader: '#boton'` en `$.ajax` | Bloquea el botón durante la petición. Más `textoCargando`, `spinner`, `liberarEnExito`. |

## Ayudantes de espaciado

`gyu-px-0`, `gyu-px-1`, `gyu-py-1`, `gyu-pb-1`, `gyu-pb-2`, `gyu-pb-3` (1, 2 y 3 rem).
