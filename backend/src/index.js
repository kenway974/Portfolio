/**
 * Portfolio backend — lightweight Express API
 * Handles: contact form submissions (+ optional email delivery)
 */

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { contactRouter } from './routes/contact.js'

const app = express()
const PORT = process.env.PORT ?? 4000

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json({ limit: '16kb' }))

// ── Routes ──────────────────────────────────────────────────
app.use('/api/contact', contactRouter)

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// ── 404 catch-all ───────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'not_found' })
})

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✦ Portfolio API running on http://localhost:${PORT}`)
})
