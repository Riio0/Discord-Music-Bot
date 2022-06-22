const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['s'],
    description: 'Skip current song',
    usage: '',
    category: '- Music',
    cooldown: 0,
    run: async (client, message, args) => {
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
            .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
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
        
        queue.skip();
        message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Skip song', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Skipped song!')
        ]});
    }
}
