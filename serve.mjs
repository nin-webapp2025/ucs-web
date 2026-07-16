// Static dev server for the UCS Premier Consults website.
// Serves http://localhost:3000. Requests resolve from the built site (website/)
// first, then fall back to the repo root, so the app's root-relative /assets/*
// work AND /brand_assets/* (brand guidelines page) stay reachable.
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
  const p = decodeURIComponent(urlPath.split('?')[0]);
  const safe = normalize(p === '/' || p === '' ? '/index.html' : p).replace(/^(\.\.[/\\])+/, '');
  // Built site first, then repo root (keeps /brand_assets/* reachable).
  for (const baseDir of ['website', '.']) {
    let full = join(ROOT, baseDir, safe);
    try {
      let s = await stat(full);
      if (s.isDirectory()) { full = join(full, 'index.html'); s = await stat(full); }
      if (s.isFile()) return full;
    } catch {}
  }
  return join(ROOT, 'website', 'index.html'); // SPA-style fallback
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
