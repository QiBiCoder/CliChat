import React, { useState } from 'react';
import { TopicId, IgcseFilterId, IgcseProblem } from './types';

interface ProblemItem {
  id: string;
  topic: 'algebra' | 'geometry' | 'trigonometry' | 'calculus' | 'statistics';
  titleText: string;
  questionNode: React.ReactNode;
  steps: string[];
  finalAnswer: string;
}

const PROBLEMS: ProblemItem[] = [
  {
    id: 'alg-1',
    topic: 'algebra',
    titleText: 'Solve for x: 3x + 7 = 22',
    questionNode: (
      <>
        Solve for <span className="math">x</span>: <span className="math">3x + 7 = 22</span>
      </>
    ),
    steps: [
      'Subtract 7 from both sides: 3x = 15',
      'Divide both sides by 3: x = 5',
    ],
    finalAnswer: 'x = 5',
  },
  {
    id: 'alg-2',
    topic: 'algebra',
    titleText: 'Solve: 2(x − 4) = 3x − 1',
    questionNode: (
      <>
        Solve: <span className="math">2(x − 4) = 3x − 1</span>
      </>
    ),
    steps: [
      'Distribute the left side: 2x − 8 = 3x − 1',
      'Subtract 2x from both sides: −8 = x − 1',
      'Add 1 to both sides: −7 = x',
    ],
    finalAnswer: 'x = −7',
  },
  {
    id: 'alg-3',
    topic: 'algebra',
    titleText: 'Solve by factoring: x² − 5x + 6 = 0',
    questionNode: (
      <>
        Solve by factoring: <span className="math">x² − 5x + 6 = 0</span>
      </>
    ),
    steps: [
      'Look for two numbers that multiply to +6 and sum to −5: −2 and −3',
      'Factor the quadratic into two binomials: (x − 2)(x − 3) = 0',
      'Apply the zero-product property: x − 2 = 0 or x − 3 = 0',
      'Solve each linear equation: x = 2 or x = 3',
    ],
    finalAnswer: 'x = 2 or x = 3',
  },
  {
    id: 'alg-4',
    topic: 'algebra',
    titleText: 'Solve the system of equations: 2x + y = 9 and x − y = 3',
    questionNode: (
      <>
        Solve the system of equations: <span className="math">2x + y = 9</span> and <span className="math">x − y = 3</span>
      </>
    ),
    steps: [
      'Use elimination: add the two equations together to eliminate y: (2x + y) + (x − y) = 9 + 3',
      'Simplify: 3x = 12 ⇒ divide by 3: x = 4',
      'Substitute x = 4 into the second equation: 4 − y = 3',
      'Subtract 4: −y = −1 ⇒ y = 1',
    ],
    finalAnswer: 'x = 4, y = 1',
  },
  {
    id: 'alg-5',
    topic: 'algebra',
    titleText: 'Solve the inequality: 4 − 3x < 19',
    questionNode: (
      <>
        Solve the inequality: <span className="math">4 − 3x &lt; 19</span>
      </>
    ),
    steps: [
      'Subtract 4 from both sides: −3x < 15',
      'Divide both sides by −3 (remember to flip the inequality sign when dividing by a negative number): x > 15 / (−3)',
      'Simplify: x > −5',
    ],
    finalAnswer: 'x > −5',
  },
  {
    id: 'geo-1',
    topic: 'geometry',
    titleText: 'Find the area of a triangle with base 10 and height 6',
    questionNode: 'Find the area of a triangle with base 10 and height 6',
    steps: [
      'Area of a triangle = ½ × base × height',
      'Area = ½ × 10 × 6 = 30',
    ],
    finalAnswer: 'Area = 30 square units',
  },
  {
    id: 'geo-2',
    topic: 'geometry',
    titleText: 'A right triangle has legs of 6 and 8. Find the hypotenuse.',
    questionNode: 'A right triangle has legs of 6 and 8. Find the hypotenuse.',
    steps: [
      'Apply the Pythagorean theorem: c² = a² + b²',
      'c² = 6² + 8² = 36 + 64 = 100',
      'c = √100',
    ],
    finalAnswer: 'c = 10',
  },
  {
    id: 'trig-1',
    topic: 'trigonometry',
    titleText: 'Find the value of sin(30°)',
    questionNode: (
      <>
        Find the value of <span className="math">sin(30°)</span>
      </>
    ),
    steps: [
      '30° is a standard angle from the 30-60-90 triangle',
      'In that triangle, the side opposite 30° is half the hypotenuse',
    ],
    finalAnswer: 'sin(30°) = 1/2',
  },
  {
    id: 'trig-2',
    topic: 'trigonometry',
    titleText: 'Find θ if tan(θ) = 1, where 0° < θ < 90°',
    questionNode: (
      <>
        Find <span className="math">θ</span> if <span className="math">tan(θ) = 1</span>, where 0° &lt; θ &lt; 90°
      </>
    ),
    steps: [
      'tan(θ) = 1 means the opposite and adjacent sides are equal',
      'This occurs at the standard angle where sin and cos are equal',
    ],
    finalAnswer: 'θ = 45°',
  },
  {
    id: 'calc-1',
    topic: 'calculus',
    titleText: 'Find the derivative of f(x) = 3x² + 5x',
    questionNode: (
      <>
        Find the derivative of <span className="math">f(x) = 3x² + 5x</span>
      </>
    ),
    steps: [
      'Apply the power rule to each term',
      'd/dx[3x²] = 6x, and d/dx[5x] = 5',
    ],
    finalAnswer: "f'(x) = 6x + 5",
  },
  {
    id: 'calc-2',
    topic: 'calculus',
    titleText: 'Evaluate ∫ 2x dx',
    questionNode: (
      <>
        Evaluate <span className="math">∫ 2x dx</span>
      </>
    ),
    steps: [
      'Apply the power rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1)',
      '∫2x dx = 2 × (x²/2)',
    ],
    finalAnswer: '= x² + C',
  },
  {
    id: 'stat-1',
    topic: 'statistics',
    titleText: 'Find the mean of the data set: 4, 8, 6, 5, 3',
    questionNode: 'Find the mean of the data set: 4, 8, 6, 5, 3',
    steps: [
      'Sum the values: 4 + 8 + 6 + 5 + 3 = 26',
      'Divide by the number of values: 26 ÷ 5',
    ],
    finalAnswer: 'Mean = 5.2',
  },
  {
    id: 'stat-2',
    topic: 'statistics',
    titleText: "Two dice are rolled. What's the probability the sum is 7?",
    questionNode: "Two dice are rolled. What's the probability the sum is 7?",
    steps: [
      'There are 36 equally likely outcomes (6 × 6)',
      '6 of them sum to 7: (1,6) (2,5) (3,4) (4,3) (5,2) (6,1)',
    ],
    finalAnswer: 'P(sum = 7) = 6/36 = 1/6',
  },
];

