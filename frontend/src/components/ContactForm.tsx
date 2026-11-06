import { useState, type FormEvent } from 'react'
import { t } from '../i18n'
import services, { SERVICE_CATEGORIES } from '../data/services'
import './Contact.css'

type FormState = { name: string; email: string; serviceType: string; message: string }
type Status = 'idle' | 'submitting' | 'success' | 'error'

const BACKEND_URL = import.meta.env.VITE_API_URL ?? ''

type Props = {
  /** Préfixe des id, pour pouvoir afficher deux formulaires sur le même site. */
  idPrefix?: string
  initialService?: string
  initialMessage?: string
  submitLabel?: string
  className?: string
}

/** Formulaire de contact : envoie la demande à l'API /api/contact. */
export default function ContactForm({
  idPrefix = 'contact',
  initialService = '',
  initialMessage = '',
  submitLabel = t('contact.submit'),
  className = '',
}: Props) {
  const empty: FormState = { name: '', email: '', serviceType: initialService, message: initialMessage }
  const [form, setForm] = useState<FormState>(empty)
  const [status, setStatus] = useState<Status>('idle')
  const id = (field: string) => `${idPrefix}-${field}`

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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

  return (
    <form className={`contact__form ${className}`} onSubmit={handleSubmit} aria-label="Formulaire de contact">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor={id('name')}>{t('contact.name')}</label>
          <input id={id('name')} type="text" value={form.name} onChange={set('name')}
            placeholder="Marie Dupont" required autoComplete="name" maxLength={100} />
        </div>
        <div className="form-group">
          <label htmlFor={id('email')}>{t('contact.email')}</label>
          <input id={id('email')} type="email" value={form.email} onChange={set('email')}
            placeholder="marie@entreprise.fr" required autoComplete="email" maxLength={200} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor={id('service')}>{t('contact.service')}</label>
        <select id={id('service')} value={form.serviceType} onChange={set('serviceType')} required>
          <option value="" disabled>— Choisir —</option>
          {SERVICE_CATEGORIES.map(category => (
            <optgroup key={category} label={category}>
              {services.filter(s => s.category === category).map(s => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </optgroup>
          ))}
          <optgroup label="Autre">
            <option value="renfort-equipe">Renfort d'équipe</option>
            <option value="other">Autre projet</option>
          </optgroup>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor={id('message')}>{t('contact.message')}</label>
        <textarea id={id('message')} value={form.message} onChange={set('message')}
          placeholder="Votre activité, votre besoin, vos délais…" rows={initialMessage ? 9 : 5} required maxLength={5000} />
      </div>

      <div className="form-footer">
        <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? t('contact.submitting') : submitLabel}
        </button>
        {status === 'success' && (
          <p className="form-message form-message--success" role="alert">✓ {t('contact.success')}</p>
        )}
        {status === 'error' && (
          <p className="form-message form-message--error" role="alert">✗ {t('contact.error')}</p>
        )}
      </div>
    </form>
  )
}
