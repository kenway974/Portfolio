import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

const BlogList = lazy(() => import('./pages/BlogList'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const TILList  = lazy(() => import('./pages/TILList'))
const TILPost  = lazy(() => import('./pages/TILPost'))

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/blog"       element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/til"        element={<TILList />} />
            <Route path="/til/:slug"  element={<TILPost />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
