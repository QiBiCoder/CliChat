/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FoundSubjectCard, MathQuestionItem } from '../types';

export const FOUND_SUBJECTS: FoundSubjectCard[] = [
  {
    id: 'algebra',
    name: 'Algebra',
    symbol: 'x²',
    symbolType: 'math',
    description: 'Equations, inequalities, functions and more.',
    accentBg: 'bg-purple-100 text-purple-600 border-purple-200',
    badgeBorder: 'border-purple-200',
    pillColor: 'bg-purple-50 text-purple-700 border-purple-200',
    totalQuestions: 340,
    totalSolutions: 340,
    subtopics: ['Linear Equations', 'Quadratic Equations', 'Simultaneous Equations', 'Inequalities', 'Functions', 'Sequences']
  },
  {
    id: 'geometry',
    name: 'Geometry',
    symbol: '△',
    symbolType: 'math',
    description: 'Shapes, angles, area, volume and more.',
    accentBg: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    badgeBorder: 'border-emerald-200',
    pillColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    totalQuestions: 280,
    totalSolutions: 280,
    subtopics: ['Triangles & Polygons', 'Circle Theorems', 'Perimeter, Area & Volume', 'Transformations', 'Coordinate Geometry']
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    symbol: '∼',
    symbolType: 'math',
    description: 'Ratios, identities, graphs and more.',
    accentBg: 'bg-blue-100 text-blue-600 border-blue-200',
    badgeBorder: 'border-blue-200',
    pillColor: 'bg-blue-50 text-blue-700 border-blue-200',
    totalQuestions: 215,
    totalSolutions: 215,
    subtopics: ['SOH CAH TOA', 'Sine & Cosine Rules', 'Trig Identities', 'Exact Values', 'Trigonometric Graphs']
  },
  {
    id: 'calculus',
    name: 'Calculus',
    symbol: '∫',
    symbolType: 'math',
    description: 'Differentiation, integration, applications and more.',
    accentBg: 'bg-rose-100 text-rose-600 border-rose-200',
    badgeBorder: 'border-rose-200',
    pillColor: 'bg-rose-50 text-rose-700 border-rose-200',
    totalQuestions: 190,
    totalSolutions: 190,
    subtopics: ['Power Rule Differentiation', 'Tangents & Normals', 'Stationary Points', 'Definite & Indefinite Integration', 'Kinematics']
  },
  {
    id: 'statistics',
    name: 'Statistics',
    symbol: '📊',
    symbolType: 'icon',
    description: 'Data, probability, analysis and more.',
    accentBg: 'bg-amber-100 text-amber-600 border-amber-200',
    badgeBorder: 'border-amber-200',
    pillColor: 'bg-amber-50 text-amber-700 border-amber-200',
    totalQuestions: 245,
    totalSolutions: 245,
    subtopics: ['Mean, Median, Mode & Range', 'Histograms & Frequency Polygons', 'Venn Diagrams & Conditional Probability', 'Cumulative Frequency']
  },
  {
    id: 'number',
    name: 'Number',
    symbol: 'π',
    symbolType: 'math',
    description: 'Fractions, decimals, indices and more.',
    accentBg: 'bg-purple-100 text-purple-600 border-purple-200',
    badgeBorder: 'border-purple-200',
    pillColor: 'bg-purple-50 text-purple-700 border-purple-200',
    totalQuestions: 310,
    totalSolutions: 310,
    subtopics: ['Fractions & Percentages', 'Surds & Rationalising', 'Indices & Standard Form', 'Bounds & Estimation', 'Ratio & Proportion']
  },
  {
    id: 'additional_math',
    name: 'Additional Mathematics',
    symbol: 'Σ',
    symbolType: 'math',
    description: 'For advanced learners. Complex topics and more.',
    accentBg: 'bg-teal-100 text-teal-600 border-teal-200',
    badgeBorder: 'border-teal-200',
    pillColor: 'bg-teal-50 text-teal-700 border-teal-200',
    totalQuestions: 175,
    totalSolutions: 175,
    subtopics: ['Binomial Theorem', 'Logarithmic & Exponential Functions', 'Vectors in 2D & 3D', 'Permutations & Combinations']
  },
  {
    id: 'past_papers',
    name: 'Past Papers',
    symbol: '📄',
    symbolType: 'icon',
    description: 'Exam-style questions with solutions.',
    accentBg: 'bg-slate-100 text-slate-600 border-slate-200',
    badgeBorder: 'border-slate-200',
    pillColor: 'bg-slate-50 text-slate-700 border-slate-200',
    totalQuestions: 520,
    totalSolutions: 520,
    subtopics: ['Edexcel IGCSE Papers', 'Cambridge CIE 0580', 'AQA Higher Tier', 'OCR Additional Maths 6993']
  }
];

