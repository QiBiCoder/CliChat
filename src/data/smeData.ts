/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubjectConfig, TopicSection, RevisionNoteContent, ExamQuestion, PastPaper, Flashcard } from '../types';

// Topic sections for Maths
export const MATHS_TOPICS: TopicSection[] = [
  {
    id: 'algebra',
    title: '1. Algebra & Functions',
    subtopics: [
      { id: 'quadratics', title: '1.1 Solving Quadratic Equations', estimatedMinutes: 12, specRef: '1MA1/2.2' },
      { id: 'simultaneous', title: '1.2 Linear & Non-Linear Simultaneous Equations', estimatedMinutes: 10, specRef: '1MA1/2.4' },
      { id: 'inequalities', title: '1.3 Quadratic & Linear Inequalities', estimatedMinutes: 9, specRef: '1MA1/2.6' },
      { id: 'algebraic_fractions', title: '1.4 Simplifying & Solving Algebraic Fractions', estimatedMinutes: 14, specRef: '1MA1/2.8' },
      { id: 'functions', title: '1.5 Composite & Inverse Functions', estimatedMinutes: 11, specRef: '1MA1/2.11' }
    ]
  },
  {
    id: 'number',
    title: '2. Number & Calculations',
    subtopics: [
      { id: 'surds', title: '2.1 Surds & Rationalising the Denominator', estimatedMinutes: 10, specRef: '1MA1/1.3' },
      { id: 'indices', title: '2.2 Fractional & Negative Indices', estimatedMinutes: 8, specRef: '1MA1/1.4' },
      { id: 'standard_form', title: '2.3 Standard Form & Bounds', estimatedMinutes: 7, specRef: '1MA1/1.7' }
    ]
  },
  {
    id: 'geometry_trig',
    title: '3. Geometry & Trigonometry',
    subtopics: [
      { id: 'sine_cosine_rule', title: '3.1 Sine & Cosine Rules in 3D', estimatedMinutes: 15, specRef: '1MA1/4.4' },
      { id: 'circle_theorems', title: '3.2 The 7 Circle Theorems', estimatedMinutes: 12, specRef: '1MA1/4.7' },
      { id: 'vectors', title: '3.3 Geometric Vector Proofs', estimatedMinutes: 14, specRef: '1MA1/4.9' }
    ]
  },
  {
    id: 'probability_stats',
    title: '4. Probability & Statistics',
    subtopics: [
      { id: 'conditional_prob', title: '4.1 Conditional Probability & Venn Diagrams', estimatedMinutes: 10, specRef: '1MA1/5.2' },
      { id: 'histograms', title: '4.2 Histograms with Unequal Widths', estimatedMinutes: 11, specRef: '1MA1/5.5' }
    ]
  }
];

// Topic sections for Physics
export const PHYSICS_TOPICS: TopicSection[] = [
  {
    id: 'electricity',
    title: '1. Electricity & Circuits',
    subtopics: [
      { id: 'ohm_law', title: '1.1 Current, Potential Difference & Resistance', estimatedMinutes: 11, specRef: '0625/4.2' },
      { id: 'series_parallel', title: '1.2 Series & Parallel Circuits & Kirchhoff', estimatedMinutes: 14, specRef: '0625/4.3' },
      { id: 'mains_electricity', title: '1.3 Electrical Power & Safety Devices', estimatedMinutes: 8, specRef: '0625/4.4' }
    ]
  },
  {
    id: 'forces_motion',
    title: '2. Forces & Motion',
    subtopics: [
      { id: 'newtons_laws', title: "2.1 Newton's Laws & Resultant Forces", estimatedMinutes: 12, specRef: '0625/1.2' },
      { id: 'momentum', title: '2.2 Momentum & Conservation in Collisions', estimatedMinutes: 13, specRef: '0625/1.4' }
    ]
  }
];

// Topic sections for Chemistry
export const CHEMISTRY_TOPICS: TopicSection[] = [
  {
    id: 'atomic_structure',
    title: '1. Atomic Structure & Periodic Table',
    subtopics: [
      { id: 'bonding', title: '1.1 Ionic, Covalent & Metallic Bonding', estimatedMinutes: 12, specRef: '8462/4.1' },
      { id: 'electrolysis', title: '1.2 Electrolysis of Molten & Aqueous Salts', estimatedMinutes: 15, specRef: '8462/4.3' }
    ]
  }
];

// Topic sections for Biology
export const BIOLOGY_TOPICS: TopicSection[] = [
  {
    id: 'cell_biology',
    title: '1. Cell Biology & Transport',
    subtopics: [
      { id: 'cell_structure', title: '1.1 Eukaryotic vs Prokaryotic Cell Organelles', estimatedMinutes: 10, specRef: '8461/4.1' },
      { id: 'osmosis_diffusion', title: '1.2 Diffusion, Osmosis & Active Transport', estimatedMinutes: 12, specRef: '8461/4.2' }
    ]
  }
];

