import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf, MessageCircle, BarChart3, Users, MapPin, User, Home, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/assistant", label: "Assistant", icon: MessageCircle },
  { to: "/community", label: "Community", icon: Users },
  { to: "/report", label: "Report", icon: MapPin },
  { to: "/about", label: "About", icon: User },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[96%] max-w-6xl"
    >
      <div className="glass-light rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between shadow-lg">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold shrink-0">
          <div className="grid place-items-center h-8 w-8 rounded-full bg-gradient-eco shadow-glow">
            <Leaf className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm md:text-base">Climate Track</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {links.slice(1).map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  active ? "bg-gradient-eco text-white shadow-glow" : "text-muted-foreground hover:text-foreground hover:bg-white/40"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link
          to="/dashboard"
          className="rounded-full bg-gradient-eco px-4 py-1.5 text-xs md:text-sm font-medium text-white shadow-glow lg:hidden"
        >
          Menu
        </Link>
      </div>
    </motion.header>
  );
}
