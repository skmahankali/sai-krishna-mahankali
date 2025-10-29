import { useState, useEffect, useRef } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { ContactForm } from "@/components/ContactForm";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ScrollHeader } from "@/components/ScrollHeader";
import { CollapsedSectionStack } from "@/components/CollapsedSectionStack";

const Index = () => {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [showStack, setShowStack] = useState(false);
  const lastScrollY = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sections = [
    { id: "about", title: "About Me" },
    { id: "experience", title: "Professional Journey" },
    { id: "skills", title: "Technical Expertise" },
    { id: "projects", title: "Featured Work" },
    { id: "certifications", title: "Professional Credentials" },
    { id: "contact", title: "Let's Connect" },
  ];

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // IntersectionObserver to track which sections are above viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const rect = entry.target.getBoundingClientRect();
          
          // Section is above viewport (scrolled past)
          if (rect.bottom < 100 && scrollDirection === 'up') {
            setCollapsedSections((prev) => {
              if (!prev.includes(sectionId)) {
                return [...prev, sectionId];
              }
              return prev;
            });
          } else if (rect.top < window.innerHeight && scrollDirection === 'down') {
            // Section is coming back into view
            setCollapsedSections((prev) => prev.filter((id) => id !== sectionId));
          }
        });
      },
      { threshold: [0, 0.1, 0.5, 1], rootMargin: '-100px 0px 0px 0px' }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [scrollDirection]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
      if (direction !== scrollDirection && currentScrollY > 100) {
        setScrollDirection(direction);
      }

      // Show stack only when scrolling up and past hero
      if (direction === 'up' && currentScrollY > 300) {
        setShowStack(true);
      } else if (direction === 'down') {
        setShowStack(false);
        setCollapsedSections([]); // Clear collapsed sections when scrolling down
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <ScrollHeader />
      <CollapsedSectionStack
        sections={sections}
        collapsedSections={collapsedSections}
        isVisible={showStack}
        onSectionClick={scrollToSection}
      />
      
      <div className="relative z-10">
        <Hero />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-12 space-y-8">
          {/* About Me */}
          <section 
            ref={(el) => (sectionRefs.current["about"] = el)} 
            id="about"
            className="transition-all duration-280 ease-out"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className="glass-panel p-8 rounded-xl border-2 border-border">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient mb-6">
                About Me
              </h2>
              <About />
            </div>
          </section>

          {/* Experience */}
          <section 
            ref={(el) => (sectionRefs.current["experience"] = el)} 
            id="experience"
            className="transition-all duration-280 ease-out"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className="glass-panel p-8 rounded-xl border-2 border-border">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient mb-6">
                Professional Journey
              </h2>
              <Experience />
            </div>
          </section>

          {/* Skills */}
          <section 
            ref={(el) => (sectionRefs.current["skills"] = el)} 
            id="skills"
            className="transition-all duration-280 ease-out"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className="glass-panel p-8 rounded-xl border-2 border-border">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient mb-6">
                Technical Expertise
              </h2>
              <Skills />
            </div>
          </section>

          {/* Projects */}
          <section 
            ref={(el) => (sectionRefs.current["projects"] = el)} 
            id="projects"
            className="transition-all duration-280 ease-out"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className="glass-panel p-8 rounded-xl border-2 border-border">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient mb-6">
                Featured Work
              </h2>
              <Projects />
            </div>
          </section>

          {/* Certifications */}
          <section 
            ref={(el) => (sectionRefs.current["certifications"] = el)} 
            id="certifications"
            className="transition-all duration-280 ease-out"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className="glass-panel p-8 rounded-xl border-2 border-border">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient mb-6">
                Professional Credentials
              </h2>
              <Certifications />
            </div>
          </section>

          {/* Contact */}
          <section 
            ref={(el) => (sectionRefs.current["contact"] = el)} 
            id="contact"
            className="transition-all duration-280 ease-out"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className="glass-panel p-8 rounded-xl border-2 border-border">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient mb-6">
                Let's Connect
              </h2>
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
