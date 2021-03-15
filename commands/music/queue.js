const { MessageEmbed } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");
const { BotNotInVoiceChannel, EmptyQueue, OutQueue } = require('../../error.json')

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            aliases: ['q'],
            group: 'music',
            memberName: 'queue',
            description: "Affiche la file d'attente",
            args: [
                {
                key: 'page',
                prompt: "Quel page veux-tu afficher ?",
                default: 1,
                type: 'integer'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message
     * @param {Number} page
     */
    async run(message, { page }) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;
        
        if  (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }

        if (server.currentVideo[voiceChannel.id].url == ''){
            return message.say(EmptyQueue);
        }
        const numberItems = 10;
        const startingItem = (page - 1) * numberItems;
        const queueLength = server.queue[voiceChannel.id].length;

        var itemPage = startingItem + numberItems;
        var totalPages = 1;

        if (server.repeat[voiceChannel.id] == true)  {
            var repeat = ':white_check_mark:';
        } else {
            var repeat = ':x:';
        }  
        
        var embed = new MessageEmbed()
            .setTitle("File d'attente                 Repeat " + repeat)
            .setColor("#8229de")
            .addField('En train de jouer : ', server.currentVideo[voiceChannel.id].title);
        
        if (!server.queue[voiceChannel.id][0]){
            embed.addField("A venir :",EmptyQueue);
        }
            
        if (queueLength > 0) {
            var value = "";

            if (queueLength > numberItems) {
                totalPages = Math.ceil(queueLength / numberItems);
            }

            if (page < 0 || (page) > totalPages ) {
                return message.say(OutQueue);
            }

            if ((queueLength - startingItem) < numberItems) {
                itemPage = (queueLength - startingItem) + startingItem;
            }

            for (let i = startingItem; i < itemPage; i++) {
                const video = server.queue[voiceChannel.id][i];
                value +=  "`" + (i+1) + ". `" + video.title + "\n";
            }
            embed.addField("A venir :", value);
        }
        embed.setFooter(`Page ${page}/${totalPages}`);
        return message.say(embed)
    }
}