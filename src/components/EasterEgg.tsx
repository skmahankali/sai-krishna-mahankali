import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

const MESSAGES = [
  '⚡ CHEAT CODE ACTIVATED ⚡',
  'GOD MODE: ON',
  '∞ AUTOMATION UNLOCKED ∞',
  'YOU FOUND THE SECRET',
  '🎮 PLAYER TWO HAS ENTERED THE CHAT',
]

export default function EasterEgg() {
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState('')
  const [crtMode, setCrtMode] = useState(false)
  const sequenceRef = useRef<string[]>([])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      sequenceRef.current = [...sequenceRef.current, e.key].slice(-KONAMI.length)
      if (JSON.stringify(sequenceRef.current) === JSON.stringify(KONAMI)) {
        const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
        setMessage(msg)
        setActive(true)
        setTimeout(() => setActive(false), 3500)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // CRT mode toggle (exposed via custom event)
  useEffect(() => {
    const handleCrt = () => {
      setCrtMode(prev => {
        const next = !prev
        document.body.classList.toggle('crt-mode', next)
        return next
      })
    }
    window.addEventListener('toggle-crt', handleCrt)
    return () => window.removeEventListener('toggle-crt', handleCrt)
  }, [])

  return (
    <AnimatePresence>
      {active && (
        <>
          {/* Rainbow flash overlay */}
          <motion.div
            key="flash"
            className="konami-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Big message */}
          <motion.div
            key="msg"
            className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="text-center px-8">
              <p
                className="font-pixel mb-4"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(1rem, 4vw, 2rem)',
                  color: '#ffd700',
                  textShadow: '0 0 30px rgba(255,215,0,1), 0 0 60px rgba(255,215,0,0.5)',
                  animation: 'glitch-1 0.3s infinite',
                }}
              >
                {message}
              </p>
              <p
                className="font-mono text-sm"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#00ff88',
                  textShadow: '0 0 15px rgba(0,255,136,0.8)',
                }}
              >
                ↑↑↓↓←→←→BA — you absolute legend
              </p>
            </div>
          </motion.div>

          {/* Confetti particles */}
          <motion.div
            key="confetti"
            className="fixed inset-0 z-[10001] pointer-events-none overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  background: ['#00ff88', '#ffd700', '#ff006e', '#00aaff'][i % 4],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [0, (Math.random() - 0.5) * 200],
                  rotate: [0, Math.random() * 720],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1.5 + Math.random() * 1.5,
                  ease: 'easeIn',
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
