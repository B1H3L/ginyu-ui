---
name: ginyu
description: Usar el sistema de diseño Ginyu (clases gyu-) al construir o migrar interfaces. Aplica cuando se pida agregar Ginyu a un proyecto, crear o migrar una vista con Ginyu, o usar un componente gyu- (botones, grilla, cabecera, modal, tabs, diálogos, toasts, selector desplegable).
---

# Ginyu

Sistema de diseño con la lógica de Bootstrap 6 donde Bootstrap ya resolvió el problema (botones con estilo + theme, tamaños) y componentes propios en español donde hace falta (grilla, cabecera, ruta, cuerpo). Prefijo de clases: `gyu-`.

## Archivos

Junto a este `SKILL.md`:

| Archivo | Qué es |
|---|---|
| `assets/ginyu.min.css` | CSS listo para usar. |
| `assets/ginyu.min.js` | JS listo para usar. Requiere jQuery. |
| `assets/ginyu.css`, `assets/ginyu.js` | Versiones sin minificar, para leer o depurar. |
| `componentes.md` | Lista completa de clases y funciones JS. Leerla antes de escribir HTML. |

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
5. Comprobar que toda clase `gyu-*` usada exista en `assets/ginyu.css`.
