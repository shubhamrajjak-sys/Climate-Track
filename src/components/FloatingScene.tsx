import { motion } from "framer-motion";
import { Leaf, Cloud, Sun, Wind, Trees, Mountain } from "lucide-react";

const items = [
  { Icon: Leaf, top: "12%", left: "8%", delay: 0, color: "text-emerald-500" },
  { Icon: Leaf, top: "22%", right: "10%", delay: 1.5, color: "text-green-400" },
  { Icon: Trees, bottom: "18%", left: "6%", delay: 0.5, color: "text-emerald-600" },
  { Icon: Mountain, bottom: "12%", right: "8%", delay: 1, color: "text-sky-600" },
  { Icon: Sun, top: "18%", right: "22%", delay: 2, color: "text-amber-400" },
  { Icon: Wind, top: "45%", left: "4%", delay: 0.8, color: "text-sky-400" },
];

export function FloatingScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Drifting clouds */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute opacity-40"
          style={{ top: `${10 + i * 25}%` }}
          initial={{ x: -200 }}
          animate={{ x: "110vw" }}
          transition={{ duration: 45 + i * 10, repeat: Infinity, ease: "linear", delay: i * 8 }}
        >
          <Cloud className="h-16 w-16 text-white/60" strokeWidth={1} />
        </motion.div>
      ))}

      {/* Floating icons */}
      {items.map(({ Icon, delay, color, ...pos }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color}`}
          style={pos as React.CSSProperties}
          animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon className="h-10 w-10 opacity-60" strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
    </div>
  );
}
