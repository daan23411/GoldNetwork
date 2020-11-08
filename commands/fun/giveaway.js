const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const { isValidObjectId } = require('mongoose')
module.exports = {
    name: 'giveaway',
    description: 'Maak een giveaway!',
    usage: '<time> <prize>',
    category: 'fun',
    run: async (bot, message, args) => {
        if(!args[0]) return message.channel.send('Geen tijd opgegeven!')
        if(!args[0].endsWith("d")&&!args[0].endsWith("h")&&!args[0].endsWith("m")) return message.channel.send('Je hebt de tijd niet goed opgegeven. Het moet in uren minuten of dagen.')
        if(isNaN(args[0][0])) return message.channel.send('Dat is geen getal.')
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send('Ik kan dat kanaal niet vinden.')
        let prize = args.slice(2).join(" ")
        if(!prize) return message.channel.send('Geen prijs opgegeven.')
        message.channel.send(`*Giveaway gestart in ${channel}*`)
        let embed = new MessageEmbed()
        .setTitle('Nieuwe Giveaway')
        .setDescription(`De prijs is **${prize}**`)
        .setTimestamp(Date.now()+ms(args[0]))
        .setFooter(`Giveaway gestart door ${message.author}`)
        .setColor('RANDOM')
        let m = await channel.send(embed)
        m.react("🎉")
        setTimeout(() => {
            if(m.reactions.cache.size<=1) return channel.send('Er doen te weinig mensen mee aan de giveaway om een winnaar uit te zoeken.')
            let winner = m.reactions.cache.get("🎉").users.cache.filter(u=>!u.bot).random()
            channel.send(`De winnaar van **${prize}** is geworden... ${winner}`)
        }, ms(args[0]));
    }
}