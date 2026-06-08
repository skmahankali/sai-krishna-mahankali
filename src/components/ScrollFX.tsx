import { useEffect, useRef } from 'react'

export default function ScrollFX({ soundEnabled = true }: { soundEnabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const opacityRef = useRef(0)
  const lastY = useRef(0)
  const lastTime = useRef(Date.now())
  const audioCtxRef = useRef<AudioContext | null>(null)
  const soundCooldownRef = useRef(false)
  const animIdRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext('2d')
    if (!ctx2d) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Render loop ──
    const render = () => {
      const op = opacityRef.current
      ctx2d.clearRect(0, 0, canvas.width, canvas.height)

      if (op > 0.02) {
        // Horizontal speed lines
        const lineCount = Math.floor(18 + op * 15)
        for (let i = 0; i < lineCount; i++) {
          const y = (canvas.height / lineCount) * i + canvas.height / lineCount / 2
          const length = (canvas.width * 0.25 + Math.random() * canvas.width * 0.55) * op
          const x = Math.random() * canvas.width * 0.25

          ctx2d.strokeStyle = i % 8 === 0
            ? `rgba(255,0,110,${(0.1 + Math.random() * 0.08) * op})`
            : `rgba(0,255,136,${(0.04 + Math.random() * 0.08) * op})`
          ctx2d.lineWidth = i % 6 === 0 ? 2 : 1
          ctx2d.beginPath()
          ctx2d.moveTo(x, y)
          ctx2d.lineTo(x + length, y)
          ctx2d.stroke()
        }

        // Vertical streaks (aerial feel)
        for (let i = 0; i < Math.floor(op * 6); i++) {
          const x = Math.random() * canvas.width
          ctx2d.strokeStyle = `rgba(0,255,136,${0.03 * op})`
          ctx2d.lineWidth = 1
          ctx2d.beginPath()
          ctx2d.moveTo(x, 0)
          ctx2d.lineTo(x, canvas.height)
          ctx2d.stroke()
        }

        // Vignette
        const vg = ctx2d.createRadialGradient(
          canvas.width / 2, canvas.height / 2, canvas.height * 0.05,
          canvas.width / 2, canvas.height / 2, canvas.height * 0.9,
        )
        vg.addColorStop(0, 'rgba(0,0,0,0)')
        vg.addColorStop(1, `rgba(0,0,0,${0.45 * op})`)
        ctx2d.fillStyle = vg
        ctx2d.fillRect(0, 0, canvas.width, canvas.height)

        // Top/bottom warp bars
        const barH = 4 * op
        ctx2d.fillStyle = `rgba(0,255,136,${0.1 * op})`
        ctx2d.fillRect(0, 0, canvas.width, barH)
        ctx2d.fillRect(0, canvas.height - barH, canvas.width, barH)

        opacityRef.current *= 0.80
      }

      animIdRef.current = requestAnimationFrame(render)
    }

    animIdRef.current = requestAnimationFrame(render)

    // ── Sound ──
    const playWhoosh = (intensity: number) => {
      if (!soundEnabled || soundCooldownRef.current) return
      soundCooldownRef.current = true
      setTimeout(() => { soundCooldownRef.current = false }, 280)

      try {
        const actx = audioCtxRef.current || (audioCtxRef.current = new AudioContext())
        if (actx.state === 'suspended') actx.resume()

        const osc = actx.createOscillator()
        const gain = actx.createGain()
        const filter = actx.createBiquadFilter()

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(actx.destination)

        filter.type = 'bandpass'
        filter.frequency.value = 600
        filter.Q.value = 0.8

        osc.type = 'sawtooth'
        const vol = 0.04 + intensity * 0.05
        const dur = 0.22 + intensity * 0.1

        osc.frequency.setValueAtTime(900 + intensity * 200, actx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(80, actx.currentTime + dur)
        gain.gain.setValueAtTime(vol, actx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur)
        osc.start()
        osc.stop(actx.currentTime + dur)
      } catch {}
    }

    // ── Scroll handler ──
    const handleScroll = () => {
      const now = Date.now()
      const dt = Math.max(now - lastTime.current, 1)
      const dy = Math.abs(window.scrollY - lastY.current)
      const velocity = (dy / dt) * 1000

      lastY.current = window.scrollY
      lastTime.current = now

      if (velocity > 280) {
        const intensity = Math.min((velocity - 280) / 600, 1)
        opacityRef.current = Math.min(opacityRef.current + intensity * 0.8, 1)
        playWhoosh(intensity)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resize)
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 90,
      }}
    />
  )
}
