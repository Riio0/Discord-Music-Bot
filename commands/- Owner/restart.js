const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'restart',
    description: 'Restarts the bot',
    category: '- Owner',
    usage: 'restart',
    aliases: ['rb'],

    run: async (client, message, args) => {
        if(message.author.id != '323975996829073418') {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('#ff0000')
                .setDescription('You are not authorized to execute this command!')
            ]})
        } else {
            const embed = new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Restart...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(` \`\`\`md\n#Rebooting ${client.user.tag}...\nThis process will take about 1 minute\`\`\``)
            message.reply({embeds: [embed]})
            try {
                process.exit()
            } catch (e) {
                console.log(e)
                message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('#ff0000')
                    .setDescription(`Error! An error occurred. Please try again later ${e}!`)
                ]})
            }
        }
    }
}