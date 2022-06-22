const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags')

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: '- Information',
    usage: 'd!help [command name]',
    description: 'Instructions for using the command',

    async run (client, message, args) {
        if (!args[0]) return getAll(client, message);
        return getCMD(client, message, args[0]);
    },
};

function getAll (client, message) {
    const embed = new MessageEmbed()
    .setColor('#ccff48')
    .setTitle(`| Command list of ${client.user.username}`)
    .setFooter(`Use d!help [command name] for more details!`)

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(' | ')
    }

    const info = client.categories
        .map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    embed.setDescription(info);
    return message.channel.send({embeds: [embed]});
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase() || client.commands.get(client.aliases.get(input.toLowerCase())))

    if (cmd.name) info = `**Command name:** ${cmd.name}`
    if (cmd.aliases) info += `\n**Other name:** ${cmd.aliases.map(a => `\`${a}\``).join(',')}`
    if (cmd.description) info += `\n**Command details:** ${cmd.description}`
    if (cmd.usage) {
        info += `\n**How to use the command:** ${cmd.usage}`;
        embed.setFooter("Syntax <> = required, [] = optional")
    }
    return message.channel.send({embeds: [embed.setColor('GREEN').setDescription(info)]})
}
