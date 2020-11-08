const Timeout = new Set()
const {prefix}= require('../../config.json')
const ms = require('ms')
module.exports=async(bot,message)=>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    const command = bot.commands.get(cmd)
    if(command){
        if(command.timeout){
            if(Timeout.has(`${message.author.id}${command.name}`)){
                return message.reply(`Je kan dit alleen maar om de ${ms(command.timeout)} doen!`)
            } else {
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }
        command.run(bot,message,args)
    } 
}