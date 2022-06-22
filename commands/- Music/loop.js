const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "loop",
    aliases: ["repeat"],
    category: "- Music",
    description: "Loop the current song.",
    usage: "loop",

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

        let mode = null;
        if(!args[0]) {
            mode = 0;
            message.reply({embeds: [
                new MessageEmbed()
                .setColor('EF4F4F') 
                .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('You must choose 1 option!')
                .addField('off', 'Stop repeating the song.', true)
                .addField('song', 'Repeat the current song.', true)
                .addField('queue', 'Repeat all songs in the queue.', true)
            ]})
        }

        switch (args[0]) {
        case 'off':
            mode = 0
            break
        case 'song':
            mode = 1
            break
        case 'queue':
            mode = 2
            break
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? 'Repeat playlist' : 'Repeat the song') : 'Turn off'
        message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Repeat', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Adjusted the repeat mode to **${mode}**!`)
        ]})
    }
}
