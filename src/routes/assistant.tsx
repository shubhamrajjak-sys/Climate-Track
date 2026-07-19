import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Leaf, Zap, Recycle, Wind, RefreshCw, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/assistant")({
  component: Assistant,
  head: () => ({
    meta: [
      { title: "AI Climate Assistant — Climate Track" },
      { name: "description", content: "Ask an AI about climate change, sustainability, carbon reduction, and renewable energy." },
    ],
  }),
});

type Msg = { role: "user" | "assistant"; content: string };

const QUICK = [
  { label: "How can I reduce my carbon footprint?", icon: Leaf },
  { label: "Best renewable energy for homes?", icon: Zap },
  { label: "5 sustainability tips for beginners", icon: Recycle },
  { label: "Explain climate change simply", icon: Wind },
];

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    setError(null);
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      setMessages([...next, { role: "assistant", content: data.text }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to reach assistant");
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const reset = () => { setMessages([]); setError(null); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <main className="container mx-auto px-4 pt-28 pb-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" /> AI Climate Assistant
            </div>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold">Ask anything about the planet.</h1>
          </div>
          {messages.length > 0 && (
            <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <RefreshCw className="h-3.5 w-3.5" /> New chat
            </button>
          )}
        </div>

        <div className="rounded-3xl glass-light border shadow-lg overflow-hidden flex flex-col h-[72vh]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-eco grid place-items-center shadow-glow mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold">How can I help you go greener?</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Ask about climate, energy, sustainable habits, or carbon math.
                </p>
                <div className="mt-8 grid sm:grid-cols-2 gap-3 w-full max-w-2xl">
                  {QUICK.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => send(q.label)}
                      className="group flex items-center gap-3 rounded-2xl border bg-card p-4 text-left hover:border-primary/50 hover:shadow-glow transition-all"
                    >
                      <div className="h-9 w-9 rounded-xl bg-gradient-eco grid place-items-center shadow-glow shrink-0">
                        <q.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">{q.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`h-8 w-8 rounded-full grid place-items-center shrink-0 ${
                    m.role === "user" ? "bg-secondary text-white" : "bg-gradient-eco shadow-glow"
                  }`}>
                    {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-white" />}
                  </div>
                  <div className={`max-w-[80%] ${m.role === "user" ? "" : "flex-1"}`}>
                    {m.role === "user" ? (
                      <div className="rounded-2xl rounded-tr-sm bg-gradient-eco text-white px-4 py-2.5 text-sm shadow-glow">
                        {m.content}
                      </div>
                    ) : (
                      <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-headings:mt-3 prose-headings:mb-1 prose-strong:text-foreground text-foreground/90">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-eco grid place-items-center shadow-glow">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex items-center gap-1.5 h-8">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-primary"
                      animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm p-3">
                {error}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="border-t p-3 bg-white/60 backdrop-blur-xl"
          >
            <div className="flex items-end gap-2 rounded-2xl border bg-card p-2 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask about climate, energy, sustainability…"
                rows={1}
                disabled={loading}
                className="flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground max-h-32"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-9 w-9 rounded-xl bg-gradient-eco grid place-items-center text-white shadow-glow disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
