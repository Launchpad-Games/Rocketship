const Discord = require('discord.js');
const Command = require('../Structures/Command.js');
const fs = require("fs");

module.exports = new Command({
    name: "help",
    description: "Get help with the bot.",

    async run(message, args, client){
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setDescription("Learn how to use Rocketship! Prefix is >\nCurrent: v1.1.2")
            .setColor("#a914ff")
            .setThumbnail("https://cdn.discordapp.com/attachments/780618724952113162/981053549364527214/rocketship.png")
            .setTimestamp()
            .setURL("https://launchpad-games.com")
            
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