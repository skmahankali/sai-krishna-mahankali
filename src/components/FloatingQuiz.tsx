import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const QUESTIONS = [
  { q: 'What is 2^10?', a: '1024', hint: 'Powers of 2' },
  { q: 'What port does HTTPS use?', a: '443', hint: 'Secure web traffic' },
  { q: '127 + 128 = ?', a: '255', hint: 'Max unsigned byte value' },
  { q: 'What does K8s stand for?', a: 'kubernetes', hint: '8 letters in the middle' },
  { q: 'chmod ___ = full access', a: '777', hint: 'rwxrwxrwx in unix' },
  { q: '16 × 16 = ?', a: '256', hint: 'Classic bit depth value' },
  { q: 'What is 0xFF in decimal?', a: '255', hint: 'Max hex byte' },
  { q: 'SRE stands for Site ___ Eng.', a: 'reliability', hint: 'Keeping things stable' },
  { q: 'What port does SSH use?', a: '22', hint: 'Secure shell' },
  { q: 'Synonym for "resilient"?', a: 'robust', hint: 'Strong and sturdy' },
  { q: 'What is the opposite of deploy?', a: 'rollback', hint: 'Undo in DevOps' },
  { q: 'Docker runs ___', a: 'containers', hint: 'Lightweight isolation units' },
  { q: '2^8 = ?', a: '256', hint: '1 byte of values' },
  { q: 'What does CI/CD stand for? (abbr)', a: 'continuous integration continuous delivery', hint: 'Automated pipeline' },
  { q: 'HTTP success status code?', a: '200', hint: 'All good!' },
]

function playCorrect() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(523, ctx.currentTime)
    osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1)
    osc.frequency.setValueAtTime(784, ctx.currentTime + 0.22)
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
    osc.start(); osc.stop(ctx.currentTime + 0.4)
  } catch {}
}

function playWrong() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = 'square'
    osc.frequency.setValueAtTime(200, ctx.currentTime)
    osc.frequency.setValueAtTime(160, ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(0.07, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
    osc.start(); osc.stop(ctx.currentTime + 0.2)
  } catch {}
}

