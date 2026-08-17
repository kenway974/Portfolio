import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Head } from 'vite-react-ssg'
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
  const { t } = useTranslation()

  const post = posts.find(p => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="blog-post-page">
      <Head>
        <title>{post.title} — Kenny Pignolet</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://portfolio-jet-tau-73.vercel.app/blog/${post.slug}`} />
        <link rel="canonical" href={`https://portfolio-jet-tau-73.vercel.app/blog/${post.slug}`} />
      </Head>
      <div className="container">
        {/* Back link */}
        <Link to="/blog" className="post-back">{t('blog.back')}</Link>

        {/* Article header */}
        <header className="post-header">
          <div className="post-meta">
            <span className="post-category">{post.category}</span>
            <span className="post-date">
              {new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>
        </header>

        {/* Divider */}
        <div className="post-divider" aria-hidden="true" />

        {/* Article body */}
        <article className="post-body">
          {renderContent(post.content)}
        </article>

        {/* Footer CTA */}
        <div className="post-cta">
          <Link to="/blog" className="btn-ghost">{t('blog.back')}</Link>
        </div>
      </div>
    </div>
  )
}
