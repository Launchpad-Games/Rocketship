const { Events } = require('discord.js');
const cooldowns = new Map();
const Economy = require("../schemas/EconomySchema.js");

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if(message.author.bot) {return;}

        if(message.content.toLowerCase().includes("grappleshot release date")){
            message.reply("https://imgur.com/a/RcwGw4R")
        }   

        const now = Date.now();
        const cooldownAmount = 60000;
        if (cooldowns.has(message.author.id)) {
            const cooldownEnd = cooldowns.get(message.author.id) + cooldownAmount;
            if (now < cooldownEnd) {
                const timeLeft = (cooldownEnd - now) / 1000;
                // console.log(`Please wait ${timeLeft.toFixed(1)} more seconds before running this command again.`);
                return;
            }
        }

        const eco = await Economy.findById(message.author.id).exec();
        eco.messages += 1;
        eco.credits += Math.floor(Math.random()*10);

        await eco.save();

        cooldowns.set(message.author.id, now);
    },
};