export default function FloatingQuiz() {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * QUESTIONS.length))
  const [input, setInput] = useState('')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [xp, setXp] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [streak, setStreak] = useState(0)

  const q = QUESTIONS[idx % QUESTIONS.length]

  const checkAnswer = useCallback(() => {
    const answer = input.trim().toLowerCase().replace(/\s+/g, ' ')
    const correct = q.a.toLowerCase()
    if (answer === correct) {
      setResult('correct')
      setXp(prev => prev + 10 + streak * 5)
      setStreak(s => s + 1)
      playCorrect()
      setTimeout(() => {
        setResult(null)
        setInput('')
        setAttempts(0)
        setIdx(i => (i + 1) % QUESTIONS.length)
      }, 1600)
    } else {
      setResult('wrong')
      setAttempts(a => a + 1)
      setStreak(0)
      playWrong()
      setTimeout(() => setResult(null), 900)
    }
  }, [input, q.a, streak])

  const skip = () => {
    setIdx(i => (i + 1) % QUESTIONS.length)
    setInput('')
    setResult(null)
    setAttempts(0)
  }

  const borderColor = result === 'correct'
    ? 'rgba(0,255,136,0.8)'
    : result === 'wrong'
    ? 'rgba(255,0,110,0.8)'
    : 'rgba(255,215,0,0.35)'

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: '#0a1520',
              border: `2px solid ${borderColor}`,
              boxShadow: `0 0 30px rgba(255,215,0,0.12)`,
              width: 340,
              marginBottom: 10,
              transition: 'border-color 0.3s',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '6px 10px',
              background: 'rgba(255,215,0,0.07)',
              borderBottom: '1px solid rgba(255,215,0,0.18)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem', color: '#ffd700' }}>
                🧠 BRAIN.EXE
              </span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {streak >= 2 && (
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.35rem', color: '#ff006e', textShadow: '0 0 8px rgba(255,0,110,0.8)' }}>
                    🔥{streak}x
                  </span>
                )}
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: '#ffd700' }}>
                  +{xp}XP
                </span>
              </div>
            </div>

            <div style={{ padding: '12px 14px' }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.52rem',
                color: 'rgba(0,255,136,0.4)',
                marginBottom: 8,
                letterSpacing: '0.1em',
              }}>
                CHALLENGE #{(idx % QUESTIONS.length) + 1} / {QUESTIONS.length}
              </p>

              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                color: '#e2ffe8',
                marginBottom: 14,
                lineHeight: 1.7,
              }}>
                {q.q}
              </p>

              {attempts >= 2 && (
                <motion.p
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.55rem',
                    color: 'rgba(255,215,0,0.55)',
                    marginBottom: 10,
                    fontStyle: 'italic',
                  }}
                >
                  💡 {q.hint}
                </motion.p>
              )}

              <div style={{ display: 'flex', gap: 6 }}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); checkAnswer() } }}
                  placeholder="your answer..."
                  autoComplete="off"
                  style={{
                    flex: 1,
                    background: 'rgba(0,255,136,0.04)',
                    border: `1px solid ${
                      result === 'correct' ? 'rgba(0,255,136,0.7)' :
                      result === 'wrong' ? 'rgba(255,0,110,0.7)' :
                      'rgba(0,255,136,0.2)'
                    }`,
                    color: '#00ff88',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    padding: '5px 8px',
                    outline: 'none',
                    caretColor: '#00ff88',
                    transition: 'border-color 0.2s',
                  }}
                />
                <button
                  onClick={checkAnswer}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '0.33rem',
                    color: '#00ff88',
                    background: 'rgba(0,255,136,0.08)',
                    border: '1px solid rgba(0,255,136,0.35)',
                    padding: '5px 9px',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                  }}
                >
                  GO
                </button>
              </div>

              <AnimatePresence>
                {result && (
                  <motion.p
                    key={result}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '0.42rem',
                      color: result === 'correct' ? '#00ff88' : '#ff006e',
                      textShadow: `0 0 12px ${result === 'correct' ? 'rgba(0,255,136,0.9)' : 'rgba(255,0,110,0.9)'}`,
                      marginTop: 10,
                    }}
                  >
                    {result === 'correct'
                      ? `✓ +${10 + Math.max(streak - 1, 0) * 5} XP${streak >= 2 ? ' COMBO!' : ' GAINED!'}`
                      : '✗ NOT QUITE... TRY AGAIN'}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                onClick={skip}
                style={{
                  marginTop: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.5rem',
                  color: 'rgba(0,255,136,0.35)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(0,255,136,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,255,136,0.35)')}
              >
                → skip question
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setOpen(o => !o)}
          title="Brain.exe - test your knowledge!"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.52rem',
            color: open ? '#ffd700' : 'rgba(255,215,0,0.8)',
            background: '#0a1520',
            border: `2px solid ${open ? 'rgba(255,215,0,0.8)' : 'rgba(255,215,0,0.45)'}`,
            padding: '10px 16px',
            cursor: 'pointer',
            boxShadow: open ? '0 0 25px rgba(255,215,0,0.3)' : '0 0 15px rgba(255,215,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>🧠</span>
          {xp > 0 ? (
            <span style={{ color: '#ffd700' }}>BRAIN.EXE +{xp}XP</span>
          ) : (
            <span>BRAIN.EXE</span>
          )}
          {!open && (
            <span style={{
              position: 'absolute',
              top: -10,
              right: -10,
              background: '#ffd700',
              color: '#050a0e',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.32rem',
              padding: '3px 6px',
              animation: 'pulse-ring 1.4s infinite',
              boxShadow: '0 0 10px rgba(255,215,0,0.7)',
              letterSpacing: '0.05em',
            }}>
              TRY ME!
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