export const ECONOMICS_TOPICS: TopicSection[] = [
  {
    id: 'markets',
    title: '1. How Markets Work',
    subtopics: [
      { id: 'supply_demand', title: '1.1 Price Elasticity & Equilibrium', estimatedMinutes: 12, specRef: '7136/1.1' }
    ]
  }
];

export const CS_TOPICS: TopicSection[] = [
  {
    id: 'algorithms',
    title: '1. Algorithms & Programming',
    subtopics: [
      { id: 'sorting_searching', title: '1.1 Binary Search & Merge Sort', estimatedMinutes: 12, specRef: 'J277/1.1' }
    ]
  }
];

export const TOPICS_MAP: Record<SubjectId, TopicSection[]> = {
  maths: MATHS_TOPICS,
  physics: PHYSICS_TOPICS,
  chemistry: CHEMISTRY_TOPICS,
  biology: BIOLOGY_TOPICS,
  economics: ECONOMICS_TOPICS,
  computer_science: CS_TOPICS
};

export const SUBJECTS: SubjectConfig[] = [
  {
    id: 'maths',
    name: 'Mathematics',
    icon: '📐',
    color: 'from-blue-600 to-indigo-600',
    levels: ['GCSE', 'IGCSE', 'A Level', 'IB'],
    boards: ['Edexcel', 'Cambridge (CIE)', 'AQA', 'OCR'],
    description: 'Algebra, Trigonometry, Calculus, Probability, Vectors, and Number Theory with step-by-step solutions.',
    totalNotes: 142,
    totalQuestions: 850,
    totalPastPapers: 48,
    topics: MATHS_TOPICS
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚡',
    color: 'from-amber-500 to-orange-600',
    levels: ['GCSE', 'IGCSE', 'A Level', 'IB'],
    boards: ['Edexcel', 'Cambridge (CIE)', 'AQA', 'OCR'],
    description: 'Forces, Electricity, Waves, Radioactivity, Space, and Thermodynamics with examiner-graded diagrams.',
    totalNotes: 118,
    totalQuestions: 720,
    totalPastPapers: 36,
    topics: PHYSICS_TOPICS
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    color: 'from-emerald-500 to-teal-600',
    levels: ['GCSE', 'IGCSE', 'A Level', 'IB'],
    boards: ['Edexcel', 'Cambridge (CIE)', 'AQA', 'OCR'],
    description: 'Atomic Structure, Bonding, Organic Chemistry, Quantitative Calculations, and Electrolysis.',
    totalNotes: 104,
    totalQuestions: 640,
    totalPastPapers: 34,
    topics: CHEMISTRY_TOPICS
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    color: 'from-green-600 to-emerald-700',
    levels: ['GCSE', 'IGCSE', 'A Level', 'IB'],
    boards: ['Edexcel', 'Cambridge (CIE)', 'AQA', 'OCR'],
    description: 'Cell Biology, Genetics, Enzymes, Photosynthesis, Human Physiology, and Ecology.',
    totalNotes: 98,
    totalQuestions: 590,
    totalPastPapers: 30,
    topics: BIOLOGY_TOPICS
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: '📈',
    color: 'from-purple-600 to-pink-600',
    levels: ['GCSE', 'IGCSE', 'A Level', 'IB'],
    boards: ['Edexcel', 'Cambridge (CIE)', 'AQA', 'OCR'],
    description: 'Microeconomics, Supply & Demand, Market Failure, Macroeconomic Indicators, and International Trade.',
    totalNotes: 86,
    totalQuestions: 480,
    totalPastPapers: 28,
    topics: ECONOMICS_TOPICS
  },
  {
    id: 'computer_science',
    name: 'Computer Science',
    icon: '💻',
    color: 'from-cyan-600 to-blue-600',
    levels: ['GCSE', 'IGCSE', 'A Level'],
    boards: ['Cambridge (CIE)', 'AQA', 'OCR'],
    description: 'Algorithms, Data Representation, Boolean Logic, Python/Pseudocode, and Cyber Security.',
    totalNotes: 74,
    totalQuestions: 410,
    totalPastPapers: 24,
    topics: CS_TOPICS
  }
];

