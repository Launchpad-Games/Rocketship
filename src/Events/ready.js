const Event = require("../Structures/Event.js");
const Client = require("../Structures/Client.js");
const client = new Client();
const config = require("../Data/config.json");

module.exports = new Event("ready", (client) =>{
    function RefreshServerCount() {
        setTimeout(function() {
            if (true) {
                RefreshServerCount();
                serverAmount = client.guilds.cache.size;
                client.user.setActivity(`GrappleShot on itch.io`, {type : "PLAYING"});
            }
        }, 3000)
    }
    RefreshServerCount();
    console.log(`${client.user.tag} is online!`)
});