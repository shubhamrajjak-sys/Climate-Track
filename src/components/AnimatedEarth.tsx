import { motion } from "framer-motion";

export function AnimatedEarth() {
  return (
    <div className="relative w-[380px] h-[380px] md:w-[500px] md:h-[500px]">
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-eco opacity-30 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-8 rounded-full border border-primary/20 animate-spin-slow" />
      <div className="absolute inset-16 rounded-full border border-secondary/20 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "45s" }} />

      {/* Earth */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-20 rounded-full overflow-hidden shadow-glow"
        style={{
          background: "radial-gradient(circle at 30% 30%, oklch(0.75 0.2 155), oklch(0.4 0.15 220) 60%, oklch(0.2 0.08 240))",
        }}
      >
        {/* Continents (organic blobs) */}
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
          <defs>
            <radialGradient id="landGrad" cx="30%" cy="30%">
              <stop offset="0%" stopColor="oklch(0.72 0.2 150)" />
              <stop offset="100%" stopColor="oklch(0.5 0.18 145)" />
            </radialGradient>
          </defs>
          <path d="M30,60 Q50,40 80,50 T130,70 Q150,90 140,110 Q120,130 90,120 Q60,110 40,90 Z" fill="url(#landGrad)" />
          <path d="M110,130 Q140,120 165,140 Q170,160 150,170 Q125,175 110,155 Z" fill="url(#landGrad)" />
          <path d="M20,130 Q40,125 55,145 Q50,165 30,160 Q10,150 20,130 Z" fill="url(#landGrad)" />
          <circle cx="70" cy="75" r="4" fill="oklch(0.85 0.15 145)" opacity="0.7" />
          <circle cx="130" cy="100" r="3" fill="oklch(0.85 0.15 145)" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Atmosphere shine */}
      <div className="absolute inset-20 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 25%, oklch(1 0 0 / 0.3), transparent 40%)" }} />

      {/* Orbiting leaves */}
      {[0, 120, 240].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
          style={{ transform: `rotate(${deg}deg)` }}
        >
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <div className="h-6 w-6 rounded-full bg-gradient-eco shadow-glow animate-pulse-glow" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
