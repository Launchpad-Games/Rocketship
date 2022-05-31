const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: "8ball",
    description: "like >diceroll but cooler",

    async run(message, args, client){
        const ballresponses = ["Doubt level is 11/10", "Better not tell you hehehe", "Probably i guess", "Very likely", "y e s", "n o", "Your outlook is like a drinking straw, meaning it sucks", "GrappleShot has a higher chance of coming out than the answer being yes","If you like cats..."];
        message.reply(ballresponses[(Math.floor(Math.random() * 9))]);
    }
})