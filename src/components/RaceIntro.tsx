import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Props {
  onComplete: () => void
  soundEnabled: boolean
}

// ── Bugatti Veyron-style SVG car (facing left) ─────────────────────────────
function BugattiCar({ racing }: { racing: boolean }) {
  const wheelStyle = (duration: string): React.CSSProperties => ({
    transformBox: 'fill-box' as const,
    transformOrigin: 'center',
    animationName: 'spin-cw',
    animationDuration: duration,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  })

  const spokes = (n: number, r1: number, r2: number, stroke: string, sw: number) =>
    Array.from({ length: n }).map((_, i) => {
      const a = (i * (360 / n) - 90) * (Math.PI / 180)
      return (
        <line
          key={i}
          x1={Math.cos(a) * r1} y1={Math.sin(a) * r1}
          x2={Math.cos(a) * r2} y2={Math.sin(a) * r2}
          stroke={stroke} strokeWidth={sw} strokeLinecap="round"
        />
      )
    })

  return (
    <svg
      viewBox="0 0 780 282"
      style={{ width: '100%', maxWidth: 740, height: 'auto', overflow: 'visible' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1e2e8e" />
          <stop offset="28%"  stopColor="#101c6a" />
          <stop offset="72%"  stopColor="#070d3a" />
          <stop offset="100%" stopColor="#020610" />
        </linearGradient>
        <linearGradient id="glossOver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.10)" />
          <stop offset="55%"  stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="shadowGrad" cx="50%" cy="0%" r="65%">
          <stop offset="0%" stopColor="rgba(0,180,255,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="hlGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="tlGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ground asphalt */}
      <rect x="0" y="257" width="780" height="25" fill="#0a0a0c" />
      <line x1="0" y1="257" x2="780" y2="257" stroke="#181818" strokeWidth="1.5" />

      {/* Ground glow */}
      <ellipse cx="385" cy="260" rx="310" ry="16" fill="url(#shadowGrad)" />
      {/* Car shadow */}
      <ellipse cx="385" cy="258" rx="295" ry="8" fill="rgba(0,0,0,0.7)" />

      {/* ── BODY ── */}
      <path
        d="M 52,242
           L 47,224
           L 63,204
           L 96,188
           L 148,175
           L 205,163
           L 258,153
           C 276,143 294,129 312,124
           L 415,119
           L 500,117
           L 562,123
           L 614,138
           L 658,156
           L 690,174
           L 713,196
           L 720,228
           L 720,242 Z"
        fill="url(#bodyGrad)"
      />
      {/* Gloss overlay */}
      <path
        d="M 52,242 L 47,224 L 63,204 L 96,188 L 148,175 L 205,163 L 258,153
           C 276,143 294,129 312,124 L 415,119 L 500,117 L 562,123
           L 614,138 L 658,156 L 690,174 L 713,196 L 720,228 L 720,242 Z"
        fill="url(#glossOver)"
      />

      {/* Windshield glass */}
      <path
        d="M 258,153
           C 276,143 294,130 313,125
           L 416,120 L 500,118 L 553,124
           C 547,137 537,148 521,153
           L 430,158 L 340,158 L 270,158 Z"
        fill="rgba(0,190,255,0.1)"
        stroke="rgba(0,210,255,0.38)"
        strokeWidth="1.5"
      />
      {/* Cockpit interior hint */}
      <line x1="275" y1="157" x2="514" y2="155" stroke="rgba(0,212,255,0.14)" strokeWidth="4" />

      {/* Body character line (cyan) */}
      <path d="M 70,207 C 200,195 500,188 692,182"
        fill="none" stroke="rgba(0,212,255,0.28)" strokeWidth="1.5" />
      {/* Lower highlight line */}
      <path d="M 55,230 L 716,230"
        fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="1" />

      {/* Rear vent slats (Bugatti signature side vent) */}
      {[0, 6, 12, 18].map(o => (
        <line key={o} x1={648 + o} y1={158} x2={648 + o} y2={230}
          stroke="rgba(0,212,255,0.28)" strokeWidth="1.2" />
      ))}

      {/* Front splitter */}
      <path d="M 48,230 L 125,230 L 112,242 L 52,242 Z"
        fill="#020610" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
      {/* Rear diffuser */}
      <path d="M 688,230 L 720,230 L 720,242 L 700,242 Z"
        fill="#020610" stroke="rgba(0,212,255,0.15)" strokeWidth="1" />

      {/* Front DRL strip */}
      <rect x="53" y="208" width="26" height="5" rx="2.5" fill="rgba(220,235,255,0.95)" filter="url(#hlGlow)" />
      {/* Main headlight lens */}
      <rect x="55" y="198" width="18" height="9" rx="1.5" fill="rgba(160,210,255,0.85)" />
      {/* Headlight glow spill */}
      <ellipse cx="25" cy="252" rx="90" ry="18" fill="rgba(180,220,255,0.06)" />

      {/* Taillights */}
      <rect x="710" y="195" width="10" height="20" rx="1.5" fill="#ff2200" filter="url(#tlGlow)" opacity="0.95" />
      <rect x="700" y="201" width="12" height="12" rx="1" fill="rgba(255,80,50,0.45)" />

      {/* Exhaust pipes */}
      {[0, 8].map(y => (
        <g key={y}>
          <rect x="695" y={230 + y} width="22" height="6" rx="3" fill="#252525" stroke="#484848" strokeWidth="0.5" />
          <ellipse cx="717" cy={233 + y} rx="2.2" ry="2.6" fill="#0a0a0a" stroke="#444" strokeWidth="0.5" />
        </g>
      ))}

      {/* ── FRONT WHEEL (cx=175, cy=240) ── */}
      <g transform="translate(175, 240)">
        <circle cx="0" cy="0" r="53" fill="#0d0d0d" />
        {/* Tire ridge */}
        <circle cx="0" cy="0" r="53" fill="none" stroke="#191919" strokeWidth="2.5" />
        {/* Rim outer */}
        <circle cx="0" cy="0" r="44" fill="none" stroke="#bebebe" strokeWidth="3" />
        {/* Rim face */}
        <circle cx="0" cy="0" r="40" fill="#111" />
        {/* Spokes */}
        <g style={wheelStyle(racing ? '0.07s' : '3s')}>
          {spokes(10, 19, 40, '#c8c8c8', 3)}
          {/* Center hub */}
          <circle cx="0" cy="0" r="19" fill="#1c1c1c" stroke="#aaa" strokeWidth="2" />
          <circle cx="0" cy="0" r="8"  fill="#666" />
          <circle cx="0" cy="0" r="4"  fill="#888" />
          {/* Brake caliper */}
          <rect x="-6" y="-44" width="12" height="8" rx="1.5" fill="#c80000" />
        </g>
        {/* Outer bead */}
        <circle cx="0" cy="0" r="53" fill="none" stroke="rgba(200,200,200,0.12)" strokeWidth="5" />
      </g>

      {/* ── REAR WHEEL (cx=575, cy=240) ── */}
      <g transform="translate(575, 240)">
        <circle cx="0" cy="0" r="62" fill="#0d0d0d" />
        <circle cx="0" cy="0" r="62" fill="none" stroke="#191919" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="52" fill="none" stroke="#bebebe" strokeWidth="3.5" />
        <circle cx="0" cy="0" r="47" fill="#111" />
        <g style={wheelStyle(racing ? '0.07s' : '3s')}>
          {spokes(10, 22, 47, '#c8c8c8', 3.5)}
          <circle cx="0" cy="0" r="22" fill="#1c1c1c" stroke="#aaa" strokeWidth="2" />
          <circle cx="0" cy="0" r="9"  fill="#666" />
          <circle cx="0" cy="0" r="5"  fill="#888" />
          <rect x="-7" y="-51" width="14" height="9" rx="1.5" fill="#c80000" />
        </g>
        <circle cx="0" cy="0" r="62" fill="none" stroke="rgba(200,200,200,0.12)" strokeWidth="5" />
      </g>
    </svg>
  )
}

// ── Dust particles canvas ──────────────────────────────────────────────────
function DustCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle {
      x: number; y: number; vx: number; vy: number
      r: number; opacity: number; color: string
    }

    const CAR_REAR_X = window.innerWidth / 2 + 340
    const CAR_Y = window.innerHeight / 2 + 40

    const particles: Particle[] = Array.from({ length: 60 }).map(() => ({
      x: CAR_REAR_X - Math.random() * 30,
      y: CAR_Y + (Math.random() - 0.4) * 60,
      vx: 3 + Math.random() * 6,
      vy: (Math.random() - 0.5) * 2,
      r: 4 + Math.random() * 14,
      opacity: 0.55 + Math.random() * 0.35,
      color: Math.random() > 0.5 ? '#8a7a5a' : '#c0b090',
    }))

    let running = true
    let frame = 0

    const loop = () => {
      if (!running) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      for (const p of particles) {
        p.x += p.vx
        p.vx *= 0.97
        p.vy += 0.04
        p.y += p.vy
        p.r *= 1.025
        p.opacity *= 0.96

        if (p.opacity < 0.01) continue

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.filter = 'blur(3px)'
        ctx.fill()
        ctx.filter = 'none'
        ctx.globalAlpha = 1
      }

      if (frame < 80) requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
    return () => { running = false }
  }, [active])

  if (!active) return null
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}
    />
  )
}

