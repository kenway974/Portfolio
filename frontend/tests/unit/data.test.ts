/* Cohérence des contenus : chaque renvoi pointe vers quelque chose qui existe. */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import services, { SERVICE_CATEGORIES } from '../../src/data/services'
import realisations from '../../src/data/realisations'
import { SECTORS, SRC, sectorPath } from '../../src/data/secteurs'
import blog from '../../src/data/blog.json'

const serviceSlugs = new Set(services.map(s => s.slug))
const realisationSlugs = new Set(realisations.map(r => r.slug))
const duplicates = (list: string[]) => list.filter((x, i) => list.indexOf(x) !== i)
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/

describe('services', () => {
  it('ont des slugs uniques et propres', () => {
    expect(duplicates(services.map(s => s.slug))).toEqual([])
    services.forEach(s => expect(s.slug).toMatch(SLUG))
  })

  it('appartiennent à une catégorie connue', () => {
    services.forEach(s => expect(SERVICE_CATEGORIES).toContain(s.category))
  })

  it('renvoient vers des services et des réalisations qui existent', () => {
    for (const s of services) {
      s.related.forEach(r => expect(serviceSlugs.has(r), `${s.slug} → ${r}`).toBe(true))
      s.projects.forEach(p => expect(realisationSlugs.has(p), `${s.slug} → ${p}`).toBe(true))
      expect(s.related).not.toContain(s.slug)
    }
  })

  it('ont un contenu suffisant : prestations, sections et FAQ', () => {
    for (const s of services) {
      expect(s.includes.length, s.slug).toBeGreaterThanOrEqual(4)
      expect(s.sections.length, s.slug).toBeGreaterThanOrEqual(2)
      expect(s.faq.length, s.slug).toBeGreaterThanOrEqual(3)
    }
  })
})

describe('réalisations', () => {
  it('ont des slugs uniques et propres', () => {
    expect(duplicates(realisations.map(r => r.slug))).toEqual([])
    realisations.forEach(r => expect(r.slug).toMatch(SLUG))
  })

  it('renvoient vers des services qui existent', () => {
    realisations.forEach(r => r.services.forEach(s => expect(serviceSlugs.has(s), `${r.slug} → ${s}`).toBe(true)))
  })

  it('ont des liens externes en https', () => {
    realisations.forEach(r => [r.url, r.repo].filter(Boolean).forEach(u => expect(u).toMatch(/^https:\/\//)))
  })
})

describe('secteurs', () => {
  const offers = SECTORS.filter(s => s.page.kind !== 'profile')

  it('ont des slugs uniques et propres', () => {
    expect(duplicates(SECTORS.map(s => s.slug))).toEqual([])
    SECTORS.forEach(s => expect(s.slug).toMatch(SLUG))
  })

  it('listent au moins 5 problèmes, chacun avec un constat et un impact', () => {
    for (const s of offers) {
      if (s.page.kind === 'profile') continue
      expect(s.page.problems.length, s.slug).toBeGreaterThanOrEqual(5)
      for (const p of s.page.problems) {
        expect(p.facts.length, p.title).toBeGreaterThan(0)
        expect(p.impact.length, p.title).toBeGreaterThan(30)
      }
    }
  })

  it('relient chaque problème à un service qui existe', () => {
    for (const s of offers) {
      if (s.page.kind === 'profile') continue
      s.page.problems.forEach(p => expect(serviceSlugs.has(p.service), `${s.slug} : ${p.title}`).toBe(true))
    }
  })

  it('citent des sources qui existent, et toutes les sources servent', () => {
    const used = new Set<string>()
    for (const s of offers) {
      if (s.page.kind === 'profile') continue
      s.page.problems.flatMap(p => p.facts).forEach(f => (f.src ?? []).forEach(k => used.add(k)))
      if (s.page.note?.src) used.add(s.page.note.src)
    }
    used.forEach(k => expect(SRC[k], k).toBeDefined())
    expect(Object.keys(SRC).filter(k => !used.has(k))).toEqual([])
    Object.values(SRC).forEach(src => expect(src.url).toMatch(/^https:\/\//))
  })

  it('n\'affichent ni prix ni offre : les pages secteur parlent des problèmes', () => {
    for (const s of offers) {
      if (s.page.kind === 'profile') continue
      // Les constats peuvent citer un prix (ex. l'abonnement d'une plateforme), pas les textes de la page.
      const { problems, ...rest } = s.page
      const text = JSON.stringify([rest, problems.map(p => [p.title, p.impact])])
      expect(text, s.slug).not.toMatch(/\d\s?€|\bpacks?\b|à partir de|mes offres/i)
    }
  })

  it('ont une adresse sous /secteurs, sauf le profil recruteur', () => {
    expect(sectorPath('cvc')).toBe('/secteurs/cvc')
    expect(sectorPath('recruteur')).toBe('/profil')
  })
})

describe('blog', () => {
  it('a des slugs uniques, des dates valides et un titre SEO court', () => {
    expect(duplicates(blog.map(p => p.slug))).toEqual([])
    for (const p of blog) {
      expect(p.slug).toMatch(SLUG)
      expect(Number.isNaN(Date.parse(p.date))).toBe(false)
      expect(`${p.seoTitle} | Kenny Pignolet`.length, p.slug).toBeLessThanOrEqual(70)
    }
  })
})

describe('formulaire de contact', () => {
  it('le backend accepte tous les types de projet proposés par le site', () => {
    const route = readFileSync(join(__dirname, '../../../backend/src/routes/contact.js'), 'utf8')
    const block = route.slice(route.indexOf('SERVICE_TYPES = ['), route.indexOf(']', route.indexOf('SERVICE_TYPES = [')))
    const accepted = new Set([...block.matchAll(/'([a-z0-9-]+)'/g)].map(m => m[1]))
    for (const slug of [...serviceSlugs, 'renfort-equipe', 'other']) {
      expect(accepted.has(slug), slug).toBe(true)
    }
  })
})
