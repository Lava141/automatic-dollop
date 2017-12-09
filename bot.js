const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready",  message => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log('Rex Tracker Bot has started sucessfully'); 
  message.channel.send("I have been updated to a newer version!");
});

client.on('message', message => {
    if (message.content === '!help') {
      message.channel.send("Here are all the commands you can execute");
      message.channel.send("***!help :*** Displays all commands);
      message.channel.send("***!new-update :*** Notify's the new update arrival);
  	}
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

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
