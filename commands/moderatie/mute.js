const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'mute',
    description: 'Mute iemand die de regels breekt',
    category: 'moderatie',
    usage: 'mute <@mention> <reason>',
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send('Je hebt geen permissie om dit te doen!');
        }

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send('Ik heb geen permissie om dit te doen.');
        }

        const user = message.mentions.members.first();


        
        if(!user) {
            return message.channel.send('Geen speler opgegeven.')
        }

        if(user.id === message.author.id) {
            return message.channel.send('Gast, je kan jezelf niet muten :/')
        }

        if(user.id === '713339222961946644') {
            return message.channel.send('Je kan mij niet muten. Probeer het ook niet!')
        }

        let reason = args.slice(1).join(" ")

        if(!reason) {
            return message.channel.send('Er is geen reden opgegeven. ik kan niemand muten zonder reden :D')
        }

    //TIME TO LET MUTED ROLE

        let muterole = message.guild.roles.cache.find(x => x.name === 'Muted')

        if(user.roles.cache.has(muterole)) { 
            return message.channel.send('De speler die je wilt muten is al gemute.')
        }

        user.roles.add(muterole)

        await message.channel.send(`**${message.mentions.users.first().username}** is nu gemute! Reden: \`${reason}\` `)

            user.send(`Je bent gemute in ${message.guild.name} door ${message.author.tag} met de reden \`${reason}\``)



    }
};