// ── Typewriter for intro caption ───────────────────────────────────────────
function Typewriter({ text, started }: { text: string; started: boolean }) {
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (!started) return
    setChars(0)
    let i = 0
    const id = setInterval(() => {
      i++
      setChars(i)
      if (i >= text.length) clearInterval(id)
    }, 42)
    return () => clearInterval(id)
  }, [started, text])

  return (
    <span>
      {text.slice(0, chars)}
      {chars < text.length && started && (
        <span style={{ opacity: 0.8, animation: 'blink 0.8s step-end infinite' }}>|</span>
      )}
    </span>
  )
}

// ── Sound engine ──────────────────────────────────────────────────────────
function playTireScreech(soundEnabled: boolean) {
  if (!soundEnabled) return
  try {
    const ctx = new AudioContext()

    // White noise → screech
    const dur = 1.4
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource()
    noise.buffer = buf

    const f1 = ctx.createBiquadFilter()
    f1.type = 'bandpass'
    f1.frequency.setValueAtTime(3200, ctx.currentTime)
    f1.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 1.1)
    f1.Q.value = 14

    const f2 = ctx.createBiquadFilter()
    f2.type = 'highpass'
    f2.frequency.value = 180

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0, ctx.currentTime)
    noiseGain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.06)
    noiseGain.gain.setValueAtTime(0.14, ctx.currentTime + 0.55)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3)

    noise.connect(f1); f1.connect(f2); f2.connect(noiseGain); noiseGain.connect(ctx.destination)
    noise.start(); noise.stop(ctx.currentTime + dur)

    // Engine roar
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(72, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(310, ctx.currentTime + 0.75)
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 1.2)

    const ws = ctx.createWaveShaper()
    const curve = new Float32Array(512)
    for (let i = 0; i < 512; i++) {
      const x = (i * 2 / 512) - 1
      curve[i] = Math.tanh(x * 4.5) / Math.tanh(4.5)
    }
    ws.curve = curve

    const engGain = ctx.createGain()
    engGain.gain.setValueAtTime(0.1, ctx.currentTime)
    engGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.35)
    engGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)

    osc.connect(ws); ws.connect(engGain); engGain.connect(ctx.destination)
    osc.start(); osc.stop(ctx.currentTime + 1.2)
  } catch {}
}

