import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { works } from '../data/works'
import WorkTitle from './WorkTitle'
import { useMediaQuery, COMPACT } from '../useMediaQuery'

const HOVER = '(hover: hover) and (pointer: fine)'

export default function ProjectList() {
  const { lang, tx } = useLang()
  const [active, setActive] = useState(null)
  const hoverMode = useMediaQuery(HOVER)
  const compact = useMediaQuery(COMPACT)
  const listRef = useRef(null)
  const videos = useRef({})

  // Touch screens have no hover: the title closest to the middle of the screen becomes active
  useEffect(() => {
    if (hoverMode) return
    let raf = 0
    const check = () => {
      raf = 0
      const list = listRef.current
      if (!list) return
      const mid = window.innerHeight / 2
      const r = list.getBoundingClientRect()
      if (r.top > mid || r.bottom < mid) { setActive(null); return }
      let best = null
      let bestD = Infinity
      list.querySelectorAll('.work-item').forEach((el, i) => {
        const b = el.getBoundingClientRect()
        const d = Math.abs(b.top + b.height / 2 - mid)
        if (d < bestD) { bestD = d; best = i }
      })
      setActive(best)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(check) }
    check()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [hoverMode])

  // Only the active cover video plays
  useEffect(() => {
    Object.entries(videos.current).forEach(([k, v]) => {
      if (!v) return
      if (Number(k) === active) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else v.pause()
    })
  }, [active, compact])

  return (
    <section className="work" id="work">
      <div className={`media-frame ${active !== null ? 'show' : ''}`} aria-hidden="true">
        {works.map((w, i) => {
          const cover = (compact && w.coverMobile) || w.cover
          const video = (compact && w.coverVideoMobile) || w.coverVideo
          return (
            <div key={w.id} className={`layer ${i === active ? 'active' : ''}`} style={{ background: w.accent }}>
              {video ? (
                <video
                  key={video}
                  ref={(el) => (videos.current[i] = el)}
                  src={video}
                  poster={cover}
                  muted
                  loop
                  playsInline
                  preload={hoverMode ? 'metadata' : 'none'}
                />
              ) : (
                <img key={cover} src={cover} alt="" decoding="async" loading={i < 3 ? 'eager' : 'lazy'} />
              )}
            </div>
          )
        })}
      </div>

      <ul
        ref={listRef}
        className={`work-list ${active !== null ? 'dim' : ''}`}
        onMouseLeave={() => hoverMode && setActive(null)}
      >
        {works.map((w, i) => (
          <li
            key={w.id}
            className={`work-item ${i === active ? 'active' : ''}`}
            onMouseEnter={() => hoverMode && setActive(i)}
          >
            <Link to={`/work/${w.id}`} onFocus={() => setActive(i)} onBlur={() => hoverMode && setActive(null)}>
              <span className="work-title">
                <WorkTitle work={w} lang={lang} />
                <span className="arrow">→</span>
              </span>
              <span className="work-cat mono">{w.client} · {tx(w.discipline)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
