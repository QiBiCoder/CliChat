import { MathProblem, MathTopic, Difficulty, SolutionStep } from '../types';

// Helper for random integers in range [min, max]
function randInt(min: number, max: number, avoidZero = true): number {
  let val = Math.floor(Math.random() * (max - min + 1)) + min;
  if (avoidZero && val === 0) {
    val = Math.random() > 0.5 ? 1 : -1;
  }
  return val;
}

// Helper to format sign + number e.g. "+ 5" or "- 3"
function formatSigned(n: number): string {
  if (n >= 0) return `+ ${n}`;
  return `- ${Math.abs(n)}`;
}

// Generate Linear Equations
function generateLinear(difficulty: Difficulty): MathProblem {
  const id = `gen-lin-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  
  if (difficulty === 'easy') {
    // ax + b = c
    const a = randInt(2, 7);
    const x = randInt(-10, 10);
    const b = randInt(-15, 15);
    const c = a * x + b;
    
    const eqLatex = `${a}x ${formatSigned(b)} = ${c}`;
    const steps: SolutionStep[] = [
      {
        stepNumber: 1,
        title: 'Subtract the constant term from both sides',
        latex: `${a}x = ${c} ${b >= 0 ? `- ${b}` : `+ ${Math.abs(b)}`} \\implies ${a}x = ${c - b}`,
        explanation: `Isolate the variable term ${a}x by performing the inverse operation on ${formatSigned(b)}.`,
      },
      {
        stepNumber: 2,
        title: 'Divide both sides by the coefficient of x',
        latex: `x = \\frac{${c - b}}{${a}} \\implies x = ${x}`,
        explanation: `Divide both sides by ${a} to solve for x.`,
      },
      {
        stepNumber: 3,
        title: 'Check the solution',
        latex: `${a}(${x}) ${formatSigned(b)} = ${a * x} ${formatSigned(b)} = ${c}`,
        explanation: `Substitute x = ${x} back into the original equation to verify that the left side equals ${c}.`,
      },
    ];

    return {
      id,
      title: 'Solve Linear Equation',
      topic: 'linear-equations',
      difficulty: 'easy',
      latex: eqLatex,
      questionText: `Solve the linear equation for $x$:`,
      hints: [
        `First isolate the term containing $x$ by adding or subtracting the constant.`,
        `Then divide both sides by the coefficient of $x$.`,
      ],
      finalAnswer: `x = ${x}`,
      acceptableAnswers: [`${x}`, `x=${x}`, `x = ${x}`],
      steps,
      tags: ['Linear Equations', 'One-Variable', 'Algebra 1'],
      isGenerated: true,
      timestamp: Date.now(),
    };
  } else if (difficulty === 'medium') {
    // ax + b = cx + d
    const x = randInt(-9, 9);
    let a = randInt(2, 8);
    let c = randInt(2, 8);
    while (a === c) {
      c = randInt(2, 8);
    }
    const b = randInt(-20, 20);
    const d = (a - c) * x + b;
    
    const eqLatex = `${a}x ${formatSigned(b)} = ${c}x ${formatSigned(d)}`;
    const steps: SolutionStep[] = [
      {
        stepNumber: 1,
        title: 'Collect variable terms on the left side',
        latex: `(${a} - ${c})x ${formatSigned(b)} = ${d} \\implies ${a - c}x ${formatSigned(b)} = ${d}`,
        explanation: `Subtract ${c}x from both sides of the equation.`,
      },
      {
        stepNumber: 2,
        title: 'Collect constant terms on the right side',
        latex: `${a - c}x = ${d} ${b >= 0 ? `- ${b}` : `+ ${Math.abs(b)}`} \\implies ${a - c}x = ${d - b}`,
        explanation: `Subtract ${b} from both sides to leave only the variable term on the left.`,
      },
      {
        stepNumber: 3,
        title: 'Divide by the remaining coefficient',
        latex: `x = \\frac{${d - b}}{${a - c}} \\implies x = ${x}`,
        explanation: `Divide both sides by ${a - c} to find the final value of x.`,
      },
    ];

    return {
      id,
      title: 'Variables on Both Sides',
      topic: 'linear-equations',
      difficulty: 'medium',
      latex: eqLatex,
      questionText: `Solve the multi-step linear equation for $x$:`,
      hints: [
        `Move all $x$ terms to one side of the equation and all constants to the other side.`,
        `Combine like terms, then divide by the coefficient of $x$.`,
      ],
      finalAnswer: `x = ${x}`,
      acceptableAnswers: [`${x}`, `x=${x}`, `x = ${x}`],
      steps,
      tags: ['Linear Equations', 'Variables on Both Sides', 'Multi-Step'],
      isGenerated: true,
      timestamp: Date.now(),
    };
  } else {
    // Hard / Challenge: a(x + b) - c(x - d) = k
    const x = randInt(-8, 8);
    const a = randInt(2, 5);
    const c = randInt(2, 4);
    const b = randInt(1, 6);
    const d = randInt(1, 6);
    const k = a * (x + b) - c * (x - d);

    const eqLatex = `${a}(x ${formatSigned(b)}) - ${c}(x ${formatSigned(-d)}) = ${k}`;
    const steps: SolutionStep[] = [
      {
        stepNumber: 1,
        title: 'Apply the Distributive Property',
        latex: `${a}x + ${a * b} - ${c}x + ${c * d} = ${k}`,
        explanation: `Expand the parentheses: distribute ${a} across (x + ${b}) and distribute -${c} across (x - ${d}). Remember that -${c} \\times (-${d}) = +${c * d}.`,
      },
      {
        stepNumber: 2,
        title: 'Combine Like Terms on the left side',
        latex: `(${a} - ${c})x + (${a * b} + ${c * d}) = ${k} \\implies ${a - c}x + ${a * b + c * d} = ${k}`,
        explanation: `Group the $x$ terms and constants together.`,
      },
      {
        stepNumber: 3,
        title: 'Isolate the variable term and solve',
        latex: `${a - c}x = ${k} - ${a * b + c * d} = ${k - (a * b + c * d)} \\implies x = \\frac{${k - (a * b + c * d)}}{${a - c}} = ${x}`,
        explanation: `Subtract the constant term, then divide by ${a - c}.`,
      },
    ];

    return {
      id,
      title: 'Distributive & Multi-Step Linear Equation',
      topic: 'linear-equations',
      difficulty: difficulty === 'challenge' ? 'challenge' : 'hard',
      latex: eqLatex,
      questionText: `Solve the multi-step algebraic equation involving parentheses:`,
      hints: [
        `Distribute the numbers outside the parentheses first, paying close attention to negative signs.`,
        `Combine like terms before isolating the variable.`,
      ],
      finalAnswer: `x = ${x}`,
      acceptableAnswers: [`${x}`, `x=${x}`, `x = ${x}`],
      steps,
      tags: ['Distributive Property', 'Combining Like Terms', 'Algebra 1'],
      isGenerated: true,
      timestamp: Date.now(),
    };
  }
}

// Generate Quadratic Equations
function generateQuadratic(difficulty: Difficulty): MathProblem {
  const id = `gen-quad-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  
  if (difficulty === 'easy' || difficulty === 'medium') {
    // Factorable quadratic: (x - r1)(x - r2) = 0
    let r1 = randInt(-7, 7);
    let r2 = randInt(-7, 7);
    while (r1 === r2) {
      r2 = randInt(-7, 7);
    }
    
    const B = -(r1 + r2);
    const C = r1 * r2;
    
    const eqLatex = `x^2 ${formatSigned(B)}x ${formatSigned(C)} = 0`;
    const factor1 = `(x ${formatSigned(-r1)})`;
    const factor2 = `(x ${formatSigned(-r2)})`;

    const sortedRoots = [r1, r2].sort((a, b) => a - b);
    const finalAnswerStr = `x = ${sortedRoots[0]}, ${sortedRoots[1]}`;
    const acceptable = [
      `${sortedRoots[0]}, ${sortedRoots[1]}`,
      `${sortedRoots[1]}, ${sortedRoots[0]}`,
      `x = ${sortedRoots[0]}, x = ${sortedRoots[1]}`,
      `x=${sortedRoots[0]}, ${sortedRoots[1]}`,
      `x=${sortedRoots[0]},x=${sortedRoots[1]}`,
      `${sortedRoots[0]} and ${sortedRoots[1]}`,
    ];

    const steps: SolutionStep[] = [
      {
        stepNumber: 1,
        title: 'Find two numbers that multiply to C and add to B',
        latex: `\\text{Find } p, q \\text{ such that: } p \\cdot q = ${C} \\quad \\text{and} \\quad p + q = ${B}`,
        explanation: `The two integers are ${-r1} and ${-r2}, because (${-r1}) \\times (${-r2}) = ${C} and (${-r1}) + (${-r2}) = ${B}.`,
      },
      {
        stepNumber: 2,
        title: 'Rewrite in factored form',
        latex: `${factor1}${factor2} = 0`,
        explanation: `Factor the monic quadratic into two binomials.`,
      },
      {
        stepNumber: 3,
        title: 'Apply the Zero Product Property',
        latex: `x ${formatSigned(-r1)} = 0 \\implies x = ${r1} \\quad \\text{or} \\quad x ${formatSigned(-r2)} = 0 \\implies x = ${r2}`,
        explanation: `Set each factor equal to zero and solve for x.`,
      },
    ];

    return {
      id,
      title: 'Solve Quadratic by Factoring',
      topic: 'quadratic-equations',
      difficulty,
      latex: eqLatex,
      questionText: `Solve the quadratic equation by factoring:`,
      hints: [
        `Look for two numbers whose product is ${C} and whose sum is ${B}.`,
        `Factor into the form $(x - r_1)(x - r_2) = 0$, then set each factor to 0.`,
      ],
      finalAnswer: finalAnswerStr,
      acceptableAnswers: acceptable,
      steps,
      tags: ['Quadratics', 'Factoring', 'Zero Product Property'],
      isGenerated: true,
      timestamp: Date.now(),
    };
  } else {
    // Hard / Challenge: ax^2 + bx + c = 0 with a > 1 or Quadratic Formula
    const a = randInt(2, 3);
    const r1 = randInt(-5, 5);
    const r2 = randInt(-4, 4);
    
    // (a x - a*r1) or (a x + p)(x + q)
    const p = randInt(-5, 5);
    const q = randInt(-5, 5);
    // (a x + p)(x + q) = a x^2 + (a q + p)x + p q
    const B = a * q + p;
    const C = p * q;

    const root1 = -p / a;
    const root2 = -q;
    const disc = B * B - 4 * a * C;

    const eqLatex = `${a}x^2 ${formatSigned(B)}x ${formatSigned(C)} = 0`;

    const steps: SolutionStep[] = [
      {
        stepNumber: 1,
        title: 'Identify coefficients for Quadratic Formula',
        latex: `a = ${a}, \\quad b = ${B}, \\quad c = ${C}`,
        explanation: `The equation is in standard form $ax^2 + bx + c = 0$.`,
      },
      {
        stepNumber: 2,
        title: 'Calculate the Discriminant',
        latex: `\\Delta = b^2 - 4ac = (${B})^2 - 4(${a})(${C}) = ${B * B} - (${4 * a * C}) = ${disc}`,
        explanation: `Since the discriminant is positive, there are two distinct real solutions.`,
      },
      {
        stepNumber: 3,
        title: 'Substitute into Quadratic Formula',
        latex: `x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{-(${B}) \\pm \\sqrt{${disc}}}{2(${a})}`,
        explanation: `Evaluate the two roots: $x = \\frac{${-B} \\pm ${Math.sqrt(disc)}}{${2 * a}}$.`,
      },
      {
        stepNumber: 4,
        title: 'Simplify each root',
        latex: `x_1 = ${root1 % 1 === 0 ? root1 : `-\\frac{${p}}{${a}}`}, \\quad x_2 = ${root2}`,
        explanation: `The solutions are verified.`,
      },
    ];

    const ansStr = `x = ${root1 % 1 === 0 ? root1 : `-${p}/${a}`}, ${root2}`;

    return {
      id,
      title: 'Quadratic Equation (a > 1)',
      topic: 'quadratic-equations',
      difficulty: 'hard',
      latex: eqLatex,
      questionText: `Solve the quadratic equation using the quadratic formula or factoring:`,
      hints: [
        `Use the quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.`,
        `Calculate the discriminant $b^2 - 4ac$ first.`,
      ],
      finalAnswer: ansStr,
      acceptableAnswers: [
        `${root1}, ${root2}`,
        `${root2}, ${root1}`,
        `x=${root1}, ${root2}`,
      ],
      steps,
      tags: ['Quadratic Formula', 'Non-monic Quad', 'Discriminant'],
      isGenerated: true,
      timestamp: Date.now(),
    };
  }
}

