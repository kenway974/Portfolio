import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Services.css'

const icons = [
  <svg key="vitrine" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>,
  <svg key="ecommerce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>,
  <svg key="landing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
  <svg key="api" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
]

export default function Services() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()
  const items = t('services.items', { returnObjects: true }) as Array<{ title: string; desc: string }>

  return (
    <section id="services" className="services" ref={ref}>
      <div className="container">
        <p className="label reveal">{t('services.label')}</p>
        <h2 className="section-heading reveal reveal-delay-1">{t('services.heading')}</h2>
        <div className="services__grid">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`service-card reveal reveal-delay-${Math.min(i + 2, 5)}`}
            >
              <div className="service-card__icon" aria-hidden="true">
                {icons[i]}
              </div>
              <h3 className="service-card__title">{item.title}</h3>
              <p className="service-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
