/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Info, Cpu, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <Info className="w-6 h-6 text-white" />,
      title: "Tell Us About Your Business",
      description: "Upload your FAQs, documents, policies, or product lists. Our training engine absorbs your specific catalog and guidelines perfectly."
    },
    {
      number: "02",
      icon: <Cpu className="w-6 h-6 text-white" />,
      title: "Choose Channels & Integrations",
      description: "Select where you want your agent to operate. We configure it to respond on your Website, WhatsApp, or Telegram instantly."
    },
    {
      number: "03",
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "We Build and Deploy",
      description: "Our engineers construct, train, and test your custom agent within 24 hours. Once you preview and approve, your agent goes live immediately."
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden bg-brand-bg bg-grid-pattern border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-24">
          <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-full mb-4">
            Workflow Process
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white max-w-2xl leading-tight">
            How CliChat Gets Your AI Agent Online
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-4 leading-relaxed">
            From initial business data training to live automated customer service in three simple, hassle-free phases.
          </p>
        </div>

        {/* Steps Content */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-16 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-brand-primary via-brand-accent to-brand-success opacity-30 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left px-4 group"
              >
                {/* Step badge and icon */}
                <div className="relative mb-6">
                  {/* Outer circle glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-primary to-brand-accent opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
                  
                  {/* Inner number */}
                  <span className="absolute -top-3 -right-3 w-7 h-7 bg-brand-primary text-[11px] font-bold font-mono text-white rounded-full flex items-center justify-center border-2 border-slate-900 shadow">
                    {step.number}
                  </span>

                  {/* Icon Frame */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-white/10 flex items-center justify-center shadow-xl group-hover:border-brand-primary transition-colors duration-300">
                    <div className="p-3 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent group-hover:scale-105 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Step Text details */}
                <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-brand-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dynamic micro animation CTA hook */}
        <div className="mt-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-brand-success font-mono uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 bg-brand-success rounded-full animate-ping" />
            Active agents deploy in 24 hrs or less.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
