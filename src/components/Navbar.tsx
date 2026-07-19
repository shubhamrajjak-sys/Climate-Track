import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[92%] max-w-6xl"
    >
      <div className="glass-light rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold">
          <div className="grid place-items-center h-8 w-8 rounded-full bg-gradient-eco shadow-glow">
            <Leaf className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-base">Climate Track</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="/#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="/#stats" className="hover:text-foreground transition-colors">Impact</a>
          <a href="/#testimonials" className="hover:text-foreground transition-colors">Voices</a>
          <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
        </nav>
        <Link
          to="/dashboard"
          className="rounded-full bg-gradient-eco px-5 py-2 text-sm font-medium text-white shadow-glow hover:opacity-90 transition-opacity"
        >
          Launch
        </Link>
      </div>
    </motion.header>
  );
}
