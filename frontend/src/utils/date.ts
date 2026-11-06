/** Date au format français, ex. « 10 mai 2025 » ou « 10 sept. 2025 ». */
export function formatDate(iso: string, month: 'long' | 'short' = 'long') {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric', month, year: 'numeric', timeZone: 'UTC',
  })
}
