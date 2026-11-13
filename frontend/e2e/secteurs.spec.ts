import { expect, mockContactApi, test } from './fixtures'

test('la roue de l\'accueil ouvre la page du secteur choisi', async ({ page }) => {
  await page.goto('/')
  const wheel = page.locator('#secteurs')
  await wheel.scrollIntoViewIfNeeded()
  await wheel.getByRole('button', { name: 'Secteur suivant' }).click()
  await expect(wheel.locator('.w-item.is-active')).toHaveText(/Instituts/)
  await wheel.getByRole('button', { name: 'Entrer' }).click()
  await expect(page).toHaveURL(/\/secteurs\/instituts$/, { timeout: 10_000 })
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Instituts de beauté')
})

test('une page secteur liste des problèmes, leur impact, et mène au contact pré-rempli', async ({ page }) => {
  const requests = await mockContactApi(page)
  await page.goto('/secteurs/cvc')
  const problems = page.locator('.pb')
  await expect(problems).toHaveCount(6)
  await expect(problems.first().getByText('Ce que ça vous coûte')).toBeVisible()
  await expect(page.getByText(/€/)).toHaveCount(0)

  await problems.nth(1).getByRole('link', { name: 'C’est mon cas' }).click()
  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.getByLabel('Type de projet')).toHaveValue('application-web-sur-mesure')
  await expect(page.getByLabel('Décrivez votre projet')).toHaveValue(/Vos appels manqués pendant les chantiers/)

  await page.getByLabel('Votre nom').fill('Paul Durand')
  await page.getByLabel('Votre email').fill('paul@example.com')
  await page.getByRole('checkbox', { name: /J'accepte/ }).check()
  await page.getByRole('button', { name: 'Envoyer' }).click()
  await expect(page.getByRole('alert')).toContainText('Message envoyé')
  expect(requests[0].message).toContain('Secteur : CVC & artisans du bâtiment')
})

test('« Comment on règle ça » mène à la page du service', async ({ page }) => {
  await page.goto('/secteurs/avocats')
  await page.locator('.pb').first().getByRole('link', { name: /Comment on règle ça/ }).click()
  await expect(page).toHaveURL(/\/services\//)
})
