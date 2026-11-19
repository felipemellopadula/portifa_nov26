import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { site } from '../data/site'

function useTyped(text, speed = 70, start = 600) {
  const [out, setOut] = useState('')
  useEffect(() => {
    setOut('')
    let i = 0
    let timer
    const tick = () => {
      i++
      setOut(text.slice(0, i))
      if (i < text.length) timer = setTimeout(tick, speed)
    }
    timer = setTimeout(tick, start)
    return () => clearTimeout(timer)
  }, [text, speed, start])
  return out
}

export default function Header({ onMenu }) {
  const { lang, toggle, t } = useLang()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const typed = useTyped(site.role)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 40)
      setHidden(y > 200 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${hidden ? 'is-hidden' : ''} ${solid ? 'is-solid' : ''}`}>
      <Link to="/" className="logo" aria-label={`${site.name}, home`}>
        {site.name}
        <small aria-hidden="true">
          {typed}
          <span className="caret" />
        </small>
      </Link>
      <div className="header-actions">
        <button className="lang-toggle" onClick={toggle} aria-label="Switch language / Mudar idioma">
          <span className={lang === 'en' ? 'on' : ''}>EN</span>/
          <span className={lang === 'pt' ? 'on' : ''}>PT</span>
        </button>
        <button className="burger" onClick={onMenu} aria-label={t.nav.menu}>
          <i /><i /><i />
        </button>
      </div>
    </header>
  )
}
