var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on("message", msg => {
  let prefix = "w!";
  if(!msg.content.startsWith(prefix)) return;

  if (msg.content.startsWith(prefix + "ping")) {
    msg.channel.sendMessage("pong!");
  } 
  
  if (msg.content.startsWith(prefix + "warn")) {
    msg.reply("Warned" + msg.mentions.first());
  } 
});

bot.on("guildCreate", function(server) {
  console.log("[i] I have been added to " + server.name + " Server, the owner's id is " + server.owner.user.id);
  server.defaultChannel.sendMessage("Hello, I'm WarnBot, I'm here to warn people, need help? Use w!help");
})

bot.on('ready', () => {
    console.log(`Ready to server in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.login("token");
