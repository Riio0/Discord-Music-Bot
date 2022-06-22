// const player = require('../../client/player.js');

module.exports = {
    name: 'play',
    description: 'Play a song from YouTube, SoundCloud, Spotify, Mixer, Twitch, Bandcamp, or a direct link.',
    aliases: ['p'],
    usage: '<song name>',
    category: '- Music',
    options: [
        {
            name: 'name_song_url',
            description: 'Song name or url',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        const string = interaction.options.getString('name_song_url')

        const voiceChannel = interaction.member.voice.channel
        const queue = await client.distube.getQueue(interaction)

        // await interaction.reply("🔍 **Searching and attempting...**")
        await interaction.followUp("Successfully searched...👌")
        client.distube.play(voiceChannel, string, {
            textChannel: interaction.channel,
            member: interaction.member
        })
    }
}