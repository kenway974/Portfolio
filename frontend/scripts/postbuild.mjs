// Exécuté après `vite-react-ssg build` : parcourt les pages HTML générées dans dist/
// pour produire sitemap.xml, robots.txt et les images de partage (Open Graph, 1200×630).
// Aucune liste à maintenir : toute nouvelle page pré-rendue est prise en compte.
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const require = createRequire(import.meta.url)

const site = JSON.parse(await readFile(join(root, 'site.config.json'), 'utf8'))
const url = path => `${site.url}${path}`

// ---------- Lecture des pages générées ----------
async function htmlFiles(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await htmlFiles(full))
    else if (entry.name.endsWith('.html') && entry.name !== '404.html') out.push(full)
  }
  return out
}

const decode = s => s
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").trim()

const meta = (html, prop) =>
  html.match(new RegExp(`<meta[^>]*(?:property|name)="${prop}"[^>]*content="([^"]*)"`))?.[1]

const pages = []
for (const file of await htmlFiles(dist)) {
  const html = await readFile(file, 'utf8')
  const rel = relative(dist, file).split(sep).join('/').replace(/\.html$/, '')
  const path = rel === 'index' ? '/' : `/${rel}`
  pages.push({
    path,
    h1: decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''),
    image: meta(html, 'og:image'),
    lastmod: meta(html, 'article:modified_time'),
  })
}
pages.sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)))

// ---------- sitemap.xml ----------
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>\n    <loc>${url(p.path)}</loc>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ''}\n  </url>`).join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap)

// ---------- robots.txt ----------
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${url('/sitemap.xml')}\n`)

// ---------- Icône d'écran d'accueil (iOS) ----------
const favicon = await readFile(join(root, 'public/favicon.svg'), 'utf8')
await writeFile(join(dist, 'apple-touch-icon.png'), new Resvg(favicon, { fitTo: { mode: 'width', value: 180 } }).render().asPng())

// ---------- Images de partage ----------
const font = async (pkg, file) => readFile(require.resolve(`${pkg}/files/${file}`))
const fonts = [
  { name: 'Familjen Grotesk', data: await font('@fontsource/familjen-grotesk', 'familjen-grotesk-latin-700-normal.woff'), weight: 700 },
  { name: 'DM Sans', data: await font('@fontsource/dm-sans', 'dm-sans-latin-400-normal.woff'), weight: 400 },
]

const h = (type, style, children) => ({ type, props: { style, children } })

function card({ kicker, title, subtitle }) {
  // On réduit la taille selon la longueur du titre.
  const size = title.length > 60 ? 50 : title.length > 40 ? 58 : 66
  return h('div', {
    width: 1200, height: 630, display: 'flex', flexDirection: 'column',
    background: '#060507', color: '#f5efe8', fontFamily: 'DM Sans',
    backgroundImage: 'radial-gradient(circle at 85% 110%, rgba(232,156,26,0.35), rgba(6,5,7,0) 55%)',
  }, [
    h('div', {
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      flexGrow: 1, padding: '64px 80px 56px',
    }, [
      h('div', { display: 'flex', alignItems: 'center', fontSize: 26, color: '#f5c842', letterSpacing: 2 }, [
        h('div', { width: 14, height: 14, background: '#e89c1a', transform: 'rotate(45deg)', marginRight: 20 }),
        h('span', {}, kicker.toUpperCase()),
      ]),
      h('div', { display: 'flex', width: 1040, fontFamily: 'Familjen Grotesk', fontWeight: 700, fontSize: size, lineHeight: 1.12 }, title),
      h('div', { display: 'flex', justifyContent: 'space-between', fontSize: 24, color: 'rgba(245,239,232,0.6)' }, [
        h('span', {}, subtitle),
        h('span', {}, site.url.replace('https://', '')),
      ]),
    ]),
    h('div', { display: 'flex', height: 10, background: '#e89c1a' }),
  ])
}

async function renderOg(file, content) {
  const svg = await satori(card(content), { width: 1200, height: 630, fonts })
  const png = new Resvg(svg).render().asPng()
  const out = join(dist, 'og', `${file}.png`)
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, png)
}

await renderOg('default', {
  kicker: site.name,
  title: 'Développeur web freelance. Sites & applications sur mesure.',
  subtitle: 'Sites web · Applications · Automatisation & IA',
})

const KICKERS = { blog: 'Blog', services: 'Service', realisations: 'Réalisation', secteurs: 'Votre secteur', profil: 'Profil' }
let count = 1
for (const p of pages) {
  const slug = p.image?.match(/\/og\/(.+)\.png$/)?.[1]
  if (!slug || slug === 'default' || !p.h1) continue
  await renderOg(slug, { kicker: KICKERS[slug.split('/')[0]] ?? site.name, title: p.h1, subtitle: site.name })
  count++
}

console.log(`[postbuild] sitemap (${pages.length} URLs), robots.txt, ${count} images de partage`)
