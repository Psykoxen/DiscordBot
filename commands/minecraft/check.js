const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const web = require('minecraft-server-util');

module.exports = class Check extends Command {
    constructor(client) {
        super(client, {
            name: 'minecraft.check',
            group: 'minecraft',
            memberName: 'minecraft.check',
            description: "Vérifie l'état d'un serveur",
            args: [
                {
                    key: 'query',
                    prompt: 'Que souhaitez-vous faire (add / delete)?',
                    type: 'string'
                }
        ]
        });
    }

    

    async run(message, { query}) {
        var value = "";
        var embed = new MessageEmbed()
            .setTitle(query)
            .setColor("#8229de")

        web.status(query) // port is default 25565
            .then((response) => {
                console.log(response)
                embed.addFields(
                    { name: 'Etat : ', value: 'Online' , inline: true },
                    { name: 'Version : ', value: response['version'] , inline: true },
                );
                if (response['samplePlayers'] != null){
                    for (let i = 0 ; i < response['samplePlayers'].length ; i++) {
                        value +=  (i+1) + ". " + response['samplePlayers'][i]['name'] + "\n";
                    }
                } else {
                    value = 0
                };
                embed.addField('Joueur en ligne : ',value);
                return message.say(embed);
            })
            .catch((error) => {
                embed.addFields(
                    { name: 'Etat : ', value: 'Offline' , inline: true }
                )
                return message.say(embed);
    });
        
    }
}
