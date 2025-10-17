import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    badge: "CCP",
    url: "https://www.credly.com/badges/3bf8c52c-d06c-4af5-bd3c-10a58eddcc80",
    color: "primary",
  },
  {
    title: "Terraform Associate",
    issuer: "HashiCorp",
    badge: "Terraform",
    url: "https://www.credly.com/badges/4a6c520e-7270-4d2d-bc73-5779555213f5",
    color: "secondary",
  },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4 animate-slide-up">
          <div className="inline-flex items-center gap-2 text-primary font-mono text-sm">
            <span className="w-12 h-px bg-primary" />
            <span>Certifications</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            <span className="text-gradient">Professional Credentials</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="glass-panel p-8 group hover:border-primary/50 transition-all duration-300 animate-slide-up relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect */}
              <div className={`absolute -top-1/2 -right-1/2 w-full h-full bg-${cert.color}/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-xl bg-${cert.color}/10 group-hover:bg-${cert.color}/20 transition-colors`}>
                    <Award className={`w-8 h-8 text-${cert.color}`} />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-semibold font-display group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-muted-foreground">{cert.issuer}</p>
                    <div className={`inline-block px-3 py-1 text-sm font-mono bg-${cert.color}/10 text-${cert.color} rounded-full`}>
                      {cert.badge}
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary group/btn"
                  onClick={() => window.open(cert.url, "_blank")}
                >
                  <span>View Credential</span>
                  <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
