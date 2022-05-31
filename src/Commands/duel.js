const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: "duel",
    description: "Duel another user to determine who has more swag",

    async run(message, args, client){
        if(args[1] == null){
            message.reply("Please mention someone in the first argument of the command.")
        }
    }
})