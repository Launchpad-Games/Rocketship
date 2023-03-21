const { Events } = require('discord.js');
// const cooldowns = new Map();
// const Economy = require("../schemas/EconomySchema.js");

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        if(message.author.bot) {return;}

        if(message.content.toLowerCase().includes("grappleshot release date")){
            message.reply("https://imgur.com/a/RcwGw4R")
        }
    
        message.reply("test")
        

        // console.log("1")
        // const now = Date.now();
        // const cooldownAmount = 60000; // 60 seconds
        // console.log("2")
        // if (cooldowns.has(message.author.id)) {
        //     console.log("3")
        //     const cooldownEnd = cooldowns.get(message.author.id) + cooldownAmount;
        //     if (now < cooldownEnd) {
        //         console.log("4")
        //         const timeLeft = (cooldownEnd - now) / 1000;
        //         message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds before running this command again.`);
        //         return;
        //     }
        // }

        // console.log("done")

        // cooldowns.set(message.author.id, now);
    },
};