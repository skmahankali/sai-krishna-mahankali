import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; opacity: number
}

export default function ParticleWeb() {
  const theme = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const darkRef = useRef(theme.dark)

  useEffect(() => { darkRef.current = theme.dark }, [theme.dark])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = 55
    const MAX_DIST = 130

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 1.8 + 0.8,
      opacity: Math.random() * 0.5 + 0.25,
    }))

    let rafId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = darkRef.current
      // Teal/cyan primary, purple secondary — matching the old site vibe
      const dotColor   = isDark ? '96,165,250'  : '37,99,235'
      const lineColor  = isDark ? '99,102,241'  : '99,102,241'
      const dotAlpha   = isDark ? 0.55 : 0.25
      const lineAlpha  = isDark ? 0.12 : 0.06

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotColor},${p.opacity * dotAlpha})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x, dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = lineAlpha * (1 - dist / MAX_DIST)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${lineColor},${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      })

      rafId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, []) // runs once — reads dark via ref

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: theme.dark ? 1 : 0.7,
        transition: 'opacity 0.4s',
      }}
    />
  )
}
