const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const Brawlstars = require("brawlstars.js");
const { brawl } = require('../../config.json');
const server = new Brawlstars.Client(brawl);


module.exports = class BrawlStats extends Command {
    constructor(client) {
        super(client, {
            name: 'brawlstats',
            aliases: ['bs'],
            group: 'brawlstar',
            memberName: 'brawlstats',
            description: "Donne les stats d'un joueur",
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
        const club = await server.getClub(player.club.tag);
        var value = "";
        var embed = new MessageEmbed()
            .setColor(player.hexColor)
            .setTitle(player.name + ' `' + player.tag + '`')
            .setDescription('Trophées : ' + player.trophies + `\n` + 'Trophées Max : '+ player.highestTrophies + `\n` + 'Trophées Star Max : ' + player.highestPowerPlayPoints + `\n` + `\n` + 'Niveau : ' +player.expLevel + `\n` + 'Brawlers : ' + player.brawlerCount )
            .addFields(
                { name: 'Victoire en Equipe', value: player.trioVictories , inline: true },
                { name: 'Victoire en Duo', value: player.duoVictories, inline: true },
                { name: 'Victoire en Solo', value: player.soloVictories, inline: true },       
            )
            .addFields(
                { name: 'Attaque de Géant', value: player.bestTimeAsBigBrawler , inline: true },
                { name: 'Attaque de Robot', value: player.bestRoboRumbleTime , inline: true },    
            )
        
        for (let i = 0 ; i < club.members.length ; i++) {
            const member = club.members[i];
            value +=  (i+1) + ". " + member.name + ' `' + member.tag + '` - ' + member.trophies + ' :trophy:' + "\n" + "\n";
        }
        console.log(player.brawlers)
        embed.addField('Club : '+club.name,value);
        return message.say(embed)
    }
}