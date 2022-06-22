const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Loop the current song.',
    usage: 'loop',
    options: [
        {
            name: 'regime',
            description: 'Repeat mode',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'off',
                    value: 'off'
                }, 
                {
                    name: 'The song',
                    value: 'song'
                },
                {
                    name: 'List',
                    value: 'queue'
                }
            ]
        }
    ],

    run: async(client, interaction, args) => {
        const loop = interaction.options.getString('regime');
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            return interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('EF4F4F')
                .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('No songs are playing!')
            ]})
        }

        if(loop == 'off') {
            queue.setRepeatMode(0);
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('#ccff48')
                .setAuthor({name: 'Turn off repeat', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('Turn off repeat Repeat off!')
            ]})
        } else if(loop == 'song') {
            queue.setRepeatMode(1);
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('#ccff48')
                .setAuthor({name: 'Repeat the song', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('Repeated current song!')
            ]})
        } else if (loop == 'queue') {
            queue.setRepeatMode(2);
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('#ccff48')
                .setAuthor({name: 'Repeat the song', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('Repeated playlists!')
            ]})
        }
    }
}
