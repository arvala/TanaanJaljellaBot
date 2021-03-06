const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

// replace the value below with the Telegram token you receive from @BotFather
const token = '383782709:AAHxEVtykKhYv9hmLaO_phPGDVlxY26k6jo';


/*
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
*/

// Create a bot that uses 'webhook' to fetch new updates
const url = 'https://arvala.eu';
const bot = new TelegramBot(token);
const port = 3001;

bot.setWebHook(`${url}/bot${token}`);

const app = express();

// parse the updates to JSON
app.use(bodyParser.json());

// We are receiving updates at the route below!
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24
    console.log("date1: "+moment(date1).format());
    console.log("date2: "+moment(date2).format());

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1 - date2);
    console.log(difference_ms);
    // Convert back to days and return
    return Math.ceil(difference_ms/ONE_DAY)

}
//function not used since bot is used to track another person
function name_the_frenchie(){
  var names = ["Gaubusseau", "Gobi", "Gobysov", "Kaupassa", "FransmanNI", "Ranskis", "Gaubussuauau", "Ranska", "Gubi", "Kopisoi", "Gaubusssööö", "Käpysoppa", "Kubussi", "Goblin", "Goobysoo", "Bisseau", "Gobuzie", "Gabuzie"];
  var chosenName = names[Math.floor(Math.random() * names.length)];
  return chosenName;

}

// returns the amount of days left before going home on 19.12.2019. Responds to command /tj
bot.onText(/\/tj/, (msg) => {

  const chatId = msg.chat.id;
  const dateToday = moment();
  var dateOfFreedom = new Date(2019, 11, 19, 5, 45); //January is index 0
      dateOfFreedom = moment(dateOfFreedom);
  const daysLeft = days_between(dateToday, dateOfFreedom);
  const resp = "Tänään jäljellä " + daysLeft + " aamua!";
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/arvo/, (msg) => {

  const chatId = msg.chat.id;
  const rank = "jääkäri";
  const surname = "Jarkko";
  const resp = "Leena tunnetaan nimellä " + rank + " " + surname;
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
/*
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
*/
// Matches "/echo [whatever]"
/*
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
*/
bot.on('webhook_error', (error) => {
  console.log(error.code);  // => 'EPARSE'
});
