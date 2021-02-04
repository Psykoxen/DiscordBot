const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotNotInVoiceChannel, EmptyQueue, MusicSkip } = require('../../error.json')
const ytdl = require('ytdl-core-discord');

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            aliases: ['s'],
            group: 'music',
            memberName: 'skip',
            description: 'Passe à la musique suivante'
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


        if (!server.queue[0]) {
            server.currentVideo = {title: "", url: ""};
            return message.say(EmptyQueue);
        }
         
        server.currentVideo = server.queue[0];
        server.dispatcher = server.connection.play(await ytdl(server.currentVideo.url, {filter: 'audioonly'}), {type: 'opus' } );
        server.queue.shift();

        return message.say(MusicSkip);
    }
}