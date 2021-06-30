const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed, User } = require("discord.js");
const translate = require('translator-promise');
const ISO6391 = require('iso-639-1');

module.exports = class Translate extends Command {
    constructor(client) {
        super(client, {
            name: 'translate',
            aliases: ['trad'],
            group: 'translate',
            memberName: 'traduction',
            description: "Traduit un mot ou une phrase",
            args: [
                {
                    key: 'L1',
                    prompt: "Langue d'origine (indicatif -> fr, es, ..)",
                    type: 'string'
                },
                {
                    key: 'L2',
                    prompt: "Langue de traduction (indicatif -> fr, es, ..)",
                    type: 'string'
                },
                {
                    key: 'query',
                    prompt: "Le contenu à traduir",
                    type: 'string'
                }
            ]
        });
    }
    async run(message, { query , L1 , L2}) {
        const server = message.member.user
        const result = await translate(query, L2, L1);
        console.log(result)
        var embed = new MessageEmbed()
            .setColor("#8229de")
            .setTitle('Traduction : ')
            .addFields(
                { name: ISO6391.getName(L1), value: query},
                { name: ISO6391.getName(L2), value: result.candidate[0]},
       
            )
        return message.say(embed)
    }
}