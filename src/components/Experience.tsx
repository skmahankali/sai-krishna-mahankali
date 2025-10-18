import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

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
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-tertiary hidden md:block" />
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <Card
            key={index}
            className="glass-panel p-6 md:p-8 group hover:border-primary/50 transition-all duration-300 animate-slide-up relative md:ml-20"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Timeline dot */}
            <div className={`absolute -left-[3.75rem] top-8 w-6 h-6 rounded-full bg-${exp.color} border-4 border-background hidden md:block group-hover:scale-125 transition-transform`} />
            
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-semibold font-display group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">{exp.company}</p>
                </div>
                <span className={`text-sm font-mono px-3 py-1 rounded-full bg-${exp.color}/10 text-${exp.color} self-start`}>
                  {exp.period}
                </span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
