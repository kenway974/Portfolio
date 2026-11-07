/** Envoi d'une demande de contact à l'API (backend Express, route /api/contact). */
export type ContactRequest = { name: string; email: string; serviceType: string; message: string }

const BACKEND_URL = import.meta.env.VITE_API_URL ?? ''

/** Envoie la demande ; lève une erreur si le serveur ne l'accepte pas. */
export async function sendContact(request: ContactRequest): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  if (!res.ok) throw new Error(`Envoi refusé (${res.status})`)
}
