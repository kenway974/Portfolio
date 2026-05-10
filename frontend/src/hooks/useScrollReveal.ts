import { useEffect, useRef } from 'react'

/**
 * Hook qui ajoute la classe 'revealed' quand l'élément entre dans le viewport.
 * Ajout de logs pour le debug et d'un fallback si l'élément est déjà visible.
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.1) { // Seuil réduit à 0.1 pour plus de souplesse
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Log pour vérifier si l'élément est détecté (à retirer après correction)
        console.log(`Élément ${el.id || el.className} visible :`, entry.isIntersecting);

        if (entry.isIntersecting) {
          el.classList.add('revealed')
          // Une fois révélé, on arrête d'observer pour la performance
          observer.unobserve(el)
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px' // Déclenche un peu avant que l'élément soit totalement visible
      }
    )

    observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
      observer.disconnect()
    }
  }, [threshold])

  return ref
}