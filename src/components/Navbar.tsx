import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '../context/ThemeContext'

const NAV_ITEMS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const theme = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.35 }
    )
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled
          ? theme.dark ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.border}` : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(59,130,246,0.4)',
          }}>
            <span style={{ color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '0.9rem' }}>S</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: '0.88rem', color: theme.text, letterSpacing: '0.02em' }}>
            ~/
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 4 }}>
          {NAV_ITEMS.map(item => {
            const isActive = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? theme.accent : theme.textSecondary,
                  textDecoration: 'none',
                  padding: '6px 14px',
                  borderRadius: 6,
                  background: isActive ? theme.accentSoft : 'transparent',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = theme.text }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = theme.textSecondary }}
              >
                {item.label}
              </a>
            )
          })}

          {/* Theme toggle */}
          <button
            onClick={theme.toggle}
            title={theme.dark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              marginLeft: 8,
              width: 38, height: 38,
              borderRadius: 8,
              background: theme.dark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)',
              border: `1px solid ${theme.border}`,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem',
              transition: 'all 0.2s',
              color: theme.textSecondary,
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = theme.accentSoft}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = theme.dark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)'}
          >
            {theme.dark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="flex md:hidden" style={{ alignItems: 'center', gap: 8 }}>
          <button
            onClick={theme.toggle}
            style={{
              width: 36, height: 36, borderRadius: 7, background: theme.accentSoft,
              border: `1px solid ${theme.border}`, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem',
            }}
          >
            {theme.dark ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 5 }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                style={{ display: 'block', width: 22, height: 1.5, background: theme.text, borderRadius: 2 }}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 6.5 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -6.5 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: theme.dark ? 'rgba(15,23,42,0.98)' : 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(16px)',
              borderTop: `1px solid ${theme.border}`,
              overflow: 'hidden',
            }}
          >
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 24px',
                  fontFamily: "'Inter',sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: active === item.href.slice(1) ? theme.accent : theme.textSecondary,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${theme.border}`,
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
