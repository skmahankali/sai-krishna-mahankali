import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Transmission received",
      description: "I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="glass-panel p-8 md:p-12">
        <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
          {/* Mail Icon */}
          <div className="hidden md:flex justify-center items-start pt-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative p-8 rounded-2xl bg-primary/10 border-2 border-primary/30">
                <Mail className="w-20 h-20 text-primary" />
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium font-mono">
                Full Name *
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="bg-background border-border focus:border-primary focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium font-mono">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="bg-background border-border focus:border-primary focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium font-mono">
                Purpose / Message *
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project or inquiry..."
                className="bg-background border-border focus:border-primary focus:ring-primary/20 min-h-[150px] resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary text-white font-semibold py-6 text-lg group"
            >
              <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </div>
      </Card>

      {/* Footer */}
      <div className="text-center pt-12 space-y-4">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <p className="text-muted-foreground font-mono text-sm">
          © {new Date().getFullYear()} Sai Krishna Mahankali. Built with precision and curiosity.
        </p>
      </div>
    </div>
  );
};
