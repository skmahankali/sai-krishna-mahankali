import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import TerminalWindow from './TerminalWindow'

const ROLES = [
  'Infrastructure Automation Engineer',
  'Site Reliability Engineer',
  'AIOps Enthusiast',
  'Cloud Native Builder',
  'Kubernetes Wrangler',
]

const SOCIALS = [
  { label: 'GitHub',    href: 'https://github.com/skmahankali',                                        Icon: Github,    tooltip: 'github.com/skmahankali' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/skmaha/',                                   Icon: Linkedin,  tooltip: 'linkedin.com/in/skmaha' },
  { label: 'Instagram', href: 'https://www.instagram.com/_d3ad_shot_?igsh=MXZhNmdmdmVnYnN3ZA%3D%3D', Icon: Instagram, tooltip: '@d3ad_shot' },
  { label: 'Email',     href: 'mailto:saikrishna.mahankali98@gmail.com',                               Icon: Mail,      tooltip: 'saikrishna.mahankali98@gmail.com' },
]

function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const target = ROLES[idx]
    if (typing) {
      if (text.length < target.length) {
        const t = setTimeout(() => setText(target.slice(0, text.length + 1)), 48)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2400)
        return () => clearTimeout(t)
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 25)
        return () => clearTimeout(t)
      } else {
        setIdx(i => (i + 1) % ROLES.length)
        setTyping(true)
      }
    }
  }, [text, typing, idx])

  return (
    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', fontWeight: 500 }}>
      {text}
      <span className="blink" style={{ marginLeft: 2, opacity: 0.7 }}>|</span>
    </span>
  )
}

export default function Hero() {
  const theme = useTheme()

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 1.5rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient orbs — cyan top-left, purple bottom-right */}
      <div className="orb-pulse" style={{
        position: 'absolute', top: '-5%', left: '-8%',
        width: 600, height: 600, borderRadius: '50%',
        background: theme.dark
          ? 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div className="orb-pulse-slow" style={{
        position: 'absolute', bottom: '-10%', right: '-8%',
        width: 650, height: 650, borderRadius: '50%',
        background: theme.dark
          ? 'radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: 48,
          alignItems: 'center',
        }}>
          <div>
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 32 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', fontWeight: 500,
              color: theme.accent,
              background: theme.accentSoft,
              border: `1px solid ${theme.dark ? 'rgba(59,130,246,0.25)' : 'rgba(37,99,235,0.2)'}`,
              borderRadius: 100,
              padding: '6px 14px',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', flexShrink: 0 }} />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="section-title"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                color: theme.text,
                marginBottom: 8,
                lineHeight: 1.1,
              }}
            >
              Sai Krishna
            </h1>
            <h1
              className="section-title gradient-text"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                marginBottom: 28,
                lineHeight: 1.1,
              }}
            >
              Mahankali.
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ color: theme.textSecondary, marginBottom: 20, minHeight: '1.7em' }}
          >
            <Typewriter />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: theme.textMuted,
              lineHeight: 1.7,
              maxWidth: 540,
              marginBottom: 44,
            }}
          >
            "Automating with purpose, engineering with curiosity."
            <br />
            6+ years building infrastructure at scale at{' '}
            <span style={{ color: theme.textSecondary, fontWeight: 500 }}>T. Rowe Price</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 52 }}
          >
            <a href="#projects" className="btn-primary">
              View my work ↓
            </a>
            <a
              href="#contact"
              className="btn-outline"
              style={{
                borderColor: theme.border,
                color: theme.text,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = theme.accent
                ;(e.currentTarget as HTMLElement).style.color = theme.accent
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = theme.border
                ;(e.currentTarget as HTMLElement).style.color = theme.text
              }}
            >
              Get in touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: 12, alignItems: 'center' }}
          >
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.tooltip}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 42, height: 42, borderRadius: 10,
                  background: theme.dark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.05)',
                  border: `1px solid ${theme.border}`,
                  color: theme.textMuted,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = theme.accent
                  el.style.borderColor = theme.accent
                  el.style.background = theme.accentSoft
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = theme.textMuted
                  el.style.borderColor = theme.border
                  el.style.background = theme.dark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.05)'
                  el.style.transform = 'none'
                }}
              >
                <s.Icon size={18} />
              </a>
            ))}
          </motion.div>
          </div>

          {/* Terminal panel — hidden on mobile */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} className="hero-terminal">
            <TerminalWindow />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="bounce-down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}
      >
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: theme.textMuted, letterSpacing: '0.1em' }}>
          scroll
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: theme.textMuted }}>
          <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
