import { useState } from 'react'
import { Link } from 'react-router-dom'
import { t } from '../i18n'
import Seo from '../components/Seo'
import { blogListSchema } from '../seo'
import { formatDate } from '../utils/date'
import posts from '../data/blog.json'
import './BlogList.css'

const DESCRIPTION = 'Conseils concrets pour les TPE et PME : sites web, performance, référencement et automatisation. Par un développeur web freelance, sans jargon.'
const ALL = 'Tous'

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL)

  const categories = [ALL, ...Array.from(new Set(posts.map(p => p.category)))]
  const filtered = activeCategory === ALL
    ? posts
    : posts.filter(p => p.category === activeCategory)

  return (
    <div className="blog-list-page">
      <Seo
        title="Blog : conseils web pour TPE et PME | Kenny Pignolet"
        description={DESCRIPTION}
        path="/blog"
        imageAlt="Blog — Kenny Pignolet, développeur web freelance"
        jsonLd={blogListSchema(posts, DESCRIPTION)}
      />
      <div className="container">
        {/* Header */}
        <div className="blog-list-page__header">
          <p className="label">{t('blog.label')}</p>
          <h1 className="section-heading">{t('blog.heading')}</h1>
        </div>

        {/* Category filter */}
        <div className="category-filter" role="tablist" aria-label="Filtrer par catégorie">
          {categories.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`category-btn${activeCategory === cat ? ' category-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="blog-list-page__grid">
          {filtered.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="blog-list-card"
            >
              <div className="blog-list-card__meta">
                <span className="blog-card__category">{post.category}</span>
                <span className="blog-card__date">
                  <time dateTime={post.date}>{formatDate(post.date, 'short')}</time>
                </span>
              </div>
              <h2 className="blog-list-card__title">{post.title}</h2>
              <p className="blog-list-card__excerpt">{post.excerpt}</p>
              <span className="blog-list-card__read">{t('blog.read')}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
