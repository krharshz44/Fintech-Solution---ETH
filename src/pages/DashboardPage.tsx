import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles, TrendingUp, Wallet, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinance } from "@/context/FinanceContext";
import { formatCurrency, getScoreColor } from "@/lib/finance";
import ScoreRing from "@/components/ScoreRing";
import ExpensePieChart from "@/components/ExpensePieChart";
import InvestmentBarChart from "@/components/InvestmentBarChart";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { userData, plan } = useFinance();

  useEffect(() => {
    if (!userData || !plan) navigate("/input");
  }, [userData, plan, navigate]);

  if (!userData || !plan) return null;

  const scoreColor = getScoreColor(plan.score);

  const statCards = [
    { icon: Wallet, label: "Monthly Surplus", value: formatCurrency(plan.monthlySurplus), color: plan.monthlySurplus >= 0 },
    { icon: PiggyBank, label: "Recommended SIP", value: formatCurrency(plan.sipAmount), color: true },
    { icon: TrendingUp, label: "Savings Ratio", value: `${plan.savingsRatio}%`, color: plan.savingsRatio >= 20 },
  ];

  const insights = [
    plan.score >= 70
      ? "Your finances are in great shape! Keep up the disciplined saving."
      : plan.score >= 45
      ? "You're doing okay, but there's room to improve your savings rate."
      : "Your financial health needs attention. Focus on reducing debt first.",
    plan.debtRatio > 30
      ? "Your debt-to-income ratio is high. Consider a debt repayment strategy."
      : "Your debt levels are manageable. Good job!",
    `Based on your age (${userData.age}), we recommend a ${plan.equityPercent}% equity and ${plan.debtPercent}% debt allocation.`,
    `To achieve your ${userData.goal} goal, consider investing ${formatCurrency(plan.sipAmount)}/month via SIP.`,
  ];

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-4 py-8 pb-20">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          {/* Greeting */}
          <motion.div variants={fadeUp} className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              Hello, <span className="gradient-text">{userData.name}</span> 👋
            </h1>
            <p className="text-muted-foreground mt-1">Here's your personalized financial overview</p>
          </motion.div>

          {/* Score + Stats */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <motion.div variants={fadeUp} className="glass-card p-8 flex flex-col items-center justify-center lg:row-span-1">
              <ScoreRing score={plan.score} color={scoreColor} />
              <p className="font-display text-lg font-semibold mt-4" style={{ color: scoreColor }}>
                {plan.scoreLabel}
              </p>
              <p className="text-muted-foreground text-sm">Money Health Score</p>
            </motion.div>

            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
              {statCards.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-xs">{stat.label}</span>
                  </div>
                  <p className={`font-display text-xl font-bold ${stat.color ? "text-primary" : "text-destructive"}`}>
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <motion.div variants={fadeUp} className="glass-card p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Expense Breakdown</h3>
              <ExpensePieChart userData={userData} />
            </motion.div>
            <motion.div variants={fadeUp} className="glass-card p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Investment Allocation</h3>
              <InvestmentBarChart plan={plan} />
            </motion.div>
          </div>

          {/* AI Insights */}
          <motion.div variants={fadeUp} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-semibold">AI Financial Insights</h3>
            </div>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-secondary/30">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-secondary-foreground leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                className="border-accent/30 text-accent hover:bg-accent/10"
                onClick={() => navigate("/chat")}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Ask AI for more advice
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
