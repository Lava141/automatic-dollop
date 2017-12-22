module.exports = {
  main: (bot, msg, settings) => {
	bot.sendNotification("You do not have permission to use this command.", "error", msg);
  },
  args: '<string>',
  help: 'Restart Rex Tracker',
  hide: false
}
