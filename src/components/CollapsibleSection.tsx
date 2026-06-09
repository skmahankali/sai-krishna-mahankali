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
      {/* CSS Grid rows: most reliable height-collapse, no JS measurement */}
      <div style={{
        display: 'grid',
        gridTemplateRows: isCollapsed ? '0fr' : '1fr',
        transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{
          minHeight: 0,
          overflow: 'hidden',
          opacity: isCollapsed ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}>
          {children}
        </div>
      </div>

      {/* Spacer grows/shrinks in sync */}
      <div style={{
        height: isCollapsed ? BAR_HEIGHT : 0,
        transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }} aria-hidden="true" />
    </div>
  )
}
