const {MessageEmbed} = require('discord.js');
module.exports={
    name:'announce',
    category: 'info',
    description: 'Stuur een mededeling.',
    usage: '<bericht>',
    run: async(bot,message,args)=>{
      const sayMessage = args.join(" ")
      if(!sayMessage) {
          return message.channel.send('Geef een bericht op. Ik kan geen bericht versturen als er niks in staat 😄')
      }  
      const sayMessageEmbed = new MessageEmbed()
      .setTitle('Mededeling')
      .setDescription(sayMessage)
      .setFooter('© daan2341, 2020 - 2021')
      .setColor('RANDOM')
      message.delete().catch(err => console.log(err));
      message.channel.send(sayMessageEmbed);
    }
}