const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '7523069007:AAGHPYcue2Hl8MsFSt0aLEsMs06YYrBFx_c';
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello! I am your bot.');
});
