import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Lightbulb, 
  Sparkles, 
  Trophy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MathProblem, MathTopic, Difficulty, PracticeStats } from '../types';
import { generateMathProblem } from '../utils/algebraGenerator';
import { MathView } from './MathView';

interface PracticeModeProps {
  initialProblems?: MathProblem[];
  onExitPractice?: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({ initialProblems }) => {
  const [currentProblem, setCurrentProblem] = useState<MathProblem>(() => {
    if (initialProblems && initialProblems.length > 0) return initialProblems[0];
    return generateMathProblem('all', 'medium');
  });

  const [practiceQueue, setPracticeQueue] = useState<MathProblem[]>(initialProblems || []);
  const [queueIndex, setQueueIndex] = useState<number>(0);

  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number>(0);

  const [stats, setStats] = useState<PracticeStats>(() => {
    const saved = localStorage.getItem('foundmath_practice_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      totalAttempted: 0,
      correctCount: 0,
      streak: 0,
      bestStreak: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('foundmath_practice_stats', JSON.stringify(stats));
  }, [stats]);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || status !== 'idle') return;

    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[()]/g, '')
        .replace(/^x=/, '')
        .replace(/^y=/, '')
        .trim();

    const cleanInput = normalize(userAnswer);
    const cleanFinal = normalize(currentProblem.finalAnswer);

    const isMatch =
      cleanInput === cleanFinal ||
      currentProblem.acceptableAnswers.some((ans) => normalize(ans) === cleanInput);

    if (isMatch) {
      setStatus('correct');
      setStats((prev) => {
        const nextStreak = prev.streak + 1;
        return {
          totalAttempted: prev.totalAttempted + 1,
          correctCount: prev.correctCount + 1,
          streak: nextStreak,
          bestStreak: Math.max(prev.bestStreak, nextStreak),
        };
      });
    } else {
      setStatus('incorrect');
      setStats((prev) => ({
        ...prev,
        totalAttempted: prev.totalAttempted + 1,
        streak: 0,
      }));
    }
  };

  const handleNextProblem = () => {
    setUserAnswer('');
    setStatus('idle');
    setShowSolution(false);
    setRevealedHints(0);

    if (practiceQueue.length > 0 && queueIndex + 1 < practiceQueue.length) {
      const nextIdx = queueIndex + 1;
      setQueueIndex(nextIdx);
      setCurrentProblem(practiceQueue[nextIdx]);
    } else {
      // Procedurally generate next problem!
      const fresh = generateMathProblem('all', currentProblem.difficulty || 'medium');
      setCurrentProblem(fresh);
    }
  };

  const accuracy =
    stats.totalAttempted > 0
      ? Math.round((stats.correctCount / stats.totalAttempted) * 100)
      : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Session Header / Stats Dashboard */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Interactive Practice Session
            </h2>
            <p className="text-xs text-slate-400">
              Solve problems with instant grading and verified step solutions
            </p>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <Flame className={`w-4 h-4 ${stats.streak > 0 ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-500'}`} />
            <div className="text-xs">
              <span className="font-bold text-white">{stats.streak}</span>{' '}
              <span className="text-slate-400">streak</span>
            </div>
          </div>

          {/* Accuracy */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <Trophy className="w-4 h-4 text-indigo-400" />
            <div className="text-xs">
              <span className="font-bold text-white">{stats.correctCount}</span>
              <span className="text-slate-500">/{stats.totalAttempted}</span>{' '}
              <span className="text-slate-400">({accuracy}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Focus Problem Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 capitalize">
              {currentProblem.topic.replace('-', ' ')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
              {currentProblem.difficulty}
            </span>
          </div>

          <button
            onClick={handleNextProblem}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Skip to next →
          </button>
        </div>

        {/* Problem Title & Statement */}
        <div>
          <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">
            {currentProblem.title}
          </h3>
          <p className="text-slate-300 text-sm sm:text-base">
            {currentProblem.questionText}
          </p>
        </div>

        {/* Mathematical Equation Display */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-center shadow-inner overflow-x-auto">
          <MathView math={currentProblem.latex} block className="text-xl sm:text-2xl font-bold text-slate-100" />
        </div>

        {/* Input & Check form */}
        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Your Solution
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={status === 'correct'}
                placeholder={`Type your answer (e.g., ${currentProblem.finalAnswer})`}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 font-mono text-base focus:outline-none focus:border-indigo-500 transition-colors"
                autoFocus
              />

              {status === 'idle' ? (
                <button
                  type="submit"
                  disabled={!userAnswer.trim()}
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextProblem}
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <span>Next Problem</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Feedback message */}
          {status === 'correct' && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-sm">
                  Correct! Streak +1. Ready for the next challenge?
                </span>
              </div>
              <button
                type="button"
                onClick={handleNextProblem}
                className="text-xs font-bold underline hover:text-emerald-200"
              >
                Continue →
              </button>
            </div>
          )}

          {status === 'incorrect' && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="font-semibold text-sm">
                  Incorrect. Don't worry, check the hints or review the step-by-step solution below.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="text-xs font-bold underline hover:text-rose-200"
              >
                Try Again
              </button>
            </div>
          )}
        </form>

        {/* Hints helper */}
        {currentProblem.hints && currentProblem.hints.length > 0 && (
          <div className="pt-2">
            {revealedHints === 0 ? (
              <button
                onClick={() => setRevealedHints(1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Show a Hint ({currentProblem.hints.length} available)</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    Hint {revealedHints} of {currentProblem.hints.length}
                  </span>
                  {revealedHints < currentProblem.hints.length && (
                    <button
                      onClick={() => setRevealedHints((prev) => prev + 1)}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Next Hint →
                    </button>
                  )}
                </div>
                {currentProblem.hints.slice(0, revealedHints).map((h, i) => (
                  <p key={i} className="text-xs text-amber-200/90 pl-2 border-l-2 border-amber-500/40">
                    {h}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reveal Solution Option */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={() => setShowSolution((prev) => !prev)}
            className="w-full flex items-center justify-between py-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>{showSolution ? 'Hide Full Derivation' : 'I am stuck — Show Step-by-Step Solution'}</span>
            {showSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showSolution && (
            <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-indigo-950 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Step-by-Step Verification
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Answer: {currentProblem.finalAnswer}
                </span>
              </div>

              {currentProblem.steps.map((step) => (
                <div key={step.stepNumber} className="relative pl-6 pb-2">
                  <div className="absolute left-0 top-0.5 w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px] font-bold border border-indigo-500/40">
                    {step.stepNumber}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200 mb-1">
                    {step.title}
                  </div>
                  {step.latex && (
                    <div className="my-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <MathView math={step.latex} block className="text-sm text-slate-100" />
                    </div>
                  )}
                  <p className="text-xs text-slate-400">{step.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
