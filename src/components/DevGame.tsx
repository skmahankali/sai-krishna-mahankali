import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '../context/ThemeContext'

const SERVERS = [
  { id: 'web-01',    icon: '🌐', name: 'Web Server' },
  { id: 'db-01',     icon: '🗄️', name: 'Database' },
  { id: 'api-01',    icon: '⚡', name: 'API Gateway' },
  { id: 'cache-01',  icon: '🚀', name: 'Cache' },
  { id: 'queue-01',  icon: '📬', name: 'Job Queue' },
  { id: 'auth-01',   icon: '🔐', name: 'Auth Service' },
  { id: 'cdn-01',    icon: '📡', name: 'CDN' },
  { id: 'monitor',   icon: '📊', name: 'Monitoring' },
  { id: 'deploy-01', icon: '🚢', name: 'Deployer' },
]

const TIPS = [
  { title: 'Never deploy on Fridays', body: 'Friday deploys are how on-call engineers lose their weekends. Always deploy early in the week when the full team is around.' },
  { title: 'What is a rollback?', body: "If your new code breaks things, a rollback means going back to the last working version. Think of it as Ctrl+Z for your entire production system." },
  { title: 'Monitor everything', body: "If a server crashes silently and nobody knows, is it even crashed? Monitoring tells you something broke before your users notice." },
  { title: 'What is 99.9% uptime?', body: "Sounds great, but 99.9% uptime still means about 8 hours of downtime per year. Site Reliability Engineers aim for 99.99% - that's under an hour." },
  { title: 'Automate the boring stuff', body: "Doing the same task manually 100 times means 100 chances for human error. Automate it once, run it perfectly forever. That's the whole point of DevOps." },
  { title: 'What is a CI/CD pipeline?', body: "A pipeline is automated steps: write code, test it, build it, deploy it. Like a factory assembly line for software - no human clicking 'deploy' required." },
  { title: 'Backups save careers', body: "Backups are copies of your data stored somewhere safe. If everything explodes, you restore from the backup. No backup means data gone forever. Ask me how I know." },
  { title: 'What are containers?', body: "Containers (like Docker) package your app plus everything it needs to run. Works on your laptop? Works on the server. No more 'it works on my machine'." },
  { title: 'Small deploys, small problems', body: "Deploying 1000 changes at once and something breaks - good luck finding it. Deploy 10 changes often, something breaks - you know exactly what it was." },
  { title: 'Logs are your time machine', body: "Logs are your server's diary of everything that happened. When something breaks at 3am, logs tell you exactly what happened, when, and why. No logs means flying blind." },
  { title: 'The cloud is rented computers', body: "The cloud is just computers owned by Amazon, Google, or Microsoft that you rent by the hour. You don't manage the physical hardware - they do. You just use it." },
  { title: 'On-call is a team sport', body: "When an incident hits at 2am, you don't have to fix it alone. Escalate early, wake people up if needed. A late call is better than a long outage." },
]

type NodeState = 'ok' | 'critical' | 'fixing'
type Phase = 'idle' | 'playing' | 'done'

