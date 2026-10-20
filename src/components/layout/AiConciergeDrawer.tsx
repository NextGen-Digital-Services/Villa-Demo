"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, X, Send, Bot, ArrowRight } from "lucide-react";
import { featureFlags } from "@/config/features";
import { cn } from "@/lib/utils";

interface ChatMessage {
  sender: "user" | "concierge";
  text: string;
  recommendationSlug?: string;
  recommendationName?: string;
}

export function AiConciergeDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      sender: "concierge",
      text: "Buongiorno! I am your VillaOne Luxury AI Concierge. Tell me your dream vacation aesthetic, destination, or guest count.",
    },
  ]);

  if (!featureFlags.enableAiConcierge) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { sender: "user", text: query };
    let replyMsg: ChatMessage = {
      sender: "concierge",
      text: "Based on your preferences, I recommend our Tuscan cliffside haven in North Goa with a private pool and dedicated pasta chef.",
      recommendationSlug: "villa-bellissima-goa",
      recommendationName: "Villa Bellissima, Goa",
    };

    if (query.toLowerCase().includes("pet") || query.toLowerCase().includes("dog")) {
      replyMsg = {
        sender: "concierge",
        text: "For pets, our sprawling 3-acre botanical estate in Alibaug is heavenly, complete with dedicated lawn spaces and agility grounds.",
        recommendationSlug: "il-giardino-alibaug",
        recommendationName: "Il Giardino, Alibaug",
      };
    } else if (query.toLowerCase().includes("mountain") || query.toLowerCase().includes("manali")) {
      replyMsg = {
        sender: "concierge",
        text: "I suggest our Italian alpine estate in Solang Valley featuring heated hydro pools and crackling slate fireplaces.",
        recommendationSlug: "chalet-dolomiti-manali",
        recommendationName: "Chalet Dolomiti, Manali",
      };
    }

    setMessages((prev) => [...prev, userMsg, replyMsg]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-cypress text-ivory shadow-2xl border border-gold/40 hover:bg-cypress-dark hover:scale-105 transition-all text-xs font-semibold uppercase tracking-wider"
      >
        <Sparkles className="w-4 h-4 text-gold-light animate-pulse" />
        <span>AI Concierge</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md bg-ivory h-full shadow-2xl border-l border-stone-soft/30 flex flex-col z-10 animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-stone-soft/20 flex items-center justify-between bg-sand/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-cypress text-gold flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-charcoal text-base">VillaOne AI Concierge</h3>
                  <p className="text-[10px] text-stone-soft uppercase tracking-wider">Intelligent Luxury Curation</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 text-stone-soft hover:text-charcoal rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
              {messages.map((m, idx) => (
                <div key={idx} className={cn("flex flex-col", m.sender === "user" ? "items-end" : "items-start")}>
                  <div className={cn("p-3.5 rounded-2xl max-w-[85%] leading-relaxed", m.sender === "user" ? "bg-cypress text-ivory rounded-br-xs" : "bg-white border border-stone-soft/20 text-charcoal rounded-bl-xs shadow-xs")}>
                    {m.text}
                    {m.recommendationSlug && (
                      <Link href={`/villas/${m.recommendationSlug}`} onClick={() => setIsOpen(false)} className="mt-3 flex items-center justify-between p-2.5 bg-sand/80 rounded-lg text-cypress font-semibold hover:bg-sand border border-gold/30">
                        <span>{m.recommendationName}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-stone-soft/20 bg-white/70 space-y-2">
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                {["Goa sea view with chef", "Pet-friendly in Alibaug", "Alpine chalet in Manali"].map((prompt) => (
                  <button key={prompt} onClick={() => handleSend(prompt)} className="shrink-0 px-2.5 py-1 rounded-full bg-sand hover:bg-stone-light text-charcoal border border-stone-soft/20">
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask concierge anything..." className="flex-1 bg-ivory border border-stone-soft/30 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold" />
                <button type="submit" className="p-2 bg-cypress text-ivory rounded-lg hover:bg-cypress-dark"><Send className="w-4 h-4" /></button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
