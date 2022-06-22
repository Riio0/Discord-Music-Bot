const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'autoplay',
    description: 'Toggles autoplay for the current guild.',
    usage: 'autoplay',
    run: async(client, interaction,args) => {
        const queue = client.distube.getQueue(interaction);
        if(!queue) {
            return interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('No songs are playing at the moment!')
            ]})
        }
        const autoplay = queue.toggleAutoplay();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Auto play song', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Automatically play songs: ${autoplay ? '**Turn on**' : '**Turn off**'}`)
        ]})
    }
}