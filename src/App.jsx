import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { ArrowLeft, Check, ChevronRight, RotateCcw, Sparkles, X } from 'lucide-react'
import './App.css'

const setFiles = import.meta.glob('./sets/*.csv', { eager: true, query: '?raw', import: 'default' })
const displayName = (path) => path.split('/').pop().replace(/\.csv$/i, '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
const sets = Object.entries(setFiles).map(([path, csv]) => {
  const rows = Papa.parse(csv, { header: true, skipEmptyLines: true }).data
  return { id: path, name: displayName(path), cards: rows.map((row, index) => ({ id: `${path}-${index}`, question: String(row.question ?? '').trim(), answer: String(row.answer ?? '').trim() })).filter((card) => card.question && card.answer) }
}).filter((set) => set.cards.length)

function ProgressStats({ right, wrong, learned, total }) {
  return <div className="stats" aria-live="polite"><span className="stat progress"><span>{learned}</span> / {total} learned</span><span className="stat right"><Check size={17} strokeWidth={3} /> {right} Right</span><span className="stat wrong"><X size={17} strokeWidth={3} /> {wrong} Wrong</span></div>
}

function SetSelector({ selectedSet, onSelect }) {
  return <section className="selector-panel"><div className="section-kicker">01 / Training set</div><h2>Choose what to learn</h2><div className="set-grid">{sets.map((set) => <button type="button" className={`set-option ${selectedSet?.id === set.id ? 'selected' : ''}`} key={set.id} onClick={() => onSelect(set)}><span className="set-mark">{set.name.slice(0, 1)}</span><span className="set-copy"><strong>{set.name}</strong><small>{set.cards.length} {set.cards.length === 1 ? 'card' : 'cards'}</small></span><ChevronRight size={18} /></button>)}</div></section>
}

function SwapToggle({ swapped, onChange }) {
  return <div className="swap-control"><div><strong>Swap sides</strong><small>{swapped ? 'Answer → Question' : 'Question → Answer'}</small></div><button type="button" className={`switch ${swapped ? 'on' : ''}`} role="switch" aria-checked={swapped} aria-label="Swap question and answer" onClick={() => onChange(!swapped)}><span /></button></div>
}

function ModeSelector({ onSelect, selectedSet, swapped, onSwap }) {
  return <section className="selector-panel mode-panel"><div className="section-kicker">02 / Learning mode</div><h2>Pick your practice</h2><SwapToggle swapped={swapped} onChange={onSwap} /><div className="mode-grid"><button type="button" className="mode-option" disabled={!selectedSet} onClick={() => onSelect('flashcards')}><span className="mode-number">A</span><span><strong>Flashcards</strong><small>Reveal, then rate yourself</small></span><ChevronRight size={18} /></button><button type="button" className="mode-option" disabled={!selectedSet} onClick={() => onSelect('typing')}><span className="mode-number">B</span><span><strong>Typing</strong><small>Recall the answer yourself</small></span><ChevronRight size={18} /></button></div>{!selectedSet && <p className="hint">Select a training set first.</p>}</section>
}

function CompletionScreen({ session, onAgain, onHome }) {
  return <main className="learning-shell completion-shell"><button type="button" className="back-button" onClick={onHome}><ArrowLeft size={17} /> All sets</button><div className="completion-card"><div className="completion-icon"><Sparkles size={28} /></div><div className="section-kicker">Session complete</div><h1>Set complete!</h1><p className="completion-count">{session.learned.size} / {session.total} cards learned</p><ProgressStats right={session.right} wrong={session.wrong} learned={session.learned.size} total={session.total} /><button type="button" className="primary-button" onClick={onAgain}><RotateCcw size={18} /> Start again</button></div></main>
}

function LearningSession({ set, mode, swapped, onHome }) {
  const createSession = () => ({ queue: [...set.cards], learned: new Set(), right: 0, wrong: 0, current: set.cards[0], answered: false, lastResult: null, input: '', total: set.cards.length })
  const [session, setSession] = useState(createSession)
  const cardIndex = set.cards.findIndex((card) => card.id === session.current?.id) + 1
  const activeCard = swapped ? { question: session.current?.answer, answer: session.current?.question } : session.current
  const answer = (isRight) => {
    const current = session.current
    const remaining = session.queue.filter((card) => card.id !== current.id)
    if (!isRight) remaining.push(current)
    const learned = new Set(session.learned)
    if (isRight) learned.add(current.id)
    setSession((previous) => ({ ...previous, queue: remaining, learned, right: previous.right + (isRight ? 1 : 0), wrong: previous.wrong + (isRight ? 0 : 1), current: remaining[0], answered: false, lastResult: null, input: '' }))
  }
  const submitTyping = (event) => {
    event.preventDefault()
    const isRight = session.input.trim().toLowerCase() === activeCard.answer.trim().toLowerCase()
    const remaining = session.queue.filter((card) => card.id !== session.current.id)
    if (!isRight) remaining.push(session.current)
    const learned = new Set(session.learned)
    if (isRight) learned.add(session.current.id)
    setSession((previous) => ({ ...previous, queue: remaining, learned, right: previous.right + (isRight ? 1 : 0), wrong: previous.wrong + (isRight ? 0 : 1), lastResult: isRight }))
  }
  const continueTyping = () => setSession((previous) => ({ ...previous, current: previous.queue[0], lastResult: null, input: '' }))
  if (!session.current) return <CompletionScreen session={session} onAgain={() => setSession(createSession())} onHome={onHome} />
  return <main className="learning-shell"><header className="learning-header"><button type="button" className="back-button" onClick={onHome}><ArrowLeft size={17} /> Exit session</button><span className="mode-label">{mode === 'typing' ? 'Typing' : 'Flashcards'} / {set.name}</span></header><ProgressStats right={session.right} wrong={session.wrong} learned={session.learned.size} total={session.total} /><div className="card-progress"><span style={{ width: `${(session.learned.size / session.total) * 100}%` }} /></div>{mode === 'typing' ? <form className="study-card typing-card" onSubmit={submitTyping}><div className="card-label">Prompt · {cardIndex}</div><h1>{activeCard.question}</h1><label htmlFor="answer">Your answer</label><input id="answer" autoFocus value={session.input} onChange={(event) => setSession((previous) => ({ ...previous, input: event.target.value }))} placeholder="Type your answer..." disabled={session.lastResult !== null} />{session.lastResult === null ? <button className="primary-button" type="submit" disabled={!session.input.trim()}>Check answer <ChevronRight size={18} /></button> : <div className={`result ${session.lastResult ? 'result-right' : 'result-wrong'}`}><strong>{session.lastResult ? 'Right' : 'Wrong'}</strong><span>Correct answer: {activeCard.answer}</span><button className="primary-button" type="button" onClick={continueTyping}>{session.lastResult ? 'Continue' : 'Try again'} <ChevronRight size={18} /></button></div>}</form> : <Flashcard session={session} setSession={setSession} answer={answer} cardIndex={cardIndex} activeCard={activeCard} />}</main>
}

function Flashcard({ session, setSession, answer, cardIndex, activeCard }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' && !session.answered) setSession((previous) => ({ ...previous, answered: true }))
      if (event.key === 'ArrowLeft' && session.answered) answer(false)
      if (event.key === 'ArrowRight' && session.answered) answer(true)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [answer, session.answered, setSession])
  return <article className="study-card flashcard"><div className="card-label">Prompt · {cardIndex}</div><h1>{activeCard.question}</h1>{session.answered ? <div className="revealed"><div className="answer-label">Answer</div><p>{activeCard.answer}</p><div className="answer-actions"><button type="button" className="wrong-button" onClick={() => answer(false)}><X size={19} /> Wrong <kbd>←</kbd></button><button type="button" className="right-button" onClick={() => answer(true)}><Check size={19} /> Right <kbd>→</kbd></button></div></div> : <><button type="button" className="primary-button reveal-button" onClick={() => setSession((previous) => ({ ...previous, answered: true }))}>Show answer <ChevronRight size={18} /></button><div className="shortcut-hint">Press <kbd>↑</kbd> to reveal</div></>}</article>
}

