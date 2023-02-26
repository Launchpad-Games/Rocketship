const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        if(message.author.bot)
            return;

        if(message.content.toLowerCase().includes("grappleshot release date")){
            message.reply("https://imgur.com/a/RcwGw4R")
        }
    },
};