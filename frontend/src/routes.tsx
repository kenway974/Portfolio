import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import blogData from './data/blog.json'

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
    ],
  },
]

export default routes
