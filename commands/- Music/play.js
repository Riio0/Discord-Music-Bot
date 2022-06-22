// const player = require('../../client/player.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play a song from YouTube, SoundCloud, Spotify, Mixer, Twitch, Bandcamp, or a direct link.',
    aliases: ['p'],
    usage: '<song name>',
    category: '- Music',
    cooldown: 0,
    guildOnly: true,
    args: true,
    run: async (client, message, args) => {
        const string = args.join(' ')
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription(`| You need to join a voice channel to use this feature.`)
        ]});

        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`| You need to be on the same voice channel as the bot!`)
                ]});
            }
        }

        const msg = await message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Search', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`| Searching...`)
        ]})

        setTimeout(() => msg.delete() , 5000);

        client.distube.play(voiceChannel, string, {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
}
