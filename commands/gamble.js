const { SlashCommandBuilder, channelLink } = require('discord.js');
const Economy = require("../schemas/EconomySchema.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('gamble')
		.setDescription('gamble your credits')
        .addIntegerOption(amount => 
            amount.setName("amount")
              .setRequired(true)
              .setDescription("amount you want to gamble")
            ),
    async execute(interaction) {
        const amount = interaction.options.getInteger("amount");

        const economyDocs = await Economy.find().sort({ credits: -1 }).exec();
        const economyMap = new Map(economyDocs.map(doc => [doc._id, doc]));

        const credits = economyMap.get(interaction.user.id)?.credits || 0;

        if(amount / 2 > credits){
            await interaction.reply({content: `You can't gamble more than you have`, ephemeral: true});
            return;
        }

        const roll = Math.floor(Math.random() * 100) + 1;

        const gambleLossEmbed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("Loss...")
        .addFields({ name: `You rolled ${roll}`, value: `You now have ${credits - amount}Δ`, inline: true })

        const gambleWinEmbed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle("Win!")
        .addFields({ name: `You rolled ${roll}`, value: `You now have ${credits + amount}Δ`, inline: true })

        if(roll > 49){
            await interaction.reply({ embeds: [gambleWinEmbed] });
            await Economy.findOneAndUpdate({ _id: interaction.user.id }, { $set: { credits: credits + amount } }).exec();
        }
        else{
            await interaction.reply({ embeds: [gambleLossEmbed] });
            await Economy.findOneAndUpdate({ _id: interaction.user.id }, { $set: { credits: credits - amount } }).exec();
        }
    },
};