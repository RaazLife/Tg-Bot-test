// Import the required modules
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Use the token from the .env file
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses 'webhook' to fetch new updates
const bot = new TelegramBot(token);

// Base URL for the mini web app
const miniWebAppUrl = "https://your-mini-web-app.com"; // Replace with your actual URL

// URL for the greeting image (Python logo)
const greetingImageUrl = "https://www.python.org/static/img/python-logo.png";

// Listen for the '/start' command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name || 'User'; // Get the user's first name

    // Generate a referral link (customize as needed)
    const referralLink = `https://your-referral-site.com/referral?userId=${msg.from.id}`;

    // Create buttons with web app link and referral link
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open Mini Web App', url: miniWebAppUrl }],
                [{ text: 'Get Referral Link', url: referralLink }]
            ]
        }
    };

    // Send the greeting image first
    bot.sendPhoto(chatId, greetingImageUrl, { caption: `Hi ${username}, welcome to our bot! Please choose an option:` })
        .then(() => {
            // Send the buttons after the image
            bot.sendMessage(chatId, 'Please choose an option:', options);
        });
});

// Listen for any incoming messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(`Received message: ${msg.text} from chatId: ${chatId}`); // Log incoming messages
    bot.sendMessage(chatId, 'You said: ' + msg.text);
});

// Handle button clicks (for additional interaction if needed)
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const option = query.data;

    bot.sendMessage(chatId, `You selected: ${option}`);
});

// For Vercel deployment, export as a serverless function
module.exports = (req, res) => {
    if (req.method === 'POST') {
        const update = req.body;
        bot.processUpdate(update);
        res.status(200).send('OK');
    } else {
        res.status(200).send('Hello from Vercel!');
    }
};
