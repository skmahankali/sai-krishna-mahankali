import { useState, useEffect, useRef } from "react";
import { Hero } from "@/components/Hero";
import { Photo } from "@/components/Photo";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { ContactForm } from "@/components/ContactForm";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ScrollHeader } from "@/components/ScrollHeader";

const Index = () => {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  const sections = [
    { id: "photo", title: "Photo" },
    { id: "about", title: "About Me" },
    { id: "experience", title: "Professional Journey" },
    { id: "skills", title: "Technical Expertise" },
    { id: "projects", title: "Featured Work" },
    { id: "certifications", title: "Professional Credentials" },
    { id: "contact", title: "Let's Connect" },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
      if (direction !== scrollDirection && currentScrollY > 100) {
        setScrollDirection(direction);
      }
      
      lastScrollY.current = currentScrollY;

      // Apply compression/expansion effect to sections
      Object.entries(sectionRefs.current).forEach(([id, ref]) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
          const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
          
          if (direction === 'up') {
            // Compress: reduce scale and padding
            const scale = 0.96 + (scrollProgress * 0.04); // 0.96 to 1.0
            ref.style.transform = `scaleY(${scale})`;
            ref.style.paddingTop = `${scrollProgress * 24}px`;
            ref.style.paddingBottom = `${scrollProgress * 24}px`;
          } else {
            // Expand: full scale and padding
            ref.style.transform = 'scaleY(1)';
            ref.style.paddingTop = '24px';
            ref.style.paddingBottom = '24px';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <ScrollHeader />
      
      <div className="relative z-10">
        <Hero />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-12 space-y-8">
          {/* Photo */}
          <section 
            ref={(el) => (sectionRefs.current["photo"] = el)} 
            id="photo"
            className="transition-all duration-300 ease-out origin-top"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform, padding'
            }}
          >
            <div className="glass-panel p-8 rounded-xl border-2 border-border">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient mb-6 text-center">
                Photo
              </h2>
              <Photo />
            </div>
          </section>

          {/* About Me */}
          <section 
            ref={(el) => (sectionRefs.current["about"] = el)} 
            id="about"
            className="transition-all duration-300 ease-out origin-top"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform, padding'
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
            className="transition-all duration-300 ease-out origin-top"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform, padding'
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
            className="transition-all duration-300 ease-out origin-top"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform, padding'
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
            className="transition-all duration-300 ease-out origin-top"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform, padding'
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
            className="transition-all duration-300 ease-out origin-top"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform, padding'
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
            className="transition-all duration-300 ease-out origin-top"
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform, padding'
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
