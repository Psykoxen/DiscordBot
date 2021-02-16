const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotNotInVoiceChannel, EmptyQueue, CleanQueue } = require('../../error.json')
const ytdl = require('ytdl-core-discord');

module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            aliases: ['c'],
            group: 'music',
            memberName: 'clear',
            description: "supprime la file d'attente"
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;
        
        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }
        if  (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }


        if (server.queue[voiceChannel.id][0]) {
            server.queue[voiceChannel.id] = [];
            server.connection[voiceChannel.id].dispatcher.end();
            server.repeat = false;
            return message.say(CleanQueue);
        }

        return message.say(EmptyQueue);
    }
}