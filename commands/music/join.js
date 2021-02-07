const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotAlreadyInVoiceChannel } = require('../../error.json')

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            aliases: ['j'],
            group: 'music',
            memberName: 'join',
            description: 'Ajoute le bot au salon vocal'
        });
    }

    /**
     * 
     * @param {CommandoMessage} message
     * @param {String} query
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        
        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }
        if  (message.client.voice.connections.first()) {
            return message.say(BotAlreadyInVoiceChannel);
        }

        await voiceChannel.join();
    }
}