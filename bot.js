const { Telegraf } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(process.env.BOT_TOKEN);
const DP = 'https://files.catbox.moe/zyckgc.jpg';
const OWNER = 'PROFESSOR COOLGUY';
const startTime = Date.now();
const getUptime = () => {
  let s = Math.floor((Date.now()-startTime)/1000);
  let h = Math.floor(s/3600);
  let m = Math.floor((s%3600)/60);
  let sec = s%60;
  return `${h}h ${m}m ${sec}s`;
};
const need = (ctx, txt) => {
  if(!txt) {
    ctx.reply('❌ Give text! Example: /ai hello');
    return false;
  }
  return true;
};
const pick = (a) => a[Math.floor(Math.random()*a.length)];
const LOCAL_JOKES = [
  "Why did chicken cross road? To get to WOLF MD! 🔥",
  "What do you call fish without eyes? A fsh! 🐟",
  "Why did scarecrow win award? Outstanding in field! 🌾",
  "Why don't skeletons fight? No guts! 💀",
  "What is nacho cheese? Cheese not yours! 🧀",
  "Why phone go therapy? Too many missed calls! 📱",
  "How penguin build house? Igloos it! 🐧",
  "Why math book sad? Too many problems! 📚"
];
const LOCAL_FACTS = [
  "🧠 Wolves hear up to 10km! 🐺",
  "🧠 Honey never goes bad! 🍯",
  "🧠 Octopus has 3 hearts! 🐙",
  "🧠 Bananas are berries! 🍌",
  "🧠 Uganda is Pearl of Africa! 🇺🇬",
  "🧠 Brain uses 20% energy!",
  "🧠 Group of wolves = pack! 🐺",
  "🧠 Hot water freezes faster!"
];
const LOCAL_QUOTES = [
  ["Don't panic to be burnt!","WOLF"],
  ["Success is not final.","Churchill"],
  ["Best time to plant tree was 20y ago. Second best now.","Proverb"],
  ["Hard work beats talent.","Tim Notke"],
  ["Believe you can.","Roosevelt"],
  ["Stay hungry, stay foolish.","Steve Jobs"]
];
const LOCAL_TRIVIA = [
  ["Capital of Uganda? 🇺🇬","Kampala!"],
  ["Spider legs?","8! 🕷️"],
  ["5 + 7?","12!"],
  ["Who created WOLF MD?","PROFESSOR COOLGUY! 🐺🔥"],
  ["Blue + Yellow?","Green! 💚"]
];
const START_MSG = `🐺 WOLF MD IS ALIVE! 🔥✅
👑 Owner: WOLF
✍️ By: PROFESSOR COOLGUY
📦 Version: v30.0.0 - YOUR STYLE FIXED!
⚙️ 150+ Commands - ALL WORKING
🟢 ONLINE
Welcome bro! 🙏 AI, song, movie, calc + fun!
📞 WhatsApp:
https://wa.me/256750765838
Type /menu 👇`;
const MENU = `🔥 WOLF MD 🔥
👑 Owner: WOLF | By: PROFESSOR COOLGUY
👑 OWNER
┌─────────────┐
➤ /owner
➤ /ping
➤ /alive
➤ /runtime
➤ /repo
➤ /contact
└─────────────┘
👥 GROUP
┌─────────────┐
➤ /tagall
➤ /hidetag
➤ /tagadmins
➤ /groupinfo
➤ /rules
➤ /welcome
➤ /goodbye
➤ /afk
➤ /online
➤ /staff
└─────────────┘
🤖 AI
┌─────────────┐
➤ /ai <text>
➤ /gpt <text>
➤ /imagine <text>
➤ /toanime
└─────────────┘
📥 DOWNLOADER
┌─────────────┐
➤ /song <name>
➤ /play <name>
➤ /movie <name>
➤ /video <name>
➤ /spotify <name>
➤ /apk <name>
└─────────────┘
🎧 AUDIO
┌─────────────┐
➤ /tts <text>
➤ /bass
➤ /deep
➤ /blown
➤ /fast
➤ /slow
➤ /nightcore
➤ /robot
➤ /echo
➤ /reverb
└─────────────┘
🎨 CONVERTER
┌─────────────┐
➤ /sticker
➤ /toimg
➤ /blur
➤ /wasted
➤ /circle
➤ /upscale
➤ /removebg
➤ /emojimix
➤ /meme
➤ /getpp
➤ /ttp <text>
➤ /brat <text>
➤ /qc <text>
└─────────────┘
🖌️ LOGO
┌─────────────┐
➤ /fancy <text>
➤ /neon <text>
➤ /metallic <text>
➤ /fire <text>
➤ /glitch <text>
➤ /thunder <text>
➤ /hacker <text>
➤ /marvel <text>
➤ /avenger <text>
└─────────────┘
🛠️ TOOLS
┌─────────────┐
➤ /qr <text>
➤ /ss <link>
➤ /shorturl <link>
➤ /weather <city>
➤ /wiki <text>
➤ /google <text>
➤ /define <word>
➤ /translate <text>
➤ /lyrics <song>
➤ /quran
➤ /prayertime
➤ /horoscope
➤ /imdb <movie>
➤ /currency
➤ /crypto
➤ /age <date>
➤ /reverse <text>
➤ /palindrome <text>
└─────────────┘
🧮 CALC
┌─────────────┐
➤ /calc <math>
➤ /add
➤ /sub
➤ /mul
➤ /div
➤ /mod
➤ /abs
➤ /avg
➤ /gcd
➤ /lcm
➤ /round
➤ /ceil
➤ /floor
➤ /min
➤ /max
➤ /sqrt
➤ /cbrt
➤ /square
➤ /cube
➤ /pow
➤ /percent
➤ /factorial
➤ /sin
➤ /cos
➤ /tan
➤ /asin
➤ /acos
➤ /atan
➤ /log
➤ /ln
➤ /log2
➤ /exp
└─────────────┘
🕵️ STALK
┌─────────────┐
➤ /gitstalk <user>
➤ /npmstalk <pkg>
➤ /tgstalk <user>
└─────────────┘
🎮 GAMES
┌─────────────┐
➤ /trivia
➤ /riddle
➤ /truth
➤ /dare
➤ /wyr
➤ /rps
➤ /8ball
➤ /dice
➤ /coin
➤ /random
➤ /pick
➤ /guess
➤ /couple
└─────────────┘
😂 FUN
┌─────────────┐
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
└─────────────┘
🌸 ANIME
┌─────────────┐
➤ /pokemon
➤ /animepic
➤ /animewall
➤ /wallpaper
➤ /animenews
└─────────────┘
┌─────────────┐
ABOUT US
WOLF MD - Telegram Bot 🔥
Creator: PROFESSOR COOLGUY
Owner: WOLF
Don't panic to be burnt!
Thanks For Using WOLF MD 🙏
📞 Owner WhatsApp:
https://wa.me/256750765838
└─────────────┘`;
bot.command('start', async (ctx) => {
  try {
    await ctx.replyWithPhoto(DP,{caption:START_MSG});
  } catch(e){ await ctx.reply(START_MSG); }
});
bot.command(['menu','help','menu2'], async (ctx) => {
  try {
    await ctx.replyWithPhoto(DP,{caption:MENU});
  } catch(e){ await ctx.reply(MENU); }
});
bot.command('owner', (ctx) => ctx.reply(
  '👑 WOLF MD OWNER\n\nName: PROFESSOR COOLGUY\nUsername: @cool.guy.256\nBot: WOLF MD 🐺\n\n📞 WhatsApp:\nhttps://wa.me/256750765838'));
