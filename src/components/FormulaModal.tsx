import React, { useState } from 'react';
import { Sigma, Search, Copy, Check, X, BookMarked } from 'lucide-react';
import { ALGEBRA_FORMULAS } from '../data/formulaReference';
import { MathView } from './MathView';

interface FormulaModalProps {
  onClose?: () => void;
}

export const FormulaModal: React.FC<FormulaModalProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Quadratics', 'Factoring', 'Linear & Lines', 'Exponents', 'Exponents & Radicals'];

  const filtered = ALGEBRA_FORMULAS.filter((f) => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch =
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase()) ||
      f.latex.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Sigma className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Essential Algebra Formulas & Reference
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Quick access to core algebraic identities, exponent laws, and quadratic rules.
            </p>
          </div>
        </div>

        {/* Search and Category Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search formulas (e.g. quadratic, difference of squares, slope)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-5 shadow-lg flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {item.category}
                </span>

                <button
                  onClick={() => handleCopy(item.latex, item.id)}
                  className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors"
                  title="Copy LaTeX"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>

              {/* Equation Box */}
              <div className="my-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-center shadow-inner overflow-x-auto">
                <MathView math={item.latex} block className="text-lg text-slate-100" />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
            </div>

            {item.exampleLatex && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                <span className="font-semibold text-slate-300 mr-1">Example:</span>
                <MathView math={item.exampleLatex} className="text-xs text-indigo-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
