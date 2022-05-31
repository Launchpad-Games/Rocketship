const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: "rolldice",
    description: "SPINNNNNNNNNNNNN THE WHEEEEELLLLLLL!!!!!!!",

    async run(message, args, client){
        message.reply(`You rolled a ${Math.floor(Math.random() * 6) + 1}!`)
    }
})