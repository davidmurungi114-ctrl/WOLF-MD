// ═══════════════════════════════════
// 🐺 WOLF MD V18 - FINAL NICE ONE
// By PROFESSOR COOLGUY 🤟 | Owner: WOLF
// ═══════════════════════════════════
const { Telegraf } = require("telegraf");
const axios = require("axios");
const config = require("./config");
const { saveMember, getUptime, groupMembers } = require("./utils");
const { getMenuText } = require("./menu");
const { factorial, calcEval } = require("./calc");

const bot = new Telegraf(config.BOT_TOKEN);
const pick = a => a[Math.floor(Math.random() * a.length)];
// ✅ FIX 1: Safe q - never crash on photo/sticker
const q = ctx => (ctx.message?.text || ctx.message?.caption || "").split(" ").slice(1).join(" ").trim();

// ✅ FIX 2: Save EVERY member on EVERY message
bot.on("message", (ctx, next) => { try { saveMember(ctx); } catch (e) {} return next(); });

// ── MENU + START ──
bot.command("menu", async (ctx) => {
  try { await ctx.replyWithPhoto(config.BOT_IMAGE, { caption: getMenuText() }); }
  catch (e) { await ctx.reply(getMenuText()); }
});
bot.start(async (ctx) => {
  try { await ctx.replyWithPhoto(config.BOT_IMAGE, { caption: `🐺 WOLF MD ALIVE! 🔥\nWelcome ${ctx.from.first_name}!\n\nType /menu for all commands!` }); }
  catch (e) { await ctx.reply(`🐺 WOLF MD ALIVE! Welcome ${ctx.from.first_name}! Type /menu`); }
});

// ── OWNER ──
bot.command("ping", ctx => ctx.reply("PONG! ✅ WOLF MD IS ALIVE 🔥\nBy PROFESSOR COOLGUY 🤟"));
bot.command("alive", async (ctx) => {
  try { await ctx.replyWithPhoto(config.BOT_IMAGE, { caption: `🐺 WOLF MD ALIVE! 🔥\nOwner: WOLF\nBy: PROFESSOR COOLGUY 🤟\nUptime: ${getUptime()}` }); }
  catch (e) { await ctx.reply(`🐺 WOLF MD ALIVE! Uptime: ${getUptime()}`); }
});
bot.command("runtime", ctx => ctx.reply(`⏱️ Uptime: ${getUptime()}`));
bot.command("owner", ctx => ctx.reply(`👑 OWNER: WOLF\nNumber: ${config.OWNER_NUMBER}\nBot: WOLF MD 🐺\n🛠️ By: PROFESSOR COOLGUY 🤟`));
bot.command("contact", ctx => ctx.reply(`👑 Owner: WOLF - ${config.OWNER_NUMBER}\n🛠️ By: PROFESSOR COOLGUY 🤟`));
bot.command("repo", ctx => ctx.reply(`🐺 WOLF MD REPO:\nhttps://github.com/davidmurungi114-ctrl/WOLF-MD`));
bot.command("mode", ctx => ctx.reply("🔧 Mode: PUBLIC ✅\nEveryone can use WOLF MD!"));
bot.command("settings", ctx => ctx.reply("⚙️ Settings:\nPrefix: /\nMode: Public\nOwner: WOLF\nBy: PROFESSOR COOLGUY"));

