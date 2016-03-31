/*-----------------------------------------------------------------------------
An awful hello world bot for slack
-----------------------------------------------------------------------------*/

var Botkit = require('botkit');
var builder = require('../');

if (!process.env.token) {
    console.log('Error: Slack token not specified in environment variables!');
    process.exit(1);
}

var controller = Botkit.slackbot();
var bot = controller.spawn({
   token: process.env.token
});

var slackBot = new builder.SlackBot(controller, bot);
slackBot.add('/', function (session) {
	console.log(session.message);
	if (/(hi|hello|sup|howdy|hey)/.test(session.message.text)) {
		session.send('hello human'); 
	} else if (session.message.text == 'how are you?') {
		session.send('go fuck yourself'); 
	}
});
	
slackBot.listenForMentions();

bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});
