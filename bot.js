const { Telegraf } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(process.env.BOT_TOKEN);
const DP = 'https://files.catbox.moe/zyckgc.jpg';
const OWNER = 'PROFESSOR COOLGUY';
const startTime = Date.now();
const getUptime = () => { let s = Math.floor((Date.now() - startTime) / 1000); let h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60; return `${h}h ${m}m ${sec}s`; };
const need = (ctx, txt) => { if(!txt) { ctx.reply('❌ Give text! Example: /ai hello'); return false; } return true; };
const MENU1 = `🔥 <b>WOLF MD</b> 🔥
👑 Owner: <b>WOLF</b>
✍️ Created By: <b>PROFESSOR COOLGUY</b>
📦 Version: <b>v19.0.0</b>
⚙️ Commands: <b>150+</b>

👑 <b>OWNER</b>
╭──────────────╮
➤ /owner
➤ /contact
➤ /ping
➤ /alive
➤ /runtime
➤ /repo
╰──────────────╯

👥 <b>GROUP</b>
╭──────────────╮
➤ /tagall
➤ /hidetag
➤ /tagadmins
➤ /welcome
➤ /goodbye
➤ /groupinfo
➤ /staff
➤ /rules
➤ /afk
➤ /couple
➤ /online
╰──────────────╯

🤖 <b>AI - CHAT LIKE A FRIEND!</b>
╭──────────────╮
➤ /ai &lt;question&gt;
➤ /gpt &lt;question&gt;
➤ /imagine &lt;text&gt;
╰──────────────╯

📥 <b>DOWNLOADER</b>
╭──────────────╮
➤ /play &lt;name&gt;
➤ /song &lt;name&gt;
➤ /music &lt;name&gt;
➤ /video &lt;name&gt;
➤ /movie &lt;name&gt;
➤ /film &lt;name&gt;
➤ /tiktok &lt;link&gt;
➤ /instagram &lt;link&gt;
➤ /facebook &lt;link&gt;
➤ /pinterest &lt;search&gt;
➤ /spotify &lt;name&gt;
➤ /apk &lt;name&gt;
╰──────────────╯

Type /menu2 for FULL menu 👇`;
const MENU2 = `🎧 <b>AUDIO</b>
╭──────────────╮
➤ /tts &lt;text&gt;
➤ /bass
➤ /deep
➤ /blown
➤ /fast
➤ /slow
➤ /nightcore
➤ /robot
➤ /echo
➤ /reverb
╰──────────────╯

🎨 <b>CONVERTER</b>
╭──────────────╮
➤ /sticker
➤ /toimg
➤ /removebg
➤ /upscale
➤ /attp &lt;text&gt;
➤ /qc &lt;text&gt;
➤ /emojimix
➤ /blur
➤ /meme
➤ /getpp
➤ /wasted
➤ /circle
➤ /ttp &lt;text&gt;
➤ /brat &lt;text&gt;
╰──────────────╯

🖌️ <b>LOGO MAKER</b>
╭──────────────╮
➤ /fancy &lt;text&gt;
➤ /neon &lt;text&gt;
➤ /metallic &lt;text&gt;
➤ /fire &lt;text&gt;
➤ /glitch &lt;text&gt;
➤ /thunder &lt;text&gt;
➤ /hacker &lt;text&gt;
➤ /marvel &lt;text&gt;
➤ /avenger &lt;text&gt;
╰──────────────╯

🛠️ <b>TOOLS</b>
╭──────────────╮
➤ /ss &lt;link&gt;
➤ /translate &lt;text&gt;
➤ /qr &lt;text&gt;
➤ /shorturl &lt;link&gt;
➤ /calc &lt;math&gt;
➤ /weather &lt;city&gt;
➤ /lyrics &lt;song&gt;
➤ /currency
➤ /crypto
➤ /age &lt;date&gt;
➤ /reverse &lt;text&gt;
➤ /palindrome &lt;text&gt;
➤ /wiki &lt;search&gt;
➤ /google &lt;search&gt;
➤ /imdb &lt;movie&gt;
➤ /define &lt;word&gt;
➤ /horoscope
➤ /quran
➤ /prayertime &lt;city&gt;
╰──────────────╯

🧮 <b>CALCULATOR - REAL BRAIN</b>
╭──────────────╮
➤ /calc &lt;math&gt;
➤ /add &lt;num&gt; &lt;num&gt;
➤ /sub &lt;num&gt; &lt;num&gt;
➤ /mul &lt;num&gt; &lt;num&gt;
➤ /div &lt;num&gt; &lt;num&gt;
➤ /sqrt &lt;num&gt;
➤ /square &lt;num&gt;
➤ /cube &lt;num&gt;
➤ /pow &lt;num&gt; &lt;num&gt;
➤ /percent &lt;num&gt; &lt;num&gt;
➤ /factorial &lt;num&gt;
➤ /sin &lt;num&gt;
➤ /cos &lt;num&gt;
➤ /tan &lt;num&gt;
➤ /log &lt;num&gt;
➤ /ln &lt;num&gt;
╰──────────────╯

🕵️ <b>STALK</b>
╭──────────────╮
➤ /gitstalk &lt;username&gt;
➤ /npmstalk &lt;package&gt;
➤ /tgstalk &lt;username&gt;
╰──────────────╯

🎮 <b>GAMES</b>
╭──────────────╮
➤ /trivia
➤ /riddle
➤ /truth
➤ /dare
➤ /wyr
➤ /rps
➤ /8ball &lt;question&gt;
➤ /dice
➤ /coin
➤ /random
➤ /pick &lt;a,b&gt;
➤ /guess
╰──────────────╯

😂 <b>FUN</b>
╭──────────────╮
➤ /joke
➤ /fact
➤ /quote
➤ /compliment
➤ /insult
➤ /roast
➤ /flirt
➤ /ship
➤ /stupid
➤ /shayari
➤ /goodnight
➤ /iloveyou
➤ /couplepp
➤ /handsome
➤ /pretty
➤ /waifu
╰──────────────╯

🌸 <b>ANIME</b>
╭──────────────╮
➤ /pokemon
➤ /animepic
➤ /animewall
➤ /wallpaper
➤ /animenews
╰──────────────╯

┏━━━━━━━━━━━━━━┓
<b>ABOUT US</b>
<b>WOLF MD - Telegram Bot</b> 🔥
Creator: <b>PROFESSOR COOLGUY</b>
Owner: <b>WOLF</b>
Don't panic to be burnt!
Thanks For Using WOLF MD 🙏
┗━━━━━━━━━━━━━━┛`;
bot.command(['start','menu','help'], async (ctx) => {
  try { await ctx.replyWithPhoto(DP, { caption: MENU1, parse_mode: 'HTML' }); } catch(e){ await ctx.reply(MENU1, { parse_mode: 'HTML' }); }
});
bot.command('menu2', async (ctx) => {
  try { await ctx.reply(MENU2, { parse_mode: 'HTML' }); } catch(e){}
});
bot.command('owner', (ctx) => ctx.reply('👑 WOLF MD OWNER\n\nName: PROFESSOR COOLGUY\nUsername: @cool.guy.256\nBot: WOLF MD 🐺'));
bot.command('contact', (ctx) => ctx.reply('📞 Contact Owner: @cool.guy.256\n\nMessage him for help!'));
bot.command('ping', async (ctx) => { let s=Date.now(); let m=await ctx.reply('🏓 Pinging...'); await ctx.telegram.editMessageText(ctx.chat.id, m.message_id, null, `🏓 Pong!\nSpeed: ${Date.now()-s}ms\nUptime: ${getUptime()}`); });
bot.command('alive', (ctx) => ctx.reply(`🐺 WOLF MD IS ALIVE! ✅\n\nUptime: ${getUptime()}\nOwner: ${OWNER}\nVersion: v19.0.0`));
bot.command('runtime', (ctx) => ctx.reply(`⏱️ Runtime: ${getUptime()}`));
bot.command('repo', (ctx) => ctx.reply('📦 WOLF MD Repo:\nhttps://github.com/CoolGuy256/WOLF-MD-Telegram-Bot'));
bot.command('groupinfo', async (ctx) => { if(ctx.chat.type==='private') return ctx.reply('❌ Use this in a group!'); let c = await ctx.getChat(); ctx.reply(`👥 Group Info\n\nName: ${c.title}\nID: ${c.id}\nType: ${c.type}\nMembers: ${await ctx.telegram.getChatMemberCount(ctx.chat.id)}`); });
bot.command('tagall', async (ctx) => { if(ctx.chat.type==='private') return ctx.reply('❌ Only in groups!'); try { let admins = await ctx.telegram.getChatAdministrators(ctx.chat.id); let txt='📢 TAG ALL\n\n'+admins.map(a=>`@${a.user.username||a.user.first_name}`).join(' '); ctx.reply(txt); } catch(e){ ctx.reply('❌ Make me admin first!'); } });
bot.command('tagadmins', async (ctx) => { try{ let a=await ctx.telegram.getChatAdministrators(ctx.chat.id); ctx.reply('👑 Admins:\n'+a.map(x=>'@'+(x.user.username||x.user.first_name)).join('\n')); }catch(e){ ctx.reply('❌ Make me admin!'); } });
bot.command('staff', (ctx) => ctx.reply('Use /tagadmins to see staff!'));
bot.command('rules', (ctx) => ctx.reply('📜 GROUP RULES\n\n1. No spam\n2. Respect everyone\n3. No porn / abuse\n4. Follow admin instructions\n\n- WOLF MD 🐺'));
bot.command('welcome', (ctx) => ctx.reply('👋 Welcome to the group! Enjoy WOLF MD! 🐺🔥'));
bot.command('goodbye', (ctx) => ctx.reply('👋 Goodbye! Thanks for being here!'));
bot.command('afk', (ctx) => ctx.reply(`😴 ${ctx.from.first_name} is now AFK!`));
bot.command('online', (ctx) => ctx.reply('🟢 WOLF MD is Online!'));
bot.command('hidetag', (ctx) => ctx.reply('🙈 Hidetag: Check your mentions! (Admins tagged)'));
bot.command('couple', (ctx) => { let p=['❤️ 92% - Perfect Match!','💕 78% - Good!','💘 99% - Soulmates!','💔 45% - Try again']; ctx.reply(p[Math.floor(Math.random()*p.length)]); });
const localBrain = (q) => {
  let t = q.toLowerCase();
  if(t.includes('hi')||t.includes('hello')||t.includes('hey')) return "Heya bro! 🔥 I'm WOLF MD! What's poppin' today? ✨";
  if(t.includes('how are')||t.includes('how u')||t.includes('wassup')||t.includes('whats poping')||t.includes('whats popping')||t.includes('nothing')) return "I'm chilling bro 😎 You tell me, what's poppin' on your side? 🔥";
  if(t.includes('who are')||t.includes('your name')) return "I'm WOLF MD 🐺🔥 Created by PROFESSOR COOLGUY! Your best friend, AI, calculator, song + movie plug!";
  if(t.includes('love')||t.includes('crush')) return "Ayyee 😘 Love is in the air! Tell me bro, who is she? I will help you win her! ❤️";
  if(t.includes('sad')||t.includes('bored')||t.includes('tired')) return "Aww bro, don't be sad 😔 WOLF is here! Want a joke, a song, or a movie? Tell me!";
  if(t.includes('joke')) return "Why did the chicken cross the road? 😂 To get to WOLF MD! 🔥";
  if(t.includes('bye')||t.includes('goodnight')) return "Good night bro 🌙 Sleep well, WOLF is guarding you! 🐺💤";
  if(t.includes('thank')) return "Anytime bro! 🙏 What else? Song? Movie? Calc?";
  if(t.includes('brain')||t.includes('lag')) return "Haha my brain never lags now bro! 😹 I have 3 brains! I was just taking coffee break ☕ What's up?";
  if(t.includes('song')||t.includes('music')) return "You want a song? 🔥 Type /song + name, e.g. /song love me like you do - I send MP3 in Telegram!";
  if(t.includes('movie')||t.includes('film')) return "You want a movie? 🎬 Type /movie + name, e.g. /movie transporter vj emmy - I give LINK to watch FULL!";
  if(t.includes('calc')) return "You want calc? 🧮 Type /calc e.g. /calc £3000√2 - I do ALL signs!";
  return null;
};
const aiChat = async (ctx, q) => {
  ctx.sendChatAction('typing').catch(()=>{});
  let local = localBrain(q);
  if(local) return await ctx.reply(`🐺 ${local}`);
  try {
    let r = await axios.get(`https://text.pollinations.ai/${encodeURIComponent('You are WOLF MD, funny friendly Ugandan AI friend created by PROFESSOR COOLGUY. Talk short, fun, emojis. User: '+q)}`, {timeout:8000});
    let ans = typeof r.data === 'string' ? r.data : JSON.stringify(r.data);
    if(ans && ans.length > 2) return await ctx.reply(`🐺 ${ans.slice(0,4000)}`);
  } catch(e){}
  try {
    let r = await axios.post('https://text.pollinations.ai/openai', { model: 'openai', messages: [{ role: 'user', content: 'You are WOLF MD, funny Ugandan AI friend. Reply short fun: '+q }] }, {timeout:8000});
    let ans = r.data?.choices?.[0]?.message?.content;
    if(ans) return await ctx.reply(`🐺 ${ans.slice(0,4000)}`);
  } catch(e){}
  await ctx.reply(`🐺 Yo bro I hear you! 😎 You said "${q}" - tell me more, what do you want? Song? Movie? Joke? Calc? I'm here bro! 🔥`);
};
bot.command(['ai','gpt','qwen'], async (ctx) => { let q = ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,q)) return; await aiChat(ctx, q); });
bot.on('text', async (ctx) => {
  if(ctx.message.text.startsWith('/')) return;
  if(ctx.chat.type === 'private') return await aiChat(ctx, ctx.message.text);
  let isReplyToBot = ctx.message.reply_to_message && ctx.message.reply_to_message.from && ctx.message.reply_to_message.from.is_bot;
  let isTagged = ctx.message.text.toLowerCase().includes('wolf') || ctx.message.text.includes('@wolf_md_coolguy_bot');
  if(isReplyToBot || isTagged) return await aiChat(ctx, ctx.message.text);
});
bot.command(['imagine','flux','dalle'], async (ctx) => { let q = ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,q)) return; await ctx.replyWithPhoto(`https://image.pollinations.ai/prompt/${encodeURIComponent(q)}?nologo=true`, {caption:`🎨 Imagine: ${q}\n\nBy WOLF MD 🐺`}); });
bot.command(['toanime','ghibli','tocartoon','topixar'], async (ctx) => { if(!ctx.message.reply_to_message?.photo) return ctx.reply('❌ Reply to a photo with this command!'); ctx.reply('🎨 Anime filter coming... Use /imagine <style> for now'); });
const ytSearch = async (q) => { try{ let r = await axios.get(`https://yt.lemnoslife.com/noKey/search?q=${encodeURIComponent(q)}&part=snippet&type=video&maxResults=5`, {timeout:8000}); return r.data.items || []; }catch(e){ return []; } };
bot.command(['play','song','music'], async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  let m = await ctx.reply(`🎵 Downloading MP3: ${q}...`);
  try{
    let r = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=1`, {timeout:8000});
    let yt = await ytSearch(q+' official audio');
    let ytLink = yt.length ? `https://www.youtube.com/watch?v=${yt[0].id.videoId}` : `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
    if(r.data.results && r.data.results.length){
      let s = r.data.results[0];
      await ctx.replyWithAudio({ url: s.previewUrl }, { title: s.trackName, performer: s.artistName, caption: `🎵 ${s.trackName}\n👤 ${s.artistName}\n\n▶️ Full on YouTube:\n${ytLink}\n\nBy WOLF MD 🐺` });
      await ctx.telegram.deleteMessage(ctx.chat.id, m.message_id).catch(()=>{});
    } else {
      await ctx.telegram.editMessageText(ctx.chat.id, m.message_id, null, `🎵 ${q}\n\n▶️ PLAY FULL SONG HERE:\n${ytLink}`);
    }
  }catch(e){
    await ctx.telegram.editMessageText(ctx.chat.id, m.message_id, null, `🎵 ${q}\n\n▶️ PLAY FULL SONG HERE:\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(q+' official audio')}`);
  }
});
bot.command(['video','movie','film'], async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  let m = await ctx.reply(`🎬 Finding FULL movie: ${q}...`);
  let sq = q.toLowerCase().includes('vj') ? q+' full movie' : q+' full movie VJ';
  let res = await ytSearch(sq);
  if(!res.length){ return ctx.telegram.editMessageText(ctx.chat.id, m.message_id, null, `🎬 FULL MOVIE: ${q}\n\n▶️ WATCH HERE:\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(q+' full movie VJ')}\n\nTry:\n/movie ${q} VJ ICP\n/movie ${q} VJ Emmy\n/movie ${q} VJ Junior`); }
  let txt=`🎬 FULL MOVIE: ${q}\nTap a link - DIRECT to watch!\n\n`;
  res.slice(0,5).forEach((r,i)=>{ txt+=`${i+1}. ${r.snippet.title}\n👤 ${r.snippet.channelTitle}\n▶️ WATCH NOW: https://www.youtube.com/watch?v=${r.id.videoId}\n\n`; });
  txt+=`🔥 More VJs:\n/movie ${q} VJ Emmy\n/movie ${q} VJ Junior`;
  await ctx.telegram.editMessageText(ctx.chat.id, m.message_id, null, txt);
});
bot.command(['tiktok','instagram','facebook','mediafire','gitclone'], async (ctx) => { let link = ctx.message.text.split(' ')[1]; if(!link) return ctx.reply('❌ Give a link! Example: /tiktok https://...'); ctx.reply(`📥 Link received: ${link}\n\nOpening link for you:\n${link}`); });
bot.command('pinterest', async (ctx) => { let q=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,q)) return; ctx.replyWithPhoto(`https://image.pollinations.ai/prompt/${encodeURIComponent(q)}?nologo=true`, {caption:`📌 Pinterest style: ${q}`}); });
bot.command('spotify', (ctx) => { let q=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,q)) return ctx.reply('❌ Give song name!'); ctx.reply(`🎧 Spotify: ${q}\nhttps://open.spotify.com/search/${encodeURIComponent(q)}`); });
bot.command('apk', (ctx) => { let q=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,q)) return; ctx.reply(`📱 APK: ${q}\nhttps://apkpure.com/search?q=${encodeURIComponent(q)}`); });
bot.command('tts', async (ctx) => { let t=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,t)) return; ctx.reply(`🔊 TTS: "${t}"`); });
['bass','deep','blown','fast','slow','nightcore','robot','echo','reverb'].forEach(c => { bot.command(c, (ctx) => { if(!ctx.message.reply_to_message?.voice && !ctx.message.reply_to_message?.audio) return ctx.reply(`🎧 Reply to a voice/audio with /${c} to apply effect!`); ctx.reply(`🎧 Applying ${c} effect...`); }); });
bot.command('sticker', async (ctx) => { if(!ctx.message.reply_to_message?.photo) return ctx.reply('❌ Reply to a photo with /sticker'); let p=ctx.message.reply_to_message.photo.pop(); let f=await ctx.telegram.getFileLink(p.file_id); ctx.replyWithSticker({url:f.href}); });
bot.command('toimg', async (ctx) => { if(!ctx.message.reply_to_message?.sticker) return ctx.reply('❌ Reply to a sticker with /toimg'); let f=await ctx.telegram.getFileLink(ctx.message.reply_to_message.sticker.file_id); ctx.replyWithPhoto({url:f.href}); });
bot.command('getpp', async (ctx) => { try{ let ph=await ctx.telegram.getUserProfilePhotos(ctx.from.id,0,1); if(!ph.total_count) return ctx.reply('❌ No profile photo!'); let f=await ctx.telegram.getFileLink(ph.photos[0][0].file_id); ctx.replyWithPhoto({url:f.href}, {caption:`🖼️ Your DP @${ctx.from.username||ctx.from.first_name}`}); }catch(e){ ctx.reply('❌ Could not fetch DP'); } });
bot.command(['attp','ttp','brat'], (ctx) => { let t=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,t)) return; ctx.reply(`✨ ${t} ✨`); });
bot.command('qc', (ctx) => { let t=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,t)) return; ctx.reply(`💬 Quote:\n"${t}"\n— ${ctx.from.first_name}`); });
bot.command('meme', async (ctx) => { let r=await axios.get('https://meme-api.com/gimme', {timeout:8000}); ctx.replyWithPhoto(r.data.url, {caption:`😂 ${r.data.title}`}); });
bot.command(['removebg','upscale','blur','wasted','circle','emojimix'], (ctx) => ctx.reply('🎨 Reply to a photo with this command! Use /sticker /toimg for now which work 100%'));
const logo = (style) => async (ctx) => { let t=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,t)) return; await ctx.replyWithPhoto(`https://image.pollinations.ai/prompt/${encodeURIComponent(style+' logo text '+t+', 3d, high quality') }?nologo=true`, {caption:`🖌️ ${style.toUpperCase()} Logo: ${t}`}); };
bot.command('fancy', logo('fancy glowing')); bot.command('neon', logo('neon glowing')); bot.command('metallic', logo('metallic chrome')); bot.command('fire', logo('fire burning')); bot.command('glitch', logo('glitch cyberpunk')); bot.command('thunder', logo('thunder lightning')); bot.command('hacker', logo('hacker green matrix')); bot.command('marvel', logo('marvel superhero')); bot.command('avenger', logo('avengers superhero'));
bot.command('translate', async (ctx) => { let t=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,t)) return; try{ let r=await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(t)}&langpair=en|sw`, {timeout:8000}); ctx.reply(`🌐 Translate (EN→SW):\n${r.data.responseData.translatedText}`); }catch(e){ ctx.reply('❌ Translate failed'); } });
bot.command('qr', async (ctx) => { let t=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,t)) return; ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(t)}`, {caption:`🔳 QR for: ${t}`}); });
bot.command('ss', (ctx) => { let l=ctx.message.text.split(' ')[1]; if(!l) return ctx.reply('❌ Give link! /ss https://google.com'); ctx.replyWithPhoto(`https://image.thum.io/get/width/800/${l}`, {caption:`📸 Screenshot: ${l}`}); });
bot.command('shorturl', (ctx) => { let l=ctx.message.text.split(' ')[1]; if(!l) return ctx.reply('❌ Give link!'); ctx.reply(`🔗 Short: https://tinyurl.com/api-create.php?url=${encodeURIComponent(l)}`); });
bot.command('weather', async (ctx) => { let c=ctx.message.text.split(' ').slice(1).join(' ')||'Kampala'; try{ let r=await axios.get(`https://wttr.in/${encodeURIComponent(c)}?format=j1`, {timeout:8000}); let cur=r.data.current_condition[0]; ctx.reply(`🌤️ Weather in ${c}\nTemp: ${cur.temp_C}°C\nFeels: ${cur.FeelsLikeC}°C\nHumidity: ${cur.humidity}%\n${cur.weatherDesc[0].value}`); }catch(e){ ctx.reply('❌ Weather failed'); } });
bot.command('lyrics', async (ctx) => { let q=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,q)) return; ctx.reply(`🎤 Lyrics for: ${q}\nhttps://genius.com/search?q=${encodeURIComponent(q)}`); });
bot.command('wiki', async (ctx) => { let q=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,q)) return; try{ let r=await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`, {timeout:8000}); ctx.reply(`📖 ${r.data.title}\n\n${r.data.extract}\n\n${r.data.content_urls?.desktop?.page}`); }catch(e){ ctx.reply('❌ Not found on Wikipedia'); } });
bot.command('google', (ctx) => { let q=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,q)) return; ctx.reply(`🔍 Google: ${q}\nhttps://www.google.com/search?q=${encodeURIComponent(q)}`); });
bot.command('define', async (ctx) => { let w=ctx.message.text.split(' ')[1]; if(!w) return ctx.reply('❌ Give word!'); try{ let r=await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`, {timeout:8000}); ctx.reply(`📖 ${w}: ${r.data[0].meanings[0].definitions[0].definition}`); }catch(e){ ctx.reply('❌ Not found'); } });
bot.command('quran', async (ctx) => { try{ let r=await axios.get('https://api.alquran.cloud/v1/ayah/1:1', {timeout:8000}); ctx.reply(`📖 Quran - Al-Fatiha 1:1\n\n${r.data.data.text}`); }catch(e){ ctx.reply('❌ Quran API busy'); } });
bot.command('prayertime', (ctx) => { let c=ctx.message.text.split(' ').slice(1).join(' ')||'Kampala'; ctx.reply(`🕌 Prayer Times for ${c}:\nhttps://www.islamicfinder.org/world/uganda/${encodeURIComponent(c)}/prayer-times/`); });
bot.command('horoscope', (ctx) => { let s=ctx.message.text.split(' ')[1]||'leo'; ctx.reply(`🔮 Horoscope for ${s}:\nToday is your lucky day! Stay strong, WOLF is with you! 🐺`); });
bot.command('imdb', (ctx) => { let q=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,q)) return; ctx.reply(`🎬 IMDB: ${q}\nhttps://www.imdb.com/find/?q=${encodeURIComponent(q)}`); });
bot.command('currency', (ctx) => ctx.reply('💱 Currency: 1 USD ≈ 3,700 UGX (approx)'));
bot.command('crypto', async (ctx) => { try{ let r=await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd', {timeout:8000}); ctx.reply(`🪙 Crypto Live:\nBTC: $${r.data.bitcoin.usd}\nETH: $${r.data.ethereum.usd}`); }catch(e){ ctx.reply('❌ Crypto API busy'); } });
bot.command('age', (ctx) => { let d=ctx.message.text.split(' ')[1]; if(!d) return ctx.reply('❌ Example: /age 2005-01-01'); let age=new Date().getFullYear()-new Date(d).getFullYear(); ctx.reply(`🎂 Age: ~${age} years`); });
bot.command('reverse', (ctx) => { let t=ctx.message.text.split(' ').slice(1).join(' '); if(!need(ctx,t)) return; ctx.reply(t.split('').reverse().join('')); });
bot.command('palindrome', (ctx) => { let t=ctx.message.text.split(' ').slice(1).join(' ').toLowerCase().replace(/[^a-z0-9]/g,''); ctx.reply(t===t.split('').reverse().join('') ? '✅ Yes! Palindrome!' : '❌ No, not palindrome'); });
const smartCalc = (input) => {
  let e = input.toLowerCase().trim();
  e = e.replace(/[£$€¥,]/g,'').replace(/ugx|usd|shs/g,'').replace(/\s+/g,'').replace(/of/g,'*');
  e = e.replace(/×/g,'*').replace(/÷/g,'/').replace(/x/g,'*');
  e = e.replace(/²/g,'**2').replace(/³/g,'**3').replace(/\^/g,'**');
  e = e.replace(/(\d+(\.\d+)?)%/g,'($1/100)');
  e = e.replace(/(\d)√/g,'$1*sqrt').replace(/√/g,'sqrt');
  e = e.replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(');
  e = e.replace(/log\(/g,'Math.log10(').replace(/ln\(/g,'Math.log(');
  e = e.replace(/π/g,'Math.PI').replace(/pi/g,'Math.PI');
  e = e.replace(/(\d+)!/g, (m,n)=>{ let r=1; for(let i=2;i<=Number(n);i++) r*=i; return r; });
  e = e.replace(/Math\.sin\(([^)]+)\)/g,'Math.sin(($1)*Math.PI/180)').replace(/Math\.cos\(([^)]+)\)/g,'Math.cos(($1)*Math.PI/180)').replace(/Math\.tan\(([^)]+)\)/g,'Math.tan(($1)*Math.PI/180)');
  const sqrt = Math.sqrt;
  return eval(e);
};
bot.command(['calc','c'], (ctx) => {
  let expr = ctx.message.text.split(' ').slice(1).join(' ');
  if(!expr) return ctx.reply('🧮 REAL CALCULATOR 🧠\n\nTry:\n/calc 300+1\n/calc £3000√2\n/calc 50% of 200\n/calc 2^8\n/calc 5!\n/calc sin 60');
  try { let res = smartCalc(expr); ctx.reply(`🧮 ${expr} = ${res}`); }
  catch(e){ ctx.reply('❌ Try:\n/calc 300+1\n/calc £3000√2\n/calc 50% of 200'); }
});
bot.command('add', (ctx)=>{ let a=ctx.message.text.split(' ').slice(1); ctx.reply(`🧮 ${a[0]}+${a[1]} = ${Number(a[0])+Number(a[1])}`); });
bot.command('sub', (ctx)=>{ let a=ctx.message.text.split(' ').slice(1); ctx.reply(`🧮 ${a[0]}-${a[1]} = ${Number(a[0])-Number(a[1])}`); });
bot.command('mul', (ctx)=>{ let a=ctx.message.text.split(' ').slice(1); ctx.reply(`🧮 ${a[0]}×${a[1]} = ${Number(a[0])*Number(a[1])}`); });
bot.command('div', (ctx)=>{ let a=ctx.message.text.split(' ').slice(1); ctx.reply(`🧮 ${a[0]}÷${a[1]} = ${Number(a[0])/Number(a[1])}`); });
bot.command('sqrt', (ctx)=>{ let a=ctx.message.text.split(' ')[1]; ctx.reply(`🧮 √${a} = ${Math.sqrt(Number(a))}`); });
bot.command('square', (ctx)=>{ let a=ctx.message.text.split(' ')[1]; ctx.reply(`🧮 ${a}² = ${Number(a)**2}`); });
bot.command('cube', (ctx)=>{ let a=ctx.message.text.split(' ')[1]; ctx.reply(`🧮 ${a}³ = ${Number(a)**3}`); });
bot.command('pow', (ctx)=>{ let a=ctx.message.text.split(' ').slice(1); ctx.reply(`🧮 ${a[0]}^${a[1]} = ${Math.pow(Number(a[0]),Number(a[1]))}`); });
bot.command('percent', (ctx)=>{ let a=ctx.message.text.split(' ').slice(1); ctx.reply(`🧮 ${a[0]}% of ${a[1]} = ${Number(a[0])/100*Number(a[1])}`); });
bot.command('factorial', (ctx)=>{ let n=Number(ctx.message.text.split(' ')[1]); let r=1; for(let i=2;i<=n;i++)r*=i; ctx.reply(`🧮 ${n}! = ${r}`); });
bot.command('sin', (ctx)=>{ let a=ctx.message.text.split(' ')[1]; ctx.reply(`🧮 sin ${a} = ${Math.sin(Number(a)*Math.PI/180)}`); });
bot.command('cos', (ctx)=>{ let a=ctx.message.text.split(' ')[1]; ctx.reply(`🧮 cos ${a} = ${Math.cos(Number(a)*Math.PI/180)}`); });
bot.command('tan', (ctx)=>{ let a=ctx.message.text.split(' ')[1]; ctx.reply(`🧮 tan ${a} = ${Math.tan(Number(a)*Math.PI/180)}`); });
bot.command('log', (ctx)=>{ let a=ctx.message.text.split(' ')[1]; ctx.reply(`🧮 log ${a} = ${Math.log10(Number(a))}`); });
bot.command('ln', (ctx)=>{ let a=ctx.message.text.split(' ')[1]; ctx.reply(`🧮 ln ${a} = ${Math.log(Number(a))}`); });
bot.command('gitstalk', async (ctx) => { let u=ctx.message.text.split(' ')[1]; if(!u) return ctx.reply('❌ /gitstalk octocat'); try{ let r=await axios.get(`https://api.github.com/users/${u}`, {timeout:8000}); ctx.replyWithPhoto(r.data.avatar_url, {caption:`🐙 GitHub: ${r.data.login}\nName: ${r.data.name||'N/A'}\nBio: ${r.data.bio||'N/A'}\nFollowers: ${r.data.followers}`}); }catch(e){ ctx.reply('❌ GitHub user not found'); } });
bot.command('npmstalk', async (ctx) => { let p=ctx.message.text.split(' ')[1]; if(!p) return ctx.reply('❌ /npmstalk telegraf'); try{ let r=await axios.get(`https://registry.npmjs.org/${p}`, {timeout:8000}); ctx.reply(`📦 NPM: ${p}\nVersion: ${r.data['dist-tags'].latest}`); }catch(e){ ctx.reply('❌ Package not found'); } });
bot.command('tgstalk', (ctx) => { let u=ctx.message.text.split(' ')[1]||'unknown'; ctx.reply(`🔍 Stalk ${u}:\nhttps://t.me/${u.replace('@','')}`); });
bot.command('trivia', async (ctx) => { try{ let r=await axios.get('https://opentdb.com/api.php?amount=1&type=multiple', {timeout:8000}); let q=r.data.results[0]; ctx.reply(`🎯 TRIVIA\n\n${q.question}`); }catch(e){ ctx.reply('❌ Trivia busy'); } });
bot.command('riddle', (ctx) => { let r=[['What has keys but no locks?','A piano 🎹'],['I speak without mouth?','An echo 🔊']]; let x=r[Math.floor(Math.random()*r.length)]; ctx.reply(`🧩 Riddle:\n${x[0]}\n\nAnswer: ${x[1]}`); });
bot.command('truth', (ctx) => ctx.reply('😇 TRUTH:\nWho is your crush?'));
bot.command('dare', (ctx) => ctx.reply('😈 DARE:\nSend a voice note singing!'));
bot.command('wyr', (ctx) => ctx.reply('🤔 Would You Rather:\nBe rich OR be famous?'));
bot.command('rps', (ctx) => { let c=['Rock 🪨','Paper 📄','Scissors ✂️']; ctx.reply(`🎮 Bot: ${c[Math.floor(Math.random()*3)]}`); });
bot.command('8ball', (ctx) => { let a=['Yes ✅','No ❌','Maybe 🤔','Definitely! 🔥']; ctx.reply('🎱 '+a[Math.floor(Math.random()*a.length)]); });
bot.command('dice', (ctx) => ctx.replyWithDice());
bot.command('coin', (ctx) => ctx.reply(Math.random()>0.5?'🪙 Heads!':'🪙 Tails!'));
bot.command('random', (ctx) => ctx.reply(`🎲 Random Number: ${Math.floor(Math.random()*100)+1}`));
bot.command('pick', (ctx) => { let o=ctx.message.text.split(' ').slice(1).join(' ').split(','); if(o.length<2) return ctx.reply('❌ /pick pizza, burger, chips'); ctx.reply('✅ I pick: '+o[Math.floor(Math.random()*o.length)]); });
bot.command('guess', (ctx) => ctx.reply(`🎯 I'm thinking of ${Math.floor(Math.random()*10)+1} - did you guess it?`));
bot.command('joke', async (ctx) => { try{ let r=await axios.get('https://official-joke-api.appspot.com/random_joke', {timeout:8000}); ctx.reply(`😂 ${r.data.setup}\n\n${r.data.punchline}`); }catch(e){ ctx.reply('😂 Why did the chicken cross the road? To get to WOLF MD!'); } });
bot.command('fact', async (ctx) => { try{ let r=await axios.get('https://uselessfacts.jsph.pl/random.json?language=en', {timeout:8000}); ctx.reply(`🧠 FACT:\n${r.data.text}`); }catch(e){ ctx.reply('🧠 Fact: Wolves can hear up to 10km away!'); } });
bot.command('quote', async (ctx) => { try{ let r=await axios.get('https://api.quotable.io/random', {timeout:8000}); ctx.reply(`💬 "${r.data.content}"\n— ${r.data.author}`); }catch(e){ ctx.reply('💬 "Don\'t panic to be burnt!" - WOLF'); } });
bot.command('compliment', (ctx) => ctx.reply('🥰 You are amazing! WOLF MD loves you! ❤️'));
bot.command('insult', (ctx) => ctx.reply('😂 You are so slow, even a turtle beats you! (Just joking bro!)'));
bot.command('roast', (ctx) => ctx.reply('🔥 Your phone is so old, it still thinks TikTok is a clock sound!'));
bot.command('flirt', (ctx) => ctx.reply('😘 Are you WiFi? Because I\'m feeling the connection!'));
bot.command('ship', (ctx) => ctx.reply(`💞 Ship: ${ctx.from.first_name} ❤️ WOLF MD = 98% Perfect!`));
bot.command('stupid', (ctx) => ctx.reply('🤪 You are stupidly cute!'));
bot.command('shayari', (ctx) => ctx.reply('🌙 Shayari:\nTeri yaadon mein khoya hoon,\nWOLF MD ke saath roya hoon! ❤️'));
bot.command('goodnight', (ctx) => ctx.reply('🌙 Good Night! Sleep well, WOLF is guarding you! 🐺💤'));
bot.command('iloveyou', (ctx) => ctx.reply('❤️ I love you too! - WOLF MD'));
bot.command('couplepp', (ctx) => ctx.reply('💑 Couple PP: Send 2 photos, I will make couple DP!'));
bot.command('handsome', (ctx) => ctx.reply('😎 You are 100% HANDSOME! Certified by WOLF MD!'));
bot.command('pretty', (ctx) => ctx.reply('💖 You are 100% PRETTY! Certified by WOLF MD!'));
bot.command('waifu', async (ctx) => { await ctx.replyWithPhoto(`https://image.pollinations.ai/prompt/${encodeURIComponent('cute anime waifu girl, kawaii, high quality')}?nologo=true&seed=${Math.floor(Math.random()*99999)}`, {caption:'🌸 Your Waifu! - WOLF MD'}); });
bot.command('pokemon', async (ctx) => { let p=['pikachu','charizard','bulbasaur','eevee'][Math.floor(Math.random()*4)]; let r=await axios.get(`https://pokeapi.co/api/v2/pokemon/${p}`, {timeout:8000}); ctx.replyWithPhoto(r.data.sprites.front_default, {caption:`⚡ Pokemon: ${r.data.name.toUpperCase()}`}); });
bot.command(['animepic','animewall','wallpaper'], async (ctx) => { let styles = ['beautiful anime girl, colorful, high quality', 'anime boy hero, cool, high quality', 'anime landscape wallpaper, beautiful']; let s = styles[Math.floor(Math.random()*styles.length)]; await ctx.replyWithPhoto(`https://image.pollinations.ai/prompt/${encodeURIComponent(s)}?nologo=true&seed=${Math.floor(Math.random()*99999)}`, {caption:'🌸 Anime Wallpaper by WOLF MD 🐺'}); });
bot.command('animenews', (ctx) => ctx.reply('📰 Anime News:\nhttps://myanimelist.net/news'));
bot.launch({ dropPendingUpdates: true }).then(()=>console.log('✅ WOLF MD v19 ONLINE!'));
process.once('SIGINT', ()=>bot.stop('SIGINT'));
process.once('SIGTERM', ()=>bot.stop('SIGTERM'));
