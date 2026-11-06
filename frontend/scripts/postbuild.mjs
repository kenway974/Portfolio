// Exécuté après `vite-react-ssg build` : génère sitemap.xml, robots.txt
// et les images de partage (Open Graph, 1200×630) dans dist/.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const require = createRequire(import.meta.url)
const readJson = async p => JSON.parse(await readFile(join(root, p), 'utf8'))

const site = await readJson('site.config.json')
const posts = await readJson('src/data/blog.json')
const url = path => `${site.url}${path}`

// ---------- sitemap.xml ----------
const latestPost = posts.map(p => p.updated ?? p.date).sort().at(-1)
const pages = [
  { loc: url('/') },
  { loc: url('/blog'), lastmod: latestPost },
  ...posts.map(p => ({ loc: url(`/blog/${p.slug}`), lastmod: p.updated ?? p.date })),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>\n    <loc>${p.loc}</loc>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ''}\n  </url>`).join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap)

// ---------- robots.txt ----------
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${url('/sitemap.xml')}\n`)

// ---------- Images de partage ----------
const font = async (pkg, file) => readFile(require.resolve(`${pkg}/files/${file}`))
const fonts = [
  { name: 'Syne', data: await font('@fontsource/syne', 'syne-latin-800-normal.woff'), weight: 800 },
  { name: 'DM Sans', data: await font('@fontsource/dm-sans', 'dm-sans-latin-400-normal.woff'), weight: 400 },
]

const h = (type, style, children) => ({ type, props: { style, children } })

function card({ kicker, title, subtitle }) {
  // Syne 800 est très large : on réduit la taille selon la longueur du titre.
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
      h('div', { display: 'flex', width: 1040, fontFamily: 'Syne', fontWeight: 800, fontSize: size, lineHeight: 1.12 }, title),
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
  subtitle: 'Sites vitrines · E-commerce · API & automatisation',
})
for (const p of posts) {
  await renderOg(`blog/${p.slug}`, { kicker: `Blog · ${p.category}`, title: p.title, subtitle: site.name })
}

console.log(`[postbuild] sitemap (${pages.length} URLs), robots.txt, ${posts.length + 1} images de partage`)
