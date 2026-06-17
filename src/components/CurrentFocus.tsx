import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useTheme } from '../context/ThemeContext'

const FOCUS_ITEMS = [
  {
    icon: '⚡',
    title: 'Event-driven automation at scale',
    desc: 'Grafana + EDA + AWX',
  },
  {
    icon: '🤖',
    title: 'AI-driven infrastructure optimization',
    desc: 'Exploring LLMs for infra analysis',
  },
  {
    icon: '📝',
    title: 'Prompt engineering for DevOps workflows',
    desc: 'Integrating AI into operational tooling',
  },
  {
    icon: '🏗️',
    title: 'SRE practices at enterprise scale',
    desc: 'Reliability, observability, toil reduction',
  },
]

export default function CurrentFocus() {
  const theme = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="focus" ref={ref} style={{ padding: '7rem 1.5rem', background: theme.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <p className="section-label" style={{ color: theme.accent, marginBottom: 12 }}>02 / Focus</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: theme.text }}>
            What I'm Building Now
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}>
          {FOCUS_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              style={{
                background: theme.bgCard,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: '22px 24px',
                boxShadow: theme.shadow,
              }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: 14 }}>{item.icon}</div>
              <p style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 700,
                fontSize: '0.92rem',
                color: theme.text,
                marginBottom: 6,
                lineHeight: 1.4,
              }}>
                {item.title}
              </p>
              <p style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '0.72rem',
                color: theme.accent,
              }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
