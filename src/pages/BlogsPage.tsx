import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const posts = [
  { title: "How to Start Investing in Mutual Funds in 2026", category: "Investing", date: "Mar 25, 2026", readTime: "5 min", excerpt: "A step-by-step guide for beginners to start their SIP journey with as little as ₹500/month." },
  { title: "New vs Old Tax Regime: Which Saves You More?", category: "Tax Planning", date: "Mar 20, 2026", readTime: "7 min", excerpt: "We break down both regimes with real salary examples to help you pick the right one for FY 2026-27." },
  { title: "Emergency Fund: How Much is Enough?", category: "Savings", date: "Mar 15, 2026", readTime: "4 min", excerpt: "Most experts say 6 months — but your number depends on your lifestyle, EMIs, and dependents." },
  { title: "Understanding NPS: The Retirement Tool You're Ignoring", category: "Retirement", date: "Mar 10, 2026", readTime: "6 min", excerpt: "NPS offers tax benefits beyond 80C. Here's why it deserves a spot in your portfolio." },
  { title: "Credit Score 101: How to Build & Maintain 750+", category: "Credit", date: "Mar 5, 2026", readTime: "5 min", excerpt: "Your credit score affects loan rates, credit card approvals, and even rental applications." },
  { title: "Gold vs Gold ETFs vs Sovereign Gold Bonds", category: "Investing", date: "Feb 28, 2026", readTime: "6 min", excerpt: "Physical gold has drawbacks. We compare all three options for the modern Indian investor." },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden hero-gradient py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(155_70%_45%/0.06),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary font-medium text-sm tracking-widest uppercase mb-4">Blog</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Financial <span className="gradient-text">Insights & Guides</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg">
            Expert articles on personal finance, investing, and tax planning — tailored for India.
          </motion.p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((p, i) => (
            <motion.article key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/30 transition-all">
              <div className="h-40 bg-gradient-to-br from-primary/10 via-card to-accent/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{p.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span>{p.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.readTime}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.excerpt}</p>
                <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
