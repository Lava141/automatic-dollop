"use strict";

var Discord = require("discord.js");
var fs = require('fs');

var bot = new Discord.Client({autoReconnect: true});

bot.OWNERID = '174635229829529600';
bot.PREFIX = '!';
bot.TOKEN = 'NDQ5MjQ5MjcwMDgwNjAyMTIz.Deh74g.8VLVVLjsNeXTgq1KbTj69a6E-HE';

bot.DETAILED_LOGGING = false;
bot.DELETE_COMMANDS = false;

bot.COLOR = 0x00AE86;
bot.SUCCESS_COLOR = 0x00796B;
bot.ERROR_COLOR = 0xC62828;
bot.INFO_COLOR = 0x03A9F4;

String.prototype.padRight = function(l,c) {return this+Array(l-this.length+1).join(c||" ")}

bot.sendNotification = function(info, type, msg) {
	var icolor;
	
	if(type == "success") icolor = bot.SUCCESS_COLOR;
	else if(type == "error") icolor = bot.ERROR_COLOR;
	else if(type == "info") icolor = bot.INFO_COLOR;
	else icolor = bot.COLOR;
	
	let embed = {
		color: icolor,
		description: info
	}
	msg.channel.sendMessage('', {embed});
}

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});


var commands = {}

commands.help = {};
commands.help.args = '';
commands.help.help = "Displays a list of usable commands.";
commands.help.main = function(bot, msg) {
    var cmds = [];
	
	for (let command in commands) {
        if (!commands[command].hide) {
			cmds.push({
				name: bot.PREFIX + command,
				value: commands[command].help,
				inline: true
			});
        }
    }
	
	let embed = {
		color: bot.COLOR,
		description: "Here are a list of commands you can use.",
		fields: cmds,
		footer: {
			icon_url: bot.user.avatarURL,
			text: bot.user.username
		}
	}
	
	msg.channel.sendMessage('', {embed});
}

commands.load = {};
commands.load.args = '<command>';
commands.load.help = '';
commands.load.hide = true;
commands.load.main = function(bot, msg) {
    if(msg.author.id == bot.OWNERID) {
		try {
			delete commands[msg.content];
			delete require.cache[__dirname+'/commands/'+ msg.content +'.js'];
			commands[msg.content] = require(__dirname+'/commands/'+ msg.content +'.js');
			bot.sendNotification("Loaded " + msg.content + ".js succesfully.", "success", msg);
		} catch(err) {
			bot.sendNotification("The command was not found, or there was an error loading it.", "error", msg);
		}
    }else {
		bot.sendNotification("You do not have permission to use this command.", "error", msg);
	}
}

commands.unload = {};
commands.unload.args = '<command>';
commands.unload.help = '';
commands.unload.hide = true;
commands.unload.main = function(bot, msg) {
    if (msg.author.id == bot.OWNERID){
        try {
            delete commands[msg.content];
            delete require.cache[__dirname+'/commands/' + msg.content + '.js'];
            bot.sendNotification("Unloaded " + msg.content + ".js succesfully.", "success", msg);
        }
        catch(err){
			bot.sendNotification("Command not found.", "error", msg);
        }
    }else {
		bot.sendNotification("You do not have permission to use this command.", "error", msg);
	}
}

commands.reload = {};
commands.reload.args = '';
commands.reload.help = '';
commands.reload.hide = true;
commands.reload.main = function(bot, msg) {
    if (msg.author.id == bot.OWNERID){
        try {
            delete commands[msg.content];
            delete require.cache[__dirname+'/commands/' + msg.content +'.js'];
            commands[args] = require(__dirname+'/commands/' + msg.content +'.js');
            bot.sendNotification("Reloaded " + msg.content + ".js successfully.", "success", msg);
        }
        catch(err){
            msg.channel.sendMessage("Command not found");
        }
    }else {
		bot.sendNotification("You do not have permission to use this command.", "error", msg);
	}
}

var loadCommands = function() {
    var files = fs.readdirSync(__dirname+'/commands');
    for (let file of files) {
        if (file.endsWith('.js')) {
            commands[file.slice(0, -3)] = require(__dirname+'/commands/'+file);
			if(bot.DETAILED_LOGGING) console.log("Loaded " + file);
        }
    }
    console.log("———— All Commands Loaded! ————");
}

var checkCommand = function(msg, isMention) {
	if(isMention) {
		var command = msg.content.split(" ")[1];
		msg.content = msg.content.split(" ").splice(2, msg.content.split(' ').length).join(' ');
		if(command) commands[command].main(bot, msg);
	}else {
		var command = msg.content.split(bot.PREFIX)[1].split(" ")[0];
		msg.content = msg.content.replace(bot.PREFIX + command + " ", "");
		if(command) commands[command].main(bot, msg);
	}
}



bot.on("ready", () => {
    console.log('Ready to begin! Serving in ' + bot.guilds.array().length + ' servers.');
    bot.user.setStatus("online", "");
    bot.user.setGame("ARK: Survival Evolved")
    loadCommands();
});

bot.on("message", msg => {
    if(msg.content.startsWith('<@'+bot.user.id+'>') || msg.content.startsWith('<@!'+bot.user.id+'>')) {
		checkCommand(msg, true);
		if(bot.DELETE_COMMANDS) msg.delete();
    }else if (msg.content.startsWith(bot.PREFIX)) {
		checkCommand(msg, false);
		if(bot.DELETE_COMMANDS) msg.delete();
    }
});

bot.on('error', (err) => {
    console.log("————— BIG ERROR —————");
    console.log(err);
    console.log("——— END BIG ERROR ———");
});

bot.on("disconnected", () => {
	console.log("Disconnected!");
});

bot.login(process.env.BOT_TOKEN);
