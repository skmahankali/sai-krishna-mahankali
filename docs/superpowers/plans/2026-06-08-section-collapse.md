# Section Collapse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** All 6 portfolio sections shrink into animated 52px stacked bars when scrolled past; clicking a bar scrolls back and re-expands the section.

**Architecture:** A React context owns the `Set<string>` of collapsed section IDs and runs a passive scroll listener. A fixed overlay renders the stacked bars. Each section wraps its content in a `motion.div` that animates `height` and `opacity`. No new dependencies — uses existing `motion/react`.

**Tech Stack:** React 19, TypeScript, Framer Motion (`motion/react`), inline styles (codebase convention)

---

## Constants (used in every task)

```ts
const NAVBAR_HEIGHT = 68   // px — from Navbar.tsx height: 68
const BAR_HEIGHT    = 52   // px — collapsed bar height

const SECTIONS = [
  { id: 'hero',       label: 'Hero',       num: '01', color: '#60a5fa' },
  { id: 'about',      label: 'About',      num: '02', color: '#a78bfa' },
  { id: 'skills',     label: 'Skills',     num: '03', color: '#22d3ee' },
  { id: 'experience', label: 'Experience', num: '04', color: '#fb923c' },
  { id: 'projects',   label: 'Projects',   num: '05', color: '#4ade80' },
  { id: 'contact',    label: 'Contact',    num: '06', color: '#f472b6' },
] as const
```

---

## File Map

| File | Action |
|---|---|
| `src/context/SectionCollapseContext.tsx` | **Create** |
| `src/components/CollapsedBarsOverlay.tsx` | **Create** |
| `src/components/CollapsibleSection.tsx` | **Create** |
| `src/App.tsx` | **Modify** |
| `src/index.css` | **Modify** |

---

### Task 1: Add icon keyframe animations to index.css

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Append keyframes to the end of `src/index.css`**

```css
/* ── Section collapse bar icon animations ── */
@keyframes bar-spin      { to { transform: rotate(360deg); } }
@keyframes bar-pulse     { 0%,100% { transform: scale(1); opacity:.8 } 50% { transform: scale(1.1); opacity:1 } }
@keyframes bar-lid       { 0%,40%,100% { transform: scaleY(1) } 18%,28% { transform: scaleY(0.45) translateY(2px) } }
@keyframes bar-dot-pop   { 0%,80%,100% { opacity:.25 } 30% { opacity:1 } }
@keyframes bar-flap      { 0%,60%,100% { transform: rotateX(0deg) } 22%,44% { transform: rotateX(-38deg) } }
@keyframes bar-cursor    { 0%,100% { opacity:1 } 50% { opacity:0 } }
@keyframes bar-enter     { from { opacity:0; transform: translateY(-6px) } to { opacity:1; transform: translateY(0) } }

.bar-icon-spin   { animation: bar-spin    6s  linear      infinite; transform-origin: center; }
.bar-icon-pulse  { animation: bar-pulse   2.4s ease-in-out infinite; }
.bar-icon-lid    { animation: bar-lid     3s  ease-in-out infinite; transform-origin: 50% 100%; }
.bar-icon-dot1   { animation: bar-dot-pop 2s  ease-in-out infinite; }
.bar-icon-dot2   { animation: bar-dot-pop 2s  ease-in-out infinite .2s; }
.bar-icon-dot3   { animation: bar-dot-pop 2s  ease-in-out infinite .4s; }
.bar-icon-flap   { animation: bar-flap    2.8s ease-in-out infinite; transform-origin: 50% 0%; }
.bar-icon-cursor { animation: bar-cursor  1s  step-end    infinite; }
```

- [ ] **Step 2: Verify TypeScript still clean**

```bash
npx tsc --noEmit 2>&1 | head -5
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add section collapse bar icon keyframe animations"
```

---

### Task 2: Create SectionCollapseContext

**Files:**
- Create: `src/context/SectionCollapseContext.tsx`

- [ ] **Step 1: Create the context file**

Create `src/context/SectionCollapseContext.tsx`:

