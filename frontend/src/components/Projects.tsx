import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'
import projects from '../data/projects.json'
import './Projects.css'

export default function Projects() {
  const { t } = useTranslation()
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
              aria-label="Scroll left"
            >←</button>
            <button
              className="arrow-btn"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >→</button>
          </div>
        </div>
      </div>

      {/* Full-bleed scroll track */}
      <div className="projects__track-wrap">
        <div className="projects__track" ref={trackRef} role="list">
          {projects.map((project, i) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
              role="listitem"
              aria-label={project.title}
            >
              <div className="project-card__logo" aria-hidden="true">
                {project.logo}
              </div>
              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__tech">
                  {project.tech.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
              <span className="project-card__visit">{t('projects.visit')}</span>
              <div className="project-card__glow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
