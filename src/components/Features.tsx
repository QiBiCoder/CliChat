/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { motion } from "motion/react";
import { MessageSquare, Calendar, UserPlus, Zap, ShoppingBag, Infinity } from "lucide-react";

interface FeatureCardProps {
  key?: any;
  icon: ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col items-start relative overflow-hidden group border border-white/5"
    >
      {/* Background soft glow on hover */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors duration-300" />
      
      {/* Icon */}
      <div className="mb-6 p-4 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary group-hover:scale-105 transition-transform duration-300">
        {icon}
      </div>

      {/* Content */}
      <h3 className="font-display font-semibold text-lg text-white mb-3 group-hover:text-brand-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function Features() {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI Customer Support",
      description: "Instantly answer FAQs about your business, products, return policies, and location. Fits your specific knowledge base with high accuracy."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Appointment Booking",
      description: "Enables customers to seamlessly schedule consultations, book service slots, or reserve tables directly in chat conversations."
    },
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "Lead Generation",
      description: "Proactively collect names, phone numbers, and emails of prospects. Qualify potential leads with smart custom questions before passing them to sales."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Replies",
      description: "No more leaving customers on 'read'. Fast-paced reply time under 2 seconds across Website, WhatsApp, and Telegram."
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Sales Assistant",
      description: "Recommend suitable products, guide users through sales processes, explain packages, and boost checkout rates dynamically."
    },
    {
      icon: <Infinity className="w-6 h-6" />,
      title: "24/7 Availability",
      description: "While your human staff rests, your AI employee stays online overnight and on weekends. Never miss a middle-of-the-night query or late lead."
    }
  ];

  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-full mb-4">
            Powerful Features
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white max-w-2xl leading-tight">
            Premium AI Capabilities for Your Business Growth
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-4 leading-relaxed">
            Equip your brand with a smart digital employee trained specifically to speak your voice and handle your customer flows seamlessly.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <FeatureCard
              key={index}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              delay={0.1 * (index % 3)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
