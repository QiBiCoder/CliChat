import React, { useState } from 'react';
import { X, Printer, Check, Copy, FileText, Sparkles } from 'lucide-react';
import { MathProblem } from '../types';
import { MathView } from './MathView';

interface WorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  problems: MathProblem[];
}

export const WorksheetModal: React.FC<WorksheetModalProps> = ({
  isOpen,
  onClose,
  problems,
}) => {
  const [worksheetTitle, setWorksheetTitle] = useState('Found Math — Algebra Practice Worksheet');
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [spacing, setSpacing] = useState<'normal' | 'spacious'>('spacious');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Controls Bar (Hidden during printing) */}
        <div className="no-print p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Worksheet & Print Generator</h2>
            <span className="text-xs bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">
              {problems.length} Questions
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Worksheet Configuration Options (Hidden in print) */}
        <div className="no-print px-5 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <span className="text-slate-400 font-semibold">Title:</span>
            <input
              type="text"
              value={worksheetTitle}
              onChange={(e) => setWorksheetTitle(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs w-full max-w-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeSolutions}
              onChange={(e) => setIncludeSolutions(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Include Solutions Sheet</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={spacing === 'spacious'}
              onChange={(e) => setSpacing(e.target.checked ? 'spacious' : 'normal')}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Leave Work Area</span>
          </label>
        </div>

        {/* Printable Paper Preview */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 print:p-0 print:m-0">
          
          {/* Worksheet Header */}
          <div className="border-b-2 border-slate-900 pb-4 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 font-display">
                  {worksheetTitle}
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Generated via Found Math (foundmath.org) • Algebra Question Bank
                </p>
              </div>
              <div className="text-right text-xs font-mono text-slate-600 space-y-1">
                <div>Score: ________ / {problems.length}</div>
              </div>
            </div>

            {/* Student Info Lines */}
            <div className="grid grid-cols-3 gap-4 text-xs font-medium text-slate-700 pt-2">
              <div>Name: _______________________________</div>
              <div>Date: ___________________</div>
              <div>Class / Period: __________</div>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            <div className="text-xs italic text-slate-600 mb-2">
              Directions: Solve each algebraic problem. Show all work and circle your final answer.
            </div>

            {problems.map((problem, i) => (
              <div
                key={problem.id}
                className={`break-inside-avoid border-b border-slate-200 pb-4 ${
                  spacing === 'spacious' ? 'min-h-[140px]' : 'min-h-[80px]'
                }`}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-bold text-slate-900 font-mono text-sm">{i + 1}.</span>
                  <span className="font-medium text-slate-800 text-sm">{problem.questionText}</span>
                </div>

                <div className="my-3 pl-6">
                  <MathView math={problem.latex} block className="text-base text-slate-900" />
                </div>

                {/* Blank work area for student handwriting */}
                {spacing === 'spacious' && (
                  <div className="h-16 border-dashed border border-slate-200 rounded p-2 text-[10px] text-slate-400">
                    Workspace / Calculations:
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Solutions Page (Optional) */}
          {includeSolutions && (
            <div className="mt-12 pt-8 border-t-4 border-slate-900 break-before-page">
              <div className="flex items-center justify-between mb-4 border-b-2 border-slate-300 pb-2">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Answer Key & Complete Step-by-Step Solutions
                </h2>
                <span className="text-xs font-bold text-slate-500 uppercase">Page 2</span>
              </div>

              <div className="space-y-6">
                {problems.map((problem, i) => (
                  <div key={`sol-${problem.id}`} className="border-b border-slate-200 pb-4 break-inside-avoid">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-slate-900 font-mono">
                        Question {i + 1}
                      </span>
                      <span className="text-xs font-mono font-bold bg-slate-100 text-slate-900 px-2 py-0.5 rounded border border-slate-300">
                        Final Answer: {problem.finalAnswer}
                      </span>
                    </div>

                    <div className="my-1 pl-4 text-xs font-semibold text-slate-700">
                      Problem: <MathView math={problem.latex} className="text-xs text-slate-900" />
                    </div>

                    <div className="mt-2 pl-4 space-y-1.5 text-xs text-slate-600">
                      {problem.steps.map((step) => (
                        <div key={step.stepNumber} className="pl-2 border-l-2 border-slate-300">
                          <span className="font-bold text-slate-800">
                            Step {step.stepNumber}: {step.title}
                          </span>
                          {step.latex && (
                            <div className="my-0.5">
                              <MathView math={step.latex} className="text-xs text-slate-900" />
                            </div>
                          )}
                          <p className="text-[11px] text-slate-500">{step.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
