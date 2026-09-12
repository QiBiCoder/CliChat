import React from 'react';
import { Sparkles, ArrowRight, Layers, HelpCircle, Check, BookOpen } from 'lucide-react';
import { MathTopic } from '../types';

interface HeroBannerProps {
  onGenerateClick: () => void;
  onExploreTopic: (topic: MathTopic) => void;
  totalQuestions: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onGenerateClick,
  onExploreTopic,
  totalQuestions,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl mb-8 no-print">
      {/* Background ambient gradient glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Found Math • Algebra Problem & Solution Hub</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Master Algebra with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            curated questions & instant generators.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl font-normal">
          Explore hundreds of algebra problems with complete, step-by-step mathematical solutions. Need fresh practice? Generate infinite randomized linear, quadratic, and system equations with complete derivations.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={onGenerateClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate New Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#questions"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Browse Library ({totalQuestions})</span>
          </a>
        </div>

        {/* Quick Topic Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-400 font-medium mr-1">Quick Topics:</span>
          <button
            onClick={() => onExploreTopic('linear-equations')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-950/60 hover:text-indigo-300 hover:border-indigo-500/40 text-slate-300 border border-slate-700/60 transition-all"
          >
            Linear Equations
          </button>
          <button
            onClick={() => onExploreTopic('quadratic-equations')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-950/60 hover:text-indigo-300 hover:border-indigo-500/40 text-slate-300 border border-slate-700/60 transition-all"
          >
            Quadratics
          </button>
          <button
            onClick={() => onExploreTopic('systems-of-equations')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-950/60 hover:text-indigo-300 hover:border-indigo-500/40 text-slate-300 border border-slate-700/60 transition-all"
          >
            Systems of Equations
          </button>
          <button
            onClick={() => onExploreTopic('polynomials-factoring')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-950/60 hover:text-indigo-300 hover:border-indigo-500/40 text-slate-300 border border-slate-700/60 transition-all"
          >
            Factoring & Polynomials
          </button>
          <button
            onClick={() => onExploreTopic('word-problems')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-950/60 hover:text-indigo-300 hover:border-indigo-500/40 text-slate-300 border border-slate-700/60 transition-all"
          >
            Word Problems
          </button>
        </div>
      </div>
    </div>
  );
};
