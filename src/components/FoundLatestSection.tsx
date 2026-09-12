/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react';
import { FEATURED_QUESTIONS } from '../data/foundMathData';
import { MathQuestionItem } from '../types';

interface FoundLatestSectionProps {
  onViewSolution: (question: MathQuestionItem) => void;
  onViewAllQuestions: () => void;
  onStartExploring: () => void;
}

export const FoundLatestSection: React.FC<FoundLatestSectionProps> = ({
  onViewSolution,
  onViewAllQuestions,
  onStartExploring
}) => {
  // We take the first 5 questions exactly as shown in the screenshot
  const latestQuestions = FEATURED_QUESTIONS.slice(0, 5);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100" id="latest-questions-section">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Latest Questions & Solutions List (8 of 12 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Latest Questions & Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore some of our most recently added questions with detailed, step-by-step solutions.
              </p>
            </div>

            <button
              onClick={onViewAllQuestions}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors self-start sm:self-auto shrink-0"
              id="latest-view-all-btn"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* List of 5 Questions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 overflow-hidden">
            {latestQuestions.map((q) => (
              <div
                key={q.id}
                className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                id={`latest-question-${q.id}`}
              >
                {/* Left side with badge and title/problem */}
                <div className="flex items-start gap-4">
                  {/* Subject Pill Badge */}
                  <span
                    className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold shrink-0 border ${
                      q.subjectId === 'algebra'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : q.subjectId === 'geometry'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : q.subjectId === 'trigonometry'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : q.subjectId === 'calculus'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {q.badgeLabel}
                  </span>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-0.5">
                      {q.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal">
                      {q.problemText}
                    </p>
                  </div>
                </div>

                {/* Right side action: View Solution → */}
                <button
                  onClick={() => onViewSolution(q)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors shrink-0 self-start sm:self-center"
                  id={`view-solution-btn-${q.id}`}
                >
                  <span>View Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Better Practice. Higher Scores. Card (4 of 12 cols) */}
        <div className="lg:col-span-4 flex">
          <div className="w-full bg-blue-50/70 border border-blue-100 rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-2xs">
            
            <div>
              {/* Radial Lightbulb Icon */}
              <div className="w-12 h-12 rounded-full border-2 border-blue-600/30 bg-blue-50 flex items-center justify-center mb-6 text-blue-600 relative">
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Rays */}
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
                  <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" />
                  <line x1="2" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="22" y2="12" />
                  {/* Bulb */}
                  <path d="M9 18h6" />
                  <path d="M10 21h4" />
                  <path d="M15 15a6 6 0 1 0-6 0c.7.7 1 1.5 1 2.5h4c0-1 .3-1.8 1-2.5z" />
                </svg>
              </div>

              {/* Card Heading */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                Better Practice.<br />Higher Scores.
              </h3>

              {/* Card Subtext */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Found Math helps you build confidence and improve your problem-solving skills with clear, easy-to-follow solutions.
              </p>

              {/* 4 Feature Checklist Items */}
              <div className="space-y-3.5 mb-8">
                
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                    <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                    </svg>
                  </div>
                  <span>Detailed step-by-step explanations</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                    <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                    </svg>
                  </div>
                  <span>Covers IGCSE, A-Level and more</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                    <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                    </svg>
                  </div>
                  <span>Updated regularly</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                    <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                    </svg>
                  </div>
                  <span>Free to use</span>
                </div>

              </div>
            </div>

            {/* Action Button: Start Exploring → */}
            <button
              onClick={onStartExploring}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              id="start-exploring-card-btn"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>

    </section>
  );
};