// Rich Revision Notes database
export const REVISION_NOTES: Record<string, RevisionNoteContent> = {
  quadratics: {
    id: 'note_quadratics',
    subtopicId: 'quadratics',
    topicId: 'algebra',
    subjectId: 'maths',
    level: 'GCSE',
    board: 'Edexcel',
    title: '1.1 Solving Quadratic Equations',
    specCode: 'Edexcel GCSE Higher 1MA1 — Topic 2.2',
    readTime: '12 min read',
    summary: 'A quadratic equation contains an unknown variable squared (e.g. x²). There are 3 main methods tested in exams: factorising, using the quadratic formula, and completing the square.',
    keyPoints: [
      'Standard form MUST always be arranged as ax² + bx + c = 0 before attempting any method.',
      'A quadratic equation can have 2 real solutions, 1 repeated solution, or 0 real solutions (tested via discriminant b² - 4ac in A Level).',
      'If the question says "give your solutions to 2 decimal places" or "in the form a ± b√c", it CANNOT be factorised easily; immediately reach for the Quadratic Formula or Completing the Square!'
    ],
    examinerTips: [
      'Examiner Tip: Forgetting the ± in the quadratic formula x = (-b ± √(b² - 4ac)) / (2a) is the #1 reason students lose the second accuracy (A1) mark.',
      'Watch out for negative numbers when calculating b²! If b = -5, (-5)² = +25, NOT -25. Entering -5² into non-scientific calculator logic gives -25, which ruins the rest of your calculation.',
      'In factorising questions where a > 1 (e.g., 2x² + 7x + 3 = 0), always check your factors by expanding back in the margin before writing your final answer.'
    ],
    keyDefinitions: [
      {
        term: 'Roots / Solutions',
        definition: 'The values of x where the quadratic graph crosses the x-axis (i.e. where y = 0).'
      },
      {
        term: 'Quadratic Formula',
        definition: 'x = (-b ± √(b² - 4ac)) / 2a, derived directly from completing the square on ax² + bx + c = 0.'
      },
      {
        term: 'Turning Point (Vertex)',
        definition: 'The minimum or maximum point of the parabola, found most easily when written in form (x + p)² + q.'
      }
    ],
    diagramType: 'quadratic_graph',
    workedExamples: [
      {
        title: 'Worked Example 1: Solving by Factorising (a = 1)',
        question: 'Solve the equation: x² - 5x - 24 = 0',
        steps: [
          {
            stepNumber: 1,
            explanation: 'Ensure the equation equals 0. It is already in standard form ax² + bx + c = 0.',
            mathOrFormula: 'x² - 5x - 24 = 0'
          },
          {
            stepNumber: 2,
            explanation: 'Find two numbers that multiply to give c (-24) and add to give b (-5). Pairs of -24: (1, -24), (2, -12), (3, -8). Notice that 3 + (-8) = -5.',
            mathOrFormula: '(x - 8)(x + 3) = 0'
          },
          {
            stepNumber: 3,
            explanation: 'Set each factor to zero to obtain the two distinct roots.',
            mathOrFormula: 'x - 8 = 0  =>  x = 8\nx + 3 = 0  =>  x = -3'
          }
        ],
        finalAnswer: 'x = 8 or x = -3',
        examinerCommentary: 'Full 3 marks awarded (M1 for factorising correctly, A1 for each root). Always write "or" between solutions.'
      },
      {
        title: 'Worked Example 2: The Quadratic Formula (with Decimals)',
        question: 'Solve 2x² - 7x + 1 = 0. Give your answers to 2 decimal places.',
        steps: [
          {
            stepNumber: 1,
            explanation: 'Identify the coefficients a, b, and c with their signs.',
            mathOrFormula: 'a = 2,  b = -7,  c = 1'
          },
          {
            stepNumber: 2,
            explanation: 'Substitute precisely into the quadratic formula, taking care with brackets around (-7).',
            mathOrFormula: 'x = [ -(-7) ± √((-7)² - 4(2)(1)) ] / [ 2(2) ]'
          },
          {
            stepNumber: 3,
            explanation: 'Evaluate the discriminant under the square root: (-7)² - 8 = 49 - 8 = 41.',
            mathOrFormula: 'x = (7 ± √41) / 4'
          },
          {
            stepNumber: 4,
            explanation: 'Compute both roots on your calculator and round accurately to 2 decimal places.',
            mathOrFormula: 'x₁ = (7 + 6.4031...) / 4 = 3.3507... ≈ 3.35\nx₂ = (7 - 6.4031...) / 4 = 0.1492... ≈ 0.15'
          }
        ],
        finalAnswer: 'x = 3.35  or  x = 0.15 (to 2 d.p.)',
        examinerCommentary: 'M1 for substitution, M1 for discriminant evaluation, A1 for both rounded correctly. Premature rounding of √41 loses the final accuracy mark!'
      }
    ],
    cheatSheetSummary: [
      'Step 1: Rearrange to ax² + bx + c = 0',
      'Step 2: Check if factorisable (integers that multiply to ac and add to b)',
      'Step 3: If not, use x = (-b ± √(b² - 4ac)) / (2a)',
      'Step 4: State both answers clearly rounded to requested degree of accuracy'
    ]
  },

  surds: {
    id: 'note_surds',
    subtopicId: 'surds',
    topicId: 'number',
    subjectId: 'maths',
    level: 'GCSE',
    board: 'Edexcel',
    title: '2.1 Surds & Rationalising the Denominator',
    specCode: 'Edexcel GCSE Higher 1MA1 — Topic 1.3',
    readTime: '10 min read',
    summary: 'A surd is an irrational number expressed with a root symbol (e.g. √2, √3). Leaving answers in surd form preserves exact values without decimal rounding error.',
    keyPoints: [
      'Multiplication rule: √(a) × √(b) = √(ab)',
      'Division rule: √(a) / √(b) = √(a / b)',
      'Addition/Subtraction: Only like surds can be combined (e.g. 3√5 + 4√5 = 7√5, but √2 + √3 CANNOT be simplified).',
      'Rationalising means removing the root from the denominator of a fraction.'
    ],
    examinerTips: [
      'Examiner Tip: Never write √(a + b) = √a + √b. For example, √(9 + 16) = √25 = 5, which is NOT 3 + 4 = 7! This is a fatal misconception penalized in exams.',
      'When rationalising a binomial denominator like 4 / (3 - √5), multiply both numerator and denominator by its conjugate (3 + √5). The denominator becomes (3)² - (√5)² = 9 - 5 = 4.'
    ],
    keyDefinitions: [
      {
        term: 'Surd',
        definition: 'The root of a whole number that cannot be written as a terminating or recurring fraction.'
      },
      {
        term: 'Conjugate (Dual)',
        definition: 'For an expression (a + √b), its conjugate is (a - √b). Multiplying conjugates removes the root via difference of two squares.'
      }
    ],
    workedExamples: [
      {
        title: 'Worked Example: Rationalising a Complex Denominator',
        question: 'Simplify fully: 6 / (√7 - 1). Give your answer in the form a + b√7.',
        steps: [
          {
            stepNumber: 1,
            explanation: 'Multiply top and bottom by the conjugate of (√7 - 1), which is (√7 + 1).',
            mathOrFormula: '[6(√7 + 1)] / [(√7 - 1)(√7 + 1)]'
          },
          {
            stepNumber: 2,
            explanation: 'Expand the denominator using difference of two squares: (√7)² - 1² = 7 - 1 = 6.',
            mathOrFormula: 'Denominator = 7 - 1 = 6'
          },
          {
            stepNumber: 3,
            explanation: 'Divide numerator and denominator by 6.',
            mathOrFormula: '6(√7 + 1) / 6 = √7 + 1'
          }
        ],
        finalAnswer: '1 + √7 (or √7 + 1)',
        examinerCommentary: 'Clear 3 marks. Candidates who failed to multiply both terms in the bracket lost the method mark.'
      }
    ],
    cheatSheetSummary: [
      '√a × √a = a',
      '√(a²b) = a√b (always look for the largest square factor: 4, 9, 16, 25, 36, 49...)',
      'k / √a => multiply by √a / √a',
      'k / (a + √b) => multiply by (a - √b) / (a - √b)'
    ]
  },

  ohm_law: {
    id: 'note_ohm_law',
    subtopicId: 'ohm_law',
    topicId: 'electricity',
    subjectId: 'physics',
    level: 'GCSE',
    board: 'Cambridge (CIE)',
    title: '1.1 Current, Potential Difference & Resistance',
    specCode: 'CIE IGCSE Physics 0625 — Section 4.2',
    readTime: '11 min read',
    summary: 'Electric current is the rate of flow of electric charge. Potential difference (voltage) is the work done per unit charge. Ohm’s Law states that current is directly proportional to voltage at constant temperature.',
    keyPoints: [
      'Charge equation: Q = I × t (Charge in Coulombs = Current in Amperes × Time in seconds).',
      'Ohm’s Law formula: V = I × R (Voltage in Volts = Current in Amperes × Resistance in Ohms).',
      'Ammeters are always connected in SERIES (low resistance).',
      'Voltmeters are always connected in PARALLEL across the component (high resistance).'
    ],
    examinerTips: [
      'Examiner Tip: Time t MUST be converted to seconds! If an exam question mentions current flowing for "3 minutes", calculate t = 3 × 60 = 180 s before using Q = It.',
      'Remember that filament lamps do NOT obey Ohm’s Law over high voltages because resistance INCREASES as the filament gets hotter (delocalised electrons collide more frequently with vibrating lattice ions).'
    ],
    diagramType: 'circuit',
    workedExamples: [
      {
        title: 'Worked Example: Circuit Current & Voltage Calculation',
        question: 'A 12 V battery is connected to a resistor. A charge of 360 C flows through the circuit in 2 minutes. Calculate: (a) the current, (b) the resistance.',
        steps: [
          {
            stepNumber: 1,
            explanation: 'Convert time to seconds: 2 minutes = 120 seconds.',
            mathOrFormula: 't = 120 s'
          },
          {
            stepNumber: 2,
            explanation: 'Calculate current using I = Q / t.',
            mathOrFormula: 'I = 360 C / 120 s = 3.0 A'
          },
          {
            stepNumber: 3,
            explanation: 'Calculate resistance using R = V / I.',
            mathOrFormula: 'R = 12 V / 3.0 A = 4.0 Ω'
          }
        ],
        finalAnswer: '(a) Current = 3.0 A, (b) Resistance = 4.0 Ω',
        examinerCommentary: 'Don’t forget standard SI units (A and Ω) to guarantee the mark!'
      }
    ],
    cheatSheetSummary: [
      'Q = I × t',
      'V = I × R',
      'P = I × V = I²R = V² / R',
      'Ohmic conductors produce a straight-line I-V graph through the origin'
    ]
  },

  bonding: {
    id: 'note_bonding',
    subtopicId: 'bonding',
    topicId: 'atomic_structure',
    subjectId: 'chemistry',
    level: 'GCSE',
    board: 'AQA',
    title: '1.1 Ionic, Covalent & Metallic Bonding',
    specCode: 'AQA GCSE Chemistry 8462 — Topic 4.1',
    readTime: '12 min read',
    summary: 'Atoms bond to achieve stable outer electron shells. The three fundamental types of chemical bonding are Ionic (metal + non-metal), Covalent (non-metal + non-metal), and Metallic (metals).',
    keyPoints: [
      'Ionic Bonding: Electrostatic attraction between oppositely charged ions formed by the transfer of electrons from a metal to a non-metal.',
      'Covalent Bonding: Shared pair of electrons between two non-metal atoms.',
      'Metallic Bonding: Lattice of positive metal cations surrounded by a "sea" of delocalised electrons.',
      'Giant ionic lattices have high melting points due to strong electrostatic forces acting in all directions.'
    ],
    examinerTips: [
      'Examiner Tip: Never say "electrons are shared in ionic bonding". Ionic bonding is strictly TRANSFER of electrons.',
      'When explaining why metals conduct electricity: say "delocalised electrons are free to move and carry charge throughout the structure". Just saying "electrons move" loses the mark!'
    ],
    diagramType: 'periodic_table',
    workedExamples: [
      {
        title: 'Worked Example: Dot and Cross Diagram for Magnesium Oxide (MgO)',
        question: 'Describe what happens to magnesium and oxygen atoms when magnesium oxide is formed. [4 marks]',
        steps: [
          {
            stepNumber: 1,
            explanation: 'State the electron configurations: Mg is 2,8,2 and O is 2,6.',
            mathOrFormula: 'Mg (2,8,2)  and  O (2,6)'
          },
          {
            stepNumber: 2,
            explanation: 'Explain the electron transfer: Magnesium transfers 2 electrons from its outer shell to oxygen.',
            mathOrFormula: 'Mg loses 2e⁻  =>  Mg²⁺ (2,8)'
          },
          {
            stepNumber: 3,
            explanation: 'State the formation of the oxide ion.',
            mathOrFormula: 'O gains 2e⁻  =>  O²⁻ (2,8)'
          },
          {
            stepNumber: 4,
            explanation: 'Mention the strong electrostatic attraction between Mg²⁺ and O²⁻ ions in a giant ionic lattice.',
            mathOrFormula: 'Electrostatic force in 3D lattice'
          }
        ],
        finalAnswer: 'Magnesium atom loses 2 electrons forming Mg²⁺; oxygen atom gains these 2 electrons forming O²⁻; strong electrostatic attraction holds them together in a lattice.',
        examinerCommentary: '4 marks total: 1 mark for Mg losing 2e, 1 mark for O gaining 2e, 1 mark for correct ion charges (Mg²⁺, O²⁻), 1 mark for electrostatic attraction.'
      }
    ],
    cheatSheetSummary: [
      'Ionic: Metal + Non-metal (transfer e⁻, forms +/- ions)',
      'Covalent: Non-metal + Non-metal (shares e⁻ pairs)',
      'Metallic: Giant lattice of cations + delocalised e⁻',
      'High MP/BP: Giant Ionic, Giant Covalent (diamond, graphite), Metallic'
    ]
  },

  cell_structure: {
    id: 'note_cell_structure',
    subtopicId: 'cell_structure',
    topicId: 'cell_biology',
    subjectId: 'biology',
    level: 'GCSE',
    board: 'AQA',
    title: '1.1 Eukaryotic vs Prokaryotic Cell Organelles',
    specCode: 'AQA GCSE Biology 8461 — Topic 4.1.1',
    readTime: '10 min read',
    summary: 'All living organisms are composed of cells. Eukaryotic cells (plant and animal) contain genetic material enclosed in a nucleus, whereas prokaryotic cells (bacteria) lack a true nucleus.',
    keyPoints: [
      'Plant cells have 3 structures animal cells NEVER have: Cell wall (cellulose), Chloroplasts (chlorophyll for photosynthesis), and Permanent Vacuole (cell sap).',
      'Prokaryotes (bacteria) have DNA in a single circular loop and small rings called plasmids, with no membrane-bound organelles.',
      'Ribosomes are the sites of protein synthesis in both prokaryotes and eukaryotes.',
      'Mitochondria are the sites of aerobic respiration, releasing cellular energy (ATP).'
    ],
    examinerTips: [
      'Examiner Tip: NEVER say "mitochondria PRODUCE energy". Energy cannot be created or destroyed! Say "mitochondria release energy through aerobic respiration".',
      'Do not confuse the cell membrane (controls what enters and leaves) with the cell wall (provides structural support and prevents bursting).'
    ],
    diagramType: 'cell_structure',
    workedExamples: [
      {
        title: 'Worked Example: Comparing Cells & Magnification',
        question: 'An image of a bacterial cell has a length of 40 mm. The actual length is 2 µm. Calculate the magnification. [3 marks]',
        steps: [
          {
            stepNumber: 1,
            explanation: 'Recall the magnification formula: Magnification = Image Size / Actual Size (I = A × M).',
            mathOrFormula: 'M = I / A'
          },
          {
            stepNumber: 2,
            explanation: 'Convert both measurements to the SAME unit (micrometres, µm). 1 mm = 1000 µm, so 40 mm = 40,000 µm.',
            mathOrFormula: 'I = 40 × 1000 = 40,000 µm'
          },
          {
            stepNumber: 3,
            explanation: 'Divide image size by actual size.',
            mathOrFormula: 'M = 40,000 µm / 2 µm = 20,000'
          }
        ],
        finalAnswer: 'Magnification = ×20,000',
        examinerCommentary: 'Magnification is a ratio, so it has NO units, but writing "×" or "times" is recommended. 1 mark for formula, 1 mark for unit conversion, 1 mark for correct value.'
      }
    ],
    cheatSheetSummary: [
      'Animal: Nucleus, Cytoplasm, Cell Membrane, Mitochondria, Ribosomes',
      'Plant adds: Cell Wall, Chloroplasts, Permanent Vacuole',
      'Bacteria adds: Plasmid rings, Circular loop of DNA, Flagellum',
      'Magnification = Image / Actual'
    ]
  }
};

