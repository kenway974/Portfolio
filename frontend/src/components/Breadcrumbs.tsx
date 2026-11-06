import { Link } from 'react-router-dom'

/** Fil d'Ariane visible. Le dernier élément est la page courante (non cliquable). */
export default function Breadcrumbs({ items }: { items: Array<[label: string, path: string]> }) {
  return (
    <nav aria-label="Fil d'Ariane" className="breadcrumbs">
      <ol>
        {items.map(([label, path], i) => (
          <li key={path}>
            {i < items.length - 1
              ? <Link to={path}>{label}</Link>
              : <span aria-current="page">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
