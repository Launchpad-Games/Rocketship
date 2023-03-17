const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('Roll the dice')
        .addIntegerOption(option =>
		option.setName('category')
			.setRequired(true)
            .setDescription("The type of the dice")
			.addChoices(
				{ name: 'D4', value: 4 },
				{ name: 'D6 (Standard)', value: 6 },
				{ name: 'D8', value: 8 },
                { name: 'D10', value: 10 },
                { name: 'D12', value: 12 },
                { name: 'D20', value: 20 })
            ),
    async execute(interaction) {
        const category = interaction.options.getInteger('category');
        const result = Math.floor(Math.random() * category) + 1
        await interaction.reply('You rolled `'+ result +'`');
    },
};