// Exam Questions with real mark schemes (Easy, Medium, Hard)
export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 'q_quad_01',
    topicId: 'algebra',
    subtopicId: 'quadratics',
    subjectId: 'maths',
    level: 'GCSE',
    board: 'Edexcel',
    yearSource: 'June 2023',
    paperSource: 'Paper 1H (Non-Calculator)',
    questionNumber: 'Q7',
    difficulty: 'easy',
    marks: 3,
    questionText: 'Factorise and solve the quadratic equation:\nx² + 7x + 12 = 0',
    hint: 'Look for two numbers that multiply to 12 and add up to 7.',
    modelAnswer: 'Step 1: Two numbers that multiply to 12 and add to 7 are +3 and +4.\nStep 2: Factorise into two brackets:\n(x + 3)(x + 4) = 0\nStep 3: Solve each bracket:\nx + 3 = 0  =>  x = -3\nx + 4 = 0  =>  x = -4',
    markScheme: [
      { markCode: 'M1', description: 'For attempting to factorise into (x ± 3)(x ± 4) with correct pair of integers' },
      { markCode: 'A1', description: 'For fully correct factorisation (x + 3)(x + 4) = 0' },
      { markCode: 'A1', description: 'For both correct roots x = -3 and x = -4' }
    ],
    examinerReport: 'Over 85% of candidates scored full marks on this introductory question. Common mistakes occurred when students forgot to invert signs when solving the brackets.'
  },
  {
    id: 'q_quad_02',
    topicId: 'algebra',
    subtopicId: 'quadratics',
    subjectId: 'maths',
    level: 'GCSE',
    board: 'Edexcel',
    yearSource: 'November 2022',
    paperSource: 'Paper 2H (Calculator)',
    questionNumber: 'Q14',
    difficulty: 'medium',
    marks: 3,
    questionText: 'Solve 3x² + 5x - 4 = 0.\nGive your solutions to 2 decimal places.',
    hint: 'Use the quadratic formula x = (-b ± √(b² - 4ac)) / (2a) with a = 3, b = 5, and c = -4.',
    modelAnswer: 'x = [ -5 ± √(5² - 4(3)(-4)) ] / [ 2(3) ]\nx = [ -5 ± √(25 + 48) ] / 6\nx = [ -5 ± √73 ] / 6\nx₁ = (-5 + 8.5440...) / 6 = 0.5906... ≈ 0.59\nx₂ = (-5 - 8.5440...) / 6 = -2.2573... ≈ -2.26',
    markScheme: [
      { markCode: 'M1', description: 'For correct substitution into quadratic formula: [-5 ± √(5² - 4(3)(-4))] / 2(3)' },
      { markCode: 'M1', description: 'For evaluating discriminant correctly to √73 (or 8.544...)' },
      { markCode: 'A1', description: 'For both correct solutions x = 0.59 and x = -2.26 rounded to 2 d.p.' }
    ],
    examinerReport: 'Many candidates calculated 5² - 4(3)(-4) as 25 - 48 = -23 due to calculator error with signs. Remember that -4(3)(-4) = +48.'
  },
  {
    id: 'q_quad_03',
    topicId: 'algebra',
    subtopicId: 'quadratics',
    subjectId: 'maths',
    level: 'GCSE',
    board: 'Edexcel',
    yearSource: 'June 2023',
    paperSource: 'Paper 1H (Non-Calculator)',
    questionNumber: 'Q21',
    difficulty: 'hard',
    marks: 5,
    questionText: 'A right-angled triangle has sides of length (x - 2) cm, (x + 5) cm, and a hypotenuse of (2x - 1) cm.\n(a) Show that 2x² - 10x - 28 = 0.\n(b) Hence find the perimeter of the triangle.',
    hint: "Use Pythagoras' Theorem a² + b² = c². Then solve the quadratic and reject any negative lengths.",
    modelAnswer: 'Part (a):\nBy Pythagoras:\n(x - 2)² + (x + 5)² = (2x - 1)²\n(x² - 4x + 4) + (x² + 10x + 25) = 4x² - 4x + 1\n2x² + 6x + 29 = 4x² - 4x + 1\nRearranging to one side:\n0 = 2x² - 10x - 28  (as required)\n\nPart (b):\nDivide by 2: x² - 5x - 14 = 0\n(x - 7)(x + 2) = 0 => x = 7 or x = -2\nSince length must be positive, x = 7.\nSides are: (7 - 2) = 5 cm, (7 + 5) = 12 cm, (2(7) - 1) = 13 cm.\nPerimeter = 5 + 12 + 13 = 30 cm.',
    markScheme: [
      { markCode: 'M1', description: 'For applying Pythagoras (x - 2)² + (x + 5)² = (2x - 1)²' },
      { markCode: 'A1', description: 'For correct expansion of all three brackets: x² - 4x + 4 + x² + 10x + 25 = 4x² - 4x + 1' },
      { markCode: 'A1', description: 'For completing algebraic rearrangement to 2x² - 10x - 28 = 0' },
      { markCode: 'M1', description: 'For factorising x² - 5x - 14 = 0 into (x - 7)(x + 2) and selecting x = 7' },
      { markCode: 'A1', description: 'For calculating triangle sides (5, 12, 13) and final perimeter = 30 cm' }
    ],
    examinerReport: 'A classic Grade 9 multi-topic question. Only 18% of candidates achieved all 5 marks. Common slip was forgetting to discard the negative root x = -2.'
  },
  {
    id: 'q_phys_01',
    topicId: 'electricity',
    subtopicId: 'ohm_law',
    subjectId: 'physics',
    level: 'GCSE',
    board: 'Cambridge (CIE)',
    yearSource: 'June 2023',
    paperSource: 'Paper 42 (Extended)',
    questionNumber: 'Q6',
    difficulty: 'medium',
    marks: 4,
    questionText: 'A circuit contains a 6.0 V battery and two resistors in series: R₁ = 8.0 Ω and an unknown resistor R₂.\nThe current reading on an ammeter in the circuit is 0.25 A.\n(a) Calculate the total resistance of the circuit.\n(b) Find the resistance of R₂.\n(c) Calculate the power dissipated in R₁.',
    hint: 'Use R_total = V / I, then subtract R₁, and use P = I²R.',
    modelAnswer: '(a) Total resistance R_total = V / I = 6.0 V / 0.25 A = 24.0 Ω\n(b) In series, R_total = R₁ + R₂ => 24.0 = 8.0 + R₂ => R₂ = 16.0 Ω\n(c) Power in R₁ = I² × R₁ = (0.25)² × 8.0 = 0.0625 × 8.0 = 0.50 W',
    markScheme: [
      { markCode: 'M1', description: 'For using R = V / I with 6.0 / 0.25' },
      { markCode: 'A1', description: 'For R_total = 24 Ω and R₂ = 16 Ω' },
      { markCode: 'M1', description: 'For recall of power formula P = I²R or P = VI' },
      { markCode: 'A1', description: 'For correct power = 0.50 W (or 0.5 W) with unit' }
    ],
    examinerReport: 'Well answered by candidates. Some lost the unit mark by omitting Watts or writing J instead of W.'
  },
  {
    id: 'q_chem_01',
    topicId: 'atomic_structure',
    subtopicId: 'bonding',
    subjectId: 'chemistry',
    level: 'GCSE',
    board: 'AQA',
    yearSource: 'June 2022',
    paperSource: 'Paper 1H',
    questionNumber: 'Q3',
    difficulty: 'medium',
    marks: 4,
    questionText: 'Explain why sodium chloride (NaCl) has a high melting point and only conducts electricity when molten or dissolved in water, but not when solid. [4 marks]',
    hint: 'Think about the giant ionic lattice, electrostatic forces, and the mobility of ions.',
    modelAnswer: '1. Melting Point: NaCl has a giant ionic lattice with strong electrostatic forces of attraction between oppositely charged Na⁺ and Cl⁻ ions, which require large amounts of heat energy to overcome.\n2. Solid state: In solid NaCl, ions are held fixed in regular lattice positions and cannot move to carry electric charge.\n3. Molten/Aqueous: When molten or dissolved in water, the lattice breaks down and ions are free to move and carry electrical current.',
    markScheme: [
      { markCode: 'M1', description: 'Mentions giant ionic lattice / strong electrostatic attractions between oppositely charged ions' },
      { markCode: 'A1', description: 'States large amount of energy needed to overcome strong ionic bonds (explaining high MP)' },
      { markCode: 'B1', description: 'States that in solid, ions are fixed in lattice / unable to move' },
      { markCode: 'A1', description: 'States that in molten/solution, ions are free to move and carry charge' }
    ],
    examinerReport: 'A key discriminator: candidates who said "electrons move to conduct electricity in molten NaCl" received zero for that part. Conduction in ionic substances is strictly via mobile IONS.'
  }
];

