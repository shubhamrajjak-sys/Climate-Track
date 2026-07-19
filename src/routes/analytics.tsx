import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  Radar, RadarChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
} from "recharts";
import { Flame, Thermometer, CloudRain, Wind, Zap, Recycle } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
  head: () => ({
    meta: [
      { title: "Climate Analytics — Climate Track" },
      { name: "description", content: "Beautiful animated charts for emissions, temperature, rainfall, AQI, renewables, and waste." },
    ],
  }),
});

const emissions = [
  { m: "Jan", co2: 420, ch4: 180 }, { m: "Feb", co2: 400, ch4: 175 },
  { m: "Mar", co2: 380, ch4: 168 }, { m: "Apr", co2: 355, ch4: 160 },
  { m: "May", co2: 330, ch4: 152 }, { m: "Jun", co2: 305, ch4: 145 },
  { m: "Jul", co2: 285, ch4: 138 }, { m: "Aug", co2: 268, ch4: 130 },
  { m: "Sep", co2: 250, ch4: 125 }, { m: "Oct", co2: 232, ch4: 118 },
  { m: "Nov", co2: 218, ch4: 112 }, { m: "Dec", co2: 200, ch4: 105 },
];

const temperature = Array.from({ length: 12 }, (_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  avg: 12 + Math.sin(i / 12 * Math.PI * 2 - 1.5) * 10 + 3,
  hist: 12 + Math.sin(i / 12 * Math.PI * 2 - 1.5) * 10,
}));

const rainfall = [
  { m: "Jan", mm: 42 }, { m: "Feb", mm: 38 }, { m: "Mar", mm: 55 },
  { m: "Apr", mm: 72 }, { m: "May", mm: 98 }, { m: "Jun", mm: 145 },
  { m: "Jul", mm: 168 }, { m: "Aug", mm: 152 }, { m: "Sep", mm: 110 },
  { m: "Oct", mm: 78 }, { m: "Nov", mm: 52 }, { m: "Dec", mm: 45 },
];

const aqi = Array.from({ length: 30 }, (_, i) => ({ d: i + 1, val: 40 + Math.sin(i / 3) * 20 + Math.random() * 15 }));

const renewables = [
  { name: "Solar", value: 38, color: "oklch(0.8 0.18 80)" },
  { name: "Wind", value: 27, color: "oklch(0.7 0.18 230)" },
  { name: "Hydro", value: 18, color: "oklch(0.65 0.15 210)" },
  { name: "Geothermal", value: 9, color: "oklch(0.6 0.2 30)" },
  { name: "Biomass", value: 8, color: "oklch(0.7 0.18 155)" },
];

const waste = [
  { name: "Recycled", value: 42, fill: "oklch(0.7 0.2 150)" },
  { name: "Composted", value: 24, fill: "oklch(0.7 0.18 100)" },
  { name: "Incinerated", value: 12, fill: "oklch(0.75 0.18 60)" },
  { name: "Landfill", value: 22, fill: "oklch(0.65 0.15 30)" },
];

const tooltipStyle = { background: "oklch(1 0 0 / 0.95)", border: "1px solid oklch(0.9 0.02 180)", borderRadius: 12, fontSize: 12 };

