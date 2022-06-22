const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    description: 'Skip the current song',
    usage: 'skip',

    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);
        if(!queue) {
            return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor('EF4F4F')
                .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('No songs are playing!')
            ]})
        }

        queue.skip();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Skip song', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Skipped song!')
        ]})
    }
}
