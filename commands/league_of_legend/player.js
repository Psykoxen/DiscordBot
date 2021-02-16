const { Command, CommandoMessage } = require("discord.js-commando");
const lol = require("lol-js");
const { lolAPI } = require('../../config.json');
module.exports = class LOLPlayerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leagueoflegendplayer',
            aliases: ['lolp'],
            group: 'league_of_legend',
            memberName: 'leagueoflegendplayer',
            description: 'Affiche les stats du joueur demandé',
            args: [
                {
                    key: 'query',
                    prompt: 'Joueur souhaité',
                    type: 'string'
                }
            ]
        });
    }
    async run(message, {query}) {
        const lolClient = lol.client({
            apiKey: 'blahblahblah',
            cache: lol.redisCache({host: '127.0.0.1', port: 6379})
        });
        lolClient.getChampionByName()
    }
}