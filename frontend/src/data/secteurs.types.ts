export interface Source { label: string; url: string }

/** Étape d'une chronologie : quand, ce que le dirigeant voit, comment. */
export interface Step { when: string; icon: string; title: string; text: string; src?: string[] }

export interface Fact { text: string; src?: string[] }

export interface Situation {
  label: string
  facts: Fact[]
  /** Débuts de chronologie propres à cette situation, un tableau par pack. */
  starts?: Step[][]
}

export interface Pack {
  num: string
  name: string
  price: string
  delay: string
  ads?: string
  /** Le pack contient le précédent. */
  base?: boolean
  items: { g: string; h: string }[]
  pre?: Step[]
  lead?: Step[]
  steps: Step[]
}

export interface OfferPage {
  kind?: undefined
  who: string
  hook: string
  situations: Situation[]
  packs: Pack[]
  cumulative?: boolean
  /** Phrase sous le titre des offres. */
  sub?: string
  note?: string
  noteSrc?: string
}

export interface ProfilePage {
  kind: 'profile'
  who: string
  hook: string
  intro: string
  stack: { label: string; items: string[] }[]
  projects: { name: string; proves: string; desc: string; stack: string; url: string; link: string }[]
  work: string[]
  links: { label: string; url: string }[]
  cvNote: string
}

export interface Sector {
  slug: string
  short: string
  name: string
  pitch: string
  page: OfferPage | ProfilePage
}
