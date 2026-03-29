import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden hero-gradient py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(155_70%_45%/0.06),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary font-medium text-sm tracking-widest uppercase mb-4">Contact Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            We'd Love to <span className="gradient-text">Hear From You</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            {[
              { icon: Mail, label: "Email", value: "hello@aimoneymentor.in" },
              { icon: Phone, label: "Phone", value: "+91 80-4567-8900" },
              { icon: MapPin, label: "Office", value: "WeWork, Koramangala, Bengaluru 560034" },
            ].map((c) => (
              <motion.div key={c.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{c.label}</p>
                  <p className="text-sm text-muted-foreground">{c.value}</p>
                </div>
              </motion.div>
            ))}

            <div className="glass-card p-5 rounded-2xl">
              <p className="text-sm font-display font-semibold text-foreground mb-1">Business Hours</p>
              <p className="text-xs text-muted-foreground">Mon–Fri: 9:00 AM – 6:00 PM IST</p>
              <p className="text-xs text-muted-foreground">Sat: 10:00 AM – 2:00 PM IST</p>
            </div>
          </div>

          {/* Form */}
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="lg:col-span-3 glass-card p-8 rounded-2xl space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Name</label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="bg-secondary/30 border-border/60" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="bg-secondary/30 border-border/60" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Subject</label>
              <Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" className="bg-secondary/30 border-border/60" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Message</label>
              <Textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us more..." className="bg-secondary/30 border-border/60 resize-none" />
            </div>
            <Button type="submit" className="w-full">
              <Send className="h-4 w-4 mr-2" /> Send Message
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
