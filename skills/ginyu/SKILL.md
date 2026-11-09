---
name: ginyu
description: Usar el sistema de diseño Ginyu (clases gyu-) al construir o migrar interfaces. Aplica cuando se pida agregar Ginyu a un proyecto, crear o migrar una vista con Ginyu, o usar un componente gyu- (botones, grilla, cabecera, modal, tabs, diálogos, toasts, selector desplegable).
---

# Ginyu

Sistema de diseño con la lógica de Bootstrap 6 donde Bootstrap ya resolvió el problema (botones con estilo + theme, tamaños) y componentes propios en español donde hace falta (grilla, cabecera, ruta, cuerpo). Prefijo de clases: `gyu-`.

## Versión de la skill

Antes de usar Ginyu, una vez por sesión:

1. Leer `VERSION`, que está junto a este `SKILL.md`. Si no existe, la versión local es `0`.
2. Pedir la versión publicada: `curl -fsSL https://raw.githubusercontent.com/B1H3L/ginyu-ui/main/skills/ginyu/VERSION`. Si falla (sin red), seguir sin avisar.
3. Si la publicada es mayor que la local, preguntar con `AskUserQuestion` (cargarla con ToolSearch `select:AskUserQuestion` si no está disponible), una sola pregunta, `multiSelect: false`, header `Skill`, pregunta "La skill ginyu tiene una versión nueva (<publicada>, tienes <local>). ¿Actualizo?" y estas opciones:
   - `Sí, actualizar (Recomendado)`: ejecutar `actualizar.ps1` (Windows: `powershell -NoProfile -ExecutionPolicy Bypass -File <carpeta de la skill>\actualizar.ps1`) o `actualizar.sh` (macOS y Linux), releer este `SKILL.md` y `componentes.md`, y avisar de qué versión a qué versión se pasó. Si el proyecto tiene copias de `ginyu.css`, `ginyu.js` o sus `.min` fuera de la skill, ofrecer reemplazarlas por las de `assets/`.
   - `No, ahora no`: seguir con la versión local y no volver a preguntar en esta sesión.
4. Si la carpeta de la skill está dentro de un plugin (la ruta contiene `plugins`), no usar el script: indicar `/plugin marketplace update ginyu` y `/plugin update ginyu-ui@ginyu`.

## Archivos

Junto a este `SKILL.md`:

| Archivo | Qué es |
|---|---|
| `assets/ginyu.min.css` | CSS listo para usar. |
| `assets/ginyu.min.js` | JS listo para usar. Requiere jQuery. |
| `assets/ginyu.css`, `assets/ginyu.js` | Versiones sin minificar, para leer o depurar. |
| `componentes.md` | Lista completa de clases y funciones JS. Leerla antes de escribir HTML. |
| `iconos.md` | Índice de los íconos SVG (id, nombre, categoría, etiquetas). Leerlo cuando la vista necesite un ícono. |
| `iconos.json` | El código `svg` de cada ícono. Buscar por `id` y pegarlo tal cual. |

## Agregar Ginyu a un proyecto

Si el usuario no lo indicó, preguntar cuál prefiere:

1. **CDN.** Enlazar el CSS y el JS con las URLs de jsDelivr que figuran en el README del repositorio de Ginyu.
2. **Copiar.** Copiar `assets/ginyu.min.css` y `assets/ginyu.min.js` a la carpeta de recursos estáticos del proyecto y enlazarlos como el proyecto enlaza sus demás archivos.

El CSS importa DM Sans (Google Fonts) e iziToast (jsDelivr). El JS necesita jQuery. `Swalert` necesita SweetAlert2, `GinyuToast` necesita iziToast, y `GinyuTabs` y la grilla necesitan jqWidgets. Cargar solo lo que la vista use.

## Reglas

