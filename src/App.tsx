import React, { useState } from 'react';
import { TopicId } from './types';

interface ProblemItem {
  id: string;
  topic: 'algebra' | 'geometry' | 'trigonometry' | 'calculus' | 'statistics';
  questionNode: React.ReactNode;
  steps: string[];
  finalAnswer: string;
}

const PROBLEMS: ProblemItem[] = [
  {
    id: 'alg-1',
    topic: 'algebra',
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
    id: 'geo-1',
    topic: 'geometry',
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
    questionNode: "Two dice are rolled. What's the probability the sum is 7?",
    steps: [
      'There are 36 equally likely outcomes (6 × 6)',
      '6 of them sum to 7: (1,6) (2,5) (3,4) (4,3) (5,2) (6,1)',
    ],
    finalAnswer: 'P(sum = 7) = 6/36 = 1/6',
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

export function App() {
  const [activeTopic, setActiveTopic] = useState<TopicId>('all');
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProblems = PROBLEMS.filter((problem) => {
    if (activeTopic === 'all') return true;
    return problem.topic === activeTopic;
  });

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
              {filteredProblems.map((problem) => {
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
              })}
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
