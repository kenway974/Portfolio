// Pictogrammes des réalisations : SVG au trait (24×24, épaisseur 1,75), dimensionnés par le font-size du parent.
// Remplacent les emojis, dont le rendu change selon le système et qu'on ne peut pas teinter.

import type { ReactNode } from 'react'

export type ProjectIconName = 'heart' | 'contacts' | 'cutlery' | 'flame' | 'flower' | 'star'

const PATHS: Record<ProjectIconName, ReactNode> = {
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
  contacts: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.6-1.4 1.7-2 3-2s2.4.6 3 2M14 10h4M14 14h4" />
    </>
  ),
  cutlery: <path d="M7 3v7a2 2 0 0 0 4 0V3M9 12v9M17 21V3c-2 1.5-3 4-3 7 0 1.5 1 2.5 3 2.5" />,
  flame: <path d="M12 21c-3.9 0-6-2.6-6-5.5 0-3 2-4.5 3-7 1 1.5 1.5 2.5 1.5 4 1-1 1.5-3 1.5-5.5 3 2 6 5.5 6 8.5 0 2.9-2.1 5.5-6 5.5z" />,
  flower: (
    <>
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="7" r="3" />
      <circle cx="17" cy="12" r="3" />
      <circle cx="12" cy="17" r="3" />
      <circle cx="7" cy="12" r="3" />
    </>
  ),
  star: <path d="M12 3l2.8 5.9 6.2.7-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.2-.7z" />,
}

export default function ProjectIcon({ name }: { name: ProjectIconName }) {
  return (
    <svg
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
