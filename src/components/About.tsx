import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useTheme } from '../context/ThemeContext'

const QUICK_FACTS = [
  { icon: '📍', label: 'Location',  value: 'Baltimore, MD' },
  { icon: '🏢', label: 'Company',   value: 'T. Rowe Price' },
  { icon: '🎓', label: 'Education', value: 'M.S. Computer Science, ODU' },
  { icon: '🚀', label: 'Goal',      value: 'World-class SRE / AIOps Engineer' },
  { icon: '🎮', label: 'Hobbies',   value: 'Gaming · Drones · Archery' },
  { icon: '📧', label: 'Email',     value: 'saikrishna.mahankali98@gmail.com' },
]

const EDUCATION = [
  {
    degree: 'M.S. Computer Science',
    school: 'Old Dominion University',
    period: '2021 – 2023',
    location: 'Norfolk, VA',
  },
  {
    degree: 'B.Tech Electronics & Communication',
    school: 'JNTU Hyderabad',
    period: '2015 – 2019',
    location: 'Hyderabad, India',
  },
]

const INTERESTS = [
  { emoji: '🎮', label: 'Gaming', desc: 'Strategy & ranked grind', link: 'https://www.instagram.com/_d3ad_shot_?igsh=MXZhNmdmdmVnYnN3ZA%3D%3D' },
  { emoji: '🚁', label: 'Drones', desc: 'Precision & aerial perspective', link: null },
  { emoji: '🏹', label: 'Archery', desc: 'Patience & focus', link: null },
]

export default function About() {
  const theme = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const card = {
    background: theme.bgCard,
    border: `1px solid ${theme.border}`,
    borderRadius: 12,
    boxShadow: theme.shadow,
  }

  return (
    <section id="about" ref={ref} style={{ padding: '7rem 1.5rem', background: theme.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 56 }}
        >
          <p className="section-label" style={{ color: theme.accent, marginBottom: 12 }}>01 / About</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: theme.text }}>
            About Me
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          {/* Left: bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '1.05rem', color: theme.textSecondary, lineHeight: 1.85, marginBottom: 24 }}>
              I'm a DevOps Engineer with over six years of experience in IT, currently specializing in infrastructure automation at T. Rowe Price. I'm passionate about building systems that are self-healing, observable, and boring in the best possible way.
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '1.05rem', color: theme.textSecondary, lineHeight: 1.85, marginBottom: 24 }}>
              My goal is to become a world-class SRE, the kind who doesn't just respond to outages but engineers systems that prevent them. Think AIOps, event-driven automation, and infrastructure that just works.
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '1.05rem', color: theme.textSecondary, lineHeight: 1.85, marginBottom: 36 }}>
              Outside of work: I fly drones for the perspective, shoot archery for the focus, and play games for the strategy. All three have made me a better engineer.
            </p>

            {/* Interests */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {INTERESTS.map(i => {
                const inner = (
                  <>
                    <span style={{ fontSize: '1.3rem' }}>{i.emoji}</span>
                    <div>
                      <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.82rem', color: theme.text }}>
                        {i.label}
                        {i.link && <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.62rem', color: theme.accent, marginLeft: 6 }}>@d3ad_shot ↗</span>}
                      </p>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.72rem', color: theme.textMuted }}>{i.desc}</p>
                    </div>
                  </>
                )
                return i.link ? (
                  <a key={i.label} href={i.link} target="_blank" rel="noopener noreferrer"
                    style={{ ...card, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = theme.accent}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = theme.border}>
                    {inner}
                  </a>
                ) : (
                  <div key={i.label} style={{ ...card, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right: quick facts + education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Quick facts */}
            <div style={{ ...card, padding: '24px', marginBottom: 20 }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.82rem', color: theme.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>
                Quick facts
              </p>
              {QUICK_FACTS.map(f => (
                <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: '0.9rem' }}>{f.icon}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', color: theme.textMuted }}>{f.label}</span>
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', color: theme.text, fontWeight: 500, textAlign: 'right' }}>{f.value}</span>
                </div>
              ))}
            </div>

            {/* Education */}
            <div style={{ ...card, padding: '24px' }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.82rem', color: theme.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
                Education
              </p>
              {EDUCATION.map((edu, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: i < EDUCATION.length - 1 ? 20 : 0, paddingBottom: i < EDUCATION.length - 1 ? 20 : 0, borderBottom: i < EDUCATION.length - 1 ? `1px solid ${theme.border}` : 'none' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: theme.accentSoft,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}>
                    🎓
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.88rem', color: theme.text, marginBottom: 3 }}>
                      {edu.degree}
                    </p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8rem', color: theme.textSecondary, marginBottom: 2 }}>
                      {edu.school}
                    </p>
                    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: theme.textMuted }}>
                      {edu.period} · {edu.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