1. **Botón = estilo + theme.** `gyu-btn-solid|outline|subtle|text|link` más `gyu-theme-{primary,secondary,success,danger,warning,info,accent,inverse}`. Sin theme es primary. Sin tamaño es mediano (38px). Tamaños: `gyu-btn-xs`, `-sm`, `-lg`. Solo ícono: `gyu-btn-icon` con `aria-label`.
2. **Solo existen las clases de `componentes.md`.** No inventar clases de layout (flex, gap, márgenes, textos): se resuelven con `style=""` en el elemento.
3. **Ancho completo de un botón:** no hay clase; se ajusta con `style`.
4. **Una sola cabecera de página:** `gyu-cabecera` con un `<h4>` y un `gyu-ruta`.
5. **Grillas jqxGrid:** la altura total y las alturas de cabecera y filas (`columnsheight`, `rowsheight`) las define cada vista.
6. **Colores y medidas** salen de las variables `--gyu-*`. Para cambiar un valor del sistema, redefinir la variable en `:root` del proyecto, no editar el CSS.
7. **Un color nuevo** se declara como un theme propio, definiendo en una clase `gyu-theme-<nombre>` las variables `--gyu-c`, `--gyu-c-hover`, `--gyu-c-soft`, `--gyu-c-ink` y `--gyu-c-contrast`. Funciona en botones y badges.
8. **Diálogos** con `Swalert` y **avisos** con `GinyuToast`. Escapar el texto que viene del servidor antes de pasarlo, porque los diálogos insertan HTML.
9. Modificadores con guion simple (`gyu-grilla-arbol`). Estados: `gyu-abierto`, `gyu-seleccionado`, `gyu-deshabilitado`.
10. **Botón Guardar de un modal:** siempre `gyu-btn-solid` sin theme (primary). Cancelar es `gyu-btn-outline gyu-theme-secondary`.
11. **Sin subtítulo bajo el `<h4>` de la cabecera de página.** En `gyu-modal-titulo` sí puede ir una línea de apoyo.
12. **Todo `<select>` usa `gyu-select` y `gyuSeleccion`.** Si el código cambia opciones, valor o `disabled`, sincronizar con `trigger('gyu.actualizar')`.
13. **Grilla que llena la pantalla:** contenedor `flex: 1 1 0` con `ResizeObserver` y `ginyuEmptyState` (receta en `componentes.md`).
14. **Fechas:** `gyu-input` de tipo `date` o `datetime-local` con el ícono de calendario de `componentes.md`.
15. **Un solo Ginyu por página.** No cargar el CSS o JS de una versión anterior junto a este. Si un CSS del proyecto hace `@import` de la versión anterior, quitar esa línea.
16. **`<style>` propios:** se eliminan. Solo se conservan si necesitan `@keyframes`, `:hover`, pseudo-elementos o `@media`, y se avisa de ello.
17. **Íconos:** usar los SVG de `iconos.json` (índice en `iconos.md`). No inventar ni redibujar; si falta uno, avisar al usuario.

## Estructura de una vista

```html
<div class="gyu-pagina">
    <div class="gyu-cabecera">
        <h4>Título</h4>
        <div class="gyu-ruta">
            <span>Módulo</span>
            <span class="gyu-ruta-sep">&gt;</span>
            <span>Sección</span>
        </div>
    </div>
    <div class="gyu-cuerpo">
        <!-- barra de acciones, grilla -->
    </div>
</div>
```

## Migrar una vista existente

1. Cargar el CSS y el JS de Ginyu en la vista.
2. Envolver el contenido en `gyu-pagina` > `gyu-cabecera` + `gyu-cuerpo`.
3. Reemplazar los botones, formularios, tablas, modales y alertas por sus equivalentes de `componentes.md`.
4. Mover los `style` y `<style>` de adorno a las clases de Ginyu; dejar `style=""` solo para ajustes puntuales de layout.
   Los tamaños que Ginyu no tiene (por ejemplo controles de 30px) se dejan inline con `style=""` y se avisan al usuario.
5. Comprobar que toda clase `gyu-*` usada exista en `assets/ginyu.css`.
