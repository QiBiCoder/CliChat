import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Bookmark, 
  BookOpen, 
  Plus, 
  CheckCircle2, 
  Sigma,
  FileDown,
  RotateCcw,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { MathProblem, MathTopic, Difficulty } from './types';
import { QUESTION_BANK } from './data/questionBank';
import { generateMathProblem } from './utils/algebraGenerator';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { QuestionCard } from './components/QuestionCard';
import { GeneratorSection } from './components/GeneratorSection';
import { PracticeMode } from './components/PracticeMode';
import { FormulaModal } from './components/FormulaModal';
import { WorksheetModal } from './components/WorksheetModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'bank' | 'generator' | 'practice' | 'formulas'>('bank');
  
  // Stored questions list (bank + generated)
  const [problems, setProblems] = useState<MathProblem[]>(() => {
    const savedCustom = localStorage.getItem('foundmath_custom_problems');
    if (savedCustom) {
      try {
        const parsed = JSON.parse(savedCustom);
        return [...parsed, ...QUESTION_BANK];
      } catch {
        // ignore
      }
    }
    return QUESTION_BANK;
  });

  // Saved / Bookmarked IDs
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('foundmath_saved_ids');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
    return new Set();
  });

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<MathTopic>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [onlySaved, setOnlySaved] = useState(false);

  // Practice session custom queue
  const [practiceQueue, setPracticeQueue] = useState<MathProblem[]>([]);

  // Worksheet modal
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);
  const [worksheetProblems, setWorksheetProblems] = useState<MathProblem[]>([]);

  // Sync saved IDs to localStorage
  const handleToggleSave = (problemId: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(problemId)) {
        next.delete(problemId);
      } else {
        next.add(problemId);
      }
      localStorage.setItem('foundmath_saved_ids', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Add generated problems to library
  const handleAddGeneratedToBank = (newProblems: MathProblem[]) => {
    setProblems((prev) => {
      const combined = [...newProblems, ...prev];
      const onlyGenerated = combined.filter((p) => p.isGenerated);
      localStorage.setItem('foundmath_custom_problems', JSON.stringify(onlyGenerated));
      return combined;
    });
  };

  // Quick generate a problem and open/highlight
  const handleQuickGenerate = () => {
    const fresh = generateMathProblem('all', 'medium');
    setProblems((prev) => [fresh, ...prev]);
    setActiveTab('bank');
    setSearchQuery('');
    setSelectedTopic('all');
    setSelectedDifficulty('all');
    setOnlySaved(false);
  };

  // Start practice with specified problems
  const handleStartPracticeWith = (selected: MathProblem[]) => {
    setPracticeQueue(selected);
    setActiveTab('practice');
  };

  // Open worksheet with specific list
  const handleOpenWorksheetWith = (selected: MathProblem[]) => {
    setWorksheetProblems(selected);
    setIsWorksheetOpen(true);
  };

  // Topic filter options
  const topicFilters: { id: MathTopic; label: string }[] = [
    { id: 'all', label: 'All Algebra' },
    { id: 'linear-equations', label: 'Linear Equations' },
    { id: 'quadratic-equations', label: 'Quadratics' },
    { id: 'systems-of-equations', label: 'Systems' },
    { id: 'polynomials-factoring', label: 'Factoring' },
    { id: 'inequalities', label: 'Inequalities' },
    { id: 'exponents-radicals', label: 'Exponents & Radicals' },
    { id: 'word-problems', label: 'Word Problems' },
  ];

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      if (onlySaved && !savedIds.has(problem.id)) {
        return false;
      }
      if (selectedTopic !== 'all' && problem.topic !== selectedTopic) {
        return false;
      }
      if (selectedDifficulty !== 'all' && problem.difficulty !== selectedDifficulty) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = problem.title.toLowerCase().includes(q);
        const matchesText = problem.questionText.toLowerCase().includes(q);
        const matchesLatex = problem.latex.toLowerCase().includes(q);
        const matchesTags = problem.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesText && !matchesLatex && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [problems, onlySaved, savedIds, selectedTopic, selectedDifficulty, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Sticky Top Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.size}
        onOpenWorksheet={() => handleOpenWorksheetWith(filteredProblems.slice(0, 8))}
        onQuickGenerate={handleQuickGenerate}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* TAB 1: QUESTION BANK */}
        {activeTab === 'bank' && (
          <div className="space-y-6">
            
            {/* Hero Banner */}
            <HeroBanner
              onGenerateClick={() => setActiveTab('generator')}
              onExploreTopic={(topic) => setSelectedTopic(topic)}
              totalQuestions={problems.length}
            />

            {/* Filter and Search Bar */}
            <section id="questions" className="space-y-4 no-print">
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-lg space-y-4">
                
                {/* Search Bar & Quick Toggles */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search questions by keyword, equation, or topic (e.g., quadratic, fractions, mixture)..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-3 text-xs text-slate-500 hover:text-slate-300"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Difficulty Select */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | 'all')}
                      className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors capitalize font-medium"
                    >
                      <option value="all">All Difficulties</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="challenge">Challenge</option>
                    </select>

                    {/* Bookmarked Filter */}
                    <button
                      onClick={() => setOnlySaved((prev) => !prev)}
                      className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                        onlySaved
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                          : 'bg-slate-950 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                      <span>Saved ({savedIds.size})</span>
                    </button>
                  </div>
                </div>

                {/* Topic Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {topicFilters.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopic(t.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedTopic === t.id
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Status Header & Bulk Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                <div className="text-xs sm:text-sm text-slate-400 font-medium">
                  Showing <span className="font-bold text-white">{filteredProblems.length}</span> algebra questions
                  {selectedTopic !== 'all' && (
                    <span> in <strong className="text-indigo-400 capitalize">{selectedTopic.replace('-', ' ')}</strong></span>
                  )}
                  {selectedDifficulty !== 'all' && (
                    <span> (<strong className="text-emerald-400 capitalize">{selectedDifficulty}</strong>)</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartPracticeWith(filteredProblems.slice(0, 10))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Practice Filtered ({Math.min(filteredProblems.length, 10)})</span>
                  </button>

                  <button
                    onClick={() => handleOpenWorksheetWith(filteredProblems.slice(0, 10))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
                  >
                    <FileDown className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Print Worksheet</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Questions Grid */}
            {filteredProblems.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredProblems.map((problem, index) => (
                  <QuestionCard
                    key={problem.id}
                    index={index}
                    problem={problem}
                    isSaved={savedIds.has(problem.id)}
                    onToggleSave={handleToggleSave}
                    onGenerateSimilar={() => {
                      const similar = generateMathProblem(problem.topic, problem.difficulty);
                      setProblems((prev) => [similar, ...prev]);
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 mx-auto flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">No math questions match your filters</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Try clearing your search query, adjusting your difficulty filters, or generate a fresh algebra problem right now.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTopic('all');
                      setSelectedDifficulty('all');
                      setOnlySaved(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={handleQuickGenerate}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Math Problem</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: PROBLEM GENERATOR */}
        {activeTab === 'generator' && (
          <GeneratorSection
            onAddGeneratedToBank={handleAddGeneratedToBank}
            onStartPracticeWith={handleStartPracticeWith}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onOpenWorksheetWith={handleOpenWorksheetWith}
          />
        )}

        {/* TAB 3: PRACTICE MODE */}
        {activeTab === 'practice' && (
          <PracticeMode
            initialProblems={practiceQueue.length > 0 ? practiceQueue : undefined}
            onExitPractice={() => setActiveTab('bank')}
          />
        )}

        {/* TAB 4: FORMULAS REFERENCE */}
        {activeTab === 'formulas' && (
          <FormulaModal />
        )}

      </main>

      {/* Printable Worksheet Modal */}
      <WorksheetModal
        isOpen={isWorksheetOpen}
        onClose={() => setIsWorksheetOpen(false)}
        problems={worksheetProblems.length > 0 ? worksheetProblems : filteredProblems.slice(0, 6)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-300 text-sm">Found Math</span>
            <span>—</span>
            <span>Algebra Questions, Solutions & Problem Generator</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => {
                setSelectedTopic('linear-equations');
                setActiveTab('bank');
              }}
              className="hover:text-indigo-400 transition-colors"
            >
              Linear Equations
            </button>
            <button
              onClick={() => {
                setSelectedTopic('quadratic-equations');
                setActiveTab('bank');
              }}
              className="hover:text-indigo-400 transition-colors"
            >
              Quadratics
            </button>
            <button
              onClick={() => {
                setSelectedTopic('systems-of-equations');
                setActiveTab('bank');
              }}
              className="hover:text-indigo-400 transition-colors"
            >
              Systems
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className="hover:text-indigo-400 transition-colors"
            >
              Formula Sheet
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
