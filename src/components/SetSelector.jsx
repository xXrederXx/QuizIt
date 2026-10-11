import { ChevronRight } from 'lucide-react'

function SetSelector({ sets, selectedSet, onSelect }) {
  return (
    <section className="selector-panel">
      <div className="section-kicker">01 / Training set</div>
      <h2>Choose what to learn</h2>
      <div className="set-grid">
        {sets.map((set) => (
          <button
            type="button"
            className={`set-option ${selectedSet?.id === set.id ? 'selected' : ''}`}
            key={set.id}
            onClick={() => onSelect(set)}
          >
            <span className="set-mark">{set.name.slice(0, 1)}</span>
            <span className="set-copy">
              <strong>{set.name}</strong>
              <small>{set.cards.length} {set.cards.length === 1 ? 'card' : 'cards'}</small>
            </span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
    </section>
  )
}

export default SetSelector
