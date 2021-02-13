const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const Brawlstars = require("brawlstars.js");
const { brawl } = require('../../config.json');
const server = new Brawlstars.Client(brawl);


module.exports = class BrawlerStats extends Command {
    constructor(client) {
        super(client, {
            name: 'brawlerstats',
            aliases: ['brs'],
            group: 'brawlstar',
            memberName: 'brawlerstats',
            description: "Donne les stats des brawlers d'un joueur",
            args: [
                {
                    key: 'query',
                    prompt: 'Quel joueur souhaitez-vous voir ?',
                    type: 'string'
                }
            ]
        });
    }
    async run(message, { query }) {
        const player = await server.getPlayer(query);
        var value = "";
        var embed = new MessageEmbed()
            .setColor(player.hexColor)
            .setTitle(player.name + ' `' + player.tag + '`')
        for (let i = 0 ; i < player.brawlers.length ; i++) {
            const brawler = player.brawlers[i];
            embed.addField(brawler.name + ' : ', ' Pouvoir : ' + brawler.power + ' Rang :  ' + brawler.rank)
        }
        return message.say(embed)
    }
}