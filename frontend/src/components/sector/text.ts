/* Textes calculés des pages secteur : numérotation des sources, message de contact pré-rempli. */

/** Ordre d'apparition des sources dans la page, pour numéroter les renvois. */
export function sourceOrder(items: Array<{ src?: string[] }>) {
  const order: string[] = []
  items.forEach(x => (x.src ?? []).forEach(k => { if (!order.includes(k)) order.push(k) }))
  return order
}

/** Message pré-rempli de la page contact quand le visiteur se reconnaît dans un problème. */
export const contactMessage = (sectorName: string, problem?: string) => [
  'Bonjour,',
  '',
  `Secteur : ${sectorName}`,
  ...(problem ? [`Je me reconnais dans ce problème : « ${problem} ».`] : []),
  '',
  'Ma situation en quelques mots : ',
].join('\n')
