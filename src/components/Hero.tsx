import { Button } from "@/components/ui/button";
import { Terminal, Github, Linkedin, Gamepad2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import profilePhoto from "@/assets/profile-photo.png";

export const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "Automating with purpose, engineering with curiosity.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow animation-delay-1000" />
      
      <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 animate-slide-up">
        {/* Terminal indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 mb-8">
          <Terminal className="w-4 h-4 text-primary animate-pulse" />
          <span className="font-mono text-sm text-muted-foreground">System initialized...</span>
        </div>

        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-300" />
            <img
              src={profilePhoto}
              alt="Sai Krishna Mahankali"
              className="relative w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-2 border-primary/40 shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 md:hover:scale-115"
              style={{ transitionDuration: '250ms' }}
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tight">
          <span className="text-gradient">Sai Krishna</span>
          <br />
          <span className="dark:text-foreground text-foreground">Mahankali</span>
        </h1>

        {/* Social Links */}
        <TooltipProvider>
          <div className="flex items-center justify-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/skmahankali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 glass-panel border border-primary/30 rounded-full hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Github className="w-6 h-6 text-foreground dark:text-primary opacity-90 hover:text-primary transition-colors" fill="currentColor" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://www.linkedin.com/in/skmaha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 glass-panel border border-secondary/30 rounded-full hover:border-secondary/60 hover:bg-secondary/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Linkedin className="w-6 h-6 text-foreground dark:text-secondary opacity-90 hover:text-secondary transition-colors" fill="currentColor" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="mailto:saikrishna.mahankali98@gmail.com"
                  className="group p-3 glass-panel border border-destructive/30 rounded-full hover:border-destructive/60 hover:bg-destructive/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <svg 
                    className="w-6 h-6" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.15 8.09 4 7.82 4 7.53C4 6.86 4.73 6.46 5.3 6.81L12 11L18.7 6.81C19.27 6.46 20 6.86 20 7.53C20 7.82 19.85 8.09 19.6 8.25Z" 
                      fill="#EA4335"
                    />
                  </svg>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Gmail</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://www.instagram.com/_d3ad_shot_/?igsh=MXZhNmdmdmVnYnN3ZA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 glass-panel border border-tertiary/30 rounded-full hover:border-tertiary/60 hover:bg-tertiary/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Gamepad2 className="w-6 h-6 text-foreground dark:text-tertiary opacity-90 hover:text-tertiary transition-colors" fill="currentColor" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Gaming</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        <div className="h-16 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-muted-foreground font-mono">
            {text}
            <span className="inline-block w-1 h-6 bg-primary ml-1 animate-pulse" />
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            size="lg"
            onClick={scrollToAbout}
            className="group relative overflow-hidden bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8 py-6 text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] min-h-[44px]"
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-8 py-6 text-lg backdrop-blur-sm bg-card min-h-[44px]"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};
