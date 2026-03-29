import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestions = [
  "Where should I invest my money?",
  "How can I save more each month?",
  "Explain mutual funds like I'm 5",
  "Best tax-saving strategy?",
];

function generateQuickAdvice(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("invest"))
    return "**Quick Tip:** Start with a Nifty 50 Index Fund SIP — as low as ₹500/month. For your age group, keep 60-80% in equity and the rest in debt instruments like PPF or debt mutual funds.";
  if (lower.includes("save"))
    return "**Quick Tip:** Follow the 50/30/20 rule — 50% needs, 30% wants, 20% savings. Automate your savings via SIP on salary day so you never skip!";
  if (lower.includes("mutual") || lower.includes("explain"))
    return "**Quick Tip:** Think of mutual funds like a group-buy for stocks 🥭. You and others pool money → a fund manager picks investments → returns are shared. Start with just ₹500/month!";
  if (lower.includes("tax"))
    return "**Quick Tip:** Max out Section 80C (₹1.5L via ELSS/PPF), claim 80D for health insurance (₹25K-₹50K), and add NPS for ₹50K extra under 80CCD(1B).";
  return "**Quick Tip:** Build a 6-month emergency fund first, then start SIPs in diversified equity funds. Get term + health insurance before any investment!";
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiAdviceDemo() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const reply: Message = { role: "assistant", content: generateQuickAdvice(text) };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="h-5 w-5 text-accent" />
        <h2 className="font-display text-xl font-semibold text-foreground">Try It — Ask a Money Question</h2>
      </div>

      {messages.length === 0 && (
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="glass-card p-3 text-sm text-left text-secondary-foreground hover:border-primary/30 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3 mb-5 max-h-72 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="h-3.5 w-3.5 text-primary" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary/50"}`}>
              {msg.content.split("**").map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
            </div>
            {msg.role === "user" && (
              <div className="h-7 w-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="h-3.5 w-3.5 text-accent" />
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about investments, savings, taxes..."
          className="bg-secondary/50 border-border/60 rounded-xl h-11 flex-1"
        />
        <Button type="submit" disabled={!input.trim()} className="bg-primary text-primary-foreground rounded-xl h-11 w-11">
          <Send className="h-4 w-4" />
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Button variant="link" className="text-primary text-sm" onClick={() => navigate("/input")}>
          Want full AI chat? Enter your details first →
        </Button>
      </div>
    </div>
  );
}
