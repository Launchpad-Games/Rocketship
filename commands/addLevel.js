const { SlashCommandBuilder } = require('discord.js');
const Level = require("../schemas/LevelSchema.js");

module.exports = {
    data: new SlashCommandBuilder()
		.setName('addlevel')
		.setDescription('Test for adding levels with mongoDB'),
    async execute(interaction) {
        await Level.create({
            username: interaction.user.tag,
            userId: interaction.user.id,
            level: 0
        });

        await interaction.reply('Done!');
    },
};