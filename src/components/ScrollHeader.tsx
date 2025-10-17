import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";

export const ScrollHeader = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;

      // Collapse on scroll up after passing hero
      if (currentScrollY > heroHeight && currentScrollY < lastScrollY) {
        setIsCollapsed(true);
      } else if (currentScrollY < 100) {
        setIsCollapsed(false);
      }

      setLastScrollY(currentScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!isCollapsed) return null;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50 backdrop-blur-xl"
      style={{
        transform: isCollapsed ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold font-display">
            <span className="text-gradient">Sai Krishna</span>{" "}
            <span className="text-foreground">Mahankali</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/skmahankali"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 text-foreground opacity-90 hover:text-primary transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/skmaha/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-foreground opacity-90 hover:text-secondary transition-colors" />
          </a>
        </div>
      </div>
    </header>
  );
};
