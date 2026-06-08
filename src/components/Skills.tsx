import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'
import { useTheme } from '../context/ThemeContext'

const CATEGORIES = [
  {
    id: 'infra',
    label: 'Infrastructure',
    icon: '⚙️',
    skills: [
      { name: 'Kubernetes / EKS / AKS', level: 88 },
      { name: 'Terraform',              level: 90 },
      { name: 'Ansible (AWX / EDA)',    level: 85 },
      { name: 'Docker / Podman',        level: 90 },
      { name: 'Helm',                   level: 80 },
      { name: 'HashiCorp Vault',        level: 75 },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: '☁️',
    skills: [
      { name: 'AWS (EC2, EKS, Lambda, RDS, S3…)', level: 82 },
      { name: 'Microsoft Azure (AKS, VMs)',         level: 72 },
      { name: 'Multi-cloud IaC',                    level: 78 },
      { name: 'Cloud Networking / VPC',             level: 70 },
      { name: 'Serverless / Lambda',                level: 62 },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: '💻',
    skills: [
      { name: 'Python',          level: 88 },
      { name: 'Bash / Shell',    level: 92 },
      { name: 'Go (Golang)',     level: 65 },
      { name: 'Java',            level: 72 },
      { name: 'JavaScript',      level: 70 },
      { name: 'YAML (artform)',   level: 99 },
    ],
  },
  {
    id: 'observability',
    label: 'Observability',
    icon: '🔭',
    skills: [
      { name: 'Grafana',          level: 85 },
      { name: 'Prometheus',       level: 82 },
      { name: 'ELK Stack',        level: 78 },
      { name: 'Splunk',           level: 72 },
      { name: 'ServiceNow',       level: 68 },
    ],
  },
  {
    id: 'cicd',
    label: 'CI/CD',
    icon: '🔁',
    skills: [
      { name: 'Jenkins',             level: 88 },
      { name: 'GitLab CI/CD',        level: 82 },
      { name: 'Bitbucket Pipelines', level: 75 },
      { name: 'Bamboo',              level: 72 },
      { name: 'ArgoCD / GitOps',     level: 70 },
    ],
  },
  {
    id: 'frameworks',
    label: 'Web & Frameworks',
    icon: '🌐',
    skills: [
      { name: 'Flask / Django',       level: 72 },
      { name: 'React.js',             level: 65 },
      { name: 'Linux (RHEL/Ubuntu)',  level: 90 },
      { name: 'RESTful API Design',   level: 80 },
      { name: 'MySQL / DynamoDB',     level: 72 },
    ],
  },
]

const CERTS = [
  {
    label: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    icon: '☁️',
    color: '#f97316',
    href: 'https://www.credly.com/badges/3bf8c52c-d06c-4af5-bd3c-10a58eddcc80',
  },
  {
    label: 'Terraform Associate',
    issuer: 'HashiCorp',
    icon: '🏗️',
    color: '#7c3aed',
    href: 'https://www.credly.com/badges/4a6c520e-7270-4d2d-bc73-5779555213f5',
  },
]

function SkillBar({ name, level, started, accent }: { name: string; level: number; started: boolean; accent: string }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => setW(level), 200 + Math.random() * 300)
    return () => clearTimeout(t)
  }, [started, level])

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.85rem', color: 'inherit' }}>{name}</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', opacity: 0.5 }}>{level}%</span>
      </div>
      <div className="skill-track" style={{ background: 'rgba(148,163,184,0.1)' }}>
        <div className="skill-fill" style={{ width: `${w}%`, background: `linear-gradient(90deg, ${accent}99, ${accent})` }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const theme = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState('infra')
  const cat = CATEGORIES.find(c => c.id === active)!

  const card = { background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12 }

  return (
    <section id="skills" ref={ref} style={{ padding: '7rem 1.5rem', background: theme.bg }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: 48 }}>
          <p className="section-label" style={{ color: theme.accent, marginBottom: 12 }}>02 / Skills</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: theme.text }}>
            Technical Skills
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', fontWeight: 500,
                padding: '8px 16px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s',
                background: active === cat.id ? theme.accent : theme.accentSoft,
                color: active === cat.id ? '#fff' : theme.textSecondary,
                border: `1px solid ${active === cat.id ? theme.accent : theme.border}`,
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skill panel */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{ ...card, padding: '28px 32px', color: theme.text, boxShadow: theme.shadow }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '1rem', color: theme.text }}>
              {cat.icon} {cat.label}
            </h3>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem',
              color: theme.accent, background: theme.accentSoft,
              padding: '3px 10px', borderRadius: 4,
            }}>
              {cat.skills.length} skills
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0 32px' }}>
            {cat.skills.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <SkillBar name={s.name} level={s.level} started={inView} accent={theme.accent} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45 }} style={{ marginTop: 40 }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.82rem', color: theme.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>
            Certifications
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            {CERTS.map(cert => (
              <motion.a
                key={cert.label}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                style={{
                  ...card,
                  padding: '16px 22px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  transition: 'all 0.2s',
                  boxShadow: theme.shadow,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = cert.color
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = theme.border
                  ;(e.currentTarget as HTMLElement).style.transform = 'none'
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: `${cert.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem',
                }}>
                  {cert.icon}
                </div>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.88rem', color: theme.text, marginBottom: 2 }}>{cert.label}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.76rem', color: theme.textMuted }}>{cert.issuer}</p>
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.68rem', color: cert.color, marginTop: 2 }}>View on Credly ↗</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
