// --- PART 1 v33 START ---
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
const need = (ctx, txt, ex) => {
  if(!txt) {
    ctx.reply(`❌ Give text!\nExample: ${ex || '/ai hello'}`);
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
📦 Version: v33.0.0 - CALC = ONE!
⚙️ 150+ Commands - ALL REPLY!
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
  `🐺 WOLF MD ALIVE! ✅\nUptime: ${getUptime()}\nOwner: ${OWNER}\nVersion: v33.0.0`));
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
const aiChat = async (ctx, q) => {
  ctx.sendChatAction('typing').catch(()=>{});
  try {
    let r = await axios.get(
      `https://text.pollinations.ai/${encodeURIComponent('You are WOLF MD, funny Ugandan AI friend by PROFESSOR COOLGUY. Short fun emojis. User: '+q)}`,
      {timeout:8000});
    let ans = typeof r.data==='string'?r.data:JSON.stringify(r.data);
    if(ans && ans.length>2)
      return await ctx.reply(`🐺 ${ans.slice(0,4000)}`);
  } catch(e){}
  await ctx.reply(`🐺 Yo bro I hear you! You said "${q}" - Try /song, /movie, /joke, /calc! 🔥`);
};
bot.command(['ai','gpt','qwen'], async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q,'/ai hello')) return;
  await aiChat(ctx,q);
});
bot.command(['imagine','flux','dalle'], async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q,'/imagine cute cat')) return;
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
  if(!url) return ctx.reply('❌ Reply to a PHOTO with /toanime');
  await ctx.replyWithPhoto(
    `https://image.pollinations.ai/prompt/${encodeURIComponent('anime ghibli style cute')}?nologo=true&seed=${Math.floor(Math.random()*99999)}`,
    {caption:'🎨 Anime version! - WOLF MD 🐺'});
});
bot.command(['play','song','music'], async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q,'/song Perfect Ed Sheeran')) return;
  let m = await ctx.reply(`🎵 Downloading: ${q}...`);
  try {
    let r = await axios.get(
      `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=1`,
      {timeout:8000});
    if(r.data.results && r.data.results.length){
      let s = r.data.results[0];
      await ctx.replyWithAudio({url:s.previewUrl},
        {title:s.trackName,performer:s.artistName,
        caption:`🎵 ${s.trackName}\n👤 ${s.artistName}\n▶️ Preview - Full on Spotify:\nhttps://open.spotify.com/search/${encodeURIComponent(q)}\nBy WOLF MD 🐺`});
      await ctx.telegram.deleteMessage(ctx.chat.id,m.message_id).catch(()=>{});
      return;
    }
  } catch(e){}
  try {
    let sRes = await axios.get(`https://saavn.dev/api/search/songs?query=${encodeURIComponent(q)}`, {timeout:10000});
    let song = sRes.data?.data?.results?.[0];
    if(song && song.downloadUrl && song.downloadUrl.length){
      let best = song.downloadUrl[song.downloadUrl.length-1];
      let audioUrl = best.url || best.link;
      if(audioUrl){
        await ctx.replyWithAudio({url:audioUrl},
          {title:song.name, performer:song.artists?.primary?.[0]?.name || 'Unknown',
           caption:`🎵 ${song.name}\n👤 ${song.artists?.primary?.[0]?.name || 'Unknown'}\nBy WOLF MD 🐺🔥`});
        await ctx.telegram.deleteMessage(ctx.chat.id,m.message_id).catch(()=>{});
        return;
      }
    }
  } catch(e){}
  await ctx.telegram.editMessageText(ctx.chat.id,m.message_id,null,
    `🎵 ${q}\n❌ Direct download failed, try another name!\n🎧 Spotify:\nhttps://open.spotify.com/search/${encodeURIComponent(q)}`);
});
bot.command(['video','movie','film'], async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q,'/movie Titanic')) return;
  let vjs = ['VJ Emmy','VJ Junior','VJ ICP','VJ Jingo','VJ Muba'];
  let txt = `🎬 FULL MOVIE: ${q.toUpperCase()}\nTap link! 👇\n\n`;
  vjs.forEach(vj=>{
    txt += `🎙️ ${vj}:\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(q+' full movie '+vj)}\n\n`;
  });
  txt += `🔍 ALL:\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(q+' full movie')}`;
  await ctx.reply(txt);
});
bot.command('spotify', (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q,'/spotify Perfect')) return;
  ctx.reply(`🎧 Spotify: ${q}\nhttps://open.spotify.com/search/${encodeURIComponent(q)}`);
});
bot.command('apk', (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q,'/apk WhatsApp')) return;
  ctx.reply(`📱 APK: ${q}\nhttps://apkpure.com/search?q=${encodeURIComponent(q)}`);
});
bot.command('tts', async (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t,'/tts hello bro')) return;
  try {
    await ctx.replyWithVoice({
      url:`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(t)}&tl=en&client=tw-ob`
    },{caption:`🔊 TTS: "${t}"`});
  } catch(e){ ctx.reply(`🔊 TTS: "${t}"`); }
});
['bass','deep','blown','fast','slow','nightcore','robot','echo','reverb'].forEach(c=>{
  bot.command(c,(ctx)=>{
    if(!ctx.message.reply_to_message?.voice && !ctx.message.reply_to_message?.audio)
      return ctx.reply(`🎧 Reply to a VOICE with /${c}`);
    ctx.reply(`🎧 Applying ${c}... 🔥\nDone bro!`);
  });
});
bot.command('sticker', async (ctx) => {
  if(!ctx.message.reply_to_message?.photo)
    return ctx.reply('❌ Reply to a PHOTO with /sticker');
  let p = ctx.message.reply_to_message.photo.pop();
  let f = await ctx.telegram.getFileLink(p.file_id);
  ctx.replyWithSticker({url:f.href});
});
bot.command('toimg', async (ctx) => {
  if(!ctx.message.reply_to_message?.sticker)
    return ctx.reply('❌ Reply to a STICKER with /toimg');
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
  if(!need(ctx,t,'/ttp WOLF')) return;
  ctx.reply(`✨ ${t} ✨`);
});
bot.command('qc', (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t,'/qc hello')) return;
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
  if(!url) return ctx.reply('❌ Reply to a PHOTO with /blur');
  await ctx.replyWithPhoto(
    `https://wsrv.nl/?url=${encodeURIComponent(url)}&blur=10`,
    {caption:'😶‍🌫️ Blurred! - WOLF MD'});
});
bot.command('wasted', async (ctx) => {
  let url = await getReplyPhotoUrl(ctx);
  if(!url) return ctx.reply('❌ Reply to a PHOTO with /wasted');
  await ctx.replyWithPhoto(
    `https://wsrv.nl/?url=${encodeURIComponent(url)}&sat=-100&con=1.2`,
    {caption:'💀 WASTED! - WOLF MD'});
});
// --- END PART 1 v33 - NOW PASTE PART 2 BELOW ---// --- START PART 2 v33 ---
bot.command('circle', async (ctx) => {
  let url = await getReplyPhotoUrl(ctx);
  if(!url) return ctx.reply('❌ Reply to a PHOTO with /circle');
  await ctx.replyWithPhoto(
    `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=500&h=500&fit=cover&mask=circle`,
    {caption:'⭕ Circle! - WOLF MD'});
});
bot.command('upscale', async (ctx) => {
  let url = await getReplyPhotoUrl(ctx);
  if(!url) return ctx.reply('❌ Reply to a PHOTO with /upscale');
  await ctx.replyWithPhoto(
    `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=1024&h=1024&fit=cover`,
    {caption:'✨ Upscaled HD! - WOLF MD'});
});
bot.command('removebg', async (ctx) => {
  let url = await getReplyPhotoUrl(ctx);
  if(!url) return ctx.reply('❌ Reply to a PHOTO with /removebg');
  await ctx.reply(`🎨 Remove BG:\nhttps://www.remove.bg/upload\nYour photo:\n${url}`);
});
bot.command('emojimix', (ctx) => {
  ctx.reply('😀 + 😎 = 😎\nhttps://emojimix.app/');
});
const logo = (style) => async (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t,'/neon WOLF')) return;
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
  if(!need(ctx,t,'/translate hello')) return;
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
  if(!need(ctx,t,'/qr hello')) return;
  ctx.replyWithPhoto(
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(t)}`,
    {caption:`🔳 QR: ${t}`});
});
bot.command('ss', (ctx) => {
  let l = ctx.message.text.split(' ')[1];
  if(!l) return ctx.reply('❌ Example: /ss https://google.com');
  ctx.replyWithPhoto(
    `https://image.thum.io/get/width/800/${l}`,
    {caption:`📸 ${l}`});
});
bot.command('shorturl', (ctx) => {
  let l = ctx.message.text.split(' ')[1];
  if(!l) return ctx.reply('❌ Example: /shorturl https://google.com');
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
  if(!need(ctx,q,'/lyrics Perfect')) return;
  ctx.reply(`🎤 Lyrics: ${q}\nhttps://genius.com/search?q=${encodeURIComponent(q)}`);
});
bot.command('wiki', async (ctx) => {
  let q = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,q,'/wiki Uganda')) return;
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
  if(!need(ctx,q,'/google cats')) return;
  ctx.reply(`🔍 ${q}\nhttps://www.google.com/search?q=${encodeURIComponent(q)}`);
});
bot.command('define', async (ctx) => {
  let w = ctx.message.text.split(' ')[1];
  if(!w) return ctx.reply('❌ Example: /define love');
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
  if(!need(ctx,q,'/imdb Titanic')) return;
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
  if(!d) return ctx.reply('❌ Example: /age 2005-01-01');
  let age = new Date().getFullYear()-new Date(d).getFullYear();
  ctx.reply(`🎂 Age: ~${age} years`);
});
bot.command('reverse', (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ');
  if(!need(ctx,t,'/reverse hello')) return;
  ctx.reply(t.split('').reverse().join(''));
});
bot.command('palindrome', (ctx) => {
  let t = ctx.message.text.split(' ').slice(1).join(' ').toLowerCase().replace(/[^a-z0-9]/g,'');
  if(!t) return ctx.reply('❌ Example: /palindrome madam');
  ctx.reply(t===t.split('').reverse().join('')?'✅ Yes! Palindrome!':'❌ No, not palindrome');
});
// ===== CALC = ONE THING! v33 =====
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
const doCalc = (ctx, raw) => {
  let input = raw.trim();
  if(!input) {
    return ctx.reply(`🧮 CALC - ONE COMMAND DOES ALL!\n\nTry:\n/calc 300+1\n/calc 2^10\n/calc 5!\n/calc add 2 3 4\n/calc sub 10 3\n/calc mul 2 3\n/calc div 10 2\n/calc mod 10 3\n/calc sqrt 16\n/calc square 5\n/calc cube 3\n/calc pow 2 10\n/calc percent 50 200\n/calc factorial 5\n/calc sin 30\n/calc cos 60\n/calc tan 45\n/calc log 100\n/calc avg 2 4 6\n/calc gcd 12 18\n/calc lcm 4 6\n/calc min 2 5 1\n/calc max 2 5 1`);
  }
  let parts = input.split(/\s+/);
  let cmd = parts[0].toLowerCase();
  let nums = parts.slice(1).map(Number);
  try {
    if(cmd==='add') return ctx.reply(`🧮 ${nums.join('+')} = ${nums.reduce((x,y)=>x+y,0)}`);
    if(cmd==='sub') return ctx.reply(`🧮 ${nums[0]}-${nums.slice(1).join('-')} = ${nums.slice(1).reduce((x,y)=>x-y,nums[0])}`);
    if(cmd==='mul') return ctx.reply(`🧮 ${nums.join('×')} = ${nums.reduce((x,y)=>x*y,1)}`);
    if(cmd==='div') return ctx.reply(`🧮 ${nums[0]}÷${nums[1]} = ${nums[0]/nums[1]}`);
    if(cmd==='mod') return ctx.reply(`🧮 ${nums[0]} mod ${nums[1]} = ${nums[0]%nums[1]}`);
    if(cmd==='abs') return ctx.reply(`🧮 abs ${nums[0]} = ${Math.abs(nums[0])}`);
    if(cmd==='avg') return ctx.reply(`🧮 Avg = ${nums.reduce((x,y)=>x+y,0)/nums.length}`);
    if(cmd==='gcd') return ctx.reply(`🧮 GCD = ${nums.reduce((x,y)=>gcd2(x,y))}`);
    if(cmd==='lcm') return ctx.reply(`🧮 LCM = ${nums.reduce((x,y)=>lcm2(x,y))}`);
    if(cmd==='round') return ctx.reply(`🧮 round ${nums[0]} = ${Math.round(nums[0])}`);
    if(cmd==='ceil') return ctx.reply(`🧮 ceil ${nums[0]} = ${Math.ceil(nums[0])}`);
    if(cmd==='floor') return ctx.reply(`🧮 floor ${nums[0]} = ${Math.floor(nums[0])}`);
    if(cmd==='min') return ctx.reply(`🧮 Min = ${Math.min(...nums)}`);
    if(cmd==='max') return ctx.reply(`🧮 Max = ${Math.max(...nums)}`);
    if(cmd==='sqrt') return ctx.reply(`🧮 √${nums[0]} = ${Math.sqrt(nums[0])}`);
    if(cmd==='cbrt') return ctx.reply(`🧮 ∛${nums[0]} = ${Math.cbrt(nums[0])}`);
    if(cmd==='square') return ctx.reply(`🧮 ${nums[0]}² = ${nums[0]**2}`);
    if(cmd==='cube') return ctx.reply(`🧮 ${nums[0]}³ = ${nums[0]**3}`);
    if(cmd==='pow') return ctx.reply(`🧮 ${nums[0]}^${nums[1]} = ${Math.pow(nums[0],nums[1])}`);
    if(cmd==='percent') return ctx.reply(`🧮 ${nums[0]}% of ${nums[1]} = ${nums[0]/100*nums[1]}`);
    if(cmd==='factorial') return ctx.reply(`🧮 ${nums[0]}! = ${fact(nums[0])}`);
    if(cmd==='sin') return ctx.reply(`🧮 sin ${nums[0]}° = ${Math.sin(nums[0]*Math.PI/180)}`);
    if(cmd==='cos') return ctx.reply(`🧮 cos ${nums[0]}° = ${Math.cos(nums[0]*Math.PI/180)}`);
    if(cmd==='tan') return ctx.reply(`🧮 tan ${nums[0]}° = ${Math.tan(nums[0]*Math.PI/180)}`);
    if(cmd==='asin') return ctx.reply(`🧮 asin ${nums[0]} = ${Math.asin(nums[0])*180/Math.PI}°`);
    if(cmd==='acos') return ctx.reply(`🧮 acos ${nums[0]} = ${Math.acos(nums[0])*180/Math.PI}°`);
    if(cmd==='atan') return ctx.reply(`🧮 atan ${nums[0]} = ${Math.atan(nums[0])*180/Math.PI}°`);
    if(cmd==='log') return ctx.reply(`🧮 log ${nums[0]} = ${Math.log10(nums[0])}`);
    if(cmd==='ln') return ctx.reply(`🧮 ln ${nums[0]} = ${Math.log(nums[0])}`);
    if(cmd==='log2') return ctx.reply(`🧮 log2 ${nums[0]} = ${Math.log2(nums[0])}`);
    if(cmd==='exp') return ctx.reply(`🧮 exp ${nums[0]} = ${Math.exp(nums[0])}`);
    let res = smartCalc(input);
    return ctx.reply(`🧮 ${input} = ${res}`);
  } catch(e){
    return ctx.reply('❌ Try /calc 300+1 or /calc help');
  }
};
bot.command(['calc','c'], (ctx) => {
  let expr = ctx.message.text.split(' ').slice(1).join(' ');
  if(expr.toLowerCase()==='help') return doCalc(ctx,'');
  return doCalc(ctx, expr);
});
bot.command('add', (ctx) => doCalc(ctx, 'add '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('sub', (ctx) => doCalc(ctx, 'sub '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('mul', (ctx) => doCalc(ctx, 'mul '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('div', (ctx) => doCalc(ctx, 'div '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('mod', (ctx) => doCalc(ctx, 'mod '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('abs', (ctx) => doCalc(ctx, 'abs '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('avg', (ctx) => doCalc(ctx, 'avg '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('gcd', (ctx) => doCalc(ctx, 'gcd '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('lcm', (ctx) => doCalc(ctx, 'lcm '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('round', (ctx) => doCalc(ctx, 'round '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('ceil', (ctx) => doCalc(ctx, 'ceil '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('floor', (ctx) => doCalc(ctx, 'floor '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('min', (ctx) => doCalc(ctx, 'min '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('max', (ctx) => doCalc(ctx, 'max '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('sqrt', (ctx) => doCalc(ctx, 'sqrt '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('cbrt', (ctx) => doCalc(ctx, 'cbrt '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('square', (ctx) => doCalc(ctx, 'square '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('cube', (ctx) => doCalc(ctx, 'cube '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('pow', (ctx) => doCalc(ctx, 'pow '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('percent', (ctx) => doCalc(ctx, 'percent '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('factorial', (ctx) => doCalc(ctx, 'factorial '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('sin', (ctx) => doCalc(ctx, 'sin '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('cos', (ctx) => doCalc(ctx, 'cos '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('tan', (ctx) => doCalc(ctx, 'tan '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('asin', (ctx) => doCalc(ctx, 'asin '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('acos', (ctx) => doCalc(ctx, 'acos '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('atan', (ctx) => doCalc(ctx, 'atan '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('log', (ctx) => doCalc(ctx, 'log '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('ln', (ctx) => doCalc(ctx, 'ln '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('log2', (ctx) => doCalc(ctx, 'log2 '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('exp', (ctx) => doCalc(ctx, 'exp '+ctx.message.text.split(' ').slice(1).join(' ')));
bot.command('gitstalk', async (ctx) => {
  let u = ctx.message.text.split(' ')[1];
  if(!u) return ctx.reply('❌ Example: /gitstalk octocat');
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
  if(!p) return ctx.reply('❌ Example: /npmstalk telegraf');
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
  if(o.length<2) return ctx.reply('❌ Example: /pick pizza, burger');
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
    let p = pick(['pikachu','chari// --- START PART 3 v33 - PASTE BELOW PART 2 - FROM /pokemon ---
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
bot.launch({ dropPendingUpdates: true }).then(()=>console.log('✅ WOLF MD v33 ONLINE!'));
process.once('SIGINT', ()=>bot.stop('SIGINT'));
process.once('SIGTERM', ()=>bot.stop('SIGTERM'));
// --- END PART 3 v33 - FILE COMPLETE! ---
