/**
 * Application Express : middlewares et routes, sans démarrage du serveur.
 * Séparée de index.js pour pouvoir être testée.
 */

import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { contactRouter } from './routes/contact.js'

/**
 * @param {{ rateLimitMax?: number }} [options]
 */
export function createApp({ rateLimitMax = 5 } = {}) {
  const app = express()

  app.disable('x-powered-by')

  app.use(cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
  }))

  app.use(express.json({ limit: '16kb' }))

  // 5 envois au plus par adresse IP et par quart d'heure
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'too_many_requests', message: 'Trop de tentatives. Réessayez dans 15 minutes.' },
  })

  app.use('/api/contact', contactLimiter, contactRouter)

  app.get('/health', (_req, res) => res.json({ status: 'ok' }))

  app.use((_req, res) => {
    res.status(404).json({ error: 'not_found' })
  })

  return app
}
