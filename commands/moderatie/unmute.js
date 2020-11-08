module.exports = {
    name: 'unmute',
    category: 'moderatie',
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send('Je hebt geen permissie om dit te doen!');
        }

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send('Ik heb geen permissie om dit te doen.');
        }

        const user = message.mentions.members.first();

        if (!user) {
            return message.channel.send('Geen speler opgegeven.')
        }

        let muterole = message.guild.roles.cache.find(x => x.name === "Muted")

        if (user.roles.cache.has(muterole)) {
            return message.channel.send('De speler die je wilt unmuten is nooit gemute.')
        }

        user.roles.remove(muterole)

        await message.channel.send(`**${message.mentions.users.first().username}** is nu geunmute!`)

        user.send(`Je bent nu geunmute in ${message.guild.name}. dit is gedaan door ${message.author.tag}`)

    }
}