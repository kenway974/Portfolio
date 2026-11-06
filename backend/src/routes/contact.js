/**
 * POST /api/contact
 *
 * Validates the contact form payload, logs it, and (optionally)
 * sends an email via nodemailer if SMTP credentials are configured.
 */

import { Router } from 'express'
import { validate } from '../validation.js'
import { sendContactEmail } from '../mailer.js'

export const contactRouter = Router()

// Doit rester aligné avec les slugs de frontend/src/data/services.ts.
// Les anciennes valeurs restent acceptées le temps du déploiement.
const SERVICE_TYPES = [
  'creation-site-vitrine', 'landing-page', 'site-e-commerce', 'site-wordpress',
  'creation-blog', 'refonte-migration-site', 'application-web-sur-mesure',
  'application-mobile', 'api-donnees', 'automatisation-ia', 'seo-performance',
  'securite-conformite', 'maintenance-hebergement', 'conseil-cadrage-mvp',
  'renfort-equipe', 'other',
  'vitrine', 'ecommerce', 'landing', 'api',
]

contactRouter.post('/', async (req, res) => {
  // ── Validate ────────────────────────────────────────────
  const { name, email, serviceType, message } = req.body

  const errors = validate({
    name: { value: name, required: true, maxLength: 120, singleLine: true },
    email: { value: email, required: true, isEmail: true, maxLength: 200, singleLine: true },
    serviceType: { value: serviceType, required: true, oneOf: SERVICE_TYPES },
    message: { value: message, required: true, maxLength: 5000 },
  })

  if (errors.length > 0) {
    return res.status(400).json({ error: 'validation_failed', fields: errors })
  }

  const payload = { name, email, serviceType, message }

  // ── Log (always) ────────────────────────────────────────
  console.info('[contact]', new Date().toISOString(), { name, email, serviceType })

  // ── Email (optional) ────────────────────────────────────
  if (process.env.SMTP_HOST) {
    try {
      await sendContactEmail(payload)
    } catch (err) {
      console.error('[contact] Email failed:', err.message)
      // Don't fail the request — email is optional
    }
  }

  return res.status(200).json({ success: true })
})
