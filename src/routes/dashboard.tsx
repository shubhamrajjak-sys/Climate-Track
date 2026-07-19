import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
} from "recharts";
import {
  ArrowLeft, Cloud, Download, Droplets, Flame, Gauge, Leaf,
  Sun, Thermometer, TrendingDown, TrendingUp, Wind, Zap,
} from "lucide-react";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import { ProgressRing } from "@/components/ProgressRing";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Climate Track" },
      { name: "description", content: "Live climate, carbon, and sustainability analytics." },
    ],
  }),
});

const weekly = [
  { day: "Mon", carbon: 12, energy: 34, water: 68 },
  { day: "Tue", carbon: 9, energy: 30, water: 72 },
  { day: "Wed", carbon: 14, energy: 42, water: 65 },
  { day: "Thu", carbon: 8, energy: 28, water: 74 },
  { day: "Fri", carbon: 11, energy: 36, water: 70 },
  { day: "Sat", carbon: 6, energy: 22, water: 80 },
  { day: "Sun", carbon: 5, energy: 20, water: 82 },
];

const monthly = [
  { m: "Jan", emissions: 320, target: 400 },
  { m: "Feb", emissions: 290, target: 380 },
  { m: "Mar", emissions: 310, target: 360 },
  { m: "Apr", emissions: 260, target: 340 },
  { m: "May", emissions: 240, target: 320 },
  { m: "Jun", emissions: 210, target: 300 },
  { m: "Jul", emissions: 190, target: 280 },
];

type Metric = {
  icon: any; label: string; value: string; unit: string; delta: number;
  gradient: string; ringValue: number;
};

const metrics: Metric[] = [
  { icon: Flame, label: "Carbon Footprint", value: "4.2", unit: "t CO₂", delta: -12, gradient: "from-emerald-400 to-teal-500", ringValue: 68 },
  { icon: Wind, label: "Air Quality Index", value: "42", unit: "AQI", delta: -8, gradient: "from-sky-400 to-cyan-500", ringValue: 82 },
  { icon: Thermometer, label: "Temperature", value: "23", unit: "°C", delta: 2, gradient: "from-amber-400 to-orange-500", ringValue: 56 },
  { icon: Droplets, label: "Humidity", value: "58", unit: "%", delta: -3, gradient: "from-blue-400 to-indigo-500", ringValue: 58 },
  { icon: Zap, label: "Energy Consumption", value: "312", unit: "kWh", delta: -18, gradient: "from-yellow-400 to-amber-500", ringValue: 72 },
  { icon: Droplets, label: "Water Consumption", value: "184", unit: "L", delta: -6, gradient: "from-cyan-400 to-blue-500", ringValue: 64 },
  { icon: Leaf, label: "Sustainability Score", value: "87", unit: "/100", delta: 14, gradient: "from-green-400 to-emerald-500", ringValue: 87 },
];

