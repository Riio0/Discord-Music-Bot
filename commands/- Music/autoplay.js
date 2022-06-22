const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'autoplay',   
    description: 'Auto play song',
    aliases: ['autoplay'],
    category: '- Music',
    usage: '',
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
        
        const autoplay = queue.toggleAutoplay()
        message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Auto play song', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Automatically play songs: ${autoplay ? '**Turn on**' : '**Turn off**'}`)
        ]})
    }
}
