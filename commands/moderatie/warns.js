const warns = require("../../models/warns");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "warns",
    description: "Krijg het aantal warns van een speler",
    category: "moderatie",
    usage: "<User mention>",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first();
        if (!user) return message.channel.send(`Geen speler genoemd!`);
        warns.find(
            { Guild: message.guild.id, User: user.id },
            async (err, data) => {
                if (err) console.log(err);
                if (!data.length)
                    return message.channel.send(`${user.user.tag} heeft geen warns.`);
                let Embed = new MessageEmbed()
                    .setTitle(`Warns van ${user.user.tag}!`)
                    .setDescription(
                        data.map((d) => {
                            return d.Warns.map(
                                (w, i) =>
                                    `${i} - Moderator: ${message.guild.members.cache.get(w.Moderator).user.tag} Reden: ${w.Reason}`).join("\n");
                        })
                    );
                message.channel.send(Embed);
            }
        );
    },
};