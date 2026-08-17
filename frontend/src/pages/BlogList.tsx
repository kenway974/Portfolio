import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Head } from 'vite-react-ssg'
import posts from '../data/blog.json'
import './BlogList.css'

export default function BlogList() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))]
  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  return (
    <div className="blog-list-page">
      <Head>
        <title>Blog — Kenny Pignolet</title>
        <meta name="description" content="Conseils pratiques pour les TPE et PME : performance web, SEO et automatisation. Par un développeur freelance, pour des décideurs non-techniques." />
        <meta property="og:title" content="Blog — Kenny Pignolet" />
        <meta property="og:url" content="https://portfolio-jet-tau-73.vercel.app/blog" />
        <link rel="canonical" href="https://portfolio-jet-tau-73.vercel.app/blog" />
      </Head>
      <div className="container">
        {/* Header */}
        <div className="blog-list-page__header">
          <p className="label">{t('blog.label')}</p>
          <h1 className="section-heading">{t('blog.heading')}</h1>
        </div>

        {/* Category filter */}
        <div className="category-filter" role="tablist" aria-label="Filter by category">
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
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
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
