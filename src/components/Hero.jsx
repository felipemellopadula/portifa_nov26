import { useEffect, useState } from 'react'
import { useLang } from '../i18n'

function Rotator({ words }) {
  const [i, setI] = useState(0)
  const [prev, setPrev] = useState(null)

  useEffect(() => { setI(0); setPrev(null) }, [words])

  useEffect(() => {
    const id = setInterval(() => {
      setI((cur) => {
        setPrev(cur)
        return (cur + 1) % words.length
      })
    }, 2600)
    return () => clearInterval(id)
  }, [words])

  const chars = (w) => [...w].map((c, k) => (
    <span key={k} className="w-char" style={{ animationDelay: `${k * 0.025}s`, transitionDelay: `${k * 0.015}s` }}>
      {c === ' ' ? ' ' : c}
    </span>
  ))

  return (
    <span className="rotator" aria-live="polite">
      {prev !== null && prev !== i && <span key={`o${prev}-${i}`} className="out" aria-hidden="true">{chars(words[prev])}</span>}
      <span key={`i${i}`} className="in">{chars(words[i])}</span>
    </span>
  )
}

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="hero">
      <span className="hero-eyebrow mono">{t.hero.eyebrow}</span>
      <h1 className="sr-only">{`${t.hero.line1} ${t.hero.line2}`}</h1>
      <img
        className="hero-art"
        src={`${import.meta.env.BASE_URL}videos/${encodeURIComponent('Composição.gif')}`}
        alt={`Felipe Mello Padula · ${t.hero.line1} ${t.hero.line2}`}
        width="400"
        height="533"
        fetchpriority="high"
      />
      <p className="hero-lead">
        <span>{t.hero.lead}</span>
        <Rotator words={t.hero.words} />
      </p>
      <div className="hero-meta mono">
        <span className="loc">{t.hero.location}</span>
        <a href="#work" className="scroll-cue"><i />{t.hero.scroll}</a>
      </div>
    </section>
  )
}
