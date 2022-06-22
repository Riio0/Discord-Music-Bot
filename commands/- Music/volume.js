const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "volume",
    aliases: ["vol"],
    category: "- Music",
    description: "Changes the volume of the current song.",
    usage: "<volume>",
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

        if (!args[0]) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('You have not entered a number to change the volume!')
        ]});

        const volume = parseInt(args[0]);
        queue.setVolume(volume);

        message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Change the volume', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Changed the volume to **${volume}%**`)
        ]})
    }
}
