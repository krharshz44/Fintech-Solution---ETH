export interface UserFinancialData {
  name: string;
  age: number;
  income: number;
  expenses: number;
  savings: number;
  loans: number;
  goal: "house" | "car" | "retirement" | "travel" | "education" | "emergency";
}

export interface FinancialPlan {
  score: number;
  scoreLabel: string;
  equityPercent: number;
  debtPercent: number;
  sipAmount: number;
  savingsRatio: number;
  debtRatio: number;
  expenseRatio: number;
  monthlySurplus: number;
}

const GOAL_AMOUNTS: Record<string, number> = {
  house: 5000000,
  car: 1200000,
  retirement: 10000000,
  travel: 500000,
  education: 2000000,
  emergency: 600000,
};

const GOAL_YEARS: Record<string, number> = {
  house: 10,
  car: 5,
  retirement: 25,
  travel: 2,
  education: 5,
  emergency: 2,
};

export function calculateFinancialPlan(data: UserFinancialData): FinancialPlan {
  const savingsRatio = data.income > 0 ? data.savings / data.income : 0;
  const debtRatio = data.income > 0 ? data.loans / data.income : 0;
  const expenseRatio = data.income > 0 ? data.expenses / data.income : 0;
  const monthlySurplus = data.income - data.expenses;

  // Score calculation
  let score = savingsRatio * 50 + (50 - debtRatio * 50);
  score = Math.max(0, Math.min(100, Math.round(score)));

  const scoreLabel = score >= 70 ? "Excellent" : score >= 45 ? "Average" : "Needs Attention";

  // Investment allocation by age
  let equityPercent: number, debtPercent: number;
  if (data.age < 30) {
    equityPercent = 80;
    debtPercent = 20;
  } else if (data.age <= 45) {
    equityPercent = 60;
    debtPercent = 40;
  } else {
    equityPercent = 40;
    debtPercent = 60;
  }

  // SIP calculation
  const goalAmount = GOAL_AMOUNTS[data.goal] || 2000000;
  const years = GOAL_YEARS[data.goal] || 5;
  const months = years * 12;
  const annualReturn = 0.12;
  const monthlyReturn = annualReturn / 12;
  const sipAmount = Math.round(
    goalAmount * monthlyReturn / (Math.pow(1 + monthlyReturn, months) - 1)
  );

  return {
    score,
    scoreLabel,
    equityPercent,
    debtPercent,
    sipAmount,
    savingsRatio: Math.round(savingsRatio * 100),
    debtRatio: Math.round(debtRatio * 100),
    expenseRatio: Math.round(expenseRatio * 100),
    monthlySurplus,
  };
}

export function getScoreColor(score: number): string {
  if (score >= 70) return "hsl(155, 70%, 45%)";
  if (score >= 45) return "hsl(42, 90%, 55%)";
  return "hsl(0, 72%, 51%)";
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
