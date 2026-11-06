import site from '../site.config.json'
import { tList } from './i18n'

export { site }

/** URL absolue à partir d'un chemin (`/blog` → `https://…/blog`). */
export const absoluteUrl = (path: string) =>
  `${site.url}${path === '/' ? '/' : path}`

/** Image de partage générée au build (voir scripts/postbuild.mjs). */
export const ogImage = (slug = 'default') => absoluteUrl(`/og/${slug}.png`)

const PERSON_ID = `${site.url}/#person`
const BUSINESS_ID = `${site.url}/#business`
const WEBSITE_ID = `${site.url}/#website`

export const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: site.name,
  url: absoluteUrl('/'),
  jobTitle: site.jobTitle,
  image: ogImage(),
  sameAs: site.sameAs,
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: site.country },
}

/** Données structurées de la page d'accueil : site, personne, activité et services. */
export function homeSchema(description: string) {
  const services = tList<{ title: string; desc: string }>('services.items')
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: absoluteUrl('/'),
        name: `${site.name} — ${site.jobTitle}`,
        inLanguage: site.language,
        publisher: { '@id': PERSON_ID },
      },
      personSchema,
      {
        '@type': 'ProfessionalService',
        '@id': BUSINESS_ID,
        name: `${site.name} — ${site.jobTitle}`,
        url: absoluteUrl('/'),
        description,
        image: ogImage(),
        founder: { '@id': PERSON_ID },
        address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: site.country },
        areaServed: { '@type': 'Country', name: 'France' },
        sameAs: site.sameAs,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: services.map(s => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.desc, provider: { '@id': PERSON_ID } },
          })),
        },
      },
    ],
  }
}

/** Fil d'Ariane (`[['Accueil', '/'], ['Blog', '/blog']]`). */
export function breadcrumbSchema(items: Array<[name: string, path: string]>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  }
}

type Post = { title: string; slug: string; excerpt: string; date: string; category: string; updated?: string }

export function blogListSchema(posts: Post[], description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${site.url}/blog#blog`,
        url: absoluteUrl('/blog'),
        name: `Blog — ${site.name}`,
        description,
        inLanguage: site.language,
        author: { '@id': PERSON_ID },
        blogPost: posts.map(p => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: absoluteUrl(`/blog/${p.slug}`),
          datePublished: p.date,
        })),
      },
      breadcrumbSchema([['Accueil', '/'], ['Blog', '/blog']]),
    ],
  }
}

export function blogPostSchema(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        url,
        headline: post.title,
        description: post.excerpt,
        image: ogImage(`blog/${post.slug}`),
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        articleSection: post.category,
        inLanguage: site.language,
        author: personSchema,
        publisher: { '@id': PERSON_ID },
      },
      breadcrumbSchema([['Accueil', '/'], ['Blog', '/blog'], [post.title, `/blog/${post.slug}`]]),
    ],
  }
}
