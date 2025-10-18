import { Button } from "@/components/ui/button";
import { ChevronDown, Terminal, Github, Linkedin, Mail, Gamepad2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

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
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Subtle radial gradient - light mode only */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/[0.03] via-secondary/[0.02] to-transparent blur-3xl" />
      </div>

      {/* Gradient orbs - dark mode only */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow hidden dark:block" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow animation-delay-1000 hidden dark:block" />
      
      <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 animate-slide-up">
        {/* Terminal indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 mb-8">
          <Terminal className="w-4 h-4 text-primary animate-pulse" />
          <span className="font-mono text-sm text-muted-foreground">System initialized...</span>
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
                  className="group p-3 glass-panel border border-primary/30 rounded-full hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Mail className="w-6 h-6 text-foreground dark:text-primary opacity-90 hover:text-primary transition-colors" fill="currentColor" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email</p>
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

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none min-h-[3rem] flex items-end">
          <div className="animate-bounce cursor-pointer pointer-events-auto" onClick={scrollToAbout}>
            <ChevronDown className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};
