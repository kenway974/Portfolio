import { Head } from 'vite-react-ssg'
import { site, absoluteUrl, ogImage } from '../seo'

type Props = {
  title: string
  description: string
  path: string
  /** Chemin de l'image de partage sous /og (sans extension). */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  jsonLd?: object
}

/** Toutes les balises SEO d'une page : title, description, canonical, Open Graph, Twitter, JSON-LD. */
export default function Seo({
  title, description, path, image, imageAlt, type = 'website', publishedTime, modifiedTime, jsonLd,
}: Props) {
  const url = absoluteUrl(path)
  const img = ogImage(image)
  const alt = imageAlt ?? title

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={alt} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && <meta property="article:author" content={site.name} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={alt} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Head>
  )
}
