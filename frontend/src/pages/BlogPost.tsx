import { useParams, Link, Navigate } from 'react-router-dom'
import { t } from '../i18n'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import { blogPostSchema } from '../seo'
import { formatDate } from '../utils/date'
import posts from '../data/blog.json'
import './BlogPost.css'

/**
 * Very lightweight markdown-like renderer for the blog content.
 * Handles: ## headings, **bold**, blank lines as paragraphs.
 * No external dependency needed for this level of content.
 */
function renderContent(content: string): React.ReactNode[] {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i} className="post-h2">{block.slice(3)}</h2>
    }
    // Inline bold
    const parts = block.split(/(\*\*[^*]+\*\*)/)
    return (
      <p key={i} className="post-paragraph">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    )
  })
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()

  const post = posts.find(p => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="blog-post-page">
      <Seo
        title={`${post.seoTitle} | Kenny Pignolet`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={`blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        modifiedTime={post.date}
        jsonLd={blogPostSchema(post)}
      />
      <div className="container">
        <Breadcrumbs items={[['Accueil', '/'], ['Blog', '/blog'], [post.title, `/blog/${post.slug}`]]} />

        <article>
          <header className="post-header">
            <div className="post-meta">
              <span className="post-category">{post.category}</span>
              <span className="post-date">
                <time dateTime={post.date}>{formatDate(post.date, 'long')}</time>
              </span>
              <span className="post-author">
                Par <Link to="/profil" rel="author">Kenny Pignolet</Link>
              </span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>
          </header>

          {/* Divider */}
          <div className="post-divider" aria-hidden="true" />

          <div className="post-body">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Footer CTA */}
        <div className="post-cta">
          <Link to="/blog" className="btn-ghost">{t('blog.back')}</Link>
        </div>
      </div>
    </div>
  )
}
