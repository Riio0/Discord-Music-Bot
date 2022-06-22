const { MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Show playlist',
    category: '- Music',
    aliases: ['q'],
    usage: 'queue',
    cooldown: 5,
    run: async (client, message, args, _fromButton = false) => {
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription(`| You need to join a voice channel to use this feature.`)
        ]});
        if(!queue) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('No songs are playing!')
        ]})
        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`| You need to be on the same voice channel as the bot!`)
                ]});
            }
        }

        const q = queue.songs
        .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')

        const tracks = queue.songs
        .map((song, i) => `**${i + 1}** - [${song.name}](${song.url}) | ${song.formattedDuration}
        Request by : ${song.user}`)

        const songs = queue.songs.length;
        const nextSongs = songs > 10 ? `And**${songs - 10}** another song...` : `In playlist **${songs}** the song...`;

        message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Playlists', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`)
            .addField(`Now playing:`, `[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Request by: ${queue.songs[0].user}`, false)
            .addField(`Total play time:`, `${queue.formattedDuration}`, true)
            .addField(`Total songs:`, `${songs}`, true)
        ]})
    }
}
