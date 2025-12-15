import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const globBinPath = path.join(__dirname, '..', 'node_modules', 'glob', 'dist', 'esm', 'bin.mjs');

async function patchGlobCli() {
  try {
    const fileContents = await readFile(globBinPath, 'utf8');
    const vulnerableSnippet = 'foregroundChild(cmd, matches, { shell: true })';
    const patchedSnippet = 'foregroundChild(cmd, matches, { shell: false, windowsVerbatimArguments: false })';

    if (fileContents.includes(patchedSnippet)) {
      console.log('glob CLI already patched to avoid shell execution.');
      return;
    }

    if (!fileContents.includes(vulnerableSnippet)) {
      console.warn('glob CLI structure changed; skipping patch because expected snippet was not found.');
      return;
    }

    const updated = fileContents.replace(vulnerableSnippet, patchedSnippet);
    await writeFile(globBinPath, updated);
    console.log('Patched glob CLI to disable shell execution for --cmd.');
  } catch (error) {
    console.warn('Unable to patch glob CLI:', error?.message ?? error);
  }
}

patchGlobCli();
