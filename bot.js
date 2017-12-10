const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready",  message => {
  // This event will run if the bot starts, and logs in, successfully.
  client.user.setGame('Rex Tracker');
  console.log('Rex Tracker Bot has started sucessfully'); 
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
        name: "!play [URL]",
        value: "Play music from youtube"
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
    path: '/version.php'
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
    if(message.content === "!play") {
      message.channel.send('An Error Occured'); 
    }
});

client.on('message', message => {
    if(message.content.includes("!rex")) {
      message.channel.send('***[Ads]*** Do you know about Rex Tracker? Its the brand new taming calculator / Ark Toolkit! http://rex-tracker.wcksoft.com'); 
    }
});

client.on('message', message => {
    if(message.content.includes("!REX")) {
      message.channel.send('***[Ads]*** Do you know about Rex Tracker? Its the brand new taming calculator / Ark Toolkit! http://rex-tracker.wcksoft.com'); 
    }
});

client.on('message', message => {
    if (message.content === "!start-ads") { 
      var interval = setInterval ( () => {
        message.channel.send('***[Ads]*** Do you know about Rex Tracker? Its the brand new taming calculator / Ark Toolkit! http://rex-tracker.wcksoft.com');
      }, 1 * 600000); 
    }
});





client.on("message", message => {
  if (message.channel.type === "dm") {
    if (message.author !== client.user) return;
    message.channel.send('Dont direct message me please!'); 
  }
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
