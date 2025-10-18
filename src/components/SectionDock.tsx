import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface Section {
  id: string;
  title: string;
}

interface SectionDockProps {
  sections: Section[];
  activeSection: string | null;
  onSectionClick: (id: string) => void;
}

export const SectionDock = ({ sections, activeSection, onSectionClick }: SectionDockProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const heroThreshold = 600; // Show dock after scrolling past hero

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      const pastHero = currentScrollY > heroThreshold;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (pastHero && scrollingUp) {
        setIsVisible(true);
      } else {
        // Delay hiding to avoid jank
        scrollTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 150);
      }

      setLastScrollY(currentScrollY);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [lastScrollY]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-border/50 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-240"
      style={{
        animation: 'slideInDock 240ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={`
                group flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap
                transition-all duration-240 min-h-[48px]
                ${
                  activeSection === section.id
                    ? 'bg-primary/20 border border-primary/50 text-primary'
                    : 'hover:bg-primary/10 border border-transparent text-muted-foreground hover:text-foreground'
                }
              `}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <span className="font-mono text-sm font-medium">{section.title}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-240 ${
                  activeSection === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
