/* Vérifie chaque page générée : balises SEO, titres, accessibilité de base, liens internes. */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { DIST, loadPages, meta, site, text } from './dist'

const pages = loadPages()
const indexable = pages.filter(p => p.path !== '/404')
const paths = new Set(pages.map(p => p.path))

describe.each(indexable.map(p => [p.path, p] as const))('%s', (_path, page) => {
  const title = text(page.root.querySelector('title'))
  const description = meta(page, 'description') ?? ''
  const canonical = page.root.querySelector('link[rel="canonical"]')?.getAttribute('href')
  const url = `${site.url}${page.path}`

  it('a un <title> de 30 à 70 caractères', () => {
    expect(title.length, title).toBeGreaterThanOrEqual(30)
    expect(title.length, title).toBeLessThanOrEqual(70)
  })

  it('a une meta description de 110 à 165 caractères', () => {
    expect(description.length, description).toBeGreaterThanOrEqual(110)
    expect(description.length, description).toBeLessThanOrEqual(165)
  })

  it('n\'a pas de caractère parasite dans le titre ni la description', () => {
    for (const value of [title, description, meta(page, 'og:title') ?? '', meta(page, 'og:description') ?? '']) {
      expect(value, value).not.toMatch(/\\|\{|\}|undefined|null|NaN/)
    }
  })

  it('a une URL canonique égale à son adresse', () => {
    expect(canonical).toBe(url)
    expect(meta(page, 'og:url')).toBe(url)
  })

  it('a les balises Open Graph et Twitter, avec une image qui existe', () => {
    for (const key of ['og:title', 'og:description', 'og:type', 'og:image', 'og:image:alt', 'twitter:card']) {
      expect(meta(page, key), key).toBeTruthy()
    }
    const image = meta(page, 'og:image')!
    expect(image.startsWith(`${site.url}/og/`)).toBe(true)
    expect(existsSync(join(DIST, image.slice(site.url.length)))).toBe(true)
  })

  it('est indexable', () => {
    expect(meta(page, 'robots') ?? '').not.toContain('noindex')
  })

  it('est en français', () => {
    expect(page.root.querySelector('html')?.getAttribute('lang')).toBe('fr')
  })

  it('a exactement un H1, non vide', () => {
    const h1 = page.root.querySelectorAll('h1')
    expect(h1).toHaveLength(1)
    expect(text(h1[0]).length).toBeGreaterThan(10)
  })

  it('a une hiérarchie de titres sans saut de niveau', () => {
    const levels = page.root.querySelectorAll('h1, h2, h3, h4, h5, h6').map(h => Number(h.tagName[1]))
    levels.forEach((level, i) => {
      if (i > 0) expect(level - levels[i - 1], `h${levels[i - 1]} → h${level}`).toBeLessThanOrEqual(1)
    })
  })

  it('a un seul <main>, un lien d\'évitement vers le contenu et une navigation', () => {
    expect(page.root.querySelectorAll('main')).toHaveLength(1)
    expect(page.root.querySelector('main')?.getAttribute('id')).toBe('contenu')
    expect(page.root.querySelector('a.skip-link')?.getAttribute('href')).toBe('#contenu')
    expect(page.root.querySelectorAll('nav').length).toBeGreaterThan(0)
  })

  it('a des données structurées JSON-LD valides', () => {
    const scripts = page.root.querySelectorAll('script[type="application/ld+json"]')
    expect(scripts.length).toBeGreaterThan(0)
    for (const s of scripts) {
      const data = JSON.parse(s.textContent)
      expect(data['@context']).toBe('https://schema.org')
    }
  })

  it('n\'a que des liens internes qui mènent à une page existante', () => {
    for (const a of page.root.querySelectorAll('a[href^="/"]')) {
      const [path, hash] = a.getAttribute('href')!.split('#')
      // Une page du site, ou un fichier du dossier public (ex. le CV en PDF).
      expect(paths.has(path || '/') || existsSync(join(DIST, path)), a.getAttribute('href')).toBe(true)
      if (hash) {
        const target = pages.find(p => p.path === (path || '/'))!
        expect(target.root.querySelector(`[id="${hash}"]`), a.getAttribute('href')).not.toBeNull()
      }
    }
    for (const a of page.root.querySelectorAll('a[href^="#"]')) {
      const id = a.getAttribute('href')!.slice(1)
      expect(page.root.querySelector(`[id="${id}"]`), `#${id}`).not.toBeNull()
    }
  })

  it('a des liens et des boutons avec un nom accessible', () => {
    for (const el of page.root.querySelectorAll('a, button')) {
      const name = text(el) || el.getAttribute('aria-label') || ''
      expect(name.length, el.toString().slice(0, 120)).toBeGreaterThan(0)
    }
  })

  it('ouvre les liens externes dans un nouvel onglet en toute sécurité', () => {
    for (const a of page.root.querySelectorAll('a[target="_blank"]')) {
      expect(a.getAttribute('rel') ?? '', a.getAttribute('href') ?? '').toContain('noopener')
    }
  })

  it('a des identifiants uniques', () => {
    const ids = page.root.querySelectorAll('[id]').map(e => e.getAttribute('id'))
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([])
  })
})

describe('site', () => {
  it('a des titres et des descriptions uniques', () => {
    const titles = indexable.map(p => text(p.root.querySelector('title')))
    const descriptions = indexable.map(p => meta(p, 'description'))
    expect(titles.filter((t, i) => titles.indexOf(t) !== i)).toEqual([])
    expect(descriptions.filter((d, i) => descriptions.indexOf(d) !== i)).toEqual([])
  })

  it('a un sitemap qui liste exactement les pages indexables', () => {
    const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]).sort()
    expect(locs).toEqual(indexable.map(p => `${site.url}${p.path}`).sort())
  })

  it('a un robots.txt qui autorise l\'exploration et pointe vers le sitemap', () => {
    const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain(`Sitemap: ${site.url}/sitemap.xml`)
  })

  it('n\'a de caractère parasite dans aucun titre ni aucune description, 404 comprise', () => {
    for (const p of pages) {
      const values = [text(p.root.querySelector('title')), meta(p, 'description') ?? '']
      values.forEach(v => expect(v, `${p.path} : ${v}`).not.toMatch(/\\|\{|\}|undefined|null|NaN/))
    }
  })

  it('a une page 404 non indexable, absente du sitemap', () => {
    const notFound = pages.find(p => p.path === '/404')
    expect(notFound).toBeDefined()
    expect(meta(notFound!, 'robots')).toContain('noindex')
    expect(readFileSync(join(DIST, 'sitemap.xml'), 'utf8')).not.toContain('/404')
  })

  it('a une icône pour les écrans d\'accueil mobiles', () => {
    expect(existsSync(join(DIST, 'apple-touch-icon.png'))).toBe(true)
  })
})
