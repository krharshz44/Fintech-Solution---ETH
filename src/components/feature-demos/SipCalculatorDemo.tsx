import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, IndianRupee, Target, Clock, TrendingUp, AlertTriangle, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, CartesianGrid } from "recharts";

const GOAL_DEFAULTS: Record<string, { amount: number; years: number }> = {
  house: { amount: 5000000, years: 10 },
  car: { amount: 1200000, years: 5 },
  retirement: { amount: 10000000, years: 25 },
  travel: { amount: 500000, years: 2 },
  education: { amount: 2000000, years: 5 },
  emergency: { amount: 600000, years: 2 },
  custom: { amount: 2000000, years: 10 },
};

const GOAL_LABELS: Record<string, string> = {
  house: "🏠 Buy a House",
  car: "🚗 Buy a Car",
  retirement: "🏖️ Retirement",
  travel: "✈️ Travel",
  education: "🎓 Education",
  emergency: "🛡️ Emergency Fund",
  custom: "🎯 Custom Goal",
};

const RETURN_RATES: Record<string, { label: string; rate: number; description: string }> = {
  conservative: { label: "Conservative", rate: 0.08, description: "Debt funds, FDs (~8%)" },
  moderate: { label: "Moderate", rate: 0.12, description: "Balanced funds (~12%)" },
  aggressive: { label: "Aggressive", rate: 0.15, description: "Equity funds (~15%)" },
};

function calcSip(goalAmount: number, months: number, annualReturn: number) {
  if (months <= 0 || annualReturn <= 0) return 0;
  const r = annualReturn / 12;
  return Math.round(goalAmount * r / (Math.pow(1 + r, months) - 1));
}

