import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import SectorPage from './pages/SectorPage'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import blogData from './data/blog.json'
import { SECTORS } from './data/secteurs'

const routes: RouteRecord[] = [
  // Écran d'accueil : la roue des secteurs
  { path: '/', element: <Welcome /> },
  // Une page par secteur, chacune avec son adresse
  ...SECTORS.map(s => ({ path: `/${s.slug}`, element: <SectorPage key={s.slug} slug={s.slug} /> })),
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'portfolio', element: <Home /> },
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
