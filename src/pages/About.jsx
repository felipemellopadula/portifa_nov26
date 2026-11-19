import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import Split from '../components/Split'
import Reveal from '../components/Reveal'

const brands = ['Verizon', 'Audi', 'Cartier', "McDonald's", 'Gillette', 'Mercado Livre', 'Cif', 'Philips Walita', "Kellogg's", 'Brahma', 'Havaianas', 'Natura', 'Itaú', 'Clash of Clans']

export default function About() {
  const { t } = useLang()
  const a = t.about
  const loop = [...brands, ...brands]
  return (
    <section className="page">
      <div className="page-wrap">
        <span className="eyebrow mono">{a.eyebrow}</span>
        <h1 className="big-title" aria-label={a.title} key={a.title}>
          <span aria-hidden="true"><Split text={a.title} step={0.012} /></span>
        </h1>

        <div className="about-grid">
          <Reveal className="about-portrait">
            <img src="/images/opt/fe.webp" alt={a.portraitAlt} loading="lazy" />
            <dl className="about-facts mono">
              {a.facts.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </Reveal>
          <div>
            <Reveal className="about-text">
              <p>{a.p1}</p>
              <p>{a.p2}</p>
              <p>{a.p3}</p>
              <div style={{ margin: '40px 0 72px' }}>
                <Link to="/contact" className="btn solid">{a.cta} →</Link>
              </div>
            </Reveal>
            <Reveal className="about-list">
              <h4 className="mono" style={{ color: 'var(--muted)' }}>{a.servicesTitle}</h4>
              <ul>
                {a.services.map((s, i) => (
                  <li key={s}><span>{s}</span><span className="mono" style={{ color: 'var(--muted)' }}>0{i + 1}</span></li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <div style={{ marginInline: 'calc(var(--gutter) * -1)' }}>
        <div className="page-wrap" style={{ padding: '0 var(--gutter)' }}>
          <span className="eyebrow mono" style={{ marginTop: '12vh', marginBottom: 0 }}>{a.clientsTitle}</span>
        </div>
        <div className="marquee" style={{ marginTop: 24 }}>
          <div className="marquee-track">
            {loop.map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
