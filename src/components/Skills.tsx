import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Cloud, Workflow, Activity, Network, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Programming & Scripting",
    icon: Code2,
    color: "primary",
    skills: ["Python", "Django", "PHP", "HTML/CSS"],
  },
  {
    title: "Automation & IaC",
    icon: Workflow,
    color: "secondary",
    skills: ["Terraform", "Ansible", "AWX/Tower/EDA", "HashiCorp Vault"],
  },
  {
    title: "Cloud & Containers",
    icon: Cloud,
    color: "tertiary",
    skills: ["AWS (EC2, EKS, IAM, S3)", "CloudFormation", "Amazon Connect", "Docker", "Podman", "Kubernetes"],
  },
  {
    title: "CI/CD & Version Control",
    icon: Activity,
    color: "primary",
    skills: ["GitHub", "GitLab", "Bitbucket", "Bamboo", "GitLab CI/CD"],
  },
  {
    title: "Monitoring & Logging",
    icon: Activity,
    color: "secondary",
    skills: ["Grafana", "Prometheus", "Splunk", "Datadog"],
  },
  {
    title: "Networking & Systems",
    icon: Network,
    color: "tertiary",
    skills: ["SD-WAN", "Linux (RHEL/Ubuntu)", "SSH/Putty"],
  },
  {
    title: "Other Tools",
    icon: Wrench,
    color: "primary",
    skills: ["Genesys Cloud"],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4 animate-slide-up">
          <div className="inline-flex items-center gap-2 text-primary font-mono text-sm">
            <span className="w-12 h-px bg-primary" />
            <span>Skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            <span className="text-gradient">Technical Expertise</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="glass-panel p-6 group hover:border-primary/50 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-${category.color}/10 group-hover:bg-${category.color}/20 transition-colors`}>
                      <Icon className={`w-6 h-6 text-${category.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold font-display">{category.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-muted/50 hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
