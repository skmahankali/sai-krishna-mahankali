import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Cloud, Workflow, Activity, Network, Wrench, Database, Terminal, Globe, Users } from "lucide-react";

const skillCategories = [
  {
    title: "Programming & Automation Languages",
    icon: Code2,
    color: "primary",
    skills: ["Python", "Go", "Java", "JavaScript", "Node.js", "PHP", "Shell Scripting", "YAML", "JSON", "MATLAB"],
  },
  {
    title: "Containerization & Orchestration",
    icon: Workflow,
    color: "secondary",
    skills: ["Docker", "Kubernetes (EKS/AKS)", "Helm", "Podman"],
  },
  {
    title: "Monitoring, Logging & Observability",
    icon: Activity,
    color: "tertiary",
    skills: ["Grafana", "Prometheus (Pathfinder)", "ELK Stack (Elasticsearch, Logstash, Kibana)", "Splunk", "ServiceNow"],
  },
  {
    title: "Databases & Data Processing",
    icon: Database,
    color: "primary",
    skills: ["MySQL", "DynamoDB", "AWS RDS", "AWS Redshift", "PowerScale (Isilon)", "Glue"],
  },
  {
    title: "Infrastructure as Code & Configuration Management",
    icon: Terminal,
    color: "secondary",
    skills: ["Ansible (Tower/AWX, EDA, Vault, Navigator, Lint, Galaxy Collections)", "Terraform", "Helm", "HashiCorp Vault"],
  },
  {
    title: "Cloud Services and Platforms",
    icon: Cloud,
    color: "tertiary",
    skills: ["Amazon Web Services (AWS)", "Microsoft Azure"],
  },
  {
    title: "Networking & Virtualization",
    icon: Network,
    color: "primary",
    skills: ["SD-WAN", "Cisco Routers & Switches", "VMware vCenter/ESXi", "NSX", "TCP/IP", "UDP", "VLANs", "SSH", "Wireshark", "PuTTY"],
  },
  {
    title: "Collaboration & Project Management",
    icon: Users,
    color: "secondary",
    skills: ["Jira", "Confluence", "Unity (SDLC)", "ServiceNow", "MS Office", "VS Code"],
  },
  {
    title: "Cloud Platforms & Services",
    icon: Cloud,
    color: "tertiary",
    skills: ["Amazon Web Services (EC2, EKS, Lambda, API Gateway, RDS, DynamoDB, S3, CloudWatch, Glue, Step Functions, Redshift, Lex, Elastic Beanstalk)", "Microsoft Azure (AKS, VM, Networking)"],
  },
  {
    title: "CI/CD & DevOps Tooling",
    icon: Workflow,
    color: "primary",
    skills: ["Git", "GitHub", "GitLab CI/CD", "Bitbucket", "Jenkins", "Bamboo", "Terraform Cloud"],
  },
  {
    title: "Web Development & APIs",
    icon: Globe,
    color: "secondary",
    skills: ["Python (Flask, Django)", "React.js", "Spring", "jQuery", "HTML", "CSS", "RESTful API Design", "SOAP API"],
  },
  {
    title: "Operating Systems",
    icon: Wrench,
    color: "tertiary",
    skills: ["Linux (RHEL, Ubuntu)", "Windows Server Administration"],
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
