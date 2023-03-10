const { SlashCommandBuilder } = require('discord.js');
const Economy = require("../schemas/EconomySchema.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('refresh')
        .setDescription('refreshes user IDs'),
    async execute(interaction) {
        const client = interaction.client;
        const guild = client.guilds.cache.get('679115824878977035');

        let userIds = [];
        (await guild.members.fetch()).forEach(member => {
            userIds.push(member.id);
        });
        
        for (i in userIds) {
            const user = await client.users.cache.get(userIds[i]);

            await Economy.create({
                _id: userIds[i],
                username: user.tag,
                level: 0,
                credits: 0,
                xp: 0
            });
        }
        await interaction.reply('Done!');
    },
};
