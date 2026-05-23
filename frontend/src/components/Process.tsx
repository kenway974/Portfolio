import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Process.css'

export default function Process() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()
  const steps = t('process.steps', { returnObjects: true }) as Array<{
    num: string
    title: string
    desc: string
  }>

  return (
    <section id="process" className="process" ref={ref}>
      <div className="container">
        <p className="label reveal">{t('process.label')}</p>
        <h2 className="section-heading reveal reveal-delay-1">{t('process.heading')}</h2>
        <div className="process__steps">
          {steps.map((step, i) => (
            <div key={step.num} className={`process__step reveal reveal-delay-${i + 2}`}>
              <span className="process__num">{step.num}</span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
