import { createContext, useContext, useEffect, useRef, useState } from 'react'

const NAVBAR_HEIGHT = 68
const BAR_HEIGHT    = 52

const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'] as const
type SectionId = typeof SECTION_IDS[number]

interface CollapseContextValue {
  collapsed: Set<SectionId>
  barIndex: (id: SectionId) => number
  expandSection: (id: SectionId) => void
}

const CollapseContext = createContext<CollapseContextValue>({
  collapsed: new Set(),
  barIndex: () => 0,
  expandSection: () => {},
})

export function useCollapseContext() {
  return useContext(CollapseContext)
}

export function SectionCollapseProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<Set<SectionId>>(new Set())
  const collapsedRef = useRef<Set<SectionId>>(collapsed)
  collapsedRef.current = collapsed
  const lockUntilRef = useRef<number>(0)
  // Records the scrollY at which each section collapsed — used to expand on scroll-up
  const collapseScrollYRef = useRef<Partial<Record<SectionId, number>>>({})

  useEffect(() => {
    const handleScroll = () => {
      if (Date.now() < lockUntilRef.current) return

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
          collapseScrollYRef.current[id] = window.scrollY
          changed = true
        } else if (current.has(id)) {
          const savedY = collapseScrollYRef.current[id]
          if (savedY !== undefined && window.scrollY <= savedY - 8) {
            next.delete(id)
            delete collapseScrollYRef.current[id]
            changed = true
          }
        }
      })

      if (changed) {
        lockUntilRef.current = Date.now() + 420
        setCollapsed(new Set(next))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const barIndex = (id: SectionId) =>
    SECTION_IDS.filter((sid, i) => i < SECTION_IDS.indexOf(id) && collapsed.has(sid)).length

  const expandSection = (id: SectionId) => {
    lockUntilRef.current = Date.now() + 600
    setCollapsed(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <CollapseContext.Provider value={{ collapsed, barIndex, expandSection }}>
      {children}
    </CollapseContext.Provider>
  )
}
