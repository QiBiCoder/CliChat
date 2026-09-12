/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, BarChart2, FileText } from 'lucide-react';
import { FOUND_SUBJECTS } from '../data/foundMathData';
import { FoundSubjectCard, FoundSubjectId } from '../types';

interface FoundSubjectGridProps {
  onSelectSubject: (subjectId: FoundSubjectId) => void;
  onViewAllSubjects: () => void;
}

export const FoundSubjectGrid: React.FC<FoundSubjectGridProps> = ({
  onSelectSubject,
  onViewAllSubjects,
}) => {
  const renderSubjectSymbol = (subj: FoundSubjectCard) => {
    if (subj.id === 'statistics') {
      return <BarChart2 className="w-6 h-6 text-amber-500" />;
    }
    if (subj.id === 'past_papers') {
      return <FileText className="w-6 h-6 text-slate-500" />;
    }
    if (subj.id === 'geometry') {
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-emerald-600 fill-none" strokeWidth="2.5">
          <polygon points="12,3 21,20 3,20" />
        </svg>
      );
    }
    if (subj.id === 'trigonometry') {
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue-600 fill-none" strokeWidth="2.5" strokeLinecap="round">
          <path d="M3 12c3-6 6-6 9 0s6 6 9 0" />
        </svg>
      );
    }
    if (subj.id === 'calculus') {
      return (
        <span className="font-serif italic font-bold text-2xl text-rose-600 leading-none">
          ∫
        </span>
      );
    }
    if (subj.id === 'number') {
      return (
        <span className="font-serif font-bold text-xl text-purple-600 leading-none">
          π
        </span>
      );
    }
    if (subj.id === 'additional_math') {
      return (
        <span className="font-serif font-bold text-xl text-teal-600 leading-none">
          Σ
        </span>
      );
    }
    // Default / Algebra
    return (
      <span className="font-serif italic font-bold text-lg text-purple-600 leading-none">
        x²
      </span>
    );
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="explore-subjects-section">
      
      {/* Header with Title and "View All Subjects →" */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
            EXPLORE BY SUBJECT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Find Questions by Subject
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Browse our collection of questions and <span className="font-semibold text-slate-900">solutions</span> across a wide range of math topics. Click on a subject to get started.
          </p>
        </div>

        <button
          onClick={onViewAllSubjects}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all self-start md:self-auto shrink-0"
          id="view-all-subjects-top-btn"
        >
          <span>View All Subjects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 8 Subjects Grid: 2 rows of 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {FOUND_SUBJECTS.map((subj) => (
          <div
            key={subj.id}
            onClick={() => onSelectSubject(subj.id)}
            className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between gap-3.5"
            id={`subject-card-${subj.id}`}
          >
            {/* Left: Circular Icon & Center: Title + Description */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 ${
                  subj.id === 'algebra'
                    ? 'bg-purple-100'
                    : subj.id === 'geometry'
                    ? 'bg-emerald-100'
                    : subj.id === 'trigonometry'
                    ? 'bg-blue-100'
                    : subj.id === 'calculus'
                    ? 'bg-rose-100'
                    : subj.id === 'statistics'
                    ? 'bg-amber-100'
                    : subj.id === 'number'
                    ? 'bg-purple-100'
                    : subj.id === 'additional_math'
                    ? 'bg-teal-100'
                    : 'bg-slate-100'
                }`}
              >
                {renderSubjectSymbol(subj)}
              </div>

              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {subj.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5 line-clamp-2">
                  {subj.description}
                </p>
              </div>
            </div>

            {/* Right: Small arrow */}
            <div className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
