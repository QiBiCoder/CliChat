/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check, Copy, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import { MathQuestionItem } from '../types';

interface FoundSolutionModalProps {
  question: MathQuestionItem | null;
  onClose: () => void;
  onNextQuestion?: (currentId: string) => void;
  onOpenDedicatedPage?: (question: MathQuestionItem) => void;
}

export const FoundSolutionModal: React.FC<FoundSolutionModalProps> = ({
  question,
  onClose,
  onNextQuestion,
  onOpenDedicatedPage
}) => {
  const [copied, setCopied] = useState(false);
  const [markedUnderstood, setMarkedUnderstood] = useState(false);

  if (!question) return null;

  const handleCopy = () => {
    const text = `${question.title}\n${question.problemText}\n\nSolution:\n${question.solution.steps
      .map(s => `Step ${s.stepNumber}: ${s.title}\n${s.explanation}\n${s.mathFormula || ''}`)
      .join('\n\n')}\n\nFinal Answer: ${question.solution.finalAnswer}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col my-8 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        id="found-solution-modal-container"
      >
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold border ${
                question.subjectId === 'algebra'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : question.subjectId === 'geometry'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : question.subjectId === 'trigonometry'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : question.subjectId === 'calculus'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {question.badgeLabel}
            </span>

            <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
              {question.curriculum}
            </span>

            <span className="text-xs font-medium text-slate-400">
              {question.topic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1"
              title="Copy solution text"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              id="close-solution-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Question Box */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              Question
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {question.title}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {question.problemText}
            </p>
            {question.mathFormula && (
              <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200/80 font-mono text-center text-base sm:text-lg font-bold text-blue-900">
                {question.mathFormula}
              </div>
            )}
          </div>

          {/* Key Formulas if any */}
          {question.solution.keyFormulas && question.solution.keyFormulas.length > 0 && (
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-extrabold text-blue-800 uppercase tracking-wider block mb-1">
                  Key Formula Used
                </span>
                <div className="space-y-1">
                  {question.solution.keyFormulas.map((f, i) => (
                    <div key={i} className="text-xs sm:text-sm font-mono font-bold text-blue-900">
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Overview */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Strategy & Approach
            </span>
            <p className="text-sm text-slate-600 leading-relaxed">
              {question.solution.overview}
            </p>
          </div>

          {/* Step-by-Step Working */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Step-by-Step Solution
            </span>

            {question.solution.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-blue-200 transition-colors"
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
                  <div className="ml-8 p-2.5 bg-slate-50 rounded-lg border border-slate-100 font-mono text-xs sm:text-sm font-semibold text-slate-800">
                    {step.mathFormula}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final Answer Highlight Box */}
          <div className="bg-emerald-50/80 border-2 border-emerald-500/80 rounded-2xl p-5 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 block mb-1">
              Final Answer
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-950 font-mono">
              {question.solution.finalAnswer}
            </div>
          </div>

          {/* Examiner / Tutor Tip */}
          {question.solution.tips && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block mb-1">
                  Examiner Tip & Verification
                </span>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {question.solution.tips}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMarkedUnderstood(!markedUnderstood)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                markedUnderstood
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{markedUnderstood ? 'Marked as Understood ✓' : 'Mark as Understood'}</span>
            </button>

            {onOpenDedicatedPage && (
              <button
                onClick={() => onOpenDedicatedPage(question)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
              >
                Open on Solutions Page →
              </button>
            )}
          </div>

          {onNextQuestion && (
            <button
              onClick={() => onNextQuestion(question.id)}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
