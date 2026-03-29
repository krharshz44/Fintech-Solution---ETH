import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(210, 60%, 50%)",
  "hsl(280, 50%, 55%)",
];

export default function SmartAnalyticsDemo() {
  const [income, setIncome] = useState(80000);
  const [expenses, setExpenses] = useState(40000);
  const [savings, setSavings] = useState(15000);
  const [loans, setLoans] = useState(10000);

  const surplus = income - expenses;
  const other = Math.max(0, income - expenses - savings - loans);

  const pieData = [
    { name: "Expenses", value: expenses },
    { name: "Savings", value: savings },
    { name: "Loans", value: loans },
    { name: "Surplus", value: other },
  ].filter((d) => d.value > 0);

  const barData = [
    { name: "Income", amount: income },
    { name: "Expenses", amount: expenses },
    { name: "Savings", amount: savings },
    { name: "Surplus", amount: Math.max(0, surplus) },
  ];

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="h-5 w-5 text-accent" />
        <h2 className="font-display text-xl font-semibold text-foreground">Live Analytics Preview</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label className="text-muted-foreground text-xs">Monthly Income (₹)</Label>
          <Input type="number" value={income} onChange={(e) => setIncome(+e.target.value)} className="bg-secondary/50 border-border/60 mt-1" />
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Monthly Expenses (₹)</Label>
          <Input type="number" value={expenses} onChange={(e) => setExpenses(+e.target.value)} className="bg-secondary/50 border-border/60 mt-1" />
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Monthly Savings (₹)</Label>
          <Input type="number" value={savings} onChange={(e) => setSavings(+e.target.value)} className="bg-secondary/50 border-border/60 mt-1" />
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Monthly Loans/EMI (₹)</Label>
          <Input type="number" value={loans} onChange={(e) => setLoans(+e.target.value)} className="bg-secondary/50 border-border/60 mt-1" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-semibold text-foreground mb-3 text-center">Expense Breakdown</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(val: number) => `₹${val.toLocaleString("en-IN")}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground mb-3 text-center">Income Overview</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip formatter={(val: number) => `₹${val.toLocaleString("en-IN")}`} />
              <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
