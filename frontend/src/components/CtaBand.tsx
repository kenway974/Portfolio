import { Link } from 'react-router-dom'

type Props = { title?: string; text?: string }

/** Bandeau d'appel à l'action en bas des pages de contenu. */
export default function CtaBand({
  title = 'Un projet en tête ?',
  text = 'Décrivez votre besoin en quelques lignes : je vous réponds sous 48 h avec une première analyse et, si besoin, un devis détaillé et gratuit.',
}: Props) {
  return (
    <aside className="cta-band" aria-label="Contact">
      <h2 className="cta-band__title">{title}</h2>
      <p className="cta-band__text">{text}</p>
      <div className="cta-band__actions">
        <Link to="/contact" className="btn-primary">
          Parlons de votre projet <span aria-hidden="true">→</span>
        </Link>
        <Link to="/diagnostic" className="btn-ghost">Identifier mes besoins</Link>
      </div>
    </aside>
  )
}
