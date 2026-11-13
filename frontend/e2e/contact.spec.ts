import { expect, mockContactApi, test } from './fixtures'

test('le formulaire n\'est pas envoyé tant que les champs obligatoires sont vides', async ({ page }) => {
  const requests = await mockContactApi(page)
  await page.goto('/contact')
  await page.getByRole('button', { name: 'Envoyer' }).click()
  await expect(page.getByLabel('Votre nom')).toBeFocused()
  expect(requests).toHaveLength(0)
})

test.describe('serveur en erreur', () => {
  // Le navigateur signale lui-même la réponse 500 dans la console : c'est attendu ici.
  test.use({ allowedConsoleErrors: [/status of 500/] })

test('une erreur du serveur est expliquée au visiteur', async ({ page }) => {
  await mockContactApi(page, 500)
  await page.goto('/contact')
  await page.getByLabel('Votre nom').fill('Léa Petit')
  await page.getByLabel('Votre email').fill('lea@example.com')
  await page.getByLabel('Type de projet').selectOption('seo-performance')
  await page.getByLabel('Décrivez votre projet').fill('Mon site n\'apparaît pas sur Google.')
  await page.getByRole('checkbox', { name: /J'accepte/ }).check()
  await page.getByRole('button', { name: 'Envoyer' }).click()
  await expect(page.getByRole('alert')).toContainText('Une erreur est survenue')
})
})
