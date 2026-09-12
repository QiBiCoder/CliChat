/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FoundNavTab = 'home' | 'questions' | 'solutions' | 'subjects' | 'about';

export type FoundSubjectId =
  | 'algebra'
  | 'geometry'
  | 'trigonometry'
  | 'calculus'
  | 'statistics'
  | 'number'
  | 'additional_math'
  | 'past_papers';

export interface FoundSubjectCard {
  id: FoundSubjectId;
  name: string;
  symbol: string; // e.g., 'x²', '△', '∼', '∫', '📊', 'π', 'Σ', '📄'
  symbolType: 'math' | 'icon';
  description: string;
  accentBg: string; // e.g., 'bg-purple-100 text-purple-600'
  badgeBorder: string;
  pillColor: string;
  totalQuestions: number;
  totalSolutions: number;
  subtopics: string[];
}

export interface SolutionStep {
  stepNumber: number;
  title: string;
  explanation: string;
  mathFormula?: string;
}

export interface MathQuestionItem {
  id: string;
  subjectId: FoundSubjectId;
  subjectName: string;
  badgeLabel: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  title: string;
  problemText: string;
  mathFormula?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  curriculum: string; // 'IGCSE', 'GCSE', 'A-Level', 'IB'
  solution: {
    overview: string;
    keyFormulas?: string[];
    steps: SolutionStep[];
    finalAnswer: string;
    tips?: string;
  };
}
