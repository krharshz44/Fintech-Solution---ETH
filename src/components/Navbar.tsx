import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Brain, PieChart, TrendingUp, Shield, MessageSquare,
  LayoutDashboard, History, LogIn, LogOut, ClipboardList, ChevronDown,
  Info, Newspaper, Phone, Briefcase, Users, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logo.png";

const featureLinks = [
  { label: "AI Advice", href: "/feature/ai-powered-advice", icon: Brain },
  { label: "Smart Analytics", href: "/feature/smart-analytics", icon: PieChart },
  { label: "SIP Calculator", href: "/feature/sip-calculator", icon: TrendingUp },
  { label: "Health Score", href: "/feature/money-health-score", icon: Shield },
];

const toolLinks = [
  { label: "Get Started", href: "/input", icon: ClipboardList },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Chat", href: "/chat", icon: MessageSquare },
];

const companyLinks = [
  { label: "About", href: "/about", icon: Info },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Blogs", href: "/blogs", icon: Newspaper },
  { label: "Careers", href: "/careers", icon: Users },
  { label: "Contact Us", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, profile } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) => location.pathname === href;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeDropdown = () => setTimeout(() => setOpenDropdown(null), 150);

  const DropdownMenu = ({ name, label, links }: { name: string; label: string; links: typeof featureLinks }) => (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/30 transition-all"
        onClick={() => toggleDropdown(name)}
        onBlur={closeDropdown}
      >
        {label}
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === name ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {openDropdown === name && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-56 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl shadow-2xl shadow-black/20 p-1.5 z-50"
          >
            {links.map((link) => (
              <button
                key={link.href}
                onMouseDown={() => { navigate(link.href); setOpenDropdown(null); }}
                className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl text-sm transition-all ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary font-medium shadow-[inset_0_0_20px_hsl(155_70%_45%/0.05)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
              >
                <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${isActive(link.href) ? "bg-primary/20" : "bg-secondary/40"}`}>
                  <link.icon className="h-3.5 w-3.5" />
                </div>
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-2xl backdrop-saturate-150">
      {/* Futuristic top line accent */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto flex items-center justify-between py-2.5 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img src={logo} alt="AI Money Mentor" className="h-8 w-8 relative z-10" width={32} height={32} />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display text-lg font-bold text-foreground hidden sm:inline tracking-tight">
            AI Money<span className="gradient-text"> Mentor</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          <button
            onClick={() => navigate("/")}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              isActive("/") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
            }`}
          >
            Home
          </button>

          <DropdownMenu name="features" label="Features" links={featureLinks} />
          <DropdownMenu name="company" label="Company" links={companyLinks} />

          {toolLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                isActive(link.href) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              }`}
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </button>
          ))}

          {user && (
            <button
              onClick={() => navigate("/history")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                isActive("/history") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              }`}
            >
              <History className="h-3.5 w-3.5" /> History
            </button>
          )}
        </div>

        {/* Auth & Profile */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/profile")}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                  <User className="h-3 w-3 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {profile?.display_name || user.email?.split("@")[0]}
                </span>
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut className="h-3.5 w-3.5 mr-1" /> Sign Out
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="text-xs bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              onClick={() => navigate("/auth")}
            >
              <LogIn className="h-3.5 w-3.5 mr-1" /> Sign In
            </Button>
          )}

          {/* Mobile toggle */}
          <button
            className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl hover:bg-secondary/30 transition-colors text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-border/30 bg-background/95 backdrop-blur-2xl"
          >
            <div className="container mx-auto px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => { navigate("/"); setMobileOpen(false); }}
                className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl text-sm transition-all ${
                  isActive("/") ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                }`}
              >
                Home
              </button>

              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest px-3 pt-3 pb-1 font-medium">Features</p>
              {featureLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => { navigate(link.href); setMobileOpen(false); }}
                  className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl text-sm transition-all ${
                    isActive(link.href) ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                >
                  <link.icon className="h-4 w-4" /> {link.label}
                </button>
              ))}

              <div className="border-t border-border/20 my-2" />

              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest px-3 pt-2 pb-1 font-medium">Tools</p>
              {toolLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => { navigate(link.href); setMobileOpen(false); }}
                  className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl text-sm transition-all ${
                    isActive(link.href) ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                >
                  <link.icon className="h-4 w-4" /> {link.label}
                </button>
              ))}

              {user && (
                <button
                  onClick={() => { navigate("/history"); setMobileOpen(false); }}
                  className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl text-sm transition-all ${
                    isActive("/history") ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                >
                  <History className="h-4 w-4" /> History
                </button>
              )}

              <div className="border-t border-border/20 my-2" />

              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest px-3 pt-2 pb-1 font-medium">Company</p>
              {companyLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => { navigate(link.href); setMobileOpen(false); }}
                  className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl text-sm transition-all ${
                    isActive(link.href) ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                >
                  <link.icon className="h-4 w-4" /> {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
