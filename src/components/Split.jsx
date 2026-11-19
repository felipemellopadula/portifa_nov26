// Splits text into animated characters. Words stay together so lines wrap naturally.
export default function Split({ text, delay = 0, step = 0.035, className = 'char' }) {
  let i = 0
  return text.split(' ').map((word, wi, arr) => (
    <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
      {[...word].map((c) => {
        const d = delay + i++ * step
        return (
          <span key={i} className={className} style={{ animationDelay: `${d}s` }}>
            {c}
          </span>
        )
      })}
      {wi < arr.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
    </span>
  ))
}
