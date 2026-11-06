import fr from './fr'

type Dict = { [key: string]: unknown }

function lookup(key: string): unknown {
  return key.split('.').reduce<unknown>(
    (node, part) => (node && typeof node === 'object' ? (node as Dict)[part] : undefined),
    fr,
  )
}

/** Renvoie le texte associé à une clé (ex. `t('hero.cta')`). */
export function t(key: string): string {
  const value = lookup(key)
  return typeof value === 'string' ? value : key
}

/** Renvoie une liste de textes structurés (ex. `tList('services.items')`). */
export function tList<T>(key: string): T[] {
  const value = lookup(key)
  return Array.isArray(value) ? (value as T[]) : []
}
