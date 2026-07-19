import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Award, Trophy, Target, Users, TrendingUp, Share2, Heart, MessageCircle,
  Leaf, Droplets, Recycle, Bike, Sun, TreePine, Check, Flame,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/community")({
  component: Community,
  head: () => ({
    meta: [
      { title: "Community — Climate Track" },
      { name: "description", content: "Join green challenges, earn eco badges, climb the leaderboard, share stories." },
    ],
  }),
});

const challenges = [
  { icon: Bike, title: "Car-Free Week", desc: "Ditch the car for 7 days.", days: 7, progress: 5, participants: 12400, gradient: "from-emerald-400 to-teal-500" },
  { icon: Droplets, title: "Water Warrior", desc: "Cut water use by 20%.", days: 14, progress: 8, participants: 8300, gradient: "from-sky-400 to-blue-500" },
  { icon: Sun, title: "Solar Sprint", desc: "Switch 3 devices to solar.", days: 30, progress: 12, participants: 4900, gradient: "from-amber-400 to-orange-500" },
  { icon: Recycle, title: "Zero Waste Weekend", desc: "48 hours, zero landfill.", days: 2, progress: 1, participants: 21000, gradient: "from-lime-400 to-emerald-500" },
  { icon: TreePine, title: "Plant 5 Trees", desc: "Grow the canopy.", days: 60, progress: 2, participants: 6200, gradient: "from-green-500 to-emerald-600" },
  { icon: Leaf, title: "Meatless Month", desc: "Plant-based for 30 days.", days: 30, progress: 18, participants: 15800, gradient: "from-teal-400 to-cyan-500" },
];

const badges = [
  { icon: "🌱", name: "Sprout", earned: true }, { icon: "🌿", name: "Grower", earned: true },
  { icon: "🌳", name: "Guardian", earned: true }, { icon: "☀️", name: "Solar", earned: true },
  { icon: "💧", name: "Waterkeeper", earned: false }, { icon: "♻️", name: "Recycler", earned: true },
  { icon: "🚴", name: "Cyclist", earned: false }, { icon: "🌍", name: "Ambassador", earned: false },
];

const leaderboard = [
  { rank: 1, name: "Amara Chen", score: 12480, avatar: "🌸", change: "+12" },
  { rank: 2, name: "Diego Ruiz", score: 11930, avatar: "🌿", change: "+4" },
  { rank: 3, name: "Priya Kapoor", score: 11240, avatar: "🌻", change: "-1" },
  { rank: 4, name: "Kai Nakamura", score: 10780, avatar: "🌊", change: "+7" },
  { rank: 5, name: "Nia Okafor", score: 10120, avatar: "🍃", change: "+2" },
  { rank: 6, name: "You", score: 9840, avatar: "💚", change: "+18", me: true },
  { rank: 7, name: "Léa Fournier", score: 9520, avatar: "🌾", change: "-3" },
  { rank: 8, name: "Marco Silva", score: 9210, avatar: "🌲", change: "0" },
];

const stories = [
  { name: "Amara Chen", avatar: "🌸", when: "2h", text: "Just wrapped a 30-day zero-waste challenge — we diverted 12 kg of trash from landfill!", img: "🌱", likes: 342, comments: 28 },
  { name: "Diego Ruiz", avatar: "🌿", when: "6h", text: "Installed rooftop solar last month. Bill dropped 68%. Ask me anything.", img: "☀️", likes: 289, comments: 41 },
  { name: "Priya Kapoor", avatar: "🌻", when: "1d", text: "Community garden update — first tomato harvest of the season 🍅", img: "🌻", likes: 512, comments: 63 },
];

