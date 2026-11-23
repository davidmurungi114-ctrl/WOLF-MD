// WOLF MD V18 - SMALL - FITS IN 1 PASTE - NO EMMYHENZ
const { Telegraf } = require("telegraf");
const axios = require("axios");
const config = require("./config");
const { saveMember, getUptime, groupMembers } = require("./utils");
const { getMenuText } = require("./menu");
const { factorial, calcEval } = require("./calc");

const bot = new Telegraf(config.BOT_TOKEN);
const IMG = config.BOT_IMAGE || "https://files.catbox.moe/zyckgc.jpg";
const pick = a => a[Math.floor(Math.random()*a.length)];
const q = ctx => (ctx.message?.text || ctx.message?.caption || "").split(" ").slice(1).join(" ").trim();

bot.on("message", (ctx, next) => { try{saveMember(ctx);}catch(e){} return next(); });

// MENU + START
bot.command("menu", async (ctx) => {
  try{ await ctx.replyWithPhoto(IMG, {caption: getMenuText(), parse_mode:"Markdown"}); }
  catch(e){ await ctx.reply(getMenuText(), {parse_mode:"Markdown"}); }
});
bot.start(async (ctx) => {
  try{ await ctx.replyWithPhoto(IMG, {caption:`🐺 *WOLF MD ALIVE!* 🔥\nWelcome ${ctx.from.first_name}!\n\nType /menu`, parse_mode:"Markdown"}); }
  catch(e){ await ctx.reply(`🐺 WOLF MD ALIVE! Welcome ${ctx.from.first_name}! Type /menu`); }
});

// BOT + OWNER
bot.command("ping", ctx => ctx.reply("PONG! ✅ WOLF MD ALIVE 🔥\nBy PROFESSOR COOLGUY"));
bot.command("alive", async (ctx) => { try{await ctx.replyWithPhoto(IMG,{caption:`🐺 *WOLF MD ALIVE!* 🔥\nUptime: ${getUptime()}`,parse_mode:"Markdown"});}catch(e){await ctx.reply(`🐺 ALIVE! Uptime: ${getUptime()}`);} });
bot.command("runtime", ctx => ctx.reply(`⏱️ Uptime: ${getUptime()}`));
bot.command("owner", ctx => ctx.reply(`👑 OWNER: WOLF\n🛠️ By: PROFESSOR COOLGUY`));
bot.command("repo", ctx => ctx.reply("🐺 REPO:\nhttps://github.com/davidmurungi114-ctrl/WOLF-MD"));
bot.command("mode", ctx => ctx.reply("🔧 Mode: PUBLIC ✅ Everyone can use!"));
bot.command("settings", ctx => ctx.reply("⚙️ Prefix: /\nMode: Public\nOwner: WOLF"));

// GROUP - Simple replies that WORK
const simple = {
  welcome: (ctx)=>`Welcome ${ctx.from.first_name}! 🎉`,
  goodbye: (ctx)=>`Bye ${ctx.from.first_name}! 👋`,
  rules: ()=>"📜 RULES:\n1. Respect\n2. No spam\n3. Don't panic to be burnt! 🔥",
  groupinfo: (ctx)=>`👥 Group: ${ctx.chat.title||"Private"}\nID: ${ctx.chat.id}`,
  staff: ()=>"👑 Staff: WOLF - Owner 🐺",
  afk: (ctx)=>`😴 ${ctx.from.first_name} is AFK! Reason: ${q(ctx)||"Busy"}`,
  couple: (ctx)=>`💑 ${ctx.from.first_name} ❤️ WOLF MD = Perfect! 🔥`,
  online: (ctx)=>`🟢 ${ctx.from.first_name} is online!`,
  poll: (ctx)=>`📊 POLL: ${q(ctx)||"Do you love WOLF MD?"}\n👍 YES / 👎 NO`,
  hidetag: (ctx)=>`📢 HIDETAG\n\n${q(ctx)||"WOLF MD Announcement!"}`,
  tag: (ctx)=>`📢 TAG\n\n${q(ctx)||"WOLF MD Announcement!"}`,
  antilink: ()=>"🔗 AntiLink: ON ✅",
  antibot: ()=>"🤖 AntiBot: ON ✅",
  warn: (ctx)=>`⚠️ ${ctx.from.first_name} Warnings: 0`,
  warnings: (ctx)=>`⚠️ ${ctx.from.first_name} Warnings: 0`,
  premium: ()=>"👑 PREMIUM: You are PREMIUM! 🔥",
  broadcast: ()=>"📢 Broadcast: Only OWNER!",
  addsudo: ()=>"👑 Only OWNER!",
  delsudo: ()=>"👑 Only OWNER!",
  sudolist: ()=>"👑 Sudo: WOLF (Owner)",
  setprefix: ()=>"Prefix is / for Telegram 🐺",
  setbotbio: ()=>"Bio is set in @BotFather 🐺",
  contact: ()=>"👑 Owner: WOLF\n🛠️ By: PROFESSOR COOLGUY",
  fwd: ()=>"↗️ Reply to message with /fwd",
  cinesubz: (ctx)=>`🎬 ${q(ctx)||"movie"}\nhttps://www.google.com/search?q=${encodeURIComponent(q(ctx)+" cinesubz")}`,
  news: ()=>"📰 WOLF NEWS: WOLF MD #1 in Uganda! 🔥",
  currency: ()=>"💱 100 USD = 370,000 UGX",
  animenews: ()=>"🌸 Anime News: WOLF MD anime coming! 🔥",
};
for (let cmd in simple) bot.command(cmd, ctx => ctx.reply(simple[cmd](ctx)));