// Generate Systems of Linear Equations
function generateSystem(difficulty: Difficulty): MathProblem {
  const id = `gen-sys-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const x = randInt(-6, 6);
  const y = randInt(-6, 6);

  const a1 = randInt(1, 4);
  const b1 = randInt(1, 4);
  const c1 = a1 * x + b1 * y;

  let a2 = randInt(1, 4);
  let b2 = randInt(-4, -1);
  // ensure determinant a1*b2 - a2*b1 != 0
  while (a1 * b2 - a2 * b1 === 0) {
    b2 = randInt(-4, -1);
  }
  const c2 = a2 * x + b2 * y;

  const eqLatex = `\\begin{cases} ${a1 === 1 ? '' : a1}x ${formatSigned(b1)}y = ${c1} \\\\[6pt] ${a2 === 1 ? '' : a2}x ${formatSigned(b2)}y = ${c2} \\end{cases}`;

  const steps: SolutionStep[] = [
    {
      stepNumber: 1,
      title: 'Select an elimination or substitution strategy',
      latex: `\\text{Eq (1): } ${a1 === 1 ? '' : a1}x ${formatSigned(b1)}y = ${c1}, \\quad \\text{Eq (2): } ${a2 === 1 ? '' : a2}x ${formatSigned(b2)}y = ${c2}`,
      explanation: `We have a system of two linear equations with variables $x$ and $y$.`,
    },
    {
      stepNumber: 2,
      title: 'Eliminate one variable',
      latex: `\\text{Multiply equations to align coefficients of } y \\text{ and add them together.}`,
      explanation: `By multiplying appropriately and adding the equations, the $y$ terms cancel out, allowing us to solve directly for $x$.`,
    },
    {
      stepNumber: 3,
      title: 'Solve for x',
      latex: `x = ${x}`,
      explanation: `Evaluating the simplified single-variable equation gives $x = ${x}$.`,
    },
    {
      stepNumber: 4,
      title: 'Back-substitute to find y',
      latex: `${a1}(${x}) ${formatSigned(b1)}y = ${c1} \\implies ${b1}y = ${c1 - a1 * x} \\implies y = ${y}`,
      explanation: `Substitute $x = ${x}$ back into Equation (1) to find $y = ${y}$.`,
    },
  ];

  return {
    id,
    title: 'System of Two Linear Equations',
    topic: 'systems-of-equations',
    difficulty,
    latex: eqLatex,
    questionText: `Solve the system of linear equations for $(x, y)$:`,
    hints: [
      `You can use the elimination method by adding or subtracting multiples of the equations.`,
      `Alternatively, isolate one variable in an equation and substitute it into the other.`,
    ],
    finalAnswer: `(${x}, ${y})`,
    acceptableAnswers: [
      `(${x}, ${y})`,
      `(${x},${y})`,
      `x=${x}, y=${y}`,
      `x=${x},y=${y}`,
      `x = ${x}, y = ${y}`,
    ],
    steps,
    tags: ['Systems of Equations', 'Elimination Method', 'Substitution', 'Linear Algebra'],
    isGenerated: true,
    timestamp: Date.now(),
  };
}

// Generate Polynomial Factoring
function generateFactoring(difficulty: Difficulty): MathProblem {
  const id = `gen-fact-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  
  if (difficulty === 'easy') {
    // Difference of squares: a^2 x^2 - b^2
    const a = randInt(1, 5);
    const b = randInt(2, 9);
    const a2 = a * a;
    const b2 = b * b;
    
    const exprLatex = `${a2 === 1 ? '' : a2}x^2 - ${b2}`;
    const factoredLatex = `(${a === 1 ? '' : a}x - ${b})(${a === 1 ? '' : a}x + ${b})`;

    const steps: SolutionStep[] = [
      {
        stepNumber: 1,
        title: 'Recognize the Difference of Two Squares pattern',
        latex: `A^2 - B^2 = (A - B)(A + B)`,
        explanation: `Both terms are perfect squares: ${a2 === 1 ? 'x^2' : `${a2}x^2`} = (${a === 1 ? 'x' : `${a}x`})^2 and ${b2} = ${b}^2.`,
      },
      {
        stepNumber: 2,
        title: 'Apply the factoring formula',
        latex: `(${a === 1 ? 'x' : `${a}x`})^2 - (${b})^2 = ${factoredLatex}`,
        explanation: `Substitute $A = ${a === 1 ? 'x' : `${a}x`}$ and $B = ${b}$ into $(A - B)(A + B)$.`,
      },
    ];

    return {
      id,
      title: 'Factor Difference of Two Squares',
      topic: 'polynomials-factoring',
      difficulty: 'easy',
      latex: exprLatex,
      questionText: `Factor the polynomial completely:`,
      hints: [
        `Recognize this as a difference of squares: $A^2 - B^2 = (A - B)(A + B)$.`,
        `Take the square root of both terms.`,
      ],
      finalAnswer: factoredLatex,
      acceptableAnswers: [
        factoredLatex,
        `(${a === 1 ? '' : a}x + ${b})(${a === 1 ? '' : a}x - ${b})`,
      ],
      steps,
      tags: ['Factoring', 'Difference of Squares', 'Polynomials'],
      isGenerated: true,
      timestamp: Date.now(),
    };
  } else {
    // Factoring trinomial x^2 + bx + c
    const p = randInt(-8, 8);
    let q = randInt(-8, 8);
    while (q === p) q = randInt(-8, 8);

    const b = p + q;
    const c = p * q;
    const exprLatex = `x^2 ${formatSigned(b)}x ${formatSigned(c)}`;
    const factoredLatex = `(x ${formatSigned(p)})(x ${formatSigned(q)})`;

    const steps: SolutionStep[] = [
      {
        stepNumber: 1,
        title: 'Find two integers with product c and sum b',
        latex: `\\text{Product } = ${c}, \\quad \\text{Sum } = ${b}`,
        explanation: `The two integers are ${p} and ${q}, since (${p})(${q}) = ${c} and ${p} + ${q} = ${b}.`,
      },
      {
        stepNumber: 2,
        title: 'Write in factored binomial form',
        latex: `${factoredLatex}`,
        explanation: `Express the quadratic trinomial as a product of two binomials.`,
      },
    ];

    return {
      id,
      title: 'Factor Trinomial',
      topic: 'polynomials-factoring',
      difficulty,
      latex: exprLatex,
      questionText: `Factor the quadratic trinomial completely:`,
      hints: [
        `Find two numbers whose product is ${c} and whose sum is ${b}.`,
      ],
      finalAnswer: factoredLatex,
      acceptableAnswers: [
        factoredLatex,
        `(x ${formatSigned(q)})(x ${formatSigned(p)})`,
      ],
      steps,
      tags: ['Factoring Trinomials', 'Polynomials', 'Algebra 1'],
      isGenerated: true,
      timestamp: Date.now(),
    };
  }
}

