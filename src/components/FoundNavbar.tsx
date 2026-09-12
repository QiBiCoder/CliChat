/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { FoundNavTab } from '../types';

interface FoundNavbarProps {
  activeTab: FoundNavTab;
  onSelectTab: (tab: FoundNavTab) => void;
  onOpenSearch: () => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export const FoundNavbar: React.FC<FoundNavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: FoundNavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'questions', label: 'Questions' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 focus:outline-none group text-left"
          id="found-math-logo-btn"
        >
          {/* Logo icon with stylized F */}
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 32 32"
              className="w-6 h-6 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bold F stem */}
              <rect x="7" y="6" width="5.5" height="20" rx="1.5" />
              {/* Top arm */}
              <path d="M12.5 6H24c.8 0 1.5.7 1.5 1.5V11c0 .8-.7 1.5-1.5 1.5H12.5V6z" />
              {/* Middle arm */}
              <path d="M12.5 14.5H20c.8 0 1.5.7 1.5 1.5v3.5c0 .8-.7 1.5-1.5 1.5H12.5v-6.5z" opacity="0.9" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Found <span className="text-blue-600">Math</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" id="found-math-nav-links">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side actions: Search, Sign In, Get Started */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Search (Cmd+K)"
            id="nav-search-trigger-btn"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => onOpenAuth('signin')}
            className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            id="nav-signin-btn"
          >
            Sign In
          </button>

          <button
            onClick={() => onOpenAuth('signup')}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
            id="nav-get-started-btn"
          >
            Get Started
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAuth('signin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
