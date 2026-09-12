/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Youtube, Instagram, Twitter, Mail } from 'lucide-react';
import { FoundNavTab } from '../types';

interface FoundFooterProps {
  onSelectTab: (tab: FoundNavTab) => void;
}

export const FoundFooter: React.FC<FoundFooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#0C192E] text-slate-400 pt-12 pb-10 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Logo/Tagline on Left, Navigation in Center, Socials on Right */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-800">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-xs">
                <svg
                  viewBox="0 0 32 32"
                  className="w-5 h-5 text-white fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="7" y="6" width="5.5" height="20" rx="1.5" />
                  <path d="M12.5 6H24c.8 0 1.5.7 1.5 1.5V11c0 .8-.7 1.5-1.5 1.5H12.5V6z" />
                  <path d="M12.5 14.5H20c.8 0 1.5.7 1.5 1.5v3.5c0 .8-.7 1.5-1.5 1.5H12.5v-6.5z" opacity="0.9" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Found <span className="text-blue-500">Math</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 pl-1">
              Math made simple.
            </p>
          </div>

          {/* Center Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-semibold text-slate-300">
            <button
              onClick={() => onSelectTab('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onSelectTab('questions')}
              className="hover:text-white transition-colors"
            >
              Questions
            </button>
            <button
              onClick={() => onSelectTab('solutions')}
              className="hover:text-white transition-colors"
            >
              Solutions
            </button>
            <button
              onClick={() => onSelectTab('subjects')}
              className="hover:text-white transition-colors"
            >
              Subjects
            </button>
            <button
              onClick={() => onSelectTab('about')}
              className="hover:text-white transition-colors"
            >
              About
            </button>
          </nav>

          {/* Right Social Icons: YouTube, Instagram, X, Email */}
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@foundmath.com"
              className="p-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Row: Copyright on left, Tagline on right */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2025 Found Math. All rights reserved.
          </div>
          <div className="font-medium text-slate-400">
            Learn • Practice • Succeed
          </div>
        </div>

      </div>
    </footer>
  );
};
