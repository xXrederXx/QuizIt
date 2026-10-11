import { useEffect, useState } from 'react'
import { ArrowLeft, Check, ChevronRight, RotateCcw, Sparkles, X } from 'lucide-react'
import FrenchArticleText from './FrenchArticleText.jsx'
import ProgressStats from './ProgressStats.jsx'

const shuffleCards = (cards) => {
  const shuffled = [...cards]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

function CompletionScreen({ session, onAgain, onHome }) {
  return (
    <main className="learning-shell completion-shell">
      <button type="button" className="back-button" onClick={onHome}><ArrowLeft size={17} /> All sets</button>
      <div className="completion-card">
        <div className="completion-icon"><Sparkles size={28} /></div>
        <div className="section-kicker">Session complete</div>
        <h1>Set complete!</h1>
        <p className="completion-count">{session.learned.size} / {session.total} cards learned</p>
        <ProgressStats right={session.right} wrong={session.wrong} learned={session.learned.size} total={session.total} />
        <button type="button" className="primary-button" onClick={onAgain}><RotateCcw size={18} /> Start again</button>
      </div>
    </main>
  )
}

function Flashcard({ session, setSession, answer, cardIndex, activeCard, highlighted }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' && !session.answered) setSession((previous) => ({ ...previous, answered: true }))
      if (event.key === 'ArrowLeft' && session.answered) answer(false)
      if (event.key === 'ArrowRight' && session.answered) answer(true)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [answer, session.answered, setSession])

  return (
    <article className="study-card flashcard">
      <div className="card-label">Prompt · {cardIndex}</div>
      <h1><FrenchArticleText text={activeCard.question} highlighted={highlighted} /></h1>
      {session.answered ? (
        <div className="revealed">
          <div className="answer-label">Answer</div>
          <p><FrenchArticleText text={activeCard.answer} highlighted={highlighted} /></p>
          <div className="answer-actions">
            <button type="button" className="wrong-button" onClick={() => answer(false)}><X size={19} /> Wrong <kbd>←</kbd></button>
            <button type="button" className="right-button" onClick={() => answer(true)}><Check size={19} /> Right <kbd>→</kbd></button>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="primary-button reveal-button"
            onClick={() => setSession((previous) => ({ ...previous, answered: true }))}
          >
            Show answer <ChevronRight size={18} />
          </button>
          <div className="shortcut-hint">Press <kbd>↑</kbd> to reveal</div>
        </>
      )}
    </article>
  )
}

function TypingCard({ session, setSession, submitTyping, continueTyping, cardIndex, activeCard, highlighted }) {
  return (
    <form className="study-card typing-card" onSubmit={submitTyping}>
      <div className="card-label">Prompt · {cardIndex}</div>
      <h1><FrenchArticleText text={activeCard.question} highlighted={highlighted} /></h1>
      <label htmlFor="answer">Your answer</label>
      <input
        id="answer"
        autoFocus
        value={session.input}
        onChange={(event) => setSession((previous) => ({ ...previous, input: event.target.value }))}
        placeholder="Type your answer..."
        disabled={session.lastResult !== null}
      />
      {session.lastResult === null ? (
        <button className="primary-button" type="submit" disabled={!session.input.trim()}>
          Check answer <ChevronRight size={18} />
        </button>
      ) : (
        <div className={`result ${session.lastResult ? 'result-right' : 'result-wrong'}`}>
          <strong>{session.lastResult ? 'Right' : 'Wrong'}</strong>
          <span>Correct answer: <FrenchArticleText text={activeCard.answer} highlighted={highlighted} /></span>
          <button className="primary-button" type="button" onClick={continueTyping}>
            {session.lastResult ? 'Continue' : 'Try again'} <ChevronRight size={18} />
          </button>
        </div>
      )}
    </form>
  )
}

function StudySession({ set, mode, swapped, randomized, highlighted, onHome }) {
  const createSession = () => {
    const queue = randomized ? shuffleCards(set.cards) : [...set.cards]
    return { queue, learned: new Set(), right: 0, wrong: 0, current: queue[0], answered: false, lastResult: null, input: '', total: set.cards.length }
  }
  const [session, setSession] = useState(createSession)
  const cardIndex = set.cards.findIndex((card) => card.id === session.current?.id) + 1
  const activeCard = swapped
    ? { question: session.current?.answer, answer: session.current?.question }
    : session.current

  const answer = (isRight) => {
    const current = session.current
    const remaining = session.queue.filter((card) => card.id !== current.id)
    if (!isRight) remaining.push(current)
    const learned = new Set(session.learned)
    if (isRight) learned.add(current.id)
    setSession((previous) => ({
      ...previous,
      queue: remaining,
      learned,
      right: previous.right + (isRight ? 1 : 0),
      wrong: previous.wrong + (isRight ? 0 : 1),
      current: remaining[0],
      answered: false,
      lastResult: null,
      input: '',
    }))
  }

  const submitTyping = (event) => {
    event.preventDefault()
    const isRight = session.input.trim().toLowerCase() === activeCard.answer.trim().toLowerCase()
    const remaining = session.queue.filter((card) => card.id !== session.current.id)
    if (!isRight) remaining.push(session.current)
    const learned = new Set(session.learned)
    if (isRight) learned.add(session.current.id)
    setSession((previous) => ({
      ...previous,
      queue: remaining,
      learned,
      right: previous.right + (isRight ? 1 : 0),
      wrong: previous.wrong + (isRight ? 0 : 1),
      lastResult: isRight,
    }))
  }

  const continueTyping = () => setSession((previous) => ({
    ...previous,
    current: previous.queue[0],
    lastResult: null,
    input: '',
  }))

  if (!session.current) {
    return <CompletionScreen session={session} onAgain={() => setSession(createSession())} onHome={onHome} />
  }

  return (
    <main className="learning-shell">
      <header className="learning-header">
        <button type="button" className="back-button" onClick={onHome}><ArrowLeft size={17} /> Exit session</button>
        <span className="mode-label">{mode === 'typing' ? 'Typing' : 'Flashcards'} / {set.name}</span>
      </header>
      <ProgressStats right={session.right} wrong={session.wrong} learned={session.learned.size} total={session.total} />
      <div className="card-progress">
        <span style={{ width: `${(session.learned.size / session.total) * 100}%` }} />
      </div>
      {mode === 'typing' ? (
        <TypingCard
          session={session}
          setSession={setSession}
          submitTyping={submitTyping}
          continueTyping={continueTyping}
          cardIndex={cardIndex}
          activeCard={activeCard}
          highlighted={highlighted}
        />
      ) : (
        <Flashcard
          session={session}
          setSession={setSession}
          answer={answer}
          cardIndex={cardIndex}
          activeCard={activeCard}
          highlighted={highlighted}
        />
      )}
    </main>
  )
}

export default StudySession
