const { SlashCommandBuilder } = require('discord.js');
const Economy = require("../schemas/EconomySchema.js");

module.exports = {
    data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Get statistics on a user')
    .addUserOption(user => 
    user.setName("User")
      .setRequired(true)
      .setDescription("The user you want to find statistics on")
    ),
    async execute(interaction) {
      const user = interaction.options.getUser("user");
      const eco = await Economy.findById(user.id).exec();

      try{
        interaction.reply(eco._id);
      }
      catch(err){
        interaction.reply("Something went wrong:\n\n"+err)
      }
    },
};