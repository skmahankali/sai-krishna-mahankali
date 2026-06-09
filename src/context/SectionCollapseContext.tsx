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

  const expandSection = (id: SectionId) => {
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
