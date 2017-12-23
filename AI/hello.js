module.exports = {
  main: (bot, msg, settings) => {
	if (msg.author.id == bot.OWNERID) {
		bot.sendNotification("Hello!", "success", msg);
	}
  },
  args: '<string>',
  help: '',
  hide: false
}
