export interface Source { label: string; url: string }

/** Constat factuel, avec ses sources éventuelles (clés de SRC). */
export interface Fact { text: string; src?: string[] }

/** Un problème que le professionnel peut reconnaître, et ce qu'il lui coûte. */
export interface Problem {
  /** Le problème, formulé comme le dirait le professionnel. */
  title: string
  /** Ce qui se passe concrètement (constats). */
  facts: Fact[]
  /** Conséquence sur l'activité : chiffre d'affaires, temps, clients. */
  impact: string
  /** Service qui règle ce problème (slug de services.ts). */
  service: string
}

export interface ProblemsPage {
  kind?: undefined
  /** Balise <title> et meta description. */
  title: string
  description: string
  /** Pour qui est la page (au-dessus du titre). */
  who: string
  /** Titre H1, avec le métier. */
  h1: string
  /** Accroche sous le titre. */
  intro: string
  problems: Problem[]
  /** Encadré « Bon à savoir » (ex. règles d'une profession). */
  note?: { text: string; src?: string }
}

export interface ProfilePage {
  kind: 'profile'
  title: string
  description: string
  who: string
  /** Titre H1. */
  h1: string
  intro: string
  /** Compétences concrètes : ce que je sais faire, pas avec quel outil. */
  skills: { label: string; items: { g: string; h: string }[] }[]
  /** Outils connus, en complément des compétences. */
  stack: { label: string; items: string[] }[]
  projects: { name: string; proves: string; desc: string; stack: string; url: string; link: string }[]
  work: string[]
  links: { label: string; url: string }[]
  cvNote: string
}

export interface Sector {
  slug: string
  /** Libellé court (roue sur mobile). */
  short: string
  name: string
  /** Phrase affichée sous la roue. */
  pitch: string
  page: ProblemsPage | ProfilePage
}
