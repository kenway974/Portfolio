import { createApp } from '../src/app.js'

/** Démarre l'application sur un port libre et renvoie son URL et une fonction d'arrêt. */
export async function startServer(options) {
  const server = createApp(options).listen(0)
  await new Promise(resolve => server.once('listening', resolve))
  const { port } = server.address()
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise(resolve => server.close(resolve)),
  }
}

export const validPayload = {
  name: 'Marie Dupont',
  email: 'marie@example.com',
  serviceType: 'creation-site-vitrine',
  message: 'Bonjour, je voudrais un site.',
}

export const post = (url, body) =>
  fetch(`${url}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
