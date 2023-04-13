const { SlashCommandBuilder } = require('discord.js');
const Economy = require("../schemas/EconomySchema.js");
const { EmbedBuilder, User } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('send')
		.setDescription('send credits to another user')
        .addUserOption(user => 
            user.setName("user")
              .setRequired(true)
              .setDescription("The user you want to duel")
            )
        .addIntegerOption(amount => 
            amount.setName("amount")
              .setRequired(true)
              .setDescription("amount you want to send")
            ),
    async execute(interaction, client) {
        const user = interaction.options.getUser("user");
        const amount = interaction.options.getInteger("amount");

        if(user.bot){
            await interaction.reply({content: "You can't send credits to a bot!", ephemeral: true});
            return;
        } else if(user.id === interaction.user.id){
            await interaction.reply({content: "You can't send credits to yourself.", ephemeral: true});
            return;
        }

        const economyDocs = await Economy.find().sort({ credits: -1 }).exec();
        const economyMap = new Map(economyDocs.map(doc => [doc._id, doc]));

        const selfCredits = economyMap.get(interaction.user.id)?.credits || 0;
        const targetCredits = economyMap.get(user.id)?.credits || 0;

        if(amount > selfCredits){
            await interaction.reply({content: `You can't send more than you have`, ephemeral: true});
            return;
        }
        else if(amount <= 0){
            await interaction.reply({content: `You have to send at least 1Δ`, ephemeral: true});
            return;
        }

        await Economy.findOneAndUpdate({ _id: interaction.user.id }, { $inc: { credits: -amount } }).exec();
        await Economy.findOneAndUpdate({ _id: user.id }, { $inc: { credits: amount } }).exec();

        const mentionedUser = new User(client, { id: user.id });

        const sendEmbed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle(`Transfer successful!`)
        .setDescription(`Sent ${amount}Δ to ${mentionedUser}`)
        .addFields({ name: `You now have ${selfCredits}Δ`, value: `They have ${targetCredits}Δ`, inline: true })

        await interaction.reply({ embeds: [sendEmbed] });
    },
};