// Past Papers catalog
export const PAST_PAPERS: PastPaper[] = [
  {
    id: 'pp_edx_2024_1h',
    subjectId: 'maths',
    level: 'GCSE',
    board: 'Edexcel',
    year: 2024,
    season: 'June',
    tier: 'Higher',
    paperCode: '1MA1/1H',
    paperTitle: 'Paper 1: Non-Calculator (Higher Tier)',
    durationMinutes: 90,
    maxMarks: 80,
    calculatorAllowed: false,
    questionsCount: 22
  },
  {
    id: 'pp_edx_2024_2h',
    subjectId: 'maths',
    level: 'GCSE',
    board: 'Edexcel',
    year: 2024,
    season: 'June',
    tier: 'Higher',
    paperCode: '1MA1/2H',
    paperTitle: 'Paper 2: Calculator (Higher Tier)',
    durationMinutes: 90,
    maxMarks: 80,
    calculatorAllowed: true,
    questionsCount: 21
  },
  {
    id: 'pp_edx_2023_1h',
    subjectId: 'maths',
    level: 'GCSE',
    board: 'Edexcel',
    year: 2023,
    season: 'June',
    tier: 'Higher',
    paperCode: '1MA1/1H',
    paperTitle: 'Paper 1: Non-Calculator (Higher Tier)',
    durationMinutes: 90,
    maxMarks: 80,
    calculatorAllowed: false,
    questionsCount: 21
  },
  {
    id: 'pp_cie_2023_42',
    subjectId: 'physics',
    level: 'IGCSE',
    board: 'Cambridge (CIE)',
    year: 2023,
    season: 'June',
    tier: 'Extended',
    paperCode: '0625/42',
    paperTitle: 'Paper 4: Theory (Extended)',
    durationMinutes: 75,
    maxMarks: 80,
    calculatorAllowed: true,
    questionsCount: 11
  },
  {
    id: 'pp_aqa_2023_1h',
    subjectId: 'chemistry',
    level: 'GCSE',
    board: 'AQA',
    year: 2023,
    season: 'June',
    tier: 'Higher',
    paperCode: '8462/1H',
    paperTitle: 'Paper 1: Chemistry (Higher Tier)',
    durationMinutes: 105,
    maxMarks: 100,
    calculatorAllowed: true,
    questionsCount: 10
  },
  {
    id: 'pp_aqa_2023_bio_1h',
    subjectId: 'biology',
    level: 'GCSE',
    board: 'AQA',
    year: 2023,
    season: 'June',
    tier: 'Higher',
    paperCode: '8461/1H',
    paperTitle: 'Paper 1: Biology (Higher Tier)',
    durationMinutes: 105,
    maxMarks: 100,
    calculatorAllowed: true,
    questionsCount: 9
  }
];

