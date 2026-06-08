import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

type LineType = 'default' | 'ok' | 'dim' | 'warn'

interface OutputLine {
  text: string
  type: LineType
}

interface Scene {
  command: string
  output: OutputLine[]
}

const SCENES: Scene[] = [
  {
    command: 'kubectl get pods -n production',
    output: [
      { text: 'NAME                      READY   STATUS    RESTARTS', type: 'dim' },
      { text: 'api-gateway-7f9b8c        3/3     Running   0', type: 'ok' },
      { text: 'auth-service-2d4a1e       2/2     Running   0', type: 'ok' },
      { text: 'data-pipeline-9c3b6f      1/1     Running   0', type: 'ok' },
      { text: 'metrics-collector-4a8d    1/1     Running   0', type: 'ok' },
    ],
  },
  {
    command: 'terraform plan',
    output: [
      { text: 'Refreshing state... done (3s)', type: 'default' },
      { text: 'Plan: 4 to add, 2 to change, 0 to destroy.', type: 'default' },
      { text: '  + aws_ecs_service.api_v2', type: 'dim' },
      { text: '  + aws_lb_target_group.api_v2', type: 'dim' },
      { text: 'No breaking changes detected. Safe to apply.', type: 'ok' },
    ],
  },
  {
    command: 'helm upgrade monitoring ./charts/prometheus',
    output: [
      { text: 'Release "monitoring" has been upgraded.', type: 'default' },
      { text: 'STATUS: deployed  REVISION: 7', type: 'default' },
      { text: 'v3.1.2 → v3.2.0  ✔ Rollout complete', type: 'ok' },
    ],
  },
  {
    command: 'docker ps --format "table {{.Names}}\\t{{.Status}}"',
    output: [
      { text: 'NAMES                   STATUS', type: 'dim' },
      { text: 'nginx-proxy             Up 14 days', type: 'ok' },
      { text: 'redis-cache             Up 14 days', type: 'ok' },
      { text: 'postgres-primary        Up 14 days', type: 'ok' },
    ],
  },
]

const LINE_COLOR: Record<LineType, string> = {
  default: 'rgba(255,255,255,0.55)',
  ok: '#4ade80',
  dim: 'rgba(255,255,255,0.28)',
  warn: '#facc15',
}

type Phase = 'typing' | 'output' | 'pause'

export default function TerminalWindow() {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [charIdx, setCharIdx] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const scene = SCENES[sceneIdx]

    if (phase === 'typing') {
      if (charIdx < scene.command.length) {
        const t = setTimeout(() => setCharIdx(c => c + 1), 35)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('output'), 250)
      return () => clearTimeout(t)
    }

    if (phase === 'output') {
      if (visibleLines < scene.output.length) {
        const t = setTimeout(() => setVisibleLines(v => v + 1), 150)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('pause'), 800)
      return () => clearTimeout(t)
    }

    if (phase === 'pause') {
      const delay = sceneIdx === SCENES.length - 1 ? 1800 : 1200
      const t = setTimeout(() => {
        setSceneIdx(i => (i + 1) % SCENES.length)
        setPhase('typing')
        setCharIdx(0)
        setVisibleLines(0)
      }, delay)
      return () => clearTimeout(t)
    }
  }, [sceneIdx, phase, charIdx, visibleLines])

  const scene = SCENES[sceneIdx]
  const showCursor = phase === 'typing' || (phase === 'output' && visibleLines === 0)

  return (
    <div style={{
      width: '100%',
      background: 'rgba(15,23,42,0.95)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08)',
    }}>
      {/* Title bar */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        padding: '9px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {(['#ff5f57', '#ffbd2e', '#28ca40'] as const).map(color => (
          <span key={color} style={{ width: 11, height: 11, borderRadius: '50%', background: color, flexShrink: 0 }} />
        ))}
        <span style={{
          marginLeft: 8,
          fontFamily: "'JetBrains Mono','Fira Code',monospace",
          fontSize: 10,
          color: 'rgba(255,255,255,0.3)',
        }}>
          prod-cluster — bash — 80×24
        </span>
      </div>

      {/* Body */}
      <div style={{
        padding: '16px 18px',
        fontFamily: "'JetBrains Mono','Fira Code',monospace",
        fontSize: 12,
        lineHeight: 1.85,
        minHeight: 280,
      }}>
        {/* Prompt + typing command */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span style={{ color: '#4ade80', marginRight: 6, flexShrink: 0 }}>➜</span>
          <span style={{ color: '#22d3ee' }}>
            {scene.command.slice(0, charIdx)}
          </span>
          {showCursor && (
            <span className="blink" style={{ display: 'inline-block', width: 7, height: 13, background: '#22d3ee', marginLeft: 2 }} />
          )}
        </div>

        {/* Output lines */}
        {scene.output.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={`${sceneIdx}-${i}`}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            style={{ color: LINE_COLOR[line.type], whiteSpace: 'pre' }}
          >
            {line.text}
          </motion.div>
        ))}

        {/* Idle cursor after all output shown */}
        {phase === 'pause' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', alignItems: 'baseline', gap: 0, marginTop: 4 }}
          >
            <span style={{ color: '#4ade80', marginRight: 6 }}>➜</span>
            <span className="blink" style={{ display: 'inline-block', width: 7, height: 13, background: '#22d3ee' }} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
