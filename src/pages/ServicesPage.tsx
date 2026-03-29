import { motion } from "framer-motion";
import { Brain, PieChart, TrendingUp, Shield, Calculator, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Brain,
    title: "AI Financial Advisor",
    desc: "Get 24/7 personalised financial advice powered by advanced AI models trained on Indian financial data. Ask about tax saving, investment strategies, or debt management.",
    features: ["Real-time chat", "Context-aware advice", "Multi-language support"],
    cta: "/chat",
  },
  {
    icon: PieChart,
    title: "Smart Analytics Dashboard",
    desc: "Visualise your income, expenses, savings, and investments with beautiful interactive charts. Understand where every rupee goes.",
    features: ["Expense breakdown", "Savings tracking", "Trend analysis"],
    cta: "/dashboard",
  },
  {
    icon: TrendingUp,
    title: "SIP & Investment Calculator",
    desc: "Plan your mutual fund SIPs, lump sum investments, and retirement corpus with our powerful calculators tuned for Indian markets.",
    features: ["SIP projections", "Goal-based planning", "Inflation-adjusted returns"],
    cta: "/feature/sip-calculator",
  },
  {
    icon: Shield,
    title: "Money Health Score",
    desc: "Get a comprehensive health score for your finances based on savings ratio, debt levels, emergency fund, and investment diversification.",
    features: ["Instant scoring", "Actionable tips", "Progress tracking"],
    cta: "/feature/money-health-score",
  },
  {
    icon: Calculator,
    title: "Tax Optimisation",
    desc: "Maximise your tax savings under both old and new regimes. AI-recommended deductions under 80C, 80D, HRA, and more.",
    features: ["Regime comparison", "Section-wise breakdown", "Proof checklist"],
    cta: "/chat",
  },
  {
    icon: BookOpen,
    title: "Financial Literacy Hub",
    desc: "Learn about personal finance through curated articles, guides, and interactive modules designed for the Indian context.",
    features: ["Beginner-friendly", "Expert articles", "Video tutorials"],
    cta: "/blogs",
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden hero-gradient py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(42_90%_55%/0.06),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary font-medium text-sm tracking-widest uppercase mb-4">Our Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Everything You Need to <span className="gradient-text">Build Wealth</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg">
            From AI-powered advice to interactive calculators — tools built for the Indian investor.
          </motion.p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-6 rounded-2xl flex flex-col group hover:border-primary/30 transition-all hover:shadow-[0_0_30px_hsl(155_70%_45%/0.1)]">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{s.desc}</p>
              <ul className="space-y-1 mb-5">
                {s.features.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 self-start" onClick={() => navigate(s.cta)}>
                Explore <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
