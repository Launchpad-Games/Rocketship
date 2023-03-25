const { SlashCommandBuilder } = require('discord.js');
const Economy = require("../schemas/EconomySchema.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Get statistics on a user')
    .addUserOption(user => 
    user.setName("user")
      .setRequired(false)
      .setDescription("The user you want to find statistics on")
    ),
    async execute(interaction) {
      const user = interaction.options.getUser("user") ?? interaction.user;

      if(user.bot){
        await interaction.reply("You can't check the stats of a bot!");
        return;
      }

      const economyDocs = await Economy.find().sort({ credits: -1 }).exec();
      const economyMap = new Map(economyDocs.map(doc => [doc._id, doc]));

      const credits = economyMap.get(user.id)?.credits || 0;
      const messages = economyMap.get(user.id)?.messages || 0;

      const rankIndex = economyDocs.findIndex(doc => doc._id === user.id);

      const userStatsEmbed = new EmbedBuilder()
        .setColor(0x8007f9)
        .setTitle(user.tag)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
          { name: 'Messages', value: messages.toString(), inline: true },
          { name: 'Credits', value: credits.toString()+"Δ", inline: true },
          { name: 'Rank', value: `#${rankIndex}`, inline: true },
        )
        .setTimestamp()
    
      try{
        // interaction.reply(eco._id);
        interaction.reply({ embeds: [userStatsEmbed] });
      }
      catch(err){
        interaction.reply("Something went wrong:\n\n"+err)
      }
    },
};