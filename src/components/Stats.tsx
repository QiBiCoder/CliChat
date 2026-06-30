/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Clock, CheckCircle, Flame, ShieldCheck } from "lucide-react";

export default function Stats() {
  const statsList = [
    {
      icon: <Clock className="w-5 h-5 text-brand-primary" />,
      value: "24 Hours",
      label: "Average Agent Setup Time"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-brand-success" />,
      value: "80%+",
      label: "Support Queries Automated"
    },
    {
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      value: "100%",
      label: "Ghana-focused Local Tone"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-accent" />,
      value: "24/7/365",
      label: "Continuous Active Uptime"
    }
  ];

  return (
    <div className="border-y border-white/5 bg-slate-950/40 backdrop-blur-sm relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/5">
        {statsList.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center justify-center text-center px-4 first:border-l-0 border-l border-white/5"
          >
            <div className="mb-2.5 p-2 rounded-full bg-white/5 border border-white/5">
              {stat.icon}
            </div>
            <span className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs text-slate-400 mt-1 font-medium max-w-[150px] leading-snug">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
