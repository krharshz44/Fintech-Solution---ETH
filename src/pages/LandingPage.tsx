import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Shield, Brain, PieChart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import logo from "@/assets/logo.png";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Advice",
    description: "Get personalized financial guidance from our intelligent mentor",
    slug: "ai-powered-advice",
  },
  {
    icon: PieChart,
    title: "Smart Analytics",
    description: "Visual breakdowns of your spending, savings, and investment potential",
    slug: "smart-analytics",
  },
  {
    icon: TrendingUp,
    title: "SIP Calculator",
    description: "Precise monthly investment plans tailored to your goals",
    slug: "sip-calculator",
  },
  {
    icon: Shield,
    title: "Money Health Score",
    description: "Know exactly where you stand with our proprietary scoring system",
    slug: "money-health-score",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen hero-gradient overflow-hidden">
      

      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by AI
          </div>

          <img src={logo} alt="AI Money Mentor" className="h-20 w-20 mx-auto mb-6" width={80} height={80} />

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 text-foreground">
            Your AI Financial Mentor
            <br />
            <span className="gradient-text">in 60 Seconds</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Get your personalized Money Health Score, smart investment plans, and
            AI-driven advice — built for India's ambitious savers and investors.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-2xl animate-pulse-glow"
              onClick={() => navigate("/input")}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-32">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feat) => (
            <motion.div
              key={feat.title}
              variants={item}
              className="glass-card p-6 hover:border-primary/30 transition-colors duration-300 cursor-pointer"
              onClick={() => navigate(`/feature/${feat.slug}`)}
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feat.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{feat.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2026 AI Money Mentor. Built for India's financial future.
        </div>
      </footer>
    </div>
  );
}
