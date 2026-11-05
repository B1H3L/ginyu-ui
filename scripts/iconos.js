const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const destino = path.join(raiz, 'skills', 'ginyu');

const args = process.argv.slice(2);
const copiarIdx = args.indexOf('--copiar');
const carpetaCopia = copiarIdx !== -1 ? args.splice(copiarIdx, 2)[1] : null;
const fuente = args[0] || process.env.GINYU_ICONOS_FUENTE;

if (!fuente) {
  console.error('Uso: npm run iconos -- <ruta/al/ui-components/index.phtml> [--copiar <carpeta de la skill>]');
  console.error('También sirve la variable GINYU_ICONOS_FUENTE.');
  process.exit(1);
}

const texto = fs.readFileSync(fuente, 'utf8');
const inicio = texto.indexOf('const svgIconsList = [');
if (inicio === -1) {
  console.error('No se encontró "const svgIconsList = [" en ' + fuente);
  process.exit(1);
}

const cierre = texto.indexOf('\n    ];', inicio);
if (cierre === -1) {
  console.error('No se encontró el cierre "];" de svgIconsList.');
  process.exit(1);
}

const bloque = texto.slice(inicio, cierre + '\n    ];'.length).replace(/^const svgIconsList =/, 'return');
const lista = new Function(bloque)();

const ids = new Set();
lista.forEach((icono, i) => {
  ['id', 'name', 'category', 'tags', 'svg'].forEach(campo => {
    if (!icono[campo]) throw new Error('Ícono #' + i + ' sin "' + campo + '".');
  });
  if (ids.has(icono.id)) throw new Error('Id repetido: ' + icono.id);
  ids.add(icono.id);
  if (!/^<svg[\s>]/.test(icono.svg.trim())) throw new Error('El ícono "' + icono.id + '" no empieza con <svg>.');
});

const json = lista.map(i => ({ id: i.id, nombre: i.name, categoria: i.category, etiquetas: i.tags, svg: i.svg.trim() }));
fs.writeFileSync(path.join(destino, 'iconos.json'), JSON.stringify(json, null, 2) + '\n');

const categorias = [...new Set(lista.map(i => i.category))];
let md = '# Íconos SVG de Ginyu\n\n' +
  'Colección de íconos vectoriales de uso real en Cubicol. El código de cada uno está en `iconos.json` (`id`, `nombre`, `categoria`, `etiquetas`, `svg`). Buscar por `id` o por etiqueta y pegar el `svg` tal cual.\n\n' +
  'Reglas:\n\n' +
  '- Usar solo estos íconos. No inventar ni redibujar SVG; si falta uno, avisar al usuario.\n' +
  '- Los que usan `currentColor` toman el color del texto del elemento; los demás traen su color propio.\n' +
  '- El tamaño se ajusta con `width` y `height` del `<svg>`.\n' +
  '- Los íconos de acciones comunes (agregar, guardar, eliminar, exportar) van dentro de un botón `gyu-btn-*` con su texto.\n\n';

categorias.forEach(categoria => {
  md += '## ' + categoria + '\n\n| `id` | Nombre | Etiquetas |\n|---|---|---|\n';
  lista.filter(i => i.category === categoria).forEach(i => {
    md += '| `' + i.id + '` | ' + i.name + ' | ' + i.tags + ' |\n';
  });
  md += '\n';
});
fs.writeFileSync(path.join(destino, 'iconos.md'), md.trimEnd() + '\n');

function buscarSkill(desde) {
  let dir = path.dirname(path.resolve(desde));
  while (true) {
    const candidata = path.join(dir, '.claude', 'skills', 'ginyu');
    if (fs.existsSync(candidata)) return candidata;
    const padre = path.dirname(dir);
    if (padre === dir) return null;
    dir = padre;
  }
}

const copia = carpetaCopia ? path.resolve(carpetaCopia) : buscarSkill(fuente);
if (copia && fs.existsSync(copia)) {
  ['iconos.json', 'iconos.md'].forEach(f => fs.copyFileSync(path.join(destino, f), path.join(copia, f)));
  console.log('Copiado a ' + copia);
}

console.log(lista.length + ' íconos en ' + categorias.length + ' categorías: ' + categorias.join(', '));
console.log('Falta commitear y subir skills/ginyu/iconos.json e iconos.md.');
