// Icônes d'interface : même trait que ProjectIcon (24×24, épaisseur 1,75), à la taille du texte.
// Remplacent les caractères ← → ‹ › ✓, dont la chasse et l'alignement changent d'une police à l'autre.
// Toujours décoratives : le texte voisin ou l'aria-label du bouton porte le sens.

import type { ReactNode } from 'react'

export type IconName = 'arrow-right' | 'arrow-left' | 'chevron-left' | 'chevron-right' | 'check'

const PATHS: Record<IconName, ReactNode> = {
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-left': <path d="M19 12H5M11 6l-6 6 6 6" />,
  'chevron-left': <path d="M15 6l-6 6 6 6" />,
  'chevron-right': <path d="M9 6l6 6-6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
}

export default function Icon({ name }: { name: IconName }) {
  return (
    <svg
      className="icon"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
