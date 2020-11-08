const {MessageEmbed} = require('discord.js');
module.exports={
    name:'say',
    category: 'misc',
    description: 'Zeg iets leuks.',
    usage: '<bericht>',
    run: async(bot,message,args)=>{
      const sayMessage = args.join(" ");
      if(!sayMessage) {
        return message.channel.send('Geef een bericht op. Ik kan geen bericht versturen als er niks in staat 😄')
    }

    const sayEmbed = new MessageEmbed()
    .setTitle('Nieuw Bericht')
    .setDescription(sayMessage)
    .setColor('RANDOM')
    .setFooter('©️ daan2341, 2020-2021')
    .setTimestamp()

      message.delete().catch(err => console.log(err));
      message.channel.send(sayEmbed);
    }
}