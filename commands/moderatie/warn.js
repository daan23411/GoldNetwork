const warns = require("../../models/warns");
module.exports = {
  name: "warn",
  description: "Warn een gebruiker",
  category: "moderatie",
  usage: "<User mention> <Reason>",
  run: async (bot, message, args) => {
    let user = message.mentions.users.first();
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return message.channel.send('Je hebt geen permissie om dit uit te voeren')
    }
    if (!user) return message.channel.send(`Geen gebruiker genoemd!`);
    if (!args.slice(1).join(" "))
      return message.channel.send(`Geen reden opgegeven!`);
    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          let newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: args.slice(1).join(" "),
              },
            ],
          });
          newWarns.save();
          message.channel.send(
            `${user.tag} is gewarnd met de reden ${args.slice(1).join(" ")}. hij/zij heeft nu 1 warn.`
          );
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: args.slice(1).join(" "),
          });
          data.save();
          message.channel.send(
            `${user.tag} is gewarnd met de reden ${args.slice(1).join(" ")}. Hij/zij heeft nu ${data.Warns.length} warns.`
          );
        }
      }
    );
  },
};