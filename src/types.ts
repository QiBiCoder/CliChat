/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TopicId = 'all' | 'algebra' | 'geometry' | 'trigonometry' | 'calculus' | 'statistics';

export interface Problem {
  id: string;
  topic: 'algebra' | 'geometry' | 'trigonometry' | 'calculus' | 'statistics';
  questionHtml: React.ReactNode;
  solutionSteps: string[];
  finalAnswer: string;
}
