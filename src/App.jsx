import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import ModeSelector from './components/ModeSelector.jsx'
import SetSelector from './components/SetSelector.jsx'
import StudySession from './components/StudySession.jsx'
import LegalNotice from './components/legal/LegalNotice.jsx'
import PrivacyPolicy from './components/legal/PrivacyPolicy.jsx'
import { sets } from './data/studySets.js'
import './App.css'

function App() {
  const [selectedSet, setSelectedSet] = useState(null)
  const [mode, setMode] = useState(null)
  const [swapped, setSwapped] = useState(false)
  const [randomized, setRandomized] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    document.title = selectedSet ? `${selectedSet.name} | QuizIt` : 'QuizIt | Learn it your way'
  }, [selectedSet])

  if (selectedSet && mode) {
    return (
      <div className="app-shell">
        <StudySession
          set={selectedSet}
          mode={mode}
          swapped={swapped}
          randomized={randomized}
          highlighted={highlighted}
          onHome={() => setMode(null)}
        />
      </div>
    )
  }

  const renderMainContent = () => {
    if (activePage === 'impressum') {
      return (
        <main className="legal-page">
          <LegalNotice
            onHome={() => setActivePage('home')}
            onOpenPrivacy={() => setActivePage('privacy')}
          />
        </main>
      )
    }

    if (activePage === 'privacy') {
      return (
        <main className="legal-page">
          <PrivacyPolicy
            onHome={() => setActivePage('home')}
            onOpenImpressum={() => setActivePage('impressum')}
          />
        </main>
      )
    }

    return (
      <>
        <header className="app-header">
          <button type="button" className="brand-button" onClick={() => setActivePage('home')}>
            <span className="brand-icon"><Check size={19} strokeWidth={3} /></span>
            <span>QuizIt</span>
          </button>
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
      </>
    )
  }

  return (
    <div className="app-shell">
      {renderMainContent()}
      <footer className="site-footer">
        <div className="footer-inner">
          <span>QuizIt <span className="footer-dot" /> A lightweight learning tool</span>
          <nav className="footer-links" aria-label="Legal links">
            <button type="button" className="text-link" onClick={() => setActivePage('impressum')}>
              Impressum
            </button>
            <button type="button" className="text-link" onClick={() => setActivePage('privacy')}>
              Privacy Policy
            </button>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
