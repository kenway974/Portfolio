import { clickNav, expect, test } from './fixtures'

test('l\'accueil présente le métier et mène aux pages principales', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Développeur web freelance/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Développeur web freelance')

  await clickNav(page, 'Services')
  await expect(page).toHaveURL(/\/services$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Services de développement web')
  await expect(page.getByRole('link', { name: 'Services', exact: true }).first()).toHaveAttribute('aria-current', 'page')

  await clickNav(page, 'Réalisations')
  await expect(page).toHaveURL(/\/realisations$/)

  await clickNav(page, 'Blog')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Blog')

  await clickNav(page, 'Contact')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Parlons de votre projet')
})

test('une page service mène à ses réalisations, et le fil d\'Ariane ramène à la liste', async ({ page }) => {
  await page.goto('/services/creation-site-vitrine')
  await expect(page.getByText('À partir de')).toBeVisible()
  await page.getByRole('link', { name: /Respusse/ }).first().click()
  await expect(page).toHaveURL(/\/realisations\/respusse$/)
  await page.getByRole('navigation', { name: 'Fil d\'Ariane' }).getByRole('link', { name: 'Réalisations' }).click()
  await expect(page).toHaveURL(/\/realisations$/)
})

test('le lien d\'évitement mène directement au contenu', async ({ page, isMobile }) => {
  test.skip(isMobile, 'navigation au clavier')
  await page.goto('/services')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Aller au contenu' })
  await expect(skip).toBeFocused()
  await skip.press('Enter')
  await expect(page).toHaveURL(/#contenu$/)
})

test.describe('page introuvable', () => {
  // Le navigateur signale lui-même le code 404 de la page : c'est attendu ici.
  test.use({ allowedConsoleErrors: [/status of 404/] })

test('une adresse inconnue affiche la page introuvable', async ({ page }) => {
  await page.goto('/cette-page-n-existe-pas')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cette page est introuvable')
  await page.getByRole('link', { name: 'Retour à l\'accueil', exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
})
})

test('aucune page principale ne déborde horizontalement', async ({ page }) => {
  for (const path of ['/', '/services', '/services/site-e-commerce', '/realisations/prospection-v2', '/secteurs/garages', '/diagnostic', '/contact', '/blog']) {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
})

test('le menu mobile fermé n\'est pas atteignable au clavier', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'menu mobile')
  await page.goto('/')
  const menu = page.getByRole('navigation', { name: 'Navigation mobile' })
  await expect(menu).toHaveAttribute('inert', '')
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
  await expect(menu).not.toHaveAttribute('inert', '')
  await menu.getByRole('link', { name: 'Blog' }).click()
  await expect(page).toHaveURL(/\/blog$/)
  await expect(page.getByRole('navigation', { name: 'Navigation mobile' })).toHaveAttribute('inert', '')
})
