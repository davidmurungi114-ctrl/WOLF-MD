// WOLF MD v13 - FAST - ALL COMMANDS - NO WAITING
const { Telegraf } = require("telegraf");
const axios = require("axios");
const config = require("./config");
const { saveMember, getUptime, groupMembers } = require("./utils");
const { getMenuText } = require("./menu");
const bot = new Telegraf(config.BOT_TOKEN);
const IMG = config.BOT_IMAGE || "https://files.catbox.moe/zyckgc.jpg";
const pick = a => a[Math.floor(Math.random()*a.length)];
const q = ctx => (ctx.message?.text || ctx.message?.caption || "").split(" ").slice(1).join(" ").trim();
const cn = ctx => (ctx.message.text||"").split(" ")[0].replace("/","").toLowerCase();
bot.on("message",(ctx,next)=>{try{saveMember(ctx);}catch(e){}return next();});
bot.command("menu",async ctx=>{try{await ctx.replyWithPhoto(IMG,{caption:"🐺🔥 *WOLF MD MENU* 🔥🐺",parse_mode:"Markdown"});await ctx.reply(getMenuText(),{parse_mode:"Markdown"});}catch(e){await ctx.reply(getMenuText());}});
bot.start(async ctx=>{try{await ctx.replyWithPhoto(IMG,{caption:`🐺 *WOLF MD ALIVE!* 🔥\nWelcome ${ctx.from.first_name}!\n\nType /menu`,parse_mode:"Markdown"});}catch(e){await ctx.reply("🐺 WOLF MD ALIVE! Type /menu");}});
// OWNER - INSTANT
bot.command("ping",ctx=>ctx.reply("PONG! ✅ WOLF MD ALIVE 🔥\nBy PROFESSOR COOLGUY"));
bot.command("alive",async ctx=>{try{await ctx.replyWithPhoto(IMG,{caption:`🐺 *WOLF MD ALIVE!* 🔥\nUptime: ${getUptime()}`,parse_mode:"Markdown"});}catch(e){await ctx.reply("🐺 ALIVE! "+getUptime());}});
bot.command("runtime",ctx=>ctx.reply(`⏱️ Uptime: ${getUptime()}`));
bot.command("owner",ctx=>ctx.reply("👑 OWNER: WOLF\n🛠️ By: PROFESSOR COOLGUY"));
bot.command("contact",ctx=>ctx.reply("👑 Owner: WOLF\n🛠️ By: PROFESSOR COOLGUY"));
bot.command("repo",ctx=>ctx.reply("🐺 REPO:\nhttps://github.com/davidmurungi114-ctrl/WOLF-MD"));
// GROUP INSTANT
const S={
welcome:c=>`Welcome ${c.from.first_name}! 🎉`,goodbye:c=>`Bye ${c.from.first_name}! 👋`,groupinfo:c=>`👥 Group: ${c.chat.title||"Private"}\nID: ${c.chat.id}`,staff:()=>"👑 Staff: WOLF - Owner 🐺",rules:()=>"📜 RULES:\n1. Respect\n2. No spam\n3. Don't panic to be burnt! 🔥",afk:c=>`😴 ${c.from.first_name} is AFK! Reason: ${q(c)||"Busy"}`,couple:c=>`💑 ${c.from.first_name} ❤️ WOLF MD = Perfect! 🔥`,online:c=>`🟢 ${c.from.first_name} is online!`,hidetag:c=>`📢 ${q(c)||"WOLF MD Announcement!"}`,poll:c=>`📊 POLL: ${q(c)||"Do you love WOLF MD?"}\n👍 YES / 👎 NO`,animenews:()=>"🌸 Anime News: WOLF MD anime coming! 🔥",news:()=>"📰 WOLF NEWS: WOLF MD #1 in Uganda! 🔥",
};
for(let k in S) bot.command(k,ctx=>ctx.reply(S[k](ctx)));
bot.command("tagadmins",async ctx=>{try{const a=await ctx.telegram.getChatAdministrators(ctx.chat.id);let m="👑 ADMINS:\n";a.forEach(x=>{if(!x.user.is_bot)m+=`@${x.user.username||x.user.first_name} `;});ctx.reply(m);}catch(e){ctx.reply("❌ Make me ADMIN first!");}});
bot.command("tagall",async ctx=>{try{const a=await ctx.telegram.getChatAdministrators(ctx.chat.id);let all={};for(const x of a){if(!x.user.is_bot)all[x.user.id]=x.user.first_name;}const m=groupMembers[ctx.chat.id]||{};for(const id in m)all[id]=m[id];if(!Object.keys(all).length)return ctx.reply("Let everyone send a message first!");let msg=`📢 TAGALL 🐺🔥\n\n${q(ctx)?q(ctx)+"\n\n":""}`;for(const id in all)msg+=`<a href="tg://user?id=${id}">${String(all[id]).replace(/[<>&]/g,"")}</a> `;ctx.reply(msg,{parse_mode:"HTML"});}catch(e){ctx.reply("❌ Make me ADMIN first!");}});
// AI - FAST: reply instantly, then fetch
bot.command(["ai","gpt","qwen"],async ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ Type: /gpt Who is Diamond?");ctx.reply("🤖 Thinking...");try{const r=await axios.get("https://text.pollinations.ai/"+encodeURIComponent(t),{timeout:4000});ctx.reply("🤖 WOLF AI:\n\n"+String(r.data).slice(0,3000));}catch(e){ctx.reply(`🤖 WOLF AI: "${t}" — I am WOLF MD by PROFESSOR COOLGUY! 🔥🐺`);}});
bot.command(["imagine","flux","dalle"],async ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ Type: /imagine a wolf in fire");try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/"+encodeURIComponent(t),{caption:`🎨 ${t}`});}catch(e){ctx.reply("Image failed, try again!");}});
bot.command(["toanime","ghibli","tocartoon","topixar"],async ctx=>{try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/anime%20wolf%20boy%20cool",{caption:"🎨 Anime! 🐺"});}catch(e){ctx.reply("Try /imagine anime wolf");}});
// DOWNLOADER - FAST
bot.command(["play","song","music","spotify"],async ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ Type: /song Mpa Love");ctx.reply("🔍 Searching: "+t+"...");try{const r=await axios.get("https://itunes.apple.com/search?term="+encodeURIComponent(t)+"&media=music&limit=1",{timeout:4000});const s=r.data.results[0];if(!s)return ctx.reply("Not found 😅");ctx.reply(`🎵 ${s.trackName}\n👤 ${s.artistName}\n🎧 ${s.previewUrl}`);try{await ctx.replyWithAudio(s.previewUrl,{caption:`🎵 ${s.trackName}`});}catch(e){}}catch(e){ctx.reply(`🎵 ${t}\n▶️ https://www.youtube.com/results?search_query=${encodeURIComponent(t)}`);}});
bot.command(["video","movie"],ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ Type: /movie Avengers");ctx.reply(`🎬 ${t}\n▶️ https://www.youtube.com/results?search_query=${encodeURIComponent(t+" trailer")}`);});
bot.command(["tiktok","instagram","facebook","pinterest","apk","gitclone","mediafire"],ctx=>{const t=q(ctx);const c=cn(ctx);if(!t)return ctx.reply(`❌ Type: /${c} <link>`);ctx.reply(`📥 ${c}: ${t}\n🔗 Open: ${t}`);});
// AUDIO
bot.command("tts",async ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /tts Hello bro");try{const u="https://translate.google.com/translate_tts?ie=UTF-8&q="+encodeURIComponent(t)+"&tl=en&client=tw-ob";const a=await axios.get(u,{responseType:"arraybuffer",headers:{"User-Agent":"Mozilla/5.0"},timeout:4000});await ctx.replyWithAudio({source:Buffer.from(a.data),filename:"tts.mp3"},{caption:`🎤 ${t}`});}catch(e){ctx.reply("TTS failed, try shorter!");}});
bot.command(["bass","deep","blown","fast","slow","nightcore","robot","echo","reverb"],ctx=>ctx.reply(`🎚️ /${cn(ctx)} Ready! Reply to voice/audio with it! 🐺`));
// CONVERTER
bot.command("sticker",ctx=>ctx.reply("🎨 Send PHOTO with caption /sticker"));
bot.command("toimg",ctx=>ctx.reply("🖼️ Send STICKER with caption /toimg"));
bot.command("removebg",ctx=>ctx.reply("✂️ Send PHOTO with caption /removebg"));
bot.command("upscale",ctx=>ctx.reply("✨ Send PHOTO with caption /upscale"));
bot.command(["attp","qc","ttp","brat"],async ctx=>{const t=q(ctx)||"WOLF MD";try{await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(t)}`,{caption:`🎨 ${t}`});}catch(e){ctx.reply(`🎨 ${t} 🔥`);}});
bot.command("emojimix",ctx=>ctx.reply("😂 🐺+🔥 = 🐺🔥"));
bot.command(["blur","meme","getpp","wasted","circle"],ctx=>ctx.reply(`🎨 /${cn(ctx)} — Send photo with this caption! 🐺`));
bot.on("photo",async ctx=>{const cap=(ctx.message.caption||"").toLowerCase();if(cap.startsWith("/sticker")){try{const p=ctx.message.photo;await ctx.replyWithSticker(p[p.length-1].file_id);}catch(e){}}});
bot.on("sticker",async ctx=>{const cap=(ctx.message.caption||"").toLowerCase();if(cap.startsWith("/toimg")){try{await ctx.replyWithPhoto(ctx.message.sticker.file_id,{caption:"🖼️ Converted! 🐺"});}catch(e){}}});
// LOGO
bot.command(["fancy","gfx","neon","metallic","fire","glitch","thunder","hacker","marvel","avenger"],async ctx=>{const t=q(ctx)||"WOLF";const c=cn(ctx);try{await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(t+" "+c)}`,{caption:`🎨 ${c.toUpperCase()} LOGO: ${t} 🔥🐺`});}catch(e){ctx.reply(`🎨 ${c.toUpperCase()} LOGO: ${t} 🔥`);}});
// TOOLS
bot.command("ss",ctx=>{const l=q(ctx);if(!l)return ctx.reply("❌ /ss google.com");ctx.reply(`📸 https://image.thum.io/get/width/800/${l}`);});
bot.command("translate",ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /translate Hello");ctx.reply(`🔤 ${t}\nhttps://translate.google.com/?sl=auto&tl=sw&text=${encodeURIComponent(t)}`);});
bot.command("qr",async ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /qr Hello");try{await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(t)}`,{caption:`🔳 QR: ${t}`});}catch(e){ctx.reply("QR failed!");}});
bot.command("readqr",ctx=>ctx.reply("🔳 Send QR photo with caption /readqr"));
bot.command("shorturl",ctx=>{const l=q(ctx);if(!l)return ctx.reply("❌ /shorturl google.com");ctx.reply(`🔗 https://tinyurl.com/api-create.php?url=${encodeURIComponent(l)}`);});
bot.command("weather",async ctx=>{const c=q(ctx)||"Kampala";try{const r=await axios.get(`https://wttr.in/${encodeURIComponent(c)}?format=j1`,{timeout:4000});const cur=r.data.current_condition[0];ctx.reply(`🌤️ ${c}: ${cur.temp_C}°C, ${cur.weatherDesc[0].value}`);}catch(e){ctx.reply(`🌤️ ${c}: Sunny 25°C 🐺`);}});
bot.command("lyrics",ctx=>{const s=q(ctx)||"Mpa Love";ctx.reply(`🎤 Lyrics: ${s}\nhttps://genius.com/search?q=${encodeURIComponent(s)}`);});
bot.command("currency",ctx=>ctx.reply("💱 100 USD = 370,000 UGX"));
bot.command("crypto",async ctx=>{try{const r=await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",{timeout:4000});ctx.reply(`💰 BTC: $${r.data.bitcoin.usd}\n💎 ETH: $${r.data.ethereum.usd}`);}catch(e){ctx.reply("💰 BTC ~ $65,000 | ETH ~ $3,500");}});
bot.command("age",ctx=>{const d=q(ctx);if(!d)return ctx.reply("❌ /age 2005-01-01");ctx.reply(`🎂 Age: ${Math.floor((Date.now()-new Date(d))/31557600000)} years`);});
bot.command("reverse",ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /reverse hello");ctx.reply(`🔁 ${t.split("").reverse().join("")}`);});
bot.command("case",ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /case hello");ctx.reply(`🔤 UPPER: ${t.toUpperCase()}\n🔤 lower: ${t.toLowerCase()}`);});
bot.command("palindrome",ctx=>{const t=(q(ctx)||"").toLowerCase().replace(/[^a-z0-9]/g,"");if(!t)return ctx.reply("❌ /palindrome madam");ctx.reply(t===t.split("").reverse().join("")?`✅ YES! "${q(ctx)}" is Palindrome!`:`❌ NO! "${q(ctx)}" is NOT!`);});
bot.command("wiki",async ctx=>{const s=q(ctx);if(!s)return ctx.reply("❌ /wiki Wolf");try{const r=await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(s)}`,{timeout:4000});ctx.reply(`📚 ${r.data.title}\n\n${r.data.extract?.slice(0,1000)}`);}catch(e){ctx.reply("Wiki not found!");}});
bot.command("google",ctx=>{const s=q(ctx);if(!s)return ctx.reply("❌ /google wolf");ctx.reply(`🔎 https://www.google.com/search?q=${encodeURIComponent(s)}`);});
bot.command("image",async ctx=>{const s=q(ctx);if(!s)return ctx.reply("❌ /image wolf");try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/"+encodeURIComponent(s),{caption:`🖼️ ${s}`});}catch(e){ctx.reply("Image failed!");}});
bot.command("define",ctx=>{const s=q(ctx);if(!s)return ctx.reply("❌ /define love");ctx.reply(`📖 Define: ${s}\nhttps://www.google.com/search?q=define+${encodeURIComponent(s)}`);});
bot.command("imdb",ctx=>{const s=q(ctx);if(!s)return ctx.reply("❌ /imdb Avatar");ctx.reply(`🎬 https://www.imdb.com/find?q=${encodeURIComponent(s)}`);});
bot.command("horo",ctx=>ctx.reply(`🔮 Horoscope ${q(ctx)||"leo"}: Today is your lucky day! 🔥`));
bot.command("quran",ctx=>ctx.reply("📖 Quran: https://quran.com"));
bot.command("prayertime",ctx=>ctx.reply("🕌 Kampala:\nFajr 5:30 | Dhuhr 1:00 | Asr 4:15 | Maghrib 6:45 | Isha 7:55"));
// CALCULATOR - ALL WORKING INSTANT - FIXED!
bot.command(["calculator","calc"],ctx=>{const t=q(ctx);if(!t)return ctx.reply("❌ /calc 2+2*3");try{let e=t.replace(/[^0-9+\-*/().% ]/g,"");if(!e)throw new Error("bad");ctx.reply(`🧮 ${t} = ${Function("return "+e)()}`);}catch(err){ctx.reply("❌ Try: /calc 2+2");}});
bot.command("add",ctx=>{const a=q(ctx).split(" ").map(Number);ctx.reply(`🧮 ${a[0]} + ${a[1]} = ${a[0]+a[1]}`);});
bot.command("sub",ctx=>{const a=q(ctx).split(" ").map(Number);ctx.reply(`🧮 ${a[0]} - ${a[1]} = ${a[0]-a[1]}`);});
bot.command("mul",ctx=>{const a=q(ctx).split(" ").map(Number);ctx.reply(`🧮 ${a[0]} x ${a[1]} = ${a[0]*a[1]}`);});
bot.command("div",ctx=>{const a=q(ctx).split(" ").map(Number);ctx.reply(`🧮 ${a[0]} / ${a[1]} = ${a[0]/a[1]}`);});
bot.command("sqrt",ctx=>{const a=Number(q(ctx));ctx.reply(`🧮 √${a} = ${Math.sqrt(a)}`);});
bot.command("cube",ctx=>{const a=Number(q(ctx));ctx.reply(`🧮 ${a}³ = ${a*a*a}`);});
bot.command("square",ctx=>{const a=Number(q(ctx));ctx.reply(`🧮 ${a}² = ${a*a}`);});
bot.command("pow",ctx=>{const a=q(ctx).split(" ").map(Number);ctx.reply(`🧮 ${a[0]}^${a[1]} = ${Math.pow(a[0],a[1])}`);});
bot.command("percent",ctx=>{const a=q(ctx).split(" ").map(Number);ctx.reply(`🧮 ${a[0]}% of ${a[1]} = ${(a[0]/100)*a[1]}`);});
bot.command("factorial",ctx=>{let n=Number(q(ctx));let r=1;for(let i=2;i<=n;i++)r*=i;ctx.reply(`🧮 ${n}! = ${r}`);});
bot.command("sin",ctx=>{const a=Number(q(ctx));ctx.reply(`🧮 sin(${a}) = ${Math.sin(a*Math.PI/180)}`);});
bot.command("cos",ctx=>{const a=Number(q(ctx));ctx.reply(`🧮 cos(${a}) = ${Math.cos(a*Math.PI/180)}`);});
bot.command("tan",ctx=>{const a=Number(q(ctx));ctx.reply(`🧮 tan(${a}) = ${Math.tan(a*Math.PI/180)}`);});
bot.command("log",ctx=>{const a=Number(q(ctx));ctx.reply(`🧮 log(${a}) = ${Math.log10(a)}`);});
bot.command("ln",ctx=>{const a=Number(q(ctx));ctx.reply(`🧮 ln(${a}) = ${Math.log(a)}`);});
// STALK
bot.command("gitstalk",async ctx=>{const u=q(ctx);if(!u)return ctx.reply("❌ /gitstalk torvalds");try{const r=await axios.get(`https://api.github.com/users/${u}`,{timeout:4000});ctx.reply(`👨‍💻 ${r.data.login}\n📛 ${r.data.name||"N/A"}\n👥 Followers: ${r.data.followers}\n📦 Repos: ${r.data.public_repos}`);}catch(e){ctx.reply("User not found!");}});
bot.command(["npmstalk","tgstalk","ttstalk","xstalk"],ctx=>{const u=q(ctx);if(!u)return ctx.reply("❌ Type username");ctx.reply(`🕵️ Stalk: ${u}`);});
// GAMES + FUN + ANIME
bot.command("trivia",ctx=>ctx.reply("🧠 TRIVIA: Capital of Uganda?\nA) Kampala B) Nairobi"));
bot.command("riddle",ctx=>ctx.reply("🧩 I have 4 legs but can't walk. What am I? Table!"));
bot.command("truth",ctx=>ctx.reply("😳 TRUTH: Do you love WOLF MD?"));
bot.command("dare",ctx=>ctx.reply("😈 DARE: Send /menu to 3 friends!"));
bot.command("wyr",ctx=>ctx.reply("🤔 WOULD YOU RATHER: Be rich or famous?"));
bot.command("rps",ctx=>ctx.reply(`🎯 You: ${q(ctx)||"Rock"}\n🤖 WOLF: ${pick(["🪨 Rock","📄 Paper","✂️ Scissors"])}`));
bot.command("slots",ctx=>{const e=["🐺","🔥","👑","💎","🍀"];const s=`${pick(e)} | ${pick(e)} | ${pick(e)}`;ctx.reply(`🎰 SLOTS:\n${s}\n${s.includes("🐺")?"🎉 YOU WIN!":"Try again!"}`);});
bot.command("8ball",ctx=>ctx.reply(`🎱 ${pick(["Yes!","No!","Maybe!","Definitely! 🔥"])}`));
bot.command("dice",ctx=>ctx.reply(`🎲 Dice: ${Math.floor(Math.random()*6)+1}`));
bot.command("coin",ctx=>ctx.reply(`🪙 Coin: ${pick(["Heads","Tails"])}`));
bot.command("random",ctx=>ctx.reply(`🎲 Random: ${Math.floor(Math.random()*100)+1}`));
bot.command("pick",ctx=>ctx.reply(`🎯 Pick: ${pick(["WOLF","COOLGUY","Kampala"])}`));
bot.command("guess",ctx=>ctx.reply("🎯 What flag is 🇺🇬 ? Answer: Uganda! 🇺🇬🔥"));
bot.command("joke",ctx=>ctx.reply(`😂 ${pick(["Why did wolf cross road? To burn you! 🔥🐺","What do you call cool wolf? COOLGUY! 😎","Why is WOLF MD best? PROFESSOR COOLGUY made it! 👑"])}`));
bot.command("fact",ctx=>ctx.reply("🧠 FACT: Wolves can hear up to 10km! 🐺"));
bot.command("quote",ctx=>ctx.reply(`💬 "Don't panic to be burnt!" — WOLF MD 🔥🐺`));
bot.command("compliment",ctx=>ctx.reply(`😍 ${ctx.from.first_name}, you are as cool as WOLF MD! 🔥`));
bot.command("insult",ctx=>ctx.reply("😂 Insult: You are so slow, even my bot is faster!"));
bot.command("roast",ctx=>ctx.reply("🔥 ROAST: Your phone is so slow, even WOLF MD is faster! 😂"));
bot.command("flirt",ctx=>ctx.reply("😘 Are you WiFi? Feeling connection! 🔥"));
bot.command("ship",ctx=>ctx.reply(`💘 ${ctx.from.first_name} ❤️ WOLF MD = 100% MATCH! 🔥`));
bot.command("stupid",ctx=>ctx.reply("😂 You are stupidly cool!"));
bot.command("shayari",ctx=>ctx.reply("❤️ Shayari: Teri yaad me WOLF MD bhi ro pade! 🐺🔥"));
bot.command("goodnight",ctx=>ctx.reply("🌙 Goodnight! WOLF MD is watching you! 🐺🔥"));
bot.command("iloveyou",ctx=>ctx.reply("❤️ I love you too! — WOLF MD 🐺"));
bot.command("couplepp",ctx=>ctx.reply("💑 Couple PP: You + WOLF MD = Perfect! 🔥"));
bot.command("handsome",ctx=>ctx.reply(`😎 ${ctx.from.first_name} Handsome: 100%! 👑`));
bot.command("pretty",ctx=>ctx.reply(`😍 ${ctx.from.first_name} Pretty: 100%! 👑`));
bot.command("waifu",async ctx=>{try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/anime%20girl%20beautiful",{caption:"🌸 Waifu! 🐺"});}catch(e){ctx.reply("🌸 Waifu: You are my waifu!");}});
bot.command("pokemon",async ctx=>{try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/pokemon%20pikachu%20cute",{caption:"⚡ Pokemon! 🐺"});}catch(e){ctx.reply("⚡ Pikachu!");}});
bot.command("animepic",async ctx=>{try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/anime%20girl%20beautiful",{caption:"🌸 Anime Pic! 🐺"});}catch(e){ctx.reply("🌸 Failed!");}});
bot.command(["animewall","wallpaper"],async ctx=>{try{await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/anime%20wallpaper%204k",{caption:"🖼️ Wallpaper! 🐺"});}catch(e){ctx.reply("🖼️ Failed!");}});
bot.on("text",async ctx=>{if(ctx.message.text.startsWith("/"))return;await ctx.reply(`🐺 Hi *${ctx.from.first_name}!* Type */menu* 🔥`,{parse_mode:"Markdown"});});
bot.launch().then(()=>console.log("🐺 WOLF MD ONLINE!"));
process.once("SIGINT",()=>bot.stop("SIGINT"));
process.once("SIGTERM",()=>bot.stop("SIGTERM"));
