const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel,BotNotInVoiceChannel,BotOnPause } = require('../../error.json')
const { StreamDispatcher } = require('discord.js')

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'Met en pause une musique'
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     */
    async run(message) {
        /**
         * @type StreamDispatcher
         */
        
        if (!message.member.voice.channel) {
            return message.say(UserNotInVoiceChannel);
        }

        if (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }

        if (message.client.server.dispatcher) {
            message.client.server.dispatcher.pause();

        }
        return message.say(BotOnPause)
    }
}