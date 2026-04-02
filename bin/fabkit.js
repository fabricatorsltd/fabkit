#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const command = args[0];

if (command === 'init') {
  console.log('Initializing fabkit...');

  const targetDir = process.cwd();
  const themePath = path.join(targetDir, 'src', 'lib', 'theme.js');

  const themeContent = `import { initTheme, defaultTheme } from 'fabkit';\n\ninitTheme(defaultTheme);\n\nexport const theme = defaultTheme;\n`;

  try {
    const srcLibPath = path.join(targetDir, 'src', 'lib');
    if (!fs.existsSync(srcLibPath)) {
      fs.mkdirSync(srcLibPath, { recursive: true });
    }

    if (!fs.existsSync(themePath)) {
      fs.writeFileSync(themePath, themeContent, 'utf-8');
      console.log('Created theme.js in src/lib/theme.js');
    } else {
      console.log('theme.js alraedy exist.');
    }

    console.log('fabkit initialized, remember to import theme.js in your +layout.svelte or app.html.');
  } catch (error) {
    console.error('Failed during initialization:', error);
    process.exit(1);
  }
} else {
  console.log('Usage: npx fabkit init');
}
