/** @format */

const Event = require("../Structures/Event.js");
const fs = require("fs");
const path = require("path");
const { MessageAttachment } = require("discord.js");

module.exports = new Event("messageCreate", (client, message) => {
	if (message.author.bot) return;

	try{
		if(message.mentions.members.has('573248130389114880') || message.mentions.members.has('423625542722387969')){
			if(!message.member.permissions.has('MENTION_EVERYONE')){
				message.channel.send(`<@${message.author.id}> Please Don't Ping Developers! <a:petMax:956028370968264758> <a:petLuka:956028370959888404>`);
				// message.delete();
				message.member.timeout(45 * 1000, "Pinged Dev")
				return message.channel.send;
			}
		}
	}catch (err) {}

	const messageToCheck = message.content.toLowerCase();
	result = messageToCheck.includes("grappleshot release date");
	if(result){
		message.reply("https://imgur.com/a/RcwGw4R");
	}

	if (!message.content.startsWith(client.prefix)) return;

	const args = message.content.substring(client.prefix.length).split(/ +/);

	const command = client.commands.find(cmd => cmd.name == args[0]);

	if (!command) return;

	command.run(message, args, client);

});
