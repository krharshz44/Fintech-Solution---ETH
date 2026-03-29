import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserFinancialData, FinancialPlan, calculateFinancialPlan } from "@/lib/finance";

interface FinanceContextType {
  userData: UserFinancialData | null;
  plan: FinancialPlan | null;
  setUserData: (data: UserFinancialData) => void;
  setPlan: (plan: FinancialPlan) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [userData, setUserDataState] = useState<UserFinancialData | null>(null);
  const [plan, setPlan] = useState<FinancialPlan | null>(null);

  const setUserData = (data: UserFinancialData) => {
    setUserDataState(data);
    setPlan(calculateFinancialPlan(data));
  };

  return (
    <FinanceContext.Provider value={{ userData, plan, setUserData, setPlan }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used within FinanceProvider");
  return context;
}
