import { ChevronRight } from 'lucide-react'

function SettingToggle({ label, description, value, onChange, ariaLabel }) {
  return (
    <div className="swap-control">
      <div><strong>{label}</strong><small>{description}</small></div>
      <button
        type="button"
        className={`switch ${value ? 'on' : ''}`}
        role="switch"
        aria-checked={value}
        aria-label={ariaLabel}
        onClick={() => onChange(!value)}
      >
        <span />
      </button>
    </div>
  )
}

function ModeSelector({ selectedSet, swapped, randomized, highlighted, onSwap, onRandomize, onHighlight, onSelect }) {
  return (
    <section className="selector-panel mode-panel">
      <div className="section-kicker">02 / Learning mode</div>
      <h2>Pick your practice</h2>
      <SettingToggle
        label="Swap sides"
        description={swapped ? 'Answer → Question' : 'Question → Answer'}
        value={swapped}
        onChange={onSwap}
        ariaLabel="Swap question and answer"
      />
      <SettingToggle
        label="Randomize cards"
        description={randomized ? 'Shuffled queue' : 'In order'}
        value={randomized}
        onChange={onRandomize}
        ariaLabel="Randomize card order"
      />
      <SettingToggle
        label="Highlight French articles"
        description={highlighted ? 'Articles highlighted' : 'Plain text'}
        value={highlighted}
        onChange={onHighlight}
        ariaLabel="Highlight French articles"
      />
      <div className="mode-grid">
        <button type="button" className="mode-option" disabled={!selectedSet} onClick={() => onSelect('flashcards')}>
          <span className="mode-number">A</span>
          <span><strong>Flashcards</strong><small>Reveal, then rate yourself</small></span>
          <ChevronRight size={18} />
        </button>
        <button type="button" className="mode-option" disabled={!selectedSet} onClick={() => onSelect('typing')}>
          <span className="mode-number">B</span>
          <span><strong>Typing</strong><small>Recall the answer yourself</small></span>
          <ChevronRight size={18} />
        </button>
      </div>
      {!selectedSet && <p className="hint">Select a training set first.</p>}
    </section>
  )
}

export default ModeSelector
