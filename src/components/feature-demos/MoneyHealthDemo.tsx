import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import ScoreRing from "@/components/ScoreRing";
import { getScoreColor } from "@/lib/finance";

export default function MoneyHealthDemo() {
  const [income, setIncome] = useState(80000);
  const [savings, setSavings] = useState(15000);
  const [loans, setLoans] = useState(10000);

  const savingsRatio = income > 0 ? savings / income : 0;
  const debtRatio = income > 0 ? loans / income : 0;
  let score = savingsRatio * 50 + (50 - debtRatio * 50);
  score = Math.max(0, Math.min(100, Math.round(score)));

  const label = score >= 70 ? "Excellent" : score >= 45 ? "Average" : "Needs Attention";
  const color = getScoreColor(score);
  const tip =
    score >= 70
      ? "Your finances are in great shape! Keep it up 🎉"
      : score >= 45
      ? "You're on the right track. Try boosting your savings ratio above 20%."
      : "Focus on reducing debt and increasing savings to improve your score.";

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="h-5 w-5 text-accent" />
        <h2 className="font-display text-xl font-semibold text-foreground">Check Your Score — Live</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label className="text-muted-foreground text-xs">Monthly Income (₹)</Label>
          <Input type="number" value={income} onChange={(e) => setIncome(Math.max(0, +e.target.value))} className="bg-secondary/50 border-border/60 mt-1" />
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Monthly Savings (₹)</Label>
          <Input type="number" value={savings} onChange={(e) => setSavings(Math.max(0, +e.target.value))} className="bg-secondary/50 border-border/60 mt-1" />
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Monthly Loans/EMI (₹)</Label>
          <Input type="number" value={loans} onChange={(e) => setLoans(Math.max(0, +e.target.value))} className="bg-secondary/50 border-border/60 mt-1" />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <ScoreRing score={score} color={color} />
        <p className="font-display text-lg font-semibold mt-4" style={{ color }}>{label}</p>
        <p className="text-muted-foreground text-sm mb-4">Money Health Score</p>

        <div className="grid sm:grid-cols-2 gap-3 w-full mb-4">
          <div className="rounded-xl bg-secondary/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">Savings Ratio</p>
            <p className="text-lg font-bold text-foreground">{Math.round(savingsRatio * 100)}%</p>
          </div>
          <div className="rounded-xl bg-secondary/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">Debt Ratio</p>
            <p className="text-lg font-bold text-foreground">{Math.round(debtRatio * 100)}%</p>
          </div>
        </div>

        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 w-full text-center">
          <p className="text-sm text-secondary-foreground">{tip}</p>
        </div>
      </div>
    </div>
  );
}
