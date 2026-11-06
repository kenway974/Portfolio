import site from '../site.config.json'
import services from './data/services'

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
            itemOffered: {
              '@type': 'Service',
              name: s.h1,
              description: s.summary,
              url: absoluteUrl(`/services/${s.slug}`),
              provider: { '@id': PERSON_ID },
            },
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

// ─────────────────────────── Services & réalisations ───────────────────────────

type ServiceLike = { slug: string; name: string; description: string; h1: string; faq: { q: string; a: string }[]; price?: { from: string; detail: string } }
type RealisationLike = { slug: string; name: string; description: string; h1: string; tech: string[]; url?: string; kind: string; sector: string }

export function servicesListSchema(services: Array<{ slug: string; name: string }>, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        url: absoluteUrl('/services'),
        name: `Services — ${site.name}`,
        description,
        inLanguage: site.language,
        about: { '@id': BUSINESS_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.name,
            url: absoluteUrl(`/services/${s.slug}`),
          })),
        },
      },
      breadcrumbSchema([['Accueil', '/'], ['Services', '/services']]),
    ],
  }
}

export function serviceSchema(service: ServiceLike) {
  const path = `/services/${service.slug}`
  const graph: object[] = [
    {
      '@type': 'Service',
      '@id': `${absoluteUrl(path)}#service`,
      name: service.h1,
      serviceType: service.name,
      description: service.description,
      url: absoluteUrl(path),
      provider: { '@id': PERSON_ID },
      areaServed: { '@type': 'Country', name: 'France' },
      availableChannel: { '@type': 'ServiceChannel', serviceUrl: absoluteUrl('/contact') },
      ...(service.price ? {
        offers: {
          '@type': 'Offer',
          description: service.price.detail,
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'EUR',
            minPrice: parsePrice(service.price.from),
            description: `À partir de ${service.price.from}`,
          },
        },
      } : {}),
    },
    breadcrumbSchema([['Accueil', '/'], ['Services', '/services'], [service.name, path]]),
  ]
  if (service.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: service.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function realisationsListSchema(items: Array<{ slug: string; name: string }>, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        url: absoluteUrl('/realisations'),
        name: `Réalisations — ${site.name}`,
        description,
        inLanguage: site.language,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: items.map((r, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: r.name,
            url: absoluteUrl(`/realisations/${r.slug}`),
          })),
        },
      },
      breadcrumbSchema([['Accueil', '/'], ['Réalisations', '/realisations']]),
    ],
  }
}

export function realisationSchema(r: RealisationLike) {
  const path = `/realisations/${r.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${absoluteUrl(path)}#work`,
        name: r.name,
        headline: r.h1,
        description: r.description,
        url: absoluteUrl(path),
        image: ogImage(`realisations/${r.slug}`),
        genre: r.kind,
        about: r.sector,
        keywords: r.tech.join(', '),
        inLanguage: site.language,
        creator: { '@id': PERSON_ID },
        ...(r.url ? { sameAs: r.url } : {}),
      },
      breadcrumbSchema([['Accueil', '/'], ['Réalisations', '/realisations'], [r.name, path]]),
    ],
  }
}

// ──────────────────────────────── Pages secteur ────────────────────────────────

type SectorLike = {
  slug: string
  name: string
  pitch: string
  page:
    | { kind?: undefined; who: string; packs: { num: string; name: string; price: string; delay: string; items: { g: string; h: string }[] }[] }
    | { kind: 'profile'; who: string; intro: string }
}

const sectorUrl = (slug: string) => absoluteUrl(slug === 'recruteur' ? '/profil' : `/secteurs/${slug}`)

/** « 1 200 € » → 1200 ; renvoie undefined pour un prix non numérique. */
const parsePrice = (price: string) => {
  const n = Number(price.replace(/[^\d,]/g, '').replace(',', '.'))
  return Number.isFinite(n) && n > 0 ? n : undefined
}

export function sectorSchema(sector: SectorLike) {
  const url = sectorUrl(sector.slug)
  if (sector.page.kind === 'profile') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'ProfilePage', url, name: `Profil — ${site.name}`, description: sector.page.intro, mainEntity: personSchema },
        breadcrumbSchema([['Accueil', '/'], ['Profil', '/profil']]),
      ],
    }
  }
  const page = sector.page
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Site web et visibilité en ligne : ${sector.name}`,
        description: sector.pitch,
        audience: { '@type': 'BusinessAudience', name: page.who },
        url,
        provider: { '@id': PERSON_ID },
        areaServed: { '@type': 'Country', name: 'France' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Offres ${sector.name}`,
          itemListElement: page.packs.map(p => {
            const price = parsePrice(p.price)
            return {
              '@type': 'Offer',
              name: `${p.num} : ${p.name}`,
              description: p.items.map(i => i.h).join(' · '),
              ...(price ? { price, priceCurrency: 'EUR' } : {}),
              priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'EUR', ...(price ? { price } : {}), description: p.price },
              seller: { '@id': PERSON_ID },
            }
          }),
        },
      },
      breadcrumbSchema([['Accueil', '/'], [sector.name, `/secteurs/${sector.slug}`]]),
    ],
  }
}

export function contactPageSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'ContactPage', url: absoluteUrl('/contact'), name: `Contact — ${site.name}`, description, inLanguage: site.language, about: { '@id': BUSINESS_ID } },
      breadcrumbSchema([['Accueil', '/'], ['Contact', '/contact']]),
    ],
  }
}

export function diagnosticSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', url: absoluteUrl('/diagnostic'), name: `Diagnostic de vos besoins — ${site.name}`, description, inLanguage: site.language, about: { '@id': BUSINESS_ID } },
      breadcrumbSchema([['Accueil', '/'], ['Diagnostic', '/diagnostic']]),
    ],
  }
}
