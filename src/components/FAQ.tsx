/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItemProps {
  key?: any;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className={`border rounded-2xl transition-all duration-300 ${
      isOpen ? "border-brand-primary bg-white/5 shadow-lg shadow-brand-primary/5" : "border-white/5 bg-slate-900/40"
    }`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
      >
        <span className="font-display font-semibold text-white text-base md:text-lg">
          {question}
        </span>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${
          isOpen ? "bg-brand-primary border-brand-primary text-white" : "border-white/10 text-slate-400"
        }`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: "Can it answer customer questions automatically?",
      answer: "Yes, completely! CliChat acts as a fully automated agent. By feeding it your business-specific guidelines, products lists, and FAQ lists, it answers customer questions, handles product recommendations, and processes lead info with up to 95% accuracy."
    },
    {
      question: "Can it work with WhatsApp?",
      answer: "Absolutely! We can deploy your custom AI employee on WhatsApp Business so customers can message you directly on the phone number they already know and trust. It answers instantly 24/7."
    },
    {
      question: "Can it work with my website?",
      answer: "Yes. We generate a beautifully designed, fast, lightweight chat bubble widget that easily plugs into any website provider (WordPress, Shopify, Wix, custom React, etc.). The integration only takes one line of HTML code."
    },
    {
      question: "How long does setup take?",
      answer: "We deliver and activate your custom trained AI agent within 24 hours of your information upload. Our engineers handle all model configurations and platform connections for you."
    },
    {
      question: "Can it be customized?",
      answer: "Yes, fully! You choose your agent's name (e.g., Akua or Kwame), profile avatar, speaking persona (friendly, professional, formal), and even its local language options (English, standard Ghanaian Twi, and regional Pidgin)."
    },
    {
      question: "Do I need technical knowledge?",
      answer: "None whatsoever! If you can send text messages, you can use CliChat. We handle the entire build, training, testing, and deployment setup. You'll manage your bookings and logs from a simple, clean, non-technical dashboard."
    }
  ];

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden bg-brand-bg bg-grid-pattern border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-full mb-4">
            Common Questions
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-4 leading-relaxed">
            Everything you need to know about setting up, pricing, and operating your custom AI customer support agents.
          </p>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Final call to action card */}
        <div className="mt-16 p-6 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Have more questions or specific API needs?</h4>
              <p className="text-xs text-slate-400">Our customer team is happy to schedule an instant WhatsApp call.</p>
            </div>
          </div>
          <a
            href="https://wa.me/233241234567"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-white hover:text-brand-primary transition-colors border-b border-white hover:border-brand-primary pb-0.5 whitespace-nowrap"
          >
            Chat with an Expert on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
