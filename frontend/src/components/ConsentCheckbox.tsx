import { Link } from 'react-router-dom'

type Props = { id: string; checked: boolean; onChange: (checked: boolean) => void }

/** Case d'accord obligatoire avant l'envoi d'un formulaire (RGPD). */
export default function ConsentCheckbox({ id, checked, onChange }: Props) {
  return (
    <div className="form-consent">
      <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} required />
      <label htmlFor={id}>
        J'accepte que mes données soient utilisées pour répondre à ma demande, comme expliqué dans la{' '}
        <Link to="/confidentialite">politique de confidentialité</Link>.
      </label>
    </div>
  )
}
