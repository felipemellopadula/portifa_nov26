import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { works } from '../data/works'

// Recent work linked in the second paragraph
const RECENT = ['the-sandler-clause', 'the-miracle-store', 'clash-on-hold']
  .map((id) => works.find((w) => w.id === id))
  .filter(Boolean)

// São Paulo time, 24h
const clock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
})

const pad = (n) => String(Math.max(0, Math.round(n))).padStart(4, '0')

// Crosses on the corners of the three columns, on both inner rows
const CROSSES = [0, 1, 2, 3].flatMap((x) =>
  [1, 2].map((y) => ({ left: `${(x / 3) * 100}%`, top: `${(y / 3) * 100}%` }))
)

/*
  The "low down": dark panel with a technical grid behind, B&W portrait and the
  manifesto as plain sentences. The footer is an
  instrument: local time, cursor coordinates and a spinning globe.
  Each [data-anim] element gets `.is-in` once it scrolls into view; the motion
  itself lives in CSS.
*/
export default function LowDown() {
  const { t, lang } = useLang()
  const copy = t.lowdown
  const [first, ...rest] = t.about.bio
  const ref = useRef(null)
  const bioRef = useRef(null)
  const [open, setOpen] = useState(false)

  const toggleBio = () => {
    setOpen((o) => !o)
    // When closing a long bio, bring its start back into view instead of leaving the reader far below it
    if (open && bioRef.current && bioRef.current.getBoundingClientRect().top < 0) {
      bioRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  const [time, setTime] = useState(() => clock.format(new Date()))
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const id = window.setInterval(() => setTime(clock.format(new Date())), 15000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-anim]')
    if (!els) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      }),
      { rootMargin: '0px 0px -12% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [lang])

  const track = (e) => {
    const box = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - box.left, y: e.clientY - box.top })
  }

  const title = (w) => (lang === 'pt' && w.titlePt) || w.title

  return (
    <section className="lowdown" id="about" ref={ref} onPointerMove={track}>
      <div className="lowdown-grid" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => <span key={i} />)}
        {CROSSES.map((c) => (
          <i key={`${c.left}-${c.top}`} className="lowdown-cross" style={c} />
        ))}
      </div>

      <div className="lowdown-inner">
        <figure className="lowdown-portrait">
          <div className="lowdown-photo" data-anim="cover">
            <img src="/images/opt/fe.webp" alt="Portrait of Felipe Mello Padula" loading="lazy" decoding="async" />
          </div>
        </figure>

        <div className="lowdown-copy">
          {/* key={lang} re-mounts the words so they animate again after a language switch */}
          <h2 className="lowdown-lead" data-anim="words" key={lang}>
            {copy.lead.split(' ').map((word, i) => (
              <Fragment key={i}>
                <span className="w"><span style={{ '--i': i }}>{word}</span></span>{' '}
              </Fragment>
            ))}
          </h2>

          <p className="lowdown-more" data-anim="rise">
            {copy.more}{' '}
            {RECENT.map((w, i) => (
              <span key={w.id}>
                <Link to={`/work/${w.id}`}>{title(w)}</Link>
                {i === RECENT.length - 2 ? copy.and : i < RECENT.length - 1 ? ', ' : ''}
              </span>
            ))}
            .
            <span className="lowdown-pixels" aria-hidden="true"><i /><i /><i /></span>
          </p>

          {/* Full bio: first paragraph as a teaser, the rest behind the +.
              data-anim sits on a wrapper with a fixed className: React rewrites the inner
              className on toggle, which would wipe the `.is-in` added by the observer. */}
          <div data-anim="rise">
            <div className={`lowdown-bio ${open ? 'open' : ''}`} ref={bioRef}>
              <p className="lowdown-bio-lead">{first}</p>
              <div className="lowdown-bio-rest" id="lowdown-bio-rest" inert={open ? undefined : ''}>
                <div>{rest.map((p, i) => <p key={i}>{p}</p>)}</div>
              </div>
              <button
                type="button"
                className="lowdown-bio-toggle mono"
                aria-expanded={open}
                aria-controls="lowdown-bio-rest"
                onClick={toggleBio}
              >
                <i aria-hidden="true" />
                {open ? copy.bioLess : copy.bioMore}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lowdown-foot" aria-hidden="true">
        <span>GMT-3 {copy.city} <b>{time}</b></span>
        <span className="lowdown-coords">{pad(pos.x)} X {pad(pos.y)} Y</span>
        <span className="lowdown-world">
          <span className="lowdown-world-label">{copy.worldwide}</span>
          <svg viewBox="0 0 48 32" className="lowdown-globe">
            <ellipse cx="24" cy="16" rx="21" ry="13" />
            <line x1="3" y1="16" x2="45" y2="16" />
            <path d="M6 9h36M6 23h36" />
            <ellipse className="m m1" cx="24" cy="16" rx="13" ry="13" />
            <ellipse className="m m2" cx="24" cy="16" rx="6" ry="13" />
          </svg>
        </span>
      </div>
    </section>
  )
}
