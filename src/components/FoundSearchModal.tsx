/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { FEATURED_QUESTIONS, FOUND_SUBJECTS } from '../data/foundMathData';
import { MathQuestionItem, FoundSubjectId } from '../types';

interface FoundSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: MathQuestionItem) => void;
  onSelectSubject: (subjectId: FoundSubjectId) => void;
}

export const FoundSearchModal: React.FC<FoundSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
  onSelectSubject
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const matchingQuestions = FEATURED_QUESTIONS.filter(
    (q) =>
      !query.trim() ||
      q.title.toLowerCase().includes(query.toLowerCase()) ||
      q.problemText.toLowerCase().includes(query.toLowerCase()) ||
      q.topic.toLowerCase().includes(query.toLowerCase()) ||
      q.subjectName.toLowerCase().includes(query.toLowerCase())
  );

  const matchingSubjects = FOUND_SUBJECTS.filter(
    (s) =>
      !query.trim() ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-28 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, topics, formulas..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
            ESC
          </span>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
          
          {/* Quick Subjects */}
          {matchingSubjects.length > 0 && (
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                Subjects
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {matchingSubjects.slice(0, 4).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectSubject(s.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-left flex items-center gap-2"
                  >
                    <span className="text-lg">{s.symbol}</span>
                    <span className="text-xs font-bold text-slate-800 truncate">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Questions */}
          <div className="pt-3">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2 px-2">
              Questions & Solutions ({matchingQuestions.length})
            </span>

            {matchingQuestions.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No matching questions found.
              </div>
            ) : (
              <div className="space-y-1.5">
                {matchingQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      onSelectQuestion(q);
                      onClose();
                    }}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-left flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded shrink-0 mt-0.5">
                        {q.badgeLabel}
                      </span>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {q.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {q.problemText}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
