import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { UserFinancialData } from "@/lib/finance";

interface Props {
  userData: UserFinancialData;
}

const COLORS = ["hsl(155, 70%, 45%)", "hsl(42, 90%, 55%)", "hsl(220, 50%, 55%)", "hsl(0, 72%, 51%)"];

export default function ExpensePieChart({ userData }: Props) {
  const savings = Math.max(0, userData.income - userData.expenses);
  const data = [
    { name: "Expenses", value: userData.expenses },
    { name: "Savings", value: savings },
    { name: "Loans/EMI", value: userData.loans },
  ].filter((d) => d.value > 0);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={4}
          dataKey="value"
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(220, 18%, 8%)",
            border: "1px solid hsl(220, 15%, 16%)",
            borderRadius: "12px",
            color: "hsl(210, 20%, 95%)",
            fontSize: "12px",
          }}
          formatter={(value: number) =>
            `₹${value.toLocaleString("en-IN")}`
          }
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", color: "hsl(215, 15%, 55%)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
