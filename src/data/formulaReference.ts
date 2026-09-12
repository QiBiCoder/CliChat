export interface MathFormula {
  id: string;
  category: string;
  title: string;
  latex: string;
  description: string;
  exampleLatex?: string;
}

export const ALGEBRA_FORMULAS: MathFormula[] = [
  {
    id: 'f-quad',
    category: 'Quadratics',
    title: 'The Quadratic Formula',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    description: 'Solves any quadratic equation in standard form ax² + bx + c = 0. The term b² - 4ac is the discriminant (Δ).',
    exampleLatex: '2x^2 - 4x - 6 = 0 \\implies x = 3, -1',
  },
  {
    id: 'f-diff-sq',
    category: 'Factoring',
    title: 'Difference of Two Squares',
    latex: 'a^2 - b^2 = (a - b)(a + b)',
    description: 'Factors two terms that are perfect squares separated by a minus sign.',
    exampleLatex: '4x^2 - 25 = (2x - 5)(2x + 5)',
  },
  {
    id: 'f-diff-cube',
    category: 'Factoring',
    title: 'Sum & Difference of Cubes',
    latex: 'a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)',
    description: 'Remember the signs with SOAP: Same, Opposite, Always Positive.',
    exampleLatex: 'x^3 - 8 = (x - 2)(x^2 + 2x + 4)',
  },
  {
    id: 'f-slope',
    category: 'Linear & Lines',
    title: 'Slope of a Line',
    latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\Delta y}{\\Delta x}',
    description: 'The rate of change or steepness between two coordinate points (x₁, y₁) and (x₂, y₂).',
    exampleLatex: '(1, 2) \\text{ to } (3, 8) \\implies m = \\frac{8 - 2}{3 - 1} = 3',
  },
  {
    id: 'f-slope-intercept',
    category: 'Linear & Lines',
    title: 'Slope-Intercept Form',
    latex: 'y = mx + b',
    description: 'Linear equation form where m is the slope and (0, b) is the y-intercept.',
  },
  {
    id: 'f-point-slope',
    category: 'Linear & Lines',
    title: 'Point-Slope Form',
    latex: 'y - y_1 = m(x - x_1)',
    description: 'Used to write the equation of a line given a slope m and a point (x₁, y₁).',
  },
  {
    id: 'f-exp-prod',
    category: 'Exponents',
    title: 'Product of Powers Rule',
    latex: 'a^m \\cdot a^n = a^{m + n}',
    description: 'When multiplying terms with the same base, add the exponents together.',
    exampleLatex: 'x^3 \\cdot x^5 = x^{3 + 5} = x^8',
  },
  {
    id: 'f-exp-quot',
    category: 'Exponents',
    title: 'Quotient of Powers Rule',
    latex: '\\frac{a^m}{a^n} = a^{m - n} \\quad (a \\ne 0)',
    description: 'When dividing terms with the same base, subtract the bottom exponent from the top exponent.',
  },
  {
    id: 'f-exp-pow',
    category: 'Exponents',
    title: 'Power of a Power Rule',
    latex: '(a^m)^n = a^{m \\cdot n}',
    description: 'When raising an exponent to another power, multiply the exponents.',
  },
  {
    id: 'f-exp-neg',
    category: 'Exponents & Radicals',
    title: 'Negative & Fractional Exponents',
    latex: 'a^{-n} = \\frac{1}{a^n}, \\quad a^{\\frac{m}{n}} = \\sqrt[n]{a^m}',
    description: 'Negative exponents invert into the denominator; rational exponents represent roots.',
    exampleLatex: '8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4',
  },
  {
    id: 'f-vertex',
    category: 'Quadratics',
    title: 'Vertex of a Parabola',
    latex: 'x_v = -\\frac{b}{2a}, \\quad y_v = f(x_v)',
    description: 'The x-coordinate of the axis of symmetry and extremum point for y = ax² + bx + c.',
  },
];
