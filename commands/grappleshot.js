const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const jsonfile = require('jsonfile');
const path = './data.json';

module.exports = {
    data: new SlashCommandBuilder()
		.setName('grappleshot')
		.setDescription('Returns information about GrappleShot'),
    async execute(interaction) {
        jsonfile.readFile(path, (err, data) => {
          if (err) {
              interaction.reply("An error occured: "+err)
              return;
          }
          const grappleshotEmbed = new EmbedBuilder()
            .setColor("#ff00b3")
            .setTitle('GrappleShot')
            .setURL('https://launchpad-games.com/')
            .setDescription('Information about GrappleShot <:grappleshot:975092371018620938>')
            .setThumbnail('https://i.imgur.com/Mcwk14h.png')
            .addFields(
                    { name: 'Version', value: data.gsVersion, inline: true },
                    { name: 'Editor', value: data.gsEditor, inline: true },
                    { name: ' ', value: ' ' })
//                    { name: 'Players', value: 'hmmmmmmmmmmmm', inline: true })
            .setTimestamp()

            interaction.reply({ embeds: [grappleshotEmbed] });
        });
    },
};

