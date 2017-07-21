const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '383782709:AAHxEVtykKhYv9hmLaO_phPGDVlxY26k6jo';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)

}

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/tj/, (msg) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const dateToday = Date.now(); // the captured "whatever"
  const dateOfFreedom = new Date(2017, 06, 30);
  const daysLeft = days_between(dateToday, dateOfFreedom);
  const resp = "Jullella on vielä " + daysLeft + " aamua jäljellä kotiutuakseen";
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});