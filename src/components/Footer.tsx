/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageSquare, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 relative z-10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Cli<span className="text-brand-primary">Chat</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            Building intelligent customer support, lead generation, and sales booking employees for African businesses.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
          <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="mailto:info@clichat.ai" className="text-xs text-slate-400 hover:text-white transition-colors">
            Contact Support
          </a>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1.5">
          <span className="text-xs text-slate-500">
            &copy; {currentYear} CliChat. All rights reserved.
          </span>
          <span className="text-[10px] text-slate-600 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> in Accra, Ghana.
          </span>
        </div>

      </div>
    </footer>
  );
}
