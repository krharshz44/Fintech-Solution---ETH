import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const openings = [
  { title: "Senior ML Engineer", team: "AI & Data", location: "Bengaluru", type: "Full-time", desc: "Build and deploy AI models that power personalised financial advice for millions." },
  { title: "Full Stack Developer", team: "Engineering", location: "Remote (India)", type: "Full-time", desc: "Work on our React + Supabase stack to ship features that impact financial literacy." },
  { title: "Product Designer", team: "Design", location: "Bengaluru / Remote", type: "Full-time", desc: "Craft intuitive interfaces for complex financial tools — make money management feel effortless." },
  { title: "Content Writer — Finance", team: "Marketing", location: "Remote (India)", type: "Full-time", desc: "Create engaging articles, guides, and social content on personal finance topics." },
  { title: "Data Analyst", team: "AI & Data", location: "Bengaluru", type: "Full-time", desc: "Analyse user behaviour and financial patterns to improve our AI recommendations." },
];

const perks = [
  "Competitive salary + ESOPs",
  "Flexible remote work",
  "Health insurance for family",
  "Learning budget ₹1L/year",
  "Unlimited sick leave",
  "Annual team retreats",
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden hero-gradient py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(42_90%_55%/0.06),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary font-medium text-sm tracking-widest uppercase mb-4">Careers</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Help India <span className="gradient-text">Build Wealth</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg">
            Join a mission-driven team using AI to make financial literacy accessible to every Indian.
          </motion.p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Why Join Us?</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {perks.map((p) => (
            <motion.span key={p} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card px-4 py-2 rounded-full text-sm text-muted-foreground border border-border/40 flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-primary" /> {p}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Openings */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-10">Open Positions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {openings.map((job, i) => (
              <motion.div key={job.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-6 rounded-2xl group hover:border-primary/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-foreground">{job.title}</h3>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{job.team}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{job.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 border-primary/30 text-primary hover:bg-primary/10">
                    Apply <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
