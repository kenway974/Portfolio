import { describe, expect, it } from 'vitest'
import { absoluteUrl, breadcrumbSchema, ogImage, parsePrice, serviceSchema, sectorSchema, site } from '../../src/seo'
import { getService } from '../../src/data/services'
import { SECTORS } from '../../src/data/secteurs'
import { formatDate } from '../../src/utils/date'
import { contactMessage } from '../../src/components/sector/text'

describe('adresses', () => {
  it('construisent des URL absolues sans double barre oblique', () => {
    expect(absoluteUrl('/')).toBe(`${site.url}/`)
    expect(absoluteUrl('/blog')).toBe(`${site.url}/blog`)
    expect(ogImage()).toBe(`${site.url}/og/default.png`)
    expect(ogImage('services/seo-performance')).toBe(`${site.url}/og/services/seo-performance.png`)
  })
})

describe('prix', () => {
  it('lit les montants écrits en français', () => {
    expect(parsePrice('300 €')).toBe(300)
    expect(parsePrice('1 200 € par projet')).toBe(1200)
    expect(parsePrice('200 € / jour')).toBe(200)
    expect(parsePrice('sur devis')).toBeUndefined()
  })
})

describe('données structurées', () => {
  it('numérotent le fil d\'Ariane à partir de 1', () => {
    const crumbs = breadcrumbSchema([['Accueil', '/'], ['Blog', '/blog']])
    expect(crumbs.itemListElement.map(i => i.position)).toEqual([1, 2])
    expect(crumbs.itemListElement[1].item).toBe(`${site.url}/blog`)
  })

  it('décrivent un service avec sa FAQ et son prix d\'appel', () => {
    const schema = serviceSchema(getService('creation-site-vitrine')!)
    const types = schema['@graph'].map(g => (g as { '@type': string })['@type'])
    expect(types).toEqual(['Service', 'BreadcrumbList', 'FAQPage'])
    expect(JSON.stringify(schema)).toContain('"minPrice":300')
  })

  it('décrivent une page secteur par la liste de ses problèmes, sans offre', () => {
    const cvc = SECTORS.find(s => s.slug === 'cvc')!
    const json = JSON.stringify(sectorSchema(cvc))
    expect(json).toContain('"@type":"ItemList"')
    expect(json).not.toContain('"Offer"')
  })
})

describe('textes', () => {
  it('affiche les dates en français', () => {
    expect(formatDate('2025-05-10')).toBe('10 mai 2025')
  })

  it('pré-remplit le message de contact avec le secteur et le problème', () => {
    const message = contactMessage('Avocats', 'Votre activité dépend des recommandations')
    expect(message).toContain('Secteur : Avocats')
    expect(message).toContain('« Votre activité dépend des recommandations »')
    expect(contactMessage('Avocats')).not.toContain('Je me reconnais')
  })
})
