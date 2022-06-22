const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pause',
    description: 'Pause the current song!',
    usage: 'pause',
    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('No songs are playing at the moment!')
            ]})
        }

        queue.pause();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Pause', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Song paused!')
        ]})
    }
}