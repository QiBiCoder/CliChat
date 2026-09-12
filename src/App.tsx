/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FoundNavTab, FoundSubjectId, MathQuestionItem } from './types';
import { FEATURED_QUESTIONS } from './data/foundMathData';
import { FoundNavbar } from './components/FoundNavbar';
import { FoundHero } from './components/FoundHero';
import { FoundSubjectGrid } from './components/FoundSubjectGrid';
import { FoundLatestSection } from './components/FoundLatestSection';
import { FoundQuestionsView } from './components/FoundQuestionsView';
import { FoundSolutionsView } from './components/FoundSolutionsView';
import { FoundSubjectsView } from './components/FoundSubjectsView';
import { FoundAboutView } from './components/FoundAboutView';
import { FoundFooter } from './components/FoundFooter';
import { FoundSolutionModal } from './components/FoundSolutionModal';
import { FoundSearchModal } from './components/FoundSearchModal';
import { FoundAuthModal } from './components/FoundAuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<FoundNavTab>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<FoundSubjectId | 'all'>('all');
  
  // Modals state
  const [selectedQuestionForSolution, setSelectedQuestionForSolution] = useState<MathQuestionItem | null>(null);
  const [activeSolutionModal, setActiveSolutionModal] = useState<MathQuestionItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({
    isOpen: false,
    mode: 'signup'
  });

  // Global keyboard shortcuts (Cmd+K for search, Escape to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setActiveSolutionModal(null);
        setAuthModalState(prev => ({ ...prev, isOpen: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSelectTab = (tab: FoundNavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubjectFromGrid = (subjectId: FoundSubjectId) => {
    setSelectedSubjectFilter(subjectId);
    setActiveTab('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewSolution = (question: MathQuestionItem) => {
    setSelectedQuestionForSolution(question);
    setActiveSolutionModal(question);
  };

  const handleOpenDedicatedSolution = (question: MathQuestionItem) => {
    setSelectedQuestionForSolution(question);
    setActiveSolutionModal(null);
    setActiveTab('solutions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextSolution = (currentId: string) => {
    const currentIndex = FEATURED_QUESTIONS.findIndex(q => q.id === currentId);
    const nextIndex = (currentIndex + 1) % FEATURED_QUESTIONS.length;
    const nextQuestion = FEATURED_QUESTIONS[nextIndex];
    setSelectedQuestionForSolution(nextQuestion);
    setActiveSolutionModal(nextQuestion);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* Top Navbar */}
      <FoundNavbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Tab 1: Home (Exact Match to User Attached Design) */}
        {activeTab === 'home' && (
          <>
            {/* 1. Dark Navy Hero with math sketches, Found Math title, search bar & 4 badges */}
            <FoundHero
              onSearch={handleHeroSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* 2. "Find Questions by Subject" - 8 Subject Cards with Math symbols */}
            <FoundSubjectGrid
              onSelectSubject={handleSelectSubjectFromGrid}
              onViewAllSubjects={() => handleSelectTab('subjects')}
            />

            {/* 3. "Latest Questions & Solutions" + "Better Practice. Higher Scores." Card */}
            <FoundLatestSection
              onViewSolution={handleViewSolution}
              onViewAllQuestions={() => handleSelectTab('questions')}
              onStartExploring={() => handleSelectTab('questions')}
            />
          </>
        )}

        {/* Tab 2: Questions Repository */}
        {activeTab === 'questions' && (
          <FoundQuestionsView
            onViewSolution={handleViewSolution}
            initialSubjectId={selectedSubjectFilter}
            onBackToHome={() => handleSelectTab('home')}
          />
        )}

        {/* Tab 3: Interactive Solutions */}
        {activeTab === 'solutions' && (
          <FoundSolutionsView
            onViewSolution={handleViewSolution}
            selectedQuestion={selectedQuestionForSolution}
            onBackToHome={() => handleSelectTab('home')}
          />
        )}

        {/* Tab 4: Curriculum Subjects */}
        {activeTab === 'subjects' && (
          <FoundSubjectsView
            onSelectSubject={handleSelectSubjectFromGrid}
          />
        )}

        {/* Tab 5: About Found Math */}
        {activeTab === 'about' && (
          <FoundAboutView
            onStartExploring={() => handleSelectTab('questions')}
          />
        )}

      </main>

      {/* Bottom Footer matching screenshot */}
      <FoundFooter onSelectTab={handleSelectTab} />

      {/* Interactive Solution Modal */}
      {activeSolutionModal && (
        <FoundSolutionModal
          question={activeSolutionModal}
          onClose={() => setActiveSolutionModal(null)}
          onNextQuestion={handleNextSolution}
          onOpenDedicatedPage={handleOpenDedicatedSolution}
        />
      )}

      {/* Global Search Modal (Cmd + K) */}
      <FoundSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectQuestion={handleViewSolution}
        onSelectSubject={handleSelectSubjectFromGrid}
      />

      {/* Sign In & Get Started Auth Modal */}
      <FoundAuthModal
        isOpen={authModalState.isOpen}
        mode={authModalState.mode}
        onClose={() => setAuthModalState(prev => ({ ...prev, isOpen: false }))}
        onSuccess={(email) => {
          console.log('Logged in with', email);
        }}
      />

    </div>
  );
}
