const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const ms = require('ms')
module.exports = {
    name: 'help',
    category: 'info',
    description: 'Krijg info over een command of een lijst van alle commands',
    usage: '[command]',
    run: async (client, message, args) => {
        if (args[0]) {
            return getCMD(client, message, args[0])
        } else {
            return getAll(client, message)
        }
    }
}
function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor('RANDOM')
    const commands = (category) => {
        return client.commands.filter(cmd => cmd.category === category).map(cmd => `- \`${cmd.name}\``).join(" ");
    }
    const info = client.categories.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(cat)}`).reduce((string, category) => string + "\n" + category)
    embed.setDescription(info)
    embed.setFooter(`© daan2341, 2020 - 2021, er zijn ${client.commands.size} commands beschikbaar!`)
    return message.channel.send(embed)
}
function getCMD(client, message, input) {
    const embed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    let info = `Geen informatie gevonden voor het command **${input.toLowerCase()}**`
    if (!cmd) return message.channel.send(embed.setColor('RANDOM').setDescription(info).setFooter('© daan2341, 2020 - 2021'));
    if (cmd.name) info = `**Naam**: ${cmd.name}`
    if (cmd.aliases) info += `\n**Afkortingen**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`
    if (cmd.description) info += `\n**Beschrijving**: ${cmd.description}`
    if (cmd.usage) info += `\n**Gebruik**: ${cmd.usage}`;
    if (cmd.timeout) info += `\n**Timeout**: ${ms(cmd.timeout)}`
    return message.channel.send(embed.setColor('RANDOM').setDescription(info).setFooter(`<> = Verplicht, [] = Optionaal, © daan2341, 2020 - 2021`))

}