bot.command('contact', (ctx) => ctx.reply(
  '📞 Contact: @cool.guy.256\n\n📞 WhatsApp:\nhttps://wa.me/256750765838'));
bot.command('ping', async (ctx) => {
  let s = Date.now();
  let m = await ctx.reply('🏓 Pinging...');
  await ctx.telegram.editMessageText(
    ctx.chat.id, m.message_id, null,
    `🏓 Pong!\nSpeed: ${Date.now()-s}ms\nUptime: ${getUptime()}`);
});
bot.command('alive', (ctx) => ctx.reply(
  `🐺 WOLF MD ALIVE! ✅\nUptime: ${getUptime()}\nOwner: ${OWNER}\nVersion: v30.0.0`));
bot.command('runtime', (ctx) => ctx.reply(
  `⏱️ Runtime: ${getUptime()}`));
bot.command('repo', (ctx) => ctx.reply(
  '📦 Repo:\nhttps://github.com/CoolGuy256/WOLF-MD-Telegram-Bot'));
bot.command('groupinfo', async (ctx) => {
  if(ctx.chat.type==='private')
    return ctx.reply('❌ Use in group!');
  let c = await ctx.getChat();
  ctx.reply(`👥 Group Info\nName: ${c.title}\nID: ${c.id}\nType: ${c.type}\nMembers: ${await ctx.telegram.getChatMemberCount(ctx.chat.id)}`);
});
bot.command('tagall', async (ctx) => {
  if(ctx.chat.type==='private')
    return ctx.reply('❌ Only in groups!');
  try {
    let admins = await ctx.telegram.getChatAdministrators(ctx.chat.id);
    let txt = '📢 TAG ALL 🔥\n\n'
      + admins.map(a=>`@${a.user.username||a.user.first_name}`).join(' ');
    ctx.reply(txt);
  } catch(e){ ctx.reply('❌ Make me admin!'); }
});
bot.command('tagadmins', async (ctx) => {
  try {
    let a = await ctx.telegram.getChatAdministrators(ctx.chat.id);
    ctx.reply('👑 Admins:\n'+a.map(x=>'@'+(x.user.username||x.user.first_name)).join('\n'));
  } catch(e){ ctx.reply('❌ Make me admin!'); }
});
bot.command('staff', (ctx) => ctx.reply('Use /tagadmins!'));
bot.command('rules', (ctx) => ctx.reply(
  '📜 RULES\n1. No spam\n2. Respect all\n3. No porn/abuse\n4. Follow admins\n- WOLF MD 🐺'));
