const { Telegraf } = require("telegraf");
const axios = require("axios");
const config = require("./config");
const { saveMember, getUptime, sendDP, groupMembers } = require("./utils");
const { getMenuText } = require("./menu");
const { factorial, calcEval } = require("./calc");

const bot = new Telegraf(config.BOT_TOKEN);
console.log("WOLF MD STARTING...");

bot.start(async (ctx) => {
  saveMember(ctx);
  await sendDP(ctx, `🐺 WOLF MD ALIVE! 🔥\nWelcome ${ctx.from.first_name}!\n\n👑 Owner: WOLF\n🛠️ Created By: PROFESSOR COOLGUY 🤟`);
  await ctx.reply(`Type /menu 👆`);
});

bot.command("menu", (ctx) => { saveMember(ctx); ctx.reply(getMenuText()); });
bot.command("ping", (ctx) => ctx.reply("PONG! ✅ WOLF MD IS ALIVE 🔥\n🛠️ By PROFESSOR COOLGUY 🤟"));
bot.command("alive", async (ctx) => { saveMember(ctx); await sendDP(ctx, `🐺 WOLF MD ALIVE! 🔥\nOwner: WOLF\nBy: PROFESSOR COOLGUY 🤟\nUptime: ${getUptime()}`); });
bot.command("runtime", (ctx) => ctx.reply(`⏱️ Uptime: ${getUptime()}`));
bot.command("owner", (ctx) => ctx.reply(`👑 OWNER: WOLF\nNumber: ${config.OWNER_NUMBER}\nBot: WOLF MD 🐺\n🛠️ Created By: PROFESSOR COOLGUY 🤟`));
bot.command("contact", (ctx) => ctx.reply(`👑 Owner: WOLF - ${config.OWNER_NUMBER}\n🛠️ Created By: PROFESSOR COOLGUY 🤟`));
bot.command("welcome", async (ctx) => { saveMember(ctx); await sendDP(ctx, `Welcome ${ctx.from.first_name}! 🎉 Welcome to WOLF MD group! 🐺`); });
bot.command("groupinfo", (ctx) => ctx.reply(`👥 Group: ${ctx.chat.title || "Private"}\nID: ${ctx.chat.id}\nType: ${ctx.chat.type}`));
bot.command("staff", (ctx) => ctx.reply("👑 Staff: WOLF - Owner 🐺\n🛠️ Created By: PROFESSOR COOLGUY 🤟"));

// AI
bot.command(["gpt","ai"], async (ctx) => {
  saveMember(ctx);
  const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
  if (!q) return ctx.reply("❌ Type: /gpt Who is Diamond?");
  await ctx.reply("🧠 Wolf Thinking...");
  try { const r = await axios.get("https://text.pollinations.ai/" + encodeURIComponent(q), { timeout: 10000 }); ctx.reply("🤖 WOLF AI:\n\n" + r.data); }
  catch (e) { ctx.reply("AI down bro, try again!"); }
});
bot.command("imagine", async (ctx) => {
  saveMember(ctx);
  const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
  if (!q) return ctx.reply("❌ Type: /imagine a wolf in fire");
  await ctx.reply("🎨 Generating image...");
  try { const url = "https://image.pollinations.ai/prompt/" + encodeURIComponent(q); await ctx.replyWithPhoto(url, { caption: `🎨 WOLF MD Image:\n${q}` }); }
  catch (e) { ctx.reply("Image failed!"); }
});

// SONG & MOVIE
bot.command(["song","play","music"], async (ctx) => {
  saveMember(ctx);
  const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
  if (!q) return ctx.reply("❌ Type: /song Mpa Love");
  await ctx.reply("🔎 Searching: " + q + "...");
  try {
    const r = await axios.get("https://itunes.apple.com/search?term=" + encodeURIComponent(q) + "&media=music&limit=5", { timeout: 10000 });
    let s = r.data.results[0];
    if (!s) return ctx.reply("Not found 😅");
    await ctx.reply(`🎵 Found: ${s.trackName}\n👤 Artist: ${s.artistName}\n💿 Album: ${s.collectionName}\n\n🎧 Preview: ${s.previewUrl}\n▶️ YouTube: https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`);
  } catch (e) { ctx.reply("Song failed!"); }
});
bot.command(["movie","video","film"], async (ctx) => {
  saveMember(ctx);
  const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
  if (!q) return ctx.reply("❌ Type: /movie Kill Order");
  await ctx.reply("🎬 Searching movie: " + q + "...");
  try {
    const r = await axios.get("https://itunes.apple.com/search?term=" + encodeURIComponent(q) + "&media=movie&limit=3", { timeout: 10000 });
    const s = r.data.results[0];
    if (!s) return ctx.reply("Not found 😅");
    await ctx.reply(`🎬 Movie: ${s.trackName}\n👤 ${s.artistName}\n▶️ Trailer: https://www.youtube.com/results?search_query=${encodeURIComponent(q + " trailer")}`);
  } catch (e) { ctx.reply("Movie failed!"); }
});

