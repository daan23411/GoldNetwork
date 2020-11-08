const {MessageEmbed} = require('discord.js');
module.exports={
    name:'poll',
    category: 'fun',
    aliases: ['po'],
    description: 'Maak een Ja/Nee poll.',
    usage: '<kanaal> <poll vraag>',
    run: async(client,message,args)=>{
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply('Je hebt geen permissie om dit command uit te voeren.')
        //!poll <channel mention> question
        const channel = message.mentions.channels.first()|| message.guild.channels.cache.get(args[0])
        if(!channel){
            return message.reply('Je hebt geen kanaal mention of ID opgegeven of het kanaal bestaat niet.')
        }
        let question = message.content.slice(client.prefix.length+5+channel.id.length+3)
        if(!question){
            return message.reply('Geen vraag opgegeven.')
        }
        const Embed = new MessageEmbed()
        .setTitle('Nieuwe Poll!')
        .setDescription(question)
        .setTimestamp()
        .setFooter(`© daan2341, 2020 - 2021`)
        .setColor('RANDOM')
        let msg = await bot.channels.cache.get(channel.id).send(Embed)
            await msg.react('👍')
            await msg.react('👎')
    }
}