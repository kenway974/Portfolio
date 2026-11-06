import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import ServicesList from './pages/ServicesList'
import ServicePage from './pages/ServicePage'
import RealisationsList from './pages/RealisationsList'
import RealisationPage from './pages/RealisationPage'
import blogData from './data/blog.json'
import services from './data/services'
import realisations from './data/realisations'

const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <ServicesList /> },
      {
        path: 'services/:slug',
        element: <ServicePage />,
        getStaticPaths: () => services.map(s => `services/${s.slug}`),
      },
      { path: 'realisations', element: <RealisationsList /> },
      {
        path: 'realisations/:slug',
        element: <RealisationPage />,
        getStaticPaths: () => realisations.map(r => `realisations/${r.slug}`),
      },
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
