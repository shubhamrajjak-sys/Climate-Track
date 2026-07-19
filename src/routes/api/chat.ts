import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM = `You are Climate Track's AI Climate Assistant — an expert on climate change, sustainability, carbon reduction, and renewable energy.

Guidelines:
- Answer clearly, using markdown (short paragraphs, bullet points, bold key numbers).
- Be practical and actionable. When useful, give concrete steps or examples.
- Stay focused on climate, environment, sustainability, and energy topics. If asked something unrelated, gently steer back.
- Cite well-known facts confidently; when uncertain, say so.
- Keep responses concise unless the user asks for depth.`;

type Msg = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { messages?: Msg[] };
          const messages = Array.isArray(body.messages) ? body.messages : [];
          if (!messages.length) return new Response("No messages", { status: 400 });

          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

          const gateway = createLovableAiGatewayProvider(key);
          const { text } = await generateText({
            model: gateway("google/gemini-2.5-flash"),
            system: SYSTEM,
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
          });

          return Response.json({ text });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          const status = /rate/i.test(msg) ? 429 : /credit|402/i.test(msg) ? 402 : 500;
          return Response.json({ error: msg }, { status });
        }
      },
    },
  },
});
