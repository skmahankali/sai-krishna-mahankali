import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { useTheme } from '../context/ThemeContext'

// EmailJS — fill these in once you set up emailjs.com
const EMAILJS_SERVICE_ID  = 'service_bjjffi9'
const EMAILJS_TEMPLATE_ID = 'template_b9e5axp'
const EMAILJS_PUBLIC_KEY  = 'eNgd25cULYgf81BX8'

const SOCIALS = [
  { label: 'GitHub',    href: 'https://github.com/skmahankali',                 note: 'github.com/skmahankali',           color: '#e2ffe8' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/skmaha/',            note: 'linkedin.com/in/skmaha',           color: '#3b82f6' },
  { label: 'Email',     href: 'mailto:saikrishna.mahankali98@gmail.com',        note: 'saikrishna.mahankali98@gmail.com', color: '#22c55e' },
]

const STATUS_ROWS = [
  { label: 'Status',        value: '🟢 Online',           color: '#22c55e' },
  { label: 'Location',      value: 'Baltimore, MD (EST)',  color: undefined },
  { label: 'Response',      value: '< 24 hours',           color: undefined },
  { label: 'Open to',       value: 'New opportunities',    color: '#3b82f6' },
]

export default function Contact() {
  const theme = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSending(true)

    const configured = !EMAILJS_SERVICE_ID.includes('REPLACE') &&
                       !EMAILJS_TEMPLATE_ID.includes('REPLACE') &&
                       !EMAILJS_PUBLIC_KEY.includes('REPLACE')

    if (!configured) {
      // Simulate for dev
      setTimeout(() => { setSending(false); setSent(true) }, 1200)
      return
    }

    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name, reply_to: form.email,
        subject: form.subject, message: form.message,
      }, EMAILJS_PUBLIC_KEY)
      setSending(false); setSent(true)
    } catch {
      setSending(false)
      setError('Could not send. Email me directly: saikrishna.mahankali98@gmail.com')
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Inter',sans-serif",
    fontSize: '0.9rem',
    borderRadius: 8,
    border: `1.5px solid ${theme.border}`,
    padding: '11px 14px',
    width: '100%',
    background: theme.bgAlt,
    color: theme.text,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const card = { background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, boxShadow: theme.shadow }

  return (
    <section id="contact" ref={ref} style={{ padding: '7rem 1.5rem', background: theme.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: 52 }}>
          <p className="section-label" style={{ color: theme.accent, marginBottom: 12 }}>05 / Contact</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: theme.text }}>
            Get in Touch
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: theme.textMuted, marginTop: 12, fontSize: '0.95rem', maxWidth: 480 }}>
            Open to new opportunities, collaborations, and interesting conversations. I'll get back to you fast.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {/* Left: form */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}>
            <div style={{ ...card, padding: '28px 28px' }}>
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1.1rem', color: theme.text, marginBottom: 8 }}>Message sent!</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.88rem', color: theme.textSecondary }}>
                    I'll reply before my next pull request.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="btn-outline"
                    style={{ marginTop: 24, borderColor: theme.border, color: theme.textSecondary }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '1rem', color: theme.text, marginBottom: 24 }}>
                    Send a message
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8rem', color: theme.textMuted, display: 'block', marginBottom: 6 }}>Name</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = theme.accent; e.target.style.boxShadow = `0 0 0 3px ${theme.accentSoft}` }}
                        onBlur={e => { e.target.style.borderColor = theme.border; e.target.style.boxShadow = 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8rem', color: theme.textMuted, display: 'block', marginBottom: 6 }}>Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = theme.accent; e.target.style.boxShadow = `0 0 0 3px ${theme.accentSoft}` }}
                        onBlur={e => { e.target.style.borderColor = theme.border; e.target.style.boxShadow = 'none' }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8rem', color: theme.textMuted, display: 'block', marginBottom: 6 }}>Topic</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => { e.target.style.borderColor = theme.accent; e.target.style.boxShadow = `0 0 0 3px ${theme.accentSoft}` }}
                      onBlur={e => { e.target.style.borderColor = theme.border; e.target.style.boxShadow = 'none' }}>
                      <option value="">Select a topic</option>
                      <option value="job">Job Opportunity</option>
                      <option value="collab">Collaboration</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8rem', color: theme.textMuted, display: 'block', marginBottom: 6 }}>Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="What's on your mind?" style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                      onFocus={e => { e.target.style.borderColor = theme.accent; e.target.style.boxShadow = `0 0 0 3px ${theme.accentSoft}` }}
                      onBlur={e => { e.target.style.borderColor = theme.border; e.target.style.boxShadow = 'none' }} />
                  </div>

                  {error && (
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8rem', color: '#ef4444', marginBottom: 14 }}>{error}</p>
                  )}

                  <button type="submit" disabled={sending} className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: sending ? 0.7 : 1 }}>
                    {sending ? 'Sending…' : 'Send message →'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right: status + socials */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Status */}
            <div style={{ ...card, padding: '24px' }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.82rem', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>
                Status
              </p>
              {STATUS_ROWS.map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.85rem', color: theme.textMuted }}>{row.label}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.85rem', fontWeight: 600, color: row.color ?? theme.text }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ ...card, padding: '24px' }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.82rem', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>
                Find me online
              </p>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, textDecoration: 'none', transition: 'all 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.75'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                >
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: '0.88rem', color: theme.text }}>{s.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: theme.textMuted }}>{s.note} ↗</span>
                </a>
              ))}
            </div>

            {/* Fun note */}
            <div style={{
              padding: '16px 18px', borderRadius: 10,
              background: `${theme.accent}08`,
              border: `1px solid ${theme.accent}20`,
            }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', color: theme.textSecondary, lineHeight: 1.7 }}>
                💡 I'm currently exploring SRE, AIOps, and infrastructure automation roles. Open to working anywhere in the US. H1B visa sponsorship available.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
