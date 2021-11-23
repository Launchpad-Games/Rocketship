const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "ping",
    description: "Shows latency of the bot, also useful for checking if its operational.",

    async run(message, args, client){
        const msg = await message.reply(`Pong! :ping_pong: \nBot Latency: ${client.ws.ping} ms.\nMessage Latency: pinging...`);

        msg.edit(`Pong! :ping_pong: \nBot Latency: ${client.ws.ping} ms.\nMessage Latency: ${msg.createdTimestamp - message.createdTimestamp} ms.`)
    }
});