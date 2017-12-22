module.exports = {
  main: (bot, msg, settings) => {
	if (msg.author.id == bot.OWNERID) {
		bot.sendNotification(":white_check_mark: Sucessfully restarted Rex Tracker!", "success", msg);
	} else {
		bot.sendNotification(":x: You do not have permission to use this command.", "error", msg);
	}
  },
  args: '<string>',
  help: 'Restart Rex Tracker',
  hide: false
}
