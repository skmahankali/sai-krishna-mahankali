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
import { SectionDock } from "@/components/SectionDock";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sections = [
    { id: "about", title: "About Me" },
    { id: "experience", title: "Professional Journey" },
    { id: "skills", title: "Technical Expertise" },
    { id: "projects", title: "Featured Work" },
    { id: "certifications", title: "Professional Credentials" },
    { id: "contact", title: "Let's Connect" },
  ];

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpenSection(sectionId);
    }
  };

  useEffect(() => {
    // Start with all sections expanded (open)
    const timer = setTimeout(() => {
      sections.forEach(section => {
        if (!openSection) {
          setOpenSection(section.id);
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <ScrollHeader />
      <SectionDock
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      
      <div className="relative z-10">
        <Hero />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-12 space-y-6">
          {/* About Me */}
          <div ref={(el) => (sectionRefs.current["about"] = el)} id="about">
            <Collapsible open={openSection === "about"} onOpenChange={() => toggleSection("about")}>
              <CollapsibleTrigger className="w-full">
                <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer will-change-transform">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                      About Me
                    </h2>
                    <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-240 ${openSection === "about" ? "rotate-180" : ""}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-6">
                <About />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Experience */}
          <div ref={(el) => (sectionRefs.current["experience"] = el)} id="experience">
            <Collapsible open={openSection === "experience"} onOpenChange={() => toggleSection("experience")}>
              <CollapsibleTrigger className="w-full">
                <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer will-change-transform">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                      Professional Journey
                    </h2>
                    <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-240 ${openSection === "experience" ? "rotate-180" : ""}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-6">
                <Experience />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Skills */}
          <div ref={(el) => (sectionRefs.current["skills"] = el)} id="skills">
            <Collapsible open={openSection === "skills"} onOpenChange={() => toggleSection("skills")}>
              <CollapsibleTrigger className="w-full">
                <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer will-change-transform">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                      Technical Expertise
                    </h2>
                    <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-240 ${openSection === "skills" ? "rotate-180" : ""}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-6">
                <Skills />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Projects */}
          <div ref={(el) => (sectionRefs.current["projects"] = el)} id="projects">
            <Collapsible open={openSection === "projects"} onOpenChange={() => toggleSection("projects")}>
              <CollapsibleTrigger className="w-full">
                <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer will-change-transform">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                      Featured Work
                    </h2>
                    <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-240 ${openSection === "projects" ? "rotate-180" : ""}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-6">
                <Projects />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Certifications */}
          <div ref={(el) => (sectionRefs.current["certifications"] = el)} id="certifications">
            <Collapsible open={openSection === "certifications"} onOpenChange={() => toggleSection("certifications")}>
              <CollapsibleTrigger className="w-full">
                <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer will-change-transform">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                      Professional Credentials
                    </h2>
                    <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-240 ${openSection === "certifications" ? "rotate-180" : ""}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-6">
                <Certifications />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Contact */}
          <div ref={(el) => (sectionRefs.current["contact"] = el)} id="contact">
            <Collapsible open={openSection === "contact"} onOpenChange={() => toggleSection("contact")}>
              <CollapsibleTrigger className="w-full">
                <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer will-change-transform">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                      Let's Connect
                    </h2>
                    <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-240 ${openSection === "contact" ? "rotate-180" : ""}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-6">
                <ContactForm />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