```tsx
import { createContext, useContext, useEffect, useRef, useState } from 'react'

const NAVBAR_HEIGHT = 68
const BAR_HEIGHT    = 52

const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'] as const
type SectionId = typeof SECTION_IDS[number]

interface CollapseContextValue {
  collapsed: Set<SectionId>
  barIndex: (id: SectionId) => number   // position in the fixed stack (0-based)
}

const CollapseContext = createContext<CollapseContextValue>({
  collapsed: new Set(),
  barIndex: () => 0,
})

export function useCollapseContext() {
  return useContext(CollapseContext)
}

export function SectionCollapseProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<Set<SectionId>>(new Set())
  // Keep a ref so the scroll handler always reads latest state without re-subscribing
  const collapsedRef = useRef<Set<SectionId>>(collapsed)
  collapsedRef.current = collapsed

  useEffect(() => {
    const handleScroll = () => {
      const current = collapsedRef.current
      const next = new Set(current)
      let changed = false

      SECTION_IDS.forEach((id, idx) => {
        const el = document.getElementById(id)
        if (!el) return

        const rect = el.getBoundingClientRect()
        const barsAbove = SECTION_IDS.slice(0, idx).filter(sid => current.has(sid)).length
        const threshold = NAVBAR_HEIGHT + barsAbove * BAR_HEIGHT

        if (rect.bottom <= threshold + 8 && !current.has(id)) {
          next.add(id)
          changed = true
        } else if (rect.top >= threshold - 8 && current.has(id)) {
          next.delete(id)
          changed = true
        }
      })

      if (changed) setCollapsed(new Set(next))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // run once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // runs once — collapsedRef keeps it current

  const barIndex = (id: SectionId) =>
    SECTION_IDS.filter((sid, i) => i < SECTION_IDS.indexOf(id) && collapsed.has(sid)).length

  return (
    <CollapseContext.Provider value={{ collapsed, barIndex }}>
      {children}
    </CollapseContext.Provider>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/context/SectionCollapseContext.tsx
git commit -m "feat: add SectionCollapseContext with scroll-driven collapse state"
```

---

### Task 3: Create CollapsedBarsOverlay

**Files:**
- Create: `src/components/CollapsedBarsOverlay.tsx`

- [ ] **Step 1: Create the file**

Create `src/components/CollapsedBarsOverlay.tsx`:

```tsx
import { AnimatePresence, motion } from 'motion/react'
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
                transition: 'background 0.15s',
              }}
              whileHover={{ background: theme.dark ? 'rgba(30,41,59,0.95)' : 'rgba(248,250,252,0.95)' } as never}
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
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/CollapsedBarsOverlay.tsx
git commit -m "feat: add CollapsedBarsOverlay with animated section icons"
```

---

### Task 4: Create CollapsibleSection wrapper

**Files:**
- Create: `src/components/CollapsibleSection.tsx`

- [ ] **Step 1: Create the file**

Create `src/components/CollapsibleSection.tsx`:

```tsx
import { motion } from 'motion/react'
import { useCollapseContext } from '../context/SectionCollapseContext'

const BAR_HEIGHT = 52

interface Props {
  sectionId: string
  children: React.ReactNode
}

export default function CollapsibleSection({ sectionId, children }: Props) {
  const { collapsed } = useCollapseContext()
  const isCollapsed = collapsed.has(sectionId as never)

  return (
    <div style={{ position: 'relative' }}>
      <motion.div
        animate={isCollapsed
          ? { height: 0, opacity: 0 }
          : { height: 'auto', opacity: 1 }
        }
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ overflow: 'hidden' }}
      >
        {children}
      </motion.div>

      {/* Spacer: keeps section in scroll flow when collapsed so scrollIntoView works */}
      {isCollapsed && (
        <div style={{ height: BAR_HEIGHT }} aria-hidden="true" />
      )}
    </div>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/CollapsibleSection.tsx
git commit -m "feat: add CollapsibleSection wrapper with height/opacity animation"
```

---

### Task 5: Wire everything into App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add imports to App.tsx**

Add these three imports after the existing imports in `src/App.tsx`:

```tsx
import { SectionCollapseProvider } from './context/SectionCollapseContext'
import CollapsedBarsOverlay from './components/CollapsedBarsOverlay'
import CollapsibleSection from './components/CollapsibleSection'
```

