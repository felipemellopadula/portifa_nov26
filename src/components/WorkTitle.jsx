import { workTitle } from '../data/works'

/* "\n" in a title is a designed line break (e.g. the Audi case) */
export default function WorkTitle({ work, lang }) {
  const lines = workTitle(work, lang).split('\n')
  if (lines.length === 1) return lines[0]
  return lines.map((l, i) => (
    <span key={i} style={{ display: 'block' }}>{l}</span>
  ))
}
