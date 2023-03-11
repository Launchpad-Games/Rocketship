const { SlashCommandBuilder } = require('discord.js');
const jsonfile = require('jsonfile');
const path = './data.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('data')
        .setDescription('Used for editing bot json data, for devs only')
        .setDefaultPermission(false)
        .addIntegerOption(type =>
        type.setName("type")
            .setRequired(true)
            .setDescription("The action you're going to do")
            .addChoices(
                    { name: 'Edit', value: 0 },
                    { name: 'List', value: 1 },
                    ))
        .addStringOption(item =>
        item.setName("item")
            .setDescription("Which item you're going to edit (ignore for list)")),
    async execute(interaction) {
        const role = interaction.member.roles.cache.find(role => role.id === '679116188076343330');
        if (!role) {
            return await interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true
            });
        }

    jsonfile.readFile(path, (err, data) => {
        if (err) {
            interaction.reply("An error occured: "+err);
            return;
        }

        const type = interaction.options.getInteger('type');

        if(type == 0){
            const item = interaction.options.getString("item");
            interaction.reply("editing "+item);
        }

        else if(type == 1){
            interaction.reply(data + "a");
        }
    })
    }
}