import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Instagram, Send } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "saikrishna.mahankali98@gmail.com",
    href: "mailto:saikrishna.mahankali98@gmail.com",
    color: "primary",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/skmaha/",
    color: "secondary",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "View my repositories",
    href: "https://github.com/skmahankali",
    color: "tertiary",
  },
  {
    icon: Instagram,
    label: "Gaming",
    value: "@_d3ad_shot_",
    href: "https://www.instagram.com/_d3ad_shot_/?igsh=MXZhNmdmdmVnYnN3ZA%3D%3D&utm_source=qr",
    color: "primary",
  },
];

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 md:px-8 lg:px-16 bg-muted/20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4 animate-slide-up text-center">
          <div className="inline-flex items-center gap-2 text-primary font-mono text-sm">
            <span className="w-12 h-px bg-primary" />
            <span>Contact</span>
            <span className="w-12 h-px bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            <span className="text-gradient">Let's Connect</span>
          </h2>
          <p className="text-muted-foreground font-mono text-lg max-w-2xl mx-auto">
            Transmitting connection request... Ready to collaborate on your next project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <Card
                key={index}
                className="glass-panel p-6 group hover:border-primary/50 transition-all duration-300 animate-slide-up relative overflow-hidden min-h-[44px]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl bg-${contact.color}/10 group-hover:bg-${contact.color}/20 transition-colors group-hover:scale-110 duration-300`}>
                    <Icon className={`w-6 h-6 text-${contact.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold font-display text-lg mb-1">{contact.label}</h3>
                    <p className="text-muted-foreground text-sm truncate group-hover:text-primary transition-colors">
                      {contact.value}
                    </p>
                  </div>

                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Visit ${contact.label}`}
                  >
                    <Send className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center pt-12 space-y-4">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <p className="text-muted-foreground font-mono text-sm">
            © {new Date().getFullYear()} Sai Krishna Mahankali. Built with precision and curiosity.
          </p>
        </div>
      </div>
    </section>
  );
};