// CALC
bot.command(["calc","calculator","calculate"], (ctx) => {
  saveMember(ctx);
  try {
    let raw = ctx.message.text.trim().replace(/^\/\w+(@\w+)?\s*/, "");
    if (!raw) return ctx.reply("🧮 /calc 30+67\n/calc 2^8\n/calc 5!");
    ctx.reply(`🧮 ${raw} = ${calcEval(raw)}`);
  } catch { ctx.reply("❌ Calc failed! Try: /calc 30+67"); }
});
function twoNum(ctx, fn, sym) {
  saveMember(ctx);
  const p = ctx.message.text.split(" ").slice(1).map(Number).filter(n => !isNaN(n));
  if (p.length < 2) return ctx.reply(`❌ Type: /add 5 3`);
  ctx.reply(`🧮 ${p[0]} ${sym} ${p[1]} = ${fn(p[0], p[1])}`);
}
bot.command(["add","plus"], (ctx) => twoNum(ctx, (a,b)=>a+b, "+"));
bot.command(["sub","minus"], (ctx) => twoNum(ctx, (a,b)=>a-b, "-"));
bot.command(["mul","times"], (ctx) => twoNum(ctx, (a,b)=>a*b, "×"));
bot.command(["div","divide"], (ctx) => twoNum(ctx, (a,b)=>a/b, "÷"));
bot.command(["mod"], (ctx) => twoNum(ctx, (a,b)=>a%b, "%"));
bot.command(["pow","power"], (ctx) => twoNum(ctx, (a,b)=>Math.pow(a,b), "^"));
bot.command("percent", (ctx) => { const p = ctx.message.text.split(" ").slice(1).map(Number).filter(n=>!isNaN(n)); if(p.length<2) return ctx.reply("Usage: /percent 10 200"); ctx.reply(`🧮 ${p[0]}% of ${p[1]} = ${(p[0]/100)*p[1]}`); });
function oneNum(ctx, fn, label) { const n = Number(ctx.message.text.split(" ")[1]); if(isNaN(n)) return ctx.reply(`❌ Type: /${label} 16`); ctx.reply(`🧮 ${label}(${n}) = ${fn(n)}`); }
bot.command("sqrt", (ctx) => oneNum(ctx, n=>Math.sqrt(n), "√"));
bot.command("cbrt", (ctx) => oneNum(ctx, n=>Math.cbrt(n), "∛"));
bot.command("square", (ctx) => oneNum(ctx, n=>n*n, "²"));
bot.command("cube", (ctx) => oneNum(ctx, n=>n*n*n, "³"));
bot.command("factorial", (ctx) => oneNum(ctx, n=>factorial(n), "!"));
bot.command("sin", (ctx) => oneNum(ctx, n=>Math.round(Math.sin(n*Math.PI/180)*100000000)/100000000, "sin"));
bot.command("cos", (ctx) => oneNum(ctx, n=>Math.round(Math.cos(n*Math.PI/180)*100000000)/100000000, "cos"));
bot.command("tan", (ctx) => oneNum(ctx, n=>Math.round(Math.tan(n*Math.PI/180)*100000000)/100000000, "tan"));
bot.command("log", (ctx) => oneNum(ctx, n=>Math.log10(n), "log"));
bot.command("ln", (ctx) => oneNum(ctx, n=>Math.log(n), "ln"));

