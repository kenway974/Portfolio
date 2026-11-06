import Seo from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import RealisationCard from '../components/RealisationCard'
import CtaBand from '../components/CtaBand'
import realisations from '../data/realisations'
import { realisationsListSchema } from '../seo'

const DESCRIPTION = 'Projets clients, outils internes, projet certifiant et démonstrations : sites vitrines, commande en ligne, réservation, automatisation de la prospection.'

export default function RealisationsList() {
  return (
    <div className="content-page">
      <Seo
        title="Réalisations : sites et applications web | Kenny Pignolet"
        description={DESCRIPTION}
        path="/realisations"
        imageAlt="Réalisations — Kenny Pignolet, développeur web freelance"
        jsonLd={realisationsListSchema(realisations, DESCRIPTION)}
      />
      <div className="container">
        <Breadcrumbs items={[['Accueil', '/'], ['Réalisations', '/realisations']]} />

        <header className="content-header">
          <p className="label">Réalisations</p>
          <h1 className="content-header__title">Réalisations : sites et applications web</h1>
          <p className="content-header__lead">
            Un projet client, l'outil que j'utilise chaque jour, un projet certifiant et des démonstrations
            prêtes à être adaptées. Chaque fiche indique clairement de quoi il s'agit.
          </p>
        </header>

        <section className="category-block" aria-labelledby="projets-reels">
          <h2 id="projets-reels" className="category-block__title">Projets réels : client, outil interne, projet certifiant</h2>
          <div className="card-grid">
            {realisations.filter(r => r.kind !== 'Démo').map(r => <RealisationCard key={r.slug} item={r} />)}
          </div>
        </section>
        <section className="category-block" aria-labelledby="demos">
          <h2 id="demos" className="category-block__title">Démonstrations prêtes à adapter</h2>
          <div className="card-grid">
            {realisations.filter(r => r.kind === 'Démo').map(r => <RealisationCard key={r.slug} item={r} />)}
          </div>
        </section>

        <CtaBand title="Votre projet pourrait être le prochain" />
      </div>
    </div>
  )
}
