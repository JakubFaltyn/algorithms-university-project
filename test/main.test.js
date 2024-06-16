const assert = require('assert');
const { solveCubicEquation, calculatePiMonteCarlo } = require('../main');

describe('solveCubicEquation', function () {
  it('powinno zwrócić trzy rzeczywiste pierwiastki dla równania x^3 - 6x^2 + 11x - 6 = 0', function () {
    const roots = solveCubicEquation(1, -6, 11, -6);
    const expectedRoots = [1, 2, 3].sort((a, b) => a - b);
    assert.deepStrictEqual(roots.sort((a, b) => a - b).map(root => Math.round(root * 1000) / 1000), expectedRoots);
  });

  it('powinno zwrócić jeden rzeczywisty pierwiastek dla równania x^3 + x^2 + x + 1 = 0', function () {
    const roots = solveCubicEquation(1, 1, 1, 1);
    assert.strictEqual(roots.length, 1);
  });

  it('powinno zwrócić jeden rzeczywisty pierwiastek dla równania x^3 = 0', function () {
    const roots = solveCubicEquation(1, 0, 0, 0);
    assert.deepStrictEqual(roots, [0]);
  });
});

describe('calculatePiMonteCarlo', function () {
  it('powinno zwrócić przybliżoną wartość liczby pi dla 1000000 punktów', function () {
    const piApproximation = calculatePiMonteCarlo(1000000);
    assert(piApproximation > 3 && piApproximation < 3.2);
  });

  it('powinno zwrócić przybliżoną wartość liczby pi dla 10000 punktów', function () {
    const piApproximation = calculatePiMonteCarlo(10000);
    assert(piApproximation > 3 && piApproximation < 3.2);
  });

  it('powinno zwrócić przybliżoną wartość liczby pi dla 100 punktów', function () {
    const piApproximation = calculatePiMonteCarlo(100);
    assert(piApproximation > 2 && piApproximation < 4);
  });
});
