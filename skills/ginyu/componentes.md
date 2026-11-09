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

`gyu-aviso` ya mide `width: 100%`: no ponerle margen horizontal (genera scroll horizontal), solo `margin: 0 0 Npx`. `gyu-opcion` es la tarjeta con ícono, título, subtítulo y un `gyu-switch` a la derecha.

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
| `gyu-input`, `gyu-select`, `gyu-textarea`, `gyu-label` | Controles. `gyu-input[type=date]` y `gyu-input[type=datetime-local]` abren el selector con un clic en el borde derecho. |
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
| `gyu-auth-error`, `gyu-auth-error-icono` | Pantalla de acceso denegado. Usa `gyu-dialogo-titulo` y `gyu-dialogo-texto` para el texto. |

## Calendario

Estilos para FullCalendar 1.6 con la cabecera nativa oculta y una barra propia (`header: {left:'', center:'', right:''}`). El título sale de `view.title` en `viewRender`; anterior, siguiente, hoy y cambio de vista se llaman con `fullCalendar('prev' | 'next' | 'today' | 'changeView', vista)`.

| Clase | Uso |
|---|---|
| `gyu-calendario` | Sobre el `<div>` donde se llama a `fullCalendar()`. |
| `gyu-calendario-caja` | Tarjeta blanca que contiene barra y calendario. |
| `gyu-calendario-barra`, `gyu-calendario-barra-der` | Fila de controles y su grupo derecho. |
| `gyu-calendario-titulo` | Mes y año. |
| `gyu-calendario-nav` | Con `gyu-btn-solid gyu-btn-icon`: botón redondo anterior/siguiente. |
| `gyu-calendario-vistas` | Grupo Hoy / Semana / Mes. La vista activa lleva `gyu-btn-solid`, las demás `gyu-btn-text`. |
| `gyu-calendario-cuerpo` | Contenedor con scroll del calendario. |
| `gyu-calendario-evento-hoy` | Se agrega al evento del día actual. |
| `gyu-calendario-evento-cab`, `-titulo`, `-detalle`, `-pie`, `-valor` | Piezas de la tarjeta de evento que arma `eventRender`. |
| `gyu-calendario-punto` + `-activo` / `-inactivo` | Punto de estado del evento. |

```html
<div class="gyu-calendario-caja">
    <div class="gyu-calendario-barra">
        <button id="btnAnterior" type="button" class="gyu-btn-solid gyu-btn-icon gyu-calendario-nav" aria-label="Anterior"></button>
        <span id="calTitulo" class="gyu-calendario-titulo"></span>
        <button id="btnSiguiente" type="button" class="gyu-btn-solid gyu-btn-icon gyu-calendario-nav" aria-label="Siguiente"></button>
        <div class="gyu-calendario-barra-der">
            <div id="calVistas" class="gyu-calendario-vistas">
                <button type="button" data-vista="hoy" class="gyu-btn-text gyu-btn-sm">Hoy</button>
                <button type="button" data-vista="basicWeek" class="gyu-btn-text gyu-btn-sm">Semana</button>
                <button type="button" data-vista="month" class="gyu-btn-solid gyu-btn-sm">Mes</button>
            </div>
        </div>
    </div>
    <div class="gyu-calendario-cuerpo gyu-scroll">
        <div id="calendario" class="gyu-calendario"></div>
    </div>
</div>
```

## Selector desplegable

Sustituye un `<select>` por un panel con buscador. Con `multiple` agrega casillas y las acciones Todos y Limpiar.

```js
$('#estado').gyuSeleccion({ placeholder: 'Todos', ancho: '260px' });
```

Opciones: `placeholder`, `ancho`, `textoTodos`, `textoSeleccionados` (`{count}`), `maxItemsRotulo`, `buscadorPlaceholder`, `umbralBuscador`. Dispara `change` en el `<select>`. El `<select>` oculto sigue siendo la fuente: si cambias opciones, valor (`val()`) o `disabled` por código, llama `$('#estado').trigger('gyu.actualizar')`. Tras un reset de formulario hazlo dentro de un `setTimeout`. Imagen por opción: `<option data-imagen="url">`.

El panel mide siempre lo mismo que el combo (sin `min-width`). Si el código oculta o muestra el `<select>` (`.hide()`, `.show()`), no sirve: el combo es el `div.gyu-seleccion` que lo envuelve. Envolver el `<select>` en un `div` propio y alternar ese `div`. Si el `<select>` lleva `<option value="">Seleccionar</option>` y además `placeholder`, el texto sale duplicado: dejar solo el `placeholder`, o la opción vacía si el valor vacío debe poder elegirse.

## JS

