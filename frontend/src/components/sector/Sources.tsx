import type { ReactNode } from 'react'
import { SRC } from '../../data/secteurs'

/** Renvois numérotés vers les sources d'un constat. */
export function Footnotes({ src, order }: { src?: string[]; order: string[] }): ReactNode {
  return (src ?? []).map(k => (
    <a key={k} className="fn" href={`#source-${k}`} title={SRC[k].label}>
      <span className="sr-only">Source </span>{order.indexOf(k) + 1}
    </a>
  ))
}

export function SourceList({ order }: { order: string[] }) {
  if (!order.length) return null
  return (
    <section className="sp-sources-wrap" aria-labelledby="sources-titre">
      <h2 className="sp-sources-h" id="sources-titre">Sources</h2>
      <ol className="sp-sources">
        {order.map(k => (
          <li key={k} id={`source-${k}`}>
            <a href={SRC[k].url} target="_blank" rel="noopener noreferrer">{SRC[k].label}</a>
          </li>
        ))}
      </ol>
    </section>
  )
}
