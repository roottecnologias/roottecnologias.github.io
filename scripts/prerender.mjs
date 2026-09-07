import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexFile = join(distDir, 'index.html');
const routes = ['esteticas', 'esteticas/example', 'esteticas/signal-density', 'esteticas/quiet-machines', 'lab', 'lab/example', 'lab/motion-scratches', 'lab/studio-archive', 'contacto'];

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
