const Command = require('../../Structures/Command.js');
const Discord = require('discord.js');

module.exports = new Command({
    name: "kick",
    description: "kick a very sus person from the server",

    async run(message, args, client){
        const reason = args[2] || "No reason provided."

        if (!message.member.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS)){
            const errorEmbed = new Discord.MessageEmbed()
                .setTitle("Missing permission")
                .setColor("#fc0f13")
                .setDescription("Something went wrong.")
                .setThumbnail("https://cdn.discordapp.com/attachments/773631079428653099/912805399802028082/rocketship.png")
                .setTimestamp()
                .addField("Missing Permission:", "You do not have permission to do this!")

            message.reply({embeds: [errorEmbed]})
            return;
        }
        
        if(args[1] == undefined){
            const errorEmbed = new Discord.MessageEmbed()
                .setTitle("Error")
                .setColor("#fc0f13")
                .setDescription("Something went wrong.")
                .setThumbnail("https://cdn.discordapp.com/attachments/773631079428653099/912805399802028082/rocketship.png")
                .setTimestamp()
                .addField("Missing field:", "Please add a user ID or mention")

            message.reply({embeds: [errorEmbed]})
            return;
        }

        let userID = args[1].includes('<@!') ? args[1].replace('<@!', '').replace('>', '')
          : args[1].includes('<@') ? args[1].replace('<@', '').replace('<', '').replace('&', '').replace('>', '') : '';


        message.guild.members.fetch(userID).then(member => {
            member.kick("From " + message.author.tag + ". Reason: " + reason).then(m => {
                const successEmbed = new Discord.MessageEmbed()
                    .setTitle("User Kicked")
                    .setColor("#0ffc52")
                    .setThumbnail("https://cdn.discordapp.com/attachments/773631079428653099/912805399802028082/rocketship.png")
                    .setTimestamp()
                    .addField("Successfully kicked user", "<@" + userID + "> for ")
                
                message.reply({embeds: [successEmbed]});
            }).catch((err) => {
                const errorEmbed = new Discord.MessageEmbed()
                .setTitle("Error")
                .setColor("#fc0f13")
                .setDescription("Something went wrong.")
                .setThumbnail("https://cdn.discordapp.com/attachments/773631079428653099/912805399802028082/rocketship.png")
                .setTimestamp()
                .addField("Could not kick that member.", err+" ")

            message.reply({embeds: [errorEmbed]})
            });
        }).catch((err) => {
            const errorEmbed = new Discord.MessageEmbed()
                .setTitle("Error")
                .setColor("#fc0f13")
                .setDescription("Something went wrong.")
                .setThumbnail("https://cdn.discordapp.com/attachments/773631079428653099/912805399802028082/rocketship.png")
                .setTimestamp()
                .addField("Error:", err+" ")

            message.reply({embeds: [errorEmbed]})
        });
    }
})