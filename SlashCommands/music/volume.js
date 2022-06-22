const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'Changes the volume of the current song.',
    usage: '<volume>',
    options: [
        {
            name: 'volume',
            description: 'The volume to set the music to.',
            type: 'NUMBER',
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        const volume = interaction.options.getNumber('volume');
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('No songs are playing!')
        ]})

        queue.setVolume(volume);
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Change the volume', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Changed the volume to **${volume}%**`)
        ]})
    }
}