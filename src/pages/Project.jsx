import { Fragment, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { works, workTitleText } from '../data/works'
import { caseDetails } from '../data/caseDetails'
import { useMediaQuery, COMPACT } from '../useMediaQuery'
import Split from '../components/Split'
import Reveal from '../components/Reveal'
import WorkTitle from '../components/WorkTitle'
import NotFound from './NotFound'

const SPAN = { wide: 'is-full', half: 'is-half', third: 'is-third' }

function Shot({ shot, tx }) {
  return (
    <Reveal as="figure" className={`shot ${SPAN[shot.span ?? 'wide']}${shot.viewport ? ` vp-${shot.viewport}` : ''}`}>
      <picture>
        {shot.imageCompact && <source media="(max-width: 1100px)" srcSet={shot.imageCompact} />}
        <img src={shot.image} alt={shot.alt} loading="lazy" decoding="async" />
      </picture>
      {shot.caption && <figcaption className="mono">{tx(shot.caption)}</figcaption>}
    </Reveal>
  )
}

/* Facade: the Vimeo iframe or video file only loads after the click */
function Film({ film, title, t, tx }) {
  const [playing, setPlaying] = useState(false)
  return (
    <Reveal className="film">
      <div className="film-frame">
        {playing ? (
          film.vimeoId ? (
            <iframe
              src={`https://player.vimeo.com/video/${film.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              title={`${title} · ${tx(film.caption)}`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={film.src} poster={film.poster} controls autoPlay playsInline />
          )
        ) : (
          <button type="button" className="film-poster" onClick={() => setPlaying(true)}>
            <img src={film.poster} alt="" decoding="async" />
            <span className="film-play" aria-hidden="true">▶</span>
            <span className="film-label mono">{t.project.playFilm}</span>
          </button>
        )}
      </div>
      <p className="film-caption mono">
        <span>{tx(film.caption)}</span>
        {film.vimeoId && (
          <a href={`https://vimeo.com/${film.vimeoId}`} target="_blank" rel="noreferrer">{t.project.watchOnVimeo} ↗</a>
        )}
      </p>
    </Reveal>
  )
}

export default function Project() {
  const { slug } = useParams()
  const { lang, t, tx } = useLang()
  const compact = useMediaQuery(COMPACT)
  const idx = works.findIndex((w) => w.id === slug)
  const work = works[idx]

  useEffect(() => {
    if (work) document.title = `${workTitleText(work, lang)} · Felipe Mello Padula`
    return () => { document.title = 'Felipe Mello Padula · Creative Art Director' }
  }, [work, lang])

  if (!work) return <NotFound />

  const detail = caseDetails[work.id]
  const next = works[(idx + 1) % works.length]
  const title = workTitleText(work, lang)
  const cover = (compact && work.coverMobile) || work.cover
  const coverVideo = (compact && work.coverVideoMobile) || work.coverVideo
  const p = t.project

  const chapters = [
    [p.problem, work.problem],
    [p.insight, work.insight],
    [p.idea, work.idea],
    [p.pr, work.pr],
  ].filter((c) => c[1])

  return (
    <article className="case" key={slug}>
      <header className="case-head">
        <div>
          <Link to="/#work" className="back-link mono">← {p.back}</Link>
          <p className="case-index mono">{work.number} / {work.client}</p>
          <h1 className="case-title" aria-label={title} key={lang}>
            <span aria-hidden="true">
              {workTitle(work, lang).map((line, i) => (
                <span key={i} style={{ display: 'block' }}>
                  <Split text={line} delay={0.05 + i * 0.2} step={0.025} />
                </span>
              ))}
            </span>
          </h1>
          <p className="case-sub">{tx(work.tagline)}</p>

          {!detail?.interleave && (
            <div className="case-desc">
              <h4 className="mono">[ {p.insight} ]</h4>
              <p>{tx(work.insight)}</p>
              <h4 className="mono">[ {p.idea} ]</h4>
              <p>{tx(work.idea)}</p>
            </div>
          )}
        </div>

        <dl className="case-meta">
          {detail ? (
            detail.credits.map(([label, value]) => (
              <div key={label.en}><dt>{tx(label)}:</dt><dd>{tx(value)}</dd></div>
            ))
          ) : (
            <>
              <div><dt>{p.client}:</dt><dd>{work.client}</dd></div>
              <div><dt>{p.year}:</dt><dd>{work.year}</dd></div>
              <div><dt>{p.type}:</dt><dd>{tx(work.discipline)}</dd></div>
            </>
          )}
        </dl>
      </header>

      <div className="case-body">
        <Reveal as="figure" className="shot is-full case-cover">
          {coverVideo ? (
            <video key={coverVideo} src={coverVideo} poster={cover} aria-label={`${work.client}, ${title}`} autoPlay muted loop playsInline />
          ) : (
            <img src={cover} alt={`${work.client}, ${title}`} fetchpriority="high" decoding="async" />
          )}
        </Reveal>

        {detail?.film && <Film key={work.id} film={detail.film} title={title} t={t} tx={tx} />}

        {detail?.interleave ? (
          <>
            {chapters.map(([label, text], i) => {
              const shot = detail.shots[i]
              return (
                <Fragment key={label}>
                  <Reveal className="chapter">
                    <h4 className="mono">[ {label} ]</h4>
                    <p>{tx(text)}</p>
                  </Reveal>
                  {shot && <div className="gallery"><Shot shot={shot} tx={tx} /></div>}
                </Fragment>
              )
            })}
            {detail.howItWorks && (
              <>
                <Reveal className="chapter"><h4 className="mono">[ {p.howItWorks} ]</h4></Reveal>
                <div className="gallery">
                  {detail.howItWorks.map((s) => <Shot key={s.image} shot={s} tx={tx} />)}
                </div>
              </>
            )}
            {detail.shots.length > chapters.length && (
              <div className="gallery">
                {detail.shots.slice(chapters.length).map((s) => <Shot key={s.image} shot={s} tx={tx} />)}
              </div>
            )}
          </>
        ) : (
          detail?.shots?.length > 0 && (
            <>
              <Reveal className="chapter"><h4 className="mono">[ {p.work} ]</h4></Reveal>
              <div className="gallery">
                {detail.shots.map((s) => <Shot key={s.image} shot={s} tx={tx} />)}
              </div>
            </>
          )
        )}
      </div>

      <Link to={`/work/${next.id}`} className="next">
        <span className="mono">{p.next}</span>
        <h3><WorkTitle work={next} lang={lang} /> →</h3>
        <span className="mono next-meta">{next.client} · {tx(next.discipline)} · {next.year}</span>
      </Link>
    </article>
  )
}

function workTitle(work, lang) {
  return (lang === 'pt' && work.titlePt ? work.titlePt : work.title).split('\n')
}
