import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import { infoPageSchema, site } from '../seo'

const DESCRIPTION = 'Politique de confidentialité : données collectées par le formulaire de contact, finalité, durée de conservation, hébergeurs et exercice de vos droits (RGPD).'

export default function Confidentialite() {
  const { legal, contact } = site
  const mail = <a href={`mailto:${contact.email}`} className="contact__link">{contact.email}</a>
  return (
    <div className="content-page">
      <Seo
        title="Politique de confidentialité | Kenny Pignolet"
        description={DESCRIPTION}
        path="/confidentialite"
        imageAlt="Politique de confidentialité — Kenny Pignolet"
        jsonLd={infoPageSchema('/confidentialite', 'Politique de confidentialité', DESCRIPTION)}
      />
      <div className="container">
        <Breadcrumbs items={[['Accueil', '/'], ['Confidentialité', '/confidentialite']]} />
        <header className="content-header">
          <p className="label">Vos données</p>
          <h1 className="content-header__title">Politique de confidentialité</h1>
          <p className="content-header__lead">
            Ce site collecte le strict minimum : ce que vous écrivez dans un formulaire, pour vous répondre. Mise à jour : {legal.updated}.
          </p>
        </header>

        <div className="content-block content-sections">
          <section>
            <h2>Qui est responsable de vos données</h2>
            <div className="content-prose">
              <p>
                {legal.owner}, {legal.status}, dont les coordonnées figurent dans les{' '}
                <Link to="/mentions-legales" className="contact__link">mentions légales</Link>.
                Pour toute question sur vos données : {mail}.
              </p>
            </div>
          </section>

          <section>
            <h2>Les données collectées</h2>
            <div className="content-prose">
              <p>
                Quand vous envoyez une demande (page contact, accueil ou résultat du diagnostic), je reçois votre nom, votre
                adresse e-mail, le type de projet et votre message. Pour le diagnostic, le message contient le récapitulatif de
                vos réponses.
              </p>
              <p>Aucune autre donnée n'est demandée.</p>
            </div>
          </section>

          <section>
            <h2>Pourquoi, et sur quelle base</h2>
            <div className="content-prose">
              <p>
                Uniquement pour répondre à votre demande et, si vous le souhaitez, vous proposer un devis. Vos données ne sont
                ni revendues, ni utilisées pour de la publicité, ni ajoutées à une liste de diffusion. La case à cocher du
                formulaire recueille votre accord.
              </p>
            </div>
          </section>

          <section>
            <h2>Combien de temps</h2>
            <div className="content-prose">
              <p>
                Trois ans au plus après notre dernier échange, puis suppression. Vous pouvez demander l'effacement plus tôt à
                tout moment. Le serveur qui reçoit le formulaire ne garde ni votre nom ni votre e-mail dans ses journaux.
              </p>
            </div>
          </section>

          <section>
            <h2>Qui y a accès</h2>
            <div className="content-prose">
              <p>
                Moi seul. Pour que le site fonctionne, deux prestataires techniques interviennent : {legal.host.name}, qui
                héberge le site, et {legal.apiHost.name}, qui héberge l'interface recevant le formulaire. Mon service de
                messagerie transmet la demande jusqu'à ma boîte. Ces prestataires sont situés aux États-Unis : le transfert de
                données est encadré par les garanties prévues par le RGPD (clauses contractuelles types de la Commission
                européenne ou cadre de protection des données UE–États-Unis, selon le prestataire). Ils peuvent conserver des
                journaux techniques (adresse IP) pour des raisons de sécurité.
              </p>
            </div>
          </section>

          <section>
            <h2>Cookies et traceurs</h2>
            <div className="content-prose">
              <p>
                Ce site ne dépose aucun cookie, n'utilise aucun outil de mesure d'audience ni aucun service publicitaire. Les
                polices de caractères sont servies depuis le site lui-même, sans appel à un service tiers. Aucun bandeau de
                consentement n'est donc nécessaire.
              </p>
            </div>
          </section>

          <section>
            <h2>Vos droits</h2>
            <div className="content-prose">
              <p>
                Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation ou l'opposition à
                leur traitement, et leur portabilité. Vous pouvez aussi retirer votre accord à tout moment. Écrivez-moi à {mail} :
                je réponds dans un délai d'un mois.
              </p>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la CNIL :{' '}
                <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="contact__link">cnil.fr/fr/plaintes</a>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
