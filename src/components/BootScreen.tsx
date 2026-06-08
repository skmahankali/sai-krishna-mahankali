import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Props {
  onComplete: () => void
}

const BOOT_LINES = [
  { text: 'BIOS v2.4.1 initialized ..................... [OK]', delay: 0 },
  { text: 'CPU: SAI_BRAIN_v4.0 @ 999MHz ............... [OK]', delay: 180 },
  { text: 'RAM: 32GB caffeine-backed memory ........... [OK]', delay: 320 },
  { text: 'Detecting hardware: k8s cluster ............ [OK]', delay: 480 },
  { text: 'Detecting hardware: terraform modules ...... [OK]', delay: 620 },
  { text: 'Detecting hardware: ansible playbooks ...... [OK]', delay: 760 },
  { text: 'Mounting filesystems ....................... [OK]', delay: 900 },
  { text: 'Starting infrastructure services ........... [OK]', delay: 1050 },
  { text: 'Checking for manual processes .............. [NONE FOUND]', delay: 1200 },
  { text: 'Loading automation scripts ................. [OK]', delay: 1380 },
  { text: 'Spawning shell: /usr/bin/sai ............... [OK]', delay: 1550 },
  { text: '', delay: 1700 },
  { text: '>>> LOADING SAI.EXE ...', delay: 1800 },
]

export default function BootScreen({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay))
    })

    // Progress bar
    const progressSteps = 20
    for (let i = 1; i <= progressSteps; i++) {
      timers.push(
        setTimeout(() => setProgress(i * (100 / progressSteps)), 1900 + i * 60)
      )
    }

    // Done
    timers.push(setTimeout(() => setDone(true), 3200))

    // Auto-exit
    timers.push(
      setTimeout(() => {
        setExiting(true)
        setTimeout(onComplete, 600)
      }, 4000)
    )

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const handleSkip = () => {
    setExiting(true)
    setTimeout(onComplete, 400)
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: '#050a0e' }}
        >
          {/* Scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
            }}
          />

          <div className="w-full max-w-2xl px-6 relative z-10">
            {/* Header */}
            <div className="mb-8 border-b border-green-500/20 pb-4">
              <p className="font-pixel text-green-400 text-xs mb-1" style={{ color: '#00ff88', fontFamily: "'Press Start 2P', monospace" }}>
                SAI.EXE BOOTSTRAP v4.0
              </p>
              <p className="font-mono text-xs" style={{ color: 'rgba(0,255,136,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
                © 2024 Sai Krishna Mahankali. All rights reserved.
              </p>
            </div>

            {/* Boot lines */}
            <div className="space-y-1 mb-8 min-h-[280px]">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="font-mono text-xs leading-relaxed"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    color: line.text.includes('[NONE FOUND]')
                      ? '#ffd700'
                      : line.text.startsWith('>>>')
                      ? '#00ff88'
                      : 'rgba(0,255,136,0.7)',
                    textShadow: line.text.startsWith('>>>') ? '0 0 10px rgba(0,255,136,0.8)' : 'none',
                  }}
                >
                  {line.text || ' '}
                  {i === visibleLines - 1 && !done && (
                    <span className="blink" style={{ color: '#00ff88' }}>█</span>
                  )}
                </motion.p>
              ))}
            </div>

            {/* Progress bar */}
            {visibleLines >= BOOT_LINES.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-xs" style={{ color: 'rgba(0,255,136,0.6)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem' }}>
                    LOADING SAI.EXE
                  </span>
                  <span className="font-mono text-xs" style={{ color: '#00ff88', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem' }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="boot-progress-track">
                  <div
                    className="boot-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.div>
            )}

            {/* System ready */}
            {done && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mt-4"
              >
                <p
                  className="font-pixel text-sm mb-3"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    color: '#ffd700',
                    textShadow: '0 0 20px rgba(255,215,0,0.8)',
                    fontSize: '0.7rem',
                  }}
                >
                  ✦ SYSTEM READY ✦
                </p>
                <p className="blink font-mono text-xs" style={{ color: '#00ff88', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' }}>
                  Entering portfolio...
                </p>
              </motion.div>
            )}
          </div>

          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="absolute bottom-6 right-6 font-mono text-xs transition-all hover:opacity-100"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              color: 'rgba(0,255,136,0.4)',
              background: 'none',
              border: '1px solid rgba(0,255,136,0.2)',
              padding: '6px 14px',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00ff88')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,255,136,0.4)')}
          >
            [ SKIP ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
