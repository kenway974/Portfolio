import { describe, expect, it } from 'vitest'
import { QUESTIONS, answerLabels, diagnosticMessage, rankServices, sectorFor } from '../../src/data/diagnostic'
import services from '../../src/data/services'
import { SECTORS } from '../../src/data/secteurs'

const serviceSlugs = new Set(services.map(s => s.slug))
const sectorSlugs = new Set(SECTORS.map(s => s.slug))

describe('questions du diagnostic', () => {
  it('ont des identifiants uniques', () => {
    const ids = QUESTIONS.map(q => q.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const q of QUESTIONS) {
      const options = q.options.map(o => o.id)
      expect(new Set(options).size, q.id).toBe(options.length)
    }
  })

  it('donnent des points à des services qui existent et renvoient vers des secteurs qui existent', () => {
    for (const q of QUESTIONS) {
      for (const o of q.options) {
        Object.keys(o.scores ?? {}).forEach(slug => expect(serviceSlugs.has(slug), `${q.id}.${o.id} → ${slug}`).toBe(true))
        if (o.sector) expect(sectorSlugs.has(o.sector), `${q.id}.${o.id}`).toBe(true)
      }
    }
  })

  it('permettent d\'atteindre chaque service', () => {
    const reachable = new Set(QUESTIONS.flatMap(q => q.options.flatMap(o => Object.keys(o.scores ?? {}))))
    expect([...serviceSlugs].filter(s => !reachable.has(s))).toEqual([])
  })
})

describe('recommandations', () => {
  it('mettent en tête le service qui répond le plus aux réponses', () => {
    expect(rankServices({ objectifs: ['vendre'] })[0]).toBe('site-e-commerce')
    expect(rankServices({ situation: ['aucun'] })[0]).toBe('creation-site-vitrine')
    expect(rankServices({ objectifs: ['temps', 'ia'] })[0]).toBe('automatisation-ia')
  })

  it('privilégient la vente en ligne quand le visiteur veut vendre, même sans site', () => {
    expect(rankServices({ situation: ['aucun'], objectifs: ['vendre', 'google'] })[0]).toBe('site-e-commerce')
  })

  it('additionnent les points de plusieurs réponses', () => {
    const ranked = rankServices({ situation: ['peu'], objectifs: ['google'] })
    expect(ranked[0]).toBe('seo-performance')
  })

  it('proposent le conseil quand aucune réponse ne donne de point', () => {
    expect(rankServices({})).toEqual(['conseil-cadrage-mvp'])
    expect(rankServices({ delai: ['urgent'], budget: ['nsp'] })).toEqual(['conseil-cadrage-mvp'])
  })

  it('relient le profil à la page de son secteur', () => {
    expect(sectorFor({ profil: ['garage'] })).toBe('garages')
    expect(sectorFor({ profil: ['pme'] })).toBeUndefined()
    expect(sectorFor({})).toBeUndefined()
  })

  it('résument les réponses avec leurs libellés', () => {
    expect(answerLabels({ profil: ['avocat'], objectifs: ['google', 'vendre'] })).toEqual([
      { question: 'Vous êtes…', labels: ['Avocat ou cabinet'] },
      { question: 'Qu\'est-ce que vous voulez obtenir ?', labels: ['Être trouvé sur Google', 'Vendre en ligne'] },
    ])
  })
})

describe('message envoyé avec le diagnostic', () => {
  const answers = { profil: ['garage'], objectifs: ['vendre', 'google'] }

  it('reprend les réponses et les services suggérés', () => {
    const message = diagnosticMessage(answers, ['Site e-commerce'])
    expect(message).toContain('- Vous êtes : Garage ou carrosserie')
    expect(message).toContain('Vendre en ligne, Être trouvé sur Google')
    expect(message).toContain('- Services suggérés : Site e-commerce')
    expect(message).not.toContain('Mon projet en quelques mots')
  })

  it('ajoute le mot du visiteur seulement s\'il en a écrit un', () => {
    expect(diagnosticMessage(answers, [], '  Deux ateliers à Lyon  ')).toContain('Mon projet en quelques mots : Deux ateliers à Lyon')
    expect(diagnosticMessage(answers, [], '   ')).not.toContain('Mon projet')
  })
})
