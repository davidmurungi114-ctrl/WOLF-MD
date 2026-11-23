// utils.js
const config = require("./config");
const startTime = Date.now();
const groupMembers = {};
function getUptime() {
  const s = Math.floor((Date.now() - startTime) / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}
function saveMember(ctx) {
  try {
    if (!ctx.chat || !ctx.from) return;
    if (ctx.chat.type === "group" || ctx.chat.type === "supergroup") {
      if (!groupMembers[ctx.chat.id]) groupMembers[ctx.chat.id] = {};
      groupMembers[ctx.chat.id][ctx.from.id] = ctx.from.first_name || "Member";
    }
  } catch (e) {}
}
module.exports = { getUptime, saveMember, groupMembers };
