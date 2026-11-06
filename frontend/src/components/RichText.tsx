import type { ReactNode } from 'react'

/** Paragraphes simples ; les lignes qui commencent par « - » deviennent une liste à puces. */
export default function RichText({ blocks }: { blocks: string[] }) {
  const out: ReactNode[] = []
  let list: string[] = []

  const flush = () => {
    if (!list.length) return
    out.push(
      <ul key={`ul-${out.length}`} className="rich-list">
        {list.map(item => <li key={item}>{item}</li>)}
      </ul>,
    )
    list = []
  }

  for (const block of blocks) {
    if (block.startsWith('- ')) {
      list.push(block.slice(2))
    } else {
      flush()
      out.push(<p key={`p-${out.length}`} className="rich-p">{block}</p>)
    }
  }
  flush()
  return <>{out}</>
}
