const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const bot = new Client({
    disableEveryone: true
})
const config = require('./config.json')
const token = config.token
const mongoose = require('mongoose')
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
bot.prefix = config.prefix;
mongoose.connect("mongodb+srv://GoldBotDB:GoldBotOfficialDB@cluster0.jkuzh.mongodb.net/Data?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
["command", "event"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});
bot.login(config.token)