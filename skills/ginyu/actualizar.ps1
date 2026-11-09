param([string]$Ref = 'main')

$ErrorActionPreference = 'Stop'
$repo = 'B1H3L/ginyu-ui'
$destino = $PSScriptRoot

if (-not (Test-Path (Join-Path $destino 'SKILL.md')) -or (Split-Path $destino -Leaf) -ne 'ginyu') {
    Write-Error "$destino no parece la carpeta de la skill ginyu."
    exit 1
}

$antes = '0'
$archivoVersion = Join-Path $destino 'VERSION'
if (Test-Path $archivoVersion) { $antes = (Get-Content $archivoVersion -Raw).Trim() }

$tmp = Join-Path ([System.IO.Path]::GetTempPath()) ('ginyu-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $tmp | Out-Null

try {
    $zip = Join-Path $tmp 'repo.zip'
    Invoke-WebRequest -Uri "https://codeload.github.com/$repo/zip/$Ref" -OutFile $zip -UseBasicParsing
    Expand-Archive -Path $zip -DestinationPath $tmp -Force

    $origen = Get-ChildItem -Path $tmp -Directory | ForEach-Object { Join-Path $_.FullName 'skills\ginyu' } | Where-Object { Test-Path (Join-Path $_ 'SKILL.md') } | Select-Object -First 1
    if (-not $origen) {
        Write-Error 'La descarga no trae skills/ginyu.'
        exit 1
    }

    Get-ChildItem -Path $destino -Force | Where-Object { $_.Name -notin @('actualizar.ps1', 'actualizar.sh') } | Remove-Item -Recurse -Force
    Copy-Item -Path (Join-Path $origen '*') -Destination $destino -Recurse -Force

    $despues = '0'
    if (Test-Path $archivoVersion) { $despues = (Get-Content $archivoVersion -Raw).Trim() }
    Write-Output "Skill ginyu actualizada: $antes -> $despues"
}
finally {
    Remove-Item -Path $tmp -Recurse -Force -ErrorAction SilentlyContinue
}