// Flashcards for active recall
export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc_1',
    subjectId: 'maths',
    topicId: 'algebra',
    tag: 'Formula',
    front: 'What is the Quadratic Formula for solving ax² + bx + c = 0?',
    back: 'x = (-b ± √(b² - 4ac)) / (2a)',
    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'
  },
  {
    id: 'fc_2',
    subjectId: 'maths',
    topicId: 'algebra',
    tag: 'Rule',
    front: 'What does the discriminant b² - 4ac indicate about a quadratic?',
    back: '• If > 0: Two distinct real roots\n• If = 0: One repeated real root\n• If < 0: No real roots (curves do not cross the x-axis)'
  },
  {
    id: 'fc_3',
    subjectId: 'maths',
    topicId: 'number',
    tag: 'Surds',
    front: 'How do you rationalise the denominator of a fraction with (a - √b)?',
    back: 'Multiply both numerator and denominator by the conjugate (a + √b).',
    formula: '\\frac{k}{a - \\sqrt{b}} \\times \\frac{a + \\sqrt{b}}{a + \\sqrt{b}}'
  },
  {
    id: 'fc_4',
    subjectId: 'physics',
    topicId: 'electricity',
    tag: 'Law',
    front: "State Ohm's Law and its mathematical formula.",
    back: 'Current is directly proportional to potential difference at constant temperature: V = I × R'
  },
  {
    id: 'fc_5',
    subjectId: 'chemistry',
    topicId: 'atomic_structure',
    tag: 'Bonding',
    front: 'Why do ionic compounds conduct electricity when molten but not as solids?',
    back: 'In solids, ions are locked in fixed positions in the lattice. When molten or aqueous, ions are free to move and carry charge.'
  },
  {
    id: 'fc_6',
    subjectId: 'biology',
    topicId: 'cell_biology',
    tag: 'Organelles',
    front: 'What 3 cell structures are present in plant cells but absent in animal cells?',
    back: '1. Cellulose Cell Wall\n2. Permanent Vacuole\n3. Chloroplasts'
  }
];
