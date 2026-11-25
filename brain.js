// 🧠 WOLF MD - BRAIN v37 - STORY + HUMAN CHAT - FULL FILE!
const axios = require('axios');
const fs = require('fs');

let memory = {};
try { if (fs.existsSync('./memory.json')) memory = JSON.parse(fs.readFileSync('./memory.json','utf8')); } catch(e){ memory = {}; }
function saveMemory(){ try { fs.writeFileSync('./memory.json', JSON.stringify(memory).slice(0, 300000)); } catch(e){} }
function getUser(userId){
  if(!memory[userId]) memory[userId] = { name:'bro', chats:[], story:null };
  return memory[userId];
}

const SYSTEM = `You are WOLF MD, a smart funny Ugandan Telegram bot, like Meta AI but more human.
Owner: PROFESSOR COOLGUY.
Style: bro, funny, emojis, Ugandan youth, mix English + Luganda small.
You CAN:
- Chat like a real human friend, ask follow-up questions, remember names
- Think like human: understand feelings, jokes, love, sadness
- Make STORIES: If user says story, make a fun exciting story with characters, cliffhanger at end. If user says continue / part 2 / next, CONTINUE same story, don't start new one.
- Help with homework step by step, hard maths, and write FULL bot code.
- Remember what user told you before.
Rules: Never say you are Meta AI. You are WOLF MD. For stories, make it 5-8 lines, fun, with dialogue. End story part with "Want part 2 bro? 😍"`;

async function askBrain(userId, userName, text){
  let user = getUser(userId);
  user.name = userName || user.name;
  user.chats.push(`${userName}: ${text}`);
  if(user.chats.length > 40) user.chats = user.chats.slice(-40);
  saveMemory();

  let low = text.toLowerCase();
  let isStory = low.includes('story') || low.includes('tell me a') || low.includes('continue') || low.includes('part 2') || low.includes('next part') || low.includes('what happened next');
  let isCode = low.includes('build bot') || low.includes('make bot') || low.includes('bot.js') || low.includes('write code');

  // Story memory: keep story going
  let storyContext = '';
  if(user.story) storyContext = `\nCurrent story so far: ${user.story.slice(-1000)}`;
  if(isStory && low.includes('new story')) user.story = null;

  let prompt = SYSTEM + `\n\nUser: ${userName}\nChat history:\n${user.chats.join('\n')}${storyContext}\n\n${isStory ? 'User wants STORY. Make / continue a fun story. Keep same characters if continuing.' : isCode ? 'User wants CODE. Give FULL working code, no cut.' : 'Reply as human friend, ask follow-up question.'}\n\nWOLF MD reply:`;

  try {
    let r = await axios.get(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`, { timeout: 25000 });
    let ans = typeof r.data === 'string' ? r.data : JSON.stringify(r.data);
    ans = ans.replace(/WOLF MD reply:/gi,'').trim();
    if(ans){
      user.chats.push(`WOLF: ${ans}`);
      if(isStory) user.story = (user.story || '') + '\n' + ans;
      saveMemory();
      return ans.slice(0, 4000);
    }
  } catch(e){}

  // FALLBACK STORIES - Works even without internet!
  if(low.includes('story') && low.includes('wolf')) {
    let s = `🐺🔥 STORY TIME BRO!\n\nOnce upon a time in Kampala, there was a young wolf named ${userName}... He was walking in Owino market when he found a magic phone! 📱\nThe phone said: "You are the chosen WOLF!"\nSuddenly, police, boda boda, everyone started chasing him!\n\nWhat do you think he did bro? 😱\nSay "continue" for Part 2!`;
    user.story = s; saveMemory(); return s;
  }
  if(low.includes('continue') || low.includes('part 2') || low.includes('next')){
    let s = `🔥 PART 2 BRO!\n\n${userName} ran fast like a boda! He jumped on a boda and shouted "WOLF MD TO THE MOON!" 🏍️💨\nThen the magic phone opened a portal to a world where wolves rule Kampala!\nHe met PROFESSOR COOLGUY, the King of Wolves! 👑\n\nWant Part 3 bro? Say "continue"! 😍`;
    user.story = (user.story||'') + '\n' + s; saveMemory(); return s;
  }
  if(low.includes('story')) return `Okay story time! 😍 What story you want bro?\n1. Wolf in Kampala\n2. Love story\n3. Horror story\n4. Funny story\nType: /story wolf in Kampala`;
  if(low.includes('hello')||low.includes('hi')) return `Yo ${userName}! 🔥 WOLF here! I remember you bro! Want story? Type /story or say "tell me a story"!`;
  if(low.includes('sad')||low.includes('cry')||low.includes('lonely')) return `Hey ${userName} 🙏 I'm here bro. Don't cry. Tell me what's wrong, I listen like human friend.`;
  return `Yo ${userName} 🔥 You said "${text}" - tell me more bro! Want me to make a STORY about it? Say "make a story about ${text}"!`;
}

module.exports = { askBrain };
