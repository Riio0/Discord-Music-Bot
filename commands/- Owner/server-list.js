const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverlist',
    aliases: ['sl'],
    category: '- Owner',
    usage: 'd!serverlist',
    description: 'Show bot is server list',

    run: async(client, message, args) => {
        if(message.author.id != '323975996829073418') {
            message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('| You are not authorized to perform this action!')
            ]})
        } else {
            const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(50)

            const description = guilds.map((guild, index) => {
                return `${index + 1}. ${guild.name} - ${guild.id} - ${guild.memberCount} member`
            }).join('\n')

            const embed = new MessageEmbed()
            .setColor('#ccff48')
            .setTitle(`List of bot's servers(${client.guilds.cache.size} server)`)
            .setDescription(description)

            message.channel.send({ embeds: [embed]})
        }
    }
}