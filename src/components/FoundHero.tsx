/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, BookOpen, Zap, ShieldCheck, Smartphone } from 'lucide-react';

interface FoundHeroProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const FoundHero: React.FC<FoundHeroProps> = ({
  onSearch,
  searchQuery,
  setSearchQuery
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0C192E] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      
      {/* Background Math Sketches & Chalkboard Formula Diagrams */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-25">
        
        {/* Top-left: a² + b² = c² */}
        <div className="absolute top-10 left-8 sm:left-24 text-slate-300 font-serif italic text-2xl sm:text-3xl tracking-widest rotate-[-8deg]">
          a² + b² = c²
        </div>

        {/* Left: Coordinate axes with parabola */}
        <div className="absolute top-36 left-4 sm:left-14 w-40 h-40">
          <svg viewBox="0 0 160 160" className="w-full h-full stroke-slate-300/80 fill-none" strokeWidth="1.5">
            {/* Y axis */}
            <line x1="80" y1="10" x2="80" y2="150" strokeDasharray="3 3" />
            {/* X axis */}
            <line x1="10" y1="110" x2="150" y2="110" strokeDasharray="3 3" />
            <text x="84" y="24" className="text-[12px] fill-slate-300 font-serif italic" stroke="none">y</text>
            <text x="142" y="104" className="text-[12px] fill-slate-300 font-serif italic" stroke="none">x</text>
            {/* Parabola curve y = a x^2 */}
            <path d="M 25 20 Q 80 135 135 20" strokeWidth="2" stroke="#60A5FA" />
          </svg>
        </div>

        {/* Top-right: Quadratic Formula */}
        <div className="absolute top-10 right-8 sm:right-24 text-slate-300 font-serif text-xl sm:text-2xl tracking-wide rotate-[6deg]">
          <div className="flex items-center gap-1.5">
            <span className="italic">x</span>
            <span>=</span>
            <div className="flex flex-col items-center">
              <span className="border-b border-slate-300/80 pb-0.5 px-2 text-sm sm:text-base">
                -b ± √(b² - 4ac)
              </span>
              <span className="text-sm sm:text-base pt-0.5">2a</span>
            </div>
          </div>
        </div>

        {/* Right: Right-angled Triangle with sides a, b, c */}
        <div className="absolute top-44 right-6 sm:right-20 w-44 h-40">
          <svg viewBox="0 0 160 140" className="w-full h-full stroke-slate-300/80 fill-none" strokeWidth="1.75">
            {/* Right Triangle */}
            <polygon points="20,120 140,120 140,30" />
            {/* Right angle marker */}
            <path d="M 125 120 L 125 105 L 140 105" strokeWidth="1.2" />
            <text x="75" y="135" className="text-[14px] fill-slate-300 font-serif italic" stroke="none">b</text>
            <text x="148" y="80" className="text-[14px] fill-slate-300 font-serif italic" stroke="none">a</text>
            <text x="70" y="70" className="text-[14px] fill-slate-300 font-serif italic" stroke="none">c</text>
          </svg>
        </div>

      </div>

      {/* Hero Center Content */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        
        {/* Main Brand Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4">
          Found <span className="text-blue-500">Math</span>
        </h1>

        {/* Practice. Learn. Get It Right. */}
        <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
          Practice. Learn. Get It Right.
        </p>

        {/* Description Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Your one-stop resource for high-quality math questions and detailed solutions.
          <br className="hidden sm:inline" /> From core topics to advanced problems — we've got you covered.
        </p>

        {/* Big Search Input Pill */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center bg-white rounded-full p-2 pl-6 shadow-2xl transition-all focus-within:ring-4 focus-within:ring-blue-400/30">
            <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a question, topic or keyword..."
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none pr-3 font-medium"
              id="hero-search-input"
            />
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md transition-all shrink-0 active:scale-95"
              id="hero-search-submit-btn"
            >
              Search
            </button>
          </div>
        </form>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-slate-800/80 max-w-3xl mx-auto">
          
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
            <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Step-by-step solutions</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
            <Zap className="w-4 h-4 text-blue-400 shrink-0" />
            <span>All major topics</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Trusted & accurate</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
            <Smartphone className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Learn at your own pace</span>
          </div>

        </div>

      </div>

    </section>
  );
};
