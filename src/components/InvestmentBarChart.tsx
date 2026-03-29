import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { FinancialPlan } from "@/lib/finance";

interface Props {
  plan: FinancialPlan;
}

export default function InvestmentBarChart({ plan }: Props) {
  const data = [
    { name: "Equity", value: plan.equityPercent, color: "hsl(155, 70%, 45%)" },
    { name: "Debt", value: plan.debtPercent, color: "hsl(42, 90%, 55%)" },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barSize={60}>
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(220, 18%, 8%)",
            border: "1px solid hsl(220, 15%, 16%)",
            borderRadius: "12px",
            color: "hsl(210, 20%, 95%)",
            fontSize: "12px",
          }}
          formatter={(value: number) => `${value}%`}
        />
        <Bar dataKey="value" radius={[12, 12, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
