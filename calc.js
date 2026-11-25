// 🧮 WOLF MD - CALC - ALL IN ONE FILE! v38
// 🧮 CALC = All these inside:
// /calc, /add, /sub, /mul, /div, /mod, /abs, /avg,
// /lcm, /gcd, /round, /ceil, /floor,
// /min, /max, /sqrt, /cbrt, /square, /cube,
// /pow, /percent, /factorial,
// /sin, /cos, /tan, /asin, /acos, /atan,
// /log, /log2, /ln, /exp
function getArg(ctx){ return ctx.message.text.split(' ').slice(1).join(' '); }
function replyCalc(ctx, title, result){ return ctx.reply(`🧮 ${title} = ${result} ✅\n- WOLF MD 🐺`); }
function needNums(ctx, example){ let a=getArg(ctx).split(/[\s,]+/).map(Number); if(a.length===0||a.some(isNaN)){ ctx.reply(`❌ Give numbers! Example: ${example}`); return null; } return a; }
function doCalc(ctx, expr){
  let e = expr || getArg(ctx);
  if(!e || e.toLowerCase()==='help') return ctx.reply(`🧮 CALC HELP\n➤ /calc 300+1\n➤ /calc sqrt(16)\n➤ /calc 2^3\n➤ /add /sub /mul /div /mod /abs /avg\n➤ /lcm /gcd /round /ceil /floor\n➤ /min /max /sqrt /cbrt /square /cube\n➤ /pow /percent /factorial\n➤ /sin /cos /tan /asin /acos /atan\n➤ /log /log2 /ln /exp`);
  try{
    let c=e.toLowerCase().replace(/×/g,'*').replace(/÷/g,'/').replace(/\^/g,'**').replace(/sqrt\(/g,'Math.sqrt(').replace(/cbrt\(/g,'Math.cbrt(').replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(').replace(/asin\(/g,'Math.asin(').replace(/acos\(/g,'Math.acos(').replace(/atan\(/g,'Math.atan(').replace(/log\(/g,'Math.log10(').replace(/ln\(/g,'Math.log(').replace(/pi/g,'Math.PI');
    let res=eval(c); if(res===undefined||isNaN(res)) throw new Error('bad');
    return replyCalc(ctx, e, res);
  }catch{ return ctx.reply('❌ Wrong math! Example: /calc 2+2'); }
}
function registerCalc(bot){
  bot.command(['calc','c'], (ctx)=> doCalc(ctx, ''));
  const multi={add:(a)=>a.reduce((x,y)=>x+y,0),sub:(a)=>a.reduce((x,y)=>x-y),mul:(a)=>a.reduce((x,y)=>x*y,1),div:(a)=>a.reduce((x,y)=>x/y),avg:(a)=>a.reduce((x,y)=>x+y,0)/a.length,min:(a)=>Math.min(...a),max:(a)=>Math.max(...a)};
  for(let name in multi){ bot.command(name,(ctx)=>{ let a=needNums(ctx,`/${name} 10 20`); if(!a) return; return replyCalc(ctx,`${name.toUpperCase()}(${a.join(', ')})`,multi[name](a)); }); }
  bot.command('mod',(ctx)=>{ let a=needNums(ctx,'/mod 10 3'); if(!a) return; return replyCalc(ctx,`${a[0]} % ${a[1]}`,a[0]%a[1]); });
  bot.command('gcd',(ctx)=>{ let a=needNums(ctx,'/gcd 12 18'); if(!a) return; let g=(x,y)=>y?g(y,x%y):x; return replyCalc(ctx,`GCD(${a[0]}, ${a[1]})`,g(a[0],a[1])); });
  bot.command('lcm',(ctx)=>{ let a=needNums(ctx,'/lcm 4 6'); if(!a) return; let g=(x,y)=>y?g(y,x%y):x; return replyCalc(ctx,`LCM(${a[0]}, ${a[1]})`,a[0]*a[1]/g(a[0],a[1])); });
  bot.command('pow',(ctx)=>{ let a=needNums(ctx,'/pow 2 3'); if(!a) return; return replyCalc(ctx,`${a[0]} ^ ${a[1]}`,Math.pow(a[0],a[1])); });
  bot.command('percent',(ctx)=>{ let a=needNums(ctx,'/percent 20 200'); if(!a) return; return replyCalc(ctx,`${a[0]}% of ${a[1]}`,a[0]/100*a[1]); });
  const single={abs:Math.abs,round:Math.round,ceil:Math.ceil,floor:Math.floor,sqrt:Math.sqrt,cbrt:Math.cbrt,square:(x)=>x*x,cube:(x)=>x*x*x,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,log:Math.log10,ln:Math.log,log2:Math.log2,exp:Math.exp,factorial:(n)=>{ let f=1; for(let i=2;i<=n;i++) f*=i; return f; }};
  for(let name in single){ bot.command(name,(ctx)=>{ let n=Number(getArg(ctx)); if(isNaN(n)) return ctx.reply(`❌ Example: /${name} 16`); let label=name==='square'?`${n}²`:name==='cube'?`${n}³`:name==='factorial'?`${n}!`:`${name}(${n})`; return replyCalc(ctx,label,single[name](n)); }); }
}
module.exports = { doCalc, registerCalc };
