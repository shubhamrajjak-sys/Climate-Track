import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, Camera, MapPin, Upload, X, Check, Loader2,
  Trash2, TreePine, Droplets, Flame, Wind, ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/report")({
  component: Report,
  head: () => ({
    meta: [
      { title: "Report Environmental Issues — Climate Track" },
      { name: "description", content: "Report pollution, illegal dumping, tree cutting, water leakage, and waste burning." },
    ],
  }),
});

const CATEGORIES = [
  { key: "pollution", label: "Pollution", icon: Wind, color: "from-slate-500 to-slate-700" },
  { key: "dumping", label: "Illegal Dumping", icon: Trash2, color: "from-amber-500 to-orange-600" },
  { key: "trees", label: "Tree Cutting", icon: TreePine, color: "from-emerald-500 to-green-700" },
  { key: "water", label: "Water Leakage", icon: Droplets, color: "from-sky-500 to-blue-600" },
  { key: "burning", label: "Waste Burning", icon: Flame, color: "from-red-500 to-rose-700" },
] as const;

type Status = "pending" | "reviewing" | "in-progress" | "resolved";

const RECENT: { id: string; cat: string; where: string; when: string; status: Status; icon: any; x: number; y: number }[] = [
  { id: "R-2481", cat: "Illegal Dumping", where: "Sector 22, Riverside", when: "2h ago", status: "reviewing", icon: Trash2, x: 32, y: 28 },
  { id: "R-2479", cat: "Water Leakage", where: "5th Ave & Main", when: "4h ago", status: "in-progress", icon: Droplets, x: 65, y: 41 },
  { id: "R-2472", cat: "Tree Cutting", where: "Oakwood Reserve", when: "1d ago", status: "resolved", icon: TreePine, x: 48, y: 68 },
  { id: "R-2470", cat: "Waste Burning", where: "Industrial Park East", when: "1d ago", status: "pending", icon: Flame, x: 78, y: 22 },
  { id: "R-2465", cat: "Pollution", where: "Harbor District", when: "2d ago", status: "in-progress", icon: Wind, x: 20, y: 55 },
];

const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  reviewing: "bg-sky-500/15 text-sky-600 border-sky-500/30",
  "in-progress": "bg-blue-500/15 text-blue-600 border-blue-500/30",
  resolved: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
};

