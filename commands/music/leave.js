const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel,BotNotInVoiceChannel } = require('../../error.json')

module.exports = class LeaveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            aliases: ['l'],
            group: 'music',
            memberName: 'leave',
            description: 'Déconnecte le bot du salon vocal'
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
        if (server.currentVideo[voiceChannel.id] != {title: "", url: ""}) {
            server.connection[voiceChannel.id].dispatcher.end();
            server.currentVideo[voiceChannel.id] = {title: "", url: ""};
        }
        server.queue[voiceChannel.id] = [];  
        server.repeat = false;
        await voiceChannel.leave();
    }
}