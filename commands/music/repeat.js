const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotNotInVoiceChannel, RepeatOn, RepeatOff } = require('../../error.json')
const ytdl = require('ytdl-core-discord');

module.exports = class RepeatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'repeat',
            aliases: ['r'],
            group: 'music',
            memberName: 'repeat',
            description: "boucle infini de la liste d'attente"
        });
    }
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;
        
        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }
        if  (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }
        if (server.repeat[voiceChannel.id] == true) {
            server.repeat[voiceChannel.id] = false;
            return message.say(RepeatOff);
        }
        server.repeat[voiceChannel.id] = true;
        return message.say(RepeatOn);
    }
}


