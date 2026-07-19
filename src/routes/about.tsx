import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Mail, Github, Linkedin, ExternalLink, GraduationCap, Briefcase, Award,
  Sparkles, LineChart, Database, Cpu, Rocket, MapPin,
} from "lucide-react";
import profileImg from "@/assets/profile-shubham.jpg";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Shubham Rajjak · Climate Track" },
      { name: "description", content: "Shubham Rajjak — AI & Data Analytics enthusiast building Climate Track." },
      { property: "og:title", content: "Shubham Rajjak — AI & Data Analytics" },
      { property: "og:description", content: "Creator of Climate Track. AI, data, and a livable future." },
    ],
  }),
});

const timeline = [
  { year: "2026", title: "Climate Track", desc: "Launched an AI-powered climate intelligence platform.", icon: Rocket },
  { year: "2025", title: "Data Analytics Fellowship", desc: "Advanced work in ML, causal inference, and viz.", icon: GraduationCap },
  { year: "2024", title: "AI Research Intern", desc: "Built forecasting models on multivariate climate data.", icon: Cpu },
  { year: "2023", title: "First Kaggle Gold", desc: "Top 1% in a time-series climate competition.", icon: Award },
  { year: "2022", title: "Started the journey", desc: "Fell in love with data, dashboards, and the planet.", icon: Sparkles },
];

const skills = [
  { name: "Python", level: 95, icon: Cpu },
  { name: "Machine Learning", level: 88, icon: Sparkles },
  { name: "Data Analytics", level: 92, icon: LineChart },
  { name: "SQL & Databases", level: 86, icon: Database },
  { name: "React / TypeScript", level: 82, icon: Cpu },
  { name: "Data Viz", level: 90, icon: LineChart },
];

const projects = [
  { title: "Climate Track", tag: "AI · Analytics", desc: "Real-time climate & carbon platform.", emoji: "🌍" },
  { title: "AirLens", tag: "ML · IoT", desc: "AQI forecasting from low-cost sensors.", emoji: "🌫️" },
  { title: "AgriPulse", tag: "Data · Ag", desc: "Yield prediction for smallholder farmers.", emoji: "🌾" },
];

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-6xl">
        {/* Hero card */}
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-glow">
              <img src={profileImg} alt="Shubham Rajjak" className="w-full aspect-square object-cover" width={1024} height={1024} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white text-xs">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for collaborations
              </div>
            </div>
            {/* floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 rounded-2xl glass-light shadow-lg px-3 py-2 text-xs font-semibold flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-primary" /> AI Enthusiast
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 rounded-2xl glass-light shadow-lg px-3 py-2 text-xs font-semibold flex items-center gap-2"
            >
              <LineChart className="h-4 w-4 text-secondary" /> Data Storyteller
            </motion.div>
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-eco opacity-20 blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass-light px-3 py-1 text-xs font-medium">
              <MapPin className="h-3 w-3" /> Creator & Maintainer
            </div>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold leading-[1.05]">
              Shubham <span className="text-gradient">Rajjak</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-primary">AI & Data Analytics Enthusiast</p>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">
              I build tools that help humans see the planet clearly — turning noisy climate
              signals into decisions. Climate Track is my love letter to a future worth
              defending, engineered with AI, data, and a lot of coffee.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:shubhamrajjak@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-eco text-white px-6 py-3 text-sm font-semibold shadow-glow hover:scale-[1.02] transition-transform"
              >
                <Mail className="h-4 w-4" /> Contact
              </a>
              <a
                href="https://github.com/shubhamrajjak-sys" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-3 text-sm font-medium hover:border-primary/50 transition-colors"
              >
                <Github className="h-4 w-4" /> GitHub <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
              <a
                href="https://www.linkedin.com/in/shubham-rajjak" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-3 text-sm font-medium hover:border-primary/50 transition-colors"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {[["3+", "Years"], ["12", "Projects"], ["6", "Papers read/day"]].map(([v, k]) => (
                <div key={k} className="rounded-2xl bg-card border p-4">
                  <div className="font-display font-bold text-2xl text-gradient">{v}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{k}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <section className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-medium">Skills</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">The toolkit.</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
            {skills.map((s, i) => (
              <motion.div key={s.name}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{s.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{s.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-eco"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-24">
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest text-primary font-medium">Journey</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">The path here.</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-transparent -translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <motion.div key={t.year}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={`relative flex items-start gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="md:w-1/2 md:pl-8 md:pr-8">
                    <div className={`rounded-2xl bg-card border p-5 shadow-sm hover:shadow-glow transition-shadow ${i % 2 === 0 ? "md:text-right" : ""}`}>
                      <div className="text-xs font-mono text-primary">{t.year}</div>
                      <div className="mt-1 font-display font-semibold text-lg">{t.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-gradient-eco grid place-items-center shadow-glow border-4 border-background">
                    <t.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mt-24">
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest text-primary font-medium">Project Highlights</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Things I've built.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-card border p-6 hover:shadow-glow transition-shadow group cursor-pointer"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-eco grid place-items-center text-3xl shadow-glow">
                  {p.emoji}
                </div>
                <div className="mt-4 text-xs font-medium text-primary uppercase tracking-widest">{p.tag}</div>
                <h3 className="mt-1 text-lg font-display font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  View <ExternalLink className="h-3 w-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-24 rounded-[2.5rem] overflow-hidden bg-gradient-hero p-12 md:p-20 text-center shadow-glow"
        >
          <div className="text-white">
            <Briefcase className="h-10 w-10 mx-auto opacity-90" />
            <h2 className="mt-4 text-3xl md:text-5xl font-bold">Let's build the future together.</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Open to collaborations on climate, AI, and data-for-good.
            </p>
            <a
              href="mailto:shubhamrajjak@gmail.com"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-primary px-8 py-3.5 text-sm font-semibold shadow-2xl hover:scale-[1.03] transition-transform"
            >
              <Mail className="h-4 w-4" /> shubhamrajjak@gmail.com
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
