const { SlashCommandBuilder } = require('discord.js');
const Economy = require("../schemas/EconomySchema.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('finddoc')
        .setDescription('testing'),
    async execute(interaction) {
        const eco = await Economy.findById('573248130389114880').exec();

        if (eco) {
            await interaction.reply(`username: ${eco.username}\nlevel: ${eco.level}\ncredits: ${eco.credits}\nxp: ${eco.xp}`);
        }
    }
};  
