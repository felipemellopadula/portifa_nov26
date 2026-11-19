import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import Split from './Split'

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
  const h1 = useRef(null)
  const [done, setDone] = useState(false)

  // intro finished, then letters randomly "jump" every now and then
  useEffect(() => {
    const a = setTimeout(() => setDone(true), 1900)
    return () => clearTimeout(a)
  }, [])

  useEffect(() => {
    if (!done) return
    const id = setInterval(() => {
      const chars = h1.current?.querySelectorAll('.char')
      if (!chars?.length) return
      const el = chars[Math.floor(Math.random() * chars.length)]
      el.classList.add('wiggle')
      setTimeout(() => el.classList.remove('wiggle'), 750)
    }, 900)
    return () => clearInterval(id)
  }, [done])

  return (
    <section className="hero">
      <span className="hero-eyebrow mono">{t.hero.eyebrow}</span>
      <h1 ref={h1} className={done ? 'done' : ''} aria-label={`${t.hero.line1} ${t.hero.line2}`}>
        <span className="row" aria-hidden="true"><Split text={t.hero.line1} delay={0.1} /></span>
        <span className="row" aria-hidden="true"><Split text={t.hero.line2} delay={0.45} /><span className="char dot" style={{ animationDelay: '0.95s' }}>.</span></span>
      </h1>
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