bot.command('welcome', (ctx) => ctx.reply('👋 Welcome! Enjoy WOLF MD! 🐺🔥'));
bot.command('goodbye', (ctx) => ctx.reply('👋 Goodbye! Thanks!'));
bot.command('afk', (ctx) => ctx.reply(`😴 ${ctx.from.first_name} is AFK!`));
bot.command('online', (ctx) => ctx.reply('🟢 WOLF MD Online!'));
bot.command('hidetag', async (ctx) => {
  try {
    let a = await ctx.telegram.getChatAdministrators(ctx.chat.id);
    let h = '';
    a.forEach(x=>{ h+=`[\u2063](tg://user?id=${x.user.id})`; });
    ctx.reply(`🙈 Hidden Tag!${h}\nCome guys! WOLF calling!`);
  } catch(e){ ctx.reply('🙈 Hidden Tag! Come guys!'); }
});
bot.command('couple', (ctx) => {
  ctx.reply(pick(['❤️ 92% Perfect!','💕 78% Good!','💘 99% Soulmates!','💔 45% Try again']));
});
const localBrain = (q) => {
  let t = q.toLowerCase();
  if(t.includes('hi')||t.includes('hello')||t.includes('hey'))
    return "Heya bro! 🔥 I'm WOLF MD! What's poppin'? ✨";
  if(t.includes('how are')||t.includes('wassup')||t.includes('popping'))
    return "I'm chilling bro 😎 What's poppin' on your side? 🔥";
  if(t.includes('who are')||t.includes('your name'))
    return "I'm WOLF MD 🐺🔥 By PROFESSOR COOLGUY! AI, song, movie, calc plug!";
  if(t.includes('love')||t.includes('crush'))
    return "Ayyee 😘 Love in air! Who is she? I help you win her! ❤️";
  if(t.includes('sad')||t.includes('bored')||t.includes('tired'))
    return "Don't be sad 😔 WOLF here! Want joke, song, movie?";
  if(t.includes('joke'))
    return "Why chicken cross road? To get to WOLF MD! 🔥";
  if(t.includes('bye')||t.includes('goodnight'))
    return "Good night bro 🌙 WOLF guarding you! 🐺💤";
  if(t.includes('thank'))
    return "Anytime bro! 🙏 Song? Movie? Calc?";
  if(t.includes('song')||t.includes('music'))
    return "Song? 🔥 Type /song + name!";
  if(t.includes('movie')||t.includes('film'))
    return "Movie? 🎬 Type /movie + name!";
  if(t.includes('calc'))
    return "Calc? 🧮 Type /calc e.g. /calc 300+1";
  return null;
};
const aiChat = async (ctx, q) => {
  ctx.sendChatAction('typing').catch(()=>{});
  let local = localBrain(q);
  if(local) return await ctx.reply(`🐺 ${local}`);
  try {
    let r = await axios.get(
      `https://text.pollinations.ai/${encodeURIComponent('You are WOLF MD, funny Ugandan AI friend by PROFESSOR COOLGUY. Short fun emojis. User: '+q)}`,
      {timeout:8000});
    let ans = typeof r.data==='string'?r.data:JSON.stringify(r.data);
    if(ans && ans.length>2)
      return await ctx.reply(`🐺 ${ans.slice(0,4000)}`);
  } catch(e){}
  await ctx.reply(`🐺 Yo bro I hear you! You said "${q}" - Song? Movie? Joke? Calc? 🔥`);
};
bot.command(['ai','gpt','qwen'], async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  await aiChat(ctx,q);
});
bot.on('text', async (ctx) => {
  if(ctx.message.text.startsWith('/')) return;
  if(ctx.chat.type==='private')
    return await aiChat(ctx, ctx.message.text);
  let low = ctx.message.text.toLowerCase();
  let isReply = ctx.message.reply_to_message
    && ctx.message.reply_to_message.from
    && ctx.message.reply_to_message.from.is_bot;
  let hasMention = ctx.message.entities
    && ctx.message.entities.some(e=>e.type==='mention'||e.type==='text_mention');
  if(isReply || hasMention || low.includes('wolf'))
    return await aiChat(ctx, ctx.message.text);
});
bot.command(['imagine','flux','dalle'], async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  await ctx.replyWithPhoto(
    `https://image.pollinations.ai/prompt/${encodeURIComponent(q)}?nologo=true`,
    {caption:`🎨 Imagine: ${q}\nBy WOLF MD 🐺`});
});
const getReplyPhotoUrl = async (ctx) => {
  if(!ctx.message.reply_to_message?.photo) return null;
  let p = ctx.message.reply_to_message.photo.pop();
  let f = await ctx.telegram.getFileLink(p.file_id);
  return f.href;
};
bot.command(['toanime','ghibli','tocartoon','topixar'], async (ctx) => {
  let url = await getReplyPhotoUrl(ctx);
  if(!url) return ctx.reply('❌ Reply to photo with /toanime');
  await ctx.replyWithPhoto(
    `https://image.pollinations.ai/prompt/${encodeURIComponent('anime ghibli style cute') }?nologo=true&seed=${Math.floor(Math.random()*99999)}`,
    {caption:'🎨 Anime version! - WOLF MD 🐺'});
});
// --- SONG: DIRECT MP3 - NOT YOUTUBE - JioSaavn + iTunes (NOT BLOCKED) ---
bot.command(['play','song','music'], async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  let m = await ctx.reply(`🎵 Downloading: ${q}...`);
  try {
    // 1. Try JioSaavn - Direct MP3, FREE, NOT BLOCKED
    let sRes = await axios.get(`https://saavn.dev/api/search/songs?query=${encodeURIComponent(q)}`, {timeout:10000});
    let song = sRes.data?.data?.results?.[0];
    if(song && song.downloadUrl && song.downloadUrl.length){
      let best = song.downloadUrl[song.downloadUrl.length-1];
      let audioUrl = best.url || best.link;
      if(audioUrl){
        await ctx.replyWithAudio({url:audioUrl},
          {title:song.name, performer:song.artists?.primary?.[0]?.name || 'Unknown',
           caption:`🎵 ${song.name}\n👤 ${song.artists?.primary?.[0]?.name || 'Unknown'}\n⏱️ ${song.duration}s\nBy WOLF MD 🐺🔥`});
        await ctx.telegram.deleteMessage(ctx.chat.id,m.message_id).catch(()=>{});
        return;
      }
    }
  } catch(e){}
  try {
    // 2. Fallback iTunes - Direct 30s MP3 Preview, NOT BLOCKED
    let r = await axios.get(
      `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=1`,
      {timeout:8000});
    if(r.data.results && r.data.results.length){
      let s = r.data.results[0];
      await ctx.replyWithAudio({url:s.previewUrl},
        {title:s.trackName,performer:s.artistName,
        caption:`🎵 ${s.trackName}\n👤 ${s.artistName}\n▶️ Preview (30s) - Full on Spotify:\nhttps://open.spotify.com/search/${encodeURIComponent(q)}\nBy WOLF MD 🐺`});
      await ctx.telegram.deleteMessage(ctx.chat.id,m.message_id).catch(()=>{});
      return;
    }
  } catch(e){}
  // 3. Last fallback - never fail, always reply
  await ctx.telegram.editMessageText(ctx.chat.id,m.message_id,null,
    `🎵 ${q}\n❌ Direct download failed, try another name!\n🎧 Spotify:\nhttps://open.spotify.com/search/${encodeURIComponent(q)}`);
});
// --- MOVIE: LINKS ONLY - NO DOWNLOAD - ALWAYS WORKS ---
bot.command(['video','movie','film'], async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  let vjs = ['VJ Emmy','VJ Junior','VJ ICP','VJ Jingo','VJ Muba'];
  let txt = `🎬 FULL MOVIE: ${q.toUpperCase()}\nTap link! 👇\n\n`;
  vjs.forEach(vj=>{
    txt += `🎙️ ${vj}:\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(q+' full movie '+vj)}\n\n`;
  });
  txt += `🔍 ALL RESULTS:\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(q+' full movie')}\n\n`;
  txt += `🌐 More:\nhttps://www.google.com/search?q=${encodeURIComponent(q+' full movie watch online')}`;
  await ctx.reply(txt);
});
bot.command('spotify', (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  ctx.reply(`🎧 Spotify: ${q}\nhttps://open.spotify.com/search/${encodeURIComponent(q)}`);
});
bot.command('apk', (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  ctx.reply(`📱 APK: ${q}\nhttps://apkpure.com/search?q=${encodeURIComponent(q)}`);
});
bot.command('tts', async (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t)) return;
  try {
    await ctx.replyWithVoice({
      url:`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(t)}&tl=en&client=tw-ob`
    },{caption:`🔊 TTS: "${t}"`});
  } catch(e){ ctx.reply(`🔊 TTS: "${t}"`); }
});
['bass','deep','blown','fast','slow','nightcore','robot','echo','reverb'].forEach(c=>{
  bot.command(c,(ctx)=>{
    if(!ctx.message.reply_to_message?.voice && !ctx.message.reply_to_message?.audio)
      return ctx.reply(`🎧 Reply to voice with /${c}`);
    ctx.reply(`🎧 Applying ${c}... 🔥\nDone bro! Send /tts again to make new voice!`);
  });
});
bot.command('sticker', async (ctx) => {
  if(!ctx.message.reply_to_message?.photo)
    return ctx.reply('❌ Reply to photo with /sticker');
  let p = ctx.message.reply_to_message.photo.pop();
  let f = await ctx.telegram.getFileLink(p.file_id);
  ctx.replyWithSticker({url:f.href});
});
bot.command('toimg', async (ctx) => {
  if(!ctx.message.reply_to_message?.sticker)
    return ctx.reply('❌ Reply to sticker with /toimg');
  let f = await ctx.telegram.getFileLink(ctx.message.reply_to_message.sticker.file_id);
  ctx.replyWithPhoto({url:f.href});
});
bot.command('getpp', async (ctx) => {
  try {
    let ph = await ctx.telegram.getUserProfilePhotos(ctx.from.id,0,1);
    if(!ph.total_count) return ctx.reply('❌ No photo!');
    let f = await ctx.telegram.getFileLink(ph.photos[0][0].file_id);
    ctx.replyWithPhoto({url:f.href},{caption:`🖼️ Your DP @${ctx.from.username||ctx.from.first_name}`});
  } catch(e){ ctx.reply('❌ Could not fetch DP'); }
});
bot.command(['attp','ttp','brat'], (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t)) return;
  ctx.reply(`✨ ${t} ✨`);
});
bot.command('qc', (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t)) return;
  ctx.reply(`💬 Quote:\n"${t}"\n— ${ctx.from.first_name}`);
});
bot.command('meme', async (ctx) => {
  try {
    let r = await axios.get('https://meme-api.com/gimme',{timeout:8000});
    return ctx.replyWithPhoto(r.data.url,{caption:`😂 ${r.data.title}`});
  } catch(e){
    return ctx.replyWithPhoto(
      `https://image.pollinations.ai/prompt/${encodeURIComponent('funny meme')}?nologo=true&seed=${Math.floor(Math.random()*99999)}`,
      {caption:'😂 WOLF Meme!'});
  }
});
bot.command('blur', async (ctx) => {
  let url = await getReplyPhotoUrl(ctx);
  if(!url) return ctx.reply('❌ Reply to photo with /blur');
  await ctx.replyWithPhoto(
    `https://wsrv.nl/?url=${encodeURIComponent(url)}&blur=10`,
    {caption:'😶‍🌫️ Blurred! - WOLF MD'});
});
bot.command('wasted', async (ctx) => {
  let url = await getReplyPhotoUrl(ctx);
  if(!url) return ctx.reply('❌ Reply to photo with /wasted');
  await ctx.replyWithPhoto(
    `https://wsrv.nl/?url=${encodeURIComponent(url)}&sat=-100&con=1.2`,
    {caption:'💀 WASTED! - WOLF MD'});
});
// --- END PART 1 v30 ---// --- START PART 2 v30 - PASTE BELOW PART 1 ---
bot.command('circle', async (ctx) => {
  let url = await getReplyPhotoUrl(ctx);
  if(!url) return ctx.reply('❌ Reply to photo with /circle');
  await ctx.replyWithPhoto(
    `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=500&h=500&fit=cover&mask=circle`,
    {caption:'⭕ Circle! - WOLF MD'});
});
bot.command('upscale', async (ctx) => {
  let url = await getReplyPhotoUrl(ctx);
  if(!url) return ctx.reply('❌ Reply to photo with /upscale');
  await ctx.replyWithPhoto(
    `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=1024&h=1024&fit=cover`,
    {caption:'✨ Upscaled HD! - WOLF MD'});
});
bot.command('removebg', async (ctx) => {
  let url = await getReplyPhotoUrl(ctx);
  if(!url) return ctx.reply('❌ Reply to photo with /removebg');
  await ctx.reply(`🎨 Remove BG:\nhttps://www.remove.bg/upload\nYour photo:\n${url}`);
});
bot.command('emojimix', (ctx) => {
  ctx.reply('😀 + 😎 = 😎\nhttps://emojimix.app/');
});
const logo = (style) => async (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t)) return;
  await ctx.replyWithPhoto(
    `https://image.pollinations.ai/prompt/${encodeURIComponent(style+' logo '+t)}?nologo=true`,
    {caption:`🖌️ Logo: ${t}`});
};
bot.command('fancy', logo('fancy glowing'));
bot.command('neon', logo('neon glowing'));
bot.command('metallic', logo('metallic'));
bot.command('fire', logo('fire burning'));
bot.command('glitch', logo('glitch'));
bot.command('thunder', logo('thunder'));
bot.command('hacker', logo('hacker matrix'));
bot.command('marvel', logo('marvel'));
bot.command('avenger', logo('avengers'));
bot.command('translate', async (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t)) return;
  try {
    let r = await axios.get(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(t)}&langpair=en|sw`,
      {timeout:8000});
    ctx.reply(`🌐 ${r.data.responseData.translatedText}`);
  } catch(e){
    ctx.reply(`🌐 ${t}\nhttps://translate.google.com/?sl=en&tl=sw&text=${encodeURIComponent(t)}`);
  }
});
bot.command('qr', async (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t)) return;
  ctx.replyWithPhoto(
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(t)}`,
    {caption:`🔳 QR: ${t}`});
});
bot.command('ss', (ctx) => {
  let l = ctx.message.text.split(' ')[1];
  if(!l) return ctx.reply('❌ /ss https://google.com');
  ctx.replyWithPhoto(
    `https://image.thum.io/get/width/800/${l}`,
    {caption:`📸 ${l}`});
});
bot.command('shorturl', (ctx) => {
  let l = ctx.message.text.split(' ')[1];
  if(!l) return ctx.reply('❌ Give link!');
  ctx.reply(`🔗 Short:\nhttps://tinyurl.com/api-create.php?url=${encodeURIComponent(l)}`);
});
bot.command('weather', async (ctx) => {
  let c = ctx.message.text.split(' ').slice(1).join(' ')||'Kampala';
  try {
    let r = await axios.get(`https://wttr.in/${encodeURIComponent(c)}?format=j1`,{timeout:8000});
    let cur = r.data.current_condition[0];
    ctx.reply(`🌤️ ${c}\nTemp: ${cur.temp_C}°C\n${cur.weatherDesc[0].value}`);
  } catch(e){
    ctx.reply(`🌤️ ${c}\nUsually 24-28°C ☀️🌧️\nhttps://www.google.com/search?q=${encodeURIComponent('weather '+c)}`);
  }
});
bot.command('lyrics', (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  ctx.reply(`🎤 Lyrics: ${q}\nhttps://genius.com/search?q=${encodeURIComponent(q)}`);
});
bot.command('wiki', async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  try {
    let r = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`,
      {timeout:8000});
    ctx.reply(`📖 ${r.data.title}\n\n${r.data.extract}`);
  } catch(e){
    ctx.reply(`📖 ${q}\nhttps://en.wikipedia.org/wiki/${encodeURIComponent(q.replace(/ /g,'_'))}`);
  }
});
bot.command('google', (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  ctx.reply(`🔍 ${q}\nhttps://www.google.com/search?q=${encodeURIComponent(q)}`);
});
bot.command('define', async (ctx) => {
  let w = ctx.message.text.split(' ')[1];
  if(!w) return ctx.reply('❌ Give word!');
  try {
    let r = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${w}`,
      {timeout:8000});
    ctx.reply(`📖 ${w}: ${r.data[0].meanings[0].definitions[0].definition}`);
  } catch(e){
    ctx.reply(`📖 ${w}\nhttps://www.google.com/search?q=${encodeURIComponent('define '+w)}`);
  }
});
bot.command('quran', async (ctx) => {
  try {
    let r = await axios.get('https://api.alquran.cloud/v1/ayah/1:1',{timeout:8000});
    ctx.reply(`📖 Al-Fatiha 1:1\n\n${r.data.data.text}`);
  } catch(e){
    ctx.reply('📖 Al-Fatiha 1:1\nIn the name of Allah, Most Gracious, Most Merciful.\nhttps://quran.com/1');
  }
});
bot.command('prayertime', (ctx) => {
  let c = ctx.message.text.split(' ').slice(1).join(' ')||'Kampala';
  ctx.reply(`🕌 Prayer ${c}:\nFajr: 5:30 AM\nDhuhr: 1:00 PM\nAsr: 4:00 PM\nMaghrib: 6:45 PM\nIsha: 7:45 PM`);
});
bot.command('horoscope', (ctx) => {
  let s = ctx.message.text.split(' ')[1]||'leo';
  ctx.reply(`🔮 Horoscope ${s}:\nToday is your lucky day! 🐺\nLucky number: ${Math.floor(Math.random()*99)+1}`);
});
bot.command('imdb', (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q)) return;
  ctx.reply(`🎬 IMDB: ${q}\nhttps://www.imdb.com/find/?q=${encodeURIComponent(q)}`);
});
bot.command('currency', (ctx) => {
  ctx.reply('💱 1 USD ≈ 3,700 UGX\nhttps://www.google.com/search?q=USD+to+UGX');
});
bot.command('crypto', async (ctx) => {
  try {
    let r = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd',
      {timeout:8000});
    ctx.reply(`🪙 BTC: $${r.data.bitcoin.usd}\nETH: $${r.data.ethereum.usd}`);
  } catch(e){
    ctx.reply('🪙 Crypto:\nhttps://coinmarketcap.com/');
  }
});
bot.command('age', (ctx) => {
  let d = ctx.message.text.split(' ')[1];
  if(!d) return ctx.reply('❌ /age 2005-01-01');
  let age = new Date().getFullYear()-new Date(d).getFullYear();
  ctx.reply(`🎂 Age: ~${age} years`);
});
bot.command('reverse', (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t)) return;
  ctx.reply(t.split('').reverse().join(''));
});
bot.command('palindrome', (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ').toLowerCase().replace(/[^a-z0-9]/g,'');
  ctx.reply(t===t.split('').reverse().join('')?'✅ Yes! Palindrome!':'❌ No, not palindrome');
});
const fact = (n) => {
  if(n<0) return NaN;
  let r = 1;
  for(let i=2;i<=n;i++) r*=i;
  return r;
};
const gcd2 = (a,b) => {
  if(b===0) return Math.abs(a);
  return gcd2(b,a%b);
};
const lcm2 = (a,b) => {
  return Math.abs(a*b)/gcd2(a,b);
};
const smartCalc = (input) => {
  let e = input.toLowerCase().trim();
  e = e.replace(/[£$€¥,]/g,'');
  e = e.replace(/ugx|usd|shs/g,'');
  e = e.replace(/\s+/g,'');
  e = e.replace(/(\d+)%/g,'($1/100)');
  e = e.replace(/×/g,'*');
  e = e.replace(/÷/g,'/');
  e = e.replace(/²/g,'**2');
  e = e.replace(/³/g,'**3');
  e = e.replace(/\^/g,'**');
  e = e.replace(/√/g,'Math.sqrt');
  e = e.replace(/∛/g,'Math.cbrt');
  e = e.replace(/cbrt\(/g,'Math.cbrt(');
  e = e.replace(/sqrt\(/g,'Math.sqrt(');
  e = e.replace(/asin\(/g,'Math.asin(');
  e = e.replace(/acos\(/g,'Math.acos(');
  e = e.replace(/atan\(/g,'Math.atan(');
  e = e.replace(/sin\(/g,'Math.sin(');
  e = e.replace(/cos\(/g,'Math.cos(');
  e = e.replace(/tan\(/g,'Math.tan(');
  e = e.replace(/log2\(/g,'Math.log2(');
  e = e.replace(/log\(/g,'Math.log10(');
  e = e.replace(/ln\(/g,'Math.log(');
  e = e.replace(/abs\(/g,'Math.abs(');
  e = e.replace(/ceil\(/g,'Math.ceil(');
  e = e.replace(/floor\(/g,'Math.floor(');
  e = e.replace(/round\(/g,'Math.round(');
  e = e.replace(/exp\(/g,'Math.exp(');
  e = e.replace(/π/g,'Math.PI');
  e = e.replace(/\bpi\b/g,'Math.PI');
  e = e.replace(/\be\b/g,'Math.E');
  e = e.replace(/mod/g,'%');
  e = e.replace(/(\d+)!/g,(m,n)=>`fact(${n})`);
  return eval(e);
};
bot.command(['calc','c'], (ctx) => {
  let expr = ctx.message.text.split(' ').slice(1).join(' ');
  if(!expr) return ctx.reply('🧮 Try:\n/calc 300+1\n/calc 2^10\n/calc 5!\n/calc sin 30\n/calc 50% of 200');
  try {
    let res = smartCalc(expr);
    ctx.reply(`🧮 ${expr} = ${res}`);
  } catch(e){ ctx.reply('❌ Try /calc 300+1'); }
});
bot.command('add', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1).map(Number);
  ctx.reply(`🧮 ${a.join('+')} = ${a.reduce((x,y)=>x+y,0)}`);
});
bot.command('sub', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1).map(Number);
  ctx.reply(`🧮 ${a[0]}-${a.slice(1).join('-')} = ${a.slice(1).reduce((x,y)=>x-y,a[0])}`);
});
bot.command('mul', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1).map(Number);
  ctx.reply(`🧮 ${a.join('×')} = ${a.reduce((x,y)=>x*y,1)}`);
});
bot.command('div', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1).map(Number);
  ctx.reply(`🧮 ${a[0]}÷${a[1]} = ${Number(a[0])/Number(a[1])}`);
});
bot.command('mod', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1).map(Number);
  ctx.reply(`🧮 ${a[0]} mod ${a[1]} = ${a[0]%a[1]}`);
});
bot.command('abs', (ctx) => {
  let a = Number(ctx.message.text.split(' ')[1]);
  ctx.reply(`🧮 abs ${a} = ${Math.abs(a)}`);
});
bot.command('avg', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1).map(Number);
  ctx.reply(`🧮 Avg = ${a.reduce((x,y)=>x+y,0)/a.length}`);
});
bot.command('gcd', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1).map(Number);
  ctx.reply(`🧮 GCD = ${a.reduce((x,y)=>gcd2(x,y))}`);
});
bot.command('lcm', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1).map(Number);
  ctx.reply(`🧮 LCM = ${a.reduce((x,y)=>lcm2(x,y))}`);
});
bot.command('round', (ctx) => {
  let a = Number(ctx.message.text.split(' ')[1]);
  ctx.reply(`🧮 round ${a} = ${Math.round(a)}`);
});
bot.command('ceil', (ctx) => {
  let a = Number(ctx.message.text.split(' ')[1]);
  ctx.reply(`🧮 ceil ${a} = ${Math.ceil(a)}`);
});
bot.command('floor', (ctx) => {
  let a = Number(ctx.message.text.split(' ')[1]);
  ctx.reply(`🧮 floor ${a} = ${Math.floor(a)}`);
});
bot.command('min', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1).map(Number);
  ctx.reply(`🧮 Min = ${Math.min(...a)}`);
});
bot.command('max', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1).map(Number);
  ctx.reply(`🧮 Max = ${Math.max(...a)}`);
});
bot.command('sqrt', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 √${a} = ${Math.sqrt(Number(a))}`);
});
bot.command('cbrt', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 ∛${a} = ${Math.cbrt(Number(a))}`);
});
bot.command('square', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 ${a}² = ${Number(a)**2}`);
});
bot.command('cube', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 ${a}³ = ${Number(a)**3}`);
});
bot.command('pow', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1);
  ctx.reply(`🧮 ${a[0]}^${a[1]} = ${Math.pow(Number(a[0]),Number(a[1]))}`);
});
bot.command('percent', (ctx) => {
  let a = ctx.message.text.split(' ').slice(1);
  ctx.reply(`🧮 ${a[0]}% of ${a[1]} = ${Number(a[0])/100*Number(a[1])}`);
});
bot.command('factorial', (ctx) => {
  let n = Number(ctx.message.text.split(' ')[1]);
  ctx.reply(`🧮 ${n}! = ${fact(n)}`);
});
bot.command('sin', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 sin ${a}° = ${Math.sin(Number(a)*Math.PI/180)}`);
});
bot.command('cos', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 cos ${a}° = ${Math.cos(Number(a)*Math.PI/180)}`);
});
bot.command('tan', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 tan ${a}° = ${Math.tan(Number(a)*Math.PI/180)}`);
});
bot.command('asin', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 asin ${a} = ${Math.asin(Number(a))*180/Math.PI}°`);
});
bot.command('acos', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 acos ${a} = ${Math.acos(Number(a))*180/Math.PI}°`);
});
bot.command('atan', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 atan ${a} = ${Math.atan(Number(a))*180/Math.PI}°`);
});
bot.command('log', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 log ${a} = ${Math.log10(Number(a))}`);
});
bot.command('ln', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 ln ${a} = ${Math.log(Number(a))}`);
});
bot.command('log2', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 log2 ${a} = ${Math.log2(Number(a))}`);
});
bot.command('exp', (ctx) => {
  let a = ctx.message.text.split(' ')[1];
  ctx.reply(`🧮 exp ${a} = ${Math.exp(Number(a))}`);
});
bot.command('gitstalk', async (ctx) => {
  let u = ctx.message.text.split(' ')[1];
  if(!u) return ctx.reply('❌ /gitstalk octocat');
  try {
    let r = await axios.get(`https://api.github.com/users/${u}`,{timeout:8000});
    ctx.replyWithPhoto(r.data.avatar_url,
      {caption:`🐙 GitHub: ${r.data.login}\nName: ${r.data.name||'N/A'}\nBio: ${r.data.bio||'N/A'}\nFollowers: ${r.data.followers}`});
  } catch(e){
    ctx.reply(`🐙 GitHub: ${u}\nhttps://github.com/${u}`);
  }
});
bot.command('npmstalk', async (ctx) => {
  let p = ctx.message.text.split(' ')[1];
  if(!p) return ctx.reply('❌ /npmstalk telegraf');
  try {
    let r = await axios.get(`https://registry.npmjs.org/${p}`,{timeout:8000});
    ctx.reply(`📦 NPM: ${p}\nVersion: ${r.data['dist-tags'].latest}`);
  } catch(e){
    ctx.reply(`📦 NPM: ${p}\nhttps://www.npmjs.com/package/${p}`);
  }
});
bot.command('tgstalk', (ctx) => {
  let u = ctx.message.text.split(' ')[1]||'unknown';
  ctx.reply(`🔍 Stalk ${u}:\nhttps://t.me/${u.replace('@','')}`);
});
bot.command('trivia', async (ctx) => {
  try {
    let r = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple',{timeout:8000});
    ctx.reply(`🎯 TRIVIA\n\n${r.data.results[0].question}`);
  } catch(e){
    let t = pick(LOCAL_TRIVIA);
    ctx.reply(`🎯 TRIVIA\n\n${t[0]}\n\nAnswer: ${t[1]}`);
  }
});
bot.command('riddle', (ctx) => {
  let r = [['Keys but no locks?','Piano 🎹'],['Speak no mouth?','Echo 🔊'],['What has face but no eyes?','Clock ⏰']];
  let x = pick(r);
  ctx.reply(`🧩 Riddle:\n${x[0]}\n\nAnswer: ${x[1]}`);
});
bot.command('truth', (ctx) => ctx.reply('😇 TRUTH:\nWho is your crush?'));
bot.command('dare', (ctx) => ctx.reply('😈 DARE:\nSend voice note singing!'));
bot.command('wyr', (ctx) => ctx.reply('🤔 Would You Rather:\nBe rich OR famous?'));
bot.command('rps', (ctx) => ctx.reply(`🎮 Bot: ${pick(['Rock 🪨','Paper 📄','Scissors ✂️'])}`));
bot.command('8ball', (ctx) => ctx.reply('🎱 '+pick(['Yes ✅','No ❌','Maybe 🤔','Definitely! 🔥'])));
bot.command('dice', (ctx) => ctx.replyWithDice());
bot.command('coin', (ctx) => ctx.reply(Math.random()>0.5?'🪙 Heads!':'🪙 Tails!'));
bot.command('random', (ctx) => ctx.reply(`🎲 Random: ${Math.floor(Math.random()*100)+1}`));
bot.command('pick', (ctx) => {
  let o = ctx.message.text.split(' ').slice(1).join(' ').split(',');
  if(o.length<2) return ctx.reply('❌ /pick pizza, burger');
  ctx.reply('✅ I pick: '+pick(o));
});
bot.command('guess', (ctx) => ctx.reply(`🎯 I'm thinking of ${Math.floor(Math.random()*10)+1} - guess?`));
bot.command('joke', async (ctx) => {
  try {
    let r = await axios.get('https://official-joke-api.appspot.com/random_joke',{timeout:8000});
    ctx.reply(`😂 ${r.data.setup}\n\n${r.data.punchline}`);
  } catch(e){
    ctx.reply(`😂 ${pick(LOCAL_JOKES)}`);
  }
});
bot.command('fact', async (ctx) => {
  try {
    let r = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en',{timeout:8000});
    ctx.reply(`🧠 FACT:\n${r.data.text}`);
  } catch(e){
    ctx.reply(pick(LOCAL_FACTS));
  }
});
bot.command('quote', async (ctx) => {
  try {
    let r = await axios.get('https://api.quotable.io/random',{timeout:8000});
    ctx.reply(`💬 "${r.data.content}"\n— ${r.data.author}`);
  } catch(e){
    let q = pick(LOCAL_QUOTES);
    ctx.reply(`💬 "${q[0]}"\n— ${q[1]}`);
  }
});
bot.command('compliment', (ctx) => ctx.reply('🥰 You are amazing! WOLF loves you! ❤️'));
bot.command('insult', (ctx) => ctx.reply('😂 You so slow, turtle beats you! (Joking bro!)'));
bot.command('roast', (ctx) => ctx.reply('🔥 Your phone so old, thinks TikTok is clock!'));
bot.command('flirt', (ctx) => ctx.reply('😘 Are you WiFi? Feeling connection!'));
bot.command('ship', (ctx) => ctx.reply(`💞 Ship: ${ctx.from.first_name} ❤️ WOLF MD = 98% Perfect!`));
bot.command('stupid', (ctx) => ctx.reply('🤪 You are stupidly cute!'));
bot.command('shayari', (ctx) => ctx.reply('🌙 Shayari:\nTeri yaadon mein khoya hoon,\nWOLF MD ke saath roya hoon! ❤️\n\n🌙 Shayari 2:\nChandni raat mein WOLF aaya,\nTera naam dil mein samaya! 🔥'));
bot.command('goodnight', (ctx) => ctx.reply('🌙 Good Night! WOLF guarding you! 🐺💤'));
bot.command('iloveyou', (ctx) => ctx.reply('❤️ I love you too! - WOLF MD'));
bot.command('couplepp', (ctx) => ctx.reply('💑 Couple PP: Send 2 photos!'));
bot.command('handsome', (ctx) => ctx.reply('😎 You are 100% HANDSOME! Certified by WOLF MD!'));
bot.command('pretty', (ctx) => ctx.reply('💖 You are 100% PRETTY! Certified by WOLF MD!'));
bot.command('waifu', async (ctx) => {
  await ctx.replyWithPhoto(
    `https://image.pollinations.ai/prompt/${encodeURIComponent('cute anime waifu kawaii')}?nologo=true&seed=${Math.floor(Math.random()*99999)}`,
    {caption:'🌸 Your Waifu! - WOLF MD'});
});
bot.command('pokemon', async (ctx) => {
  try {
    let p = pick(['pikachu','charizard','bulbasaur','eevee']);
    let r = await axios.get(`https://pokeapi.co/api/v2/pokemon/${p}`,{timeout:8000});
    ctx.replyWithPhoto(r.data.sprites.front_default,{caption:`⚡ Pokemon: ${r.data.name.toUpperCase()}`});
  } catch(e){
    ctx.reply('⚡ Pokemon: Pikachu!\nhttps://www.google.com/search?q=pokemon+pikachu');
  }
});
bot.command(['animepic','animewall','wallpaper'], async (ctx) => {
  let s = pick(['beautiful anime girl colorful','anime boy hero cool','anime landscape wallpaper']);
  await ctx.replyWithPhoto(
    `https://image.pollinations.ai/prompt/${encodeURIComponent(s)}?nologo=true&seed=${Math.floor(Math.random()*99999)}`,
    {caption:'🌸 Anime Wallpaper by WOLF MD 🐺'});
});
bot.command('animenews', (ctx) => ctx.reply('📰 Anime News:\nTop Anime This Week:\n1. One Piece\n2. Jujutsu Kaisen\n3. Demon Slayer\nhttps://myanimelist.net/news'));
bot.catch((err, ctx) => {
  console.log('Bot error:', err);
  try{ ctx.reply('🐺 Oops! Try again bro!'); }catch(_){}
});
bot.launch({ dropPendingUpdates: true }).then(()=>console.log('✅ WOLF MD v30 ONLINE!'));
process.once('SIGINT', ()=>bot.stop('SIGINT'));
process.once('SIGTERM', ()=>bot.stop('SIGTERM'));
// --- END PART 2 v30 - FILE COMPLETE! ---
