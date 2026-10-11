import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import ModeSelector from './components/ModeSelector.jsx'
import SetSelector from './components/SetSelector.jsx'
import StudySession from './components/StudySession.jsx'
import { sets } from './data/studySets.js'
import './App.css'

function App() {
  const [selectedSet, setSelectedSet] = useState(null)
  const [mode, setMode] = useState(null)
  const [swapped, setSwapped] = useState(false)
  const [randomized, setRandomized] = useState(false)
  const [highlighted, setHighlighted] = useState(false)

  useEffect(() => {
    document.title = selectedSet ? `${selectedSet.name} | QuizIt` : 'QuizIt | Learn it your way'
  }, [selectedSet])

  if (selectedSet && mode) {
    return (
      <StudySession
        set={selectedSet}
        mode={mode}
        swapped={swapped}
        randomized={randomized}
        highlighted={highlighted}
        onHome={() => setMode(null)}
      />
    )
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon"><Check size={19} strokeWidth={3} /></span>
          <span>QuizIt</span>
        </div>
        <span className="header-note">Learn it. Lock it in.</span>
      </header>
      <main className="home-layout">
        <div className="intro">
          <div className="eyebrow"><span className="eyebrow-dot" /> Your focused study space</div>
          <h1>Small steps.<br /><em>Strong recall.</em></h1>
          <p>Choose a set, pick a mode, and make every card count.</p>
        </div>
        <div className="flow">
          <SetSelector
            sets={sets}
            selectedSet={selectedSet}
            onSelect={(set) => {
              setSelectedSet(set)
              setMode(null)
            }}
          />
          <ModeSelector
            selectedSet={selectedSet}
            swapped={swapped}
            randomized={randomized}
            highlighted={highlighted}
            onSwap={setSwapped}
            onRandomize={setRandomized}
            onHighlight={setHighlighted}
            onSelect={setMode}
          />
        </div>
      </main>
      <footer>QuizIt <span /> A lightweight learning tool</footer>
    </div>
  )
}

export default App
