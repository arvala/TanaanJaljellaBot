/*var TelegramBot = require('node-telegram-bot-api');
var token = '383782709:AAHxEVtykKhYv9hmLaO_phPGDVlxY26k6jo';
var bot = new TelegramBot(token, {polling: true});
*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const {message} = req.body
  res.send('<html><body><h1>message sent</h1></body></html>');

/*bot.onText(/\/tj/, function(msg, match) {
  var fromId = msg.from.id;
  var morningsleft = "vitusti aamuja jäljellä";
  bot.sendMessage(fromId, morningsleft);
});
*/
  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

 // if (!message || message.text.toLowerCase().indexOf('marco') <0) {
    // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
 //   return res.end()
 // }

  // If we've gotten this far, it means that we have received a message containing the word "marco".
  // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
  // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
  axios.post('https://api.telegram.org/bot383782709:AAHxEVtykKhYv9hmLaO_phPGDVlxY26k6jo/sendMessage', {
    chat_id: message.chat.id,
    text: 'Polo!!'
  })
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })

});
app.get('/', function (req, res) {

    res.send('<html><body><h1>Flagon</h1></body></html>');

});

app.get('/test', function (req, res) {

    res.send('<html><body><h1>TEST</h1></body></html>');

});

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!');
});
