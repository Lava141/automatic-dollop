module.exports = {
  main: (bot, msg, settings) => {
	if (msg.author.id == bot.OWNERID) {
		bot.message.channel.send(args);
	} else {
    bot.message.channel.send(args);
		bot.sendNotification(":x: You are not allowed to use this command!", "error", msg);
	}
  },
  args: '<string>',
  help: 'Say ',
  hide: false
}
