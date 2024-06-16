const readline = require('readline');

// Konfiguracja interfejsu wczytywania danych od użytkownika
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funkcja rozwiązująca równanie sześcienne
function solveCubicEquation(a, b, c, d) {
  if (a === 0) {
    console.log("a nie może być równe 0.");
    return [];
  }

  function cubicRoot(x) {
    return x < 0 ? -Math.pow(-x, 1 / 3) : Math.pow(x, 1 / 3);
  }

  const f = ((3 * c / a) - (b * b / (a * a))) / 3;
  const g = ((2 * b * b * b / (a * a * a)) - (9 * b * c / (a * a)) + (27 * d / a)) / 27;
  const h = g * g / 4 + f * f * f / 27;

  if (h > 0) {
    const R = -(g / 2) + Math.sqrt(h);
    const S = cubicRoot(R);
    const T = -(g / 2) - Math.sqrt(h);
    const U = cubicRoot(T);

    const realRoot = S + U - b / (3 * a);
    return [realRoot];
  } else if (f === 0 && g === 0 && h === 0) {
    const realRoot = cubicRoot(d / a);
    return [realRoot];
  } else {
    const i = Math.sqrt((g * g / 4) - h);
    const j = cubicRoot(i);
    const k = Math.acos(-(g / (2 * i)));
    const L = -j;
    const M = Math.cos(k / 3);
    const N = Math.sqrt(3) * Math.sin(k / 3);
    const P = -b / (3 * a);

    const root1 = 2 * j * Math.cos(k / 3) - b / (3 * a);
    const root2 = L * (M + N) + P;
    const root3 = L * (M - N) + P;

    return [root1, root2, root3];
  }
}

// Funkcja obliczająca liczbę pi metodą Monte Carlo
function calculatePiMonteCarlo(points) {
  let pointsInCircle = 0;

  for (let i = 0; i < points; i++) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;

    if (x * x + y * y <= 1) {
      pointsInCircle++;
    }
  }

  return 4 * pointsInCircle / points;
}

// Menu główne
function mainMenu() {
  rl.question("Wybierz opcję:\n1. Oblicz równanie sześcienne\n2. Oblicz liczbę pi metodą Monte Carlo\n", (choice) => {
    if (choice === '1') {
      rl.question("Podaj współczynniki a, b, c, d oddzielone spacją: ", (coeffs) => {
        const [a, b, c, d] = coeffs.split(' ').map(Number);
        const roots = solveCubicEquation(a, b, c, d);
        console.log("Pierwiastki równania:", roots);
        rl.close();
      });
    } else if (choice === '2') {
      rl.question("Podaj liczbę losowanych punktów: ", (points) => {
        const piApproximation = calculatePiMonteCarlo(Number(points));
        console.log(`Przybliżona wartość liczby pi: ${piApproximation}`);
        rl.close();
      });
    } else {
      console.log("Nieprawidłowy wybór. Spróbuj ponownie.");
      mainMenu();
    }
  });
}

if (require.main === module) {
  mainMenu();
}

module.exports = { solveCubicEquation, calculatePiMonteCarlo };
