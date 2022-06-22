const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "filter",
    aliases: ["filter"],
    category: "- Music",
    description: "Filter the queue.",
    usage: "",
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
                    .setDescription(`🚫 | Bạn cần vào cùng một kênh thoại với bot!`)
                ]});
            }
        }

        if(!args[0]) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Please choose a suitable filter!
            List of filters: 3d, bassboost, echo, karaoke, nightcore, vaporwave, flanger, gate, haas, reverb, surround, mcompand, phaser, tremolo, earwax`)
        ]})

        if(args[0] === 'off' && queue.filter?.length) queue.setFilter(false);
        else if(Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0]);
        else if(args[0]) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('No matching filters found!')
        ]})

        message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Filter', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Changed the filter to: **${queue.filters.join(', ') || 'Off'}**`)
        ]})
    }
}
