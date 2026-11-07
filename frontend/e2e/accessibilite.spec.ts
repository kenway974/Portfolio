/* Accessibilité (WCAG 2.1 AA) vérifiée par axe-core, dont le contraste des textes. */
import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { expect, test } from './fixtures'

const PAGES = [
  '/', '/services', '/services/creation-site-vitrine', '/realisations', '/realisations/respusse',
  '/secteurs/cvc', '/profil', '/blog', '/blog/site-perd-clients', '/contact', '/diagnostic', '/cette-page-n-existe-pas',
]

async function audit(page: Page) {
  // Les animations d'apparition sont désactivées : on audite l'état final, lisible.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  return violations.map(v => ({
    regle: v.id,
    impact: v.impact,
    elements: v.nodes.slice(0, 5).map(n => `${n.target.join(' ')} — ${n.failureSummary?.split('\n')[1]?.trim() ?? ''}`),
  }))
}

test.describe('accessibilité', () => {
  test.use({ allowedConsoleErrors: [/status of 404/] })

  for (const path of PAGES) {
    test(`${path} respecte WCAG 2.1 AA`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path)
      expect(await audit(page)).toEqual([])
    })
  }

  test('chaque étape du diagnostic et le résultat respectent WCAG 2.1 AA', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/diagnostic')
    await page.getByText('Garage ou carrosserie').click()
    expect(await audit(page)).toEqual([])
    await page.getByText('Je n\'ai pas encore de site').click()
    await page.getByText('Vendre en ligne').click()
    expect(await audit(page)).toEqual([])
    await page.getByRole('button', { name: /Continuer/ }).click()
    await page.getByText('Dans les 3 prochains mois').click()
    await page.getByText('De 1 500 à 5 000 €').click()
    await expect(page.getByRole('heading', { name: 'Les services adaptés à votre situation' })).toBeVisible()
    expect(await audit(page)).toEqual([])
  })
})
