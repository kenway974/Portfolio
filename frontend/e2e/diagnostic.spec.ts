import { expect, mockContactApi, test } from './fixtures'

test('le diagnostic recommande des services puis envoie la demande avec le résumé', async ({ page }) => {
  const requests = await mockContactApi(page)
  await page.goto('/')
  await page.getByRole('link', { name: 'Identifier mes besoins' }).first().click()
  await expect(page).toHaveURL(/\/diagnostic$/)

  await page.getByText('Garage ou carrosserie').click()
  await expect(page.getByRole('heading', { name: 'Où en êtes-vous aujourd\'hui ?' })).toBeVisible()
  await page.getByText('Je n\'ai pas encore de site').click()
  await expect(page.getByRole('heading', { name: 'Qu\'est-ce que vous voulez obtenir ?' })).toBeVisible()
  await page.getByText('Vendre en ligne').click()
  await page.getByText('Être trouvé sur Google').click()
  await page.getByRole('button', { name: /Continuer/ }).click()
  await page.getByText('Dans les 3 prochains mois').click()
  await page.getByText('De 1 500 à 5 000 €').click()

  await expect(page.getByRole('heading', { name: 'Les services adaptés à votre situation' })).toBeVisible()
  await expect(page.locator('.wizard__cards .content-card__title').first()).toHaveText('Site e-commerce')
  await expect(page.locator('a.wizard__sector')).toHaveAttribute('href', '/secteurs/garages')

  await page.getByLabel('Votre nom').fill('Jean Martin')
  await page.getByLabel('Votre email').fill('jean@example.com')
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click()
  await expect(page.getByRole('status')).toContainText('Demande envoyée')

  expect(requests).toHaveLength(1)
  expect(requests[0].serviceType).toBe('site-e-commerce')
  expect(requests[0].message).toContain('Garage ou carrosserie')
  expect(requests[0].message).toContain('Vendre en ligne')
  expect(requests[0].message).toContain('Services suggérés : Site e-commerce')
  expect(requests[0].name).toBe('Jean Martin')
})

test('on peut revenir en arrière et modifier ses réponses', async ({ page }) => {
  await page.goto('/diagnostic')
  await page.getByText('Avocat ou cabinet').click()
  await page.getByRole('button', { name: '← Retour' }).click()
  await expect(page.getByRole('heading', { name: 'Vous êtes…' })).toBeVisible()
  await expect(page.getByRole('radio', { name: /Avocat ou cabinet/ })).toBeChecked()
})
