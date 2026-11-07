import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import ServiceCard from '../components/ServiceCard'
import QuickSend from '../components/QuickSend'
import { QUESTIONS, rankServices, sectorFor, answerLabels, diagnosticMessage, type Answers } from '../data/diagnostic'
import { getService } from '../data/services'
import { SECTORS, sectorPath } from '../data/secteurs'
import { diagnosticSchema } from '../seo'

const DESCRIPTION = 'Site, application, automatisation, SEO : répondez à 5 questions et découvrez les services adaptés à votre activité, puis demandez un devis gratuit.'

export default function Diagnostic() {
  const [step, setStepState] = useState(0)
  // Sens du dernier changement d'étape, pour l'animation (avancer : depuis la droite, revenir : depuis la gauche).
  const [direction, setDirection] = useState<'next' | 'back'>('next')
  const goTo = (next: number) => {
    setDirection(next < step ? 'back' : 'next')
    setStepState(next)
  }
  const [answers, setAnswers] = useState<Answers>({})
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)

  const done = step >= QUESTIONS.length
  const question = QUESTIONS[step]
  const selected = question ? answers[question.id] ?? [] : []

  // À chaque étape, le focus va au titre : les lecteurs d'écran annoncent la nouvelle question.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    headingRef.current?.focus()
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [step])

  const toggle = (optionId: string) => {
    if (!question) return
    setAnswers(prev => {
      const current = prev[question.id] ?? []
      const next = question.multiple
        ? current.includes(optionId) ? current.filter(id => id !== optionId) : [...current, optionId]
        : [optionId]
      return { ...prev, [question.id]: next }
    })
  }

  // Une question à choix unique passe à la suivante dès qu'on a répondu.
  const choose = (optionId: string) => {
    toggle(optionId)
    if (!question?.multiple) window.setTimeout(() => goTo(step + 1), 220)
  }

  return (
    <div className="content-page">
      <Seo
        title="Diagnostic gratuit : identifiez vos besoins web et IT | Kenny Pignolet"
        description={DESCRIPTION}
        path="/diagnostic"
        imageAlt="Diagnostic de vos besoins web — Kenny Pignolet"
        jsonLd={diagnosticSchema(DESCRIPTION)}
      />
      <div className="container">
        <Breadcrumbs items={[['Accueil', '/'], ['Diagnostic', '/diagnostic']]} />

        <header className="content-header">
          <p className="label">Diagnostic gratuit · 2 minutes</p>
          <h1 className="content-header__title">De quoi votre activité a-t-elle besoin ?</h1>
          <p className="content-header__lead">
            Cinq questions simples, sans jargon. À la fin, vous savez quels services correspondent à votre
            situation, et vous pouvez m'envoyer votre demande en un clic.
          </p>
        </header>

        <div className="wizard">
          <div className="wizard__progress" aria-hidden="true">
            <div className="wizard__bar" style={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }} />
          </div>
          <p className="wizard__count">
            {done ? 'Votre résultat' : `Question ${step + 1} sur ${QUESTIONS.length}`}
          </p>

          {!done && question && (
            <fieldset className={`wizard__step wizard__panel wizard__panel--${direction}`} key={question.id}>
              <legend className="sr-only">{question.title}</legend>
              <h2 className="wizard__title" ref={headingRef} tabIndex={-1}>{question.title}</h2>
              {question.help && <p className="wizard__help">{question.help}</p>}

              <div className={`wizard__options${question.multiple ? ' wizard__options--multi' : ''}`}>
                {question.options.map(option => {
                  const checked = selected.includes(option.id)
                  return (
                    <label key={option.id} className={`wizard__option${checked ? ' is-checked' : ''}`}>
                      <input
                        type={question.multiple ? 'checkbox' : 'radio'}
                        name={question.id}
                        value={option.id}
                        checked={checked}
                        onChange={() => (question.multiple ? toggle(option.id) : choose(option.id))}
                      />
                      <span className="wizard__mark" aria-hidden="true" />
                      <span className="wizard__text">
                        <span className="wizard__label">{option.label}</span>
                        {option.hint && <span className="wizard__hint">{option.hint}</span>}
                      </span>
                    </label>
                  )
                })}
              </div>

              <div className="wizard__nav">
                {step > 0 && (
                  <button type="button" className="btn-ghost" onClick={() => goTo(step - 1)}>← Retour</button>
                )}
                {(question.multiple || selected.length > 0) && (
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={selected.length === 0}
                    onClick={() => goTo(step + 1)}
                  >
                    {step === QUESTIONS.length - 1 ? 'Voir mon résultat' : 'Continuer'} <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            </fieldset>
          )}

          {done && <Result answers={answers} headingRef={headingRef} onRestart={() => goTo(0)} />}
        </div>
      </div>
    </div>
  )
}

function Result({ answers, headingRef, onRestart }: {
  answers: Answers
  headingRef: React.Ref<HTMLHeadingElement>
  onRestart: () => void
}) {
  const recommended = rankServices(answers).slice(0, 3).map(getService).filter(s => s !== undefined)
  const sectorSlug = sectorFor(answers)
  const sector = SECTORS.find(s => s.slug === sectorSlug)
  const recap = answerLabels(answers)
  const wantsRenfort = answers.objectifs?.includes('renfort')

  const serviceType = wantsRenfort ? 'renfort-equipe' : recommended[0]?.slug ?? 'other'
  const buildMessage = (note: string) => diagnosticMessage(answers, recommended.map(s => s.name), note)

  return (
    <div className="wizard__result wizard__panel wizard__panel--next">
      <h2 className="wizard__title" ref={headingRef} tabIndex={-1}>Les services adaptés à votre situation</h2>

      <QuickSend serviceType={serviceType} buildMessage={buildMessage} />

      <p className="wizard__help">
        D'après vos réponses, voici par où je vous conseille de commencer. Chaque page détaille ce qui est inclus,
        les questions fréquentes et des exemples.
      </p>

      <div className="card-grid wizard__cards">
        {recommended.map(s => <ServiceCard key={s.slug} service={s} />)}
      </div>

      {sector && (
        <Link to={sectorPath(sector.slug)} className="wizard__sector">
          <span className="content-card__kicker">Votre métier</span>
          <span className="wizard__sector-title">{sector.name}</span>
          <span className="wizard__sector-text">
            {sector.pitch} Découvrez les problèmes les plus fréquents dans votre secteur, et ce qu’ils vous coûtent.
          </span>
          <span className="content-card__more">Voir votre secteur →</span>
        </Link>
      )}

      <div className="wizard__recap">
        <h3 className="wizard__subtitle">Vos réponses</h3>
        <dl>
          {recap.map(r => (
            <div key={r.question}>
              <dt>{r.question}</dt>
              <dd>{r.labels.join(', ')}</dd>
            </div>
          ))}
        </dl>
        <button type="button" className="wizard__restart" onClick={onRestart}>Modifier mes réponses</button>
      </div>

    </div>
  )
}
