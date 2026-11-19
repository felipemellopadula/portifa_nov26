import { useState } from 'react'
import { useLang } from '../i18n'
import { site, waLink } from '../data/site'
import Split from '../components/Split'
import Reveal from '../components/Reveal'

export const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.2-3.6.94.96-3.5-.23-.36A9.46 9.46 0 0 1 2.53 12C2.53 6.75 6.8 2.5 12.06 2.5c2.54 0 4.93.99 6.73 2.79A9.43 9.43 0 0 1 21.57 12c0 5.25-4.27 9.5-9.52 9.5zm8.1-17.6A11.4 11.4 0 0 0 12.05.5C5.74.5.6 5.63.6 11.95c0 2.02.53 3.99 1.53 5.72L.5 23.5l5.97-1.57a11.43 11.43 0 0 0 5.58 1.42h.01c6.31 0 11.45-5.13 11.45-11.45 0-3.06-1.19-5.93-3.36-8.1z" />
  </svg>
)

const empty = { name: '', email: '', message: '', _gotcha: '' }

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [sending, setSending] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (form._gotcha) return
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'err', msg: c.required })
      return
    }
    setSending(true)
    setStatus({ type: '', msg: '' })
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus({ type: 'ok', msg: c.ok })
      setForm(empty)
    } catch {
      setStatus({ type: 'err', msg: c.err })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="page">
      <div className="page-wrap">
        <span className="eyebrow mono">{c.eyebrow}</span>
        <h1 className="big-title" aria-label={c.title} key={c.title}>
          <span aria-hidden="true"><Split text={c.title} step={0.025} /></span>
        </h1>

        <div className="contact-grid">
          <Reveal className="contact-side">
            <p>{c.sub}</p>
            <span className="or mono">{c.or}</span>
            <a className="btn wa" href={waLink(c.whatsappMsg)} target="_blank" rel="noreferrer">
              <WaIcon /> {c.whatsapp}
            </a>
            <div className="contact-lines">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={waLink(c.whatsappMsg)} target="_blank" rel="noreferrer">{site.whatsappLabel}</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
            </div>
          </Reveal>

          <Reveal as="form" className="form" onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="f-name">{c.name}</label>
              <input id="f-name" name="name" placeholder={c.namePh} value={form.name} onChange={set('name')} autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="f-email">{c.email}</label>
              <input id="f-email" name="email" type="email" placeholder={c.emailPh} value={form.email} onChange={set('email')} autoComplete="email" required />
            </div>
            <div className="field full">
              <label htmlFor="f-msg">{c.message}</label>
              <textarea id="f-msg" name="message" rows={5} placeholder={c.messagePh} value={form.message} onChange={set('message')} required />
            </div>
            <input className="hp" tabIndex={-1} autoComplete="off" name="_gotcha" value={form._gotcha} onChange={set('_gotcha')} aria-hidden="true" />
            <div className="form-foot">
              <button className="btn solid" type="submit" disabled={sending}>{sending ? c.sending : `${c.send} →`}</button>
              {status.msg && <span className={`form-msg ${status.type}`} role="status">{status.msg}</span>}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
