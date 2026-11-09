#!/usr/bin/env bash
# Reemplaza esta skill por la versión publicada en GitHub. Uso: actualizar.sh [rama-o-etiqueta]

principal() {
    set -euo pipefail
    local repo="B1H3L/ginyu-ui"
    local ref="${1:-main}"
    local destino
    destino="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

    if [ ! -f "$destino/SKILL.md" ] || [ "$(basename "$destino")" != "ginyu" ]; then
        echo "Error: $destino no parece la carpeta de la skill ginyu." >&2
        return 1
    fi

    local antes="0"
    [ -f "$destino/VERSION" ] && antes="$(tr -d '[:space:]' < "$destino/VERSION")"

    tmp="$(mktemp -d)"
    trap 'rm -rf "${tmp:-}"' EXIT

    curl -fsSL "https://codeload.github.com/$repo/tar.gz/$ref" -o "$tmp/repo.tar.gz"
    tar -xzf "$tmp/repo.tar.gz" -C "$tmp"

    local origen
    origen="$(find "$tmp" -mindepth 3 -maxdepth 3 -type d -path '*/skills/ginyu' | head -n 1)"
    if [ -z "$origen" ] || [ ! -f "$origen/SKILL.md" ]; then
        echo "Error: la descarga no trae skills/ginyu." >&2
        return 1
    fi

    find "$destino" -mindepth 1 -maxdepth 1 ! -name 'actualizar.sh' ! -name 'actualizar.ps1' -exec rm -rf {} +
    cp -R "$origen"/. "$destino"/

    local despues="0"
    [ -f "$destino/VERSION" ] && despues="$(tr -d '[:space:]' < "$destino/VERSION")"
    echo "Skill ginyu actualizada: $antes -> $despues"
}

{ principal "$@"; exit $?; }
