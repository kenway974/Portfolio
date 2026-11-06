import { test as base, expect, type Page } from '@playwright/test'

type ContactRequest = { name: string; email: string; serviceType: string; message: string }

/** Intercepte l'API de contact (aucun envoi réel) et garde les demandes reçues. */
export async function mockContactApi(page: Page, status = 200) {
  const requests: ContactRequest[] = []
  await page.route('**/api/contact', async route => {
    requests.push(route.request().postDataJSON() as ContactRequest)
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(status === 200 ? { success: true } : { error: 'server' }) })
  })
  return requests
}

/** Fait échouer le test si la page écrit une erreur dans la console. */
export const test = base.extend<{ consoleErrors: string[]; allowedConsoleErrors: RegExp[] }>({
  allowedConsoleErrors: [[], { option: true }],
  consoleErrors: [async ({ page, allowedConsoleErrors }, use) => {
    const errors: string[] = []
    page.on('console', m => {
      if (m.type() === 'error' && !allowedConsoleErrors.some(r => r.test(m.text()))) errors.push(m.text())
    })
    page.on('pageerror', e => errors.push(e.message))
    await use(errors)
    expect(errors, 'erreurs dans la console').toEqual([])
  }, { auto: true }],
})

export { expect }

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 768

/** Ouvre le menu mobile si besoin, puis clique sur un lien de navigation. */
export async function clickNav(page: Page, label: string) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
    await page.getByRole('navigation', { name: 'Navigation mobile' }).getByRole('link', { name: label }).click()
  } else {
    await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: label }).click()
  }
}