// ── Main Component ────────────────────────────────────────────────────────
export default function RaceIntro({ onComplete, soundEnabled }: Props) {
  const [phase, setPhase] = useState<'zoom' | 'race'>('zoom')
  const [dust, setDust] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const [showLines, setShowLines] = useState(false)
  const [exiting, setExiting] = useState(false)
  const interacted = useRef(false)

  useEffect(() => {
    const unlock = () => { interacted.current = true }
    window.addEventListener('click', unlock, { once: true })
    window.addEventListener('touchstart', unlock, { once: true })

    const T = (fn: () => void, ms: number) => setTimeout(fn, ms)
    const timers = [
      T(() => {
        setPhase('race')
        setShowLines(true)
        setDust(true)
        playTireScreech(soundEnabled)
      }, 1700),
      T(() => setShowText(true), 2100),
      T(() => setShowLines(false), 2800),
      T(() => setShowScroll(true), 3500),
      T(() => { setExiting(true); setTimeout(onComplete, 650) }, 5200),
    ]

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('click', unlock)
      window.removeEventListener('touchstart', unlock)
    }
  }, [onComplete, soundEnabled])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="race-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#02040e', overflow: 'hidden',
          }}
        >
          {/* Subtle asphalt grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px', pointerEvents: 'none',
          }} />

          {/* Ambient vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(30,46,142,0.12) 0%, rgba(0,0,0,0.6) 100%)',
          }} />

          {/* Speed lines */}
          <AnimatePresence>
            {showLines && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.7 } }}
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 3 }}
              >
                {Array.from({ length: 36 }).map((_, i) => (
                  <motion.div key={i}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: [0, i % 6 === 0 ? 0.55 : 0.2, 0] }}
                    transition={{ duration: 0.4 + (i % 5) * 0.05, delay: i * 0.006 }}
                    style={{
                      position: 'absolute', top: `${1.5 + i * 2.7}%`, left: 0, right: 0,
                      height: i % 8 === 0 ? 2 : 1, transformOrigin: 'left',
                      background: i % 10 === 0
                        ? 'rgba(255,50,100,0.35)'
                        : `rgba(0,212,255,${0.06 + (i % 6) * 0.03})`,
                    }}
                  />
                ))}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.6) 100%)',
                }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dust particles canvas */}
          <DustCanvas active={dust} />

          {/* ── THE CAR (zoom from tire level) ── */}
          <motion.div
            initial={{ scale: 7, y: '48%', filter: 'blur(0px)' }}
            animate={
              phase === 'zoom'
                ? { scale: 1, y: '0%', filter: 'blur(0px)' }
                : { scale: 1, y: '0%', x: '-150vw', filter: 'blur(14px)' }
            }
            transition={
              phase === 'zoom'
                ? { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.5, ease: [0.55, 0, 1, 0.45] }
            }
            style={{
              position: 'relative', zIndex: 10,
              width: 'min(92vw, 740px)',
            }}
          >
            <BugattiCar racing={phase === 'race'} />
          </motion.div>

          {/* ── CAPTION TEXT ── */}
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', bottom: '14%',
                left: 0, right: 0, textAlign: 'center',
                padding: '0 24px', zIndex: 20,
              }}
            >
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                color: '#ffffff',
                letterSpacing: '0.04em',
                lineHeight: 1.5,
                textShadow: '0 2px 30px rgba(0,0,0,0.8)',
                fontWeight: 500,
              }}>
                <Typewriter text="Hi, I'm Sai Krishna. Be curious, be kind." started={showText} />
              </p>

              {showScroll && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: [0, 0.7, 0.4, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 'clamp(0.6rem, 1.4vw, 0.78rem)',
                    color: 'rgba(0,212,255,0.75)',
                    marginTop: 18,
                    letterSpacing: '0.22em',
                  }}
                >
                  SCROLL DOWN TO KNOW MORE ↓
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Skip */}
          <button
            onClick={() => { setExiting(true); setTimeout(onComplete, 450) }}
            style={{
              position: 'absolute', bottom: 24, right: 24,
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
              color: 'rgba(200,220,255,0.35)', background: 'none',
              border: '1px solid rgba(200,220,255,0.15)', padding: '6px 14px',
              cursor: 'pointer', zIndex: 30, transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(200,220,255,0.9)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,220,255,0.35)')}
          >
            [ SKIP ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
