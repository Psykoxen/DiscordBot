const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotNotInVoiceChannel, BadQueue, MusicSuppr} = require('../../error.json')

module.exports = class SupprCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'suppr',
            aliases: ['sp','spr'],
            group: 'music',
            memberName: 'suppr',
            description: 'Supprimer la musique sélectionnée',
            args: [
                {
                    key: 'index',
                    prompt: 'Quel est le numéro de la musique à supprimer',
                    type: 'integer'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     */
    async run(message, { index }) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;
        
        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }
        if  (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }

        index--;

        if (!server.queue[voiceChannel.id][index]) {
            server.currentVideo[voiceChannel.id] = {title: "", url: ""};
            return message.say(BadQueue);
        }
        server.queue[voiceChannel.id].splice(index, 1);

       return message.say(MusicSuppr);
    }
}