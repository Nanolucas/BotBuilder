/*-----------------------------------------------------------------------------
An awful hello world bot for slack
-----------------------------------------------------------------------------*/

var Botkit = require('botkit');
var builder = require('../');
var bot_name = 'nano';

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
	slackBot.handle(session, session.message);
});

slackBot.handle = function(session, message) {
	var named_call = false,
		named_call_regex = new RegExp("^@?" + bot_name + " (.*)", "i");

	if (message.channelData.event == 'direct_message' || named_call_regex.test(message.text)) {
		named_call = true;
		console.log('NAMED CALL');
		message.text = message.text.replace(named_call_regex, "$1");
	}

	console.log(message.text);
	if (named_call) {
		if (named_call && /(hi|hello|sup|howdy|hey)/.test(message.text)) {
			session.send('hello human');
		} else if (/\w\s.+/i.test(message.text)) {
			var potential_module = message.text.replace(/(\w+)\s.+/i, "$1"),
				potential_command = message.text.replace(/\w+\s(.+)/i, "$1"),
				fs = require('fs');

				console.log('module: ' + potential_module);
				console.log('command: ' + potential_command);
			try {
				fs.accessSync('./modules/' + potential_module + '.js', fs.F_OK);

				console.log("Module '" + potential_module + "' exists");
				
				try {
					var nanomodule = require('./modules/' + potential_module + '.js');
					
					console.log("Module '" + potential_module + "' loaded");
					
					try {
						var nanomodule_instance = new nanomodule();
						
						var result = nanomodule_instance.run(potential_command);
						
						if (result) {
							session.send(result);
						}
					} catch (e) {
						console.log("Error: Something broke in module '" + potential_module + "'. \nMessage: " + e);
					}
				} catch (e) {
					console.log("Error: Module '" + potential_module + "' could not be loaded");
				}
			} catch (e) {
				console.log("Error: File './modules/" + potential_module + ".js' not found");
			}
		}

		return;
	}

	if (/(how are you\??)/.test(message.text)) {
		session.send('go fuck yourself');
	}
}

slackBot.listenForMentions();

bot.startRTM(function(err,bot,payload) {
	if (err) {
		throw new Error('Could not connect to Slack');
	}
});
