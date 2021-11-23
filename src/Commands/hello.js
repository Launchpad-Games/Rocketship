const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: "hello",
    description: "Say hello to Rocketship!",

    async run(message, args, client){
        message.reply(`Hello ${message.author.username}!`)
    }
})