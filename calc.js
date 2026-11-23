function factorial(n) {
  n = Math.floor(Number(n));
  if (isNaN(n)) throw Error("bad");
  if (n < 0) throw Error("neg");
  if (n > 170) throw Error("big");
  if (n === 0 || n === 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function calcEval(input) {
  if (!input) throw Error("empty");
  let t = String(input).trim().toLowerCase();

  // Words -> symbols
  t = t.replace(/multiplied by/g, "*")
       .replace(/divided by/g, "/")
       .replace(/plus/g, "+")
       .replace(/minus/g, "-")
       .replace(/times/g, "*")
       .replace(/multiply/g, "*")
       .replace(/divide/g, "/")
       .replace(/mod/g, "%")
       .replace(/percent/g, "%")
       .replace(/power/g, "^")
       .replace(/squared/g, "^2")
       .replace(/cubed/g, "^3")
       .replace(/pi/g, "PI");

  // Symbols
  t = t.replace(/×/g, "*").replace(/✕/g, "*").replace(/x/g, "*")
       .replace(/÷/g, "/")
       .replace(/–/g, "-").replace(/—/g, "-")
       .replace(/√/g, "sqrt").replace(/∛/g, "cbrt")
       .replace(/π/g, "PI");

  t = t.replace(/\s+/g, "");
  t = t.replace(/(\d+)x(\d+)/g, "$1*$2");

  // ✅ FIXED: sin/cos/tan now use DEGREES like calculator!
  // sin(30) = 0.5, cos(60) = 0.5, tan(45) = 1
  t = t.replace(/sin\(/g, "Math.sin((Math.PI/180)*(")
       .replace(/cos\(/g, "Math.cos((Math.PI/180)*(")
       .replace(/tan\(/g, "Math.tan((Math.PI/180)*(")
       .replace(/log\(/g, "Math.log10(")
       .replace(/ln\(/g, "Math.log(")
       .replace(/sqrt\(/g, "Math.sqrt(")
       .replace(/cbrt\(/g, "Math.cbrt(")
       .replace(/abs\(/g, "Math.abs(");

  t = t.replace(/PI/g, "Math.PI");

  // sqrt16 -> sqrt(16)
  t = t.replace(/Math\.sqrt(\d+(\.\d+)?)/g, "Math.sqrt($1)")
       .replace(/Math\.cbrt(\d+(\.\d+)?)/g, "Math.cbrt($1)");

  // % -> /100
  t = t.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

  // ^ -> **
  t = t.replace(/\^/g, "**");

  // Factorial: 5! and (2+3)!
  for (let i = 0; i < 5; i++) {
    t = t.replace(/(\d+(\.\d+)?)!/g, "factorial($1)");
    t = t.replace(/\(([^()]+)\)!/g, "factorial(($1))");
  }

  // Auto * : 2(3), 2Math, )(, )2
  t = t.replace(/(\d)(Math\.)/g, "$1*$2")
       .replace(/(\d)\(/g, "$1*(")
       .replace(/\)(\d)/g, ")*$1")
       .replace(/\)\(/g, ")*(");

  // ✅ FIXED: Strict safe check - NO injection!
  if (!/^[0-9+\-*/().% Math\.\*PI!factoriallogsqrtcbrtabsincoetn]+$/.test(t)) throw Error("bad");

  let res = new Function("Math", "factorial", "return (" + t + ")")(Math, factorial);
  if (typeof res !== "number" || !isFinite(res)) throw Error("bad");
  return Math.round(res * 100000000) / 100000000;
}

module.exports = { factorial, calcEval };