// Generate Linear Inequalities
function generateInequality(difficulty: Difficulty): MathProblem {
  const id = `gen-ineq-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const a = randInt(2, 6);
  const x = randInt(-8, 8);
  const b = randInt(-12, 12);
  const c = a * x + b;
  const symbols = ['<', '\\le', '>', '\\ge'];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];

  const ineqLatex = `${-a}x ${formatSigned(b)} ${symbol} ${c - 2 * a * x}`;

  // Let's create a clean one: -a x + b <= c
  const cleanLatex = `-${a}x ${formatSigned(b)} ${symbol} ${c}`;
  // -a x <= c - b
  // x >= (c - b) / -a (flips symbol)
  const flippedSymbol: Record<string, string> = {
    '<': '>',
    '\\le': '\\ge',
    '>': '<',
    '\\ge': '\\le',
  };
  const finalSym = flippedSymbol[symbol] || '>';
  const finalVal = Math.round((c - b) / -a);

  const steps: SolutionStep[] = [
    {
      stepNumber: 1,
      title: 'Subtract the constant from both sides',
      latex: `-${a}x ${symbol} ${c} - (${b}) \\implies -${a}x ${symbol} ${c - b}`,
      explanation: `Isolate the variable term on the left side of the inequality.`,
    },
    {
      stepNumber: 2,
      title: 'Divide by negative coefficient and reverse the inequality sign',
      latex: `x ${finalSym} \\frac{${c - b}}{-${a}} \\implies x ${finalSym} ${finalVal}`,
      explanation: `Important rule: When dividing or multiplying an inequality by a negative number (-${a}), you must FLIP the direction of the inequality sign.`,
    },
  ];

  return {
    id,
    title: 'Multi-Step Linear Inequality',
    topic: 'inequalities',
    difficulty,
    latex: cleanLatex,
    questionText: `Solve the inequality for $x$ and state the solution:`,
    hints: [
      `Isolate the term with $x$ first.`,
      `Remember to flip the inequality sign whenever you multiply or divide by a negative number!`,
    ],
    finalAnswer: `x ${finalSym} ${finalVal}`,
    acceptableAnswers: [
      `x ${finalSym} ${finalVal}`,
      `x${finalSym}${finalVal}`,
    ],
    steps,
    tags: ['Inequalities', 'Negative Coefficients', 'Sign Flip Rule'],
    isGenerated: true,
    timestamp: Date.now(),
  };
}

// Master generator function
export function generateMathProblem(
  topic: MathTopic = 'all',
  difficulty: Difficulty = 'medium'
): MathProblem {
  let selectedTopic = topic;
  if (topic === 'all') {
    const topics: MathTopic[] = [
      'linear-equations',
      'quadratic-equations',
      'systems-of-equations',
      'polynomials-factoring',
      'inequalities',
    ];
    selectedTopic = topics[Math.floor(Math.random() * topics.length)];
  }

  switch (selectedTopic) {
    case 'linear-equations':
      return generateLinear(difficulty);
    case 'quadratic-equations':
      return generateQuadratic(difficulty);
    case 'systems-of-equations':
      return generateSystem(difficulty);
    case 'polynomials-factoring':
      return generateFactoring(difficulty);
    case 'inequalities':
      return generateInequality(difficulty);
    default:
      return generateLinear(difficulty);
  }
}

// Batch generator for worksheets
export function generateBatchProblems(
  topic: MathTopic = 'all',
  difficulty: Difficulty = 'medium',
  count = 5
): MathProblem[] {
  const problems: MathProblem[] = [];
  for (let i = 0; i < count; i++) {
    problems.push(generateMathProblem(topic, difficulty));
  }
  return problems;
}
