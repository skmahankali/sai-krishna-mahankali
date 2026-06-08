# Hero Terminal Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an auto-cycling animated terminal window to the right side of the Hero section, showing realistic SRE/DevOps commands with typed input and fading output.

**Architecture:** Create a self-contained `TerminalWindow` component driven by a four-phase state machine (`typing → output → pause → advance`). Hero layout changes from a single capped-width column to a two-column CSS grid. No new dependencies — uses existing `motion` for output line fade-ins.

**Tech Stack:** React 19, TypeScript, Framer Motion (`motion/react`), inline styles (matches codebase convention)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/TerminalWindow.tsx` | **Create** | Self-contained terminal UI + animation loop |
| `src/components/Hero.tsx` | **Modify** | Switch inner div to 2-col grid, render `<TerminalWindow>` on the right |

---

### Task 1: Create `TerminalWindow.tsx`

**Files:**
- Create: `src/components/TerminalWindow.tsx`

- [ ] **Step 1: Create the file with scene data and types**

Create `src/components/TerminalWindow.tsx` with this exact content:

```tsx
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
            <span className="blink" style={{ display: 'inline-block', width: 7, height: 13, background: '#22d3ee', marginLeft: 2, opacity: 0.85 }} />
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
            <span className="blink" style={{ display: 'inline-block', width: 7, height: 13, background: '#22d3ee', opacity: 0.85 }} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify the file saved correctly**

```bash
grep -c 'SCENES' src/components/TerminalWindow.tsx
```

Expected output: `2` (declared once, used once)

- [ ] **Step 3: Check TypeScript compiles with no errors**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no output (clean compile). If errors, they'll be type mismatches — fix before proceeding.

- [ ] **Step 4: Commit**

```bash
git add src/components/TerminalWindow.tsx
git commit -m "feat: add TerminalWindow component with auto-cycling SRE commands"
```

---

### Task 2: Wire `TerminalWindow` into `Hero.tsx`

**Files:**
- Modify: `src/components/Hero.tsx` (lines 90–91 and 244–246)

- [ ] **Step 1: Import TerminalWindow at the top of Hero.tsx**

In `src/components/Hero.tsx`, add the import after the existing imports (after line 4):

```tsx
import TerminalWindow from './TerminalWindow'
```

- [ ] **Step 2: Replace the inner content wrapper with a two-column grid**

Find this block (around line 90–91):

```tsx
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 780 }}>
```

Replace with:

```tsx
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: 48,
          alignItems: 'center',
        }}>
          <div>
```

- [ ] **Step 3: Close the new left-column div and add the right column**

Find the closing `</div>` that ends the old `maxWidth: 780` wrapper (around line 245 — it's the `</div>` just before `</div>` that closes the `maxWidth: 1100` wrapper):

```tsx
        </div>
      </div>
```

Replace with:

```tsx
          </div>

          {/* Terminal panel — hidden on mobile */}
          <div style={{ display: 'flex', alignItems: 'center' }} className="hero-terminal">
            <TerminalWindow />
          </div>

        </div>
      </div>
```

- [ ] **Step 4: Add mobile hide rule to index.css**

In `src/index.css`, append at the end:

```css
@media (max-width: 768px) {
  .hero-terminal { display: none !important; }
}
```

- [ ] **Step 5: Run the dev server and verify visually**

```bash
npm run dev
```

Open http://localhost:5173. Verify:
1. Hero shows two columns on desktop — text on left, terminal on right
2. Terminal title bar shows `prod-cluster — bash — 80×24` (no personal name)
3. Commands type in character by character
4. Output lines fade in after each command
5. Sequence loops back to kubectl after docker scene
6. Resize browser below 768px — terminal panel disappears, hero looks clean

- [ ] **Step 6: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add src/components/Hero.tsx src/index.css
git commit -m "feat: integrate TerminalWindow into Hero section as two-column layout"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Two-column grid layout (`1fr 1fr`, gap 48px, `maxWidth: 1100`)
- ✅ Left column unchanged
- ✅ `TerminalWindow` component, new file
- ✅ macOS chrome, traffic-light dots, title `prod-cluster — bash — 80×24`
- ✅ All 4 scenes (kubectl, terraform, helm, docker)
- ✅ Typing: 35ms/char, 250ms pause before output
- ✅ Output: 150ms stagger per line, fade-in via `motion`
- ✅ Pause: 800ms after last output line, 1800ms after last scene
- ✅ Mobile: terminal hidden below 768px
- ✅ No new npm dependencies

**Placeholder scan:** None found — all steps contain actual code.

**Type consistency:**
- `Phase`, `LineType`, `OutputLine`, `Scene` — defined once in Task 1, not referenced in Task 2 (Task 2 only imports the default export).
- `LINE_COLOR` keys match `LineType` union — verified.
- `SCENES` array shape matches `Scene` interface — verified.
