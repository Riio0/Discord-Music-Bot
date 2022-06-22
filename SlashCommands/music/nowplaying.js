const { MessageEmbed } = require('discord.js');
const Format = Intl.NumberFormat();
const status = queue =>
`Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'off'}\` | Repeat: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Playlists' : 'The song') : 'off'
  }\` | Autoplay: \`${queue.autoplay ? 'on' : 'off'}\``

module.exports = {
    name: "nowplaying",
    description: "Shows the current song playing",
    usage: "nowplaying",
    run: async (client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        const song = queue.songs[0];
        const embed = new MessageEmbed()
        .setColor('#ccff48')
        .setAuthor({name: 'Playing...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .addField("| Status", `${status(queue).toString()}`, false)
        .addField('| Listens', `${Format.format(song.views)}`, true)
        .addField('👍 | Prefer', `${Format.format(song.likes)}`, true)
        .addField('| Dislike', `${Format.format(song.dislikes)}`, true)
        .addField('| Played', `${queue.formattedCurrentTime} / ${song.formattedDuration}`, true)
        .addField('| Download link', `[Click here](${song.streamURL})`, true)
        .addField("| Request by",` ${song.user}`, true)

        interaction.followUp({embeds: [embed]});
    }
}
