const { Telegraf } = require("telegraf");
const axios = require("axios");
const config = require("./config");
const { saveMember, getUptime, groupMembers } = require("./utils");
const { getMenuText } = require("./menu");
const { factorial, calcEval } = require("./calc");
const bot = new Telegraf(config.BOT_TOKEN);
const pick = a => a[Math.floor(Math.random()*a.length)];
const q = ctx => ctx.message.text.split(" ").slice(1).join(" ").trim();

// MENU + START - 1 MESSAGE, DP + MENU TOGETHER, NO SPACE!
bot.command("menu", async (ctx) => { saveMember(ctx); await ctx.replyWithPhoto(config.BOT_IMAGE, { caption: getMenuText() }); });
bot.start(async (ctx) => { saveMember(ctx); await ctx.replyWithPhoto(config.BOT_IMAGE, { caption: getMenuText() }); });

// OWNER
bot.command("ping", ctx => ctx.reply("PONG! ✅ WOLF MD IS ALIVE 🔥\nBy PROFESSOR COOLGUY 🤟"));
bot.command("alive", async (ctx) => { await ctx.replyWithPhoto(config.BOT_IMAGE, { caption: `🐺 WOLF MD ALIVE! 🔥\nOwner: WOLF\nBy: PROFESSOR COOLGUY 🤟\nUptime: ${getUptime()}` }); });
bot.command("runtime", ctx => ctx.reply(`⏱️ Uptime: ${getUptime()}`));
bot.command("owner", ctx => ctx.reply(`👑 OWNER: WOLF\nNumber: ${config.OWNER_NUMBER}\nBot: WOLF MD 🐺\n🛠️ By: PROFESSOR COOLGUY 🤟`));
bot.command("contact", ctx => ctx.reply(`👑 Owner: WOLF - ${config.OWNER_NUMBER}\n🛠️ By: PROFESSOR COOLGUY 🤟`));
bot.command("repo", ctx => ctx.reply(`🐺 WOLF MD REPO:\nhttps://github.com/davidmurungi114-ctrl/WOLF-MD`));

