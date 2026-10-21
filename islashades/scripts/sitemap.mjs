// Writes dist/sitemap.xml after `vite build`, including one URL per project.
import { readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SITE_URL = 'https://islashadespr.com';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const projectSlugs = readdirSync(path.join(root, 'content/projects'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''));

const paths = ['/', '/about', '/projects', '/services', ...projectSlugs.map((s) => `/projects/${s}`)];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n')}
</urlset>
`;

writeFileSync(path.join(root, 'dist/sitemap.xml'), xml);
console.log(`sitemap.xml: ${paths.length} URLs`);
