import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useTheme } from '../context/ThemeContext'

const JOBS = [
  {
    company: 'T. Rowe Price',
    role: 'Infrastructure Automation Engineer',
    period: 'June 2024 – Present',
    location: 'Baltimore, MD',
    active: true,
    description: 'Automating infrastructure at one of the largest asset management firms globally. Building Ansible AWX/EDA workflows, containerizing legacy workloads, and driving GitOps adoption across teams.',
    highlights: [
      'Automated infrastructure with Ansible AWX/EDA — 40% faster deployments',
      'Migrated legacy infra to containerized solutions (Docker + Podman + EKS)',
      'Built custom Python plugins + dynamic inventory scripts for AWX',
      'Implemented GitOps workflows + automated remediation playbooks',
      'Managed HashiCorp Vault for secrets across multi-cloud environments',
    ],
    tech: ['Ansible AWX/EDA', 'Kubernetes', 'Docker', 'Podman', 'Python', 'HashiCorp Vault', 'Jenkins', 'AWS'],
  },
  {
    company: 'Elevance Health',
    role: 'DevOps Engineer',
    period: 'Jan 2023 – June 2024',
    location: 'Remote',
    active: false,
    description: 'Progressed from intern to full-time engineer. Designed and deployed multi-account AWS architectures using Infrastructure as Code and integrated security scanning into every pipeline.',
    highlights: [
      'Implemented Terraform + Bitbucket pipelines for multi-account AWS',
      'Integrated security scanning into CI/CD — security-by-default',
      'Reduced cloud resource costs by 25% through right-sizing and optimization',
      'Progressed from intern → full-time engineer in the same engagement',
    ],
    tech: ['Terraform', 'Bitbucket Pipelines', 'AWS', 'Docker', 'Kubernetes', 'Python', 'Jenkins'],
  },
  {
    company: 'ConnxAI (formerly SmartIMS)',
    role: 'DevOps Intern',
    period: 'May 2022 – Aug 2022',
    location: 'Remote',
    active: false,
    description: 'Built a full CMDB web portal from scratch using Python and Django — asset management, RESTful APIs, and automated data synchronization scripts.',
    highlights: [
      'Built CMDB web portal with Python + Django from scratch',
      'Designed RESTful APIs for infrastructure asset management',
      'Automated data synchronization + reporting scripts',
      'Integrated portal with existing monitoring and ticketing tools',
    ],
    tech: ['Python', 'Django', 'MySQL', 'RESTful API', 'Linux', 'Bash'],
  },
  {
    company: 'Old Dominion University',
    role: 'Graduate Assistant',
    period: 'Aug 2021 – May 2023',
    location: 'Norfolk, VA',
    active: false,
    description: 'Taught Information Literacy while building features for the ODU RecWell portal. Mentored undergrads in web development and collaborated with the IT team to improve performance.',
    highlights: [
      'Taught Information Literacy to undergraduate students',
      'Developed features for ODU RecWell portal using JavaScript',
      'Implemented responsive design improvements and DB query optimization',
      'Mentored students in web development best practices',
    ],
    tech: ['JavaScript', 'HTML/CSS', 'MySQL', 'Python', 'Linux'],
  },
  {
    company: 'ConnxAI (formerly SmartIMS)',
    role: 'Network Engineer / DevOps Associate',
    period: 'Aug 2019 – Aug 2021',
    location: 'Hyderabad, India',
    active: false,
    description: 'Transitioned from network engineering into DevOps. Built automation tooling for AI-driven network optimization, managed Linux servers, and participated in IoT projects.',
    highlights: [
      'Automated network configuration management with Python & Bash',
      'Implemented Terraform + AWS automation workflows',
      'Managed enterprise network infrastructure (SD-WAN, Cisco)',
      'Contributed to IoT device management solutions',
    ],
    tech: ['Python', 'Bash', 'Terraform', 'AWS', 'Ansible', 'Docker', 'Linux', 'Networking'],
  },
  {
    company: 'DRDO — Defence Research & Development Organisation',
    role: 'Research Intern',
    period: 'Mar 2018 – May 2018',
    location: 'Hyderabad, India',
    active: false,
    description: 'Worked on ring laser gyroscopes and embedded systems for missile navigation technologies at one of India\'s premier defence research labs.',
    highlights: [
      'Worked on ring laser gyroscope calibration for missile navigation',
      'Tested and analyzed real-time embedded systems performance',
      'Documented technical specifications for defence-grade hardware',
    ],
    tech: ['Embedded Systems', 'C', 'Linux', 'Electronics', 'Signal Processing'],
  },
]

export default function Experience() {
  const theme = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} style={{ padding: '7rem 1.5rem', background: theme.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: 56 }}>
          <p className="section-label" style={{ color: theme.accent, marginBottom: 12 }}>03 / Experience</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: theme.text }}>
            Professional Experience
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: theme.textMuted, marginTop: 12, fontSize: '0.95rem' }}>
            6+ years · 1 active role · 5 completed
          </p>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: 24 }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 4, top: 8, bottom: 8, width: 1,
            background: `linear-gradient(to bottom, ${theme.accent}, ${theme.border})`,
          }} />

          {JOBS.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{ position: 'relative', marginBottom: 28 }}
            >
              {/* Timeline dot */}
              <div className={`timeline-dot${job.active ? ' active' : ''}`} style={{ position: 'absolute', left: -20, top: 22 }} />

              <div style={{
                background: theme.bgCard,
                border: `1px solid ${job.active ? `${theme.accent}40` : theme.border}`,
                borderRadius: 12,
                padding: '24px 28px',
                boxShadow: job.active ? `0 0 0 1px ${theme.accent}20, ${theme.shadow}` : theme.shadow,
                transition: 'all 0.2s',
              }}>
                {/* Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1rem', color: theme.text }}>
                        {job.company}
                      </h3>
                      {job.active && (
                        <span style={{
                          fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', fontWeight: 600,
                          color: '#22c55e', background: 'rgba(34,197,94,0.1)',
                          border: '1px solid rgba(34,197,94,0.25)',
                          padding: '2px 8px', borderRadius: 4,
                        }}>
                          Current
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.9rem', color: theme.textSecondary, fontWeight: 500 }}>
                      {job.role}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: theme.textMuted }}>{job.period}</p>
                    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: theme.textMuted, marginTop: 2 }}>📍 {job.location}</p>
                  </div>
                </div>

                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.88rem', color: theme.textSecondary, lineHeight: 1.75, marginBottom: 16 }}>
                  {job.description}
                </p>

                <ul style={{ marginBottom: 18, paddingLeft: 0, listStyle: 'none' }}>
                  {job.highlights.map((h, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, marginBottom: 7, alignItems: 'flex-start' }}>
                      <span style={{ color: theme.accent, flexShrink: 0, marginTop: 2 }}>↳</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.84rem', color: theme.textSecondary, lineHeight: 1.6 }}>{h}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {job.tech.map(t => (
                    <span key={t} className="tag" style={{
                      background: theme.accentSoft,
                      color: theme.accent,
                      border: `1px solid ${theme.dark ? 'rgba(59,130,246,0.2)' : 'rgba(37,99,235,0.15)'}`,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
