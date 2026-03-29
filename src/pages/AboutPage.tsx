import { motion } from "framer-motion";
import { Shield, Target, Users, Zap, Award, Globe } from "lucide-react";

const values = [
  { icon: Shield, title: "Trust & Security", desc: "Bank-grade encryption and compliance with RBI guidelines to keep your data safe." },
  { icon: Target, title: "Goal-Driven", desc: "Every feature is built to help you reach your financial milestones faster." },
  { icon: Users, title: "People First", desc: "Designed for everyday Indians — from first-time earners to seasoned investors." },
  { icon: Zap, title: "AI-Powered", desc: "Cutting-edge AI models analyse your finances and deliver personalised advice." },
  { icon: Award, title: "Transparency", desc: "No hidden fees, no affiliate bias — just honest, data-backed recommendations." },
  { icon: Globe, title: "India Focused", desc: "Deep understanding of Indian tax laws, mutual funds, PPF, NPS, and more." },
];

const team = [
  { name: "Arjun Mehta", role: "CEO & Co-Founder", bio: "Ex-Goldman Sachs, 12 years in wealth management." },
  { name: "Priya Sharma", role: "CTO", bio: "Former Google engineer, AI/ML specialist." },
  { name: "Rahul Desai", role: "Head of Product", bio: "Built fintech products used by 10M+ Indians." },
  { name: "Ananya Iyer", role: "Chief Compliance Officer", bio: "SEBI-registered advisor with 15 years of regulatory experience." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(155_70%_45%/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary font-medium text-sm tracking-widest uppercase mb-4">About Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Making India <span className="gradient-text">Financially Smarter</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg leading-relaxed">
            AI Money Mentor was born from a simple belief — every Indian deserves access to expert-level financial guidance, regardless of their income or background. We combine artificial intelligence with deep financial expertise to democratise wealth building.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To empower 100 million Indians with AI-driven financial literacy and personalised investment strategies by 2030.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that smart money management shouldn't require a chartered accountant or an expensive financial advisor. Our AI analyses your unique situation — income, expenses, goals, risk appetite — and delivers actionable advice in plain language.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8 rounded-2xl border border-primary/20 glow-border">
            <div className="grid grid-cols-2 gap-6 text-center">
              {[{ val: "2M+", label: "Users" }, { val: "₹500Cr+", label: "Assets Guided" }, { val: "98%", label: "Satisfaction" }, { val: "50+", label: "Cities" }].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-display font-bold gradient-text">{s.val}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 rounded-2xl group hover:border-primary/30 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">Leadership Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {team.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 rounded-2xl text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-display font-bold text-primary">{t.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground">{t.name}</h3>
              <p className="text-xs text-primary font-medium mb-2">{t.role}</p>
              <p className="text-xs text-muted-foreground">{t.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
