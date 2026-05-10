/**
 * Optional email delivery via nodemailer.
 * Only active when SMTP_HOST environment variable is set.
 *
 * Supported providers: any SMTP (Gmail, Mailgun, Postmark, etc.)
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

/**
 * @param {{ name: string, email: string, serviceType: string, message: string }} payload
 */
export async function sendContactEmail(payload) {
  const { name, email, serviceType, message } = payload
  const transporter = createTransport()

  const to = process.env.CONTACT_EMAIL ?? process.env.SMTP_USER

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to,
    replyTo: email,
    subject: `[Portfolio] New enquiry from ${name} — ${serviceType}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${serviceType}`,
      ``,
      `Message:`,
      message,
    ].join('\n'),
    html: `
      <div style="font-family:sans-serif;max-width:600px;color:#1a1a2e">
        <h2 style="color:#6c5ce7">New portfolio enquiry</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;font-weight:600;width:90px">Name</td><td>${name}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 0;font-weight:600">Service</td><td>${serviceType}</td></tr>
        </table>
        <hr style="margin:1.5rem 0;border-color:#eee"/>
        <h3>Message</h3>
        <p style="white-space:pre-wrap;color:#333">${message}</p>
      </div>
    `,
  })
}
