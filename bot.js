const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
    message.reply('I have been updated to a new version!');
});

client.on('message', message => {
    if (message.content === '!hello') {
    	message.reply('Hello, my name is Rex Tracker and i will respond to all your questions and notify you went new updates arrive!');
  	}
});

client.on('message', message => {
    if (message.content === 'What is the most recent update?') {
    	message.reply('The current update is : v{{ $current_update }}');
  	}
});

client.on 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
