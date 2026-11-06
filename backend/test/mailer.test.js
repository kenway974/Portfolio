import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildContactEmail } from '../src/mailer.js'

const payload = {
  name: '<script>alert(1)</script>',
  email: 'marie@example.com',
  serviceType: 'creation-site-vitrine',
  message: 'Bonjour <img src=x onerror=alert(1)>\n& merci',
}

test('les champs saisis sont échappés dans le HTML de l\'e-mail', () => {
  const { html } = buildContactEmail(payload)
  assert.ok(!html.includes('<script>'), 'balise script non échappée')
  assert.ok(!html.includes('<img'), 'balise img non échappée')
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'))
  assert.ok(html.includes('&amp; merci'))
})

test('la version texte garde le message tel quel', () => {
  const { text } = buildContactEmail(payload)
  assert.ok(text.includes(payload.message))
})

test('le sujet indique le nom et le type de projet', () => {
  const { subject } = buildContactEmail({ ...payload, name: 'Marie' })
  assert.equal(subject, '[Portfolio] Nouvelle demande de Marie — creation-site-vitrine')
})
