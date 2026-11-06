import { Link } from 'react-router-dom'
import { t } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ContactForm from './ContactForm'
import './Contact.css'

/** Section contact de l'accueil. */
export default function Contact() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <div className="contact__layout">
          <div className="contact__intro">
            <p className="label reveal">{t('contact.label')}</p>
            <h2 className="section-heading reveal reveal-delay-1">{t('contact.heading')}</h2>
            <p className="contact__subheading reveal reveal-delay-2">{t('contact.subheading')}</p>
            <p className="contact__subheading reveal reveal-delay-2">
              Pas encore sûr de ce dont vous avez besoin ?{' '}
              <Link to="/diagnostic" className="contact__link">Faites le diagnostic en 2 minutes</Link>.
            </p>
          </div>
          <ContactForm idPrefix="home" className="reveal reveal-delay-2" />
        </div>
      </div>
    </section>
  )
}
