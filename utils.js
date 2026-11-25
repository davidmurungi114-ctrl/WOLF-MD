// 🛠️ WOLF MD - UTILS
let startTime = Date.now();
function getUptime(){
  let s = Math.floor((Date.now()-startTime)/1000);
  let d = Math.floor(s/86400); s%=86400;
  let h = Math.floor(s/3600); s%=3600;
  let m = Math.floor(s/60); let sec = s%60;
  return `${d}d ${h}h ${m}m ${sec}s`;
}
function need(ctx,q,ex){ if(!q){ ctx.reply(`❌ Give text! Example: ${ex}`); return false; } return true; }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
module.exports = { getUptime, need, pick };
