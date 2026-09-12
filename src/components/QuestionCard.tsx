import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  CheckCircle, 
  XCircle, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { MathProblem } from '../types';
import { MathView } from './MathView';

interface QuestionCardProps {
  problem: MathProblem;
  isSaved: boolean;
  onToggleSave: (problemId: string) => void;
  onGenerateSimilar?: (problem: MathProblem) => void;
  index?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  problem,
  isSaved,
  onToggleSave,
  onGenerateSimilar,
  index,
}) => {
  const [showSolution, setShowSolution] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [checkStatus, setCheckStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [copied, setCopied] = useState(false);

  // Normalize and check answer
  const handleCheckAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userAnswer.trim()) return;

    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[()]/g, '')
        .replace(/^x=/, '')
        .replace(/^y=/, '')
        .trim();

    const cleanInput = normalize(userAnswer);
    const cleanFinal = normalize(problem.finalAnswer);

    const isMatch =
      cleanInput === cleanFinal ||
      problem.acceptableAnswers.some((ans) => normalize(ans) === cleanInput);

    if (isMatch) {
      setCheckStatus('correct');
    } else {
      setCheckStatus('incorrect');
    }
  };

  const handleResetCheck = () => {
    setUserAnswer('');
    setCheckStatus('idle');
  };

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(problem.latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Difficulty badge styling
  const difficultyBadge = {
    easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    hard: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    challenge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  }[problem.difficulty];

  // Friendly topic names
  const topicNames: Record<string, string> = {
    'linear-equations': 'Linear Equations',
    'quadratic-equations': 'Quadratic Equations',
    'systems-of-equations': 'Systems of Equations',
    'polynomials-factoring': 'Factoring & Polynomials',
    'inequalities': 'Inequalities',
    'exponents-radicals': 'Exponents & Radicals',
    'word-problems': 'Algebraic Word Problem',
  };

  return (
    <article
      id={`problem-${problem.id}`}
      className="worksheet-card rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 p-5 sm:p-6 transition-all duration-200 shadow-lg shadow-black/20 relative"
    >
      {/* Card Header: Badges and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {index !== undefined && (
            <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 font-mono">
              {index + 1}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {topicNames[problem.topic] || problem.topic}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${difficultyBadge}`}>
            {problem.difficulty}
          </span>
          {problem.isGenerated && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <Sparkles className="w-3 h-3" />
              Generated
            </span>
          )}
        </div>

        {/* Right action icons */}
        <div className="flex items-center gap-1 no-print">
          <button
            onClick={handleCopyLatex}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Copy LaTeX formula"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onToggleSave(problem.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isSaved
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save question for later'}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Problem Title & Text */}
      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
        {problem.title}
      </h3>
      
      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
        {problem.questionText}
      </p>

      {/* Primary Mathematical Display */}
      <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center text-center shadow-inner overflow-x-auto">
        <MathView math={problem.latex} block className="text-lg sm:text-xl font-medium text-slate-100" />
      </div>

      {/* Interactive Answer Checking Box (No Print) */}
      <div className="no-print mt-4 p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
        <form onSubmit={handleCheckAnswer} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                if (checkStatus !== 'idle') setCheckStatus('idle');
              }}
              placeholder={`Enter answer (e.g., ${problem.finalAnswer})`}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={!userAnswer.trim()}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-all shadow-sm active:scale-95"
            >
              Check Answer
            </button>

            {checkStatus !== 'idle' && (
              <button
                type="button"
                onClick={handleResetCheck}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
                title="Clear check"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Answer verification alert */}
        {checkStatus === 'correct' && (
          <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>Correct! Excellent work. Expand the step-by-step solution to compare your method.</span>
          </div>
        )}

        {checkStatus === 'incorrect' && (
          <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-sm font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
            <XCircle className="w-4 h-4 flex-shrink-0" />
            <span>Not quite. Check your negative signs or examine the hints below!</span>
          </div>
        )}
      </div>

      {/* Hints Section (No Print) */}
      {problem.hints && problem.hints.length > 0 && (
        <div className="no-print mt-3">
          {revealedHints === 0 ? (
            <button
              onClick={() => setRevealedHints(1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400/90 hover:text-amber-300 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Need a Hint? ({problem.hints.length} available)</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Hints ({revealedHints}/{problem.hints.length})
                </span>
                {revealedHints < problem.hints.length && (
                  <button
                    onClick={() => setRevealedHints((prev) => prev + 1)}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Reveal Next Hint
                  </button>
                )}
              </div>
              {problem.hints.slice(0, revealedHints).map((hint, i) => (
                <p key={i} className="text-xs text-amber-200/90 pl-2 border-l-2 border-amber-500/40">
                  <strong>Hint {i + 1}:</strong> {hint}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step-by-Step Solution Section */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        <button
          onClick={() => setShowSolution((prev) => !prev)}
          className="w-full flex items-center justify-between py-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors no-print"
        >
          <span className="flex items-center gap-1.5">
            <span>{showSolution ? 'Hide Step-by-Step Solution' : 'Show Step-by-Step Solution'}</span>
          </span>
          {showSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* The solution steps */}
        <div className={`space-y-3 mt-2 ${showSolution ? 'block' : 'hidden print:block'}`}>
          <div className="p-4 rounded-xl bg-slate-950/90 border border-indigo-950/80 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Full Mathematical Solution
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Answer: {problem.finalAnswer}
              </span>
            </div>

            {problem.steps.map((step) => (
              <div key={step.stepNumber} className="relative pl-6 pb-1">
                {/* Step number indicator */}
                <div className="absolute left-0 top-0.5 w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px] font-bold border border-indigo-500/40">
                  {step.stepNumber}
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-200 mb-1">
                  {step.title}
                </div>

                {step.latex && (
                  <div className="my-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 overflow-x-auto text-center">
                    <MathView math={step.latex} block className="text-sm sm:text-base text-slate-100" />
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Tags & Regenerate Similar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-2 border-t border-slate-800/60 no-print">
        <div className="flex flex-wrap gap-1.5">
          {problem.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded bg-slate-800/50 text-slate-400 text-[11px]">
              #{tag}
            </span>
          ))}
        </div>

        {onGenerateSimilar && (
          <button
            onClick={() => onGenerateSimilar(problem)}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>Generate Similar</span>
          </button>
        )}
      </div>
    </article>
  );
};