function App() {
  const [selectedSet, setSelectedSet] = useState(null)
  const [mode, setMode] = useState(null)
  const [swapped, setSwapped] = useState(false)
  useEffect(() => { document.title = selectedSet ? `${selectedSet.name} | QuizIt` : 'QuizIt | Learn it your way' }, [selectedSet])
  if (selectedSet && mode) return <LearningSession set={selectedSet} mode={mode} swapped={swapped} onHome={() => setMode(null)} />
  return <div className="app-shell"><header className="app-header"><div className="brand"><span className="brand-icon"><Check size={19} strokeWidth={3} /></span><span>QuizIt</span></div><span className="header-note">Learn it. Lock it in.</span></header><main className="home-layout"><div className="intro"><div className="eyebrow"><span className="eyebrow-dot" /> Your focused study space</div><h1>Small steps.<br /><em>Strong recall.</em></h1><p>Choose a set, pick a mode, and make every card count.</p></div><div className="flow"><SetSelector selectedSet={selectedSet} onSelect={(set) => { setSelectedSet(set); setMode(null) }} /><ModeSelector selectedSet={selectedSet} swapped={swapped} onSwap={setSwapped} onSelect={setMode} /></div></main><footer>QuizIt <span /> A lightweight learning tool</footer></div>
}

export default App
