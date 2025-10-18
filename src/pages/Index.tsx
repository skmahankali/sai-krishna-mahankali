import { useState } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { ContactForm } from "@/components/ContactForm";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ScrollHeader } from "@/components/ScrollHeader";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const [openSection, setOpenSection] = useState<string | null>("about");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <ScrollHeader />
      
      <div className="relative z-10">
        <Hero />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-12 space-y-6">
          {/* About Me */}
          <Collapsible open={openSection === "about"} onOpenChange={() => toggleSection("about")}>
            <CollapsibleTrigger className="w-full">
              <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                    About Me
                  </h2>
                  <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-300 ${openSection === "about" ? "rotate-180" : ""}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-6">
              <About />
            </CollapsibleContent>
          </Collapsible>

          {/* Experience */}
          <Collapsible open={openSection === "experience"} onOpenChange={() => toggleSection("experience")}>
            <CollapsibleTrigger className="w-full">
              <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                    Professional Journey
                  </h2>
                  <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-300 ${openSection === "experience" ? "rotate-180" : ""}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-6">
              <Experience />
            </CollapsibleContent>
          </Collapsible>

          {/* Skills */}
          <Collapsible open={openSection === "skills"} onOpenChange={() => toggleSection("skills")}>
            <CollapsibleTrigger className="w-full">
              <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                    Technical Expertise
                  </h2>
                  <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-300 ${openSection === "skills" ? "rotate-180" : ""}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-6">
              <Skills />
            </CollapsibleContent>
          </Collapsible>

          {/* Projects */}
          <Collapsible open={openSection === "projects"} onOpenChange={() => toggleSection("projects")}>
            <CollapsibleTrigger className="w-full">
              <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                    Featured Work
                  </h2>
                  <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-300 ${openSection === "projects" ? "rotate-180" : ""}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-6">
              <Projects />
            </CollapsibleContent>
          </Collapsible>

          {/* Certifications */}
          <Collapsible open={openSection === "certifications"} onOpenChange={() => toggleSection("certifications")}>
            <CollapsibleTrigger className="w-full">
              <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                    Professional Credentials
                  </h2>
                  <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-300 ${openSection === "certifications" ? "rotate-180" : ""}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-6">
              <Certifications />
            </CollapsibleContent>
          </Collapsible>

          {/* Contact */}
          <Collapsible open={openSection === "contact"} onOpenChange={() => toggleSection("contact")}>
            <CollapsibleTrigger className="w-full">
              <div className="glass-panel p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all group cursor-pointer">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient">
                    Let's Connect
                  </h2>
                  <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-300 ${openSection === "contact" ? "rotate-180" : ""}`} />
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
  );
};

export default Index;