function formatInr(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function SipCalculatorDemo() {
  const [goal, setGoal] = useState("house");
  const [customAmount, setCustomAmount] = useState(2000000);
  const [customYears, setCustomYears] = useState(10);
  const [age, setAge] = useState(28);
  const [existingSavings, setExistingSavings] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(80000);
  const [riskProfile, setRiskProfile] = useState("moderate");
  const [inflation, setInflation] = useState(6);
  const [stepUpPercent, setStepUpPercent] = useState(10);

  const goalAmount = goal === "custom" ? customAmount : GOAL_DEFAULTS[goal].amount;
  const years = goal === "custom" ? customYears : GOAL_DEFAULTS[goal].years;
  const annualReturn = RETURN_RATES[riskProfile].rate;

  const results = useMemo(() => {
    const months = years * 12;
    const inflationAdjustedGoal = Math.round(goalAmount * Math.pow(1 + inflation / 100, years));
    const netGoal = Math.max(0, inflationAdjustedGoal - existingSavings * Math.pow(1 + annualReturn, years));

    const baseSip = calcSip(netGoal, months, annualReturn);
    const noInflationSip = calcSip(Math.max(0, goalAmount - existingSavings * Math.pow(1 + annualReturn, years)), months, annualReturn);
    const totalInvested = baseSip * months;
    const wealthGained = Math.max(0, netGoal - totalInvested);

    // Step-up SIP: lower starting SIP that increases yearly
    let stepUpSip = baseSip;
    if (stepUpPercent > 0 && years > 1) {
      // Approximate: find starting SIP such that total FV equals goal
      let lo = 100, hi = baseSip * 2, mid = baseSip;
      for (let iter = 0; iter < 50; iter++) {
        mid = Math.round((lo + hi) / 2);
        let fv = 0;
        let currentSip = mid;
        const r = annualReturn / 12;
        for (let y = 0; y < years; y++) {
          for (let m = 0; m < 12; m++) {
            fv = (fv + currentSip) * (1 + r);
          }
          currentSip = Math.round(currentSip * (1 + stepUpPercent / 100));
        }
        if (fv < netGoal) lo = mid + 1;
        else hi = mid;
      }
      stepUpSip = Math.max(100, mid);
    }

    // Year-by-year growth data
    const growthData: { year: number; invested: number; value: number }[] = [];
    let cumInvested = 0;
    let cumValue = existingSavings;
    const r = annualReturn / 12;
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        cumInvested += baseSip;
        cumValue = (cumValue + baseSip) * (1 + r);
      }
      growthData.push({ year: y, invested: Math.round(cumInvested), value: Math.round(cumValue) });
    }

    const equityPercent = age < 30 ? 80 : age <= 45 ? 60 : 40;
    const debtPercent = 100 - equityPercent;
    const sipToIncomeRatio = monthlyIncome > 0 ? Math.round((baseSip / monthlyIncome) * 100) : 0;
    const affordable = sipToIncomeRatio <= 40;

    // Fund recommendations based on risk + allocation
    const fundRecs = [];
    if (equityPercent >= 60) {
      fundRecs.push({ name: "Nifty 50 Index Fund", allocation: Math.round(equityPercent * 0.5), type: "Equity" });
      fundRecs.push({ name: "Flexi Cap Fund", allocation: Math.round(equityPercent * 0.3), type: "Equity" });
      fundRecs.push({ name: "Mid Cap Fund", allocation: equityPercent - Math.round(equityPercent * 0.5) - Math.round(equityPercent * 0.3), type: "Equity" });
    } else {
      fundRecs.push({ name: "Nifty 50 Index Fund", allocation: Math.round(equityPercent * 0.6), type: "Equity" });
      fundRecs.push({ name: "Large Cap Fund", allocation: equityPercent - Math.round(equityPercent * 0.6), type: "Equity" });
    }
    if (debtPercent > 0) {
      fundRecs.push({ name: "PPF / Debt MF", allocation: Math.round(debtPercent * 0.6), type: "Debt" });
      fundRecs.push({ name: "Short Duration Fund", allocation: debtPercent - Math.round(debtPercent * 0.6), type: "Debt" });
    }

    return {
      months,
      inflationAdjustedGoal,
      netGoal,
      baseSip,
      noInflationSip,
      totalInvested,
      wealthGained,
      stepUpSip,
      growthData,
      equityPercent,
      debtPercent,
      sipToIncomeRatio,
      affordable,
      fundRecs,
    };
  }, [goalAmount, years, annualReturn, inflation, existingSavings, age, monthlyIncome, stepUpPercent]);

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-accent" />
        <h2 className="font-display text-xl font-semibold text-foreground">Advanced SIP Calculator</h2>
      </div>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label className="text-muted-foreground text-xs">Financial Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger className="bg-secondary/50 border-border/60 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(GOAL_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {goal === "custom" && (
            <>
              <div>
                <Label className="text-muted-foreground text-xs">Target Amount (₹)</Label>
                <Input type="number" value={customAmount} onChange={(e) => setCustomAmount(Math.max(10000, +e.target.value))} className="bg-secondary/50 border-border/60 mt-1" />
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Timeline (years)</Label>
                <Input type="number" value={customYears} onChange={(e) => setCustomYears(Math.max(1, Math.min(40, +e.target.value)))} className="bg-secondary/50 border-border/60 mt-1" />
              </div>
            </>
          )}
          <div>
            <Label className="text-muted-foreground text-xs">Your Age</Label>
            <Input type="number" value={age} onChange={(e) => setAge(Math.max(18, Math.min(70, +e.target.value)))} className="bg-secondary/50 border-border/60 mt-1" />
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Monthly Income (₹)</Label>
            <Input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Math.max(0, +e.target.value))} className="bg-secondary/50 border-border/60 mt-1" />
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Existing Savings (₹)</Label>
            <Input type="number" value={existingSavings} onChange={(e) => setExistingSavings(Math.max(0, +e.target.value))} className="bg-secondary/50 border-border/60 mt-1" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground text-xs">Risk Profile</Label>
            <Select value={riskProfile} onValueChange={setRiskProfile}>
              <SelectTrigger className="bg-secondary/50 border-border/60 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(RETURN_RATES).map(([key, { label, description }]) => (
                  <SelectItem key={key} value={key}>
                    {label} — {description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground text-xs">Inflation Rate</Label>
              <span className="text-xs font-semibold text-primary">{inflation}%</span>
            </div>
            <Slider
              value={[inflation]}
              onValueChange={([v]) => setInflation(v)}
              min={0}
              max={12}
              step={0.5}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <Label className="text-muted-foreground text-xs">Annual SIP Step-Up</Label>
            <span className="text-xs font-semibold text-primary">{stepUpPercent}%</span>
          </div>
          <Slider
            value={[stepUpPercent]}
            onValueChange={([v]) => setStepUpPercent(v)}
            min={0}
            max={25}
            step={1}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">Increase your SIP by this % every year</p>
        </div>
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={`${goal}-${age}-${riskProfile}-${inflation}-${existingSavings}-${stepUpPercent}`}
        transition={{ duration: 0.3 }}
      >
        {/* Hero Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="glass-card p-4 text-center bg-primary/5 border-primary/20">
            <IndianRupee className="h-4 w-4 text-primary mx-auto mb-1" />
            <p className="text-xl sm:text-2xl font-bold text-primary">{formatInr(results.baseSip)}</p>
            <p className="text-[10px] text-muted-foreground">Monthly SIP</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Target className="h-4 w-4 text-foreground mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{formatInr(results.inflationAdjustedGoal)}</p>
            <p className="text-[10px] text-muted-foreground">Inflation-Adjusted Goal</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Clock className="h-4 w-4 text-foreground mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{years} yrs</p>
            <p className="text-[10px] text-muted-foreground">Timeline</p>
          </div>
          <div className="glass-card p-4 text-center">
            <TrendingUp className="h-4 w-4 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold text-primary">{formatInr(results.wealthGained)}</p>
            <p className="text-[10px] text-muted-foreground">Returns Earned</p>
          </div>
        </div>

        {/* Affordability check */}
        {!results.affordable && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 mb-6 flex gap-3 items-start">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-destructive">SIP is {results.sipToIncomeRatio}% of your income</p>
              <p className="text-xs text-muted-foreground mt-1">
                Experts recommend keeping SIP under 30-40% of income. Consider extending the timeline or reducing the goal amount.
              </p>
            </div>
          </div>
        )}

        {/* Step-up comparison */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-secondary/30 p-4">
            <p className="text-xs text-muted-foreground mb-1">Regular SIP (fixed)</p>
            <p className="text-base font-semibold text-foreground">{formatInr(results.baseSip)}<span className="text-xs text-muted-foreground">/month</span></p>
            <p className="text-xs text-muted-foreground mt-1">Total invested: {formatInr(results.totalInvested)}</p>
          </div>
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
            <p className="text-xs text-muted-foreground mb-1">Step-Up SIP (start with less)</p>
            <p className="text-base font-semibold text-primary">{formatInr(results.stepUpSip)}<span className="text-xs text-muted-foreground">/month → +{stepUpPercent}%/yr</span></p>
            <p className="text-xs text-muted-foreground mt-1">Starts lower, increases with your income</p>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-foreground mb-3">Wealth Growth Over Time</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={results.growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => `Y${v}`}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => v >= 100000 ? `${(v / 100000).toFixed(0)}L` : `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(val: number, name: string) => [
                  `₹${val.toLocaleString("en-IN")}`,
                  name === "invested" ? "Total Invested" : "Portfolio Value",
                ]}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
              />
              <Area type="monotone" dataKey="invested" stackId="1" fill="hsl(var(--muted))" stroke="hsl(var(--muted-foreground))" fillOpacity={0.3} />
              <Area type="monotone" dataKey="value" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Allocation Bar */}
        <div className="rounded-xl bg-secondary/30 p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-2">Recommended Allocation (Age {age})</p>
          <div className="flex gap-2 items-center mb-3">
            <div className="flex-1 rounded-full h-5 bg-muted overflow-hidden flex">
              <div className="h-full bg-primary rounded-l-full transition-all duration-500 flex items-center justify-center" style={{ width: `${results.equityPercent}%` }}>
                <span className="text-[10px] font-bold text-primary-foreground">{results.equityPercent}%</span>
              </div>
              <div className="h-full bg-accent rounded-r-full transition-all duration-500 flex items-center justify-center" style={{ width: `${results.debtPercent}%` }}>
                <span className="text-[10px] font-bold text-accent-foreground">{results.debtPercent}%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Equity (Stocks/MF)</span>
            <span>Debt (Bonds/FD)</span>
          </div>
        </div>

        {/* Fund Recommendations */}
        <div className="rounded-xl bg-secondary/30 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">Suggested Fund Categories</p>
          </div>
          <div className="space-y-2">
            {results.fundRecs.map((fund, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-background/30">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${fund.type === "Equity" ? "bg-primary" : "bg-accent"}`} />
                  <span className="text-sm text-secondary-foreground">{fund.name}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{fund.allocation}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info note */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
          <p className="text-xs text-muted-foreground">
            📊 Calculations assume {(annualReturn * 100).toFixed(0)}% annual returns ({RETURN_RATES[riskProfile].label.toLowerCase()}) and {inflation}% inflation.
            Actual returns may vary. This is for educational purposes only.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
