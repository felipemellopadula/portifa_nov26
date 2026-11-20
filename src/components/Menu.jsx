import { useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n'
import { site, waLink } from '../data/site'

export default function Menu({ open, onClose }) {
  const { lang, toggle, t } = useLang()
  const { pathname, hash } = useLocation()

  // About lives on the home now. If we're already at /#about the URL doesn't change,
  // so App won't scroll on its own: do it here once the menu has closed.
  const goAbout = () => {
    onClose()
    if (pathname === '/' && hash === '#about') {
      setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 80)
    }
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div className={`menu ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="menu-top">
        <Link to="/" className="logo" onClick={onClose}>{site.name}</Link>
        <div className="header-actions">
          <button className="lang-toggle" onClick={toggle} style={{ borderColor: 'rgba(255,255,255,.2)' }}>
            <span className={lang === 'en' ? 'on' : ''}>EN</span>/
            <span className={lang === 'pt' ? 'on' : ''}>PT</span>
          </button>
          <button className="menu-close" onClick={onClose} aria-label={t.nav.close} />
        </div>
      </div>
      <nav>
        <NavLink to="/" end onClick={onClose}><span>{t.nav.work}</span></NavLink>
        <Link to="/#about" onClick={goAbout}><span>{t.nav.about}</span></Link>
        <NavLink to="/contact" onClick={onClose}><span>{t.nav.contact}</span></NavLink>
      </nav>
      <div className="menu-foot mono">
        <span style={{ color: '#8a8a8a' }}>{site.role} · São Paulo</span>
        <div className="links">
          <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={waLink()} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
