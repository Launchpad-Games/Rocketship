const Economy = require("../schemas/EconomySchema.js");
const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {

        const eco = await Economy.findById(member.user.id).exec();

        if (eco._id == null) {
            Economy.create({
                _id: member.user.id,
                username: member.user.tag,
                level: 0,
                credits: 0,
                xp: 0
            });

            console.log("new user created")
        }
    },
};