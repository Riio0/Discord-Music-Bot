const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'server-leave',
  aliases: ['svlv'],
  category: '- Owner',
  description: 'Leave the server',
  usage: 'server-leave',
  run: async (client, message, args) => {
    if (message.author.id != '323975996829073418')
      return message.reply('You do not have permission to use this command!');
    const guild = client.guilds.cache.get(args.join(' '));
    try {
      if (!guild)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor('RED')
              .setDescription(`| Server not found!`),
          ],
        });
      await guild.leave();
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#ccff48')
            .setDescription(
              `| Server not found! ${guild.name} - ${guild.id} - ${guild.memberCount} member!`
            ),
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
