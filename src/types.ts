/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TopicId = 'all' | 'algebra' | 'geometry' | 'trigonometry' | 'calculus' | 'statistics';

export type IgcseFilterId = 'all' | 'igcse-core-extended' | 'igcse-add-math';

export interface Problem {
  id: string;
  topic: 'algebra' | 'geometry' | 'trigonometry' | 'calculus' | 'statistics';
  questionHtml: React.ReactNode;
  solutionSteps: string[];
  finalAnswer: string;
}

export interface IgcseProblem {
  id: string;
  syllabus: 'IGCSE Mathematics (0580/0980)' | 'IGCSE Additional Mathematics (0606/4037)';
  category: 'igcse-core-extended' | 'igcse-add-math';
  topicTag: string;
  paperRef: string;
  titleText: string;
  questionNode: React.ReactNode;
  steps: string[];
  finalAnswer: string;
  examinerTip?: string;
}
