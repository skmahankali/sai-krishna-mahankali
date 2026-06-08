import { useEffect, useRef, useState } from 'react'

const GAME_W = 420
const GAME_H = 185
const GROUND_Y = GAME_H - 28
const PLAYER_X = 48
const GRAVITY = 0.55
const JUMP_FORCE = -10.5

interface Obstacle {
  x: number
  w: number
  h: number
  label: string
}

type GameState = 'idle' | 'playing' | 'dead'

const OBS_LABELS = ['BUG', 'P0', 'OOM', 'OUTAGE', 'DEBT', 'LEAK', 'CVE']

function beep(freq: number, duration: number, type: OscillatorType = 'square', vol = 0.08) {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {}
}

function beepSlide(from: number, to: number, duration: number, vol = 0.1) {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(from, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(to, ctx.currentTime + duration)
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {}
}

export default function FloatingGame() {
  const [open, setOpen] = useState(false)
  const [gameState, setGameState] = useState<GameState>('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    beep(600, 0.1, 'square', 0.07)
  }

  useEffect(() => {
    if (!open || gameState !== 'playing') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gs = {
      y: GROUND_Y - 22,
      vy: 0,
      onGround: true,
      obstacles: [] as Obstacle[],
      frame: 0,
      score: 0,
      alive: true,
      playerFrame: 0,
    }

    const doJump = () => {
      if (gs.onGround && gs.alive) {
        gs.vy = JUMP_FORCE
        gs.onGround = false
        beep(520, 0.08, 'square', 0.06)
      }
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        doJump()
      }
      if (e.code === 'ArrowUp') {
        e.preventDefault()
        doJump()
      }
    }
    window.addEventListener('keydown', handleKey)
    canvas.addEventListener('click', doJump)

    let animId: number
    let running = true

    const loop = () => {
      if (!running || !gs.alive) return

      gs.vy += GRAVITY
      gs.y += gs.vy
      if (gs.y >= GROUND_Y - 22) {
        gs.y = GROUND_Y - 22
        gs.vy = 0
        gs.onGround = true
      }

      gs.frame++
      gs.playerFrame++
      const spawnInterval = Math.max(52, 110 - Math.floor(gs.score / 6))
      if (gs.frame % spawnInterval === 0) {
        gs.obstacles.push({
          x: GAME_W + 10,
          w: 14,
          h: 22 + Math.floor(Math.random() * 26),
          label: OBS_LABELS[Math.floor(Math.random() * OBS_LABELS.length)],
        })
      }

      const speed = 3.8 + gs.score / 90
      gs.obstacles = gs.obstacles
        .map(o => ({ ...o, x: o.x - speed }))
        .filter(o => o.x > -30)

      gs.score += 0.1
      setScore(Math.floor(gs.score))

      const px = PLAYER_X, py = gs.y, pw = 18, ph = 20
      for (const o of gs.obstacles) {
        const ox = o.x, oy = GROUND_Y - o.h, ow = o.w, oh = o.h
        if (px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy) {
          gs.alive = false
          running = false
          setHighScore(prev => Math.max(prev, Math.floor(gs.score)))
          setGameState('dead')
          beepSlide(300, 40, 0.5)
          return
        }
      }

      // ── Draw ──
      ctx.clearRect(0, 0, GAME_W, GAME_H)

      // bg
      ctx.fillStyle = '#050a0e'
      ctx.fillRect(0, 0, GAME_W, GAME_H)

      // grid
      ctx.strokeStyle = 'rgba(0,255,136,0.04)'
      ctx.lineWidth = 1
      for (let x = 0; x < GAME_W; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, GAME_H); ctx.stroke()
      }
      for (let y = 0; y < GAME_H; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(GAME_W, y); ctx.stroke()
      }

      // ground
      ctx.strokeStyle = 'rgba(0,255,136,0.45)'
      ctx.lineWidth = 2
      ctx.setLineDash([6, 4])
      ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(GAME_W, GROUND_Y); ctx.stroke()
      ctx.setLineDash([])

      // player (K8s wheel symbol, bobbing)
      const bob = gs.onGround ? Math.sin(gs.playerFrame * 0.18) * 1.5 : 0
      ctx.fillStyle = '#00ff88'
      ctx.shadowBlur = 12
      ctx.shadowColor = '#00ff88'
      ctx.font = 'bold 22px monospace'
      ctx.fillText('⎈', PLAYER_X - 2, gs.y + 19 + bob)
      ctx.shadowBlur = 0

      // velocity trail
      if (!gs.onGround) {
        ctx.fillStyle = 'rgba(0,255,136,0.15)'
        ctx.font = '22px monospace'
        ctx.fillText('⎈', PLAYER_X - 10, gs.y + 19 + bob)
      }

      // obstacles
      for (const o of gs.obstacles) {
        const oy = GROUND_Y - o.h
        const gradient = ctx.createLinearGradient(o.x, oy, o.x, GROUND_Y)
        gradient.addColorStop(0, 'rgba(255,0,110,0.9)')
        gradient.addColorStop(1, 'rgba(180,0,60,0.9)')
        ctx.fillStyle = gradient
        ctx.shadowBlur = 8
        ctx.shadowColor = '#ff006e'
        ctx.fillRect(o.x, oy, o.w, o.h)
        ctx.shadowBlur = 0

        ctx.fillStyle = '#050a0e'
        ctx.font = `bold 5px "JetBrains Mono", monospace`
        ctx.textAlign = 'center'
        ctx.fillText(o.label, o.x + o.w / 2, oy - 4)
        ctx.textAlign = 'left'
      }

      // score
      ctx.fillStyle = '#ffd700'
      ctx.font = '7px "Press Start 2P", monospace'
      ctx.fillText(`UPTIME: ${Math.floor(gs.score)}s`, 6, 14)

      // speed indicator
      ctx.fillStyle = `rgba(0,255,136,${0.2 + Math.min(gs.score / 200, 0.5)})`
      ctx.font = '6px "JetBrains Mono", monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`${(speed).toFixed(1)}x`, GAME_W - 6, 14)
      ctx.textAlign = 'left'

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      window.removeEventListener('keydown', handleKey)
      canvas.removeEventListener('click', doJump)
    }
  }, [open, gameState])

  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 200 }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          title="Play Incident Runner!"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.52rem',
            color: '#00ff88',
            background: '#050a0e',
            border: '2px solid rgba(0,255,136,0.55)',
            padding: '10px 16px',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(0,255,136,0.25)',
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            position: 'relative',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,136,0.6)'; e.currentTarget.style.borderColor = '#00ff88' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,136,0.25)'; e.currentTarget.style.borderColor = 'rgba(0,255,136,0.55)' }}
        >
          <span style={{ fontSize: '1.1rem' }}>🎮</span>
          <span>MINI GAME</span>
          <span style={{
            position: 'absolute',
            top: -10,
            right: -10,
            background: '#ff006e',
            color: '#fff',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.34rem',
            padding: '3px 6px',
            animation: 'pulse-ring 1.2s infinite',
            boxShadow: '0 0 10px rgba(255,0,110,0.7)',
            letterSpacing: '0.05em',
          }}>
            TRY ME!
          </span>
        </button>
      ) : (
        <div style={{
          background: '#0a1520',
          border: '2px solid rgba(0,255,136,0.4)',
          boxShadow: '0 0 30px rgba(0,255,136,0.2)',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 8px',
            background: 'rgba(0,255,136,0.07)',
            borderBottom: '1px solid rgba(0,255,136,0.2)',
          }}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem', color: '#ffd700' }}>
              ⎈ INCIDENT RUNNER
            </span>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,215,0,0.6)' }}>
                HI:{highScore}s
              </span>
              <button
                onClick={() => { setOpen(false); setGameState('idle') }}
                style={{ background: 'none', border: 'none', color: '#ff006e', cursor: 'pointer', fontSize: '0.75rem', lineHeight: 1, padding: 0 }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Game Canvas */}
          <div style={{ position: 'relative' }}>
            <canvas
              ref={canvasRef}
              width={GAME_W}
              height={GAME_H}
              style={{ display: 'block', cursor: gameState === 'playing' ? 'crosshair' : 'default' }}
            />

            {gameState !== 'playing' && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(5,10,14,0.88)',
              }}>
                {gameState === 'dead' && (
                  <>
                    <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.55rem', color: '#ff006e', marginBottom: 6, textShadow: '0 0 12px rgba(255,0,110,0.9)' }}>
                      INCIDENT DETECTED!
                    </p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: 'rgba(0,255,136,0.6)', marginBottom: 14 }}>
                      Uptime: {score}s
                    </p>
                  </>
                )}
                {gameState === 'idle' && (
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: 'rgba(0,255,136,0.5)', marginBottom: 14, textAlign: 'center', padding: '0 20px', lineHeight: 1.6 }}>
                    Jump over incidents!<br />SPACE / tap to jump
                  </p>
                )}
                <button
                  onClick={startGame}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '0.42rem',
                    color: '#00ff88',
                    background: 'none',
                    border: '2px solid #00ff88',
                    padding: '7px 16px',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(0,255,136,0.35)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {gameState === 'dead' ? '[ RESTART ]' : '[ START ]'}
                </button>
              </div>
            )}
          </div>

          <div style={{
            padding: '3px 8px',
            borderTop: '1px solid rgba(0,255,136,0.1)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.48rem',
            color: 'rgba(0,255,136,0.28)',
            textAlign: 'center',
          }}>
            SPACE / CLICK to jump · dodge the incidents
          </div>
        </div>
      )}
    </div>
  )
}
