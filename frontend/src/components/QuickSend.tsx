import { useState, type FormEvent } from 'react'
import { t } from '../i18n'
import { sendContact } from '../utils/contact'
import './Contact.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type Props = {
  /** Type de projet envoyé avec la demande (slug de service, « renfort-equipe » ou « other »). */
  serviceType: string
  /** Construit le message à partir du mot facultatif ajouté par le visiteur. */
  buildMessage: (note: string) => string
}

/**
 * Envoi de la demande en un clic, en haut du résultat du diagnostic :
 * le récapitulatif part tout seul, il suffit d'indiquer son nom et son e-mail.
 */
export default function QuickSend({ serviceType, buildMessage }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      await sendContact({ name, email, serviceType, message: buildMessage(note) })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="quick-send quick-send--done" role="status">
        <p className="quick-send__title">✓ Demande envoyée</p>
        <p className="quick-send__text">
          Merci {name.split(' ')[0]} ! J’ai bien reçu votre diagnostic. Je vous réponds sous 48 h à <strong>{email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <form className="quick-send" onSubmit={submit} aria-labelledby="quick-send-titre">
      <h3 className="quick-send__title" id="quick-send-titre">Recevez ma réponse sous 48 h</h3>
      <p className="quick-send__text">
        Votre diagnostic est déjà rédigé : indiquez simplement votre nom et votre e-mail, et je vous recontacte
        avec une première analyse et, si besoin, un devis gratuit.
      </p>

      <div className="quick-send__fields">
        <div className="form-group">
          <label htmlFor="quick-name">{t('contact.name')}</label>
          <input id="quick-name" type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Marie Dupont" required autoComplete="name" maxLength={100} />
        </div>
        <div className="form-group">
          <label htmlFor="quick-email">{t('contact.email')}</label>
          <input id="quick-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="marie@entreprise.fr" required autoComplete="email" maxLength={200} />
        </div>
        <button type="submit" className="btn-primary quick-send__submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? t('contact.submitting') : 'Envoyer ma demande'}
        </button>
      </div>

      <details className="quick-send__note">
        <summary>Ajouter un mot sur votre projet (facultatif)</summary>
        <div className="form-group">
          <label htmlFor="quick-note" className="sr-only">Votre projet en quelques mots</label>
          <textarea id="quick-note" value={note} onChange={e => setNote(e.target.value)} rows={3} maxLength={2000}
            placeholder="Votre activité, vos délais, ce qui vous bloque aujourd’hui…" />
        </div>
      </details>

      {status === 'error' && (
        <p className="form-message form-message--error" role="alert">✗ {t('contact.error')}</p>
      )}
    </form>
  )
}
