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

	/*warn : warn mentionned user on actual server with optionnal reason
	* Arguments : name of the user to warn, (optionnal) reason
	* TODO : only mods or higher should be allowed to warn . do nothing if someone try to warn not a mod or higher
	* TODO : if silent, delete command as soon as bot detect it
	*/
	'warn': (message) => {


		var canUserexecute = false;
		if (message.member.roles.filter(r=>r.hasPermission('ADMINISTRATOR')).size > 0) {
			canUserexecute = true;
		}else{
			var args = {
				"discord_id": "" + message.author.id + "",
				"serverID": "" + message.guild.id + "",
			}
			connection.query("SELECT FROM mods WHERE ?", args,function(error, rows, fields) {
				if (error) {
					console.log(error);
					return;
				}
				if (rows.length > 0) {
					canUserexecute = true;
				}
			})
		}
		

		if (canUserexecute) {
			const mentionedUser = message.mentions.users.first();
			let  args = message.content.split(mentionedUser).slice(1);
			message.reply("Warned " + mentionedUser + ".\nHis ID is: " + mentionedUser.id + " you can use this on the bot's website to check if the user has any warns")
			mentionedUser.sendMessage("You got warned by Warnbot \nOn server " + message.guild.name + " by " + message.author.username + "\nReason : " + args.join(" "))
			console.log('[C] ' + message.author.username + ' Warned ' + message.mentions.users.first() + ' On ' + message.guild.name)
			var queryargs = {
				"user": "" + message.author.id + "",
				"discord_id": "" + message.mentions.users.first().id + "",
				"reason": "" + args.join(" ") + "",
				"serverID": "" + message.guild.id + "",
			}

			connection.query("INSERT INTO warns SET ?", queryargs, function(error) {
				if (error) {
					console.log(error);
					return;
				}
			})
		}
	}

		//shoud look like this (not sure) if silent
		//message.delete();
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
	/*checkwarnings : return the list of warnings of mentionned user on actual server (where this command is executed)
	* Arguments : name of the user to check
	* TODO : no argument = check myself.
	* TODO : only mods or higher should be allowed to watch other user warnings. do nothing if someone try to see warning of another and not a mod or higher
	* TODO : if silent, delete command as soon as bot detect it
	*/
	'checkwarning': (message) => {	

		var canUserexecute = false;
		if (message.member.roles.filter(r=>r.hasPermission('ADMINISTRATOR')).size > 0) {
			canUserexecute = true;
		}else{
			var args = {
				"discord_id": "" + message.author.id + "",
				"serverID": "" + message.guild.id + "",
			}
			connection.query("SELECT FROM mods WHERE ?", args,function(error, rows, fields) {
				if (error) {
					console.log(error);
					return;
				}
				if (rows.length > 0) {
					canUserexecute = true;
				}
			})
		}
		

		if (canUserexecute) {
			const mentionedUser = message.mentions.users.first();
			var queryargs = {
				"discord_id": "" + mentionedUser.id + "",
				"serverID": "" + message.guild.id + "",
			}
			connection.query("SELECT FROM warns WHERE ?", queryargs,function(error, rows, fields) {
				if (error) {
					console.log(error);
					return;
				}
				mentionedUser.sendMessage("Warnings on server "+ message.guild.name +" : "+rows.length)
				for (var i in rows) {
					mentionedUser.sendMessage(rows[i].post_title);
				}
			})
		};
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
