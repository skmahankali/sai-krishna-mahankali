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
    skills: ["Terraform", "Ansible", "AWX/Ansible Tower/EDA", "HashiCorp Vault"],
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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category, index) => {
        const Icon = category.icon;
        return (
          <Card
            key={index}
            className="glass-panel p-6 group hover:border-primary/50 transition-all duration-300 animate-slide-up relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Corner glow effects */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-primary/0 group-hover:bg-primary/30 transition-all duration-300 blur-xl" />
            <div className="absolute top-0 right-0 w-12 h-12 bg-primary/0 group-hover:bg-primary/30 transition-all duration-300 blur-xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-primary/0 group-hover:bg-primary/30 transition-all duration-300 blur-xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-primary/0 group-hover:bg-primary/30 transition-all duration-300 blur-xl" />
            
            <div className="space-y-4 relative z-10">
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
                    className="bg-card dark:bg-primary/20 text-primary border border-border dark:border-primary/30 hover:border-primary/50 hover:shadow-[0_0_0_6px_rgba(14,165,233,0.12)] transition-all cursor-default font-medium min-h-[44px] px-4 underline-on-hover"
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
  );
};