const IGCSE_PROBLEMS: IgcseProblem[] = [
  {
    id: 'igcse-math-1',
    syllabus: 'IGCSE Mathematics (0580/0980)',
    category: 'igcse-core-extended',
    topicTag: 'Algebra & Quadratics',
    paperRef: '0580 Paper 4 / Extended',
    titleText: 'Solve the quadratic equation 2x² − 5x − 3 = 0 giving solutions to 2 decimal places or exact factors.',
    questionNode: (
      <>
        Solve the quadratic equation <span className="math">2x² − 5x − 3 = 0</span> giving solutions to 2 decimal places or exact factors.
      </>
    ),
    steps: [
      'Check if it factorises: looking for factors of (2 × −3 = −6) that sum to −5: −6 and +1.',
      'Split the middle term: 2x² − 6x + x − 3 = 0',
      'Factor by grouping: 2x(x − 3) + 1(x − 3) = 0',
      '(2x + 1)(x − 3) = 0',
      'Set each bracket to zero: 2x + 1 = 0 ⇒ x = −0.5; x − 3 = 0 ⇒ x = 3',
    ],
    finalAnswer: 'x = −0.5 or x = 3',
    examinerTip: 'Always show both factor brackets before writing final values to secure method marks.',
  },
  {
    id: 'igcse-math-2',
    syllabus: 'IGCSE Mathematics (0580/0980)',
    category: 'igcse-core-extended',
    topicTag: 'Vectors & Geometry',
    paperRef: '0580 Paper 2 / Short Answer',
    titleText: 'Given vector a = (3, −4)ᵀ and vector b = (−1, 6)ᵀ, find the magnitude |2a + b|.',
    questionNode: (
      <>
        Given vector <span className="math">a = (3, −4)ᵀ</span> and vector <span className="math">b = (−1, 6)ᵀ</span>, find the magnitude <span className="math">|2a + b|</span>.
      </>
    ),
    steps: [
      'Multiply vector a by scalar 2: 2a = (2 × 3, 2 × −4)ᵀ = (6, −8)ᵀ',
      'Add vector b: (6 + (−1), −8 + 6)ᵀ = (5, −2)ᵀ',
      'Calculate magnitude using the distance formula: |(5, −2)| = √(5² + (−2)²)',
      '√(25 + 4) = √29 ≈ 5.39 (to 3 significant figures)',
    ],
    finalAnswer: '|2a + b| = √29 ≈ 5.39',
    examinerTip: 'Cambridge mark schemes expect non-exact answers given to 3 significant figures unless specified otherwise.',
  },
  {
    id: 'igcse-math-3',
    syllabus: 'IGCSE Mathematics (0580/0980)',
    category: 'igcse-core-extended',
    topicTag: 'Mensuration & Trigonometry',
    paperRef: '0580 Paper 4 / Extended',
    titleText: 'In triangle ABC, AB = 7 cm, AC = 9 cm, and angle BAC = 42°. Calculate the area of triangle ABC.',
    questionNode: (
      <>
        In triangle <span className="math">ABC</span>, <span className="math">AB = 7 cm</span>, <span className="math">AC = 9 cm</span>, and angle <span className="math">BAC = 42°</span>. Calculate the area of triangle <span className="math">ABC</span>.
      </>
    ),
    steps: [
      'Use the sine formula for area: Area = ½ × a × b × sin(C)',
      'Substitute values: Area = ½ × 7 × 9 × sin(42°)',
      'Calculate: Area = 31.5 × sin(42°)',
      '31.5 × 0.66913... = 21.077... cm²',
    ],
    finalAnswer: 'Area = 21.1 cm² (3 s.f.)',
    examinerTip: 'Ensure your calculator is strictly in Degree mode (DEG) rather than Radian mode (RAD).',
  },
  {
    id: 'igcse-add-1',
    syllabus: 'IGCSE Additional Mathematics (0606/4037)',
    category: 'igcse-add-math',
    topicTag: 'Calculus: Differentiation & Chain Rule',
    paperRef: '0606 Paper 1 / Add Math',
    titleText: 'Find dy/dx for the curve y = (3x² − 4)⁵. Hence, find the gradient at x = 1.',
    questionNode: (
      <>
        Find <span className="math">dy/dx</span> for the curve <span className="math">y = (3x² − 4)⁵</span>. Hence, find the gradient at <span className="math">x = 1</span>.
      </>
    ),
    steps: [
      'Apply the Chain Rule: dy/dx = n(u)ⁿ⁻¹ × du/dx',
      'Let inner function u = 3x² − 4, then du/dx = 6x',
      'Differentiate outer function: 5(3x² − 4)⁴ × (6x)',
      'Simplify: dy/dx = 30x(3x² − 4)⁴',
      'Substitute x = 1: dy/dx = 30(1) × (3(1)² − 4)⁴ = 30 × (−1)⁴ = 30 × 1 = 30',
    ],
    finalAnswer: "dy/dx = 30x(3x² − 4)⁴; Gradient at x = 1 is 30",
    examinerTip: 'Remember (−1)⁴ is positive 1. A common sign error here costs the final accuracy mark.',
  },
  {
    id: 'igcse-add-2',
    syllabus: 'IGCSE Additional Mathematics (0606/4037)',
    category: 'igcse-add-math',
    topicTag: 'Logarithmic & Exponential Equations',
    paperRef: '0606 Paper 2 / Add Math',
    titleText: 'Solve the logarithmic equation log₂(x) + log₂(x − 2) = 3.',
    questionNode: (
      <>
        Solve the logarithmic equation <span className="math">log₂(x) + log₂(x − 2) = 3</span>.
      </>
    ),
    steps: [
      'Combine using log product law: log₂[x(x − 2)] = 3',
      'Convert from logarithmic to exponential form: x(x − 2) = 2³ = 8',
      'Expand into quadratic form: x² − 2x − 8 = 0',
      'Factorise: (x − 4)(x + 2) = 0 ⇒ x = 4 or x = −2',
      'Check domains: log₂(x) requires x &gt; 0, so x = −2 is extraneous and rejected.',
    ],
    finalAnswer: 'x = 4 only',
    examinerTip: 'Examiners award mark deduction if invalid extraneous negative arguments in log functions are not explicitly rejected.',
  },
  {
    id: 'igcse-add-3',
    syllabus: 'IGCSE Additional Mathematics (0606/4037)',
    category: 'igcse-add-math',
    topicTag: 'Trigonometric Identities & Equations',
    paperRef: '0606 Paper 1 / Add Math',
    titleText: 'Solve 2cos²(θ) − 3sin(θ) − 3 = 0 for 0° ≤ θ ≤ 360°.',
    questionNode: (
      <>
        Solve <span className="math">2cos²(θ) − 3sin(θ) − 3 = 0</span> for <span className="math">0° ≤ θ ≤ 360°</span>.
      </>
    ),
    steps: [
      'Use identity cos²(θ) = 1 − sin²(θ) to write in terms of sin only: 2(1 − sin²(θ)) − 3sin(θ) − 3 = 0',
      'Expand: 2 − 2sin²(θ) − 3sin(θ) − 3 = 0 ⇒ −2sin²(θ) − 3sin(θ) − 1 = 0',
      'Multiply by −1: 2sin²(θ) + 3sin(θ) + 1 = 0',
      'Factorise: (2sin(θ) + 1)(sin(θ) + 1) = 0',
      'Case 1: 2sin(θ) + 1 = 0 ⇒ sin(θ) = −0.5. Reference angle = 30°. Negative in quadrants 3 & 4: θ = 180° + 30° = 210°, θ = 360° − 30° = 330°',
      'Case 2: sin(θ) + 1 = 0 ⇒ sin(θ) = −1 ⇒ θ = 270°',
    ],
    finalAnswer: 'θ = 210°, 270°, 330°',
    examinerTip: 'List all solutions in ascending order within the interval [0°, 360°].',
  },
];

