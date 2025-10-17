import { Card } from "@/components/ui/card";
import { GraduationCap, User } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4 animate-slide-up">
          <div className="inline-flex items-center gap-2 text-primary font-mono text-sm">
            <span className="w-12 h-px bg-primary" />
            <span>About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            <span className="text-gradient">Bio & Background</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-panel p-8 group hover:border-primary/50 transition-all duration-300 animate-slide-up">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold font-display">About Me!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a DevOps Engineer with over six years of experience in IT, currently specializing in automation. 
                  I'm focused on expanding my expertise to become a Site Reliability Engineer (SRE). I'm passionate about 
                  technology and constantly exploring new developments in DevOps and AI.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Outside of work, I enjoy flying drones, gaming, and practicing archery—activities that keep me curious, 
                  precise, and creative.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-panel p-8 group hover:border-secondary/50 transition-all duration-300 animate-slide-up animation-delay-200">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                <GraduationCap className="w-6 h-6 text-secondary" />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold font-display">Education</h3>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">M.S. in Computer Science</h4>
                  <p className="text-muted-foreground">Old Dominion University</p>
                  <p className="text-sm text-primary font-mono">2021 – 2023</p>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">B.Tech in Electronics and Communication Engineering</h4>
                  <p className="text-muted-foreground">Jawaharlal Nehru Technological University</p>
                  <p className="text-sm text-primary font-mono">2015 – 2019</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