function Dashboard() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const downloadPdf = async () => {
    if (!reportRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: "#0a1520",
        scale: 2,
        useCORS: true,
      });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(img, "PNG", 0, 0, w, h);
      pdf.save(`climate-track-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img src={dashboardBg} alt="" className="h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1520]/95 via-[#0a1520]/85 to-[#0a1520]/95" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top left, oklch(0.6 0.2 155 / 0.2), transparent 60%), radial-gradient(ellipse at bottom right, oklch(0.55 0.15 230 / 0.25), transparent 60%)" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a1520]/60 border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2 font-display font-semibold">
            <div className="grid place-items-center h-8 w-8 rounded-full bg-gradient-eco shadow-glow">
              <Leaf className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            Climate Track
          </div>
          <button
            onClick={downloadPdf}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-eco px-5 py-2 text-sm font-medium shadow-glow disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Preparing..." : "Download Report"}
          </button>
        </div>
      </header>

      <div ref={reportRef} className="container mx-auto px-6 py-10 space-y-8">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs uppercase tracking-widest text-white/50">Overview · Live</div>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Your climate, in real time.</h1>
          <p className="text-white/60 mt-2">Last updated {new Date().toLocaleString()}</p>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-3xl overflow-hidden glass p-6 group hover:scale-[1.02] transition-transform"
            >
              <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${m.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${m.gradient} shadow-lg`}>
                    <m.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/50 mt-4">{m.label}</div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-3xl font-display font-bold">{m.value}</span>
                    <span className="text-sm text-white/50">{m.unit}</span>
                  </div>
                  <div className={`mt-2 inline-flex items-center gap-1 text-xs ${m.delta < 0 ? "text-emerald-400" : "text-amber-400"}`}>
                    {m.delta < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                    {Math.abs(m.delta)}% vs last week
                  </div>
                </div>
                <ProgressRing value={m.ringValue} size={80} stroke={7} suffix="%" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-5">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="lg:col-span-2 rounded-3xl glass p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-semibold text-lg">Monthly Emissions vs Target</h3>
                <p className="text-xs text-white/50">Trending 32% below plan</p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Actual</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/30" /> Target</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="grEm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.2 150)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.72 0.2 150)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="grTa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.18 230)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.7 0.18 230)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="m" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip contentStyle={{ background: "rgba(10,21,32,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }} />
                <Area type="monotone" dataKey="target" stroke="oklch(0.7 0.18 230)" strokeWidth={2} strokeDasharray="4 4" fill="url(#grTa)" />
                <Area type="monotone" dataKey="emissions" stroke="oklch(0.72 0.2 150)" strokeWidth={3} fill="url(#grEm)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="rounded-3xl glass p-6 flex flex-col items-center justify-center">
            <h3 className="font-display font-semibold text-lg mb-1">Sustainability Score</h3>
            <p className="text-xs text-white/50 mb-6">Excellent standing</p>
            <ProgressRing value={87} size={200} stroke={14} label="score" />
            <div className="mt-6 grid grid-cols-3 gap-3 w-full text-center text-xs">
              <div className="glass rounded-xl p-3">
                <div className="text-emerald-400 font-semibold">A+</div>
                <div className="text-white/50 mt-0.5">Energy</div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-sky-400 font-semibold">A</div>
                <div className="text-white/50 mt-0.5">Water</div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-amber-400 font-semibold">B+</div>
                <div className="text-white/50 mt-0.5">Waste</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Weekly + Live panels */}
        <div className="grid lg:grid-cols-3 gap-5">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="lg:col-span-2 rounded-3xl glass p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-semibold text-lg">Weekly Analytics</h3>
                <p className="text-xs text-white/50">Carbon, energy & water</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip contentStyle={{ background: "rgba(10,21,32,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="carbon" fill="oklch(0.72 0.2 150)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="energy" fill="oklch(0.75 0.18 80)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="water" fill="oklch(0.7 0.18 230)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="space-y-5">
            {/* Live Weather */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="rounded-3xl glass p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/50">Live Weather</div>
                  <div className="mt-2 text-4xl font-display font-bold">23°C</div>
                  <div className="text-sm text-white/60 mt-1">Partly cloudy · San Francisco</div>
                </div>
                <div className="relative">
                  <Sun className="h-14 w-14 text-amber-300" strokeWidth={1.5} />
                  <Cloud className="h-10 w-10 text-white/60 absolute -bottom-2 -left-3" strokeWidth={1.5} />
                </div>
              </div>
              <div className="relative mt-5 grid grid-cols-3 gap-2 text-xs">
                {[["Wind", "8 km/h"], ["Humid.", "58%"], ["UV", "5"]].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-white/5 p-2.5 text-center">
                    <div className="text-white/50">{k}</div>
                    <div className="mt-1 font-semibold">{v}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Live AQI */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="rounded-3xl glass p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/50">Live AQI</div>
                    <div className="mt-2 text-4xl font-display font-bold text-emerald-400">42</div>
                    <div className="text-sm text-white/60 mt-1">Good · Safe for all</div>
                  </div>
                  <Gauge className="h-14 w-14 text-emerald-400" strokeWidth={1.5} />
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "28%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-sky-400"
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-white/40">
                  <span>0 Good</span><span>150</span><span>300 Hazardous</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trend line */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="rounded-3xl glass p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-lg">30-Day Trend</h3>
              <p className="text-xs text-white/50">Carbon output across all sources</p>
            </div>
            <div className="text-xs text-emerald-400 flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5" /> 22% improvement
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={Array.from({ length: 30 }, (_, i) => ({
              d: i + 1,
              v: 50 - i * 0.7 + Math.sin(i / 2) * 6,
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={{ background: "rgba(10,21,32,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }} />
              <Line type="monotone" dataKey="v" stroke="oklch(0.72 0.2 150)" strokeWidth={3} dot={false}
                activeDot={{ r: 6, fill: "oklch(0.75 0.2 150)" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
