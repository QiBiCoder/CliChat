import React from 'react';
import { 
  Calculator, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Bookmark, 
  FileDown, 
  Sigma,
  Search
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'bank' | 'generator' | 'practice' | 'formulas';
  setActiveTab: (tab: 'bank' | 'generator' | 'practice' | 'formulas') => void;
  savedCount: number;
  onOpenWorksheet: () => void;
  onQuickGenerate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenWorksheet,
  onQuickGenerate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('bank')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-indigo-400 group-hover:text-indigo-300">
              <span className="font-display font-black text-xl tracking-tighter">√x</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                Found<span className="text-indigo-400">Math</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Algebra
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Questions & Step-by-Step Solutions</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('bank')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'bank'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Question Bank</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'generator'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Problem Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'practice'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Practice Mode</span>
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'formulas'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sigma className="w-4 h-4 text-cyan-400" />
            <span>Formulas</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenWorksheet}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
            title="Create and print printable worksheets"
          >
            <FileDown className="w-3.5 h-3.5 text-indigo-400" />
            <span>Worksheet</span>
          </button>

          <button
            onClick={onQuickGenerate}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate New</span>
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 px-2 py-1.5 bg-slate-950">
        <button
          onClick={() => setActiveTab('bank')}
          className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
            activeTab === 'bank' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Bank</span>
        </button>

        <button
          onClick={() => setActiveTab('generator')}
          className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
            activeTab === 'generator' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-amber-400" />
          <span>Generate</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
            activeTab === 'practice' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span>Practice</span>
        </button>

        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
            activeTab === 'formulas' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <Sigma className="w-4 h-4 mb-0.5 text-cyan-400" />
          <span>Formulas</span>
        </button>

        <button
          onClick={onOpenWorksheet}
          className="flex flex-col items-center py-1 px-3 text-xs font-medium text-slate-400"
        >
          <FileDown className="w-4 h-4 mb-0.5 text-indigo-400" />
          <span>Print</span>
        </button>
      </div>
    </header>
  );
};
