/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Check, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onQuoteClick: () => void;
  onDemoClick: () => void;
}

interface Message {
  sender: "bot" | "user";
  text: string;
  time: string;
}

const CHAT_CONVERSATION: Message[] = [
  { sender: "bot", text: "Hello! 👋 Welcome to AfroBoutique. How can I assist you today?", time: "09:00 AM" },
  { sender: "user", text: "Do you have the Kente fabric in royal gold?", time: "09:00 AM" },
  { sender: "bot", text: "Yes, we do! 🌟 The Royal Gold Kente fabric is currently in stock. It is priced at GHS 850 for a 6-yard piece. Would you like me to reserve one or place an order for delivery?", time: "09:01 AM" },
  { sender: "user", text: "Can you deliver to Kumasi tomorrow?", time: "09:01 AM" },
  { sender: "bot", text: "Absolutely! We deliver nationwide. For Kumasi, next-day delivery is available if booked before 4:00 PM. Shipping fee is GHS 45. Shall we proceed with your delivery details?", time: "09:02 AM" },
  { sender: "user", text: "Yes, let's proceed!", time: "09:02 AM" },
  { sender: "bot", text: "Excellent choice! 🚀 Please provide your Delivery Address and Contact Phone Number to complete the order.", time: "09:02 AM" }
];

export default function Hero({ onQuoteClick, onDemoClick }: HeroProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initial bot greeting
    const startChat = async () => {
      setIsTyping(true);
      await new Promise((r) => setTimeout(r, 1500));
      setIsTyping(false);
      setMessages([CHAT_CONVERSATION[0]]);
      setCurrentMsgIndex(1);
    };
    startChat();
  }, []);

  useEffect(() => {
    if (currentMsgIndex === 0 || currentMsgIndex >= CHAT_CONVERSATION.length) {
      // Loop conversation after a long delay
      if (currentMsgIndex >= CHAT_CONVERSATION.length) {
        const timer = setTimeout(() => {
          setMessages([]);
          setCurrentMsgIndex(0);
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages([CHAT_CONVERSATION[0]]);
            setCurrentMsgIndex(1);
          }, 1500);
        }, 6000);
        return () => clearTimeout(timer);
      }
      return;
    }

    const nextMessage = CHAT_CONVERSATION[currentMsgIndex];
    const delay = nextMessage.sender === "bot" ? 2500 : 1800;

    const timer = setTimeout(async () => {
      if (nextMessage.sender === "bot") {
        setIsTyping(true);
        await new Promise((r) => setTimeout(r, 1500));
        setIsTyping(false);
      }
      setMessages((prev) => [...prev, nextMessage]);
      setCurrentMsgIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentMsgIndex]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <section
      id="home"
      className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden bg-brand-bg bg-grid-pattern"
    >
      {/* Dynamic Background Floating Blobs matching Sophisticated Dark theme */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-[#2563EB] opacity-10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#7C3AED] opacity-10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#2563EB] opacity-[0.03] rotate-12 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-bold uppercase tracking-widest mb-6 w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            Next-Gen AI Employees
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6.5xl tracking-tight text-white leading-[1.1] mb-6"
          >
            Hire an AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">Employee</span> <br className="hidden sm:block" />
            That Works 24/7
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10"
          >
            Automate customer support, lead generation, bookings, and sales across your{" "}
            <span className="text-white font-semibold">Website</span>,{" "}
            <span className="text-brand-success font-semibold">WhatsApp</span>, and{" "}
            <span className="text-brand-primary font-semibold">Telegram</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onQuoteClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent hover:opacity-95 text-white font-display font-bold text-base shadow-lg shadow-brand-primary/25 transition-all hover:-translate-y-0.5"
            >
              Get My Quote
            </button>
            <button
              onClick={onDemoClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-display font-bold text-base transition-all hover:-translate-y-0.5"
            >
              Book a Demo
            </button>
          </motion.div>

          {/* Quick trust checklist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/5 pt-8 w-full"
          >
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Check className="w-4 h-4 text-brand-success" />
              <span>English, Twi & Pidgin</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Check className="w-4 h-4 text-brand-success" />
              <span>Setup within 24 Hours</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Check className="w-4 h-4 text-brand-success" />
              <span>Full Human Handoff</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Right Content - Interactive Simulator Card & 3D graphic */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6 items-center justify-center relative">
          {/* Glass background decoration card with generated image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md absolute -top-8 -right-8 opacity-20 pointer-events-none z-0 hidden lg:block"
          >
            <img
              src="/src/assets/images/hero_ai_illustration_1782575969194.jpg"
              alt="CliChat AI Abstract Graphic"
              referrerPolicy="no-referrer"
              className="w-full rounded-full animate-float-slow"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 z-10"
          >
            {/* Simulator Header */}
            <div className="px-6 py-4 bg-slate-900/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-success to-emerald-600 flex items-center justify-center relative shadow-inner">
                  <span className="text-white text-base font-bold font-display">AK</span>
                  <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-brand-success rounded-full border border-slate-900 animate-ping" />
                  <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-brand-success rounded-full border border-slate-900" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold tracking-tight">Akua Support Agent</h4>
                  <p className="text-xs text-brand-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-success rounded-full" />
                    Live Simulator (AfroBoutique)
                  </p>
                </div>
              </div>
              <div className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-400 font-mono font-medium">
                DEMO AGENT
              </div>
            </div>

            {/* Simulator Chat Area */}
            <div className="p-6 h-[340px] overflow-y-auto flex flex-col gap-4 bg-slate-950/20">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm ${
                        msg.sender === "user"
                          ? "bg-brand-primary text-white rounded-br-none"
                          : "bg-white/10 text-slate-100 rounded-bl-none border border-white/5"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <div className="self-start flex items-center gap-1.5 bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Simulator Dummy Input Bar */}
            <div className="px-6 py-4 bg-slate-900/60 border-t border-white/10 flex items-center gap-3">
              <div className="flex-1 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-xs text-slate-500 font-sans">
                Typing automatic simulation...
              </div>
              <button className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center text-white cursor-default">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Quick integration badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl z-10"
          >
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Integrates with:</span>
            <div className="flex gap-3">
              <span className="px-2.5 py-1 rounded bg-brand-primary/10 text-[11px] text-brand-primary font-bold border border-brand-primary/20">
                Websites
              </span>
              <span className="px-2.5 py-1 rounded bg-brand-success/10 text-[11px] text-brand-success font-bold border border-brand-success/20">
                WhatsApp
              </span>
              <span className="px-2.5 py-1 rounded bg-sky-500/10 text-[11px] text-sky-400 font-bold border border-sky-500/20">
                Telegram
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
