const {prefix}= require('../../config.json')
module.exports=bot=>{
    bot.user.setActivity(`${prefix}help | GoldTopia 4 Life`)
    console.log(`Hoi! ${bot.user.username} is beschikbaar voor commands!`)
}