export type MathTopic =
  | 'all'
  | 'linear-equations'
  | 'quadratic-equations'
  | 'systems-of-equations'
  | 'polynomials-factoring'
  | 'inequalities'
  | 'exponents-radicals'
  | 'word-problems';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'challenge';

export interface SolutionStep {
  stepNumber: number;
  title: string;
  latex?: string;
  explanation: string;
}

export interface MathProblem {
  id: string;
  title: string;
  topic: MathTopic;
  difficulty: Difficulty;
  latex: string;
  questionText: string;
  context?: string;
  hints: string[];
  finalAnswer: string;
  acceptableAnswers: string[];
  steps: SolutionStep[];
  tags: string[];
  isGenerated?: boolean;
  timestamp?: number;
}

export interface FilterOptions {
  searchQuery: string;
  topic: MathTopic;
  difficulty: Difficulty | 'all';
  onlySaved: boolean;
}

export interface PracticeStats {
  totalAttempted: number;
  correctCount: number;
  streak: number;
  bestStreak: number;
}
