import { useState, useEffect } from 'react'
import { ThemeContext, DARK_THEME, LIGHT_THEME } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import DevGame from './components/DevGame'
import EasterEgg from './components/EasterEgg'
import ParticleWeb from './components/ParticleWeb'
import { SectionCollapseProvider } from './context/SectionCollapseContext'
import CollapsedBarsOverlay from './components/CollapsedBarsOverlay'
import CollapsibleSection from './components/CollapsibleSection'

function App() {
  // Default to system preference
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Sync system preference changes (when user hasn't manually toggled)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) setDark(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggle = () => {
    setDark(d => {
      const next = !d
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  const theme = {
    ...(dark ? DARK_THEME : LIGHT_THEME),
    dark,
    toggle,
  }

  return (
    <SectionCollapseProvider>
    <ThemeContext.Provider value={theme}>
      <div
        className="min-h-screen grid-bg noise"
        style={{
          background: dark ? '#0f172a' : '#ffffff',
          color: theme.text,
          '--grid-color': dark ? 'rgba(148,163,184,0.03)' : 'rgba(15,23,42,0.04)',
          transition: 'background 0.3s ease, color 0.3s ease',
        } as React.CSSProperties}
      >
        <ParticleWeb />
        <Navbar />
        <CollapsedBarsOverlay />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <CollapsibleSection sectionId="hero"><Hero /></CollapsibleSection>
          <CollapsibleSection sectionId="about"><About /></CollapsibleSection>
          <CollapsibleSection sectionId="skills"><Skills /></CollapsibleSection>
          <CollapsibleSection sectionId="experience"><Experience /></CollapsibleSection>
          <CollapsibleSection sectionId="projects"><Projects /></CollapsibleSection>
          <CollapsibleSection sectionId="contact"><Contact /></CollapsibleSection>
        </main>

        <footer
          style={{
            borderTop: `1px solid ${theme.border}`,
            padding: '2.5rem 1rem',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: theme.textMuted }}>
            Designed & built by{' '}
            <span className="gradient-text" style={{ fontWeight: 600 }}>
              Sai Krishna Mahankali
            </span>
            {' '}· {new Date().getFullYear()}
          </p>
        </footer>

        <DevGame />
        <EasterEgg />
      </div>
    </ThemeContext.Provider>
    </SectionCollapseProvider>
  )
}

export default App
