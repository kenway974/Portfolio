/**
 * Envoi facultatif de l'e-mail de contact via nodemailer.
 * Actif seulement si la variable d'environnement SMTP_HOST est définie.
 */

import nodemailer from 'nodemailer'

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

/** Neutralise un texte saisi par le visiteur avant de l'insérer dans du HTML. */
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => HTML_ESCAPES[c])

/**
 * Construit le sujet et le corps de l'e-mail (texte et HTML échappé).
 * @param {{ name: string, email: string, serviceType: string, message: string }} payload
 */
export function buildContactEmail({ name, email, serviceType, message }) {
  const [n, e, s, m] = [name, email, serviceType, message].map(escapeHtml)
  return {
    subject: `[Portfolio] Nouvelle demande de ${name} — ${serviceType}`,
    text: [`Nom : ${name}`, `E-mail : ${email}`, `Type de projet : ${serviceType}`, '', 'Message :', message].join('\n'),
    html: `
      <div style="font-family:sans-serif;max-width:600px;color:#1a1a2e">
        <h2 style="color:#b8730f">Nouvelle demande depuis le portfolio</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;font-weight:600;width:130px">Nom</td><td>${n}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600">E-mail</td><td><a href="mailto:${e}">${e}</a></td></tr>
          <tr><td style="padding:6px 0;font-weight:600">Type de projet</td><td>${s}</td></tr>
        </table>
        <hr style="margin:1.5rem 0;border-color:#eee"/>
        <h3>Message</h3>
        <p style="white-space:pre-wrap;color:#333">${m}</p>
      </div>
    `,
  }
}

/**
 * @param {{ name: string, email: string, serviceType: string, message: string }} payload
 */
export async function sendContactEmail(payload) {
  const to = process.env.CONTACT_EMAIL ?? process.env.SMTP_USER
  await createTransport().sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to,
    replyTo: payload.email,
    ...buildContactEmail(payload),
  })
}
