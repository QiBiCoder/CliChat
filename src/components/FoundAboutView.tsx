/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, Award, Zap, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

interface FoundAboutViewProps {
  onStartExploring: () => void;
}

export const FoundAboutView: React.FC<FoundAboutViewProps> = ({ onStartExploring }) => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Hero */}
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
          ABOUT FOUND MATH
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Practice. Learn. Get It Right.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Found Math was built with a single mission: to empower students worldwide with crystal-clear math questions and step-by-step verified solutions.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Step-by-Step Derivations</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Every problem features complete line-by-line mathematical working, leaving no guesswork or unexplained jumps in logic.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Curriculum Aligned</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Thoroughly vetted against IGCSE (CIE 0580), Edexcel Higher Maths, A-Level Mathematics, and IB standards.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Free & Accessible</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            High-quality math education should be accessible to all students. Practice at your own pace, anytime, anywhere.
          </p>
        </div>

      </div>

      {/* Call to action */}
      <div className="bg-blue-50/80 border border-blue-100 rounded-3xl p-8 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
          Ready to elevate your math grades?
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6">
          Start exploring questions across Algebra, Geometry, Trigonometry, and Calculus today.
        </p>
        <button
          onClick={onStartExploring}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
        >
          <span>Start Exploring Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
