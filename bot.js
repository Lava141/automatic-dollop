const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready",  message => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log('Rex Tracker Bot has started sucessfully'); 
});

client.on('message', message => {
    if (message.content === '!help') {
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "This is an embed",
    url: "http://google.com",
    description: "This is a test embed to showcase what they look like and what they can do.",
    fields: [{
        name: "Fields",
        value: "They can have different fields with small headlines."
      },
      {
        name: "Masked links",
        value: "You can put [masked links](http://google.com) inside of rich embeds."
      },
      {
        name: "Markdown",
        value: "You can put all the *usual* **__Markdown__** inside of them."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Example"
    }
  }
});
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
