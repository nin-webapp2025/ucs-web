// Static dev server for the UCS Premier Consults website.
// Serves the PROJECT ROOT at http://localhost:3000 (per CLAUDE.md).
// "/" maps to website/index.html when it exists, so localhost:3000 shows the site
// while /assets/... and /brand_assets/... remain reachable.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)));
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

async function resolvePath(urlPath) {
  // decode + strip query, block traversal
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p === '/' || p === '') {
    // Prefer the built site if present.
    for (const candidate of ['website/index.html', 'index.html']) {
      try { await stat(join(ROOT, candidate)); return join(ROOT, candidate); } catch {}
    }
    return join(ROOT, 'website'); // will 404 nicely until the site is built
  }
  const safe = normalize(p).replace(/^(\.\.[/\\])+/, '');
  let full = join(ROOT, safe);
  try {
    const s = await stat(full);
    if (s.isDirectory()) full = join(full, 'index.html');
  } catch {}
  return full;
}

const server = http.createServer(async (req, res) => {
  try {
    const file = await resolvePath(req.url);
    const data = await readFile(file);
    res.writeHead(200, {
      'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>404 Not Found</h1><p>${req.url}</p><p>Build the site into <code>website/index.html</code>.</p>`);
  }
});

server.listen(PORT, () => {
  console.log(`UCS dev server running at http://localhost:${PORT}  (root: ${ROOT})`);
});
