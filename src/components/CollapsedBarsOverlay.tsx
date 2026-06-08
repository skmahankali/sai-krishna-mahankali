import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useCollapseContext } from '../context/SectionCollapseContext'
import { useTheme } from '../context/ThemeContext'

const NAVBAR_HEIGHT = 68
const BAR_HEIGHT    = 52

const SECTION_META = [
  { id: 'hero',       label: 'Hero',       num: '01', color: '#60a5fa' },
  { id: 'about',      label: 'About',      num: '02', color: '#a78bfa' },
  { id: 'skills',     label: 'Skills',     num: '03', color: '#22d3ee' },
  { id: 'experience', label: 'Experience', num: '04', color: '#fb923c' },
  { id: 'projects',   label: 'Projects',   num: '05', color: '#4ade80' },
  { id: 'contact',    label: 'Contact',    num: '06', color: '#f472b6' },
] as const

function HeroIcon() {
  return (
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#22d3ee', lineHeight: 1 }}>
      &gt;_<span className="bar-icon-cursor" style={{ display: 'inline-block', width: 5, height: 10, background: '#22d3ee', verticalAlign: 'middle', marginLeft: 1 }} />
    </div>
  )
}

function AboutIcon({ color }: { color: string }) {
  return (
    <svg className="bar-icon-pulse" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill={color} opacity=".9" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SkillsIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <g className="bar-icon-spin">
        <path d="M12 2l1.2 2.5H16l-1.6 2 .8 2.5L12 8l-3.2 1 .8-2.5L8 4.5h2.8z" fill={`${color}40`} stroke={color} strokeWidth="1.2" />
        <path d="M12 22l-1.2-2.5H8l1.6-2-.8-2.5L12 16l3.2-1-.8 2.5L16 19.5h-2.8z" fill={`${color}40`} stroke={color} strokeWidth="1.2" />
        <path d="M2 12l2.5-1.2V8l2 1.6 2.5-.8L8 12l1 3.2-2.5-.8L4.5 16V13.2z" fill={`${color}40`} stroke={color} strokeWidth="1.2" />
        <path d="M22 12l-2.5 1.2V16l-2-1.6-2.5.8L16 12l-1-3.2 2.5.8L19.5 8v2.8z" fill={`${color}40`} stroke={color} strokeWidth="1.2" />
      </g>
      <circle cx="12" cy="12" r="2.8" fill={`${color}50`} stroke={color} strokeWidth="1.2" />
    </svg>
  )
}

function ExperienceIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="18" viewBox="0 0 22 20" fill="none">
      <rect x="1" y="7" width="20" height="12" rx="2" fill={`${color}20`} stroke={color} strokeWidth="1.3" />
      <path className="bar-icon-lid" d="M7 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="1.3" fill="none" />
      <line x1="1" y1="13" x2="21" y2="13" stroke={color} strokeOpacity=".4" strokeWidth="1" />
    </svg>
  )
}

function ProjectsIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
      <text x="0" y="13" fontFamily="monospace" fontSize="14" fill={color} fontWeight="700" opacity=".9">{'{'}</text>
      <circle className="bar-icon-dot1" cx="9"  cy="8" r="1.6" fill={color} />
      <circle className="bar-icon-dot2" cx="12" cy="8" r="1.6" fill={color} />
      <circle className="bar-icon-dot3" cx="15" cy="8" r="1.6" fill={color} />
      <text x="18" y="13" fontFamily="monospace" fontSize="14" fill={color} fontWeight="700" opacity=".9">{'}'}</text>
    </svg>
  )
}

function ContactIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="17" viewBox="0 0 22 17" fill="none">
      <rect x="1" y="3" width="20" height="13" rx="2" fill={`${color}15`} stroke={color} strokeWidth="1.3" />
      <path className="bar-icon-flap" d="M1 3l10 7.5L21 3" stroke={color} strokeWidth="1.3" fill="none" />
    </svg>
  )
}

function BarIcon({ id, color }: { id: string; color: string }) {
  if (id === 'hero')       return <HeroIcon />
  if (id === 'about')      return <AboutIcon color={color} />
  if (id === 'skills')     return <SkillsIcon color={color} />
  if (id === 'experience') return <ExperienceIcon color={color} />
  if (id === 'projects')   return <ProjectsIcon color={color} />
  return <ContactIcon color={color} />
}

export default function CollapsedBarsOverlay() {
  const { collapsed, barIndex } = useCollapseContext()
  const theme = useTheme()
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (isMobile) return null

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 49, pointerEvents: 'none' }}>
      <AnimatePresence>
        {SECTION_META.filter(s => collapsed.has(s.id as never)).map(section => {
          const idx = barIndex(section.id as never)
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => handleClick(section.id)}
              style={{
                position: 'absolute',
                top: NAVBAR_HEIGHT + idx * BAR_HEIGHT,
                left: 0, right: 0,
                height: BAR_HEIGHT,
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                gap: 14,
                cursor: 'pointer',
                pointerEvents: 'all',
                background: theme.dark
                  ? 'rgba(15,23,42,0.88)'
                  : 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(14px)',
                borderBottom: `1px solid ${theme.dark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.08)'}`,
              }}
            >
              {/* Accent line */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: section.color, borderRadius: '0 2px 2px 0' }} />

              {/* Icon */}
              <div style={{
                width: 32, height: 32,
                borderRadius: 8,
                background: `${section.color}14`,
                border: `1px solid ${section.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <BarIcon id={section.id} color={section.color} />
              </div>

              {/* Label */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 12, fontWeight: 700,
                  color: theme.text,
                  letterSpacing: '.01em',
                }}>
                  {section.label}
                </div>
                <div style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 10,
                  color: theme.textMuted,
                  marginTop: 1,
                }}>
                  click to return ↑
                </div>
              </div>

              {/* Section number */}
              <div style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10,
                color: theme.textMuted,
                opacity: 0.5,
              }}>
                {section.num}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