// GROUP
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
bot.command("tagadmins", async (ctx) => { try{ const a=await ctx.telegram.getChatAdministrators(ctx.chat.id); let m="👑 ADMINS:\n"; a.forEach(x=>{ if(!x.user.is_bot) m+=`@${x.user.username||x.user.first_name} `; }); ctx.reply(m); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
bot.command("tagall", async (ctx) => { const text=q(ctx); try{ const admins=await ctx.telegram.getChatAdministrators(ctx.chat.id); let all={}; for(const a of admins){ if(!a.user.is_bot) all[a.user.id]=a.user.first_name; } const m=groupMembers[ctx.chat.id]||{}; for(const id in m) all[id]=m[id]; if(Object.keys(all).length===0) return ctx.reply("Let everyone send a message first!"); let msg=`📢 TAGALL 🐺🔥\n\n${text?text+"\n\n":""}`; for(const id in all) msg+=`<a href="tg://user?id=${id}">${String(all[id]).replace(/[<>&]/g,"")}</a> `; await ctx.reply(msg,{parse_mode:"HTML"}); }catch(e){ ctx.reply("❌ Make me ADMIN in this group!"); }});

// AI - FAST, NO WAITING
bot.command(["gpt","ai","qwen"], async (ctx) => { const t=q(ctx); if(!t) return ctx.reply("❌ Type: /gpt Who is Diamond?"); try{ const r=await axios.get("https://text.pollinations.ai/"+encodeURIComponent(t),{timeout:5000}); ctx.reply("🤖 WOLF AI:\n\n"+r.data); }catch(e){ ctx.reply(`🤖 WOLF AI: Great question bro! "${t}" — I am WOLF MD, made by PROFESSOR COOLGUY! Ask me anything! 🔥🐺`); }});
bot.command(["imagine","flux","dalle"], async (ctx) => { const t=q(ctx); if(!t) return ctx.reply("❌ Type: /imagine a wolf in fire"); try{ await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/"+encodeURIComponent(t),{caption:`🎨 WOLF MD: ${t}`}); }catch(e){ ctx.reply("Image failed, try again!"); }});
bot.command(["toanime","ghibli","tocartoon","topixar"], async (ctx) => { try{ await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/anime%20wolf%20boy%20cool",{caption:"🎨 Anime Style! 🐺"}); }catch(e){ ctx.reply("Try /imagine anime wolf"); }});

// DOWNLOADER
bot.command(["song","play","music","spotify"], async (ctx) => { const t=q(ctx); if(!t) return ctx.reply("❌ Type: /song Mpa Love"); try{ const r=await axios.get("https://itunes.apple.com/search?term="+encodeURIComponent(t)+"&media=music&limit=1",{timeout:5000}); const s=r.data.results[0]; if(!s) return ctx.reply("Not found 😅"); ctx.reply(`🎵 ${s.trackName}\n👤 ${s.artistName}\n🎧 Preview: ${s.previewUrl}\n▶️ YouTube: https://www.youtube.com/results?search_query=${encodeURIComponent(t)}`); }catch(e){ ctx.reply(`🎵 ${t}\n▶️ https://www.youtube.com/results?search_query=${encodeURIComponent(t)}`); }});
bot.command(["video","movie","film"], ctx => { const t=q(ctx); if(!t) return ctx.reply("❌ Type: /movie Kill Order"); ctx.reply(`🎬 Movie: ${t}\n▶️ Trailer: https://www.youtube.com/results?search_query=${encodeURIComponent(t+" trailer")}`); });
bot.command(["tiktok","instagram","facebook","mediafire","gitclone","apk","pinterest"], ctx => { const l=q(ctx); const cmd=ctx.message.text.split(" ")[0]; if(!l) return ctx.reply(`❌ Type: ${cmd} <link>`); ctx.reply(`${cmd} Link: ${l}\n\n🔗 Open: ${l}\n✅ WOLF MD downloader — use /song for music!`); });

// AUDIO
bot.command("tts", async (ctx) => { const t=q(ctx); if(!t) return ctx.reply("Usage: /tts Hello bro"); try{ const u="https://translate.google.com/translate_tts?ie=UTF-8&q="+encodeURIComponent(t)+"&tl=en&client=tw-ob"; const a=await axios.get(u,{responseType:"arraybuffer",headers:{"User-Agent":"Mozilla/5.0"},timeout:5000}); await ctx.replyWithAudio({source:Buffer.from(a.data),filename:"tts.mp3"},{caption:`🎤 ${t}`}); }catch(e){ ctx.reply("TTS failed, try shorter text!"); }});
bot.command(["bass","deep","blown","fast","slow","nightcore","robot","echo","reverb"], ctx => ctx.reply(`🎚️ ${ctx.message.text.split(" ")[0]} Effect Ready!\n\nSend voice/audio with caption ${ctx.message.text.split(" ")[0]} — WOLF MD will apply it! 🐺🔥`));

// CONVERTER
bot.command("sticker", ctx => ctx.reply("🎨 Send photo with caption /sticker"));
bot.command("toimg", ctx => ctx.reply("🖼️ Send sticker with caption /toimg"));
bot.command("removebg", ctx => ctx.reply("✂️ Send photo with caption /removebg\nOr use: https://remove.bg"));
bot.command("upscale", ctx => ctx.reply("✨ Send photo with caption /upscale — WOLF will sharpen it!"));
bot.command(["attp","ttp","qc","brat"], async (ctx) => { const t=q(ctx)||"WOLF MD"; try{ await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(t)}`,{caption:`🎨 ${ctx.message.text.split(" ")[0]} for: ${t}`}); }catch(e){ ctx.reply(`🎨 ${t} 🔥`); }});
bot.command("emojimix", ctx => ctx.reply("😂 Emojimix: 🐺+🔥 = 🐺🔥"));
bot.command(["blur","meme","getpp","wasted","circle"], ctx => ctx.reply(`🎨 ${ctx.message.text.split(" ")[0]} — Send photo with this caption bro! 🐺`));

// LOGO
bot.command(["fancy","gfx","neon","metallic","fire","glitch","thunder","hacker","marvel","avenger"], async (ctx) => { const t=q(ctx)||"WOLF"; const cmd=ctx.message.text.split(" ")[0].replace("/",""); try{ await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(t+" "+cmd)}`,{caption:`🎨 ${cmd.toUpperCase()} LOGO: ${t} 🔥🐺`}); }catch(e){ ctx.reply(`🎨 ${cmd.toUpperCase()} LOGO: ${t} 🔥`); }});

// TOOLS
bot.command("ss", ctx => { const l=q(ctx); if(!l) return ctx.reply("❌ Type: /ss google.com"); ctx.reply(`📸 Screenshot: https://image.thum.io/get/width/800/${l}`); });
bot.command("translate", ctx => { const t=q(ctx); if(!t) return ctx.reply("❌ Type: /translate Hello"); ctx.reply(`🔤 Translate: ${t}\nhttps://translate.google.com/?sl=auto&tl=sw&text=${encodeURIComponent(t)}`); });
bot.command(["qr","qrcode"], async (ctx) => { const t=q(ctx); if(!t) return ctx.reply("❌ Type: /qr Hello"); try{ await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(t)}`,{caption:`🔳 QR: ${t}`}); }catch(e){ ctx.reply("QR failed!"); }});
bot.command("readqr", ctx => ctx.reply("🔳 Send QR photo with caption /readqr"));
bot.command("shorturl", ctx => { const l=q(ctx); if(!l) return ctx.reply("❌ Type: /shorturl google.com"); ctx.reply(`🔗 Short: https://tinyurl.com/api-create.php?url=${encodeURIComponent(l)}`); });
bot.command("weather", async (ctx) => { const city=q(ctx)||"Kampala"; try{ const r=await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`,{timeout:5000}); const c=r.data.current_condition[0]; ctx.reply(`🌤️ ${city}: ${c.temp_C}°C, ${c.weatherDesc[0].value}, Humidity ${c.humidity}%`); }catch(e){ ctx.reply(`🌤️ ${city}: Sunny, 25°C — WOLF Forecast! 🐺`); }});
bot.command("news", ctx => ctx.reply("📰 WOLF NEWS: WOLF MD is #1 in Uganda! 🔥🐺\nMore: https://news.google.com"));
bot.command("lyrics", ctx => { const s=q(ctx)||"Mpa Love"; ctx.reply(`🎤 Lyrics: ${s}\nhttps://genius.com/search?q=${encodeURIComponent(s)}`); });
bot.command("currency", ctx => ctx.reply("💱 100 USD = 370,000 UGX\n1 USD = 3,700 UGX\nhttps://www.xe.com/currencyconverter/"));
bot.command("crypto", async (ctx) => { try{ const r=await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",{timeout:5000}); ctx.reply(`💰 BTC: $${r.data.bitcoin.usd}\n💎 ETH: $${r.data.ethereum.usd}`); }catch(e){ ctx.reply("💰 BTC ~ $65,000 | ETH ~ $3,500 | WOLF = PRICELESS! 🐺"); }});
bot.command("age", ctx => { const d=q(ctx); if(!d) return ctx.reply("❌ Type: /age 2005-01-01"); ctx.reply(`🎂 Age: ${Math.floor((Date.now()-new Date(d))/31557600000)} years`); });
bot.command("reverse", ctx => { const t=q(ctx); if(!t) return ctx.reply("❌ Type: /reverse hello"); ctx.reply(`🔁 ${t.split("").reverse().join("")}`); });
bot.command("case", ctx => { const t=q(ctx); if(!t) return ctx.reply("❌ Type: /case hello"); ctx.reply(`🔤 UPPER: ${t.toUpperCase()}\n🔤 lower: ${t.toLowerCase()}`); });
bot.command("palindrome", ctx => { const t=(q(ctx)||"").toLowerCase().replace(/[^a-z0-9]/g,""); if(!t) return ctx.reply("❌ Type: /palindrome madam"); ctx.reply(t===t.split("").reverse().join("")?`✅ YES! "${q(ctx)}" is Palindrome!`:`❌ NO! "${q(ctx)}" is NOT!`); });
bot.command("wiki", async (ctx) => { const s=q(ctx); if(!s) return ctx.reply("❌ Type: /wiki Wolf"); try{ const r=await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(s)}`,{timeout:5000}); ctx.reply(`📚 ${r.data.title}\n\n${r.data.extract?.slice(0,400)}\n🔗 ${r.data.content_urls?.desktop?.page}`); }catch(e){ ctx.reply(`📚 https://en.wikipedia.org/wiki/${encodeURIComponent(s)}`); }});
bot.command("google", ctx => { const s=q(ctx); if(!s) return ctx.reply("❌ Type: /google wolf"); ctx.reply(`🔍 https://www.google.com/search?q=${encodeURIComponent(s)}`); });
bot.command("image", async (ctx) => { const s=q(ctx); if(!s) return ctx.reply("❌ Type: /image wolf"); try{ await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/"+encodeURIComponent(s),{caption:`🖼️ ${s}`}); }catch(e){ ctx.reply(`🖼️ https://www.google.com/search?tbm=isch&q=${encodeURIComponent(s)}`); }});
bot.command("define", ctx => { const w=q(ctx); if(!w) return ctx.reply("❌ Type: /define wolf"); ctx.reply(`📖 Define: ${w}\nhttps://www.google.com/search?q=define+${encodeURIComponent(w)}`); });
bot.command("imdb", ctx => { const m=q(ctx); if(!m) return ctx.reply("❌ Type: /imdb Avengers"); ctx.reply(`🎬 IMDB: ${m}\nhttps://www.imdb.com/find?q=${encodeURIComponent(m)}`); });
bot.command("horo", ctx => { const s=q(ctx)||"Leo"; ctx.reply(`🔮 Horoscope ${s}: Today is lucky! Money + Love coming! 🐺🔥✨`); });
bot.command("quran", ctx => ctx.reply("📖 QURAN: In the name of Allah, Most Gracious, Most Merciful.\nhttps://quran.com"));
bot.command("prayertime", ctx => { const c=q(ctx)||"Kampala"; ctx.reply(`🕌 Prayer ${c}:\nFajr 5:30 | Dhuhr 1:00 | Asr 4:00 | Maghrib 6:45 | Isha 7:45`); });

// CALCULATOR
bot.command(["calc","calculator","calculate"], ctx => { try{ let raw=ctx.message.text.trim().replace(/^\/\w+(@\w+)?\s*/,""); if(!raw) return ctx.reply("🧮 /calc 30+67"); ctx.reply(`🧮 ${raw} = ${calcEval(raw)}`); }catch{ ctx.reply("❌ Try: /calc 30+67"); }});
function twoNum(ctx,fn,sym){ const p=ctx.message.text.split(" ").slice(1).map(Number).filter(n=>!isNaN(n)); if(p.length<2) return ctx.reply("❌ Type: /add 5 3"); ctx.reply(`🧮 ${p[0]} ${sym} ${p[1]} = ${fn(p[0],p[1])}`); }
bot.command(["add","plus"], ctx=>twoNum(ctx,(a,b)=>a+b,"+")); bot.command(["sub","minus"], ctx=>twoNum(ctx,(a,b)=>a-b,"-")); bot.command(["mul","times"], ctx=>twoNum(ctx,(a,b)=>a*b,"×")); bot.command(["div","divide"], ctx=>twoNum(ctx,(a,b)=>a/b,"÷")); bot.command("mod", ctx=>twoNum(ctx,(a,b)=>a%b,"%")); bot.command(["pow","power"], ctx=>twoNum(ctx,(a,b)=>Math.pow(a,b),"^"));
bot.command("percent", ctx=>{ const p=ctx.message.text.split(" ").slice(1).map(Number).filter(n=>!isNaN(n)); if(p.length<2) return ctx.reply("Usage: /percent 10 200"); ctx.reply(`🧮 ${p[0]}% of ${p[1]} = ${(p[0]/100)*p[1]}`); });
function oneNum(ctx,fn,label){ const n=Number(ctx.message.text.split(" ")[1]); if(isNaN(n)) return ctx.reply(`❌ Type: /${label} 16`); ctx.reply(`🧮 ${label}(${n}) = ${fn(n)}`); }
bot.command("sqrt", ctx=>oneNum(ctx,n=>Math.sqrt(n),"√")); bot.command("cbrt", ctx=>oneNum(ctx,n=>Math.cbrt(n),"∛")); bot.command("square", ctx=>oneNum(ctx,n=>n*n,"²")); bot.command("cube", ctx=>oneNum(ctx,n=>n*n*n,"³")); bot.command("factorial", ctx=>oneNum(ctx,n=>factorial(n),"!")); bot.command("sin", ctx=>oneNum(ctx,n=>Math.round(Math.sin(n*Math.PI/180)*100000000)/100000000,"sin")); bot.command("cos", ctx=>oneNum(ctx,n=>Math.round(Math.cos(n*Math.PI/180)*100000000)/100000000,"cos")); bot.command("tan", ctx=>oneNum(ctx,n=>Math.round(Math.tan(n*Math.PI/180)*100000000)/100000000,"tan")); bot.command("log", ctx=>oneNum(ctx,n=>Math.log10(n),"log")); bot.command("ln", ctx=>oneNum(ctx,n=>Math.log(n),"ln"));

// STALK
bot.command("gitstalk", async (ctx) => { const u=q(ctx); if(!u) return ctx.reply("❌ Type: /gitstalk davidmurungi114-ctrl"); try{ const r=await axios.get(`https://api.github.com/users/${u}`,{timeout:5000}); ctx.reply(`🐙 ${r.data.login}\n👤 ${r.data.name||"N/A"}\n📦 Repos: ${r.data.public_repos}\n👥 Followers: ${r.data.followers}\n🔗 ${r.data.html_url}`); }catch(e){ ctx.reply(`🐙 https://github.com/${u}`); }});
bot.command("npmstalk", ctx => { const p=q(ctx); if(!p) return ctx.reply("❌ Type: /npmstalk telegraf"); ctx.reply(`📦 NPM: ${p}\nhttps://www.npmjs.com/package/${p}`); });
bot.command(["tgstalk","ttstalk","xstalk"], ctx => { const u=q(ctx); ctx.reply(`🕵️ ${ctx.message.text.split(" ")[0]}: ${u||"@"}\nhttps://google.com/search?q=${encodeURIComponent(u||"wolf")}`); });

// GAMES
bot.command("trivia", ctx => { const x=pick([["Capital of Uganda?","Kampala! 🇺🇬"],["2+2?","4! 🧮"],["Who made WOLF MD?","PROFESSOR COOLGUY! 🤟"]]); ctx.reply(`🧠 TRIVIA: ${x[0]}\n\nAnswer: ${x[1]}`); });
bot.command("riddle", ctx => ctx.reply("🧩 RIDDLE: I speak without mouth, hear without ears. What am I?\n\nAnswer: Echo!"));
bot.command("truth", ctx => ctx.reply("😳 TRUTH: "+pick(["Do you have a crush? 😏","Biggest secret?","Who do you love most? ❤️","Ever lied to parents? 😅"])));
bot.command("dare", ctx => ctx.reply("😈 DARE: "+pick(["Send /menu to 5 friends!","Dance 10 sec! 💃","Say 'I love WOLF MD' loud! 🐺","Do 10 pushups! 💪"])));
bot.command("wyr", ctx => ctx.reply("🤔 WOULD YOU RATHER: "+pick(["Be rich or famous?","Fly or invisible?","Rolex or Matooke forever? 😂","WOLF or LION? 🐺🦁"])));
bot.command("rps", ctx => ctx.reply("🤖 Wolf chose: "+pick(["Rock 🪨","Paper 📄","Scissors ✂️"])));
bot.command("slots", ctx => { const e=["🐺","🔥","💎","🍀","⭐"],a=pick(e),b=pick(e),c=pick(e); ctx.reply(`🎰 ${a} | ${b} | ${c}\n`+(a===b&&b===c?"JACKPOT! 🔥🔥🔥":"Try again!")); });
bot.command("8ball", ctx => { const qq=q(ctx); if(!qq) return ctx.reply("❌ Type: /8ball Will I pass?"); ctx.reply(`🎱 Q: ${qq}\n\n🔮 WOLF Says: ${pick(["YES! 🔥 100% YES!","Definitely YES! 🐺","Yes bro! ✅","No 😅","No way! ❌","Maybe... 🤔","Signs point to YES! 🔥"])}`); });
bot.command("dice", ctx => ctx.reply("🎲 You rolled: "+(Math.floor(Math.random()*6)+1)));
bot.command("coin", ctx => ctx.reply("🪙 "+(Math.random()>0.5?"Heads!":"Tails!")));
bot.command("random", ctx => ctx.reply(`🎲 RANDOM:\nNumber: ${Math.floor(Math.random()*100)+1}\nWord: ${pick(["WOLF","FIRE","COOLGUY","UGANDA","KAMPALA","CHAMPION"])} 🔥`));
bot.command("pick", ctx => { const opts=q(ctx).split(",").map(s=>s.trim()).filter(Boolean); if(opts.length<2) return ctx.reply("❌ Type: /pick pizza, rolex, matooke"); ctx.reply(`🎯 WOLF Picks: ${pick(opts)}!`); });
bot.command("guess", ctx => ctx.reply(`🎯 GUESS: I think ${Math.floor(Math.random()*10)+1} (1-10)! Did you guess? 😏`));

// FUN
bot.command("joke", ctx => ctx.reply("😂 "+pick(["Why did wolf cross road? To burn you! 🔥🐺","What do you call funny wolf? Howl-arious! 🐺😂","Why WOLF MD smart? PROFESSOR COOLGUY made it! 🤟"])));
bot.command("quote", async (ctx) => { try{ const r=await axios.get("https://api.quotable.io/random",{timeout:5000}); ctx.reply(`💬 "${r.data.content}"\n\n- ${r.data.author}`); }catch(e){ ctx.reply(`💬 "Don't panic to be burnt!" - WOLF 🐺🔥`); }});
bot.command("fact", async (ctx) => { try{ const r=await axios.get("https://uselessfacts.jsph.pl/random.json?language=en",{timeout:5000}); ctx.reply(`🧠 FACT: ${r.data.text}`); }catch(e){ ctx.reply("🧠 FACT: Wolves run 60km/h!"); }});
bot.command("compliment", ctx => ctx.reply("❤️ "+pick(["You are real Wolf! 🐺🔥","You are smart like WOLF!","You shine bro! ✨","Handsome today! 😍"])));
bot.command("insult", ctx => ctx.reply("😅 "+pick(["Slow like shadow left you! 😂","WiFi stronger than brain! 😅","Joking bro, you are WOLF! 🐺"])));
bot.command("roast", ctx => ctx.reply("🔥 "+pick(["Slow, shadow left you 😂","Brain like village WiFi 😅","Don't panic to be burnt! 🔥"])));
bot.command("flirt", ctx => ctx.reply("😍 "+pick(["Are you WiFi? Feeling connection! 📶❤️","Are you wolf? Stole my heart! 🐺❤️","You + Me + WOLF = Perfect! ❤️🔥"])));
bot.command("ship", ctx => { const n=q(ctx).split(" "); const a=n[0]||ctx.from.first_name, b=n[1]||"WOLF"; const pct=Math.floor(Math.random()*41)+60; ctx.reply(`💘 SHIP: ${a} ❤️ ${b}\n\nLove: ${pct}%\n${pct>85?"PERFECT MATCH! 💍🔥":"Good match! ❤️"}`); });
bot.command("stupid", ctx => ctx.reply("🤪 Stupid Meter: "+Math.floor(Math.random()*101)+"% — Joking, you are smart! 🐺"));
bot.command("shayari", ctx => ctx.reply("❤️ SHAYARI:\nTeri yaad mein wolf bhi ro pada,\nWOLF MD bhi tera deewana ho gaya! 🐺❤️"));
bot.command("goodnight", ctx => ctx.reply(`🌙 Goodnight ${ctx.from.first_name}! 😴\nWOLF guarding you! 🐺💤`));
bot.command("iloveyou", ctx => ctx.reply("❤️ I LOVE YOU TOO BRO! 🐺❤️\nWOLF MD loves you 3000!"));
bot.command("handsome", ctx => ctx.reply(`😍 ${ctx.from.first_name} Handsome: ${Math.floor(Math.random()*21)+80}% 🔥`));
bot.command("pretty", ctx => ctx.reply(`😍 ${ctx.from.first_name} Pretty: ${Math.floor(Math.random()*21)+80}% ✨`));
bot.command("waifu", async (ctx) => { try{ await ctx.replyWithPhoto("https://image.pollinations.ai/prompt/beautiful%20anime%20girl%20waifu",{caption:"🌸 Your Waifu! ❤️🐺"}); }catch(e){ ctx.reply("🌸 Your Waifu: You are waifu bro! ❤️"); }});
bot.command("couplepp", async (ctx) => { try{ await ctx.replyWithPhoto("https://picsum.photos/400/400?random=1",{caption:"💑 Couple PP - You + WOLF 🐺❤️"}); }catch(e){ ctx.reply("💑 Couple PP: You + WOLF = Perfect!"); }});

// ANIME
bot.command("pokemon", async (ctx) => { const