export const FEATURED_QUESTIONS: MathQuestionItem[] = [
  {
    id: 'alg-solve-x',
    subjectId: 'algebra',
    subjectName: 'Algebra',
    badgeLabel: 'Algebra',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    badgeBorder: 'border-purple-200',
    title: 'Solve for x',
    problemText: 'Solve the equation 2(x + 3) = 5x - 4.',
    mathFormula: '2(x + 3) = 5x - 4',
    difficulty: 'Easy',
    topic: 'Linear Equations',
    curriculum: 'IGCSE / GCSE',
    solution: {
      overview: 'Expand the bracket on the left-hand side, then collect all x terms on one side and constant terms on the other side.',
      keyFormulas: ['a(b + c) = ab + ac'],
      steps: [
        {
          stepNumber: 1,
          title: 'Expand the bracket on the left side',
          explanation: 'Multiply each term inside the parentheses by 2:',
          mathFormula: '2x + 6 = 5x - 4'
        },
        {
          stepNumber: 2,
          title: 'Collect all x-terms on one side',
          explanation: 'Subtract 2x from both sides of the equation to keep the x coefficient positive:',
          mathFormula: '6 = 5x - 2x - 4 \\implies 6 = 3x - 4'
        },
        {
          stepNumber: 3,
          title: 'Isolate the 3x term',
          explanation: 'Add 4 to both sides of the equation:',
          mathFormula: '6 + 4 = 3x \\implies 10 = 3x'
        },
        {
          stepNumber: 4,
          title: 'Divide by the coefficient of x',
          explanation: 'Divide both sides by 3:',
          mathFormula: 'x = \\frac{10}{3} = 3\\frac{1}{3}'
        }
      ],
      finalAnswer: 'x = \\frac{10}{3} \\quad \\text{(or } 3.33 \\text{ to 3 s.f.)}',
      tips: 'Always substitute your solution back into the original equation to verify: 2(10/3 + 3) = 2(19/3) = 38/3, and 5(10/3) - 4 = 50/3 - 12/3 = 38/3. Both sides match!'
    }
  },
  {
    id: 'geom-area-triangle',
    subjectId: 'geometry',
    subjectName: 'Geometry',
    badgeLabel: 'Geometry',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200',
    title: 'Area of a Triangle',
    problemText: 'Find the area of the triangle with base 10 cm and height 6 cm.',
    mathFormula: '\\text{Base } b = 10\\text{ cm}, \\quad \\text{Height } h = 6\\text{ cm}',
    difficulty: 'Easy',
    topic: 'Perimeter, Area & Volume',
    curriculum: 'IGCSE / GCSE',
    solution: {
      overview: 'Use the standard geometric area formula for any 2D triangle where base and perpendicular height are given.',
      keyFormulas: ['\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height}'],
      steps: [
        {
          stepNumber: 1,
          title: 'Identify given dimensions',
          explanation: 'Base b = 10 cm, perpendicular height h = 6 cm.',
          mathFormula: 'b = 10\\text{ cm}, \\quad h = 6\\text{ cm}'
        },
        {
          stepNumber: 2,
          title: 'Substitute values into the formula',
          explanation: 'Compute the product of 0.5, base, and height:',
          mathFormula: '\\text{Area} = \\frac{1}{2} \\times 10\\text{ cm} \\times 6\\text{ cm}'
        },
        {
          stepNumber: 3,
          title: 'Calculate the final numeric value',
          explanation: 'Multiply half of 10 (which is 5) by 6:',
          mathFormula: '\\text{Area} = 5 \\times 6 = 30\\text{ cm}^2'
        }
      ],
      finalAnswer: '\\text{Area} = 30\\text{ cm}^2',
      tips: 'Ensure units are squared (cm²) when writing areas in exams to secure the final units mark.'
    }
  },
  {
    id: 'trig-find-cos',
    subjectId: 'trigonometry',
    subjectName: 'Trigonometry',
    badgeLabel: 'Trigonometry',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    badgeBorder: 'border-blue-200',
    title: 'Find the value',
    problemText: 'Given that sin θ = 3/5, find the value of cos θ.',
    mathFormula: '\\sin \\theta = \\frac{3}{5}, \\quad \\text{find } \\cos \\theta',
    difficulty: 'Medium',
    topic: 'Trig Identities & Ratios',
    curriculum: 'IGCSE / A-Level',
    solution: {
      overview: 'We can solve this either using the fundamental Pythagorean trigonometric identity sin²θ + cos²θ = 1 or by constructing a 3-4-5 right-angled triangle.',
      keyFormulas: ['\\sin^2\\theta + \\cos^2\\theta = 1', '\\cos\\theta = \\pm\\sqrt{1 - \\sin^2\\theta}'],
      steps: [
        {
          stepNumber: 1,
          title: 'State the Pythagorean Identity',
          explanation: 'For any angle θ, the sum of the squares of sine and cosine equals 1:',
          mathFormula: '\\sin^2\\theta + \\cos^2\\theta = 1'
        },
        {
          stepNumber: 2,
          title: 'Substitute the known value of sin θ',
          explanation: 'Square 3/5 to obtain 9/25:',
          mathFormula: '\\left(\\frac{3}{5}\\right)^2 + \\cos^2\\theta = 1 \\implies \\frac{9}{25} + \\cos^2\\theta = 1'
        },
        {
          stepNumber: 3,
          title: 'Rearrange to solve for cos² θ',
          explanation: 'Subtract 9/25 from 1 (or 25/25):',
          mathFormula: '\\cos^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}'
        },
        {
          stepNumber: 4,
          title: 'Take the square root',
          explanation: 'For acute θ (quadrant I):',
          mathFormula: '\\cos\\theta = \\sqrt{\\frac{16}{25}} = \\frac{4}{5}'
        }
      ],
      finalAnswer: '\\cos \\theta = \\frac{4}{5} \\quad \\text{(or } 0.8\\text{)}',
      tips: 'Alternative Triangle Method: In a right triangle with opposite = 3 and hypotenuse = 5, Pythagoras gives adjacent = √(5² - 3²) = √(25 - 9) = 4. Hence cos θ = adjacent / hypotenuse = 4/5.'
    }
  },
  {
    id: 'calc-diff-poly',
    subjectId: 'calculus',
    subjectName: 'Calculus',
    badgeLabel: 'Calculus',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    badgeBorder: 'border-rose-200',
    title: 'Differentiate',
    problemText: 'Differentiate y = x³ - 4x² + 7x - 2 with respect to x.',
    mathFormula: 'y = x^3 - 4x^2 + 7x - 2',
    difficulty: 'Medium',
    topic: 'Differentiation',
    curriculum: 'A-Level / IGCSE Add Maths',
    solution: {
      overview: 'Apply the power rule of differentiation d/dx(xⁿ) = n·xⁿ⁻¹ term by term to the polynomial function.',
      keyFormulas: ['\\frac{d}{dx}\\left(a x^n\\right) = a \\cdot n x^{n-1}', '\\frac{d}{dx}(c) = 0'],
      steps: [
        {
          stepNumber: 1,
          title: 'Differentiate the first term x³',
          explanation: 'Bring power 3 to the front and decrease power by 1:',
          mathFormula: '\\frac{d}{dx}\\left(x^3\\right) = 3x^{3-1} = 3x^2'
        },
        {
          stepNumber: 2,
          title: 'Differentiate the second term -4x²',
          explanation: 'Multiply coefficient -4 by 2 and decrease power by 1:',
          mathFormula: '\\frac{d}{dx}\\left(-4x^2\\right) = -4 \\times 2x^{2-1} = -8x'
        },
        {
          stepNumber: 3,
          title: 'Differentiate the linear term +7x',
          explanation: 'The derivative of a linear term kx is just the constant k:',
          mathFormula: '\\frac{d}{dx}(7x) = 7'
        },
        {
          stepNumber: 4,
          title: 'Differentiate the constant term -2',
          explanation: 'The derivative of any standalone constant is 0:',
          mathFormula: '\\frac{d}{dx}(-2) = 0'
        },
        {
          stepNumber: 5,
          title: 'Combine all differentiated terms',
          explanation: 'Write out the full derivative expression:',
          mathFormula: '\\frac{dy}{dx} = 3x^2 - 8x + 7'
        }
      ],
      finalAnswer: '\\frac{dy}{dx} = 3x^2 - 8x + 7',
      tips: 'Remember: the constant term completely vanishes upon differentiation because the rate of change of a constant is zero.'
    }
  },
  {
    id: 'stat-mean-calc',
    subjectId: 'statistics',
    subjectName: 'Statistics',
    badgeLabel: 'Statistics',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-200',
    title: 'Find the mean',
    problemText: 'The data set is 4, 7, 9, 12, 18. Find the mean.',
    mathFormula: 'X = \\{4, 7, 9, 12, 18\\}',
    difficulty: 'Easy',
    topic: 'Averages & Spread',
    curriculum: 'IGCSE / GCSE',
    solution: {
      overview: 'The arithmetic mean is computed by summing all values in the data set and dividing by the total count of numbers (n = 5).',
      keyFormulas: ['\\bar{x} = \\frac{\\sum x}{n}'],
      steps: [
        {
          stepNumber: 1,
          title: 'Sum all values in the data set',
          explanation: 'Add the 5 numbers together:',
          mathFormula: '\\sum x = 4 + 7 + 9 + 12 + 18 = 50'
        },
        {
          stepNumber: 2,
          title: 'Identify count of items (n)',
          explanation: 'There are 5 numbers in the list:',
          mathFormula: 'n = 5'
        },
        {
          stepNumber: 3,
          title: 'Divide total sum by n',
          explanation: 'Divide 50 by 5:',
          mathFormula: '\\bar{x} = \\frac{50}{5} = 10'
        }
      ],
      finalAnswer: '\\text{Mean } \\bar{x} = 10',
      tips: 'Quick check: The mean (10) lies between the minimum (4) and maximum (18) values, closely centered around the median (9).'
    }
  },
  // Additional comprehensive questions
  {
    id: 'num-surds-rationalise',
    subjectId: 'number',
    subjectName: 'Number',
    badgeLabel: 'Number',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    badgeBorder: 'border-purple-200',
    title: 'Rationalise the Denominator',
    problemText: 'Simplify and rationalise the denominator of 6 / (√5 - 1).',
    mathFormula: '\\frac{6}{\\sqrt{5} - 1}',
    difficulty: 'Medium',
    topic: 'Surds & Radicals',
    curriculum: 'IGCSE / GCSE Higher',
    solution: {
      overview: 'Multiply the numerator and denominator by the conjugate of the denominator (√5 + 1) using difference of two squares.',
      keyFormulas: ['(a - b)(a + b) = a^2 - b^2'],
      steps: [
        {
          stepNumber: 1,
          title: 'Identify conjugate of denominator',
          explanation: 'The conjugate of (√5 - 1) is (√5 + 1).',
          mathFormula: '\\text{Conjugate} = \\sqrt{5} + 1'
        },
        {
          stepNumber: 2,
          title: 'Multiply numerator and denominator',
          explanation: 'Multiply top and bottom by (√5 + 1):',
          mathFormula: '\\frac{6(\\sqrt{5} + 1)}{(\\sqrt{5} - 1)(\\sqrt{5} + 1)}'
        },
        {
          stepNumber: 3,
          title: 'Expand denominator using difference of squares',
          explanation: '(√5)² - 1² = 5 - 1 = 4:',
          mathFormula: '\\frac{6(\\sqrt{5} + 1)}{5 - 1} = \\frac{6(\\sqrt{5} + 1)}{4}'
        },
        {
          stepNumber: 4,
          title: 'Simplify the fraction',
          explanation: 'Divide numerator and denominator by 2:',
          mathFormula: '\\frac{3(\\sqrt{5} + 1)}{2} = \\frac{3\\sqrt{5} + 3}{2}'
        }
      ],
      finalAnswer: '\\frac{3(\\sqrt{5} + 1)}{2}',
      tips: 'Never leave a surd or radical in the denominator for final exam marks.'
    }
  },
  {
    id: 'addmath-binomial',
    subjectId: 'additional_math',
    subjectName: 'Additional Mathematics',
    badgeLabel: 'Additional Math',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700',
    badgeBorder: 'border-teal-200',
    title: 'Binomial Expansion',
    problemText: 'Find the first 3 terms in ascending powers of x for (2 - 3x)⁵.',
    mathFormula: '(2 - 3x)^5',
    difficulty: 'Hard',
    topic: 'Binomial Theorem',
    curriculum: 'Additional Mathematics / A-Level',
    solution: {
      overview: 'Use the Binomial Theorem formula for (a + b)ⁿ with a = 2, b = -3x, and n = 5.',
      keyFormulas: ['(a + b)^n = \\binom{n}{0}a^n + \\binom{n}{1}a^{n-1}b + \\binom{n}{2}a^{n-2}b^2 + \\dots'],
      steps: [
        {
          stepNumber: 1,
          title: 'Term 1: r = 0',
          explanation: 'Calculate the constant term:',
          mathFormula: '\\binom{5}{0}(2)^5(-3x)^0 = 1 \\times 32 \\times 1 = 32'
        },
        {
          stepNumber: 2,
          title: 'Term 2: r = 1',
          explanation: 'Calculate the linear term in x:',
          mathFormula: '\\binom{5}{1}(2)^4(-3x)^1 = 5 \\times 16 \\times (-3x) = -240x'
        },
        {
          stepNumber: 3,
          title: 'Term 3: r = 2',
          explanation: 'Calculate the quadratic term in x²:',
          mathFormula: '\\binom{5}{2}(2)^3(-3x)^2 = 10 \\times 8 \\times 9x^2 = +720x^2'
        }
      ],
      finalAnswer: '32 - 240x + 720x^2 + \\dots',
      tips: 'Pay close attention to negative signs: (-3x)² produces a positive coefficient (+9x²), whereas (-3x)¹ produces a negative coefficient.'
    }
  },
  {
    id: 'past-quad-roots',
    subjectId: 'past_papers',
    subjectName: 'Past Papers',
    badgeLabel: 'Past Papers',
    badgeBg: 'bg-slate-50',
    badgeText: 'text-slate-700',
    badgeBorder: 'border-slate-200',
    title: 'Quadratic Formula & Roots',
    problemText: 'Solve 3x² + 5x - 7 = 0 giving your answers to 2 decimal places.',
    mathFormula: '3x^2 + 5x - 7 = 0',
    difficulty: 'Hard',
    topic: 'Edexcel IGCSE Paper 2H',
    curriculum: 'Edexcel IGCSE',
    solution: {
      overview: 'Since this quadratic cannot be easily factored, we utilize the quadratic formula x = (-b ± √(b² - 4ac)) / (2a) with a = 3, b = 5, c = -7.',
      keyFormulas: ['x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'],
      steps: [
        {
          stepNumber: 1,
          title: 'Identify coefficients a, b, c',
          explanation: 'Compare with ax² + bx + c = 0:',
          mathFormula: 'a = 3, \\quad b = 5, \\quad c = -7'
        },
        {
          stepNumber: 2,
          title: 'Calculate the discriminant (b² - 4ac)',
          explanation: '5² - 4(3)(-7) = 25 + 84 = 109:',
          mathFormula: 'b^2 - 4ac = 5^2 - 4(3)(-7) = 25 + 84 = 109'
        },
        {
          stepNumber: 3,
          title: 'Apply the quadratic formula',
          explanation: 'Substitute into the formula:',
          mathFormula: 'x = \\frac{-5 \\pm \\sqrt{109}}{2(3)} = \\frac{-5 \\pm \\sqrt{109}}{6}'
        },
        {
          stepNumber: 4,
          title: 'Compute decimal approximations',
          explanation: '√109 ≈ 10.4403:',
          mathFormula: 'x_1 = \\frac{-5 + 10.4403}{6} \\approx 0.91, \\quad x_2 = \\frac{-5 - 10.4403}{6} \\approx -2.57'
        }
      ],
      finalAnswer: 'x = 0.91 \\quad \\text{or} \\quad x = -2.57 \\quad (2\\text{ d.p.})',
      tips: 'Examiners award M1 for correct substitution into the quadratic formula, M1 for calculating √109, and A1 A1 for each correct root rounded to 2 decimal places.'
    }
  }
];