function Card({ children, title, subtitle, icon: Icon, delay = 0, className = "" }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-3xl bg-card border p-6 shadow-sm hover:shadow-glow transition-shadow ${className}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-xl bg-gradient-eco grid place-items-center shadow-glow">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-display font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="text-xs uppercase tracking-widest text-primary font-medium">Climate Analytics</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">The planet, plotted.</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Live time-series intelligence across emissions, weather, and resource use.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card title="Carbon Emissions" subtitle="CO₂ & CH₄, monthly (tons)" icon={Flame} delay={0}>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={emissions}>
                <defs>
                  <linearGradient id="cCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.68 0.19 155)" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="oklch(0.68 0.19 155)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cCh4" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.15 230)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.55 0.15 230)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 180)" />
                <XAxis dataKey="m" fontSize={11} stroke="oklch(0.55 0.03 200)" />
                <YAxis fontSize={11} stroke="oklch(0.55 0.03 200)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="co2" stroke="oklch(0.62 0.18 155)" strokeWidth={2.5} fill="url(#cCo2)" />
                <Area type="monotone" dataKey="ch4" stroke="oklch(0.55 0.15 230)" strokeWidth={2.5} fill="url(#cCh4)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Temperature Trends" subtitle="Actual vs historical average (°C)" icon={Thermometer} delay={0.1}>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={temperature}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 180)" />
                <XAxis dataKey="m" fontSize={11} stroke="oklch(0.55 0.03 200)" />
                <YAxis fontSize={11} stroke="oklch(0.55 0.03 200)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="hist" stroke="oklch(0.7 0.05 200)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Historical" />
                <Line type="monotone" dataKey="avg" stroke="oklch(0.65 0.22 30)" strokeWidth={3} dot={{ r: 4 }} name="Current" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Rainfall" subtitle="Monthly precipitation (mm)" icon={CloudRain} delay={0.2}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={rainfall}>
                <defs>
                  <linearGradient id="rain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.18 230)" />
                    <stop offset="100%" stopColor="oklch(0.55 0.17 210)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 180)" />
                <XAxis dataKey="m" fontSize={11} stroke="oklch(0.55 0.03 200)" />
                <YAxis fontSize={11} stroke="oklch(0.55 0.03 200)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="mm" fill="url(#rain)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Air Quality Index" subtitle="Daily readings, past 30 days" icon={Wind} delay={0.3}>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={aqi}>
                <defs>
                  <linearGradient id="aqiG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.2 150)" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="oklch(0.72 0.2 150)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 180)" />
                <XAxis dataKey="d" fontSize={11} stroke="oklch(0.55 0.03 200)" />
                <YAxis fontSize={11} stroke="oklch(0.55 0.03 200)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="val" stroke="oklch(0.62 0.2 150)" strokeWidth={2.5} fill="url(#aqiG)" name="AQI" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Renewable Energy Mix" subtitle="Share by source (%)" icon={Zap} delay={0.4}>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={renewables} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                  paddingAngle={3} animationDuration={1200}
                >
                  {renewables.map((r) => <Cell key={r.name} fill={r.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Waste Management" subtitle="Streams distribution (%)" icon={Recycle} delay={0.5}>
            <ResponsiveContainer width="100%" height={260}>
              <RadialBarChart innerRadius="30%" outerRadius="90%" data={waste} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 50]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={10} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Radar summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 rounded-3xl bg-gradient-hero p-8 md:p-10 text-white shadow-glow"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Regional Climate Fingerprint</h3>
              <p className="mt-3 text-white/80 max-w-md">
                A five-axis view of what matters most: emissions, air, water, energy, and biodiversity.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 max-w-sm text-sm">
                {[["Emissions", "-22%"], ["AQI", "42"], ["Renewables", "38%"], ["Recycling", "42%"]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-white/10 backdrop-blur px-4 py-3">
                    <div className="text-xs text-white/60 uppercase">{k}</div>
                    <div className="font-display font-bold text-lg">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={[
                { k: "Emissions", v: 78 }, { k: "Air", v: 82 },
                { k: "Water", v: 68 }, { k: "Energy", v: 74 },
                { k: "Biodiv.", v: 71 },
              ]}>
                <PolarGrid stroke="rgba(255,255,255,0.25)" />
                <PolarAngleAxis dataKey="k" tick={{ fill: "white", fontSize: 12 }} />
                <PolarRadiusAxis stroke="rgba(255,255,255,0.3)" tick={false} />
                <Radar dataKey="v" stroke="white" fill="white" fillOpacity={0.35} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
