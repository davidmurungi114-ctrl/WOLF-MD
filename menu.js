// WOLF MD - MENU - ORIGINAL STYLE - v13
function getMenuText() {
  const date = new Date().toLocaleString("en-GB", { timeZone: "Africa/Kampala" });
  const up = process.uptime();
  const h = Math.floor(up/3600), m = Math.floor((up%3600)/60), s = Math.floor(up%60);
  return `*WOLF MD*
👑 Owner: *WOLF*
🛠️ Created By: *PROFESSOR COOLGUY*
🕐 *${date}*
⏱️ Uptime: *${h}h ${m}m ${s}s*
📶 Ping: *Fast*
🔖 Version: *v13.0.0*
📚 Commands: *150+*
💎 *Free Bot By WOLF*

╔═══════════════╗
  👑 *OWNER*
╠───────────────╣
║ ➣ */owner*
║ ➣ */contact*
║ ➣ */ping*
║ ➣ */alive*
║ ➣ */runtime*
║ ➣ */repo*
╚═══════════════╝

╔═══════════════╗
  👥 *GROUP*
╠───────────────╣
║ ➣ */tagall*
║ ➣ */hidetag*
║ ➣ */tagadmins*
║ ➣ */welcome*
║ ➣ */goodbye*
║ ➣ */groupinfo*
║ ➣ */staff*
║ ➣ */rules*
║ ➣ */afk*
║ ➣ */couple*
║ ➣ */online*
╚═══════════════╝

╔═══════════════╗
  🤖 *AI*
╠───────────────╣
║ ➣ */ai <question>*
║ ➣ */gpt <question>*
║ ➣ */qwen <question>*
║ ➣ */imagine <text>*
║ ➣ */flux <text>*
║ ➣ */dalle <text>*
║ ➣ */toanime*
║ ➣ */ghibli*
║ ➣ */tocartoon*
║ ➣ */topixar*
╚═══════════════╝

╔═══════════════╗
  📥 *DOWNLOADER*
╠───────────────╣
║ ➣ */play <name>*
║ ➣ */song <name>*
║ ➣ */music <name>*
║ ➣ */video <name>*
║ ➣ */movie <name>*
║ ➣ */tiktok <link>*
║ ➣ */instagram <link>*
║ ➣ */facebook <link>*
║ ➣ */pinterest <search>*
║ ➣ */spotify <name>*
║ ➣ */apk <name>*
║ ➣ */gitclone <link>*
║ ➣ */mediafire <link>*
╚═══════════════╝

╔═══════════════╗
  🎚️ *AUDIO*
╠───────────────╣
║ ➣ */tts <text>*
║ ➣ */bass*
║ ➣ */deep*
║ ➣ */blown*
║ ➣ */fast*
║ ➣ */slow*
║ ➣ */nightcore*
║ ➣ */robot*
║ ➣ */echo*
║ ➣ */reverb*
╚═══════════════╝

╔═══════════════╗
  🎨 *CONVERTER*
╠───────────────╣
║ ➣ */sticker*
║ ➣ */toimg*
║ ➣ */removebg*
║ ➣ */upscale*
║ ➣ */attp <text>*
║ ➣ */qc <text>*
║ ➣ */emojimix*
║ ➣ */blur*
║ ➣ */meme*
║ ➣ */getpp*
║ ➣ */wasted*
║ ➣ */circle*
║ ➣ */ttp <text>*
║ ➣ */brat <text>*
╚═══════════════╝

╔═══════════════╗
  🔤 *LOGO MAKER*
╠───────────────╣
║ ➣ */fancy <text>*
║ ➣ */gfx <text>*
║ ➣ */neon <text>*
║ ➣ */metallic <text>*
║ ➣ */fire <text>*
║ ➣ */glitch <text>*
║ ➣ */thunder <text>*
║ ➣ */hacker <text>*
║ ➣ */marvel <text>*
║ ➣ */avenger <text>*
╚═══════════════╝

╔═══════════════╗
  🛠️ *TOOLS*
╠───────────────╣
║ ➣ */ss <link>*
║ ➣ */translate <text>*
║ ➣ */qr <text>*
║ ➣ */readqr*
║ ➣ */shorturl <link>*
║ ➣ */calculator*
║ ➣ */calc <math>*
║ ➣ */weather <city>*
║ ➣ */lyrics <song>*
║ ➣ */currency*
║ ➣ */crypto*
║ ➣ */age <date>*
║ ➣ */reverse <text>*
║ ➣ */case <text>*
║ ➣ */palindrome <text>*
║ ➣ */wiki <search>*
║ ➣ */google <search>*
║ ➣ */image <search>*
║ ➣ */define <word>*
║ ➣ */imdb <movie>*
║ ➣ */horo <sign>*
║ ➣ */quran*
║ ➣ */prayertime <city>*
╚═══════════════╝

╔═══════════════╗
  🧮 *CALCULATOR*
╠───────────────╣
║ ➣ */calc <math>*
║ ➣ */add 5 3*
║ ➣ */sub 10 4*
║ ➣ */mul 5 2*
║ ➣ */div 10 2*
║ ➣ */sqrt 16*
║ ➣ */cube 3*
║ ➣ */square 5*
║ ➣ */pow 2 8*
║ ➣ */percent 10 200*
║ ➣ */factorial 5*
║ ➣ */sin 60*
║ ➣ */cos 60*
║ ➣ */tan 45*
║ ➣ */log 100*
║ ➣ */ln 10*
╚═══════════════╝

╔═══════════════╗
  🕵️ *STALK*
╠───────────────╣
║ ➣ */gitstalk <user>*
║ ➣ */npmstalk <pkg>*
║ ➣ */tgstalk <user>*
║ ➣ */ttstalk <user>*
║ ➣ */xstalk <user>*
╚═══════════════╝

╔═══════════════╗
  🎮 *GAMES*
╠───────────────╣
║ ➣ */trivia*
║ ➣ */riddle*
║ ➣ */truth*
║ ➣ */dare*
║ ➣ */wyr*
║ ➣ */rps*
║ ➣ */slots*
║ ➣ */8ball <q>*
║ ➣ */dice*
║ ➣ */coin*
║ ➣ */random*
║ ➣ */pick*
║ ➣ */guess*
╚═══════════════╝

╔═══════════════╗
  🎯 *FUN*
╠───────────────╣
║ ➣ */joke*
║ ➣ */fact*
║ ➣ */quote*
║ ➣ */compliment*
║ ➣ */insult*
║ ➣ */roast*
║ ➣ */flirt*
║ ➣ */ship*
║ ➣ */stupid*
║ ➣ */shayari*
║ ➣ */goodnight*
║ ➣ */iloveyou*
║ ➣ */couplepp*
║ ➣ */handsome*
║ ➣ */pretty*
║ ➣ */waifu*
╚═══════════════╝

╔═══════════════╗
  🌸 *ANIME*
╠───────────────╣
║ ➣ */pokemon*
║ ➣ */animepic*
║ ➣ */animewall*
║ ➣ */wallpaper*
║ ➣ */animenews*
╚═══════════════╝

╔══════════════════╗
        *ABOUT US*
╠──────────────────╣
  *WOLF MD - Telegram Bot* 🔥🐺
  Creator: *PROFESSOR COOLGUY* 👑
  Owner: *WOLF*
  Don't panic to be burnt!
  Thanks For Using WOLF MD 🙏
╚══════════════════╝`;
}
module.exports = { getMenuText };
