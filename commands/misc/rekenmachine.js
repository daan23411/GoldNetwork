const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
    name: "rekenmachine",
    description: "Doet je rekenhuiswerk voor je :D",
    category: "misc",
    usage: "<num1> <type> <num2>",
    async run (client, message, args){

        if(!args[0]) return message.channel.send('Geef getalen op! Jij monster!');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Geef alsjeblieft een **GELDIG** getal en type op alsjeblieft dankjewel')
        }

        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Rekenmachine')
        .addField('Te Berekenen', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Antwoord', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}