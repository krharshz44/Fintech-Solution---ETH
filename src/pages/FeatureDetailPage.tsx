import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, PieChart, TrendingUp, Shield, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AiAdviceDemo from "@/components/feature-demos/AiAdviceDemo";
import SmartAnalyticsDemo from "@/components/feature-demos/SmartAnalyticsDemo";
import SipCalculatorDemo from "@/components/feature-demos/SipCalculatorDemo";
import MoneyHealthDemo from "@/components/feature-demos/MoneyHealthDemo";

const featureData: Record<string, {
  icon: typeof Brain;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  howItWorks: string[];
}> = {
  "ai-powered-advice": {
    icon: Brain,
    title: "AI-Powered Advice",
    tagline: "Your personal financial advisor, available 24/7",
    description:
      "Our AI mentor analyzes your income, expenses, savings, and goals to deliver hyper-personalized financial guidance. Whether you're a first-time investor or an experienced saver, get answers in plain language — no jargon, no fluff.",
    highlights: [
      "Personalized advice based on your real financial data",
      "Covers investments, taxes (80C, 80D, NPS), budgeting & more",
      "Trained specifically for Indian financial markets & regulations",
      "Ask follow-up questions in a ChatGPT-style interface",
      "'Explain Like I'm 5' mode for complex topics",
    ],
    howItWorks: [
      "Enter your financial details in our simple form",
      "Our AI builds a complete picture of your finances",
      "Ask any money question — get instant, actionable advice",
      "Revisit anytime as your financial situation evolves",
    ],
  },
  "smart-analytics": {
    icon: PieChart,
    title: "Smart Analytics",
    tagline: "See your money story in beautiful charts",
    description:
      "Transform raw numbers into visual insights. Our analytics engine breaks down your spending patterns, savings trajectory, and investment potential with interactive charts — so you always know exactly where your money goes.",
    highlights: [
      "Expense breakdown with interactive pie charts",
      "Investment allocation visualized as bar charts (equity vs debt)",
      "Color-coded Money Health Score indicator",
      "Monthly surplus & savings ratio at a glance",
      "Mobile-responsive dashboard that works everywhere",
    ],
    howItWorks: [
      "Submit your income, expenses, savings & loan details",
      "Our engine computes your financial health metrics",
      "View dynamic Recharts-powered visualizations on your dashboard",
      "Identify spending leaks and optimization opportunities instantly",
    ],
  },
  "sip-calculator": {
    icon: TrendingUp,
    title: "SIP Calculator",
    tagline: "A precise monthly investment plan, built for your goals",
    description:
      "Whether you're saving for a home, a car, retirement, or travel — our SIP calculator factors in your age, risk profile, and goal timeline to recommend the exact monthly investment amount you need. No guesswork, just math.",
    highlights: [
      "Goal-based SIP recommendations (house, car, retirement, travel)",
      "Age-adjusted equity-to-debt allocation ratios",
      "Accounts for realistic Indian market return expectations",
      "Recommends specific fund categories (index, ELSS, debt)",
      "Clear monthly amount you can start investing today",
    ],
    howItWorks: [
      "Select your financial goal from the dropdown",
      "Enter your age, income, and current savings",
      "Our algorithm calculates optimal SIP amount & asset split",
      "Start your SIP with the recommended amount on salary day",
    ],
  },
  "money-health-score": {
    icon: Shield,
    title: "Money Health Score",
    tagline: "One number that tells you where you stand",
    description:
      "Our proprietary scoring system evaluates your savings ratio and debt-to-income ratio to produce a score from 0 to 100. It's the simplest way to understand your overall financial wellness and track improvement over time.",
    highlights: [
      "Score from 0–100 based on savings & debt ratios",
      "Color-coded: Red (needs work), Yellow (okay), Green (great)",
      "Beautiful animated circular progress indicator",
      "Actionable insights tied to your specific score range",
      "Benchmark against recommended financial health standards",
    ],
    howItWorks: [
      "Your savings ratio (savings ÷ income) contributes 50 points",
      "Your debt ratio (loans ÷ income) can reduce up to 50 points",
      "Score is normalized between 0 and 100",
      "Dashboard shows your score with personalized improvement tips",
    ],
  },
};

const slugs = Object.keys(featureData);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeatureDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const feature = slug ? featureData[slug] : undefined;

  if (!feature) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Feature not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const Icon = feature.icon;

  return (
    <div className="min-h-screen hero-gradient">
      {/* Nav */}
      <nav className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">AI Money Mentor</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-primary/30 text-primary hover:bg-primary/10"
          onClick={() => navigate("/input")}
        >
          Get Started
        </Button>
      </nav>

      <div className="container mx-auto px-4 pb-20 max-w-3xl">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-12 pt-8">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">{feature.title}</h1>
            <p className="text-primary text-lg font-medium">{feature.tagline}</p>
          </motion.div>

          {/* Description */}
          <motion.div variants={fadeUp} className="glass-card p-6 md:p-8 mb-8">
            <p className="text-secondary-foreground leading-relaxed text-base">{feature.description}</p>
          </motion.div>

          {/* Highlights */}
          <motion.div variants={fadeUp} className="glass-card p-6 md:p-8 mb-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-5">Key Highlights</h2>
            <ul className="space-y-3">
              {feature.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-foreground text-sm leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* How it works */}
          <motion.div variants={fadeUp} className="glass-card p-6 md:p-8 mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-5">How It Works</h2>
            <div className="space-y-4">
              {feature.howItWorks.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-secondary-foreground text-sm leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Demo */}
          <motion.div variants={fadeUp} className="mb-10">
            {slug === "ai-powered-advice" && <AiAdviceDemo />}
            {slug === "smart-analytics" && <SmartAnalyticsDemo />}
            {slug === "sip-calculator" && <SipCalculatorDemo />}
            {slug === "money-health-score" && <MoneyHealthDemo />}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="text-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-2xl"
              onClick={() => navigate("/input")}
            >
              Try It Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
