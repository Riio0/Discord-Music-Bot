const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'Rewind the current song to the specified position!',
    usage: 'seek <time>',
    options: [
        {
            name: 'time',
            description: 'Incoming song rewind time (ms)',
            type: 'NUMBER',
            required: false,
        }
    ],
    run: async(client, interaction, args) => {
        const time = interaction.options.getNumber('time');
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('No songs are playing!')
        ]})

        if(!time) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`You must choose a timeline to rewind! ( < ${queue.songs[0].duration}ms )`)
        ]})

        if(time > queue.songs[0].formattedDuration) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('The rewind time cannot be greater than the song time!')
        ]})

        queue.seek(time);
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Old', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`It is pasted **${time}ms / ${queue.songs[0].duration}ms**`)
        ]})
    }
}