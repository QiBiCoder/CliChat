/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import QuoteWizard from "./components/QuoteWizard";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { MessageSquare, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitSuccess, setDemoSubmitSuccess] = useState(false);
  const [demoForm, setDemoForm] = useState({
    name: "",
    bizName: "",
    phone: "",
    email: ""
  });
  const [demoError, setDemoError] = useState("");

  const handleQuoteClick = () => {
    const element = document.getElementById("quote");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleDemoClick = () => {
    setIsDemoModalOpen(true);
    setDemoSubmitSuccess(false);
    setDemoError("");
    setDemoForm({ name: "", bizName: "", phone: "", email: "" });
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.name.trim() || !demoForm.bizName.trim() || !demoForm.phone.trim() || !demoForm.email.trim()) {
      setDemoError("Please fill out all required fields to schedule your demo.");
      return;
    }
    setDemoSubmitSuccess(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg relative overflow-x-hidden selection:bg-brand-primary selection:text-white">
      {/* Absolute background patterns */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-brand-primary/5 via-brand-accent/5 to-transparent pointer-events-none" />

      {/* Sticky Header Navbar */}
      <Navbar onQuoteClick={handleQuoteClick} />

      {/* Interactive Main Hero Section */}
      <Hero onQuoteClick={handleQuoteClick} onDemoClick={handleDemoClick} />

      {/* Numerical Trust Stats Band */}
      <Stats />

      {/* Features Grid Panel */}
      <Features />

      {/* Process How It Works Section */}
      <HowItWorks />

      {/* On-Page CTA Card before Quotes Wizard */}
      <section className="relative py-16 overflow-hidden bg-slate-950/40 border-t border-white/5 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-left max-w-xl relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-success font-semibold flex items-center gap-1.5 mb-2.5">
                <span className="w-1.5 h-1.5 bg-brand-success rounded-full animate-ping" />
                Active integrations in Kumasi, Accra, and Tema
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                Ready to Never Miss a Customer Again?
              </h2>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Join high-growth businesses across Ghana using CliChat to automate FAQs, qualify hot leads, and schedule appointments overnight.
              </p>
            </div>

            <div className="flex-shrink-0 relative z-10 w-full md:w-auto">
              <button
                onClick={handleQuoteClick}
                className="w-full md:w-auto px-7 py-4 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-display font-bold text-sm shadow-lg shadow-brand-primary/15 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
              >
                Configure My AI Employee <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Multi-Step Quote Wizard Selector */}
      <QuoteWizard />

      {/* Fully Configured FAQ Accordion List */}
      <FAQ />

      {/* Main Footer Block */}
      <Footer />

      {/* Interactive Demo booking modal overlay */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md glass-card border border-white/10 rounded-3xl p-8 shadow-2xl z-10 overflow-hidden"
            >
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {demoSubmitSuccess ? (
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-success/10 border border-brand-success/20 flex items-center justify-center text-brand-success mb-4">
                    ✓
                  </div>
                  <h3 className="font-display font-bold text-xl text-white tracking-tight mb-2">
                    Demo Scheduled!
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Thank you <span className="text-white font-semibold">{demoForm.name}</span>. We've reserved a demo slot for your brand <span className="text-white font-semibold">{demoForm.bizName}</span>. One of our engineers will call your phone <span className="text-white font-semibold">{demoForm.phone}</span> shortly.
                  </p>
                  <button
                    onClick={() => setIsDemoModalOpen(false)}
                    className="mt-6 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white tracking-tight">
                      Book a Live Demo
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      See Akua or Kwame interact with real customers live on WhatsApp or your browser.
                    </p>
                  </div>

                  {demoError && (
                    <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-rose-400 text-xs font-medium">
                      {demoError}
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Ama Serwaa"
                        value={demoForm.name}
                        onChange={(e) => {
                          setDemoForm({ ...demoForm, name: e.target.value });
                          if (demoError) setDemoError("");
                        }}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Serwaa Fashion Hub"
                        value={demoForm.bizName}
                        onChange={(e) => {
                          setDemoForm({ ...demoForm, bizName: e.target.value });
                          if (demoError) setDemoError("");
                        }}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="e.g. +233 24 555 1234"
                        value={demoForm.phone}
                        onChange={(e) => {
                          setDemoForm({ ...demoForm, phone: e.target.value });
                          if (demoError) setDemoError("");
                        }}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        placeholder="e.g. ama@fashionhub.com"
                        value={demoForm.email}
                        onChange={(e) => {
                          setDemoForm({ ...demoForm, email: e.target.value });
                          if (demoError) setDemoError("");
                        }}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-display font-bold text-xs rounded-xl hover:opacity-95 transition-all"
                  >
                    Confirm Booking
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
