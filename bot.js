const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🐺 WOLF MD IS BACK! 🔥\n\nWelcome boss! I am online and working!\n\nSend /menu to see commands');
});

bot.command('menu', (ctx) => {
  ctx.reply('🐺 WOLF MD MENU\n\n/start - Start bot\n/menu - Show menu\n/ping - Check if alive\n/help - Help');
});

bot.command('ping', (ctx) => {
  ctx.reply('🏓 Pong! WOLF MD is alive! ✅');
});

bot.command('help', (ctx) => {
  ctx.reply('Send /menu to see what I can do!');
});

bot.launch({ dropPendingUpdates: true }).then(() => {
  console.log('✅ WOLF MD IS ONLINE!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
