const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed, User } = require("discord.js");
const covid19 = require('covid19-stats');

module.exports = class covid extends Command {
    constructor(client) {
        super(client, {
            name: 'covidstats',
            aliases: ['cs'],
            group: 'info',
            memberName: 'covidstats',
            description: "Donne les stats covid d'une région du monde",
            args: [
                {
                    key: 'query',
                    prompt: 'De quelle région souhaitez vous les résultats (Nom en Anglais)',
                    type: 'string'
                }
            ]
        });
    }
    async run(message, { query }) {
        const server = message.member.user
        var country = await covid19.getCountry(query);
        if (!country){
            return message.say('Aucun résultat || Veuillez saisir le nom du pays en anglais')
        }
        var embed = new MessageEmbed()
            .setColor("#8229de")
            .setTitle('Région : '+ query)
            .addFields(
                { name: 'Nouveaux cas', value: country.newCases},
                { name: 'Décès', value: country.newDeaths},
                { name: 'Cas globaux', value: country.totalCases},
                { name: 'Décès globaux', value: country.totalDeaths},         
            )
        return message.say(embed)
    }
}