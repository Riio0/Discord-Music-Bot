const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resume',
    description: 'Resume the currently paused song!',
    usage: 'resume',
    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('No songs are playing at the moment!')
            ]})
        }

        queue.resume();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Continue', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Resume song!')
        ]})
    }
}