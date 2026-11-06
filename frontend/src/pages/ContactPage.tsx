import { Link, useLocation } from 'react-router-dom'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import ContactForm from '../components/ContactForm'
import { contactPageSchema, site } from '../seo'
import services from '../data/services'

type PrefillState = { service?: string; message?: string } | null

const KNOWN_SERVICES = new Set([...services.map(s => s.slug), 'renfort-equipe', 'other'])

const DESCRIPTION = 'Contactez Kenny Pignolet, développeur web freelance : décrivez votre projet de site, d\'application ou d\'automatisation, réponse sous 48 h et devis gratuit.'

const NEXT_STEPS = [
  { title: 'Réponse sous 48 h', desc: 'Je lis votre message et je reviens vers vous avec mes premières questions ou une première analyse.' },
  { title: 'Un échange de 30 minutes', desc: 'Par téléphone ou en visio, pour comprendre votre activité, vos objectifs et vos contraintes. Sans engagement.' },
  { title: 'Un devis détaillé et gratuit', desc: 'Ce qui est inclus, le prix, les délais, ligne par ligne. Vous décidez ensuite, sans pression.' },
]

export default function ContactPage() {
  // Arrivée depuis une page secteur : le message et le type de projet sont pré-remplis.
  const prefill = useLocation().state as PrefillState
  const service = prefill?.service && KNOWN_SERVICES.has(prefill.service) ? prefill.service : ''
  const message = typeof prefill?.message === 'string' ? prefill.message.slice(0, 2000) : ''

  return (
    <div className="content-page">
      <Seo
        title="Contact : parlons de votre projet | Kenny Pignolet"
        description={DESCRIPTION}
        path="/contact"
        imageAlt="Contact — Kenny Pignolet, développeur web freelance"
        jsonLd={contactPageSchema(DESCRIPTION)}
      />
      <div className="container">
        <Breadcrumbs items={[['Accueil', '/'], ['Contact', '/contact']]} />

        <div className="contact-page">
          <div className="contact-page__intro">
            <header className="content-header">
              <p className="label">Contact</p>
              <h1 className="content-header__title">Parlons de votre projet</h1>
              <p className="content-header__lead">
                Site, application, automatisation ou simple question : décrivez votre besoin en quelques lignes.
                Pas besoin de jargon technique, ni d'un cahier des charges complet.
              </p>
            </header>

            <ol className="next-steps">
              {NEXT_STEPS.map((step, i) => (
                <li key={step.title} className="next-step">
                  <span className="next-step__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="next-step__title">{step.title}</h2>
                    <p className="next-step__desc">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="contact-page__aside">
              <p>
                Vous ne savez pas exactement ce dont vous avez besoin ?{' '}
                <Link to="/diagnostic" className="contact__link">Faites le diagnostic</Link> : quelques questions,
                et vous obtenez les services adaptés à votre situation.
              </p>
              <p>
                Vous pouvez aussi me retrouver sur{' '}
                {site.sameAs.map((url, i) => (
                  <span key={url}>
                    {i > 0 && ' et '}
                    <a href={url} target="_blank" rel="noopener noreferrer" className="contact__link">
                      {url.includes('linkedin') ? 'LinkedIn' : 'GitHub'}
                    </a>
                  </span>
                ))}.
              </p>
            </div>
          </div>

          <ContactForm idPrefix="page" initialService={service} initialMessage={message} />
        </div>
      </div>
    </div>
  )
}
