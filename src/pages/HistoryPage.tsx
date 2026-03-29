import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Trash2, Eye, Pencil, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useFinance } from "@/context/FinanceContext";
import { formatCurrency, getScoreColor } from "@/lib/finance";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

interface HistoryEntry {
  id: string;
  name: string;
  age: number;
  income: number;
  expenses: number;
  savings: number;
  loans: number;
  goal: string;
  score: number;
  score_label: string;
  equity_percent: number;
  debt_percent: number;
  sip_amount: number;
  savings_ratio: number;
  debt_ratio: number;
  expense_ratio: number;
  monthly_surplus: number;
  created_at: string;
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setUserData, setPlan } = useFinance();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchHistory();
  }, [user, navigate]);

  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from("search_history")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load history");
    } else {
      setHistory(data || []);
    }
    setLoading(false);
  };

  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from("search_history").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else {
      setHistory((prev) => prev.filter((e) => e.id !== id));
      toast.success("Entry deleted");
    }
  };

  const loadEntry = (entry: HistoryEntry) => {
    setUserData({
      name: entry.name,
      age: entry.age,
      income: entry.income,
      expenses: entry.expenses,
      savings: entry.savings,
      loans: entry.loans,
      goal: entry.goal as any,
    });
    setPlan({
      score: entry.score,
      scoreLabel: entry.score_label,
      equityPercent: entry.equity_percent,
      debtPercent: entry.debt_percent,
      sipAmount: entry.sip_amount,
      savingsRatio: entry.savings_ratio,
      debtRatio: entry.debt_ratio,
      expenseRatio: entry.expense_ratio,
      monthlySurplus: entry.monthly_surplus,
    });
    navigate("/dashboard");
  };

  const editEntry = (entry: HistoryEntry) => {
    setUserData({
      name: entry.name,
      age: entry.age,
      income: entry.income,
      expenses: entry.expenses,
      savings: entry.savings,
      loans: entry.loans,
      goal: entry.goal as any,
    });
    navigate("/input");
  };

  return (
    <div className="min-h-screen hero-gradient">
      <nav className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-6 w-6" width={24} height={24} />
            <span className="font-display text-lg font-bold">My History</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Activity <span className="gradient-text">History</span>
          </h1>
          <p className="text-muted-foreground mb-8">Your past financial analyses — click to view or edit</p>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading...</div>
          ) : history.length === 0 ? (
            <div className="text-center py-20">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No history yet. Start by analyzing your finances!</p>
              <Button className="mt-4 bg-primary text-primary-foreground" onClick={() => navigate("/input")}>Get Started</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium text-xs">Date</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium text-xs">Name</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium text-xs">Goal</th>
                    <th className="text-right py-3 px-3 text-muted-foreground font-medium text-xs">Income</th>
                    <th className="text-right py-3 px-3 text-muted-foreground font-medium text-xs">Score</th>
                    <th className="text-right py-3 px-3 text-muted-foreground font-medium text-xs">SIP</th>
                    <th className="text-center py-3 px-3 text-muted-foreground font-medium text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-border/20 hover:bg-secondary/20 transition-colors cursor-pointer"
                      onClick={() => loadEntry(entry)}
                    >
                      <td className="py-3 px-3 text-muted-foreground text-xs whitespace-nowrap">
                        {new Date(entry.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-3 px-3 text-foreground font-medium">{entry.name}</td>
                      <td className="py-3 px-3 capitalize text-muted-foreground">{entry.goal}</td>
                      <td className="py-3 px-3 text-right text-foreground">{formatCurrency(entry.income)}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 font-semibold" style={{ color: getScoreColor(entry.score) }}>
                          {entry.score}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-primary font-medium">{formatCurrency(entry.sip_amount)}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => loadEntry(entry)} title="View Dashboard">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editEntry(entry)} title="Edit & Recalculate">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteEntry(entry.id)} title="Delete">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
