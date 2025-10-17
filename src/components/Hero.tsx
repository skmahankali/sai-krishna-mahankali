import { Button } from "@/components/ui/button";
import { ChevronDown, Terminal, Github, Linkedin } from "lucide-react";
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

      {/* Gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow animation-delay-1000" />
      
      <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 animate-slide-up">
        {/* Terminal indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 mb-8">
          <Terminal className="w-4 h-4 text-primary animate-pulse" />
          <span className="font-mono text-sm text-muted-foreground">System initialized...</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tight">
          <span className="text-gradient">Sai Krishna</span>
          <br />
          <span className="text-foreground">Mahankali</span>
        </h1>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/skmahankali"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 glass-panel border border-primary/30 rounded-full hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
          >
            <Github className="w-6 h-6 text-primary group-hover:text-primary transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/skmaha/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 glass-panel border border-secondary/30 rounded-full hover:border-secondary/60 hover:bg-secondary/10 transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="w-6 h-6 text-secondary group-hover:text-secondary transition-colors" />
          </a>
        </div>

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
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]"
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-8 py-6 text-lg backdrop-blur-sm"
          >
            Get In Touch
          </Button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToAbout}>
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>
  );
};
