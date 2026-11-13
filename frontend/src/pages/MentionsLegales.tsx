import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import { infoPageSchema, site } from '../seo'

const DESCRIPTION = 'Mentions légales du site de Kenny Pignolet, développeur web freelance : éditeur, numéro SIRET, coordonnées, hébergeur et propriété intellectuelle.'

export default function MentionsLegales() {
  const { legal, contact } = site
  return (
    <div className="content-page">
      <Seo
        title="Mentions légales | Kenny Pignolet, développeur web"
        description={DESCRIPTION}
        path="/mentions-legales"
        imageAlt="Mentions légales — Kenny Pignolet"
        jsonLd={infoPageSchema('/mentions-legales', 'Mentions légales', DESCRIPTION)}
      />
      <div className="container">
        <Breadcrumbs items={[['Accueil', '/'], ['Mentions légales', '/mentions-legales']]} />
        <header className="content-header">
          <p className="label">Informations légales</p>
          <h1 className="content-header__title">Mentions légales</h1>
          <p className="content-header__lead">Mise à jour : {legal.updated}.</p>
        </header>

        <div className="content-block content-sections">
          <section>
            <h2>Éditeur du site</h2>
            <div className="content-prose">
              <p>
                <strong>{legal.owner}</strong>, {legal.status}.<br />
                Activité : développement de sites web et d'applications, hébergement et maintenance.<br />
                SIRET : {legal.siret}<br />
                Adresse : {legal.address}<br />
                E-mail : <a href={`mailto:${contact.email}`} className="contact__link">{contact.email}</a><br />
                Téléphone : <a href={`tel:${contact.phoneHref}`} className="contact__link">{contact.phone}</a>
              </p>
              <p>Directeur de la publication : {legal.owner}.</p>
            </div>
          </section>

          <section>
            <h2>Hébergement</h2>
            <div className="content-prose">
              <p>
                Le site est hébergé par {legal.host.name}, {legal.host.address} (
                <a href={legal.host.url} target="_blank" rel="noopener noreferrer" className="contact__link">{legal.host.url.replace('https://', '')}</a>).
              </p>
              <p>
                L'interface qui reçoit le formulaire de contact est hébergée par {legal.apiHost.name} (
                <a href={legal.apiHost.url} target="_blank" rel="noopener noreferrer" className="contact__link">{legal.apiHost.url.replace('https://', '')}</a>).
              </p>
            </div>
          </section>

          <section>
            <h2>Propriété intellectuelle</h2>
            <div className="content-prose">
              <p>
                Les textes, le code et la mise en page de ce site sont la propriété de {legal.owner}, sauf mention contraire.
                Toute reproduction sans autorisation est interdite.
              </p>
              <p>
                Les projets présentés dans les réalisations (noms, logos, contenus) appartiennent à leurs propriétaires respectifs
                et sont montrés avec leur accord.
              </p>
            </div>
          </section>

          <section>
            <h2>Liens externes</h2>
            <div className="content-prose">
              <p>
                Ce site renvoie vers des sites tenus par d'autres personnes (réalisations, GitHub, LinkedIn).
                Je ne maîtrise pas leur contenu et ne peux pas en être tenu responsable.
              </p>
            </div>
          </section>

          <section>
            <h2>Données personnelles</h2>
            <div className="content-prose">
              <p>
                Pour savoir quelles données le site collecte, pourquoi, et comment exercer vos droits, consultez la{' '}
                <Link to="/confidentialite" className="contact__link">politique de confidentialité</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