const TOPICS: { id: TopicId; label: string }[] = [
  { id: 'all', label: 'all' },
  { id: 'algebra', label: 'algebra' },
  { id: 'geometry', label: 'geometry' },
  { id: 'trigonometry', label: 'trigonometry' },
  { id: 'calculus', label: 'calculus' },
  { id: 'statistics', label: 'statistics' },
];

const IGCSE_FILTERS: { id: IgcseFilterId; label: string }[] = [
  { id: 'all', label: 'all IGCSE' },
  { id: 'igcse-core-extended', label: 'IGCSE Math (0580)' },
  { id: 'igcse-add-math', label: 'Add Math (0606)' },
];

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<TopicId>('all');
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});
  const [igcseFilter, setIgcseFilter] = useState<IgcseFilterId>('all');

  const toggleCard = (id: string) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProblems = PROBLEMS.filter((problem) => {
    const matchesTopic = activeTopic === 'all' || problem.topic === activeTopic;
    if (!matchesTopic) return false;

    if (!normalizedQuery) return true;
    return problem.titleText.toLowerCase().includes(normalizedQuery);
  });

  const filteredIgcseProblems = IGCSE_PROBLEMS.filter((problem) => {
    const matchesCategory = igcseFilter === 'all' || problem.category === igcseFilter;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;
    return (
      problem.titleText.toLowerCase().includes(normalizedQuery) ||
      problem.topicTag.toLowerCase().includes(normalizedQuery) ||
      problem.paperRef.toLowerCase().includes(normalizedQuery)
    );
  });

  const totalResults = filteredProblems.length + filteredIgcseProblems.length;

  return (
    <>
      {/* Header */}
      <header id="main-header">
        <div className="wrap brand">
          <div className="brand-name" id="brand-logo">
            found<span>math</span>
          </div>
          <nav id="main-nav">
            <a href="#how" id="nav-how-it-works">How it works</a>
            <a href="#problems" id="nav-problems">Problems</a>
            <a href="#igcse-section" id="nav-igcse">IGCSE &amp; Add Math</a>
          </nav>
        </div>
      </header>

      {/* Main Content Landmark for SEO */}
      <main id="main-content">
        {/* Hero */}
        <section className="hero" id="hero-section" aria-labelledby="hero-heading">
          <div
            className="wrap"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            <div>
              <h1 id="hero-heading">Math, found.</h1>
              <p>
                Real problems, worked out one step at a time, so the method finally makes sense — not just the answer.
              </p>
              <div className="cta-row">
                <a href="#problems" className="btn btn-primary" id="btn-try-problem">
                  Try a problem
                </a>
                <a href="#how" className="btn btn-ghost" id="btn-see-how">
                  See how it works
                </a>
              </div>
            </div>
            <div className="hero-figure">
              <svg
                viewBox="0 0 300 260"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Mathematical parabola and geometric altitude graph"
              >
                <path className="draw-path" d="M20 210 C 60 40, 120 40, 150 130 S 260 220, 280 60" />
                <path className="draw-path accent" d="M40 230 L 260 230" />
                <path className="draw-path accent" d="M150 130 L 150 230" />
              </svg>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="how" id="how" aria-labelledby="how-heading">
          <div className="wrap">
            <h2 className="section-label" id="how-heading">How it works</h2>
            <div className="how-grid">
              <div className="how-item" id="how-step-1">
                <div className="num">01</div>
                <h3>Pick a topic</h3>
                <p>Filter problems by algebra, geometry, trigonometry, calculus, or statistics.</p>
              </div>
              <div className="how-item" id="how-step-2">
                <div className="num">02</div>
                <h3>Try it yourself</h3>
                <p>Work through the problem before looking — that's where the learning happens.</p>
              </div>
              <div className="how-item" id="how-step-3">
                <div className="num">03</div>
                <h3>Reveal the solution</h3>
                <p>See every step laid out, so you can find exactly where your approach differs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="topics" id="problems" aria-labelledby="problems-heading">
          <div className="wrap">
            <h2 className="section-label" id="problems-heading">Problems</h2>

            {/* Real-Time Search Bar */}
            <div className="search-container" id="problems-search-container">
              <div className="search-input-wrapper">
                <span className="search-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="problem-search-input"
                  className="search-input"
                  placeholder="Search problems by keyword (e.g., quadratic, factor, derivative, angle)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search problems in standard and IGCSE curriculum"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    id="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search input"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>

              {searchQuery && (
                <div className="search-status-bar" id="search-status-bar">
                  <span>
                    Found <span className="search-count">{totalResults}</span> matching question{totalResults === 1 ? '' : 's'} across curricula
                  </span>
                  <span>
                    ({filteredProblems.length} standard, {filteredIgcseProblems.length} IGCSE)
                  </span>
                </div>
              )}
            </div>
            
            {/* Topic Pills */}
            <nav className="topic-pills" id="pillRow" aria-label="Filter problems by mathematics topic">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  id={`pill-${topic.id}`}
                  className={`pill ${activeTopic === topic.id ? 'active' : ''}`}
                  data-topic={topic.id}
                  aria-pressed={activeTopic === topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                >
                  {topic.label}
                </button>
              ))}
            </nav>

            {/* Problem cards */}
            <div className="problems" id="problemList">
              {filteredProblems.length === 0 ? (
                <div className="no-results-box" id="no-standard-results">
                  <p className="no-results-title">No standard problems matched</p>
                  <p className="no-results-desc">
                    {searchQuery
                      ? `No problems found in "${activeTopic}" matching "${searchQuery}". Check the IGCSE section below or adjust your search.`
                      : `No problems currently available under this topic.`}
                  </p>
                  {searchQuery && (
                    <button
                      type="button"
                      className="no-results-reset-btn"
                      onClick={() => {
                        setSearchQuery('');
                        setActiveTopic('all');
                      }}
                    >
                      Clear search &amp; filters
                    </button>
                  )}
                </div>
              ) : (
                filteredProblems.map((problem) => {
                  const isOpen = !!openCards[problem.id];
                  return (
                    <article
                      key={problem.id}
                      id={`card-${problem.id}`}
                      className={`card ${isOpen ? 'open' : ''}`}
                      data-topic={problem.topic}
                      aria-labelledby={`question-title-${problem.id}`}
                    >
                      <div
                        className="card-top"
                        onClick={() => toggleCard(problem.id)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-controls={`solution-${problem.id}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleCard(problem.id);
                          }
                        }}
                      >
                        <div>
                          <p className="card-meta">{problem.topic}</p>
                          <h3 className="card-question" id={`question-title-${problem.id}`}>
                            {problem.questionNode}
                          </h3>
                        </div>
                        <button
                          type="button"
                          id={`btn-toggle-${problem.id}`}
                          className="reveal-btn"
                          aria-expanded={isOpen}
                          aria-controls={`solution-${problem.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCard(problem.id);
                          }}
                        >
                          {isOpen ? 'Hide solution' : 'Show solution'}
                        </button>
                      </div>

                      <div
                        className="solution"
                        id={`solution-${problem.id}`}
                        aria-hidden={!isOpen}
                      >
                        <ol>
                          {problem.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                          <li className="final">{problem.finalAnswer}</li>
                        </ol>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* IGCSE Math and Add Math Section */}
        <section className="igcse-section" id="igcse-section" aria-labelledby="igcse-heading">
          <div className="wrap">
            <h2 className="section-label" id="igcse-heading">IGCSE Math &amp; Add Math</h2>
            <p className="section-sub">
              Exam-style worked questions tailored to Cambridge IGCSE Mathematics (0580/0980) and Additional Mathematics (0606/4037), featuring step-by-step methods and examiner tips.
            </p>

            {/* IGCSE Filter Pills */}
            <nav className="topic-pills" id="igcsePillRow" aria-label="Filter IGCSE problems by syllabus">
              {IGCSE_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  id={`igcse-pill-${filter.id}`}
                  className={`pill ${igcseFilter === filter.id ? 'active' : ''}`}
                  data-filter={filter.id}
                  aria-pressed={igcseFilter === filter.id}
                  onClick={() => setIgcseFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </nav>

            {/* IGCSE Problem Cards */}
            <div className="problems" id="igcseProblemList">
              {filteredIgcseProblems.length === 0 ? (
                <div className="no-results-box" id="no-igcse-results">
                  <p className="no-results-title">No IGCSE problems matched</p>
                  <p className="no-results-desc">
                    {searchQuery
                      ? `No IGCSE or Add Math questions matching "${searchQuery}". Try a different keyword or clear your search.`
                      : `No questions found under this IGCSE category.`}
                  </p>
                  {searchQuery && (
                    <button
                      type="button"
                      className="no-results-reset-btn"
                      onClick={() => {
                        setSearchQuery('');
                        setIgcseFilter('all');
                      }}
                    >
                      Clear search &amp; filters
                    </button>
                  )}
                </div>
              ) : (
                filteredIgcseProblems.map((problem) => {
                  const isOpen = !!openCards[problem.id];
                  const isAddMath = problem.category === 'igcse-add-math';
                  return (
                    <article
                      key={problem.id}
                      id={`card-${problem.id}`}
                      className={`card ${isOpen ? 'open' : ''}`}
                      data-category={problem.category}
                      aria-labelledby={`igcse-title-${problem.id}`}
                    >
                      <div
                        className="card-top"
                        onClick={() => toggleCard(problem.id)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-controls={`solution-${problem.id}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleCard(problem.id);
                          }
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                            <span className={`badge-tag ${isAddMath ? 'add-math' : ''}`}>
                              {isAddMath ? 'Add Math (0606)' : 'IGCSE Math (0580)'}
                            </span>
                            <span className="card-meta" style={{ margin: 0 }}>
                              {problem.topicTag}
                            </span>
                            <span className="paper-ref">• {problem.paperRef}</span>
                          </div>
                          <h3 className="card-question" id={`igcse-title-${problem.id}`}>
                            {problem.questionNode}
                          </h3>
                        </div>
                        <button
                          type="button"
                          id={`btn-toggle-${problem.id}`}
                          className="reveal-btn"
                          aria-expanded={isOpen}
                          aria-controls={`solution-${problem.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCard(problem.id);
                          }}
                        >
                          {isOpen ? 'Hide solution' : 'Show solution'}
                        </button>
                      </div>

                      <div
                        className="solution"
                        id={`solution-${problem.id}`}
                        aria-hidden={!isOpen}
                      >
                        <ol>
                          {problem.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                          <li className="final">{problem.finalAnswer}</li>
                        </ol>

                        {problem.examinerTip && (
                          <div className="examiner-tip" id={`tip-${problem.id}`}>
                            <span className="examiner-tip-label">Examiner Tip:</span>
                            <span>{problem.examinerTip}</span>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="main-footer">
        <div
          className="wrap"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p id="footer-tagline">found math — worked problems, one step at a time.</p>
          <p id="footer-notice">New problems added weekly.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
