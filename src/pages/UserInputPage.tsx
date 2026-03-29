import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFinance } from "@/context/FinanceContext";
import { useAuth } from "@/context/AuthContext";
import { UserFinancialData, calculateFinancialPlan } from "@/lib/finance";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const goals = [
  { value: "house", label: "🏠 Buy a House" },
  { value: "car", label: "🚗 Buy a Car" },
  { value: "retirement", label: "🏖️ Retirement" },
  { value: "travel", label: "✈️ Travel the World" },
  { value: "education", label: "🎓 Education" },
  { value: "emergency", label: "🛡️ Emergency Fund" },
];

export default function UserInputPage() {
  const navigate = useNavigate();
  const { setUserData } = useFinance();
  const { user } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    age: "",
    income: "",
    expenses: "",
    savings: "",
    loans: "",
    goal: "" as string,
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.income || !form.expenses || !form.savings || !form.loans || !form.goal) {
      toast({ title: "Missing fields", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    const age = parseInt(form.age);
    if (age < 18 || age > 100) {
      toast({ title: "Invalid age", description: "Age must be between 18 and 100", variant: "destructive" });
      return;
    }

    const data: UserFinancialData = {
      name: form.name.trim(),
      age,
      income: Number(form.income),
      expenses: Number(form.expenses),
      savings: Number(form.savings),
      loans: Number(form.loans),
      goal: form.goal as UserFinancialData["goal"],
    };

    setUserData(data);

    // Save to DB if user is logged in
    if (user) {
      const plan = calculateFinancialPlan(data);
      await supabase.from("search_history").insert({
        user_id: user.id,
        name: data.name,
        age: data.age,
        income: data.income,
        expenses: data.expenses,
        savings: data.savings,
        loans: data.loans,
        goal: data.goal,
        score: plan.score,
        score_label: plan.scoreLabel,
        equity_percent: plan.equityPercent,
        debt_percent: plan.debtPercent,
        sip_amount: plan.sipAmount,
        savings_ratio: plan.savingsRatio,
        debt_ratio: plan.debtRatio,
        expense_ratio: plan.expenseRatio,
        monthly_surplus: plan.monthlySurplus,
      });
    }

    navigate("/dashboard");
  };

  const fields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "Rahul Sharma", prefix: "" },
    { id: "age", label: "Age", type: "number", placeholder: "28", prefix: "" },
    { id: "income", label: "Monthly Income", type: "number", placeholder: "75000", prefix: "₹" },
    { id: "expenses", label: "Monthly Expenses", type: "number", placeholder: "40000", prefix: "₹" },
    { id: "savings", label: "Total Savings", type: "number", placeholder: "200000", prefix: "₹" },
    { id: "loans", label: "Total Loans / EMI", type: "number", placeholder: "15000", prefix: "₹" },
  ];

  return (
    <div className="min-h-screen hero-gradient">
      <nav className="container mx-auto flex items-center gap-4 py-6 px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-6 w-6" width={24} height={24} />
          <span className="font-display text-lg font-bold">AI Money Mentor</span>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 pb-20 max-w-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Tell us about your <span className="gradient-text">finances</span>
          </h1>
          <p className="text-muted-foreground">We'll generate your personalized financial plan in seconds</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-sm font-medium text-foreground">
                  {field.label}
                </Label>
                <div className="relative">
                  {field.prefix && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      {field.prefix}
                    </span>
                  )}
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => update(field.id, e.target.value)}
                    className={`bg-secondary/50 border-border/60 rounded-xl h-12 ${field.prefix ? "pl-8" : ""}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Financial Goal</Label>
            <Select value={form.goal} onValueChange={(v) => update("goal", v)}>
              <SelectTrigger className="bg-secondary/50 border-border/60 rounded-xl h-12">
                <SelectValue placeholder="Select your primary goal" />
              </SelectTrigger>
              <SelectContent>
                {goals.map((g) => (
                  <SelectItem key={g.value} value={g.value}>
                    {g.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground h-14 text-lg font-semibold rounded-2xl"
            >
              Generate My Plan <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
