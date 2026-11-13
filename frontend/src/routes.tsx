import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import ServicesList from './pages/ServicesList'
import ServicePage from './pages/ServicePage'
import RealisationsList from './pages/RealisationsList'
import RealisationPage from './pages/RealisationPage'
import SectorPage from './pages/SectorPage'
import ContactPage from './pages/ContactPage'
import Diagnostic from './pages/Diagnostic'
import MentionsLegales from './pages/MentionsLegales'
import Confidentialite from './pages/Confidentialite'
import NotFound from './pages/NotFound'
import blogData from './data/blog.json'
import { SECTORS, sectorPath } from './data/secteurs'
import services from './data/services'
import realisations from './data/realisations'

const routes: RouteRecord[] = [
  // Pages secteur : mise en page immersive, sans le menu ni le pied de page du site.
  ...SECTORS.map(s => ({ path: sectorPath(s.slug), element: <SectorPage key={s.slug} slug={s.slug} /> })),
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
      { path: 'contact', element: <ContactPage /> },
      { path: 'diagnostic', element: <Diagnostic /> },
      { path: 'mentions-legales', element: <MentionsLegales /> },
      { path: 'confidentialite', element: <Confidentialite /> },
      { path: 'blog', element: <BlogList /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        getStaticPaths: () => blogData.map(p => `blog/${p.slug}`),
      },
      // 404.html généré au build (servi par Vercel), et repli pour la navigation côté client.
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export default routes
