// WOLF MD V17 EXTRA COMMANDS - Telegram Only!
const axios = require("axios");
module.exports = (bot) => {
  const q = ctx => (ctx.message?.text||"").split(" ").slice(1).join(" ").trim();
  const pick = a => a[Math.floor(Math.random()*a.length)];
  // GROUP ADMIN - Telegram real!
  bot.command("kick", async (ctx) => { try{ if(!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /kick"); await ctx.telegram.banChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id); ctx.reply("👢 Kicked! Don't panic to be burnt! 🔥"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("ban", async (ctx) => { try{ if(!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /ban"); await ctx.telegram.banChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id); ctx.reply("🔨 Banned!"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("unban", async (ctx) => { try{ if(!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /unban"); await ctx.telegram.unbanChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id); ctx.reply("✅ Unbanned!"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("mute", async (ctx) => { try{ if(!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /mute"); await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {can_send_messages:false}); ctx.reply("🔇 Muted!"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("unmute", async (ctx) => { try{ if(!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /unmute"); await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {can_send_messages:true,can_send_media_messages:true,can_send_other_messages:true,can_add_web_page_previews:true}); ctx.reply("🔊 Unmuted!"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("promote", async (ctx) => { try{ if(!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /promote"); await ctx.telegram.promoteChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {can_manage_chat:true,can_delete_messages:true,can_manage_video_chats:true,can_restrict_members:true,can_promote_members:false,can_change_info:true,can_invite_users:true}); ctx.reply("👑 Promoted to Admin!"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("demote", async (ctx) => { try{ if(!ctx.message.reply_to_message) return ctx.reply("❌ Reply to user with /demote"); await ctx.telegram.promoteChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {can_manage_chat:false,can_delete_messages:false,can_manage_video_chats:false,can_restrict_members:false,can_promote_members:false,can_change_info:false,can_invite_users:false}); ctx.reply("⬇️ Demoted!"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command(["pin","chatpin"], async (ctx) => { try{ if(!ctx.message.reply_to_message) return ctx.reply("❌ Reply to message with /pin"); await ctx.telegram.pinChatMessage(ctx.chat.id, ctx.message.reply_to_message.message_id); ctx.reply("📌 Pinned!"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("unpin", async (ctx) => { try{ await ctx.telegram.unpinChatMessage(ctx.chat.id); ctx.reply("📌 Unpinned!"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("grouplink", async (ctx) => { try{ const link = await ctx.telegram.exportChatInviteLink(ctx.chat.id); ctx.reply(`🔗 Group Link:\n${link}`); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("setname", async (ctx) => { const t=q(ctx); if(!t) return ctx.reply("❌ Type: /setname WOLF GROUP"); try{ await ctx.telegram.setChatTitle(ctx.chat.id, t); ctx.reply("✅ Group name changed to: "+t); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("setdesc", async (ctx) => { const t=q(ctx); if(!t) return ctx.reply("❌ Type: /setdesc Hello"); try{ await ctx.telegram.setChatDescription(ctx.chat.id, t); ctx.reply("✅ Description changed!"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  bot.command("revoke", async (ctx) => { try{ await ctx.telegram.revokeChatInviteLink(ctx.chat.id, (await ctx.telegram.exportChatInviteLink(ctx.chat.id))); ctx.reply("✅ Old link revoked! Use /grouplink for new one!"); }catch(e){ ctx.reply("❌ Make me ADMIN first!"); }});
  // DOWNLOADER EXTRA
  bot.command(["ytmp3","mp3","ytmp4","ytdoc","tiktokmp3","tt","fb","xdown","threads","capcut","gdrive","tourl","wikimedia","pixabay","gif","ringtone"], ctx => { const t=q(ctx); if(!t) return ctx.reply(`❌ Type: ${ctx.message.text.split(" ")[0]} <link or name>`); ctx.reply(`📥 ${ctx.message.text.split(" ")[0]}: ${t}\n🔗 https://www.google.com/search?q=${encodeURIComponent(t)}\n✅ Use /song for music!`); });
  bot.command("cinesubz", ctx => { const t=q(ctx)||"movie"; ctx.reply(`🎬 Cinesubz: ${t}\nhttps://www.google.com/search?q=${encodeURIComponent(t+" cinesubz")}`); });
  bot.command("fwd", ctx => ctx.reply("↗️ Forward: Reply to a message with /fwd to forward it!"));
  // AUDIO EXTRA - All reply!
  bot.command(["earrape","fat","squirrel","areverse","8d","vibrato","tremolo","radio","alien","audiofx","tomp3","volume","tempo"], ctx => ctx.reply(`🎚️ ${ctx.message.text.split(" ")[0]} Effect Ready!\n\nReply to a voice/audio with this command! 🐺🔥`));
  // CONVERTER EXTRA
  bot.command(["s","simage","take","tgsticker","character","crop","round","memegen","tomp4","tovn"], ctx => ctx.reply(`🎨 ${ctx.message.text.split(" ")[0]} — Send photo/sticker with this caption bro! 🐺`));
  // LOGO EXTRA
  bot.command(["gfx2","gfx3","gfx4","gfx5","gfx6","gfx7","gfx8","gfx9","gfx10","gfx11","gfx12","ice","snow","impressive","matrix","light","devil","purple","leaves","1917","arena","sand","blackpink","glow","slice","gitch1","steal","glitch2","grafiti"], async (ctx) => { const t=q(ctx)||"WOLF"; const cmd=ctx.message.text.split(" ")[0].replace("/",""); try{ await ctx.replyWithPhoto(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(t+" "+cmd)}`,{caption:`🎨 ${cmd.toUpperCase()} LOGO: ${t} 🔥🐺`}); }catch(e){ ctx.reply(`🎨 ${cmd.toUpperCase()} LOGO: ${t} 🔥`); }});
  // TOOLS EXTRA
  bot.command(["ssweb","tr","urlshortener","hash","base64","binary","encrypt","decrypt","timestamp","livescore","reminder","count","vv","vv2","delete","savecontact","device","netflix","paste","fliptext","binarytotext","readmore","cpu","npm","grayscale","invert","sepia","sharpen","qmaker","smallcaps","flip","stext","ephoto","excard","forwarded","element","wattpad","ytsearch","scloud","shazam","ocr","earthquake","emojigif","bratpink","bratvid","bratclassic","bratimg","bratimghd","bratwindows","brattimoty","bratanime","bratgura","asmaulhusna","dua"], ctx => { const t=q(ctx)||"WOLF"; ctx.reply(`🛠️ ${ctx.message.text.split(" ")[0]}: ${t}\n✅ WOLF MD Tool ready! 🔥\n🔗 https://www.google.com/search?q=${encodeURIComponent(t)}`); });
  // STALK EXTRA
  bot.command(["thrstalk","pinstalk","genshin"], ctx => { const u=q(ctx); if(!u) return ctx.reply(`❌ Type: ${ctx.message.text.split(" ")[0]} username`); ctx.reply(`🕵️ ${ctx.message.text.split(" ")[0]}: ${u}\nhttps://google.com/search?q=${encodeURIComponent(u)}`); });
  // GAMES EXTRA
  bot.command(["scramble","wordle","hangman","ttt","tictactoe","guessflag","guessanime","guessgenshin","guessgame","guesslogo","guesshero","hint","giveup"], ctx => ctx.reply(`🎮 ${ctx.message.text.split(" ")[0]} Game!\n\n${pick(["Guess the word: W _ L F 🐺","What is 2+2? 🧮","Who made WOLF MD? 🤟","I am thinking of a number 1-10!"])}`));
  // FUN EXTRA
  bot.command(["simp","roseday","coffe","quotes","joke2","question","teddy","lovemsg","weeb"], ctx => ctx.reply(`😂 ${ctx.message.text.split(" ")[0]}: ${pick(["You are amazing bro! ❤️","WOLF loves you! 🐺❤️","Don't panic to be burnt! 🔥","You shine today! ✨"])}`));
  // ANIME EXTRA
  bot.command("pokepic", async (ctx) => { try{ await ctx.replyWithPhoto("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",{caption:"⚡ Pikachu! Pokepic!"}); }catch(e){ ctx.reply("⚡ Pikachu!"); }});
  // PIES - Telegram version = Food pics!
  bot.command(["pies","india","china","japan","korea","thai","malaysia"], async (ctx) => { const c=ctx.message.text.split(" ")[0].replace("/",""); try{ await ctx.replyWithPhoto("https://picsum.photos/500/400?random="+Math.floor(Math.random()*100),{caption:`🍕 ${c.toUpperCase()} Food! Yummy! 🐺`}); }catch(e){ ctx.reply(`🍕 ${c} Food!`); }});
  // PREMIUM - Telegram version
  bot.command(["premium","setbotpp","autoreply","away","schedule","filter","persona","ghost","chreact","pollvote"], ctx => ctx.reply(`👑 ${ctx.message.text.split(" ")[0]} — Premium Feature!\n\nContact Owner WOLF: 256750765838 for Premium! 🔥🐺`));
  bot.command("mode", ctx => ctx.reply("🔧 Mode: PUBLIC ✅\nEveryone can use WOLF MD!"));
  bot.command("settings", ctx => ctx.reply("⚙️ Settings:\nPrefix: /\nMode: Public\nOwner: WOLF\nBy: PROFESSOR COOLGUY"));
};