| API | Qué hace |
|---|---|
| `Swalert.confirmDelete`, `.confirmInfo`, `.info`, `.error` | Diálogos. Devuelven una promesa con `isConfirmed`. Opciones: `title`, `text`, `confirmButtonText`, `cancelButtonText`. |
| `GinyuAlert` | Alias de `Swalert`. |
| `GinyuToast.success`, `.error`, `.warning`, `.info` | Avisos: `(mensaje, título)`. |
| `GinyuTabs.habilitar('#tabs')` | Línea deslizante y animación para jqxTabs. |
| `$(grilla).ginyuEmptyState({ badge, cardInfo, titulo, subtitulo, top })` | Estado vacío automático. `GinyuGrilla.actualizar(grilla)` lo vuelve a evaluar. |
| `$(grilla).ginyuActualizarEmptyState()` | Vuelve a evaluar el estado vacío de esa grilla. |
| `$(grilla).ginyuProtegerScrollbars()` | Evita seleccionar filas al arrastrar el scrollbar. |
| Opción `loader: '#boton'` en `$.ajax` | Bloquea el botón durante la petición. Más `textoCargando`, `spinner`, `liberarEnExito`. |

## Clases de diálogos y avisos

Las genera `Swalert` y `GinyuToast`; no se escriben a mano. Solo se usan cuando se llama a `Swal.fire` directo (cuenta regresiva, formulario con `preConfirm`).

| Clase | Uso |
|---|---|
| `gyu-dialogo-fondo`, `gyu-dialogo`, `gyu-dialogo-cerrar` | Contenedor, ventana y botón cerrar. |
| `gyu-dialogo-cuerpo` | Contenido: `gyu-dialogo-icono` (`-primary`), `gyu-dialogo-titulo`, `gyu-dialogo-texto`. |
| `gyu-dialogo-acciones` (`-completo`) | Fila de botones. |
| `gyu-toast-success`, `gyu-toast-danger`, `gyu-toast-warning` | Avisos de `GinyuToast`. |

```js
Swal.fire({
    html: '<div class="gyu-dialogo-cuerpo"><h3 class="gyu-dialogo-titulo">Título</h3><p class="gyu-dialogo-texto">Texto</p></div>',
    showCancelButton: true,
    reverseButtons: true,
    buttonsStyling: false,
    customClass: {
        container: 'gyu-dialogo-fondo',
        popup: 'gyu-dialogo',
        confirmButton: 'gyu-btn-solid gyu-btn-lg',
        cancelButton: 'gyu-btn-outline gyu-theme-secondary gyu-btn-lg',
        actions: 'gyu-dialogo-acciones',
        closeButton: 'gyu-dialogo-cerrar'
    }
});
```

## Receta: grilla que llena la pantalla

La altura de la jqxGrid sigue al espacio libre con un `ResizeObserver`.

```html
<div class="gyu-cuerpo">
    <div id="contenedorGrilla" style="position: relative; flex: 1 1 0; min-height: 300px;">
        <div id="grilla" class="gyu-grilla"></div>
    </div>
</div>
```

```js
$('#grilla').jqxGrid({ width: '100%', height: 300, /* ... */ });

var $contenedor = $('#contenedorGrilla');
function ajustar() {
    var alto = Math.floor($contenedor.height());
    if (alto > 0) $('#grilla').jqxGrid({ height: alto });
}
new ResizeObserver(ajustar).observe($contenedor[0]);
ajustar();

$('#grilla').ginyuEmptyState({ titulo: 'No hay datos para mostrar', subtitulo: 'Sin resultados.', top: 70 });
```

`top` es el alto de la cabecera de la grilla (70 sin fila de filtros, unos 100 con ella).

## Receta: campo de fecha con ícono de calendario

El ícono se define una sola vez por página y se referencia con `<use>`.

