/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface FoundAuthModalProps {
  isOpen: boolean;
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const FoundAuthModal: React.FC<FoundAuthModalProps> = ({
  isOpen,
  mode: initialMode,
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(email);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon */}
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-5 shadow-xs">
          <span className="font-black text-xl">F</span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-1">
          {mode === 'signin' ? 'Welcome Back' : 'Create Free Account'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          {mode === 'signin'
            ? 'Sign in to access your saved questions and solution history.'
            : 'Join thousands of students mastering math with Found Math.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>{mode === 'signin' ? 'Sign In' : 'Get Started Free'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch mode */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {mode === 'signin' ? (
            <>
              Don't have an account yet?{' '}
              <button
                onClick={() => setMode('signup')}
                className="font-bold text-blue-600 hover:text-blue-700"
              >
                Sign up for free
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="font-bold text-blue-600 hover:text-blue-700"
              >
                Sign in
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
