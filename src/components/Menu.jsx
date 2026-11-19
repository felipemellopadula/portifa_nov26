import { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { site, waLink } from '../data/site'

export default function Menu({ open, onClose }) {
  const { lang, toggle, t } = useLang()

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
        <NavLink to="/about" onClick={onClose}><span>{t.nav.about}</span></NavLink>
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
