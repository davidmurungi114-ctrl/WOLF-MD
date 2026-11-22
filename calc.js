function factorial(n) {
  if (n < 0) throw Error("neg");
  if (n > 170) throw Error("big");
  if (n === 0 || n === 1) return 1;
  let r = 1;
  for (let i = 2; i <= Math.floor(n); i++) r *= i;
  return r;
}
function calcEval(input) {
  let t = input.trim().toLowerCase();
  t = t.replace(/multiplied by/g, "*").replace(/divided by/g, "/").replace(/plus/g, "+").replace(/minus/g, "-").replace(/times/g, "*").replace(/multiply/g, "*").replace(/divide/g, "/").replace(/mod/g, "%").replace(/percent/g, "%").replace(/power/g, "^").replace(/squared/g, "^2").replace(/cubed/g, "^3").replace(/pi/g, "π");
  t = t.replace(/×/g, "*").replace(/✕/g, "*").replace(/÷/g, "/").replace(/:/g, "/").replace(/–/g, "-").replace(/—/g, "-").replace(/,/g, ".").replace(/π/g, "PI").replace(/√/g, "SQRT").replace(/∛/g, "CBRT");
  t = t.replace(/\s+/g, "");
  t = t.replace(/(\d+)x(\d+)/g, "$1*$2").replace(/(\d+)X(\d+)/g, "$1*$2");
  t = t.replace(/sin\(/g, "Math.sin(").replace(/cos\(/g, "Math.cos(").replace(/tan\(/g, "Math.tan(").replace(/log\(/g, "Math.log10(").replace(/ln\(/g, "Math.log(").replace(/sqrt\(/g, "Math.sqrt(").replace(/cbrt\(/g, "Math.cbrt(").replace(/abs\(/g, "Math.abs(");
  t = t.replace(/PI/g, "Math.PI");
  t = t.replace(/SQRT(\d+(\.\d+)?)/g, "Math.sqrt($1)").replace(/CBRT(\d+(\.\d+)?)/g, "Math.cbrt($1)");
  t = t.replace(/SQRT\(/g, "Math.sqrt(").replace(/CBRT\(/g, "Math.cbrt(");
  t = t.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
  t = t.replace(/\^/g, "**");
  for (let i = 0; i < 5; i++) {
    t = t.replace(/(\d+(\.\d+)?)!/g, "factorial($1)");
    t = t.replace(/\(([^()]+)\)!/g, "factorial(($1))");
  }
  t = t.replace(/(\d)(Math\.)/g, "$1*$2").replace(/(\d)\(/g, "$1*(").replace(/\)(\d)/g, ")*$1").replace(/\)\(/g, ")*(");
  if (!/^[0-9+\-*/().%! Matha-zA-Z.]+$/.test(t)) throw Error("bad");
  let res = new Function("Math", "factorial", "return (" + t + ")")(Math, factorial);
  if (typeof res !== "number" || !isFinite(res)) throw Error("bad");
  return Math.round(res * 100000000) / 100000000;
}
module.exports = { factorial, calcEval };
