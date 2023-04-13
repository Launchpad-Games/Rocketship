const { SlashCommandBuilder } = require('discord.js');
const Economy = require("../schemas/EconomySchema.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('duel')
		.setDescription('Request to duel another user')
        .addUserOption(user => 
            user.setName("user")
              .setRequired(true)
              .setDescription("The user you want to duel")
            )
        .addIntegerOption(bet => 
            bet.setName("bet")
              .setRequired(true)
              .setDescription("The total amount you want to bet (you only have to pay half)")
            ),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const bet = interaction.options.getInteger("bet");

        if(user.bot){
            await interaction.reply({content: "You can't duel a bot!", ephemeral: true});
            return;
        } else if(user.id === interaction.user.id){
            await interaction.reply({content: "You can't duel yourself!", ephemeral: true});
            return
        }

        const economyDocs = await Economy.find().sort({ credits: -1 }).exec();
        const economyMap = new Map(economyDocs.map(doc => [doc._id, doc]));

        const selfCredits = economyMap.get(interaction.user.id)?.credits || 0;
        const targetCredits = economyMap.get(user.id)?.credits || 0;

        if(bet%2!=0){ 
            await interaction.reply({content: `You can't bet an odd number`, ephemeral: true});
            return;
        }

        if(bet / 2 > selfCredits){
            await interaction.reply({content: `You can't bet more than you have`, ephemeral: true});
            return;
        } else if(bet / 2 > targetCredits){
            await interaction.reply({content: `You can't bet more than they have`, ephemeral: true});
            return;
        }

        const duelMessage = await interaction.reply({ content: `Look out <@${user.id}>, <@${interaction.user.id}> has challenged you to a duel!\nThe prize pool is ${bet}Δ. It will cost you ${bet/2}Δ`+"\n\n`react with ✅ to accept or ❌ to decline`", fetchReply: true });
        await duelMessage.react("✅");
        await duelMessage.react("❌");

        const filter = (reaction, reactionUser) => {
            return ["✅", "❌"].includes(reaction.emoji.name) && reactionUser.id === user.id;
        };
        
        const collector = duelMessage.createReactionCollector(filter);
        
        collector.on("collect", async (reaction, reactionUser) => {
            if (reactionUser.id !== user.id) {
                reaction.users.remove(reactionUser.id);
            } else if (reaction.emoji.name === "✅") {
                var user1HP = 100;
                var user2HP = 100;

                var currentUser = 1;
                var duelMessage = `<@${interaction.user.id}>: ${user1HP} HP | <@${user.id}>: ${user2HP} HP`;

                const reply = await interaction.followUp({ content: `<@${user.id}> accepted the the duel!\n` });
                setTimeout(async () => {
                await reply.edit(`Duel started!\n${duelMessage}`);
                setTimeout(async () => {
                    await reply.edit(duelMessage);
                    while (user1HP > 0 && user2HP > 0) {
                    const damage = Math.floor(Math.random() * 26) + 5; // generate random damage between 5-30
                    if (currentUser === 1) {
                        user2HP -= damage;
                        duelMessage = `<@${interaction.user.id}> dealt ${damage} damage!\n<@${interaction.user.id}>: ${user1HP} HP | <@${user.id}>: ${user2HP} HP`;
                        currentUser = 2;
                    } else {
                        user1HP -= damage;
                        duelMessage = `<@${user.id}> dealt ${damage} damage!\n<@${interaction.user.id}>: ${user1HP} HP | <@${user.id}>: ${user2HP} HP`;
                        currentUser = 1;
                    }
                    await reply.edit(duelMessage);
                    await new Promise(resolve => setTimeout(resolve, 2000)); 
                    }

                    const winner = user1HP > 0 ? interaction.user.id : user.id;
                    const loser = user1HP > 0 ? user.id : interaction.user.id; //what the fuck??????????? why does this work?????????????
                    await reply.edit(`<@${winner}> has won the duel and got +${bet/2}Δ!`);
                    // add credits to winner and remove credits from loser
                    const winnerCredits = economyMap.get(winner)?.credits || 0;
                    const loserCredits = economyMap.get(loser)?.credits || 0;

                    await Economy.findOneAndUpdate({ _id: winner }, { $set: { credits: winnerCredits + bet/2 } }).exec();
                    await Economy.findOneAndUpdate({ _id: loser }, { $set: { credits: loserCredits - bet/2 } }).exec();

                }, 1000);
            }, 1000);
            } else if (reaction.emoji.name === "❌") {
                await interaction.followUp({ content: `<@${user.id}> declined the duel!`});
            }
        });
    },
};