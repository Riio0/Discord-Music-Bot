const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Display the list of songs in the queue.',
    usage: 'queue',
    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            return interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('No songs are playing at the moment!')
            ]})
        }

        const q = queue.songs
        .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')

        const tracks = queue.songs
        .map((song, i) => `**${i + 1}** - [${song.name}](${song.url}) | ${song.formattedDuration}
        Request by : ${song.user}`)

        const songs = queue.songs.length;
        const nextSongs = songs > 10 ? `And **${songs - 10}**another song...` : `In playlist **${songs}** the song...`;

        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Playlists', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`)
            .addField(`Now playing:`, `[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Request by: ${queue.songs[0].user}`, false)
            .addField(`Total play time:`, `${queue.formattedDuration}`, true)
            .addField(`Total number of songs:`, `${songs}`, true)
        ]})
    }
}