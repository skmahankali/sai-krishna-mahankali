import { motion, AnimatePresence } from "framer-motion";

interface CollapsedSection {
  id: string;
  title: string;
}

interface CollapsedSectionStackProps {
  sections: CollapsedSection[];
  collapsedSections: string[];
  isVisible: boolean;
  onSectionClick: (id: string) => void;
}

export const CollapsedSectionStack = ({
  sections,
  collapsedSections,
  isVisible,
  onSectionClick,
}: CollapsedSectionStackProps) => {
  return (
    <AnimatePresence>
      {isVisible && collapsedSections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-20 left-0 right-0 z-40 flex flex-col items-center gap-2 px-4 pointer-events-none"
        >
          {sections
            .filter((section) => collapsedSections.includes(section.id))
            .map((section, index) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.05,
                }}
                onClick={() => onSectionClick(section.id)}
                className="glass-panel pointer-events-auto w-full max-w-2xl h-14 px-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-220 cursor-pointer group"
              >
                <div className="flex items-center justify-between h-full">
                  <h3 className="text-lg font-semibold font-display text-gradient group-hover:scale-105 transition-transform duration-220">
                    {section.title}
                  </h3>
                  <div className="w-2 h-2 rounded-full bg-primary opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-220" />
                </div>
              </motion.button>
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
