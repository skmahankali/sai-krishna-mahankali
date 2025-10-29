import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const experiences = [
  {
    title: "Infrastructure Automation Engineer",
    company: "T. Rowe Price",
    period: "June 2024 – Present",
    description: "Automating infrastructure with Ansible, managing AWX on EKS/EC2, building Docker and Podman environments, and developing custom Python plugins and dynamic inventory scripts. Led the migration of legacy infrastructure to containerized solutions, improving deployment efficiency by 40%. Implemented GitOps workflows and automated remediation playbooks that reduced incident response time significantly.",
    color: "primary",
  },
  {
    title: "DevOps Engineer",
    company: "Elevance Health",
    period: "Jan 2023 – June 2024",
    description: "Progressed from intern to full-time engineer; implemented Terraform, Bitbucket pipelines, and AWS integrations to streamline CI/CD and automation workflows. Designed and deployed multi-account AWS architectures using Infrastructure as Code, integrated security scanning into CI/CD pipelines, and collaborated with cross-functional teams to optimize cloud resource utilization and reduce costs by 25%.",
    color: "secondary",
  },
  {
    title: "DevOps Intern",
    company: "ConnxAI (formerly SmartIMS)",
    period: "May 2022 – Aug 2022",
    description: "Built a CMDB web portal using Python and Django, refining DevOps automation practices. Developed RESTful APIs for asset management and integrated the portal with existing monitoring tools. Created automated scripts for data synchronization and reporting, improving operational visibility across infrastructure components.",
    color: "tertiary",
  },
  {
    title: "Graduate Assistant",
    company: "Old Dominion University",
    period: "Aug 2021 – May 2023",
    description: "Taught Information Literacy; developed features for the ODU RecWell portal using JavaScript. Mentored undergraduate students in web development best practices and collaborated with the IT team to enhance portal functionality. Implemented responsive design improvements and optimized database queries for better performance.",
    color: "primary",
  },
  {
    title: "Network Engineer / DevOps Associate",
    company: "ConnxAI (formerly SmartIMS)",
    period: "Aug 2019 – Aug 2021",
    description: "Transitioned from network engineering to DevOps; implemented Terraform and AWS automation, participated in IoT projects. Managed network infrastructure for enterprise clients, automated network provisioning workflows, and contributed to IoT device management solutions. Established monitoring and alerting systems that improved network uptime and reduced manual intervention.",
    color: "secondary",
  },
  {
    title: "Embedded Systems Intern",
    company: "DRDO (Research Centre Imarat, India)",
    period: "Mar 2018 – May 2018",
    description: "Worked with ring laser gyroscopes and embedded systems for missile navigation technologies. Assisted in testing and calibration of navigation sensors, analyzed performance data, and documented technical specifications. Gained hands-on experience with real-time embedded systems and defense-grade hardware.",
    color: "tertiary",
  },
];

export const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Center timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-tertiary transform -translate-x-1/2 hidden md:block" />
      
      <div className="space-y-12">
        {experiences.map((exp, index) => {
          const isExpanded = expandedIndex === index;
          const isLeft = index % 2 === 0;
          
          return (
            <div
              key={index}
              className={`relative flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot */}
              <div className={`absolute left-1/2 top-8 w-4 h-4 rounded-full bg-${exp.color} border-4 border-background transform -translate-x-1/2 hidden md:block z-10 transition-all duration-300 ${isExpanded ? 'scale-150 shadow-[0_0_20px_currentColor]' : 'group-hover:scale-125'}`} />
              
              {/* Card */}
              <Card
                onClick={() => toggleExpand(index)}
                className={`glass-panel group hover:border-primary/50 transition-all duration-300 cursor-pointer relative w-full md:w-[45%] ${
                  isExpanded ? 'border-primary/60' : ''
                }`}
              >
                <div className="p-6">
                  {/* Compact view */}
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-semibold font-display group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-muted-foreground">{exp.company}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-mono px-3 py-1 rounded-full bg-${exp.color}/10 text-${exp.color}`}>
                        {exp.period}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-primary transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                  
                  {/* Expanded description */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pt-4 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
