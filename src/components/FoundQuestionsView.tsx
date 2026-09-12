/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ArrowRight, BookOpen } from 'lucide-react';
import { FEATURED_QUESTIONS, FOUND_SUBJECTS } from '../data/foundMathData';
import { MathQuestionItem, FoundSubjectId } from '../types';

interface FoundQuestionsViewProps {
  onViewSolution: (question: MathQuestionItem) => void;
  initialSubjectId?: FoundSubjectId | 'all';
  onBackToHome?: () => void;
}

export const FoundQuestionsView: React.FC<FoundQuestionsViewProps> = ({
  onViewSolution,
  initialSubjectId = 'all',
  onBackToHome
}) => {
  const [selectedSubject, setSelectedSubject] = useState<FoundSubjectId | 'all'>(initialSubjectId);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [query, setQuery] = useState('');

  const filteredQuestions = FEATURED_QUESTIONS.filter((q) => {
    const matchSubject = selectedSubject === 'all' || q.subjectId === selectedSubject;
    const matchDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchQuery =
      !query.trim() ||
      q.title.toLowerCase().includes(query.toLowerCase()) ||
      q.problemText.toLowerCase().includes(query.toLowerCase()) ||
      q.topic.toLowerCase().includes(query.toLowerCase());
    return matchSubject && matchDifficulty && matchQuery;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh]">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            PRACTICE REPOSITORY
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Math Questions & Problems
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Search and practice hundreds of curriculum-aligned math questions with verified step-by-step solutions.
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

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs mb-8 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions by topic, formula, or keyword..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Subjects
          </button>
          {FOUND_SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedSubject === s.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-400 mr-2">Difficulty:</span>
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">No questions found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or subject filters.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
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
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {q.title}
                    </h3>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal">
                    {q.problemText}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onViewSolution(q)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors shrink-0 self-start sm:self-center"
              >
                <span>View Solution</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