// TOOLS
bot.command("qr", async (ctx) => { const t = ctx.message.text.split(" ").slice(1).join(" ").trim(); if(!t) return ctx.reply("❌ Type: /qr Hello"); try { await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(t)}`, { caption: `🔳 QR for: ${t}` }); } catch(e){ ctx.reply("QR failed!"); } });
bot.command("tts", async (ctx) => { const t = ctx.message.text.split(" ").slice(1).join(" ").trim(); if(!t) return ctx.reply("Usage: /tts Hello bro"); try { const u = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURIComponent(t) + "&tl=en&client=tw-ob"; const a = await axios.get(u, { responseType: "arraybuffer", headers: { "User-Agent": "Mozilla/5.0" } }); await ctx.replyWithAudio({ source: Buffer.from(a.data), filename: "tts.mp3" }, { caption: `🎤 ${t}` }); } catch(e){ ctx.reply("TTS failed!"); } });
bot.command("weather", async (ctx) => { const city = ctx.message.text.split(" ").slice(1).join(" ").trim() || "Kampala"; try { const r = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`, { timeout: 8000 }); const c = r.data.current_condition[0]; ctx.reply(`🌤️ Weather in ${city}:\n🌡️ Temp: ${c.temp_C}°C\n💧 Humidity: ${c.humidity}%\n🌬️ Wind: ${c.windspeedKmph} km/h\n☁️ ${c.weatherDesc[0].value}`); } catch(e){ ctx.reply("Weather failed!"); } });
bot.command("translate", (ctx) => { const t = ctx.message.text.split(" ").slice(1).join(" ").trim(); if(!t) return ctx.reply("❌ Type: /translate Hello"); ctx.reply(`🔤 Translate:\n${t}\n\nLink: https://translate.google.com/?sl=auto&tl=sw&text=${encodeURIComponent(t)}`); });

