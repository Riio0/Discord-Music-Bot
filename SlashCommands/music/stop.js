const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'Stop the current song and leave the voice channel.',
    aliases: ['leave', 'disconnect', 'dc'],
    usage: '',
    cooldown: 0,
    run: async (client, interaction, args) => {
        const queue = client.distube.getQueue(interaction)      
        queue.stop();
        client.distube.voices.leave(interaction);
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Disconnect', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Disconnected from voice channel!')
        ]});
    }
}