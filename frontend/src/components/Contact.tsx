import { useState, FormEvent } from 'react'
import { t } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Contact.css'

type FormState = {
  name: string
  email: string
  serviceType: string
  message: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const BACKEND_URL = import.meta.env.VITE_API_URL ?? ''

export default function Contact() {
  const ref = useScrollReveal<HTMLElement>()

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    serviceType: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setForm({ name: '', email: '', serviceType: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const services = [
    { value: 'vitrine', label: t('contact.services.vitrine') },
    { value: 'ecommerce', label: t('contact.services.ecommerce') },
    { value: 'landing', label: t('contact.services.landing') },
    { value: 'api', label: t('contact.services.api') },
    { value: 'other', label: t('contact.services.other') },
  ]

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <div className="contact__layout">
          <div className="contact__intro">
            <p className="label reveal">{t('contact.label')}</p>
            <h2 className="section-heading reveal reveal-delay-1">{t('contact.heading')}</h2>
            <p className="contact__subheading reveal reveal-delay-2">{t('contact.subheading')}</p>
          </div>

          <form
            className="contact__form reveal reveal-delay-2"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulaire de contact"
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('contact.name')}</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Marie Dupont"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contact.email')}</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="marie@entreprise.fr"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="serviceType">{t('contact.service')}</label>
              <select
                id="serviceType"
                value={form.serviceType}
                onChange={set('serviceType')}
                required
              >
                <option value="" disabled>— Choisir —</option>
                {services.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea
                id="message"
                value={form.message}
                onChange={set('message')}
                placeholder="Votre activité, votre besoin, vos délais…"
                rows={5}
                required
              />
            </div>

            <div className="form-footer">
              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? t('contact.submitting') : t('contact.submit')}
              </button>

              {status === 'success' && (
                <p className="form-message form-message--success" role="alert">
                  ✓ {t('contact.success')}
                </p>
              )}
              {status === 'error' && (
                <p className="form-message form-message--error" role="alert">
                  ✗ {t('contact.error')}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
