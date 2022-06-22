const { MessageEmbed, Client, version } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [' '],
    category: '- Information',
    description: 'Ping bot',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const statsembed = new MessageEmbed()
    .addFields(
        {
          name: ":robot: Client",
          value: `┕🟢 Online! <t:${parseInt(client.readyTimestamp /1000)}:R>`,
          inline: true,
        },
        {
          name: "⌛ Ping",
          value: `┕${Math.round(message.client.ws.ping)}ms`,
          inline: true,
        },
      )
      .setColor('#ccff48')
  
      message.reply({ embeds: [statsembed]});
    },
};