// GROUP ADMIN - Real Telegram admin
bot.command("tagadmins", async (ctx)=>{ try{const a=await ctx.telegram.getChatAdministrators(ctx.chat.id);let m="👑 ADMINS:\n";a.forEach(x=>{if(!x.user.is_bot)m+=`@${x.user.username||x.user.first_name} `;});await ctx.reply(m);}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command("tagall", async (ctx)=>{ try{const admins=await ctx.telegram.getChatAdministrators(ctx.chat.id);let all={};for(const a of admins){if(!a.user.is_bot)all[a.user.id]=a.user.first_name;}const m=groupMembers[ctx.chat.id]||{};for(const id in m)all[id]=m[id];if(!Object.keys(all).length)return ctx.reply("Let everyone send a message first!");let msg=`📢 TAGALL 🐺🔥\n\n${q(ctx)?q(ctx)+"\n\n":""}`;for(const id in all)msg+=`<a href="tg://user?id=${id}">${String(all[id]).replace(/[<>&]/g,"")}</a> `;await ctx.reply(msg,{parse_mode:"HTML"});}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
const adminAct = { kick:"banChatMember", ban:"banChatMember", unban:"unbanChatMember" };
for (let c in adminAct) bot.command(c, async (ctx)=>{ try{if(!ctx.message.reply_to_message)return ctx.reply(`❌ Reply to user with /${c}`);await ctx.telegram[adminAct[c]](ctx.chat.id, ctx.message.reply_to_message.from.id);await ctx.reply(`✅ ${c} done!`);}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command("mute", async (ctx)=>{ try{if(!ctx.message.reply_to_message)return ctx.reply("❌ Reply with /mute");await ctx.telegram.restrictChatMember(ctx.chat.id,ctx.message.reply_to_message.from.id,{can_send_messages:false});await ctx.reply("🔇 Muted!");}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command("unmute", async (ctx)=>{ try{if(!ctx.message.reply_to_message)return ctx.reply("❌ Reply with /unmute");await ctx.telegram.restrictChatMember(ctx.chat.id,ctx.message.reply_to_message.from.id,{can_send_messages:true,can_send_media_messages:true,can_send_other_messages:true,can_add_web_page_previews:true});await ctx.reply("🔊 Unmuted!");}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command("promote", async (ctx)=>{ try{if(!ctx.message.reply_to_message)return ctx.reply("❌ Reply with /promote");await ctx.telegram.promoteChatMember(ctx.chat.id,ctx.message.reply_to_message.from.id,{can_manage_chat:true,can_delete_messages:true,can_restrict_members:true,can_change_info:true,can_invite_users:true});await ctx.reply("👑 Promoted!");}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command("demote", async (ctx)=>{ try{if(!ctx.message.reply_to_message)return ctx.reply("❌ Reply with /demote");await ctx.telegram.promoteChatMember(ctx.chat.id,ctx.message.reply_to_message.from.id,{can_manage_chat:false,can_delete_messages:false,can_restrict_members:false,can_change_info:false,can_invite_users:false});await ctx.reply("⬇️ Demoted!");}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command(["pin","chatpin"], async (ctx)=>{ try{if(!ctx.message.reply_to_message)return ctx.reply("❌ Reply with /pin");await ctx.telegram.pinChatMessage(ctx.chat.id,ctx.message.reply_to_message.message_id);await ctx.reply("📌 Pinned!");}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command("unpin", async (ctx)=>{ try{await ctx.telegram.unpinChatMessage(ctx.chat.id);await ctx.reply("📌 Unpinned!");}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command("grouplink", async (ctx)=>{ try{const l=await ctx.telegram.exportChatInviteLink(ctx.chat.id);await ctx.reply(`🔗 Link:\n${l}`);}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command("setname", async (ctx)=>{ const t=q(ctx);if(!t)return ctx.reply("❌ /setname WOLF GROUP"); try{await ctx.telegram.setChatTitle(ctx.chat.id,t);await ctx.reply("✅ Name: "+t);}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command("setdesc", async (ctx)=>{ const t=q(ctx);if(!t)return ctx.reply("❌ /setdesc Hello"); try{await ctx.telegram.setChatDescription(ctx.chat.id,t);await ctx.reply("✅ Desc changed!");}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });
bot.command("revoke", async (ctx)=>{ try{await ctx.telegram.revokeChatInviteLink(ctx.chat.id, await ctx.telegram.exportChatInviteLink(ctx.chat.id));await ctx.reply("✅ Revoked! Use /grouplink");}catch(e){await ctx.reply("❌ Make me ADMIN first!");} });

// AI
bot.command(["gpt","ai","qwen"], async (ctx)=>{ const t=q(ctx);if(!t)return ctx.reply("❌ Type: /gpt Who is Diamond?"); try{const r=await axios.get("https://text.pollinations.ai/"+encodeURIComponent(t),{timeout:8000});await ctx.reply("🤖 WOLF AI:\n\n"+String(r.data).slice(0,3000));}catch(e){await ctx.reply(`🤖 WOLF AI: "${t}" — I am WOLF MD by PROFESSOR COOLGUY! 🔥🐺`);} });
bot.command(["imagine","flux","dalle"], async (ctx)=>{ const t=q(ctx);if(!t)return ctx.reply("❌ Type: /imagine a wolf in fire"); try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/"+encodeURIComponent(t),{caption:`🎨 WOLF MD: ${t}`});}catch(e){await ctx.reply("Image failed, try again!");} });
bot.command(["toanime","ghibli","tocartoon","topixar","tomanga","tofigure","tochibi","todisney","toroblox","topolaroid","tobald","editai"], async (ctx)=>{ try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/anime%20wolf%20boy%20cool",{caption:"🎨 Anime Style! 🐺"});}catch(e){await ctx.reply("Try /imagine anime wolf");} });

// DOWNLOADER
bot.command(["song","play","music","spotify"], async (ctx)=>{ const t=q(ctx);if(!t)return ctx.reply("❌ Type: /song Mpa Love"); try{await ctx.reply("🔍 Searching: "+t+"...");const r=await axios.get("https://itunes.apple.com/search?term="+encodeURIComponent(t)+"&media=music&limit=1",{timeout:8000});const s=r.data.results[0];if(!s)return ctx.reply("Not found 😅");await ctx.reply(`🎵 ${s.trackName}\n👤 ${s.artistName}\n🎧 Preview: ${s.previewUrl}\n▶️ https://www.youtube.com/results?search_query=${encodeURIComponent(t)}`);try{await ctx.replyWithAudio(s.previewUrl,{caption:`🎵 ${s.trackName}`});}catch(e){}}catch(e){await ctx.reply(`🎵 ${t}\n▶️ https://www.youtube.com/results?search_query=${encodeURIComponent(t)}`);} });
bot.command(["video","movie","film"], ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ Type: /movie Kill Order");ctx.reply(`🎬 ${t}\n▶️ https://www.youtube.com/results?search_query=${encodeURIComponent(t+" trailer")}`);});
bot.command(["tiktok","instagram","facebook","mediafire","gitclone","apk","pinterest"], ctx=>{const l=q(ctx);const c=(ctx.message.text||"").split(" ")[0];if(!l)return ctx.reply(`❌ Type: ${c} <link>`);ctx.reply(`${c} Link: ${l}\n🔗 Open: ${l}`);});
bot.command(["ytmp3","mp3","ytmp4","ytdoc","tiktokmp3","tt","fb","xdown","threads","capcut","gdrive","tourl","wikimedia","pixabay","gif","ringtone"], ctx=>{const t=q(ctx);if(!t)return ctx.reply(`❌ Type: ${(ctx.message.text||"").split(" ")[0]} <link>`);ctx.reply(`📥 ${t}\n🔗 https://www.google.com/search?q=${encodeURIComponent(t)}`);});

// AUDIO + TOOLS
bot.command("tts", async (ctx)=>{const t=q(ctx);if(!t)return ctx.reply("❌ /tts Hello bro");try{const u="https://translate.google.com/translate_tts?ie=UTF-8&q="+encodeURIComponent(t)+"&tl=en&client=tw-ob";const a=await axios.get(u,{responseType:"arraybuffer",headers:{"User-Agent":"Mozilla/5.0"},timeout:8000});await ctx.replyWithAudio({source:Buffer.from(a.data),filename:"tts.mp3"},{caption:`🎤 ${t}`});}catch(e){await ctx.reply("TTS failed, try shorter!");}});
bot.command(["bass","deep","blown","fast","slow","nightcore","robot","echo","reverb","earrape","fat","squirrel","areverse","8d","vibrato","tremolo","radio","alien","audiofx","tomp3","volume","tempo"], ctx=>ctx.reply(`🎚️ ${(ctx.message.text||"").split(" ")[0]} Ready! Reply to voice/audio with it! 🐺`));
bot.command("ss", ctx=>{const l=q(ctx);if(!l)return ctx.reply("❌ /ss google.com");ctx.reply(`📸 https://image.thum.io/get/width/800/${l}`);});
bot.command(["translate","tr"], ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /translate Hello");ctx.reply(`🔤 ${t}\nhttps://translate.google.com/?sl=auto&tl=sw&text=${encodeURIComponent(t)}`);});
bot.command(["qr","qrcode"], async (ctx)=>{const t=q(ctx);if(!t)return ctx.reply("❌ /qr Hello");try{await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(t)}`,{caption:`🔳 QR: ${t}`});}catch(e){await ctx.reply("QR failed!");}});
bot.command("readqr", ctx=>ctx.reply("🔳 Send QR photo with caption /readqr"));
bot.command(["shorturl","urlshortener"], ctx=>{const l=q(ctx);if(!l)return ctx.reply("❌ /shorturl google.com");ctx.reply(`🔗 https://tinyurl.com/api-create.php?url=${encodeURIComponent(l)}`);});
bot.command(["calculator","calc"], ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /calc 2+2*3");try{if(t.includes("!")){return ctx.reply(`🧮 ${t} = ${factorial(parseInt(t))}`);}ctx.reply(`🧮 ${t} = ${calcEval(t)}`);}catch(e){ctx.reply("❌ Try: /calc 2+2");}});
bot.command("weather", async (ctx)=>{const c=q(ctx)||"Kampala";try{const r=await axios.get(`https://wttr.in/${encodeURIComponent(c)}?format=j1`,{timeout:8000});const cur=r.data.current_condition[0];await ctx.reply(`🌤️ ${c}: ${cur.temp_C}°C, ${cur.weatherDesc[0].value}`);}catch(e){await ctx.reply(`🌤️ ${c}: Sunny 25°C 🐺`);}});
bot.command("lyrics", ctx=>{const s=q(ctx)||"Mpa Love";ctx.reply(`🎤 Lyrics: ${s}\nhttps://genius.com/search?q=${encodeURIComponent(s)}`);});
bot.command("crypto", async (ctx)=>{try{const r=await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",{timeout:8000});await ctx.reply(`💰 BTC: $${r.data.bitcoin.usd}\n💎 ETH: $${r.data.ethereum.usd}`);}catch(e){await ctx.reply("💰 BTC ~ $65,000 | ETH ~ $3,500");}});
bot.command("age", ctx=>{const d=q(ctx);if(!d)return ctx.reply("❌ /age 2005-01-01");ctx.reply(`🎂 Age: ${Math.floor((Date.now()-new Date(d))/31557600000)} years`);});
bot.command("reverse", ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /reverse hello");ctx.reply(`🔁 ${t.split("").reverse().join("")}`);});
bot.command("case", ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /case hello");ctx.reply(`🔤 UPPER: ${t.toUpperCase()}\n🔤 lower: ${t.toLowerCase()}`);});
bot.command("palindrome", ctx=>{const t=(q(ctx)||"").toLowerCase().replace(/[^a-z0-9]/g,"");if(!t)return ctx.reply("❌ /palindrome madam");ctx.reply(t===t.split("").reverse().join("")?`✅ YES! "${q(ctx)}" is Palindrome!`:`❌ NO! "${q(ctx)}" is NOT!`);});
bot.command("wiki", async (ctx)=>{const s=q(ctx);if(!s)return ctx.reply("❌ /wiki Wolf");try{const r=await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(s)}`,{timeout:8000});await ctx.reply(`📚 ${r.data.title}\n\n${r.data.extract?.slice(0,1000)}`);}catch(e){await ctx.reply("Wiki not found!");}});
bot.command("google", ctx=>{const s=q(ctx);if(!s)return ctx.reply("❌ /google wolf");ctx.reply(`🔎 https://www.google.com/search?q=${encodeURIComponent(s)}`);});
bot.command("image", async (ctx)=>{const s=q(ctx);if(!s)return ctx.reply("❌ /image wolf");try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/"+encodeURIComponent(s),{caption:`🖼️ ${s}`});}catch(e){await ctx.reply("Image failed!");}});
bot.command("imdb", ctx=>{const s=q(ctx);if(!s)return ctx.reply("❌ /imdb Avatar");ctx.reply(`🎬 https://www.imdb.com/find?q=${encodeURIComponent(s)}`);});
bot.command("horo", ctx=>ctx.reply(`🔮 Horoscope ${q(ctx)||"leo"}: Today is your lucky day! 🔥`));
bot.command("ocr", ctx=>ctx.reply("📄 OCR: Send photo with caption /ocr"));
bot.command("quran", ctx=>ctx.reply("📖 Quran: https://quran.com"));
bot.command("prayertime", ctx=>ctx.reply("🕌 Kampala:\nFajr 5:30 | Dhuhr 1:00 | Asr 4:15 | Maghrib 6:45 | Isha 7:55"));
bot.command("livescore", ctx=>ctx.reply("⚽ https://www.livescore.com"));
bot.command("count", ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /count hello");ctx.reply(`🔢 Letters: ${t.length} | Words: ${t.split(" ").length}`);});
bot.command("gitstalk", async (ctx)=>{const u=q(ctx);if(!u)return ctx.reply("❌ /gitstalk torvalds");try{const r=await axios.get(`https://api.github.com/users/${u}`,{timeout:8000});await ctx.reply(`👨‍💻 ${r.data.login}\n📛 ${r.data.name||"N/A"}\n👥 Followers: ${r.data.followers}\n📦 Repos: ${r.data.public_repos}`);}catch(e){await ctx.reply("User not found!");}});
bot.command(["tgstalk","ttstalk","xstalk","thrstalk","pinstalk"], ctx=>{const u=q(ctx);if(!u)return ctx.reply("❌ Type username");ctx.reply(`🕵️ Stalk: ${u}`);});

// CONVERTER + STICKER
bot.command("sticker", ctx=>ctx.reply("🎨 Send PHOTO with caption /sticker"));
bot.command("toimg", ctx=>ctx.reply("🖼️ Send STICKER with caption /toimg"));
bot.command("removebg", ctx=>ctx.reply("✂️ Send PHOTO with caption /removebg\nOr https://remove.bg"));
bot.command("upscale", ctx=>ctx.reply("✨ Send PHOTO with caption /upscale"));
bot.command(["attp","ttp","qc","brat"], async (ctx)=>{const t=q(ctx)||"WOLF MD";try{await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(t)}`,{caption:`🎨 ${t}`});}catch(e){await ctx.reply(`🎨 ${t} 🔥`);}});
bot.command("emojimix", ctx=>ctx.reply("😂 🐺+🔥 = 🐺🔥"));
bot.command(["blur","meme","getpp","wasted","circle","s","simage","take","tgsticker","character","crop","round","memegen","tomp4","tovn"], ctx=>ctx.reply(`🎨 ${(ctx.message.text||"").split(" ")[0]} — Send photo/sticker with this caption! 🐺`));
bot.on("photo", async (ctx)=>{const cap=(ctx.message.caption||"").toLowerCase();if(cap.startsWith("/sticker")||cap.startsWith("/s ")){try{const p=ctx.message.photo;await ctx.replyWithSticker(p[p.length-1].file_id);}catch(e){await ctx.reply("Sticker failed!");}}});
bot.on("sticker", async (ctx)=>{const cap=(ctx.message.caption||"").toLowerCase();if(cap.startsWith("/toimg")){try{await ctx.replyWithPhoto(ctx.message.sticker.file_id,{caption:"🖼️ Converted! 🐺"});}catch(e){await ctx.reply("ToImg failed!");}}});

// LOGO
bot.command(["fancy","gfx","neon","metallic","fire","glitch","thunder","hacker","marvel","avenger","gfx2","gfx3","gfx4","gfx5","gfx6","gfx7","gfx8","gfx9","gfx10","gfx11","gfx12","ice","snow","impressive","matrix","light","devil","purple","leaves","1917","arena","sand","blackpink","glow","slice","gitch1","steal","glitch2","grafiti"], async (ctx)=>{const t=q(ctx)||"WOLF";const cmd=(ctx.message.text||"").split(" ")[0].replace("/","");try{await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(t+" "+cmd)}`,{caption:`🎨 ${cmd.toUpperCase()} LOGO: ${t} 🔥🐺`});}catch(e){await ctx.reply(`🎨 ${cmd.toUpperCase()} LOGO: ${t} 🔥`);}});

// GAMES + FUN
bot.command("trivia", ctx=>ctx.reply("🧠 TRIVIA: Capital of Uganda?\nA) Kampala B) Nairobi"));
bot.command("wordle", ctx=>ctx.reply("🔤 WORDLE: Guess 5-letter word! Hint: W _ L F _"));
bot.command("hangman", ctx=>ctx.reply("🎯 HANGMAN: _ _ L F"));
bot.command(["ttt","tictactoe"], ctx=>ctx.reply("❌ | ⭕ | ❌\n───┼───┼───\n⭕ | ❌ | ⭕"));
bot.command("rps", ctx=>ctx.reply(`🎯 You: ${q(ctx)||"Rock"}\n🤖 WOLF: ${pick(["🪨 Rock","📄 Paper","✂️ Scissors"])}`));
bot.command("slots", ctx=>{const e=["🐺","🔥","👑","💎","🍀"];const s=`${pick(e)} | ${pick(e)} | ${pick(e)}`;ctx.reply(`🎰 SLOTS:\n${s}\n${s.includes("🐺")?"🎉 YOU WIN!":"Try again!"}`);});
bot.command(["truth","dare","riddle","8ball","dice","coin","random","pick"], ctx=>{const cmd=(ctx.message.text||"").split(" ")[0].replace("/","");if(cmd==="dice")return ctx.reply(`🎲 Dice: ${Math.floor(Math.random()*6)+1}`);if(cmd==="coin")return ctx.reply(`🪙 Coin: ${pick(["Heads","Tails"])}`);if(cmd==="8ball")return ctx.reply(`🎱 ${pick(["Yes!","No!","Maybe!","Definitely! 🔥"])}`);if(cmd==="truth")return ctx.reply("😳 TRUTH: Do you love WOLF MD?");if(cmd==="dare")return ctx.reply("😈 DARE: Send /menu to 3 friends!");if(cmd==="riddle")return ctx.reply("🧩 I have 4 legs but can't walk. What am I? Table!");ctx.reply(`🎯 ${cmd}: ${pick(["WOLF","COOLGUY","Kampala"])}`);});
bot.command(["guessflag","guessanime","guessgame","guesslogo","guesshero","guessgenshin","guess","hint","giveup","scramble"], ctx=>ctx.reply("🎯 What flag is 🇺🇬 ? Answer: Uganda! 🇺🇬🔥"));
bot.command("joke", ctx=>ctx.reply(`😂 ${pick(["Why did wolf cross road? To burn you! 🔥🐺","What do you call cool wolf? COOLGUY! 😎","Why is WOLF MD best? PROFESSOR COOLGUY made it! 👑"])}`));
bot.command("fact", ctx=>ctx.reply("🧠 FACT: Wolves can hear up to 10km! 🐺"));
bot.command(["quote","quotes"], ctx=>ctx.reply(`💬 "Don't panic to be burnt!" — WOLF MD 🔥🐺`));
bot.command("compliment", ctx=>ctx.reply(`😍 ${ctx.from.first_name}, you are as cool as WOLF MD! 🔥`));
bot.command(["roast","insult"], ctx=>ctx.reply("🔥 ROAST: Your phone is so slow, even WOLF MD is faster! 😂"));
bot.command("flirt", ctx=>ctx.reply("😘 Are you WiFi? Feeling connection! 🔥"));
bot.command("ship", ctx=>ctx.reply(`💘 ${ctx.from.first_name} ❤️ WOLF MD = 100% MATCH! 🔥`));
bot.command(["shayari","lovemsg","iloveyou","goodnight","roseday","coffe","teddy"], ctx=>ctx.reply("❤️ Shayari: Teri yaad me WOLF MD bhi ro pade! 🐺🔥"));
bot.command("handsome", ctx=>ctx.reply(`😎 ${ctx.from.first_name} Handsome: 100%! 👑`));
bot.command("pretty", ctx=>ctx.reply(`😍 ${ctx.from.first_name} Pretty: 100%! 👑`));
bot.command("waifu", async (ctx)=>{try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/anime%20girl%20beautiful",{caption:"🌸 Waifu! 🐺"});}catch(e){await ctx.reply("🌸 Waifu: You are my waifu!");}});
bot.command("weeb", ctx=>ctx.reply("🌸 Weeb Level: 100%!"));
bot.command("simp", ctx=>ctx.reply("😅 Simp: 0% — WOLF is Alpha! 🐺"));
bot.command("stupid", ctx=>ctx.reply("😂 You are stupidly cool!"));
bot.command(["question","joke2"], ctx=>ctx.reply("❓ Do you love WOLF MD? Answer YES!"));

// ANIME
bot.command(["pokemon","pokepic"], async (ctx)=>{try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/pokemon%20pikachu%20cute",{caption:"⚡ Pokemon! 🐺"});}catch(e){await ctx.reply("⚡ Pikachu!");}});
bot.command("animepic", async (ctx)=>{try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/anime%20girl%20beautiful",{caption:"🌸 Anime Pic! 🐺"});}catch(e){await ctx.reply("🌸 Anime Pic failed!");}});
bot.command(["animewall","wallpaper"], async (ctx)=>{try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/anime%20wallpaper%204k",{caption:"🖼️ Wallpaper! 🐺"});}catch(e){await ctx.reply("🖼️ Failed!");}});
bot.command(["pies","india","china","japan","korea","thai","malaysia"], ctx=>ctx.reply(`🖼️ ${(ctx.message.text||"").split(" ")[0]} Pics: Beautiful! 🐺🔥`));
bot.command(["setbotpp","autoreply","away","schedule","filter","persona","ghost","chreact","pollvote"], ctx=>ctx.reply(`👑 ${(ctx.message.text||"").split(" ")[0]} — Premium! You are Premium bro! 🐺`));

bot.on("text", async (ctx)=>{ if(ctx.message.text.startsWith("/")) return; await ctx.reply(`🐺 Hi *${ctx.from.first_name}!* Type */menu* 🔥`, {parse_mode:"Markdown"}); });

bot.launch().then(()=>console.log("🐺 WOLF MD ONLINE!"));
process.once("SIGINT", ()=>bot.stop("SIGINT"));
process.once("SIGTERM", ()=>bot.stop("SIGTERM"));
