import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import TILList from './pages/TILList'
import TILPost from './pages/TILPost'
import blogData from './data/blog.json'
import tilData from './data/til.json'

const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <BlogList /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        getStaticPaths: () => blogData.map(p => `blog/${p.slug}`),
      },
      { path: 'til', element: <TILList /> },
      {
        path: 'til/:slug',
        element: <TILPost />,
        getStaticPaths: () => tilData.map(t => `til/${t.slug}`),
      },
    ],
  },
]

export default routes
