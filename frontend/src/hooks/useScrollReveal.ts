import { useEffect, useRef } from 'react'

/**
 * Fait apparaître les enfants .reveal d'une section quand elle entre dans le viewport.
 * Le HTML pré-rendu reste visible : la section n'est masquée (.reveal-ready) que si elle
 * est encore hors de l'écran au chargement, ce qui évite tout clignotement à l'hydratation.
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const { top, bottom } = el.getBoundingClientRect()
    if (top < window.innerHeight && bottom > 0) {
      el.classList.add('revealed')
      return
    }

    el.classList.add('reveal-ready')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Déclenche un peu avant que l'élément soit totalement visible
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
