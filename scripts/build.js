const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const raiz = path.join(__dirname, '..');
const srcCss = path.join(raiz, 'src', 'css');
const dist = path.join(raiz, 'dist');

fs.mkdirSync(dist, { recursive: true });

const archivos = fs.readFileSync(path.join(srcCss, 'index.txt'), 'utf8')
  .split(/\r?\n/)
  .map(l => l.trim())
  .filter(Boolean);

const css = archivos
  .map(f => fs.readFileSync(path.join(srcCss, f), 'utf8'))
  .join('');

const js = fs.readFileSync(path.join(raiz, 'src', 'js', 'ginyu.js'), 'utf8');

fs.writeFileSync(path.join(dist, 'ginyu.css'), css);
fs.writeFileSync(path.join(dist, 'ginyu.js'), js);

const cssMin = esbuild.transformSync(css, { loader: 'css', minify: true }).code;
const jsMin = esbuild.transformSync(js, { loader: 'js', minify: true }).code;

fs.writeFileSync(path.join(dist, 'ginyu.min.css'), cssMin);
fs.writeFileSync(path.join(dist, 'ginyu.min.js'), jsMin);

const assets = path.join(raiz, 'skills', 'ginyu', 'assets');
fs.mkdirSync(assets, { recursive: true });
['ginyu.css', 'ginyu.min.css', 'ginyu.js', 'ginyu.min.js'].forEach(f => fs.copyFileSync(path.join(dist, f), path.join(assets, f)));

const kb = f => (fs.statSync(path.join(dist, f)).size / 1024).toFixed(1) + ' KB';
['ginyu.css', 'ginyu.min.css', 'ginyu.js', 'ginyu.min.js'].forEach(f => console.log(f.padEnd(15), kb(f)));
