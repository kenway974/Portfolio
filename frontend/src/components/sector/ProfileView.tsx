/* Profil recruteur : compétences, projets, outils et façon de travailler. */
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs'
import { Hook } from './SectorChrome'
import { useReveal } from './motion'
import type { ProfilePage } from '../../data/secteurs.types'

const profileStagger = (n: Element, i: number) => (n.matches('.pf-proj, .pf-skill') ? (i % 4) * 80 : 0)

export default function ProfileView({ page }: { page: ProfilePage }) {
  const root = useRef<HTMLDivElement>(null)
  useReveal(root, '.sp > section, .pf-skill, .pf-proj', profileStagger)
  return (
    <div className="sp" ref={root}>
      <header>
        <Breadcrumbs items={[['Accueil', '/'], ['Profil', '/profil']]} />
        <p className="sp-who">{page.who}</p>
        <Hook text={page.h1} />
        <p className="pf-intro">{page.intro}</p>
        <p className="pf-avail">{page.availability}</p>
      </header>
      <section>
        <h2 className="sp-h2">Ce que je sais faire</h2>
        <div className="pf-skills">
          {page.skills.map(g => (
            <div className="pf-skill" key={g.label}>
              <h3 className="pf-skill-h">{g.label}</h3>
              <ul className="pk-items">
                {g.items.map(x => <li key={x.g}><span className="pk-gain">{x.g}</span><span className="pk-how">{x.h}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="pf-projects-wrap">
        <h2 className="sp-h2">Projets à regarder en premier</h2>
        <div className="pf-projects">
          {page.projects.map(pr => (
            <article className="pf-proj" key={pr.name}>
              <p className="pf-proves">{pr.proves}</p>
              <h3 className="pack-name">{pr.name}</h3>
              <p className="pf-desc">{pr.desc}</p>
              <p className="pf-tech">{pr.stack}</p>
              <a className="pf-link" href={pr.url} target="_blank" rel="noopener noreferrer">{pr.link}</a>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="sp-h2">Mon parcours</h2>
        <dl className="pf-path">
          {page.path.map(step => (
            <div key={step.title}>
              <dt>{step.period}</dt>
              <dd>{step.title}{step.detail && <small>{step.detail}</small>}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <h2 className="sp-h2">Les outils que j’utilise</h2>
        <p className="sp-sub">Une compétence n’est pas un outil : ceux-là sont ceux que je connais aujourd’hui, pas une limite.</p>
        <dl className="pf-stack">
          {page.stack.map(g => <div key={g.label}><dt>{g.label}</dt><dd>{g.items.map(x => <span key={x}>{x}</span>)}</dd></div>)}
        </dl>
      </section>
      <section>
        <h2 className="sp-h2">Comment je travaille</h2>
        <ul className="facts pf-work">{page.work.map((w, i) => <li key={i} style={{ '--i': i } as React.CSSProperties}>{w}</li>)}</ul>
      </section>
      <section className="sp-cta">
        <div className="pf-links">
          <a className="btn" href={page.cv.url} target="_blank" rel="noopener noreferrer">{page.cv.label}</a>
          {page.links.map(l => <a key={l.url} className="btn btn-ghost" href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>)}
          <Link className="btn btn-ghost" to="/contact">Me contacter</Link>
        </div>
        <p>{page.cvNote}</p>
      </section>
    </div>
  )
}
