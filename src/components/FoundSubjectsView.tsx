/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { FOUND_SUBJECTS } from '../data/foundMathData';
import { FoundSubjectId } from '../types';

interface FoundSubjectsViewProps {
  onSelectSubject: (subjectId: FoundSubjectId) => void;
}

export const FoundSubjectsView: React.FC<FoundSubjectsViewProps> = ({ onSelectSubject }) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh]">
      
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
          CURRICULUM MODULES
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Math Subjects & Syllabi
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Explore our complete math curriculum organized into 8 essential subjects, fully aligned with IGCSE, GCSE, A-Level, and international specifications.
        </p>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FOUND_SUBJECTS.map((subj) => (
          <div
            key={subj.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header with symbol and stats */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  {subj.symbol}
                </span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {subj.totalQuestions} Questions
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 mb-1.5">
                {subj.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
                {subj.description}
              </p>

              {/* Subtopic tags */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Core Modules
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {subj.subtopics.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectSubject(subj.id)}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <span>Practice {subj.name} Questions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
