import { Check, X } from 'lucide-react'

function ProgressStats({ right, wrong, learned, total }) {
  return (
    <div className="stats" aria-live="polite">
      <span className="stat progress"><span>{learned}</span> / {total} learned</span>
      <span className="stat right"><Check size={17} strokeWidth={3} /> {right} Right</span>
      <span className="stat wrong"><X size={17} strokeWidth={3} /> {wrong} Wrong</span>
    </div>
  )
}

export default ProgressStats
