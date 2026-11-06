import { useRef } from 'react'
import { t } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Link } from 'react-router-dom'
import realisations from '../data/realisations'
import './Projects.css'

export default function Projects() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return
    const amount = 340
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container">
        <div className="projects__header">
          <div>
            <p className="label reveal">{t('projects.label')}</p>
            <h2 className="section-heading reveal reveal-delay-1">{t('projects.heading')}</h2>
          </div>
          <div className="projects__arrows reveal reveal-delay-2">
            <button
              className="arrow-btn"
              onClick={() => scroll('left')}
              aria-label="Projets précédents"
            >←</button>
            <button
              className="arrow-btn"
              onClick={() => scroll('right')}
              aria-label="Projets suivants"
            >→</button>
          </div>
        </div>
      </div>

      {/* Full-bleed scroll track */}
      <div className="projects__track-wrap">
        <div className="projects__track" ref={trackRef} role="list">
          {realisations.map((project, i) => (
            <Link
              key={project.slug}
              to={`/realisations/${project.slug}`}
              className={`project-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
              role="listitem"
            >
              <div className="project-card__logo" aria-hidden="true">
                {project.logo}
              </div>
              <div className="project-card__body">
                <div className="project-card__title-row">
                  <h3 className="project-card__title">{project.name}</h3>
                  <span className="project-card__wip">{project.kind}</span>
                </div>
                <p className="project-card__desc">{project.summary}</p>
                <div className="project-card__tech">
                  {project.tech.slice(0, 4).map(tag => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <span className="project-card__visit">{t('projects.visit')}</span>
              <div className="project-card__glow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>

      <div className="container projects__more">
        <Link to="/realisations" className="btn-ghost">{t('projects.all')}</Link>
      </div>
    </section>
  )
}
