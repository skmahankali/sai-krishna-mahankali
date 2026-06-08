import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { useTheme } from '../context/ThemeContext'

const PROJECTS = [
  {
    name: 'Grape Leaf Disease Detection',
    category: 'Machine Learning',
    categoryColor: '#22c55e',
    description: 'ML model that classifies grape leaf diseases using Support Vector Machines. Feature extraction via OpenCV on image datasets — achieves 90%+ accuracy distinguishing healthy vs diseased leaves.',
    impact: '90%+ classification accuracy on real-world leaf images',
    tech: ['MATLAB', 'OpenCV', 'SVM', 'Image Processing', 'Machine Learning'],
    github: 'https://github.com/skmahankali/Grape-Leaf-disease-detection-using-SVM-Classifier',
  },
  {
    name: 'Traffic Collision Analysis',
    category: 'Data Science',
    categoryColor: '#f97316',
    description: 'Deep-dive data analysis of road accident datasets to surface temporal patterns, weather correlations, and high-risk zones — with interactive visualizations built for clarity.',
    impact: 'Identified key temporal and weather risk factors in accident data',
    tech: ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'Data Analysis'],
    github: 'https://github.com/skmahankali/Traffic-Collision-analysis',
  },
  {
    name: 'CPU Temperature Analysis',
    category: 'Numerical Methods',
    categoryColor: '#6366f1',
    description: 'Applied matrix operations and numerical approximation techniques to model CPU thermal performance data — demonstrating how classical numerical methods map to real hardware monitoring.',
    impact: 'Numerical modeling of CPU thermal behavior across workloads',
    tech: ['Python', 'NumPy', 'SciPy', 'Numerical Methods', 'Matrix Operations'],
    github: 'https://github.com/skmahankali/CPU-Temperature-analysis',
  },
  {
    name: 'Digital Library Search Engine',
    category: 'Full Stack',
    categoryColor: '#3b82f6',
    description: 'Full-stack digital library portal with file upload, full-text search, and online reading. PHP + MySQL backend with a clean responsive frontend — mini Google Drive meets a library.',
    impact: 'Searchable digital library with complete upload and read flows',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'RESTful Design'],
    github: 'https://github.com/skmahankali/Digital-Library-Search-Engine',
  },
]

export default function Projects() {
  const theme = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="projects" ref={ref} style={{ padding: '7rem 1.5rem', background: theme.bg }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: 52 }}>
          <p className="section-label" style={{ color: theme.accent, marginBottom: 12 }}>04 / Projects</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: theme.text }}>
            Projects
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: theme.textMuted, marginTop: 12, fontSize: '0.95rem' }}>
            Click any card to see the tech stack and GitHub link.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                background: theme.bgCard,
                border: `1px solid ${expanded === i ? proj.categoryColor + '60' : theme.border}`,
                borderRadius: 14,
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.22s ease',
                boxShadow: expanded === i
                  ? `0 0 0 1px ${proj.categoryColor}25, ${theme.shadow}`
                  : theme.shadow,
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={e => { if (expanded !== i) (e.currentTarget as HTMLElement).style.borderColor = `${proj.categoryColor}40` }}
              onMouseLeave={e => { if (expanded !== i) (e.currentTarget as HTMLElement).style.borderColor = theme.border }}
            >
              {/* Category badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: '0.68rem', fontWeight: 600,
                  color: proj.categoryColor,
                  background: `${proj.categoryColor}14`,
                  border: `1px solid ${proj.categoryColor}30`,
                  padding: '3px 10px', borderRadius: 4,
                }}>
                  {proj.category}
                </span>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem',
                    color: theme.textMuted, textDecoration: 'none',
                    padding: '3px 8px', borderRadius: 4,
                    border: `1px solid ${theme.border}`,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = theme.accent
                    ;(e.currentTarget as HTMLElement).style.borderColor = theme.accent
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = theme.textMuted
                    ;(e.currentTarget as HTMLElement).style.borderColor = theme.border
                  }}
                >
                  GitHub ↗
                </a>
              </div>

              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1rem', color: theme.text, marginBottom: 10, lineHeight: 1.4 }}>
                {proj.name}
              </h3>

              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.86rem', color: theme.textSecondary, lineHeight: 1.75, marginBottom: 16, flexGrow: 1 }}>
                {proj.description}
              </p>

              {/* Impact */}
              <div style={{
                padding: '10px 14px', borderRadius: 8, marginBottom: 14,
                background: `${proj.categoryColor}08`,
                border: `1px solid ${proj.categoryColor}20`,
              }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8rem', color: proj.categoryColor, fontWeight: 500 }}>
                  ✦ {proj.impact}
                </p>
              </div>

              {/* Expanded: tech stack */}
              {expanded === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.75rem', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Tech stack
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {proj.tech.map(t => (
                      <span key={t} className="tag" style={{ background: theme.accentSoft, color: theme.accent, border: `1px solid ${theme.dark ? 'rgba(59,130,246,0.2)' : 'rgba(37,99,235,0.15)'}` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: theme.textMuted, opacity: 0.5, marginTop: 12, textAlign: 'center' }}>
                {expanded === i ? '▲ collapse' : '▼ expand'}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 36 }}
        >
          <a
            href="https://github.com/skmahankali"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ borderColor: theme.border, color: theme.textSecondary, textDecoration: 'none' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = theme.accent
              ;(e.currentTarget as HTMLElement).style.color = theme.accent
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = theme.border
              ;(e.currentTarget as HTMLElement).style.color = theme.textSecondary
            }}
          >
            View all on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
