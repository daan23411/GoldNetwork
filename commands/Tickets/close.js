const discord = require('discord.js');
const {userDiscriminator, userName} = require('./ticket')
module.exports={
    name:'close',
    category: 'Tickets',
    description: 'Close een ticket.',
    run: async(bot,message,args)=>{
        const catID = "742075021920305184";

        if (!message.member.hasPermission("KICK_MEMBER")) return message.reply("Jij kan dit niet! Vraag een admin om je ticket te closen!");
    
        if (message.channel.parentID == catID) {
            message.channel.delete();
        } else {
    
            message.channel.send("Doe dit in een ticket kanaal!");
    
        }
    
        var closeEmbed = new discord.MessageEmbed()
            .setTitle("Ticket " + message.channel.name)
            .setColor("RANDOM")
            .setDescription("Het ticket is gemarkeerd als **compleet**.")
            .setFooter("© daan2341, 2020 - 2021");
    
        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "logs");
        if (!ticketChannel) return message.reply("Channel does not exist!");
    
        var user = bot.users.cache.find(a => a.username === userName);
        if (user) user.send(closeEmbed)
    
        ticketChannel.send(closeEmbed);
    
    
    }
}