import { motion } from "framer-motion";

export function ProgressRing({
  value, size = 120, stroke = 10, label, suffix = "",
  gradientFrom = "oklch(0.68 0.19 155)", gradientTo = "oklch(0.55 0.15 230)",
}: {
  value: number; size?: number; stroke?: number; label?: string; suffix?: string;
  gradientFrom?: string; gradientTo?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const id = `grad-${label?.replace(/\s/g, "") ?? "x"}`;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="oklch(1 0 0 / 0.1)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={`url(#${id})`} strokeWidth={stroke} strokeLinecap="round" fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-display font-bold text-white">{value}{suffix}</div>
        {label && <div className="text-[10px] uppercase tracking-widest text-white/60 mt-0.5">{label}</div>}
      </div>
    </div>
  );
}
