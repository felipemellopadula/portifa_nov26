import { useEffect, useState, useCallback, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'
import Home from './pages/Home'
import Project from './pages/Project'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { trackPageview } from './analytics'

// Analytics dashboard (/admin), loaded only when someone opens it
const AdminPage = lazy(() => import('./pages/AdminPage').then(async (m) => {
  await import('./admin.css')
  return m
}))

export default function App() {
  const [menu, setMenu] = useState(false)
  const { pathname, hash } = useLocation()
  const closeMenu = useCallback(() => setMenu(false), [])
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')

  // case pages use the light theme, like the reference
  useEffect(() => {
    document.body.classList.toggle('theme-light', pathname.startsWith('/work/'))
  }, [pathname])

  // same pageview tracking as the previous site (/api/track.php)
  useEffect(() => { trackPageview(pathname) }, [pathname])

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  if (isAdmin) {
    return (
      <Suspense fallback={null}>
        <AdminPage />
      </Suspense>
    )
  }

  return (
    <>
      <Header onMenu={() => setMenu(true)} />
      <Menu open={menu} onClose={closeMenu} />
      <main className="route" key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
