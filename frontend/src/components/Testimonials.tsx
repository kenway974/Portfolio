import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Testimonials.css'

export default function Testimonials() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()

  // Type assertion for nested translation array
  const items = t('testimonials.items', { returnObjects: true }) as Array<{
    quote: string
    author: string
    role: string
  }>

  return (
    <section id="testimonials" className="testimonials" ref={ref}>
      <div className="container">
        <p className="label reveal">{t('testimonials.label')}</p>
        <h2 className="section-heading reveal reveal-delay-1">{t('testimonials.heading')}</h2>

        <div className="testimonials__grid">
          {items.map((item, i) => (
            <figure
              key={i}
              className={`testimonial-card reveal reveal-delay-${i + 2}`}
            >
              {/* Decorative quote mark */}
              <span className="testimonial-card__quote-mark" aria-hidden="true">"</span>
              <blockquote className="testimonial-card__text">
                {item.quote}
              </blockquote>
              <figcaption className="testimonial-card__author">
                <span className="testimonial-card__name">{item.author}</span>
                <span className="testimonial-card__role">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
