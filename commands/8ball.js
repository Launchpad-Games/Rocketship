const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Decides your fate :)'),
    async execute(interaction) {
        const ballresponses = ["Doubt level is 11/10", "Better not tell you hehehe", "Probably i guess", "Very likely", "y e s", "n o", "Your outlook is like a drinking straw, meaning it sucks", "GrappleShot has a higher chance of coming out than the answer being yes","If you like cats...","Answer Hazy, ask Wesley","wet dog"];
        await interaction.reply(ballresponses[(Math.floor(Math.random() * 9))]);
    },
};