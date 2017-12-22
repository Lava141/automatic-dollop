const Discord = require('discord.js');
const client = new Discord.Client();
const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;


client.on("ready",  () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log('Rex Tracker Bot has started sucessfully'); 
  client.user.setGame('GAME HERE');
});

client.on('message', message => {
    if (message.content === '!update-game') {
    	message.channel.send(":ballot_box_with_check: Rex Tracker game update sucessfully!");
      client.user.setGame('Rex Tracker');
  	}
});

client.on('message', message => {
    if (message.content === '!help') {
message.channel.send({embed: {
    color: 3447003,
    description: "Here are all the commands you can execute!",
    fields: [{
        name: "!help",
        value: "Displays all commands"
      },
      {
        name: "!new-update",
        value: "Notify went new updates arrive!"
      },
      {
        name: "!hello",
        value: "A fun command, try it!"
      },
      {
        name: "!rex-connection",
        value: "Test the php Rex Tracker API connection!"
      },
      {
        name: "!rex-tracker-version",
        value: "Get the current rex tracker version!"
      },
      {
        name: "!force-ads",
        value: "Forces rex tracker to display ads"
      },
      {
        name: "!start-ads",
        value: "Start timer to display ads"
      }
    ],
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
    if (message.content === '!rex-tracker-version') {
      //START
var http = require('http');

var options = {
    host: 'rex-tracker.wcksoft.com',
    path: '//version.php'
}
var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        message.channel.send("The current Rex Tracker version is " + data);
    });
});
request.on('error', function (e) {
    message.channel.send(":x: " + e.message);
});
request.end();
      //END
  	}
});

client.on('message', message => {
    if (message.content === '!new-update') {
      if(message.author === "Blackrock") {
        message.channel.send(":x: Failed to get data from http://rex-tracker.wcksoft.com");        
      } else {
        message.channel.send(":x: You are not allowed to run this command! Action will be logged!");
        console.log('User message.author tryed to execute !new-update')
      }
  	}
});

client.on('message', message => {
    if (message.content === '!premium') {
        message.channel.send(":x: Failed to get data from http://rex-tracker.wcksoft.com");
        message.reply(":x: Unable to set your rank to premium");
  	}
});

client.on('message', message => {
    if (message.content === 'Rex Tracker is not working') {
    	message.channel.send('You are maybe using ipv6, we will fix this issue shortly before release!'); 
  	}
});

client.on('message', message => {
    if(message.content === "Rex Tracker isnt working") {
      message.channel.send('You are maybe using ipv6, we will fix this issue shortly before release!'); 
    }
});

client.on('message', message => {
    if(message.content === "What is Rex Tracker?") {
      message.channel.send('Rex Tracker is a Taming Calculator / ARK Toolkit with many features!'); 
    }
});

client.on('message', message => {
    if(message.content.contains == "new update!") {
      message.channel.send("A new update? I'm excited!!"); 
    }
});

const embed = new Discord.RichEmbed()
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setImage("https://imgur.com/OTmgcgj.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
  .addField("[Ads] Rex Tracker",
    "Do you know about Rex Tracker? Its the brand new taming calculator / Ark Toolkit! http://rex-tracker.wcksoft.com")
  /*
   * Blank field, useful to create some space.
   */
  .addField("Join Our Discord!", "https://discord.gg/RzbJZyF", true);


client.on('message', message => {
    if (message.content === "!start-ads") { 
       message.channel.send(":ballot_box_with_check: Rex Tracker Ad's started sucessfully!");
      var interval = setInterval ( () => {
       message.channel.send({embed});
      }, 1 * 1800000); //30 MINS
    }
});

client.on('message', message => {
    if (message.content === "!force-ads") {
      message.delete();
      message.channel.send({embed});
    }
});

client.on("message", message => {
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    clbot.write(message.content, (response) => {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.send(response.output).catch(console.error);
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
    });
    message.channel.send("Please do not disturb me!")
    message.channel.send({embed});
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