export default function DevGame() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [nodes, setNodes] = useState<Record<string, NodeState>>(() =>
    Object.fromEntries(SERVERS.map(s => [s.id, 'ok']))
  )
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [tip, setTip] = useState(TIPS[0])
  const [pulse, setPulse] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const alertRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const escalateRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Pulse the button when user nears contact section
  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setPulse(true) }, { threshold: 0.1 })
    obs.observe(contact)
    return () => obs.disconnect()
  }, [])

  const stopAll = useCallback(() => {
    if (timerRef.current)   clearInterval(timerRef.current)
    if (alertRef.current)   clearInterval(alertRef.current)
    if (escalateRef.current) clearInterval(escalateRef.current)
  }, [])

  const endGame = useCallback(() => {
    stopAll()
    setTip(TIPS[Math.floor(Math.random() * TIPS.length)])
    setPhase('done')
    setNodes(Object.fromEntries(SERVERS.map(s => [s.id, 'ok'])))
  }, [stopAll])

  const startGame = useCallback(() => {
    stopAll()
    setScore(0); setMissed(0); setTimeLeft(30)
    setPhase('playing')
    setNodes(Object.fromEntries(SERVERS.map(s => [s.id, 'ok'])))

    // Always scroll modal to top when game starts
    setTimeout(() => { modalRef.current?.scrollTo({ top: 0 }) }, 50)

    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { endGame(); return 0 } return t - 1 })
    }, 1000)

    alertRef.current = setInterval(() => {
      setNodes(prev => {
        const okIds = SERVERS.map(s => s.id).filter(id => prev[id] === 'ok')
        if (!okIds.length) return prev
        const pick = okIds[Math.floor(Math.random() * okIds.length)]
        return { ...prev, [pick]: 'critical' }
      })
    }, 1600)

    escalateRef.current = setInterval(() => {
      setNodes(prev => {
        const updated = { ...prev }
        let m = 0
        SERVERS.forEach(s => { if (updated[s.id] === 'critical') { updated[s.id] = 'ok'; m++ } })
        if (m) setMissed(x => x + m)
        return updated
      })
    }, 4500)
  }, [stopAll, endGame])

  const handleFix = (id: string) => {
    if (phase !== 'playing' || nodes[id] !== 'critical') return
    setNodes(prev => ({ ...prev, [id]: 'fixing' }))
    setTimeout(() => setNodes(prev => ({ ...prev, [id]: 'ok' })), 500)
    setScore(s => s + 1)
  }

  const handleClose = () => {
    stopAll()
    setOpen(false)
    setPhase('idle')
    setNodes(Object.fromEntries(SERVERS.map(s => [s.id, 'ok'])))
    document.body.style.overflow = ''
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => () => stopAll(), [stopAll])

  const timerColor = timeLeft > 15 ? '#22c55e' : timeLeft > 8 ? '#f59e0b' : '#ef4444'

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        title="Play: On-Call Simulator"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          background: theme.dark ? '#1e293b' : '#fff',
          border: `1.5px solid ${pulse ? theme.accent : theme.border}`,
          borderRadius: 14,
          padding: '12px 8px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          boxShadow: pulse
            ? `0 0 0 3px ${theme.accent}30, ${theme.shadow}`
            : theme.shadow,
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {pulse && (
          <motion.div
            style={{
              position: 'absolute', inset: -3, borderRadius: 16,
              border: `2px solid ${theme.accent}`,
              pointerEvents: 'none',
            }}
            animate={{ opacity: [0.8, 0], scale: [1, 1.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        <span style={{ fontSize: '1.3rem' }}>🎮</span>
        <span style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '0.55rem',
          color: theme.accent,
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          letterSpacing: '0.1em',
          fontWeight: 600,
        }}>
          PLAY
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              style={{
                position: 'fixed', inset: 0, zIndex: 100,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                ref={modalRef}
              style={{
                position: 'fixed',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 101,
                width: 'min(520px, 94vw)',
                maxHeight: '92vh',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                background: theme.bgCard,
                border: `1px solid ${theme.border}`,
                borderRadius: 20,
                boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
              }}
              onWheel={e => e.stopPropagation()}
              onTouchMove={e => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 20px 0',
              }}>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1.1rem', color: theme.text }}>
                    On-Call Simulator 🚨
                  </p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8rem', color: theme.textMuted, marginTop: 2 }}>
                    No experience needed. Just click the red ones.
                  </p>
                </div>
                <button onClick={handleClose} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: theme.textMuted, fontSize: '1.3rem', lineHeight: 1,
                  padding: 4,
                }}>✕</button>
              </div>

              <div style={{ padding: '12px 20px 20px' }}>
                <AnimatePresence mode="wait">

                  {/* IDLE */}
                  {phase === 'idle' && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div style={{
                        background: theme.bgAlt, borderRadius: 12, padding: '24px',
                        textAlign: 'center', marginBottom: 16,
                        border: `1px solid ${theme.border}`,
                      }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🖥️</div>
                        <p style={{ fontFamily: "'Inter',sans-serif", color: theme.textSecondary, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 4 }}>
                          Servers will start breaking. <strong style={{ color: theme.text }}>Click the blinking red ones</strong> before they fail and the incident escalates.
                        </p>
                        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: theme.textMuted, marginBottom: 20 }}>
                          30 seconds. 9 servers. How many can you save?
                        </p>
                        <button onClick={startGame} className="btn-primary" style={{ fontSize: '0.9rem' }}>
                          Start Incident Response
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* PLAYING */}
                  {phase === 'playing' && (
                    <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* HUD */}
                      <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                        <div style={{ background: theme.bgAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 14px', textAlign: 'center', minWidth: 70 }}>
                          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.58rem', color: theme.textMuted }}>FIXED</p>
                          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1.4rem', color: '#22c55e', lineHeight: 1.2 }}>{score}</p>
                        </div>
                        <div style={{ background: theme.bgAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 14px', textAlign: 'center', minWidth: 70 }}>
                          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.58rem', color: theme.textMuted }}>MISSED</p>
                          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1.4rem', color: missed > 3 ? '#ef4444' : theme.textSecondary, lineHeight: 1.2 }}>{missed}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.58rem', color: theme.textMuted }}>TIME</span>
                            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: timerColor, fontSize: '0.9rem' }}>{timeLeft}s</span>
                          </div>
                          <div style={{ height: 7, background: `${theme.border}`, borderRadius: 4, overflow: 'hidden' }}>
                            <motion.div style={{ height: '100%', background: timerColor, borderRadius: 4 }}
                              animate={{ width: `${(timeLeft / 30) * 100}%` }}
                              transition={{ duration: 0.5 }} />
                          </div>
                        </div>
                      </div>

                      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.6rem', color: theme.textMuted, marginBottom: 8, textAlign: 'center' }}>
                        Click the blinking red server before it fails!
                      </p>

                      {/* Server grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                        {SERVERS.map(server => {
                          const state = nodes[server.id]
                          const isCrit = state === 'critical'
                          const isFixing = state === 'fixing'
                          return (
                            <motion.button
                              key={server.id}
                              onClick={() => handleFix(server.id)}
                              animate={isCrit ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                              transition={isCrit ? { repeat: Infinity, duration: 0.5 } : {}}
                              style={{
                                background: isCrit ? '#ef444418' : isFixing ? '#f59e0b12' : theme.bgAlt,
                                border: `2px solid ${isCrit ? '#ef4444' : isFixing ? '#f59e0b' : theme.border}`,
                                borderRadius: 10,
                                padding: '10px 6px',
                                cursor: isCrit ? 'pointer' : 'default',
                                boxShadow: isCrit ? '0 0 14px rgba(239,68,68,0.4)' : 'none',
                                transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                              }}
                            >
                              <span style={{ fontSize: '1.25rem' }}>
                                {isCrit ? '⚠️' : isFixing ? '🔧' : server.icon}
                              </span>
                              <span style={{
                                fontFamily: "'JetBrains Mono',monospace",
                                fontSize: '0.55rem',
                                fontWeight: 600,
                                color: isCrit ? '#ef4444' : theme.textMuted,
                                textAlign: 'center',
                                lineHeight: 1.2,
                              }}>
                                {isCrit ? 'FIX ME!' : server.name}
                              </span>
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* DONE */}
                  {phase === 'done' && (
                    <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1rem', color: theme.text, marginBottom: 12 }}>
                          {score >= 10 ? '🏆 SRE Legend! You were born for on-call.' :
                           score >= 6  ? '🎯 Solid incident response. Your pager thanks you.' :
                           score >= 3  ? '📟 Not bad for your first incident!' :
                                         '😅 Production had a rough day. Try again!'}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 28 }}>
                          <div>
                            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '2.2rem', color: '#22c55e', lineHeight: 1 }}>{score}</p>
                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.75rem', color: theme.textMuted }}>Fixed</p>
                          </div>
                          <div style={{ width: 1, background: theme.border }} />
                          <div>
                            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '2.2rem', color: missed > 3 ? '#ef4444' : theme.textSecondary, lineHeight: 1 }}>{missed}</p>
                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.75rem', color: theme.textMuted }}>Missed</p>
                          </div>
                        </div>
                      </div>

                      <div style={{
                        background: `${theme.accent}08`, border: `1px solid ${theme.accent}20`,
                        borderRadius: 12, padding: '16px 18px', marginBottom: 18,
                      }}>
                        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.6rem', color: theme.accent, letterSpacing: '0.15em', marginBottom: 6 }}>
                          DEVOPS TIP
                        </p>
                        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.92rem', color: theme.text, marginBottom: 4 }}>
                          {tip.title}
                        </p>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.84rem', color: theme.textSecondary, lineHeight: 1.7 }}>
                          {tip.body}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={startGame} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}>
                          Play Again
                        </button>
                        <a href="#contact" onClick={handleClose}
                          className="btn-outline"
                          style={{ flex: 1, textDecoration: 'none', borderColor: theme.border, color: theme.textSecondary, justifyContent: 'center', fontSize: '0.85rem' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = theme.accent; (e.currentTarget as HTMLElement).style.color = theme.accent }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = theme.border; (e.currentTarget as HTMLElement).style.color = theme.textSecondary }}
                        >
                          Hire the engineer 😄
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
