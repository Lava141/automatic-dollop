module.exports = {
  main: (bot, msg, settings) => {
	if (msg.author.id == bot.OWNERID) {
		bot.sendNotification(":white_check_mark: Sucessfully restarted Rex Tracker!", "success", msg);
	} else {
		bot.sendNotification(":x: You are not allowed to join the server!", "error", msg);
	}
  },
  args: '<string>',
  help: 'Say ',
  hide: false
}