- [ ] **Step 2: Wrap `<ThemeContext.Provider>` with `<SectionCollapseProvider>`**

Find:
```tsx
  return (
    <ThemeContext.Provider value={theme}>
```

Replace with:
```tsx
  return (
    <SectionCollapseProvider>
    <ThemeContext.Provider value={theme}>
```

- [ ] **Step 3: Add `<CollapsedBarsOverlay />` right after `<Navbar />`**

Find:
```tsx
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>
```

Replace with:
```tsx
        <Navbar />
        <CollapsedBarsOverlay />
        <main style={{ position: 'relative', zIndex: 1 }}>
```

- [ ] **Step 4: Wrap each section in `<CollapsibleSection>`**

Find the `<main>` content block:
```tsx
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
```

Replace with:
```tsx
          <CollapsibleSection sectionId="hero"><Hero /></CollapsibleSection>
          <CollapsibleSection sectionId="about"><About /></CollapsibleSection>
          <CollapsibleSection sectionId="skills"><Skills /></CollapsibleSection>
          <CollapsibleSection sectionId="experience"><Experience /></CollapsibleSection>
          <CollapsibleSection sectionId="projects"><Projects /></CollapsibleSection>
          <CollapsibleSection sectionId="contact"><Contact /></CollapsibleSection>
```

- [ ] **Step 5: Close `<SectionCollapseProvider>` at the end of the return**

Find the last closing tag:
```tsx
    </ThemeContext.Provider>
  )
```

Replace with:
```tsx
    </ThemeContext.Provider>
    </SectionCollapseProvider>
  )
```

- [ ] **Step 6: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire SectionCollapseProvider, CollapsedBarsOverlay, and CollapsibleSection into App"
```

---

### Task 6: Visual verification + mobile guard

**Files:**
- Modify: `src/index.css`
- Verify: browser at http://localhost:5173

- [ ] **Step 1: Add mobile guard to hide overlay bars below 768px**

Append to `src/index.css`:

```css
@media (max-width: 768px) {
  .collapse-overlay-hidden { display: none; }
}
```

Then in `CollapsedBarsOverlay.tsx`, add `className="collapse-overlay-hidden"` to the outermost `<div>` — wait, we need to do this without re-editing the already-committed file. Instead, add inline media query handling:

Actually, handle mobile in `CollapsedBarsOverlay.tsx` by checking window width:

In `CollapsedBarsOverlay.tsx`, add at the top of the component body:
```tsx
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  if (isMobile) return null
```

- [ ] **Step 2: Run dev server and verify**

```bash
npm run dev
```

Open http://localhost:5173. Verify:
1. Scroll down — Hero shrinks to 0 height, bar appears in overlay below navbar
2. Bar shows: left accent line in Hero's color, `>_` blinking cursor icon, "Hero" label, "click to return ↑", "01"
3. Scroll further — About collapses, its bar stacks below Hero's bar
4. Continue scrolling — all 6 bars can be stacked
5. Click a bar — page smooth-scrolls to that section, section expands back
6. Scroll back up — sections expand as you reach them
7. Navbar remains visible throughout
8. Below 768px — bars do not appear

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 4: Commit**

```bash
git add src/components/CollapsedBarsOverlay.tsx src/index.css
git commit -m "fix: hide collapse bars on mobile"
```

---

## Self-Review

**Spec coverage:**
- ✅ All 6 sections collapse
- ✅ Each bar: section name, number, thematic animated icon, accent color
- ✅ Click to return via scrollIntoView
- ✅ Shrink animation (height + opacity via motion.div)
- ✅ Scroll-driven collapse/expand (passive scroll listener)
- ✅ 68px navbar + 52px bar height constants used throughout
- ✅ Bars stack with correct `top` offset per barIndex
- ✅ Spacer maintains scroll presence when collapsed
- ✅ Mobile: bars hidden
- ✅ Navbar unaffected (zIndex 50, bars at 49)

**Placeholder scan:** None.

**Type consistency:** `SectionId` union used in context; overlay and wrapper cast `as never` for the has() call — acceptable since SECTION_META and SECTION_IDS are the same set of literals.
