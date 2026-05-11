$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$outputDir = Join-Path $root 'public\assets'
$manifestPath = Join-Path $outputDir 'sports-images-manifest.json'

$searchTerms = @(
  'sports shoes',
  'sports apparel'
)

if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$headers = @{ 'User-Agent' = 'Mozilla/5.0' }
$pattern = 'https://upload\.wikimedia\.org/wikipedia/commons/thumb/[^"'' ]+/330px-[^"'' ]+'
$urlToTerm = New-Object 'System.Collections.Generic.Dictionary[string,string]'

foreach ($term in $searchTerms) {
  Write-Host "Collecting $term"
  $searchUrl = 'https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=' + [uri]::EscapeDataString($term)
  $html = (Invoke-WebRequest -UseBasicParsing -Headers $headers -Uri $searchUrl).Content
  $matches = [regex]::Matches($html, $pattern)

  foreach ($match in $matches) {
    $url = $match.Value -replace '\\u0026', '&' -replace '&amp;', '&'
    if (-not $urlToTerm.ContainsKey($url)) {
      $urlToTerm[$url] = $term
    }
  }

  Start-Sleep -Milliseconds 900
}

$selected = @()
foreach ($group in ($urlToTerm.GetEnumerator() | Group-Object Value)) {
  $selected += $group.Group | Select-Object -First 20
}

if ($selected.Count -gt 20) {
  $selected = $selected | Select-Object -First 20
}

$manifest = New-Object System.Collections.Generic.List[object]
$index = 1

foreach ($entry in $selected) {
  $cleanUrl = ($entry.Key -replace '\?utm_source=.*$', '')
  $uri = [uri]$cleanUrl
  $leaf = [uri]::UnescapeDataString($uri.Segments[-1])
  $safeLeaf = ($leaf -replace '[^a-zA-Z0-9._-]+', '_')
  $ext = [System.IO.Path]::GetExtension($safeLeaf)
  if ([string]::IsNullOrWhiteSpace($ext)) {
    $ext = '.jpg'
  }

  $baseName = [System.IO.Path]::GetFileNameWithoutExtension($safeLeaf)
  $safeBase = ($baseName -replace '[^a-zA-Z0-9._-]+', '_').Trim('_')
  if ([string]::IsNullOrWhiteSpace($safeBase)) {
    $safeBase = 'sports-image'
  }

  $fileName = ('{0:000}-{1}{2}' -f $index, $safeBase, $ext)
  $filePath = Join-Path $outputDir $fileName

  try {
    Write-Host "Downloading $fileName"
    Invoke-WebRequest -UseBasicParsing -Headers $headers -Uri $cleanUrl -OutFile $filePath

    $manifest.Add([pscustomobject]@{
      fileName = $fileName
      sourceUrl = $cleanUrl
      searchTerm = $entry.Value
    })
  }
  catch {
    Write-Warning "Skipped $cleanUrl"
  }

  $index++
  Start-Sleep -Milliseconds 500
}

$manifest | ConvertTo-Json -Depth 4 | Set-Content -Path $manifestPath -Encoding UTF8
Write-Host "Downloaded $($manifest.Count) images"