function Community() {
  const [joined, setJoined] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setJoined((s) => ({ ...s, [i]: !s[i] }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="text-xs uppercase tracking-widest text-primary font-medium">Community</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Together, we move the needle.</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Take on challenges, earn badges, and share stories with a global tribe of climate doers.
          </p>
        </motion.div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Users, val: "128K", label: "Members", grad: "from-emerald-400 to-teal-500" },
            { icon: Target, val: "1,240", label: "Active Challenges", grad: "from-sky-400 to-blue-500" },
            { icon: Trophy, val: "84K", label: "Badges Earned", grad: "from-amber-400 to-orange-500" },
            { icon: TrendingUp, val: "2.4M t", label: "CO₂ Saved", grad: "from-lime-400 to-emerald-500" },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-card border p-5">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.grad} text-white shadow-glow mb-3`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-display font-bold">{s.val}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Challenges */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold">Green Challenges</h2>
              <p className="text-sm text-muted-foreground">Pick a mission. Build a habit. Change the numbers.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {challenges.map((c, i) => {
              const isJoined = !!joined[i];
              const pct = (c.progress / c.days) * 100;
              return (
                <motion.div key={c.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="relative rounded-3xl bg-card border p-6 overflow-hidden group">
                  <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${c.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
                  <div className="relative">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.gradient} shadow-glow`}>
                      <c.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Day {c.progress} / {c.days}</span>
                        <span className="font-medium">{Math.round(pct)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${c.gradient}`} />
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" /> {c.participants.toLocaleString()}
                      </div>
                      <button
                        onClick={() => toggle(i)}
                        className={`text-xs font-medium rounded-full px-4 py-1.5 transition-all ${
                          isJoined ? "bg-primary/10 text-primary" : "bg-gradient-eco text-white shadow-glow hover:scale-105"
                        }`}
                      >
                        {isJoined ? <span className="inline-flex items-center gap-1"><Check className="h-3 w-3" /> Joined</span> : "Join"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Badges + Leaderboard */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <motion.section
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl bg-card border p-6">
            <div className="flex items-center gap-3 mb-1">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-bold">Eco Badges</h2>
            </div>
            <p className="text-sm text-muted-foreground">4 of 8 earned — keep going!</p>
            <div className="mt-6 grid grid-cols-4 gap-3">
              {badges.map((b) => (
                <div key={b.name} className={`aspect-square rounded-2xl border p-3 flex flex-col items-center justify-center text-center transition-all ${
                  b.earned ? "bg-gradient-eco/10 border-primary/30 shadow-glow" : "bg-muted/40 opacity-50"
                }`}>
                  <div className="text-3xl">{b.icon}</div>
                  <div className="text-[10px] font-medium mt-1.5 uppercase tracking-wider">{b.name}</div>
                </div>
              ))}
            </div>

            {/* Your progress */}
            <div className="mt-6 rounded-2xl bg-gradient-hero p-5 text-white">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><Flame className="h-4 w-4" /> 18-day streak</div>
                <div className="text-xs opacity-80">Level 6 · Eco Advocate</div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "72%" }} viewport={{ once: true }}
                  transition={{ duration: 1.2 }} className="h-full bg-white/90" />
              </div>
              <div className="mt-2 text-xs opacity-80">720 / 1000 XP to next level</div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl bg-card border p-6">
            <div className="flex items-center gap-3 mb-1">
              <Trophy className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-bold">Leaderboard</h2>
            </div>
            <p className="text-sm text-muted-foreground">This week's top eco-doers</p>
            <div className="mt-5 space-y-2">
              {leaderboard.map((u) => (
                <div key={u.rank} className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
                  u.me ? "bg-gradient-eco/10 border border-primary/30" : "hover:bg-muted/50"
                }`}>
                  <div className={`w-8 text-center font-display font-bold ${
                    u.rank === 1 ? "text-amber-500" : u.rank === 2 ? "text-slate-400" : u.rank === 3 ? "text-orange-600" : "text-muted-foreground"
                  }`}>#{u.rank}</div>
                  <div className="h-9 w-9 rounded-full bg-gradient-eco grid place-items-center text-lg shrink-0">{u.avatar}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{u.name}{u.me && " (you)"}</div>
                    <div className="text-xs text-muted-foreground">{u.score.toLocaleString()} pts</div>
                  </div>
                  <div className={`text-xs font-medium ${u.change.startsWith("+") ? "text-emerald-600" : u.change.startsWith("-") ? "text-rose-500" : "text-muted-foreground"}`}>
                    {u.change}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Stories */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold">Sustainability Stories</h2>
              <p className="text-sm text-muted-foreground">Real wins from the community.</p>
            </div>
            <button className="text-xs font-medium rounded-full bg-gradient-eco text-white px-4 py-2 shadow-glow">
              Share Your Story
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {stories.map((s, i) => (
              <motion.article key={s.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-card border overflow-hidden hover:shadow-glow transition-shadow">
                <div className="h-40 bg-gradient-eco grid place-items-center text-7xl">{s.img}</div>
                <div className="p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-gradient-eco grid place-items-center text-lg">{s.avatar}</div>
                    <div>
                      <div className="text-sm font-semibold">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.when} ago</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{s.text}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <button className="inline-flex items-center gap-1 hover:text-rose-500 transition-colors"><Heart className="h-3.5 w-3.5" /> {s.likes}</button>
                    <button className="inline-flex items-center gap-1 hover:text-primary transition-colors"><MessageCircle className="h-3.5 w-3.5" /> {s.comments}</button>
                    <button className="inline-flex items-center gap-1 hover:text-primary transition-colors ml-auto"><Share2 className="h-3.5 w-3.5" /> Share</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
