const discord = require('discord.js');
module.exports={
    name:'ticket',
    category: 'Tickets',
    aliases: ['new'],
    description: 'maak een ticket aan',
    run: async(bot,message,args)=>{
        const catID = "742075021920305184";

        let userName = message.author.username;
        let userDiscriminator = message.author.discriminator;

        let ticketExists = false;

        message.guild.channels.cache.forEach(channel => {
            

            if (channel.name == "ticket-" + userName.toLowerCase() + "-" + userDiscriminator){
                ticketexists = true;

                message.channeel.send('Je hebt al een ticket. Handel die eerst af');

                return;
            }

        });

        if(ticketExists) return;

        let embed = new discord.MessageEmbed()
            .setTitle("Hallo" + message.author.username)
            .setDescription(`Zie #ticket-${userName}-${userDiscriminator}`)
            .setFooter('© daan2341, 2020 - 2021')
            .setTimestamp();

        message.channel.send(embed);

        message.guild.channels.create("ticket-" + userName.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
            (createdChannel) => {
                createdChannel.setParent(catID).then(
                    (settedParent) => {

                        settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'),{
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false
                        });

                        settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === 'Member'),{
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false
                        });

                        settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === 'Support'),{
                            CREATE_INSTANT_INVITE: false,
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            ATTACH_FILES: true,
                            CONNECT: true,
                            ADD_REACTIONS: true
                        });

                        settedParent.updateOverwrite(message.author.id,{
                            CREATE_INSTANT_INVITE: false,
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            ATTACH_FILES: true,
                            CONNECT: true,
                            ADD_REACTIONS: true
                        });

                        let embedTicket = new discord.MessageEmbed()
                        .setTitle(`Hallo ${message.author.username}`)
                        .setDescription("Stuur hier alvast je vraag/klacht! Support komt zo bij je.")
                        .setFooter('© daan2341, 2020 - 2021')
                        .setTimestamp();

                        settedParent.send(embedTicket);

                    }
                ).catch(err => {
                    console.log(err);
                    message.cannel.send("ERROR!!! Check console voor voledige log!");
                })
            }
        ).catch(err => {
            console.log(err);
            message.cannel.send("ERROR!!! Check console voor voledige log!");
        })
    }
}