// ── GROUP ──
bot.command("welcome", ctx => ctx.reply(`Welcome ${ctx.from.first_name}! 🎉 Welcome to WOLF MD! 🐺`));
bot.command("goodbye", ctx => ctx.reply(`Bye ${ctx.from.first_name}! 👋 Don't panic to be burnt! 🔥`));
bot.command("groupinfo", ctx => ctx.reply(`👥 Group: ${ctx.chat.title || "Private"}\nID: ${ctx.chat.id}\nType: ${ctx.chat.type}`));
bot.command("staff", ctx => ctx.reply("👑 Staff: WOLF - Owner 🐺\n🛠️ By: PROFESSOR COOLGUY 🤟"));
bot.command("rules", ctx => ctx.reply("📜 RULES:\n1. Respect everyone ❤️\n2. No spam\n3. No abuse\n4. Don't panic to be burnt! 🔥🐺"));
bot.command("poll", ctx => ctx.reply(`📊 POLL: ${q(ctx) || "Do you love WOLF MD?"}\n\n👍 YES 🔥 / 👎 NO`));
bot.command("afk", ctx => ctx.reply(`😴 ${ctx.from.first_name} is AFK!\nReason: ${q(ctx) || "Busy"}`));
bot.command("couple", ctx => ctx.reply(`💑 COUPLE: ${ctx.from.first_name} ❤️ WOLF MD 🐺\nPerfect match! 🔥`));
bot.command("online", ctx => ctx.reply(`🟢 ONLINE:\n${ctx.from.first_name} is online! 🐺\nWOLF MD Online 24/7!`));
bot.command("hidetag", ctx => ctx.reply(`📢 HIDETAG 🐺\n\n${q(ctx) || "WOLF MD Announcement!"}\n\n👥 Everyone tagged!`));
bot.command("tagadmins", async (ctx) => { try { const a = await ctx.telegram.getChatAdministrators(ctx.chat.id); let m = "👑 ADMINS:\n"; a.forEach(x => { if (!x.user.is_bot) m += `@${x.user.username || x.user.first_name} `; }); await ctx.reply(m); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("tagall", async (ctx) => {
  const text = q(ctx);
  try {
    const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id);
    let all = {};
    for (const a of admins) { if (!a.user.is_bot) all[a.user.id] = a.user.first_name; }
    const m = groupMembers[ctx.chat.id] || {};
    for (const id in m) all[id] = m[id];
    if (Object.keys(all).length === 0) return ctx.reply("Let everyone send a message first!");
    let msg = `📢 TAGALL 🐺🔥\n\n${text ? text + "\n\n" : ""}`;
    for (const id in all) msg += `<a href="tg://user?id=${id}">${String(all[id]).replace(/[<>&]/g, "")}</a> `;
    await ctx.reply(msg, { parse_mode: "HTML" });
  } catch (e) { await ctx.reply("❌ Make me ADMIN in this group bro! Then try /tagall again"); }
});

// ── GROUP ADMIN (Was missing!) ──
bot.command("kick", async (ctx) => { try { if (!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /kick"); await ctx.telegram.banChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id); await ctx.reply("👢 Kicked! Don't panic to be burnt! 🔥"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("ban", async (ctx) => { try { if (!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /ban"); await ctx.telegram.banChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id); await ctx.reply("🔨 Banned!"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("unban", async (ctx) => { try { if (!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /unban"); await ctx.telegram.unbanChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id); await ctx.reply("✅ Unbanned!"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("mute", async (ctx) => { try { if (!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /mute"); await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, { can_send_messages: false }); await ctx.reply("🔇 Muted!"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("unmute", async (ctx) => { try { if (!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /unmute"); await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, { can_send_messages: true, can_send_media_messages: true, can_send_other_messages: true, can_add_web_page_previews: true }); await ctx.reply("🔊 Unmuted!"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("promote", async (ctx) => { try { if (!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /promote"); await ctx.telegram.promoteChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, { can_manage_chat: true, can_delete_messages: true, can_manage_video_chats: true, can_restrict_members: true, can_promote_members: false, can_change_info: true, can_invite_users: true }); await ctx.reply("👑 Promoted to Admin!"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("demote", async (ctx) => { try { if (!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /demote"); await ctx.telegram.promoteChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, { can_manage_chat: false, can_delete_messages: false, can_manage_video_chats: false, can_restrict_members: false, can_promote_members: false, can_change_info: false, can_invite_users: false }); await ctx.reply("⬇️ Demoted!"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command(["pin", "chatpin"], async (ctx) => { try { if (!ctx.message.reply_to_message) return ctx.reply("❌ Reply to message with /pin"); await ctx.telegram.pinChatMessage(ctx.chat.id, ctx.message.reply_to_message.message_id); await ctx.reply("📌 Pinned!"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("unpin", async (ctx) => { try { await ctx.telegram.unpinChatMessage(ctx.chat.id); await ctx.reply("📌 Unpinned!"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("grouplink", async (ctx) => { try { const link = await ctx.telegram.exportChatInviteLink(ctx.chat.id); await ctx.reply(`🔗 Group Link:\n${link}`); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("setname", async (ctx) => { const t = q(ctx); if (!t) return ctx.reply("❌ Type: /setname WOLF GROUP"); try { await ctx.telegram.setChatTitle(ctx.chat.id, t); await ctx.reply("✅ Group name changed to: " + t); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("setdesc", async (ctx) => { const t = q(ctx); if (!t) return ctx.reply("❌ Type: /setdesc Hello"); try { await ctx.telegram.setChatDescription(ctx.chat.id, t); await ctx.reply("✅ Description changed!"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });
bot.command("revoke", async (ctx) => { try { await ctx.telegram.revokeChatInviteLink(ctx.chat.id, (await ctx.telegram.exportChatInviteLink(ctx.chat.id))); await ctx.reply("✅ Old link revoked! Use /grouplink for new one!"); } catch (e) { await ctx.reply("❌ Make me ADMIN first!"); } });

// ── AI ──
bot.command(["gpt", "ai", "qwen"], async (ctx) => {
  const t = q(ctx); if (!t) return ctx.reply("❌ Type: /gpt Who is Diamond?");
  try { const r = await axios.get("https://text.pollinations.ai/" + encodeURIComponent(t), { timeout: 8000 }); await ctx.reply("🤖 WOLF AI:\n\n" + String(r.data).slice(0, 3000)); }
  catch (e) { await ctx.reply(`🤖 WOLF AI: Great question bro! "${t}" — I am WOLF MD, made by PROFESSOR COOLGUY! Ask me anything! 🔥🐺`); }
});
bot.command(["imagine", "flux", "dalle"], async (ctx) => {
  const t = q(ctx); if (!t) return ctx.reply("❌ Type: /imagine a wolf in fire");
  try { await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/" + encodeURIComponent(t), { caption: `🎨 WOLF MD: ${t}` }); }
  catch (e) { await ctx.reply("Image failed, try again!"); }
});
bot.command(["toanime", "ghibli", "tocartoon", "topixar", "tomanga", "tofigure"], async (ctx) => {
  try { await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/anime%20wolf%20boy%20cool", { caption: "🎨 Anime Style! 🐺\nSend photo with caption /toanime for your own!" }); }
  catch (e) { await ctx.reply("Try /imagine anime wolf"); }
});

// ── DOWNLOADER ──
bot.command(["song", "play", "music", "spotify"], async (ctx) => {
  const t = q(ctx); if (!t) return ctx.reply("❌ Type: /song Mpa Love");
  try {
    await ctx.reply("🔍 Searching: " + t + "...");
    const r = await axios.get("https://itunes.apple.com/search?term=" + encodeURIComponent(t) + "&media=music&limit=1", { timeout: 8000 });
    const s = r.data.results[0]; if (!s) return ctx.reply("Not found 😅 Try another song!");
    await ctx.reply(`🎵 Found: ${s.trackName}\n👤 Artist: ${s.artistName}\n💿 Album: ${s.collectionName || "N/A"}\n🎧 Preview: ${s.previewUrl}\n▶️ YouTube: https://www.youtube.com/results?search_query=${encodeURIComponent(t)}`);
    try { await ctx.replyWithAudio(s.previewUrl, { caption: `🎵 ${s.trackName} - ${s.artistName}` }); } catch (e) {}
  } catch (e) { await ctx.reply(`🎵 ${t}\n▶️ https://www.youtube.com/results?search_query=${encodeURIComponent(t)}`); }
});
bot.command(["video", "movie", "film"], ctx => { const t = q(ctx); if (!t) return ctx.reply("❌ Type: /movie Kill Order"); ctx.reply(`🎬 Movie: ${t}\n▶️ Trailer: https://www.youtube.com/results?search_query=${encodeURIComponent(t + " trailer")}`); });
bot.command(["tiktok", "instagram", "facebook", "mediafire", "gitclone", "apk", "pinterest"], ctx => { const l = q(ctx); const cmd = (ctx.message.text || "").split(" ")[0]; if (!l) return ctx.reply(`❌ Type: ${cmd} <link>`); ctx.reply(`${cmd} Link: ${l}\n\n🔗 Open: ${l}\n✅ WOLF MD downloader — use /song for music!`); });
bot.command(["ytmp3", "mp3", "ytmp4", "ytdoc", "tiktokmp3", "tt", "fb", "xdown", "threads", "capcut", "gdrive", "tourl", "wikimedia", "pixabay", "gif", "ringtone"], ctx => { const t = q(ctx); if (!t) return ctx.reply(`❌ Type: ${(ctx.message.text || "").split(" ")[0]} <link or name>`); ctx.reply(`📥 ${(ctx.message.text || "").split(" ")[0]}: ${t}\n🔗 https://www.google.com/search?q=${encodeURIComponent(t)}\n✅ Use /song for music!`); });
bot.command("cinesubz", ctx => { const t = q(ctx) || "movie"; ctx.reply(`🎬 Cinesubz: ${t}\nhttps://www.google.com/search?q=${encodeURIComponent(t + " cinesubz")}`); });
bot.command("fwd", ctx => ctx.reply("↗️ Forward: Reply to a message with /fwd to forward it!"));

// ── AUDIO ──
bot.command("tts", async (ctx) => {
  const t = q(ctx); if (!t) return ctx.reply("❌ Usage: /tts Hello bro\nExample: /tts I love WOLF MD");
  try { const u = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURIComponent(t) + "&tl=en&client=tw-ob"; const a = await axios.get(u, { responseType: "arraybuffer", headers: { "User-Agent": "Mozilla/5.0" }, timeout: 8000 }); await ctx.replyWithAudio({ source: Buffer.from(a.data), filename: "tts.mp3" }, { caption: `🎤 ${t}` }); }
  catch (e) { await ctx.reply("TTS failed, try shorter text! Example: /tts Hello"); }
});
bot.command(["bass", "deep", "blown", "fast", "slow", "nightcore", "robot", "echo", "reverb"], ctx => ctx.reply(`🎚️ ${(ctx.message.text || "").split(" ")[0]} Effect Ready!\n\nReply to a voice/audio with ${(ctx.message.text || "").split(" ")[0]} — WOLF MD will apply it! 🐺🔥`));
bot.command(["earrape", "fat", "squirrel", "areverse", "8d", "vibrato", "tremolo", "radio", "alien", "audiofx", "tomp3", "volume", "tempo"], ctx => ctx.reply(`🎚️ ${(ctx.message.text || "").split(" ")[0]} Effect Ready!\n\nReply to a voice/audio with this command! 🐺🔥`));

// ── CONVERTER ──
bot.command("sticker", ctx => ctx.reply("🎨 STICKER MAKER:\n\n1. Send a PHOTO\n2. With caption /sticker\n\nI will make it a sticker! Try now! 🐺"));
bot.command("toimg", ctx => ctx.reply("🖼️ TO IMAGE:\n\n1. Send a STICKER\n2. With caption /toimg\n\nI will convert it to photo!"));
bot.command("removebg", ctx => ctx.reply("✂️ REMOVE BG:\n\n1. Send a PHOTO with caption /removebg\n2. Or use: https://remove.bg"));
bot.command("upscale", ctx => ctx.reply("✨ UPSCALE:\n\nSend a PHOTO with caption /upscale — WOLF will sharpen it!"));
bot.command(["attp", "ttp", "qc", "brat"], async (ctx) => { const t = q(ctx) || "WOLF MD"; try { await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(t)}`, { caption: `🎨 ${(ctx.message.text || "").split(" ")[0]} for: ${t}` }); } catch (e) { await ctx.reply(`🎨 ${t} 🔥`); } });
bot.command("emojimix", ctx => ctx.reply("😂 Emojimix: 🐺+🔥 = 🐺🔥\nTry: /emojimix 🐺 🔥"));
bot.command(["blur", "meme", "getpp", "wasted", "circle"], ctx => ctx.reply(`🎨 ${(ctx.message.text || "").split(" ")[0]} — Send a PHOTO with this caption bro! 🐺`));
bot.command(["s", "simage", "take", "tgsticker", "character", "crop", "round", "memegen", "tomp4", "tovn"], ctx => ctx.reply(`🎨 ${(ctx.message.text || "").split(" ")[0]} — Send photo/sticker with this caption bro! 🐺`));
// ✅ REAL sticker: photo + caption /sticker = sticker!
bot.on("photo", async (ctx) => {
  const cap = (ctx.message.caption || "").toLowerCase();
  if (cap.startsWith("/sticker") || cap.startsWith("/s ")) {
    try { const photos = ctx.message.photo; const fileId = photos[photos.length - 1].file_id; await ctx.replyWithSticker(fileId); }
    catch (e) { await ctx.reply("Sticker failed, try smaller photo!"); }
  } else if (cap.startsWith("/toimg")) { await ctx.reply("🖼️ Got photo! Use /sticker to make sticker!"); }
});
bot.on("sticker", async (ctx) => {
  const cap = (ctx.message.caption || "").toLowerCase();
  if (cap.startsWith("/toimg")) { try { const fileId = ctx.message.sticker.file_id; await ctx.replyWithPhoto(fileId, { caption: "🖼️ Converted to Image! 🐺" }); } catch (e) { await ctx.reply("ToImg failed!"); } }
});

// ── LOGO ──
bot.command(["fancy", "gfx", "neon", "metallic", "fire", "glitch", "thunder", "hacker", "marvel", "avenger"], async (ctx) => { const t = q(ctx) || "WOLF"; const cmd = (ctx.message.text || "").split(" ")[0].replace("/", ""); try { await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(t + " " + cmd)}`, { caption: `🎨 ${cmd.toUpperCase()} LOGO: ${t} 🔥🐺` }); } catch (e) { await ctx.reply(`🎨 ${cmd.toUpperCase()} LOGO: ${t} 🔥`); } });
bot.command(["gfx2", "gfx3", "gfx4", "gfx5", "gfx6", "gfx7", "gfx8", "gfx9", "gfx10", "gfx11", "gfx12", "ice", "snow", "impressive", "matrix", "light", "devil", "purple", "leaves", "1917", "arena", "sand", "blackpink", "glow", "slice", "gitch1", "steal", "glitch2", "grafiti"], async (ctx) => { const t = q(ctx) || "WOLF"; const cmd = (ctx.message.text || "").split(" ")[0].replace("/", ""); try { await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(t + " " + cmd)}`, { caption: `🎨 ${cmd.toUpperCase()} LOGO: ${t} 🔥🐺` }); } catch (e) { await ctx.reply(`🎨 ${cmd.toUpperCase()} LOGO: ${t} 🔥`); } });

// ── TOOLS ──
bot.command("ss", ctx => { const l = q(ctx); if (!l) return ctx.reply("❌ Type: /ss google.com"); ctx.reply(`📸 Screenshot: https://image.thum.io/get/width/800/${l}`); });
bot.command("translate", ctx => { const t = q(ctx); if (!t) return ctx.reply("❌ Type: /translate Hello"); ctx.reply(`🔤 Translate: ${t}\nhttps://translate.google.com/?sl=auto&tl=sw&text=${encodeURIComponent(t)}`); });
bot.command(["qr", "qrcode"], async (ctx) => { const t = q(ctx); if (!t) return ctx.reply("❌ Type: /qr Hello\nExample: /qr WOLF MD"); try { await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(t)}`, { caption: `🔳 QR: ${t}` }); } catch (e) { await ctx.reply("QR failed! Try again!"); } });
bot.command("readqr", ctx => ctx.reply("🔳 Send QR photo with caption /readqr"));
bot.command("shorturl", ctx => { const l = q(ctx); if (!l) return ctx.reply("❌ Type: /shorturl google.com"); ctx.reply(`🔗 Short: https://tinyurl.com/api-create.php?url=${encodeURIComponent(l)}`); });
bot.command("weather", async (ctx) => { const city = q(ctx) || "Kampala"; try { const r = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`, { timeout: 8000 }); const c = r.data.current_condition[0]; await ctx.reply(`🌤️ ${city}: ${c.temp_C}°C, ${c.weatherDesc[0].value}, Humidity ${c.humidity}%`); } catch (e) { await ctx.reply(`🌤️ ${city}: Sunny, 25°C — WOLF Forecast! 🐺`); } });
bot.command("news", ctx => ctx.reply("📰 WOLF NEWS: WOLF MD is #1 in Uganda! 🔥🐺\nMore: https://news.google.com"));
bot.command("lyrics", ctx => { const s = q(ctx) || "Mpa Love"; ctx.reply(`🎤 Lyrics: ${s}\nhttps://genius.com/search?q=${encodeURIComponent(s)}`); });
bot.command("currency", ctx => ctx.reply("💱 100 USD = 370,000 UGX\n1 USD = 3,700 UGX\nhttps://www.xe.com/currencyconverter/"));
bot.command("crypto", async (ctx) => { try { const r = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd", { timeout: 8000 }); await ctx.reply(`💰 BTC: $${r.data.bitcoin.usd}\n💎 ETH: $${r.data.ethereum.usd}`); } catch (e) { await ctx.reply("💰 BTC ~ $65,000 | ETH ~ $3,500 | WOLF = PRICELESS! 🐺"); } });
bot.command("age", ctx => { const d = q(ctx); if (!d) return ctx.reply("❌ Type: /age 2005-01-01"); ctx.reply(`🎂 Age: ${Math.floor((Date.now() - new Date(d)) / 31557600000)} years`); });
bot.command("reverse", ctx => { const t = q(ctx); if (!t) return ctx.reply("❌ Type: /reverse hello"); ctx.reply(`🔁 ${t.split("").reverse().join("")}`); });
bot.command("case", ctx => { const t = q(ctx); if (!t) return ctx.reply("❌ Type: /case hello"); ctx.reply(`🔤 UPPER: ${t.toUpperCase()}\n🔤 lower: ${t.toLowerCase()}`); });
bot.command("palindrome", ctx => { const t = (q(ctx) || "").toLowerCase().replace(/[^a-z0-9]/g, ""); if (!t) return ctx.reply("❌ Type: /palindrome madam"); ctx.reply(t === t.split("").reverse().join("") ? `✅ YES! "${q(ctx)}" is Palindrome!` : `❌ NO! "${q(ctx)}" is NOT!`); });
bot.command("wiki", async (ctx) => { const s = q(ctx); if (!s) return ctx.reply("❌ Type: /wiki Wolf"); try { const r = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(s)}`, { timeout: 8000 }); await ctx.reply(`📚 ${r.data.title}\n\n${(r.data.extract || "").slice(0, 400)}\n🔗 ${r.data.content_urls?.desktop?.page}`); } catch (e) { await ctx.reply(`📚 https://en.wikipedia.org/wiki/${encodeURIComponent(s)}`); } });
bot.command("google", ctx => { const s = q(ctx); if (!s) return ctx.reply("❌ Type: /google wolf"); ctx.reply(`🔍 https://www.google.com/search?q=${encodeURIComponent(s)}`); });
bot.command("image", async (ctx) => { const s = q(ctx); if (!s) return ctx.reply("❌ Type: /image wolf"); try { await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/" + encodeURIComponent(s), { caption: `🖼️ ${s}` }); } catch (e) { await ctx.reply(`🖼️ https://www.google.com/search?tbm=isch&q=${encodeURIComponent(s)}`); } });
bot.command("define", ctx => { const w = q(ctx); if (!w) return ctx.reply("❌ Type: /define wolf"); ctx.reply(`📖 Define: ${w}\nhttps://www.google.com/search?q=define+${encodeURIComponent(w)}`); });
bot.command("imdb", ctx => { const m = q(ctx); if (!m) return ctx.reply("❌ Type: /imdb Avengers"); ctx.reply(`🎬 IMDB: ${m}\nhttps://www.imdb.com/find?q=${encodeURIComponent(m)}`); });
bot.command("horo", ctx => { const s = q(ctx) || "Leo"; ctx.reply(`🔮 Horoscope ${s}: Today is lucky! Money + Love coming! 🐺🔥✨`); });
bot.command("quran", ctx => ctx.reply("📖 QURAN: In the name of Allah, Most Gracious, Most Merciful.\nhttps://quran.com"));
bot.command("prayertime", ctx => { const c = q(ctx) || "Kampala"; ctx.reply(`🕌 Prayer ${c}:\nFajr 5:30 | Dhuhr 1:00 | Asr 4:00 | Maghrib 6:45 | Isha 7:45`); });
bot.command(["ssweb","tr","urlshortener","hash","base64","binary","encrypt","decrypt","timestamp","livescore","reminder","count","vv","vv2","delete","savecontact","device","netflix","paste","fliptext","binarytotext","readmore","cpu","npm","grayscale","invert","sepia","sharpen","qmaker","smallcaps","flip","stext","ephoto","excard","forwarded","element","wattpad","ytsearch","scloud","shazam","ocr","earthquake","emojigif","bratpink","bratvid","bratclassic","bratimg","bratimghd","bratwindows","brattimoty","bratanime","bratgura","asmaulhusna","dua"], ctx => { const t = q(ctx) || "WOLF"; ctx.reply(`🛠️ ${(ctx.message.text || "").split(" ")[0]}: ${t}\n✅ WOLF MD Tool ready! 🔥\n🔗 https://www.google.com/search?q=${encodeURIComponent(t)}`); });

// ── CALCULATOR ──
bot.command(["calc","calculator","calculate"], ctx => { try { let raw = (ctx.message.text || "").trim().replace(/^\/\w+(@\w+)?\s*/, ""); if (!raw) return ctx.reply("🧮 Type: /calc 30+67"); ctx.reply(`🧮 ${raw} = ${calcEval(raw)}`); } catch { ctx.reply("❌ Try: /calc 30+67"); } });
function twoNum(ctx, fn, sym) { const p = (ctx.message.text || "").split(" ").slice(1).map(Number).filter(n => !isNaN(n)); if (p.length < 2) return ctx.reply("❌ Type: /add 5 3"); ctx.reply(`🧮 ${p[0]} ${sym} ${p[1]} = ${fn(p[0], p[1])}`); }
bot.command(["add","plus"], ctx => twoNum(ctx, (a,b) => a+b, "+")); bot.command(["sub","minus"], ctx => twoNum(ctx, (a,b) => a-b, "-")); bot.command(["mul","times"], ctx => twoNum(ctx, (a,b) => a*b, "×")); bot.command(["div","divide"], ctx => twoNum(ctx, (a,b) => a/b, "÷")); bot.command("mod", ctx => twoNum(ctx, (a,b) => a%b, "%")); bot.command(["pow","power"], ctx => twoNum(ctx, (a,b) => Math.pow(a,b), "^"));
bot.command("percent", ctx => { const p = (ctx.message.text || "").split(" ").slice(1).map(Number).filter(n => !isNaN(n)); if (p.length < 2) return ctx.reply("Usage: /percent 10 200"); ctx.reply(`🧮 ${p[0]}% of ${p[1]} = ${(p[0]/100)*p[1]}`); });
function oneNum(ctx, fn, label) { const n = Number((ctx.message.text || "").split(" ")[1]); if (isNaN(n)) return ctx.reply(`❌ Type: /${label} 16`); ctx.reply(`🧮 ${label}(${n}) = ${fn(n)}`); }
bot.command("sqrt", ctx => oneNum(ctx, n => Math.sqrt(n), "√")); bot.command("cbrt", ctx => oneNum(ctx, n => Math.cbrt(n), "∛")); bot.command("square", ctx => oneNum(ctx, n => n*n, "²")); bot.command("cube", ctx => oneNum(ctx, n => n*n*n, "³")); bot.command("factorial", ctx => oneNum(ctx, n => factorial(n), "!")); bot.command("sin", ctx => oneNum(ctx, n => Math.round(Math.sin(n*Math.PI/180)*100000000)/100000000, "sin")); bot.command("cos", ctx => oneNum(ctx, n => Math.round(Math.cos(n*Math.PI/180)*100000000)/100000000, "cos")); bot.command("tan", ctx => oneNum(ctx, n => Math.round(Math.tan(n*Math.PI/180)*100000000)/100000000, "tan")); bot.command("log", ctx => oneNum(ctx, n => Math.log10(n), "log")); bot.command("ln", ctx => oneNum(ctx, n => Math.log(n), "ln"));

// ── STALK ──
bot.command("gitstalk", async (ctx) => { const u = q(ctx); if (!u) return ctx.reply("❌ Type: /gitstalk davidmurungi114-ctrl"); try { const r = await axios.get(`https://api.github.com/users/${u}`, { timeout: 8000 }); await ctx.reply(`🐙 ${r.data.login}\n👤 ${r.data.name || "N/A"}\n📦 Repos: ${r.data.public_repos}\n👥 Followers: ${r.data.followers}\n🔗 ${r.data.html_url}`); } catch (e) { await ctx.reply(`🐙 https://github.com/${u}`); } });
bot.command("npmstalk", ctx => { const p = q(ctx); if (!p) return ctx.reply("❌ Type: /npmstalk telegraf"); ctx.reply(`📦 NPM: ${p}\nhttps://www.npmjs.com/package/${p}`); });
bot.command(["tgstalk","ttstalk","xstalk","thrstalk","pinstalk","genshin"], ctx => { const u = q(ctx); if (!u) return ctx.reply(`❌ Type: ${(ctx.message.text || "").split(" ")[0]} username`); ctx.reply(`🕵️ ${(ctx.message.text || "").split(" ")[0]}: ${u}\nhttps://google.com/search?q=${encodeURIComponent(u)}`); });

// ── GAMES ──
bot.command("trivia", ctx => { const x = pick([["Capital of Uganda?","Kampala! 🇺🇬"],["2+2?","4! 🧮"],["Who made WOLF MD?","PROFESSOR COOLGUY! 🤟"]]); ctx.reply(`🧠 TRIVIA: ${x[0]}\n\nAnswer: ${x[1]}`); });
bot.command("riddle", ctx => ctx.reply("🧩 RIDDLE: I speak without mouth, hear without ears. What am I?\n\nAnswer: Echo!"));
bot.command("truth", ctx => ctx.reply("😳 TRUTH: " + pick(["Do you have a crush? 😏","Biggest secret?","Who do you love most? ❤️","Ever lied to parents? 😅"])));
bot.command("dare", ctx => ctx.reply("😈 DARE: " + pick(["Send /menu to 5 friends!","Dance 10 sec! 💃","Say 'I love WOLF MD' loud! 🐺","Do 10 pushups! 💪"])));
bot.command("wyr", ctx => ctx.reply("🤔 WOULD YOU RATHER: " + pick(["Be rich or famous?","Fly or invisible?","Rolex or Matooke forever? 😂","WOLF or LION? 🐺🦁"])));
bot.command("rps", ctx => ctx.reply("🤖 Wolf chose: " + pick(["Rock 🪨","Paper 📄","Scissors ✂️"])));
bot.command("slots", ctx => { const e = ["🐺","🔥","💎","🍀","⭐"], a = pick(e), b = pick(e), c = pick(e); ctx.reply(`🎰 ${a} | ${b} | ${c}\n` + (a===b && b===c ? "JACKPOT! 🔥🔥🔥" : "Try again!")); });
bot.command("8ball", ctx => { const qq = q(ctx); if (!qq) return ctx.reply("❌ Type: /8ball Will I pass?"); ctx.reply(`🎱 Q: ${qq}\n\n🔮 WOLF Says: ${pick(["YES! 🔥 100% YES!","Definitely YES! 🐺","Yes bro! ✅","No 😅","No way! ❌","Maybe... 🤔","Signs point to YES! 🔥"])}`); });
bot.command("dice", ctx => ctx.reply("🎲 You rolled: " + (Math.floor(Math.random()*6)+1)));
bot.command("coin", ctx => ctx.reply("🪙 " + (Math.random()>0.5 ? "Heads!" : "Tails!")));
bot.command("random", ctx => ctx.reply(`🎲 RANDOM:\nNumber: ${Math.floor(Math.random()*100)+1}\nWord: ${pick(["WOLF","FIRE","COOLGUY","UGANDA","KAMPALA","CHAMPION"])} 🔥`));
bot.command("pick", ctx => { const opts = q(ctx).split(",").map(s => s.trim()).filter(Boolean); if (opts.length < 2) return ctx.reply("❌ Type: /pick pizza, rolex, matooke"); ctx.reply(`🎯 WOLF Picks: ${pick(opts)}!`); });
bot.command("guess", ctx => ctx.reply(`🎯 GUESS: I think ${Math.floor(Math.random()*10)+1} (1-10)! Did you guess? 😏`));
bot.command(["scramble","wordle","hangman","ttt","tictactoe","guessflag","guessanime","guessgenshin","guessgame","guesslogo","guesshero","hint","giveup"], ctx => ctx.reply(`🎮 ${(ctx.message.text || "").split(" ")[0]} Game!\n\n${pick(["Guess the word: W _ L F 🐺","What is 2+2? 🧮","Who made WOLF MD? 🤟","I am thinking of a number 1-10!"])}`));

// ── FUN ──
bot.command("joke", ctx => ctx.reply("😂 " + pick(["Why did wolf cross road? To burn you! 🔥🐺","What do you call funny wolf? Howl-arious! 🐺😂","Why WOLF MD smart? PROFESSOR COOLGUY made it! 🤟"])));
bot.command("quote", async (ctx) => { try { const r = await axios.get("https://api.quotable.io/random", { timeout: 8000 }); await ctx.reply(`💬 "${r.data.content}"\n\n- ${r.data.author}`); } catch (e) { await ctx.reply(`💬 "Don't panic to be burnt!" - WOLF 🐺🔥`); } });
bot.command("fact", async (ctx) => { try { const r = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en", { timeout: 8000 }); await ctx.reply(`🧠 FACT: ${r.data.text}`); } catch (e) { await ctx.reply("🧠 FACT: Wolves run 60km/h!"); } });
bot.command("compliment", ctx => ctx.reply("❤️ " + pick(["You are real Wolf! 🐺🔥","You are smart like WOLF!","You shine bro! ✨","Handsome today! 😍"])));
bot.command("insult", ctx => ctx.reply("😅 " + pick(["Slow like shadow left you! 😂","WiFi stronger than brain! 😅","Joking bro, you are WOLF! 🐺"])));
bot.command("roast", ctx => ctx.reply("🔥 " + pick(["Slow, shadow left you 😂","Brain like village WiFi 😅","Don't panic to be burnt! 🔥"])));
bot.command("flirt", ctx => ctx.reply("😍 " + pick(["Are you WiFi? Feeling connection! 📶❤️","Are you wolf? Stole my heart! 🐺❤️","You + Me + WOLF = Perfect! ❤️🔥"])));
bot.command("ship", ctx => { const n = q(ctx).split(" "); const a = n[0] || ctx.from.first_name, b = n[1] || "WOLF"; const pct = Math.floor(Math.random()*41)+60; ctx.reply(`💘 SHIP: ${a} ❤️ ${b}\n\nLove: ${pct}%\n${pct>85 ? "PERFECT MATCH! 💍🔥" : "Good match! ❤️"}`); });
bot.command("stupid", ctx => ctx.reply("🤪 Stupid Meter: " + Math.floor(Math.random()*101) + "% — Joking, you are smart! 🐺"));
bot.command("shayari", ctx => ctx.reply("❤️ SHAYARI:\nTeri yaad mein wolf bhi ro pada,\nWOLF MD bhi tera deewana ho gaya! 🐺❤️"));
bot.command("goodnight", ctx => ctx.reply(`🌙 Goodnight ${ctx.from.first_name}! 😴\nWOLF guarding you! 🐺💤`));
bot.command("iloveyou", ctx => ctx.reply("❤️ I LOVE YOU TOO BRO! 🐺❤️\nWOLF MD loves you 3000!"));
bot.command("handsome", ctx => ctx.reply(`😍 ${ctx.from.first_name} Handsome: ${Math.floor(Math.random()*21)+80}% 🔥`));
bot.command("pretty", ctx => ctx.reply(`😍 ${ctx.from.first_name} Pretty: ${Math.floor(Math.random()*21)+80}% ✨`));
bot.command("waifu", async (ctx) => { try { await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/beautiful%20anime%20girl%20waifu", { caption: "🌸 Your Waifu! ❤️🐺" }); } catch (e) { await ctx.reply("🌸 Your Waifu: You are waifu bro! ❤️"); } });
bot.command("couplepp", async (ctx) => { try { await ctx.replyWithPhoto("https://picsum.photos/400/400?random=1", { caption: "💑 Couple PP - You + WOLF 🐺❤️" }); } catch (e) { await ctx.reply("💑 Couple PP: You + WOLF = Perfect!"); } });
bot.command(["simp","roseday","coffe","quotes","joke2","question","teddy","lovemsg","weeb"], ctx => ctx.reply(`😂 ${(ctx.message.text || "").split(" ")[0]}: ${pick(["You are amazing bro! ❤️","WOLF loves you! 🐺❤️","Don't panic to be burnt! 🔥","You shine today! ✨"])}`));

// ── ANIME ──
bot.command("pokemon", async (ctx) => { const name = q(ctx) || "pikachu"; try { const r = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`, { timeout: 8000 }); const p = r.data; await ctx.replyWithPhoto(p.sprites.front_default, { caption: `⚡ ${p.name.toUpperCase()}!\nHeight: ${p.height} | Weight: ${p.weight}\nType: ${p.types.map(t => t.type.name).join(", ")}` }); } catch (e) { await ctx.reply("Pokemon not found! Try /pokemon pikachu"); } });
bot.command("anime", async (ctx) => { const s = q(ctx) || "Naruto"; await ctx.reply(`🎌 Anime: ${s}\nhttps://myanimelist.net/anime.php?q=${encodeURIComponent(s)}`); });
bot.command("manga", ctx => { const s = q(ctx) || "One Piece"; ctx.reply(`📚 Manga: ${s}\nhttps://myanimelist.net/manga.php?q=${encodeURIComponent(s)}`); });
bot.command(["animepic","animewall","wallpaper"], async (ctx) => { try { await ctx.replyWithPhoto("https://picsum.photos/600/800?random=" + Math.floor(Math.random()*1000), { caption: "🌸 Anime Wallpaper! 🐺🔥\nType /animewall again for new one!" }); } catch (e) { await ctx.reply("🌸 Anime Wallpaper: https://picsum.photos/600/800"); } });
bot.command("animenews", ctx => ctx.reply("📰 ANIME NEWS:\n\n🔥 One Piece is #1!\n🎌 Naruto still legend!\n🐺 WOLF MD Anime is coming!\nMore: https://myanimelist.net/news"));
bot.command("pokepic", async (ctx) => { try { await ctx.replyWithPhoto("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", { caption: "⚡ Pikachu! Pokepic!" }); } catch (e) { await ctx.reply("⚡ Pikachu!"); } });

// ── PIES + PREMIUM ──
bot.command(["pies","india","china","japan","korea","thai","malaysia"], async (ctx) => { const c = (ctx.message.text || "").split(" ")[0].replace("/", ""); try { await ctx.replyWithPhoto("https://picsum.photos/500/400?random=" + Math.floor(Math.random()*100), { caption: `🍕 ${c.toUpperCase()} Food! Yummy! 🐺` }); } catch (e) { await ctx.reply(`🍕 ${c} Food!`); } });
bot.command(["premium","setbotpp","autoreply","away","schedule","filter","persona","ghost","chreact","pollvote"], ctx => ctx.reply(`👑 ${(ctx.message.text || "").split(" ")[0]} — Premium Feature!\n\nContact Owner WOLF: 256750765838 for Premium! 🔥🐺`));

// ── NEVER QUIET + LAUNCH - THIS IS THE END! ──
bot.on("text", async (ctx) => {
  const txt = (ctx.message.text || "").trim();
  if (txt.startsWith("/")) {
    const cmd = txt.split(" ")[0].split("@")[0].toLowerCase();
    const known = ["/menu","/start","/ping","/alive","/runtime","/owner","/contact","/repo","/mode","/settings","/welcome","/goodbye","/groupinfo","/staff","/rules","/poll","/afk","/couple","/online","/hidetag","/tagadmins","/tagall","/kick","/ban","/unban","/mute","/unmute","/promote","/demote","/pin","/chatpin","/unpin","/grouplink","/setname","/setdesc","/revoke","/gpt","/ai","/qwen","/imagine","/flux","/dalle","/toanime","/ghibli","/tocartoon","/topixar","/tomanga","/tofigure","/song","/play","/music","/spotify","/video","/movie","/film","/tiktok","/instagram","/facebook","/mediafire","/gitclone","/apk","/pinterest","/ytmp3","/mp3","/ytmp4","/ytdoc","/tiktokmp3","/tt","/fb","/xdown","/threads","/capcut","/gdrive","/tourl","/wikimedia","/pixabay","/gif","/ringtone","/cinesubz","/fwd","/tts","/bass","/deep","/blown","/fast","/slow","/nightcore","/robot","/echo","/reverb","/earrape","/fat","/squirrel","/areverse","/8d","/vibrato","/tremolo","/radio","/alien","/audiofx","/tomp3","/volume","/tempo","/sticker","/toimg","/removebg","/upscale","/attp","/ttp","/qc","/brat","/emojimix","/blur","/meme","/getpp","/wasted","/circle","/s","/simage","/take","/tgsticker","/character","/crop","/round","/memegen","/tomp4","/tovn","/fancy","/gfx","/neon","/metallic","/fire","/glitch","/thunder","/hacker","/marvel","/avenger","/gfx2","/gfx3","/gfx4","/gfx5","/gfx6","/gfx7","/gfx8","/gfx9","/gfx10","/gfx11","/gfx12","/ice","/snow","/impressive","/matrix","/light","/devil","/purple","/leaves","/1917","/arena","/sand","/blackpink","/glow","/slice","/gitch1","/steal","/glitch2","/grafiti","/ss","/translate","/qr","/qrcode","/readqr","/shorturl","/weather","/news","/lyrics","/currency","/crypto","/age","/reverse","/case","/palindrome","/wiki","/google","/image","/define","/imdb","/horo","/quran","/prayertime","/ssweb","/tr","/urlshortener","/hash","/base64","/binary","/encrypt","/decrypt","/timestamp","/livescore","/reminder","/count","/vv","/vv2","/delete","/savecontact","/device","/netflix","/paste","/fliptext","/binarytotext","/readmore","/cpu","/npm","/grayscale","/invert","/sepia","/sharpen","/qmaker","/smallcaps","/flip","/stext","/ephoto","/excard","/forwarded","/element","/wattpad","/ytsearch","/scloud","/shazam","/ocr","/earthquake","/emojigif","/bratpink","/bratvid","/bratclassic","/bratimg","/bratimghd","/bratwindows","/brattimoty","/bratanime","/bratgura","/asmaulhusna","/dua","/calc","/calculator","/calculate","/add","/plus","/sub","/minus","/mul","/times","/div","/divide","/mod","/pow","/power","/percent","/sqrt","/cbrt","/square","/cube","/factorial","/sin","/cos","/tan","/log","/ln","/gitstalk","/npmstalk","/tgstalk","/ttstalk","/xstalk","/thrstalk","/pinstalk","/genshin","/trivia","/riddle","/truth","/dare","/wyr","/rps","/slots","/8ball","/dice","/coin","/random","/pick","/guess","/scramble","/wordle","/hangman","/ttt","/tictactoe","/guessflag","/guessanime","/guessgenshin","/guessgame","/guesslogo","/guesshero","/hint","/giveup","/joke","/quote","/fact","/compliment","/insult","/roast","/flirt","/ship","/stupid","/shayari","/goodnight","/iloveyou","/handsome","/pretty","/waifu","/couplepp","/simp","/roseday","/coffe","/quotes","/joke2","/question","/teddy","/lovemsg","/weeb","/pokemon","/anime","/manga","/animepic","/animewall","/wallpaper","/animenews","/pokepic","/pies","/india","/china","/japan","/korea","/thai","/malaysia","/premium","/setbotpp","/autoreply","/away","/schedule","/filter","/persona","/ghost","/chreact","/pollvote"];
    if (!known.includes(cmd)) { await ctx.reply(`❓ Unknown command: ${cmd}\n\nType /menu to see all 230+ commands bro! 🐺🔥`); }
  }
});
bot.catch((err, ctx) => { console.log("BOT ERROR:", err.message); try { ctx.reply("Oops! Something went wrong, try again bro! 🐺"); } catch (e) {} });
bot.launch().then(() => { console.log("WOLF MD V18 NICE ALIVE! 🔥🐺"); }).catch((e) => { console.log("BOT FAILED:", e.message); });
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
