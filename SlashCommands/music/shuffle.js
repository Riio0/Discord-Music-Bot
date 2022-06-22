const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shuffle',
    description: 'Shuffle the queue.',
    usage: '',
    run: async (client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('No songs are playing!')
        ]})

        queue.shuffle();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Randomly done', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Randomized the playlist!')
        ]})
    }
}