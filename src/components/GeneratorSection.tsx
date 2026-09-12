import React, { useState } from 'react';
import { 
  Sparkles, 
  Settings2, 
  RotateCcw, 
  Plus, 
  FileDown, 
  CheckCircle2, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { MathTopic, Difficulty, MathProblem } from '../types';
import { generateBatchProblems, generateMathProblem } from '../utils/algebraGenerator';
import { QuestionCard } from './QuestionCard';

interface GeneratorSectionProps {
  onAddGeneratedToBank: (problems: MathProblem[]) => void;
  onStartPracticeWith: (problems: MathProblem[]) => void;
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  onOpenWorksheetWith: (problems: MathProblem[]) => void;
}

export const GeneratorSection: React.FC<GeneratorSectionProps> = ({
  onAddGeneratedToBank,
  onStartPracticeWith,
  savedIds,
  onToggleSave,
  onOpenWorksheetWith,
}) => {
  const [topic, setTopic] = useState<MathTopic>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [count, setCount] = useState<number>(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedList, setGeneratedList] = useState<MathProblem[]>(() =>
    generateBatchProblems('linear-equations', 'medium', 2)
  );
  const [addedNotice, setAddedNotice] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setAddedNotice(false);
    setTimeout(() => {
      const newBatch = generateBatchProblems(topic, difficulty, count);
      setGeneratedList(newBatch);
      setIsGenerating(false);
    }, 250);
  };

  const handleAddToBank = () => {
    onAddGeneratedToBank(generatedList);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const topicsList: { id: MathTopic; label: string }[] = [
    { id: 'all', label: 'All Algebra Topics' },
    { id: 'linear-equations', label: 'Linear Equations' },
    { id: 'quadratic-equations', label: 'Quadratic Equations' },
    { id: 'systems-of-equations', label: 'Systems of Equations' },
    { id: 'polynomials-factoring', label: 'Factoring & Polynomials' },
    { id: 'inequalities', label: 'Inequalities' },
  ];

  const difficultiesList: { id: Difficulty; label: string; desc: string }[] = [
    { id: 'easy', label: 'Easy', desc: 'Single-step & basic concepts' },
    { id: 'medium', label: 'Medium', desc: 'Multi-step & standard tests' },
    { id: 'hard', label: 'Hard', desc: 'Complex algebraic steps' },
    { id: 'challenge', label: 'Challenge', desc: 'Olympiad & competition' },
  ];

  return (
    <div className="space-y-8">
      {/* Configuration Box */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Algorithmic Algebra Problem Generator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Generate infinite mathematically verified questions with exact step-by-step derivations.
            </p>
          </div>
        </div>

        {/* Form Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Topic selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Algebra Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value as MathTopic)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {topicsList.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              Generates custom numbers and clean integer or fractional roots.
            </p>
          </div>

          {/* Difficulty selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Difficulty Tier
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {difficultiesList.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDifficulty(d.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                    difficulty === d.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold capitalize">{d.label}</div>
                  <div className="text-[10px] opacity-75 truncate">{d.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Number of Questions
            </label>
            <div className="flex items-center gap-2">
              {[1, 3, 5, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCount(num)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    count === num
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {num} {num === 1 ? 'Problem' : 'Problems'}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Generate 5 or 10 questions to build an instant printable worksheet.
            </p>
          </div>

        </div>

        {/* Generator Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            Selected: <span className="text-indigo-400 font-semibold capitalize">{topic.replace('-', ' ')}</span> • <span className="text-emerald-400 font-semibold capitalize">{difficulty}</span> ({count} {count === 1 ? 'item' : 'items'})
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-lg shadow-indigo-600/25 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className={`w-4 h-4 text-amber-300 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Computing Steps...' : 'Generate Questions'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Results Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-white tracking-tight">
            Generated Questions ({generatedList.length})
          </h3>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Freshly Generated
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpenWorksheetWith(generatedList)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export to Worksheet</span>
          </button>

          <button
            onClick={() => onStartPracticeWith(generatedList)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/30 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Practice These</span>
          </button>

          <button
            onClick={handleAddToBank}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{addedNotice ? 'Added to Bank!' : 'Save All to Library'}</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="grid grid-cols-1 gap-6">
        {generatedList.map((problem, idx) => (
          <QuestionCard
            key={problem.id}
            index={idx}
            problem={problem}
            isSaved={savedIds.has(problem.id)}
            onToggleSave={onToggleSave}
            onGenerateSimilar={() => {
              const fresh = generateMathProblem(problem.topic, problem.difficulty);
              setGeneratedList((prev) => [fresh, ...prev.filter((p) => p.id !== problem.id)]);
            }}
          />
        ))}
      </div>
    </div>
  );
};
