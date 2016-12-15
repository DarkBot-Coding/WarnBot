<<<<<<< .mine
// Don't edit anything from here, it makes the bot work
var Discord = require("discord.js");
var bot = new Discord.Client();
const mysql = require('mysql');
var config = require('./config.json')
var sql = require('./sql.json')
//You can edit stuff below

//This is the MySQL Connection stuff, configurated on sql.json
var connection = mysql.createConnection({
  host: sql.host,
  user: sql.user,
  password: sql.password,
  database: sql.database
});

connection.connect();

//Commands
const commands = {
'warn': (message) => {
  const mentionedUser = message.mentions.users.first();
  let  args = message.content.split(mentionedUser).slice(1);
  message.reply("Warned " + message.mentions.users.first() + "test " + message.mentions.users.first().id)
  mentionedUser.sendMessage("You got warned on server " + message.guild.name + " by the user with KICK_MEMBERS permissions named " + message.author.username + " with reason\n" + args.join(" "))
  console.log('[C] ' + message.author.username + ' Warned ' + message.mentions.users.first() + ' On ' + message.guild.name)
  var warn = {
    "user": "" + message.author.username + "",
    "discord_id": "" + message.mentions.users.first().id + "",
    "reason": "" + args.join(" ") + "",
  }

  connection.query("INSERT INTO warns SET ?", warn, function(error) {
    if (error) {
      console.log(error);
      return;
    }
  })
},
'eval': (message) => {
  if(!message.author.id === config.admin_id) return;
  let  args = message.content.split(" ").slice(1);
  function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
const params = message.content.split(" ").slice(1);
const command = args.shift().slice(config.prefix.length);

  try {
    var code = params.join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.sendCode("xl", clean(evaled));
  } catch(err) {
    message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
}
};

bot.on("message", message => {
  if (!message.content.startsWith(config.prefix)) return;
  if (commands.hasOwnProperty(message.content.toLowerCase().slice(config.prefix.length).split(' ')[0])) commands[message.content.toLowerCase().slice(config.prefix.length).split(' ')[0]](message);
});

bot.on('ready', () => {
  console.log(`This means the bot is online \n Hello world :)`);
});


bot.login(config.bot_token);
||||||| .r3
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
=======
// Don't edit anything from here, it makes the bot work
var Discord = require("discord.js");
var bot = new Discord.Client();
const mysql = require('mysql');
var config = require('./config.json')
var sql = require('./sql.json')
//You can edit stuff below

//This is the MySQL Connection stuff, configurated on sql.json
var connection = mysql.createConnection({
  host: sql.host,
  user: sql.user,
  password: sql.password,
  database: sql.database
});

connection.connect();

//Commands
const commands = {
'warn': (message) => {
  const mentionedUser = message.mentions.users.first();
  let  args = message.content.split(mentionedUser).slice(1);
  message.reply("Warned " + message.mentions.users.first() + "test " + message.mentions.users.first().id)
  mentionedUser.sendMessage("You got warned on server " + message.guild.name + " by the user with KICK_MEMBERS permissions named " + message.author.username + " with reason\n" + args.join(" "))
  console.log('[C] ' + message.author.username + ' Warned ' + message.mentions.users.first() + ' On ' + message.guild.name)
  var warn = {
    "user": "" + message.author.username + "",
    "discord_id": "" + message.mentions.users.first().id + "",
    "reason": "" + args.join(" ") + "",
  }

  connection.query("INSERT INTO warns SET ?", warn, function(error) {
    if (error) {
      console.log(error);
      return;
    }
  })
},
'eval': (message) => {
  if(!message.author.id === config.admin_id) return;
  let  args = message.content.split(" ").slice(1);
  function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
const params = message.content.split(" ").slice(1);
const command = args.shift().slice(config.prefix.length);

  try {
    var code = params.join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.sendCode("xl", clean(evaled));
  } catch(err) {
    message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
},
};

bot.on("message", message => {
  if (!message.content.startsWith(config.prefix)) return;
  if (commands.hasOwnProperty(message.content.toLowerCase().slice(config.prefix.length).split(' ')[0])) commands[message.content.toLowerCase().slice(config.prefix.length).split(' ')[0]](message);
});

bot.on('ready', () => {
  console.log(`This means the bot is online \n Hello world :)`);
});


bot.login(config.bot_token);
>>>>>>> .r5
