const Discord = require('discord.js');
const Command = require('../Structures/Command.js');
const fs = require("fs");

module.exports = new Command({
    name: "help",
    description: "Get help with the bot.",

    async run(message, args, client){
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setDescription("Learn how to use Rocketship! Prefix is >")
            .setColor("#4e06dd")
            .setThumbnail("https://cdn.discordapp.com/attachments/841823625081520188/899434624231563274/databasebot.png")
            .setTimestamp()
            .setURL("https://maxb0tbeep.github.io/databasebotsite/")

            fs.readdirSync("./src/Commands")
			    .filter(file => file.endsWith(".js"))
			    .forEach(file => {
                    /**
                     * @type {Command}
                     */
                    const command = require(`../Commands/${file}`);
                    helpEmbed.addField(command.name, command.description, true);
		    });

        
        message.reply({embeds: [helpEmbed]});
    }

    
})