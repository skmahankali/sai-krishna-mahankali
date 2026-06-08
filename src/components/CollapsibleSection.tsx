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
