const { SlashCommandBuilder } = require('discord.js');
const Economy = require("../../schemas/EconomySchema.js");

module.exports = {
    data: new SlashCommandBuilder()
		.setName('addmongodoc')
		.setDescription('Test for adding levels with mongoDB'),
    async execute(interaction) {
        await Economy.create({
            _id: interaction.user.id,
            username: interaction.user.tag,
            level: 0,
            credits: 0,
            xp: 0
        });
        
        await interaction.reply('Done!');
    },
};