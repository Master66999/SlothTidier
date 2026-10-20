// Export utilities: Generates PowerShell (.ps1), Bash (.sh), and manifest exports

export function generatePowerShellScript(organizedFiles) {
  let script = `# =====================================================================
# SlothTidier - Autonomous Local Clutter Tamer
# Generated on: ${new Date().toLocaleString()}
# Open-Weight AI powered by Qwen3 8B (100% Local, Zero Cloud Leakage)
# =====================================================================

Write-Host "🦥 Sloan the Sloth is organizing your clutter..." -ForegroundColor Green

# 1. Create organized folder structure
`;

  const folders = [...new Set(organizedFiles.map(f => f.folder))];
  folders.forEach(f => {
    script += `New-Item -ItemType Directory -Force -Path "./${f}" | Out-Null\n`;
  });

  script += `\n# 2. Safely move and rename files\n`;

  organizedFiles.forEach(f => {
    if (f.isDuplicateOrJunk) {
      script += `# JUNK / DUPLICATE: Archive or purge
if (Test-Path -LiteralPath "./${f.originalName}") {
    Move-Item -LiteralPath "./${f.originalName}" -Destination "./${f.folder}/${f.newName}" -Force
    Write-Host "📦 Archived: ${f.originalName} -> ${f.folder}/${f.newName}" -ForegroundColor Yellow
}
`;
    } else {
      script += `if (Test-Path -LiteralPath "./${f.originalName}") {
    Move-Item -LiteralPath "./${f.originalName}" -Destination "./${f.folder}/${f.newName}" -Force
    Write-Host "✅ Tidy: ${f.originalName} -> ${f.folder}/${f.newName}" -ForegroundColor Cyan
}
`;
    }
  });

  script += `\nWrite-Host "🎉 SlothTidier complete! All files organized. Back to sleep..." -ForegroundColor Green\n`;
  return script;
}

export function generateBashScript(organizedFiles) {
  let script = `#!/bin/bash
# =====================================================================
# SlothTidier - Autonomous Local Clutter Tamer
# Generated on: ${new Date().toLocaleString()}
# Open-Weight AI powered by Qwen3 8B (100% Local, Zero Cloud Leakage)
# =====================================================================

echo "🦥 Sloan the Sloth is organizing your clutter..."

# 1. Create directories
`;

  const folders = [...new Set(organizedFiles.map(f => f.folder))];
  folders.forEach(f => {
    script += `mkdir -p "./${f}"\n`;
  });

  script += `\n# 2. Move & rename files\n`;

  organizedFiles.forEach(f => {
    script += `if [ -f "./${f.originalName}" ]; then
  mv "./${f.originalName}" "./${f.folder}/${f.newName}"
  echo "✅ ${f.originalName} -> ./${f.folder}/${f.newName}"
fi
`;
  });

  script += `\necho "🎉 SlothTidier finished! Time for a nap."\n`;
  return script;
}

export function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
