import { Link } from 'react-router-dom'
import { t } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'
import posts from '../data/blog.json'
import { formatDate } from '../utils/date'
import './BlogPreview.css'

export default function BlogPreview() {
  const ref = useScrollReveal<HTMLElement>()

  // Show 3 most recent posts
  const preview = posts.slice(0, 3)

  return (
    <section id="blog" className="blog-preview" ref={ref}>
      <div className="container">
        <div className="blog-preview__header">
          <p className="label reveal">{t('blog.label')}</p>
          <h2 className="section-heading reveal reveal-delay-1">{t('blog.heading')}</h2>
          <Link to="/blog" className="btn-ghost reveal reveal-delay-2">{t('blog.all')}</Link>
        </div>

        <div className="blog-preview__grid">
          {preview.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`blog-card reveal reveal-delay-${i + 2}`}
            >
              <div className="blog-card__meta">
                <span className="blog-card__category">{post.category}</span>
                <span className="blog-card__date">
                  <time dateTime={post.date}>{formatDate(post.date, 'short')}</time>
                </span>
              </div>
              <h3 className="blog-card__title">{post.title}</h3>
              <p className="blog-card__excerpt">{post.excerpt}</p>
              <span className="blog-card__read">{t('blog.read')}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
