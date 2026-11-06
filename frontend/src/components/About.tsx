import { t } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './About.css'

export default function About() {
  const ref = useScrollReveal<HTMLElement>()

  const props = [
    { value: t('about.stat1_value'), label: t('about.stat1_label') },
    { value: t('about.stat2_value'), label: t('about.stat2_label') },
    { value: t('about.stat3_value'), label: t('about.stat3_label') },
  ]

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <p className="label reveal">{t('about.label')}</p>
        <div className="about__grid">
          <div className="about__text">
            <h2 className="section-heading reveal reveal-delay-1">
              {t('about.heading')}
            </h2>
            <p className="about__body reveal reveal-delay-2">
              {t('about.body1')}
            </p>
            <p className="about__body reveal reveal-delay-3">
              {t('about.body2')}
            </p>
          </div>

          <div className="about__stats">
            {props.map((prop, i) => (
              <div
                key={prop.label}
                className={`about__stat reveal reveal-delay-${i + 2}`}
              >
                <span className="about__stat-value">{prop.value}</span>
                <span className="about__stat-label">{prop.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
