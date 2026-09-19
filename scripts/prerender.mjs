import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexFile = join(distDir, 'index.html');
const routes = [
  'esteticas',
  'esteticas/terminal-bloom',
  'esteticas/terminal-bloom/live',
  'esteticas/nocturne-grid',
  'esteticas/nocturne-grid/live',
  'esteticas/swiss-system',
  'esteticas/swiss-system/live',
  'esteticas/signal-garden',
  'esteticas/signal-garden/live',
  'esteticas/example',
  'esteticas/example/live',
  'esteticas/signal-density',
  'esteticas/signal-density/live',
  'esteticas/quiet-machines',
  'esteticas/quiet-machines/live',
  'lab',
  'lab/example',
  'lab/motion-scratches',
  'lab/studio-archive',
  'contacto',
];

async function ensureRoute(route) {
  const routeIndex = join(distDir, route, 'index.html');
  await mkdir(dirname(routeIndex), { recursive: true });
  await copyFile(indexFile, routeIndex);
}

async function main() {
  for (const route of routes) {
    await ensureRoute(route);
  }

  await copyFile(indexFile, join(distDir, '404.html'));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
