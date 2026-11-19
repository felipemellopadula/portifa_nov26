import { Link } from 'react-router-dom'
import { useLang } from '../i18n'

export default function NotFound() {
  const { t } = useLang()
  return (
    <section className="nf">
      <div>
        <h1>404</h1>
        <p className="mono" style={{ margin: '24px 0 36px' }}>{t.notFound.title}</p>
        <Link to="/" className="btn">{t.notFound.back}</Link>
      </div>
    </section>
  )
}
