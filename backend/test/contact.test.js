import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { startServer, validPayload, post } from './helpers.js'

let server

before(async () => {
  delete process.env.SMTP_HOST // aucun envoi d'e-mail pendant les tests
  server = await startServer({ rateLimitMax: 1000 })
})
after(() => server.close())

test('GET /health répond ok', async () => {
  const res = await fetch(`${server.url}/health`)
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { status: 'ok' })
})

test('une demande valide est acceptée', async () => {
  const res = await post(server.url, validPayload)
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { success: true })
})

test('les types de projet du diagnostic et du formulaire sont acceptés', async () => {
  for (const serviceType of ['automatisation-ia', 'renfort-equipe', 'other']) {
    const res = await post(server.url, { ...validPayload, serviceType })
    assert.equal(res.status, 200, serviceType)
  }
})

test('un champ obligatoire manquant est refusé avec le nom du champ', async () => {
  const res = await post(server.url, { ...validPayload, name: '  ' })
  assert.equal(res.status, 400)
  const body = await res.json()
  assert.equal(body.error, 'validation_failed')
  assert.deepEqual(body.fields.map(f => f.field), ['name'])
})

test('un e-mail invalide est refusé', async () => {
  const res = await post(server.url, { ...validPayload, email: 'pas-un-email' })
  assert.equal(res.status, 400)
  assert.equal((await res.json()).fields[0].code, 'invalid_email')
})

test('un type de projet inconnu est refusé', async () => {
  const res = await post(server.url, { ...validPayload, serviceType: 'inconnu' })
  assert.equal(res.status, 400)
  assert.equal((await res.json()).fields[0].code, 'invalid_value')
})

test('un message trop long est refusé', async () => {
  const res = await post(server.url, { ...validPayload, message: 'a'.repeat(5001) })
  assert.equal(res.status, 400)
  assert.equal((await res.json()).fields[0].code, 'too_long')
})

test('un nom sur plusieurs lignes est refusé (injection dans les en-têtes de l\'e-mail)', async () => {
  const res = await post(server.url, { ...validPayload, name: 'Marie\r\nBcc: spam@example.com' })
  assert.equal(res.status, 400)
  assert.equal((await res.json()).fields[0].field, 'name')
})

test('une route inconnue renvoie 404', async () => {
  const res = await fetch(`${server.url}/inconnue`)
  assert.equal(res.status, 404)
})

test('l\'en-tête X-Powered-By n\'est pas exposé', async () => {
  const res = await fetch(`${server.url}/health`)
  assert.equal(res.headers.get('x-powered-by'), null)
})

test('au-delà de la limite d\'envois, les demandes sont bloquées', async () => {
  const limited = await startServer({ rateLimitMax: 2 })
  try {
    await post(limited.url, validPayload)
    await post(limited.url, validPayload)
    const res = await post(limited.url, validPayload)
    assert.equal(res.status, 429)
  } finally {
    await limited.close()
  }
})
