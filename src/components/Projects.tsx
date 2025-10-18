import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Grape Leaf Disease Detection using SVM Classifier",
    description: "Machine learning model achieving 90%+ accuracy in classifying grape leaf diseases using MATLAB, OpenCV, and SVM.",
    technologies: ["MATLAB", "OpenCV", "SVM", "Machine Learning"],
    github: "https://github.com/skmahankali/Grape-Leaf-disease-detection-using-SVM-Classifier",
    gradient: "from-primary to-secondary",
  },
  {
    title: "Traffic Collision Analysis",
    description: "Explored correlations in road accidents, identifying temporal and weather-related trends using data analysis.",
    technologies: ["Python", "Pandas", "Seaborn", "Data Analysis"],
    github: "https://github.com/skmahankali/Traffic-Collision-analysis",
    gradient: "from-secondary to-tertiary",
  },
  {
    title: "CPU Temperature Analysis using Numerical Methods",
    description: "Implemented matrix operations and numerical approximations to analyze CPU performance data.",
    technologies: ["Python", "NumPy", "Numerical Methods"],
    github: "https://github.com/skmahankali/CPU-Temperature-analysis",
    gradient: "from-tertiary to-primary",
  },
  {
    title: "Digital Library Search Engine",
    description: "Built a digital library with file upload, search, and reading capabilities.",
    technologies: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
    github: "https://github.com/skmahankali/Digital-Library-Search-Engine",
    gradient: "from-primary to-tertiary",
  },
];

export const Projects = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <Card
          key={index}
          className="glass-panel p-6 group hover:border-primary/50 transition-all duration-300 animate-slide-up overflow-hidden relative"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          
          <div className="relative space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold font-display group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 hover:bg-primary/10 hover:text-primary min-h-[44px] min-w-[44px]"
                onClick={() => window.open(project.github, "_blank")}
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 text-xs font-mono bg-muted/50 rounded-full text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary group/btn min-h-[44px]"
              onClick={() => window.open(project.github, "_blank")}
            >
              <span>View on GitHub</span>
              <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
