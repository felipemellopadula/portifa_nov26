import { useLang } from '../i18n'
import { site, waLink } from '../data/site'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer mono">
      <span>© {new Date().getFullYear()} {site.name}. {t.footer.rights}</span>
      <div className="links">
        <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={waLink()} target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </footer>
  )
}
