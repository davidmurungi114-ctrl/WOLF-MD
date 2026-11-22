const axios = require("axios");
const config = require("./config");
const groupMembers = {};
const startTime = Date.now();

function saveMember(ctx) {
  if (!ctx.chat || !ctx.from) return;
  const c = ctx.chat.id;
  if (!groupMembers[c]) groupMembers[c] = {};
  groupMembers[c][ctx.from.id] = ctx.from.first_name;
}
function getUptime() {
  const s = Math.floor((Date.now() - startTime) / 1000);
  return `${Math.floor(s/3600)}h ${Math.floor((s%3600)/60)}m ${s%60}s`;
}
async function sendDP(ctx, cap) {
  try {
    const img = await axios.get(config.BOT_IMAGE, { responseType: "arraybuffer", timeout: 15000, headers: { "User-Agent": "Mozilla/5.0" } });
    await ctx.replyWithPhoto({ source: Buffer.from(img.data), filename: "wolf.jpg" }, { caption: cap });
  } catch (e) {
    try { await ctx.replyWithPhoto(config.BOT_IMAGE, { caption: cap }); }
    catch (e2) { await ctx.reply(cap); }
  }
}
module.exports = { saveMember, getUptime, sendDP, groupMembers };
