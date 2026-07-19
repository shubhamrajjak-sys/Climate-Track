import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Calculator, Sparkles, Zap, Globe2, LineChart, Shield,
  Leaf, Wind, Droplets, Sun, Quote, Github, Twitter, Linkedin,
} from "lucide-react";
import heroImg from "@/assets/hero-earth.jpg";
import { Navbar } from "@/components/Navbar";
import { AnimatedEarth } from "@/components/AnimatedEarth";
import { FloatingScene } from "@/components/FloatingScene";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/")({ component: Home });

const features = [
  { icon: LineChart, title: "AI Carbon Intelligence", desc: "Real-time footprint tracking with machine-learning forecasts for every activity." },
  { icon: Globe2, title: "Global Climate Data", desc: "Live emissions, AQI, and weather signals unified into one dashboard." },
  { icon: Zap, title: "Energy Optimization", desc: "Actionable insights that reduce consumption and cost across your operations." },
  { icon: Droplets, title: "Water Stewardship", desc: "Monitor and preserve freshwater impact with granular usage analytics." },
  { icon: Wind, title: "Renewables Ready", desc: "Integrate solar, wind, and storage telemetry with a single API." },
  { icon: Shield, title: "Certified Reporting", desc: "Export audit-ready reports aligned with GHG Protocol and CDP." },
];

const stats = [
  { label: "Tons CO₂ tracked", value: 2400000, suffix: "+" },
  { label: "Active users", value: 128000, suffix: "" },
  { label: "Partner cities", value: 340, suffix: "" },
  { label: "Trees equivalent", value: 1800000, suffix: "" },
];

const testimonials = [
  { name: "Sofia Marín", role: "Sustainability Lead, Aurora Foods", text: "Climate Track cut our reporting time in half and gave us the story to move the boardroom.", avatar: "🌱" },
  { name: "Dr. Aarav Shah", role: "Climate Researcher, MIT", text: "The most beautiful climate tool I've used. Data feels intuitive — and truthful.", avatar: "🌍" },
  { name: "Lena Okonkwo", role: "Founder, Verdant Ventures", text: "Every startup building on the planet's future needs this in their stack. Non-negotiable.", avatar: "💚" },
];

function Home() {
  return (
    <div className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <FloatingScene />

        <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full glass-light px-4 py-1.5 text-xs font-medium mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI-powered climate intelligence
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Track Today.{" "}
              <span className="text-gradient">Protect Tomorrow.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Climate Track is an AI-powered platform that helps individuals and
              organizations monitor environmental impact, calculate carbon footprints,
              and make sustainable decisions.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-eco px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover:shadow-ocean transition-all"
              >
                Explore Dashboard
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-full glass-light px-7 py-3.5 text-sm font-semibold hover:bg-white/70 transition-all"
              >
                <Calculator className="h-4 w-4" />
                Calculate Carbon Footprint
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 text-xs text-muted-foreground">
              <div><span className="text-2xl font-display font-bold text-foreground"><Counter to={99} suffix="%" /></span><br />uptime</div>
              <div><span className="text-2xl font-display font-bold text-foreground"><Counter to={340} /></span><br />cities live</div>
              <div><span className="text-2xl font-display font-bold text-foreground"><Counter to={2} suffix="M+" /></span><br />tons tracked</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <AnimatedEarth />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mb-20"
          >
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-bold">Everything you need to act on climate.</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              From measurement to mitigation — a complete toolkit engineered for the decade ahead.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-card border p-8 shadow-sm hover:shadow-glow transition-all overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-eco opacity-0 group-hover:opacity-20 blur-3xl transition-opacity" />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-eco shadow-glow mb-5">
                    <f.icon className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-hero p-12 md:p-20 shadow-glow">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative grid md:grid-cols-4 gap-10 text-white text-center">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="text-5xl md:text-6xl font-display font-bold">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-widest text-white/80">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR TEASER */}
      <section id="calculator" className="relative py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Carbon Footprint</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Know your number.<br />Then <span className="text-gradient">shrink it</span>.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Our AI compares your lifestyle, home energy, travel, and diet against
                national averages and shows the highest-leverage actions in seconds.
              </p>
              <Link
                to="/dashboard"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-eco px-7 py-3.5 text-sm font-semibold text-white shadow-glow"
              >
                Start Calculating <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl bg-card border p-8 shadow-glow">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground">Your Footprint</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Est.</span>
                </div>
                <div className="text-6xl font-display font-bold text-gradient">
                  <Counter to={4} />.<Counter to={2} /> t
                </div>
                <div className="text-sm text-muted-foreground mt-1">CO₂ per year</div>

                <div className="mt-8 space-y-4">
                  {[
                    { icon: Sun, label: "Home energy", val: 42 },
                    { icon: Zap, label: "Transport", val: 28 },
                    { icon: Leaf, label: "Food & goods", val: 30 },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="flex items-center gap-2"><row.icon className="h-4 w-4 text-primary" />{row.label}</span>
                        <span className="text-muted-foreground">{row.val}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.val}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-gradient-eco"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-eco opacity-20 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mb-16"
          >
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Voices</p>
            <h2 className="text-4xl md:text-5xl font-bold">Trusted by climate leaders.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-card border p-8 shadow-sm hover:shadow-glow transition-all"
              >
                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                <p className="text-foreground leading-relaxed">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-eco grid place-items-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden bg-gradient-hero p-16 md:p-24 text-center shadow-glow"
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative text-white">
              <h2 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
                The planet is watching.<br />Give it something worth seeing.
              </h2>
              <Link
                to="/dashboard"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-white text-primary px-8 py-4 text-sm font-semibold shadow-2xl hover:scale-105 transition-transform"
              >
                Open Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t bg-card">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 font-display font-semibold mb-4">
                <div className="grid place-items-center h-8 w-8 rounded-full bg-gradient-eco shadow-glow">
                  <Leaf className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
                Climate Track
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Track today. Protect tomorrow. Climate intelligence for a livable future.
              </p>
              <div className="mt-5 flex gap-3">
                {[Github, Twitter, Linkedin].map((I, i) => (
                  <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full bg-muted hover:bg-primary hover:text-white transition-colors">
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Dashboard", "Calculator", "API", "Reports"] },
              { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
              { title: "Resources", links: ["Docs", "Guides", "Changelog", "Status"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="font-semibold mb-4 text-sm">{col.title}</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {col.links.map((l) => <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-14 pt-8 border-t flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Climate Track. Built for the planet.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