function Report() {
  const [cat, setCat] = useState<string>("pollution");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const pickFile = () => fileRef.current?.click();
  const onFile = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImg(String(r.result));
    r.readAsDataURL(f);
  };

  const getLocation = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      setLoc({ lat: 37.7749, lng: -122.4194 });
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => { setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLocating(false); },
      () => { setLoc({ lat: 37.7749, lng: -122.4194 }); setLocating(false); },
      { timeout: 6000 },
    );
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setCat("pollution"); setDesc(""); setImg(null); setLoc(null); setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-xs uppercase tracking-widest text-primary font-medium">Report</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">See something? Say something.</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Every report is routed to the nearest environmental authority within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-card border p-6 sticky top-24">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <div className="h-16 w-16 rounded-full bg-gradient-eco grid place-items-center mx-auto shadow-glow">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">Report submitted</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Tracking ID <span className="font-mono text-foreground">R-{Math.floor(Math.random() * 9000 + 1000)}</span>
                    </p>
                    <button onClick={reset} className="mt-6 rounded-full bg-gradient-eco text-white text-sm px-6 py-2.5 shadow-glow">
                      Submit another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-primary" /> New Report
                      </h2>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Category</label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {CATEGORIES.map((c) => (
                          <button
                            key={c.key} type="button"
                            onClick={() => setCat(c.key)}
                            className={`flex items-center gap-2 rounded-xl border p-3 text-left transition-all ${
                              cat === c.key ? "border-primary bg-primary/5 shadow-sm" : "hover:border-primary/30"
                            }`}
                          >
                            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${c.color} grid place-items-center`}>
                              <c.icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-xs font-medium">{c.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Description</label>
                      <textarea
                        value={desc} onChange={(e) => setDesc(e.target.value.slice(0, 500))}
                        rows={3} required maxLength={500}
                        placeholder="What did you see? When? Any details help."
                        className="mt-2 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      />
                      <div className="text-right text-xs text-muted-foreground mt-1">{desc.length}/500</div>
                    </div>

                    {/* Photo */}
                    <div>
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Photo</label>
                      <input ref={fileRef} type="file" accept="image/*" className="hidden"
                        onChange={(e) => onFile(e.target.files?.[0])} />
                      {img ? (
                        <div className="mt-2 relative rounded-xl overflow-hidden border">
                          <img src={img} alt="preview" className="w-full h-40 object-cover" />
                          <button type="button" onClick={() => setImg(null)}
                            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 text-white grid place-items-center hover:bg-black/80">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={pickFile}
                          className="mt-2 w-full rounded-xl border-2 border-dashed p-6 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all">
                          <div className="h-10 w-10 rounded-xl bg-gradient-eco grid place-items-center shadow-glow">
                            <Camera className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-sm font-medium">Upload photo</div>
                          <div className="text-xs text-muted-foreground">PNG, JPG up to 10MB</div>
                        </button>
                      )}
                    </div>

                    {/* GPS */}
                    <div>
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">GPS Location</label>
                      <button type="button" onClick={getLocation}
                        className="mt-2 w-full rounded-xl border p-3 flex items-center gap-3 hover:border-primary/50 transition-all">
                        <div className="h-9 w-9 rounded-lg bg-gradient-eco grid place-items-center shadow-glow">
                          {locating ? <Loader2 className="h-4 w-4 text-white animate-spin" /> : <MapPin className="h-4 w-4 text-white" />}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">
                            {loc ? "Location captured" : locating ? "Locating…" : "Use my current location"}
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {loc ? `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}` : "Tap to detect via GPS"}
                          </div>
                        </div>
                        {loc && <Check className="h-4 w-4 text-emerald-500" />}
                      </button>
                    </div>

                    <button type="submit"
                      disabled={!desc.trim()}
                      className="w-full rounded-full bg-gradient-eco text-white py-3 text-sm font-semibold shadow-glow disabled:opacity-50 hover:scale-[1.01] transition-transform inline-flex items-center justify-center gap-2">
                      <Upload className="h-4 w-4" /> Submit Report
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Map + list */}
          <div className="lg:col-span-3 space-y-6">
            {/* Interactive map */}
            <div className="rounded-3xl bg-card border overflow-hidden">
              <div className="p-5 border-b flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold">Interactive Map</h3>
                  <p className="text-xs text-muted-foreground">Live reports in your region</p>
                </div>
                <div className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 font-medium">
                  {RECENT.length} active
                </div>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden"
                style={{ background: "linear-gradient(135deg, oklch(0.94 0.04 200), oklch(0.9 0.06 155))" }}>
                {/* Faux map grid */}
                <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full opacity-40">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.5 0.1 200)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="800" height="500" fill="url(#grid)" />
                  {/* Rivers */}
                  <path d="M 0 320 Q 200 280 350 340 T 800 300" stroke="oklch(0.65 0.15 220)" strokeWidth="14" fill="none" opacity="0.5" strokeLinecap="round" />
                  <path d="M 250 0 Q 300 150 380 250 T 500 500" stroke="oklch(0.65 0.15 220)" strokeWidth="10" fill="none" opacity="0.4" strokeLinecap="round" />
                  {/* Green zones */}
                  <ellipse cx="150" cy="150" rx="120" ry="90" fill="oklch(0.75 0.15 145)" opacity="0.4" />
                  <ellipse cx="620" cy="380" rx="140" ry="100" fill="oklch(0.75 0.15 145)" opacity="0.4" />
                  <ellipse cx="500" cy="120" rx="80" ry="60" fill="oklch(0.75 0.15 145)" opacity="0.35" />
                </svg>

                {/* Pins */}
                {RECENT.map((r, i) => (
                  <motion.div key={r.id}
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    className="absolute -translate-x-1/2 -translate-y-full group cursor-pointer"
                    style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                      <div className="relative h-9 w-9 rounded-full bg-gradient-eco grid place-items-center shadow-glow border-2 border-white">
                        <r.icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap rounded-lg bg-black/85 text-white text-xs px-2 py-1 pointer-events-none">
                      {r.cat} · {r.id}
                    </div>
                  </motion.div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-3 left-3 rounded-xl glass-light px-3 py-2 text-xs">
                  <div className="font-semibold mb-1 text-foreground">Legend</div>
                  <div className="flex items-center gap-1.5 text-muted-foreground"><div className="h-2 w-2 rounded-full bg-primary" /> Active report</div>
                </div>
              </div>
            </div>

            {/* Status tracking */}
            <div className="rounded-3xl bg-card border p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display font-semibold">Status Tracking</h3>
                  <p className="text-xs text-muted-foreground">Real-time updates on recent submissions</p>
                </div>
              </div>
              <div className="divide-y">
                {RECENT.map((r) => (
                  <div key={r.id} className="py-4 flex items-center gap-4 group cursor-pointer hover:bg-muted/40 -mx-2 px-2 rounded-xl transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-gradient-eco grid place-items-center shadow-glow shrink-0">
                      <r.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                        <span className="text-sm font-medium">{r.cat}</span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{r.where} · {r.when}</div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLES[r.status]}`}>
                      {r.status.replace("-", " ")}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
