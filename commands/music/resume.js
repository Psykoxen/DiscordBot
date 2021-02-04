const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel,BotNotInVoiceChannel,BotOnStart } = require('../../error.json')
const { StreamDispatcher } = require('discord.js')

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            description: 'Relance la musique'
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     */
    async run(message) {
        if (!message.member.voice.channel) {
            return message.say(UserNotInVoiceChannel);
        }

        if (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }

        if (message.client.server.dispatcher) {
            message.client.server.dispatcher.resume();

        }
        return message.say(BotOnStart)
    }
}