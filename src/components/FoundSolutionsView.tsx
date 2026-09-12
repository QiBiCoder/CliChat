/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, BookOpen, Lightbulb } from 'lucide-react';
import { FEATURED_QUESTIONS } from '../data/foundMathData';
import { MathQuestionItem } from '../types';

interface FoundSolutionsViewProps {
  onViewSolution: (question: MathQuestionItem) => void;
  selectedQuestion?: MathQuestionItem | null;
  onBackToHome?: () => void;
}

export const FoundSolutionsView: React.FC<FoundSolutionsViewProps> = ({
  onViewSolution,
  selectedQuestion,
  onBackToHome
}) => {
  const [activeQuestion, setActiveQuestion] = useState<MathQuestionItem>(
    selectedQuestion || FEATURED_QUESTIONS[0]
  );
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  // Sync if selectedQuestion changes from parent navigation
  React.useEffect(() => {
    if (selectedQuestion) {
      setActiveQuestion(selectedQuestion);
    }
  }, [selectedQuestion]);

  const filteredList = FEATURED_QUESTIONS.filter((q) => {
    if (subjectFilter === 'all') return true;
    return q.subjectId === subjectFilter;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh]">
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            STEP-BY-STEP DERIVATIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Interactive Math Solutions
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Browse complete step-by-step mathematical solutions with formula breakdowns, examiner insights, and verification tips.
          </p>
        </div>

        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all self-start sm:self-auto shrink-0"
          >
            <span>← Back to Home</span>
          </button>
        )}
      </div>

      {/* Split View: Left List of Questions, Right Active Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left selector column */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Select a Problem
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {filteredList.length} problems
            </span>
          </div>

          {/* Quick Subject Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {['all', 'algebra', 'geometry', 'trigonometry', 'calculus', 'statistics'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSubjectFilter(sub)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize transition-colors shrink-0 ${
                  subjectFilter === sub
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub === 'all' ? 'All' : sub}
              </button>
            ))}
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
            {filteredList.map((q) => {
              const isSelected = activeQuestion.id === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestion(q)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex flex-col gap-1 border ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-200 text-blue-900 shadow-2xs'
                      : 'bg-white border-transparent hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected ? 'bg-blue-200/70 text-blue-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {q.badgeLabel}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {q.difficulty}
                    </span>
                  </div>
                  <div className="font-bold text-sm line-clamp-1">{q.title}</div>
                  <p className="text-xs text-slate-500 line-clamp-1">{q.problemText}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Solution Viewer */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  {activeQuestion.badgeLabel}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {activeQuestion.curriculum} • {activeQuestion.topic}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                {activeQuestion.title}
              </h2>
            </div>

            <button
              onClick={() => onViewSolution(activeQuestion)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto"
            >
              <span>Open in Fullscreen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Problem Statement Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Problem Statement
            </span>
            <p className="text-base font-semibold text-slate-900 mb-2">
              {activeQuestion.problemText}
            </p>
            {activeQuestion.mathFormula && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center font-mono font-bold text-blue-700 text-base sm:text-lg">
                {activeQuestion.mathFormula}
              </div>
            )}
          </div>

          {/* Strategy */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Strategy & Core Concepts
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {activeQuestion.solution.overview}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Step-by-Step Working
            </h3>

            {activeQuestion.solution.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed mb-2">
                  {step.explanation}
                </p>
                {step.mathFormula && (
                  <div className="ml-8 p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-xs sm:text-sm font-semibold text-slate-800">
                    {step.mathFormula}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final Answer */}
          <div className="bg-emerald-50/80 border-2 border-emerald-500 rounded-2xl p-5 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Final Answer
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-950 font-mono">
              {activeQuestion.solution.finalAnswer}
            </div>
          </div>

          {/* Examiner Tip */}
          {activeQuestion.solution.tips && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block mb-1">
                  Examiner Tip
                </span>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {activeQuestion.solution.tips}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