// FUN & GAMES
bot.command("joke", (ctx) => { const j = ["Why did the wolf cross the road? To burn you on the other side! 🔥🐺", "What do you call a wolf that tells jokes? A howl-arious wolf! 🐺😂", "Why is WOLF MD so smart? Because PROFESSOR COOLGUY made it! 🤟"]; ctx.reply("😂 " + j[Math.floor(Math.random()*j.length)]); });
bot.command("quote", async (ctx) => { try { const r = await axios.get("https://api.quotable.io/random", { timeout: 6000 }); ctx.reply(`💬 "${r.data.content}"\n\n- ${r.data.author}`); } catch(e){ ctx.reply(`💬 "Don't panic to be burnt!" - WOLF 🐺🔥`); } });
bot.command("fact", async (ctx) => { try { const r = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en", { timeout: 6000 }); ctx.reply(`🧠 FACT: ${r.data.text}`); } catch(e){ ctx.reply("🧠 FACT: Wolves can run up to 60km/h!"); } });
bot.command("roast", (ctx) => { const r = ["You are so slow, even your shadow left you 😂", "Your brain is like WiFi in village - weak! 😅", "Don't panic to be burnt! 🔥"]; ctx.reply("🔥 " + r[Math.floor(Math.random()*r.length)]); });
bot.command("compliment", (ctx) => { const c = ["You are a real Wolf! 🐺🔥", "You are smart like WOLF!", "You shine bro! ✨"]; ctx.reply("❤️ " + c[Math.floor(Math.random()*c.length)]); });
bot.command("8ball", (ctx) => { const q = ctx.message.text.split(" ").slice(1).join(" ").trim(); if(!q) return ctx.reply("❌ Type: /8ball Will I pass?"); const a = ["YES! 🔥 100% YES!", "Definitely YES! 🐺🔥", "Yes, bro! ✅", "No 😅", "No way! ❌", "Maybe... 🤔", "Signs point to YES! 🔥"]; ctx.reply(`🎱 Q: ${q}\n\n🔮 WOLF Says: ${a[Math.floor(Math.random()*a.length)]}`); });
bot.command("dice", (ctx) => ctx.reply("🎲 You rolled: " + (Math.floor(Math.random()*6)+1)));
bot.command("coin", (ctx) => ctx.reply("🪙 " + (Math.random()>0.5 ? "Heads!" : "Tails!")));
bot.command("slots", (ctx) => { const e = ["🐺","🔥","💎","🍀","⭐"], a=e[Math.floor(Math.random()*e.length)], b=e[Math.floor(Math.random()*e.length)], c=e[Math.floor(Math.random()*e.length)]; ctx.reply(`🎰 ${a} | ${b} | ${c}\n` + (a===b && b===c ? "JACKPOT! 🔥🔥🔥" : "Try again bro!")); });
bot.command("rps", (ctx) => { const ch = ["Rock 🪨","Paper 📄","Scissors ✂️"]; ctx.reply("🤖 Wolf chose: " + ch[Math.floor(Math.random()*3)]); });

// TAGALL - GROUPS + CHANNELS
bot.command("tagall", async (ctx) => {
  saveMember(ctx);
  const text = ctx.message.text.split(" ").slice(1).join(" ").trim();
  if (ctx.chat.type === "channel") {
    try {
      const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id);
      let msg = `📢 TAGALL 🐺🔥 WOLF MD\n\n${text ? text + "\n\n" : ""}👑 ADMINS:\n`;
      for (const a of admins) {
        if (a.user.is_bot) continue;
        msg += `<a href="tg://user?id=${a.user.id}">${(a.user.first_name || "Admin").replace(/[<>&]/g, "")}</a> `;
      }
      return await ctx.reply(msg, { parse_mode: "HTML" });
    } catch (e) { return ctx.reply("❌ Make me ADMIN in this channel first bro!"); }
  }
  try {
    const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id);
    let all = {};
    for (const a of admins) { if (!a.user.is_bot) all[a.user.id] = a.user.first_name; }
    const m = groupMembers[ctx.chat.id] || {};
    for (const id in m) all[id] = m[id];
    if (Object.keys(all).length === 0) return ctx.reply("No members saved yet! Let everyone send a message first!");
    let msg = `📢 TAGALL 🐺🔥 WOLF MD\n\n${text ? text + "\n\n" : ""}`;
    for (const id in all) { msg += `<a href="tg://user?id=${id}">${String(all[id]).replace(/[<>&]/g, "")}</a> `; }
    await ctx.reply(msg, { parse_mode: "HTML" });
  } catch (e) { return ctx.reply("❌ Make me ADMIN in this group bro! Then try /tagall again"); }
});

// CHANNEL SUPPORT
bot.on("channel_post", async (ctx) => {
  const text = (ctx.channelPost.text || "").toLowerCase();
  if (text.includes("/menu")) await ctx.reply(getMenuText());
  if (text.includes("/ping")) await ctx.reply("PONG! ✅ WOLF MD IS ALIVE 🔥");
  if (text.includes("/alive")) await ctx.reply(`🐺 WOLF MD ALIVE! 🔥\nOwner: WOLF\nBy: PROFESSOR COOLGUY 🤟\nUptime: ${getUptime()}`);
});
bot.on("my_chat_member", (ctx) => { console.log("Added to:", ctx.chat.title, ctx.chat.type); });

bot.on("new_chat_members", (ctx) => { ctx.message.new_chat_members.forEach(m => { saveMember({ chat: ctx.chat, from: m }); sendDP(ctx, `Welcome ${m.first_name}! 🎉 Welcome to WOLF MD! 🐺`); }); });
bot.on("text", (ctx) => {
  saveMember(ctx);
  const text = ctx.message.text.toLowerCase(), name = ctx.from.first_name, isGroup = ctx.chat.type === "group" || ctx.chat.type === "supergroup";
  if (text.startsWith("/")) return;
  if (isGroup) {
    const men = text.includes("wolf") || text.includes("bot");
    const rep = ctx.message.reply_to_message && ctx.message.reply_to_message.from.username === config.BOT_USERNAME;
    if (!men && !rep) return;
  }
  if (text.includes("hi") || text.includes("hello")) return ctx.reply(`Hello ${name}! 👋 Wolf MD here!`);
  if (text.includes("how are you")) return ctx.reply("I'm alive and good bro! 🔥 What about you?");
  if (text.includes("who are you")) return sendDP(ctx, `I'm WOLF MD! 🐺 Made by WOLF! Created By PROFESSOR COOLGUY 🤟`);
  if (text.includes("thank")) return ctx.reply("Anytime bro! ❤️");
  if (text.includes("bye")) return ctx.reply("Bye bro! 👋 See you soon!");
  if (!isGroup) return ctx.reply(`I hear you ${name}! Use /menu for WOLF MD menu! 🐺`);
});

bot.catch((err, ctx) => { console.log("Bot error:", err.message); try { ctx.reply("Oops! 😅 Try again bro!"); } catch {} });
setInterval(() => { console.log("WOLF HEARTBEAT ❤️ " + getUptime()); }, 60000);
bot.launch({ dropPendingUpdates: true }).then(() => console.log("WOLF MD V13 SHARP ALIVE!"));
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