```html
<svg width="0" height="0" style="position:absolute;" aria-hidden="true">
    <symbol id="icoCalendario" viewBox="0 0 22 21">
        <path d="M15.75 12.25C16.3023 12.25 16.75 11.8023 16.75 11.25C16.75 10.6977 16.3023 10.25 15.75 10.25C15.1977 10.25 14.75 10.6977 14.75 11.25C14.75 11.8023 15.1977 12.25 15.75 12.25Z" fill="#89909B"/>
        <path d="M15.75 16.25C16.3023 16.25 16.75 15.8023 16.75 15.25C16.75 14.6977 16.3023 14.25 15.75 14.25C15.1977 14.25 14.75 14.6977 14.75 15.25C14.75 15.8023 15.1977 16.25 15.75 16.25Z" fill="#89909B"/>
        <path d="M11.75 11.25C11.75 11.8023 11.3023 12.25 10.75 12.25C10.1977 12.25 9.75 11.8023 9.75 11.25C9.75 10.6977 10.1977 10.25 10.75 10.25C11.3023 10.25 11.75 10.6977 11.75 11.25Z" fill="#89909B"/>
        <path d="M11.75 15.25C11.75 15.8023 11.3023 16.25 10.75 16.25C10.1977 16.25 9.75 15.8023 9.75 15.25C9.75 14.6977 10.1977 14.25 10.75 14.25C11.3023 14.25 11.75 14.6977 11.75 15.25Z" fill="#89909B"/>
        <path d="M5.75 12.25C6.30229 12.25 6.75 11.8023 6.75 11.25C6.75 10.6977 6.30229 10.25 5.75 10.25C5.19772 10.25 4.75 10.6977 4.75 11.25C4.75 11.8023 5.19772 12.25 5.75 12.25Z" fill="#89909B"/>
        <path d="M5.75 16.25C6.30229 16.25 6.75 15.8023 6.75 15.25C6.75 14.6977 6.30229 14.25 5.75 14.25C5.19772 14.25 4.75 14.6977 4.75 15.25C4.75 15.8023 5.19772 16.25 5.75 16.25Z" fill="#89909B"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.75 0C6.16421 0 6.5 0.33579 6.5 0.75V1.51272C7.162 1.49999 7.89133 1.49999 8.69346 1.5H12.8064C13.6086 1.49999 14.338 1.49999 15 1.51272V0.75C15 0.33579 15.3358 0 15.75 0C16.1642 0 16.5 0.33579 16.5 0.75V1.57709C16.7599 1.59691 17.0061 1.62182 17.239 1.65313C18.4114 1.81076 19.3604 2.14288 20.1088 2.89124C20.8571 3.63961 21.1892 4.58855 21.3469 5.76098C21.5 6.90018 21.5 8.3558 21.5 10.1935V12.3064C21.5 14.1441 21.5 15.5998 21.3469 16.739C21.1892 17.9114 20.8571 18.8604 20.1088 19.6088C19.3604 20.3571 18.4114 20.6892 17.239 20.8469C16.0998 21 14.6442 21 12.8065 21H8.69359C6.85585 21 5.40018 21 4.26098 20.8469C3.08856 20.6892 2.13961 20.3571 1.39124 19.6088C0.64288 18.8604 0.31076 17.9114 0.15314 16.739C-2.96086e-05 15.5998 -1.95468e-05 14.1442 4.53202e-07 12.3064V10.1936C-1.95468e-05 8.3558 -2.96086e-05 6.90019 0.15314 5.76098C0.31076 4.58855 0.64288 3.63961 1.39124 2.89124C2.13961 2.14288 3.08856 1.81076 4.26098 1.65313C4.4939 1.62182 4.74006 1.59691 5 1.57709V0.75C5 0.33579 5.33579 0 5.75 0ZM4.46085 3.13976C3.45476 3.27502 2.87511 3.52869 2.4519 3.9519C2.02869 4.37511 1.77502 4.95476 1.63976 5.96085C1.61685 6.13123 1.5977 6.31061 1.58168 6.5H19.9183C19.9023 6.31061 19.8831 6.13124 19.8602 5.96085C19.725 4.95476 19.4713 4.37511 19.0481 3.9519C18.6249 3.52869 18.0452 3.27502 17.0392 3.13976C16.0115 3.00159 14.6568 3 12.75 3H8.75C6.84318 3 5.48851 3.00159 4.46085 3.13976ZM1.5 10.25C1.5 9.396 1.50032 8.6527 1.51309 8H19.9869C19.9997 8.6527 20 9.396 20 10.25V12.25C20 14.1568 19.9984 15.5115 19.8602 16.5392C19.725 17.5452 19.4713 18.1249 19.0481 18.5481C18.6249 18.9713 18.0452 19.225 17.0392 19.3602C16.0115 19.4984 14.6568 19.5 12.75 19.5H8.75C6.84318 19.5 5.48851 19.4984 4.46085 19.3602C3.45476 19.225 2.87511 18.9713 2.4519 18.5481C2.02869 18.1249 1.77502 17.5452 1.63976 16.5392C1.50159 15.5115 1.5 14.1568 1.5 12.25V10.25Z" fill="#89909B"/>
    </symbol>
</svg>

<div style="position: relative;">
    <input type="date" class="gyu-input" style="padding-right: 42px;">
    <svg style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 18px; height: 17px; pointer-events: none;"><use href="#icoCalendario"></use></svg>
</div>
```

## Ayudantes de espaciado

`gyu-px-0`, `gyu-px-1`, `gyu-py-1`, `gyu-pb-1`, `gyu-pb-2`, `gyu-pb-3` (1, 2 y 3 rem).
